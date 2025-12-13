"use client";

import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const formatPrice = (price) => {
  return price.toLocaleString("en-BD", {
    style: "decimal",
    minimumFractionDigits: 0,
  });
};

const CartProducts = () => {
  const { items, removeVariant, updateVariantQuantity, removeProduct } =
    useCart();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingCart className="h-20 w-20 text-gray-300 mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">
            Your cart is empty
          </p>
          <p className="text-sm text-gray-400 text-center px-4">
            Add some products to get started
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((product) => (
            <div key={product.id} className="pb-5 border-b-2 border-gray-200">
              <div className="flex gap-3 mb-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <span className="text-2xl">💊</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-1">
                      {product.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 font-medium">
                    {product.variants.length} variant
                    {product.variants.length > 1 ? "s" : ""} in cart
                  </p>
                </div>

                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors h-fit p-1 hover:bg-red-50 rounded-full"
                  title="Remove all variants"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="ml-1 pl-4 border-l-2 border-blue-200 space-y-3">
                {product.variants.map((variant) => (
                  <div
                    key={variant.variantId}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3.5 shadow-sm"
                  >
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-blue-100 border-2 border-blue-300 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-bold">
                          {variant.measurement} {variant.size}
                        </span>
                        <p className="text-xl font-extrabold text-green-600">
                          ৳{formatPrice(variant.price)}
                        </p>
                      </div>
                      {variant.quantity > 1 && (
                        <p className="text-xs text-gray-600 font-medium mt-2 bg-white px-2 py-1 rounded inline-block">
                          ৳{formatPrice(variant.price)} × {variant.quantity} = ৳
                          {formatPrice(variant.price * variant.quantity)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-semibold text-gray-600 mr-1">
                          Qty:
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() =>
                            updateVariantQuantity(
                              product.id,
                              variant.variantId,
                              Math.max(0, variant.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="text-base font-bold w-7 text-center bg-white px-2 py-1 rounded border border-gray-300">
                          {variant.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 rounded-full border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
                          onClick={() =>
                            updateVariantQuantity(
                              product.id,
                              variant.variantId,
                              variant.quantity + 1
                            )
                          }
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <button
                        onClick={() =>
                          removeVariant(product.id, variant.variantId)
                        }
                        className="text-sm text-red-600 hover:text-red-800 transition-colors font-bold px-3 py-1.5 hover:bg-red-50 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartProducts;
