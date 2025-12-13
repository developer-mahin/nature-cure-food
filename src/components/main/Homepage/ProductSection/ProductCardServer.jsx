/**
 * Product Card - Server Component (SEO Optimized)
 * Server-rendered product card with client-side cart functionality
 */

import ProductImage from "@/components/common/ProductImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCardServer({
  product,
  discountClass,
  stockOutClass,
  mainClass,
  imageClass,
}) {
  // Extract data from the actual API response structure
  const {
    id,
    name,
    description,
    shortDesc,
    category,
    SubCategory,
    brand,
    coverImg,
    variants = [],
    slug,
    orderedCount = 0,
    status,
  } = product;

  const firstVariant = variants[0] || {};
  const originalPrice = firstVariant.price || 0;
  const discountedPrice = firstVariant.discountPrice || firstVariant.price || 0;
  const discount = firstVariant.highestDiscountAmount || 0;

  const percentage = 100 - Math.round((discountedPrice / originalPrice) * 100);

  // Determine stock status
  const stockStatus = status === "ACTIVE" ? "In Stock" : "Stock Out";

  // Get category name (handle both object and string)
  const categoryName = typeof category === "object" ? category?.name : category;
  const subCategoryName =
    typeof SubCategory === "object" ? SubCategory?.name : SubCategory;
  const brandName = typeof brand === "object" ? brand?.name : brand;

  const selectedVariant = variants.find(
    (variant) => variant.showOnFrontend === true
  );

  return (
    <div
      className={cn(
        "relative w-full bg-white rounded-xl transition-all duration-300 overflow-hidden lg:min-h-[480px] min-h-[360px] flex flex-col",
        "hover:shadow-lg hover:-translate-y-1 group",
        mainClass
      )}
      style={{
        boxShadow:
          "0 4px 10px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Link href={`/product-details/${slug}`} className="cursor-pointer">
        {/* Discount Badge */}
        {percentage > 0 && stockStatus !== "Stock Out" && (
          <div className="absolute lg:top-10 lg:left-7 top-5 left-3 z-10">
            <Button
              variant="secondary"
              className={cn(
                "lg:w-20 w-14 lg:h-7 h-6 lg:text-base text-xs pointer-events-none",
                discountClass
              )}
            >
              {percentage}% OFF
            </Button>
          </div>
        )}

        {/* Stock Out Badge */}
        {stockStatus === "Stock Out" && (
          <div className="absolute lg:top-10 lg:left-7 top-5 left-3 z-10">
            <Button
              className={cn(
                "lg:w-20 w-14 lg:h-7 h-6 lg:text-base text-xs bg-gray-500 hover:bg-gray-400 pointer-events-none",
                stockOutClass
              )}
            >
              Stock out
            </Button>
          </div>
        )}

        {/* Product Image */}
        <div
          className={cn(
            "flex items-center justify-center hover:scale-105 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-green-100 group-hover:to-blue-100 lg:!m-4 m-2 rounded lg:h-[300px] h-[170px] overflow-hidden",
            imageClass
          )}
        >
          <ProductImage
            src={
              selectedVariant?.images[0] ||
              coverImg ||
              "/assets/products/product-1.png"
            }
            alt={name || "Product image"}
            width={300}
            height={200}
            className="object-contain lg:w-full"
          />
        </div>

        <div className="lg:px-4 px-3 pb-4 flex flex-col gap-2 flex-grow">
          {/* Category and Brand */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[10px] sm:text-xs leading-tight min-h-[20px] text-gray-500">
            {subCategoryName && (
              <>
                <span className="font-semibold text-gray-700">
                  {subCategoryName}
                </span>
                {(brandName || categoryName) && (
                  <span className="text-gray-400">›</span>
                )}
              </>
            )}
            {brandName && (
              <>
                <span className="font-medium text-gray-600">{brandName}</span>
                {categoryName && <span className="text-gray-400">›</span>}
              </>
            )}
            {categoryName && (
              <span className="font-medium text-gray-400">{categoryName}</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="lg:text-lg text-xs lg:font-semibold font-bold text-gray-900 leading-snug">
            {name} -{" "}
            <span className="capitalize">
              {selectedVariant ? (
                <>
                  {selectedVariant?.measurement} {selectedVariant?.size}
                </>
              ) : (
                <>
                  {firstVariant?.measurement} {firstVariant?.size}
                </>
              )}
            </span>
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {originalPrice > discountedPrice && (
              <p className="lg:text-sm text-[10px] text-gray-400 line-through">
                ৳{selectedVariant?.price || firstVariant?.price}
              </p>
            )}
            <p className="lg:text-xl text-xs lg:font-semibold font-bold text-gray-900">
              ৳{selectedVariant?.discountPrice || firstVariant?.discountPrice}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Client Component */}
      <AddToCartButton product={product} className="pb-4" />
    </div>
  );
}
