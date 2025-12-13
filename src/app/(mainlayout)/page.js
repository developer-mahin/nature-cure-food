import HomepageProductViewTracker from "@/components/analytics/HomepageProductViewTracker";
import ProductSection from "@/components/main/Homepage/ProductSection/ProductSection";
import Slider from "@/components/Slider/Slider";
import { getAllProducts } from "@/services";

export const revalidate = 300;

const HomePage = async () => {
  const products = await getAllProducts({ limit: 100 });
  const productsArray = Array.isArray(products)
    ? products
    : products?.data || [];

  // Structured Data (JSON-LD) for SEO
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nature Cure Food - Herbal & Natural Medicines",
    description:
      "Discover our collection of Unani, Ayurvedic, and Herbal medicines for natural healing",
    itemListElement: productsArray.slice(0, 20).map((p, idx) => {
      const firstVariant = p.variants?.[0] || {};
      const price = firstVariant.discountPrice || firstVariant.price || 0;
      const categoryName =
        typeof p.category === "object" ? p.category?.name : p.category;

      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Product",
          "@id": `https://naturalcurehelp.com/product-details/${
            p.slug || p.id
          }`,
          name: p.name,
          description: p.description || p.shortDesc || "",
          image:
            p.coverImg ||
            p.variants?.[0]?.images?.[0] ||
            "/assets/products/product-1.png",
          category: categoryName || "Natural Medicine",
          brand:
            typeof p.brand === "object"
              ? { "@type": "Brand", name: p.brand?.name }
              : { "@type": "Brand", name: p.brand },
          offers: {
            "@type": "Offer",
            priceCurrency: "BDT",
            price: String(price),
            availability:
              p.status === "ACTIVE"
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            url: `https://naturalcurehelp.com/product-details/${
              p.slug || p.id
            }`,
          },
          ...(p.rating && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: String(p.rating),
              reviewCount: String(p.reviewCount || 0),
            },
          }),
        },
      };
    }),
  };

  // Organization Schema
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nature Cure Food",
    description:
      "Discover Natural Wellness with Unani & Herbal Care - Your trusted source for natural medicines",
    url: "https://naturalcurehelp.com",
    logo: "https://naturalcurehelp.com/assets/images/logo",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+880-9617400800",
      contactType: "Customer Service",
      email: "toxinout.online@gmail.com",
      areaServed: "BD",
      availableLanguage: ["en", "bn"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Sahera Whab Mention, Housing Estate Area, West Akur Takur Para",
      addressLocality: "Tangail",
      addressCountry: "BD",
    },
    sameAs: [
      "https://www.facebook.com/YokeLifestyles/",
      "https://www.youtube.com/@YokeLifestyles",
    ],
  };

  // Website Schema
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nature Cure Food",
    url: "https://naturalcurehelp.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://naturalcurehelp.com/all-products?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="">
      <HomepageProductViewTracker products={productsArray} />
      <Slider />
      <ProductSection products={productsArray} />
      {/* <OfferSection /> */}
      {/* <ProductCategorise /> */}
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
    </div>
  );
};

export default HomePage;
