"use client";

import Container from "@/components/reusable/Container";
import { Button } from "@/components/ui/button";
import CouponModal from "@/components/ui/CouponModal";
import NoteModal from "@/components/ui/NoteModal";
import { useCart } from "@/context/CartContext";
import {
  CreditCard,
  Edit3,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DesktopCartPage = () => {
  const {
    items,
    removeVariant,
    updateVariantQuantity,
    removeProduct,
    subtotal,
    clearCart,
  } = useCart();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleSaveNote = async (note) => {
    setOrderNote(note);
    // Here you can also save to localStorage or send to API
    localStorage.setItem("orderNote", note);
  };

  const handleApplyCoupon = async (code) => {
    // Simulate API call for coupon validation
    return new Promise((resolve) => {
      setTimeout(() => {
        const validCoupons = {
          SAVE10: { discount: "10% off", value: 0.1 },
          WELCOME20: { discount: "20% off", value: 0.2 },
          FIRST50: { discount: "৳50 off", value: 50 },
        };

        if (validCoupons[code.toUpperCase()]) {
          setAppliedCoupon({
            code: code.toUpperCase(),
            ...validCoupons[code.toUpperCase()],
          });
          resolve({ success: true, message: "Coupon applied successfully!" });
        } else {
          resolve({ success: false, message: "Invalid coupon code" });
        }
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {items.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <Button className="bg-[#097B35] hover:bg-[#00662A]">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Table Header */}
              <div className="px-8 py-4 bg-gray-50 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  Shopping Cart
                </h2>
              </div>  

              {/* Cart Items */}
              <div className="divide-y">
                {items.map((product) => {
                  return (
                    <div key={product.id} className="px-8 py-6">
                      {/* Product Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.image && (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {product.variants.length} variant
                            {product.variants.length > 1 ? "s" : ""}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Remove all variants"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Variants Table */}
                      <div className="ml-24 space-y-3">
                        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 pb-2 border-b">
                          <div className="col-span-4">Variant</div>
                          <div className="col-span-2">Price</div>
                          <div className="col-span-3">Quantity</div>
                          <div className="col-span-2">Subtotal</div>
                          <div className="col-span-1"></div>
                        </div>

                        {/* If no variants, show the product itself */}
                        {product.variants.length === 0 ? (
                          <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 rounded-lg p-3">
                            {/* Product Info */}
                            <div className="col-span-4">
                              <span className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded text-sm font-medium inline-block">
                                Standard Product
                              </span>
                            </div>

                            {/* Price */}
                            <div className="col-span-2">
                              <span className="font-semibold text-gray-900">
                                ৳{formatPrice(product.price || 0)}
                              </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="col-span-3">
                              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                <button
                                  onClick={() =>
                                    updateVariantQuantity(
                                      product.id,
                                      null,
                                      Math.max(0, (product.quantity || 1) - 1)
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                                  {product.quantity || 1}
                                </span>
                                <button
                                  onClick={() =>
                                    updateVariantQuantity(
                                      product.id,
                                      null,
                                      (product.quantity || 1) + 1
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="col-span-2">
                              <span className="font-semibold text-gray-900">
                                ৳
                                {formatPrice(
                                  (product.price || 0) * (product.quantity || 1)
                                )}
                              </span>
                            </div>

                            {/* Remove Button */}
                            <div className="col-span-1">
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Remove product"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          product.variants.map((variant) => (
                            <div
                              key={variant.variantId}
                              className="grid grid-cols-12 gap-4 items-center bg-gray-50 rounded-lg p-3"
                            >
                              {/* Variant Info */}
                              <div className="col-span-4">
                                <span className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded text-sm font-medium inline-block">
                                  {variant.measurement} {variant.size}
                                </span>
                              </div>

                              {/* Price */}
                              <div className="col-span-2">
                                <span className="font-semibold text-gray-900">
                                  ৳{formatPrice(variant.price)}
                                </span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="col-span-3">
                                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                  <button
                                    onClick={() =>
                                      updateVariantQuantity(
                                        product.id,
                                        variant.variantId,
                                        Math.max(0, variant.quantity - 1)
                                      )
                                    }
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <input
                                    type="number"
                                    value={variant.quantity}
                                    onChange={(e) => {
                                      const newQuantity =
                                        parseInt(e.target.value) || 1;
                                      updateVariantQuantity(
                                        product.id,
                                        variant.variantId,
                                        Math.max(1, newQuantity)
                                      );
                                    }}
                                    className="w-12 text-center border-0 focus:ring-0 focus:outline-none"
                                    min="1"
                                  />
                                  <button
                                    onClick={() =>
                                      updateVariantQuantity(
                                        product.id,
                                        variant.variantId,
                                        variant.quantity + 1
                                      )
                                    }
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Variant Total */}
                              <div className="col-span-2">
                                <span className="font-semibold text-gray-900">
                                  ৳
                                  {formatPrice(
                                    variant.price * variant.quantity
                                  )}
                                </span>
                              </div>

                              {/* Remove Button */}
                              <div className="col-span-1 text-right">
                                <button
                                  onClick={() =>
                                    removeVariant(product.id, variant.variantId)
                                  }
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Options */}
              <div className="px-8 py-6 border-t flex items-center justify-end">
                <div className="grid grid-cols-2 gap-8 max-w-md">
                  {/* Note Section */}
                  <div
                    onClick={() => setShowNoteModal(true)}
                    className="text-center cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Edit3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900 mb-2">Note</p>
                    {orderNote ? (
                      <div className="text-left">
                        <p className="text-sm text-gray-700 mb-2 bg-blue-50 p-2 rounded border">
                          {orderNote}
                        </p>
                        <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                          Edit note
                        </button>
                      </div>
                    ) : (
                      <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                        Add note
                      </button>
                    )}
                  </div>

                  {/* Coupon Section */}
                  <div
                    onClick={() => setShowCouponModal(true)}
                    className="text-center cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Tag className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900 mb-2">Coupon</p>
                    {appliedCoupon ? (
                      <div className="text-left">
                        <p className="text-sm text-green-700 mb-2 bg-green-50 p-2 rounded border">
                          <strong>{appliedCoupon.code}</strong> -{" "}
                          {appliedCoupon.discount}
                        </p>
                        <button className="text-sm text-green-600 hover:text-green-800 underline">
                          Change coupon
                        </button>
                      </div>
                    ) : (
                      <button className="text-sm text-green-600 hover:text-green-800 underline">
                        Add coupon
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="px-8 py-6 bg-gray-50 border-t">
                <div className="flex justify-between items-center max-w-md ml-auto">
                  <span className="text-lg font-semibold text-gray-900">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    Tk {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-8 py-6 border-t bg-white">
                <div className="flex gap-4 max-w-md ml-auto">
                  <Link href="/checkout" className="flex-1">
                    <Button className="w-full h-12 bg-[#097B35] hover:bg-[#00662A] text-white">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay Online
                    </Button>
                  </Link>
                  <Link href="/checkout?paymentMethod=cod">
                    <Button
                      variant="outline"
                      className="flex-1 h-12 border-[#097B35] text-[#097B35] hover:bg-[#097B35] hover:text-white"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Cash on Delivery
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* Modals */}
      <NoteModal
        open={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSave={handleSaveNote}
        initialNote={orderNote}
      />

      <CouponModal
        open={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onApply={handleApplyCoupon}
        appliedCoupon={appliedCoupon}
      />
    </div>
  );
};

export default DesktopCartPage;
