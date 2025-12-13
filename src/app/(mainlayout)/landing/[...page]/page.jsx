import LandingPageViewTracker from "@/components/analytics/LandingPageViewTracker";
import LandingCartWrapper from "@/components/landing/LandingCartWrapper";
import LandingOrderWrapper from "@/components/landing/LandingOrderWrapper";
import { LandingCartProvider } from "@/context/LandingCartContext";
import { getLandingPageBySlug } from "@/services/landing.service";
import { notFound } from "next/navigation";

const LandingPageDetails = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.page?.[0] || resolvedParams?.page;

  if (!slug) {
    console.error("No slug found in params:", resolvedParams);
    notFound();
  }

  const landingPage = await getLandingPageBySlug(slug);

  if (!landingPage) {
    notFound();
  }

  const page = landingPage?.data || landingPage;

  if (!page) {
    notFound();
  }

  if (!page.html && !page.content && !page.body) {
    notFound();
  }

  const isFullHTMLDocument =
    page?.html?.trim().toLowerCase().startsWith("<!doctype") ||
    page?.html?.trim().toLowerCase().startsWith("<html");

  let bodyContent = page?.html;
  let extractedCSS = page?.css || "";

  if (isFullHTMLDocument) {
    const bodyMatch = page.html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      bodyContent = bodyMatch[1];
    }

    const styleMatches = page.html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styleMatches && styleMatches.length > 0) {
      extractedCSS = styleMatches
        .map((styleTag) => {
          const match = styleTag.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
          return match ? match[1] : "";
        })
        .join("\n");
    }
  }

  return (
    <LandingCartProvider>
      <LandingCartWrapper>
        <LandingPageViewTracker landingPage={page} />
        <div className="min-h-screen font-hind">
          {extractedCSS && (
            <style
              dangerouslySetInnerHTML={{
                __html: extractedCSS

                  .replace(
                    /position:\s*fixed/g,
                    "position: fixed; pointer-events: none;"
                  )
                  .replace(
                    /position:\s*absolute/g,
                    "position: absolute; pointer-events: none;"
                  )

                  .replace(/z-index:\s*(\d+)/g, (match, zIndex) => {
                    const numZIndex = parseInt(zIndex);
                    return numZIndex > 5
                      ? `z-index: ${numZIndex}; pointer-events: none;`
                      : match;
                  }),
              }}
            />
          )}

          <div
            className="relative"
            style={{ zIndex: 1 }}
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          ></div>

          {((page.products && page.products.length > 0) ||
            (page.combos && page.combos.length > 0)) && (
            <div className="relative" style={{ zIndex: 10 }}>
              <LandingOrderWrapper
                products={page.products || []}
                combos={page.combos || []}
                deliveryRateInside={page.deliveryRateInside}
                deliveryRateOutside={page.deliveryRateOutside}
              />
            </div>
          )}
        </div>
      </LandingCartWrapper>
    </LandingCartProvider>
  );
};

export default LandingPageDetails;
