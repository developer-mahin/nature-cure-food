import DynamicPageRenderer from "@/components/dynamic/DynamicPageRenderer";
import { getDynamicPage } from "@/services/landing.service";
import { notFound } from "next/navigation";

const Dummy = async ({ searchParams }) => {
  const slug = searchParams?.slug || "panagold-g-timex";

  try {
    const pageData = await getDynamicPage(slug);

    if (!pageData?.data) {
      notFound();
    }

    const page = pageData.data;

    return (
      <div className="min-h-screen bg-gray-50">
        <DynamicPageRenderer html={page.html} css={page.css} js={page.js} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    notFound();
  }
};

export default Dummy;
