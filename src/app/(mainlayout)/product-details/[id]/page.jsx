import ProductViewTracker from "@/components/analytics/ProductViewTracker";
import ProductDescription from "@/components/products/ProductDescription";
import ProductDetailsWrapper from "@/components/products/ProductDetailsWrapper";
import ProductFAQ from "@/components/products/ProductFAQ";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import RelatedProducts from "@/components/products/RelatedProducts";
import { staticProducts } from "@/lib/staticProducts";
import { getAllProducts, getProductById } from "@/services/products.service";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    const productData = product?.data || product;

    if (!productData) {
      return {
        title: "Product Not Found - Natural Plus BD",
        description: "The product you're looking for doesn't exist.",
        robots: "noindex, nofollow",
      };
    }

    const firstVariant = productData?.variants?.[0] || {};
    const productPrice = firstVariant.discountPrice || firstVariant.price || 0;
    const originalPrice = firstVariant.price || 0;
    const hasDiscount = originalPrice > productPrice;

    const brandName =
      typeof productData?.brand === "object"
        ? productData?.brand?.name
        : productData?.brand || "Natural Plus BD";

    const categoryName =
      typeof productData?.category === "object"
        ? productData?.category?.name
        : productData?.category || "Health Products";

    const seoTitle =
      productData?.seo?.title ||
      `${productData?.name} - ${brandName} | Natural Plus BD`;

    const seoDescription =
      productData?.seo?.description ||
      productData?.description ||
      productData?.shortDesc ||
      `Buy ${productData?.name} by ${brandName} at Natural Plus BD. ${
        hasDiscount
          ? `Save up to ${Math.round(
              ((originalPrice - productPrice) / originalPrice) * 100
            )}%`
          : "Best price guaranteed"
      }. Free shipping available.`;

    const seoKeywords = [
      ...(productData?.seo?.keywords || []),
      productData?.name,
      brandName,
      categoryName,
      "natural products",
      "health supplements",
      "Bangladesh",
      "online pharmacy",
      "natural plus bd",
    ].filter(Boolean);

    const canonicalUrl = `https://naturalplusbd.com/product-details/${id}`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords.join(", "),
      authors: [{ name: "Natural Plus BD" }],
      creator: "Natural Plus BD",
      publisher: "Natural Plus BD",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        siteName: "Natural Plus BD",
        images: [
          {
            url: productData?.coverImg || "/assets/images/logo-footer 2.png",
            width: 1200,
            height: 630,
            alt: `${productData?.name} - ${brandName}`,
          },
        ],
        locale: "en_BD",
        type: "website",
        price: {
          amount: productPrice,
          currency: "BDT",
        },
        availability:
          productData?.status === "ACTIVE" ? "in stock" : "out of stock",
        brand: brandName,
        category: categoryName,
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [productData?.coverImg || "/assets/images/logo-footer 2.png"],
        creator: "@naturalplusbd",
        site: "@naturalplusbd",
      },
      other: {
        "product:price:amount": productPrice.toString(),
        "product:price:currency": "BDT",
        "product:availability":
          productData?.status === "ACTIVE" ? "in stock" : "out of stock",
        "product:brand": brandName,
        "product:category": categoryName,
        "product:condition": "new",
        "product:retailer": "Natural Plus BD",
        "product:retailer_id": "naturalplusbd",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product - Natural Plus BD",
      description: "Natural health products and supplements in Bangladesh",
      robots: "noindex, nofollow",
    };
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  try {
    const productData = await getProductById(id);
    const product = productData?.data;

    const allProducts = await getAllProducts({ limit: 8 });
    const relatedProducts =
      allProducts?.data
        ?.filter((p) => {
          return String(p.id) !== String(id);
        })
        ?.slice(0, 4) || [];

    if (!product) {
      return (
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Link href="/" className="text-green-600 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
      );
    }

    const productImages =
      product?.images?.length > 0
        ? product.images
        : product?.coverImg
        ? [product.coverImg]
        : ["/assets/products/product-1.png"];

    const firstVariant = product?.variants?.[0] || {};
    const productPrice = firstVariant.discountPrice || firstVariant.price || 0;
    const originalPrice = firstVariant.price || 0;
    const hasDiscount = originalPrice > productPrice;

    const brandName =
      typeof product?.brand === "object"
        ? product?.brand?.name
        : product?.brand || "Natural Plus BD";

    const categoryName =
      typeof product?.category === "object"
        ? product?.category?.name
        : product?.category || "Health Products";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product?.name,
      description: product?.description || product?.shortDesc,
      image: productImages,
      brand: {
        "@type": "Brand",
        name: brandName,
        url: "https://naturalplusbd.com",
      },
      category:
        typeof product?.category === "object"
          ? product?.category?.name
          : product?.category,
      subcategory:
        typeof product?.SubCategory === "object"
          ? product?.SubCategory?.name
          : product?.SubCategory,
      offers: {
        "@type": "Offer",
        url: `https://naturalplusbd.com/product-details/${id}`,
        priceCurrency: "BDT",
        price: productPrice,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        availability:
          product?.status === "ACTIVE"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Natural Plus BD",
          url: "https://naturalplusbd.com",
          logo: "https://naturalplusbd.com/assets/images/logo-footer 2.png",
          address: {
            "@type": "PostalAddress",
            addressCountry: "BD",
            addressLocality: "Dhaka",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+880-XXX-XXXXXXX",
            contactType: "customer service",
          },
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "0",
            currency: "BDT",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 2,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 3,
              unitCode: "DAY",
            },
          },
        },
        ...(hasDiscount && {
          priceSpecification: {
            "@type": "PriceSpecification",
            price: productPrice,
            priceCurrency: "BDT",
            valueAddedTaxIncluded: true,
          },
        }),
      },
      sku: product?.sku || id,
      gtin: product?.sku || id,
      mpn: product?.sku || id,
      isbn: product?.isbn,
      productID: id,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "SubCategory",
          value:
            typeof product?.SubCategory === "object"
              ? product?.SubCategory?.name
              : product?.SubCategory,
        },
        {
          "@type": "PropertyValue",
          name: "Status",
          value: product?.status,
        },
        {
          "@type": "PropertyValue",
          name: "Featured",
          value: product?.isFeatured ? "Yes" : "No",
        },
        {
          "@type": "PropertyValue",
          name: "Original Price",
          value: originalPrice,
        },
        {
          "@type": "PropertyValue",
          name: "Discount Price",
          value: productPrice,
        },
        ...(product?.variants?.map((variant, index) => ({
          "@type": "PropertyValue",
          name: `Variant ${index + 1}`,
          value: `${variant.measurement} ${variant.size} - ৳${
            variant.discountPrice || variant.price
          }`,
        })) || []),
      ],
      aggregateRating: product?.averageRating
        ? {
            "@type": "AggregateRating",
            ratingValue: product.averageRating,
            reviewCount: product.reviewCount || 0,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
      review:
        product?.reviews?.slice(0, 3).map((review) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          author: {
            "@type": "Person",
            name: review.author || "Anonymous",
          },
          reviewBody: review.comment,
          datePublished: review.createdAt,
        })) || [],
      dateCreated: product?.createdAt,
      dateModified: product?.updatedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://naturalplusbd.com/product-details/${id}`,
      },
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://naturalplusbd.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryName,
          item: `https://naturalplusbd.com/category/${categoryName
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product?.name,
          item: `https://naturalplusbd.com/product-details/${id}`,
        },
      ],
    };

    const organizationJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Natural Plus BD",
      url: "https://naturalplusbd.com",
      logo: "https://naturalplusbd.com/assets/images/logo-footer 2.png",
      description:
        "Leading online pharmacy and natural health products store in Bangladesh",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BD",
        addressLocality: "Dhaka",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+880-XXX-XXXXXXX",
        contactType: "customer service",
        availableLanguage: ["English", "Bengali"],
      },
      sameAs: [
        "https://facebook.com/naturalplusbd",
        "https://twitter.com/naturalplusbd",
        "https://instagram.com/naturalplusbd",
      ],
    };

    return (
      <>
        <ProductViewTracker product={product} eventID={product?.pixelEventId} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#097B35" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Natural Plus BD" />
        <meta name="application-name" content="Natural Plus BD" />
        <meta name="msapplication-TileColor" content="#097B35" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <meta name="product:brand" content={brandName} />
        <meta
          name="product:availability"
          content={product?.status === "ACTIVE" ? "in stock" : "out of stock"}
        />
        <meta name="product:condition" content="new" />
        <meta name="product:price:amount" content={productPrice.toString()} />
        <meta name="product:price:currency" content="BDT" />
        <meta name="product:category" content={categoryName} />

        <meta name="geo.region" content="BD" />
        <meta name="geo.country" content="Bangladesh" />
        <meta name="geo.placename" content="Dhaka" />

        <meta name="language" content="en" />
        <meta name="locale" content="en_BD" />

        <meta httpEquiv="Cache-Control" content="public, max-age=3600" />

        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        <div className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <ProductImageGallery
                  images={productImages}
                  productName={product?.name}
                  discount={product?.discount}
                  coverImg={product?.coverImg}
                />
              </div>

              <div className="lg:col-span-7">
                <ProductDetailsWrapper product={product} />
              </div>
            </div>

            <ProductDescription description={product?.description} />
            <ProductFAQ faqs={product?.faqs} productName={product?.name} />

            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading product:", error);

    const product = staticProducts.find((p) => {
      return String(p.id) === String(id) || p.id === parseInt(id);
    });

    const relatedProducts = staticProducts
      .filter((p) => {
        return String(p.id) !== String(id) && p.id !== parseInt(id);
      })
      .slice(0, 4);

    if (!product) {
      return (
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Link href="/" className="text-green-600 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
      );
    }

    const productImages =
      product?.images?.length > 0
        ? product.images
        : product?.coverImg
        ? [product.coverImg]
        : ["/assets/products/product-1.png"];

    const fallbackFirstVariant = product?.variants?.[0] || {};
    const fallbackProductPrice =
      fallbackFirstVariant.discountPrice ||
      fallbackFirstVariant.price ||
      product?.discountedPrice ||
      0;
    const fallbackOriginalPrice =
      fallbackFirstVariant.price || product?.price || 0;
    const fallbackHasDiscount = fallbackOriginalPrice > fallbackProductPrice;
    const fallbackBrandName =
      typeof product?.brand === "object"
        ? product?.brand?.name
        : product?.brand || "Natural Plus BD";

    const fallbackCategoryName =
      typeof product?.category === "object"
        ? product?.category?.name
        : product?.category || "Health Products";

    const fallbackJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product?.name,
      description: product?.description || product?.shortDesc,
      image: productImages,
      brand: {
        "@type": "Brand",
        name: fallbackBrandName,
        url: "https://naturalplusbd.com",
      },
      category: fallbackCategoryName,
      offers: {
        "@type": "Offer",
        url: `https://naturalplusbd.com/product-details/${id}`,
        priceCurrency: "BDT",
        price: fallbackProductPrice,
        availability:
          product?.status === "ACTIVE"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Natural Plus BD",
          url: "https://naturalplusbd.com",
        },
        ...(fallbackHasDiscount && {
          priceSpecification: {
            "@type": "PriceSpecification",
            price: fallbackProductPrice,
            priceCurrency: "BDT",
            valueAddedTaxIncluded: true,
          },
        }),
      },
      sku: product?.sku || id,
      gtin: product?.sku || id,
      mpn: product?.sku || id,
      productID: id,
      dateCreated: product?.createdAt,
      dateModified: product?.updatedAt,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fallbackJsonLd) }}
        />

        <div className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <ProductImageGallery
                  images={productImages}
                  productName={product?.name}
                  discount={product?.discount}
                  coverImg={product?.coverImg}
                />
              </div>

              <div className="lg:col-span-7">
                <ProductDetailsWrapper product={product} />
              </div>
            </div>

            <ProductFAQ faqs={product?.faqs} productName={product?.name} />

            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </>
    );
  }
}
