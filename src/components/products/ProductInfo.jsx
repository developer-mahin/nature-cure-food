"use client";

/**
 * Product Info - Client Component
 * Handles variant selection and dynamic pricing
 */

import { useEffect, useState } from "react";

export default function ProductInfo({
  product,
  onVariantChange,
  selectedVariant: externalSelectedVariant,
  variantQuantities = {},
  onQuantityChange,
}) {
  // Extract data from API structure
  const {
    name,
    category,
    SubCategory,
    brand,
    variants = [],
    status,
    isFeatured,
  } = product;

  // Use actual variants from API
  const displayVariants = variants;

  // State for selected variant and pricing
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Use passed variant quantities instead of local state

  useEffect(() => {
    if (displayVariants.length > 0) {
      // Check if external variant is provided
      if (externalSelectedVariant) {
        setSelectedVariant(externalSelectedVariant);
        updatePricing(externalSelectedVariant);
        return;
      }

      // Find variant with showOnFrontend property (check for truthy value)
      const variantWithShowOnFrontend = displayVariants.find(
        (variant) =>
          variant.showOnFrontend === true || variant.showOnFrontend === "true"
      );

      // Use variant with showOnFrontend, or fallback to first variant
      const defaultVariant = variantWithShowOnFrontend || displayVariants[0];
      setSelectedVariant(defaultVariant);
      updatePricing(defaultVariant);

      // Notify parent component about the default variant selection
      if (onVariantChange && defaultVariant) {
        onVariantChange(defaultVariant);
      }
    }
  }, [displayVariants, externalSelectedVariant]);

  const updatePricing = (variant) => {
    const price = variant.price || 0;
    const discountPrice = variant.discountPrice || variant.price || 0;
    const discount = variant.highestDiscountAmount || 0;

    const percentage = 100 - Math.round((discountPrice / price) * 100);

    setCurrentPrice(discountPrice);
    setOriginalPrice(price);
    setDiscountAmount(discount);
    setDiscountPercentage(percentage);
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    updatePricing(variant);
    if (onVariantChange) {
      onVariantChange(variant);
    }
  };

  const getVariantQuantity = (variantId) => {
    return variantQuantities[variantId] || 0;
  };

  // Calculate total price for all variants with quantities
  const calculateTotalPrice = () => {
    let total = 0;
    displayVariants.forEach((variant) => {
      const quantity = getVariantQuantity(variant.id);
      if (quantity > 0) {
        const variantPrice = variant.discountPrice || variant.price;
        total += variantPrice * quantity;
      }
    });
    return total;
  };

  const totalPrice = calculateTotalPrice();

  // Get category names
  const categoryName = typeof category === "object" ? category?.name : category;
  const subCategoryName =
    typeof SubCategory === "object" ? SubCategory?.name : SubCategory;
  const brandName = typeof brand === "object" ? brand?.name : brand;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Category and Brand Info */}
      <div className="flex items-center gap-2 mb-2">
        {subCategoryName && (
          <span className="text-sm font-medium text-gray-600">
            {subCategoryName}
          </span>
        )}
        {subCategoryName && brandName && (
          <span className="text-gray-400">•</span>
        )}
        {brandName && (
          <span className="text-sm font-medium text-blue-600">{brandName}</span>
        )}
        {brandName && categoryName && <span className="text-gray-400">•</span>}
        {categoryName && (
          <span className="text-sm text-gray-500">{categoryName}</span>
        )}
      </div>

      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
        {isFeatured && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Price Display - Dynamic based on variant selection */}
      <div className="flex items-center gap-3 mb-4">
        {originalPrice > currentPrice && (
          <span className="text-sm text-gray-400 line-through">
            ৳{originalPrice}
          </span>
        )}
        <span className="text-3xl font-bold text-green-600">
          ৳{currentPrice}
        </span>
        {discountPercentage > 0 && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Variant Selection with Quantity Controls */}
      {displayVariants.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Select Package & Quantity
          </h3>

          <div className="space-y-3">
            {displayVariants.map((variant, index) => {
              const isSelected = selectedVariant?.id === variant.id;
              const variantPrice = variant.discountPrice || variant.price;

              return (
                <div
                  key={variant.id || index}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  onClick={() => handleVariantChange(variant)}
                >
                  {/* Radio Button and Label */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={isSelected}
                        onChange={() => handleVariantChange(variant)}
                        className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div>
                      <label className="text-base font-medium text-gray-900 cursor-pointer">
                        {variant.measurement} {variant.size}
                      </label>
                      <div className="text-sm text-gray-600">
                        ৳{variantPrice}
                        {variant.price - variant.discountPrice > 0 && (
                          <span className="text-green-600 ml-1">
                            (Save ৳{variant.price - variant.discountPrice})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        const currentQty = parseInt(
                          getVariantQuantity(variant.id) || 0
                        );
                        onQuantityChange?.(
                          variant.id,
                          Math.max(0, currentQty - 1)
                        );
                      }}
                      className="w-8 h-8 cursor-pointer rounded-lg border-2 border-gray-300 bg-white hover:border-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
                    >
                      <span className="text-lg font-bold">−</span>
                    </button>

                    <input
                      type="number"
                      min="0"
                      value={getVariantQuantity(variant.id) || 0}
                      className="w-12 h-8 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value) || 0;
                        onQuantityChange?.(variant.id, quantity);
                      }}
                    />

                    <button
                      onClick={() => {
                        const currentQty = getVariantQuantity(variant.id);
                        onQuantityChange?.(variant.id, currentQty + 1);
                      }}
                      className="w-8 h-8 cursor-pointer rounded-lg border-2 border-gray-300 bg-white hover:border-green-500 hover:bg-green-50 hover:text-green-600 flex items-center justify-center transition-colors"
                    >
                      <span className="text-lg font-bold">+</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sales Info */}
      <div className="flex items-center gap-6 mb-6">
        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {status === "ACTIVE" ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
