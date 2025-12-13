"use client";

import ProductImage from "@/components/common/ProductImage";
import { Button } from "@/components/ui/button";
import { useLandingCart } from "@/context/LandingCartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const LandingCartProducts = () => {
  const { items, removeVariant, updateVariantQuantity, removeProduct } =
    useLandingCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-6">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h14l-1.5 8H6L3 6h18"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          আপনার কার্ট খালি
        </h3>
        <p className="text-gray-500 mb-6">আপনার পছন্দের পণ্য কার্টে যোগ করুন</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((product) => (
        <div
          key={product.id}
          className="border-b border-gray-200 pb-4 last:border-b-0"
        >
          {/* Product Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {product.coverImg ? (
                <ProductImage
                  src={product.coverImg}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {product.description || "প্রোডাক্ট বিবরণ"}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProduct(product.id)}
              className="text-gray-400 hover:text-red-500 p-1 h-auto"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 ? (
            <div className="space-y-2 ml-19">
              {product.variants.map((variant) => (
                <div
                  key={variant.variantId}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-700">
                        {variant.size}
                      </span>
                      {variant.measurement && (
                        <span className="text-xs text-gray-500">
                          ({variant.measurement})
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ৳{formatPrice(variant.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateVariantQuantity(
                          product.id,
                          variant.variantId,
                          variant.quantity - 1
                        )
                      }
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {variant.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateVariantQuantity(
                          product.id,
                          variant.variantId,
                          variant.quantity + 1
                        )
                      }
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No variants - simple product
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 ml-19">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  ৳{formatPrice(product.price)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateVariantQuantity(
                      product.id,
                      null,
                      product.quantity - 1
                    )
                  }
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {product.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateVariantQuantity(
                      product.id,
                      null,
                      product.quantity + 1
                    )
                  }
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LandingCartProducts;
