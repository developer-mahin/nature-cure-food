"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Edit3, ShoppingCart, Tag, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CouponModal from "../ui/CouponModal";
import NoteModal from "../ui/NoteModal";
import CartProducts from "./CartProducts";

const CartSheet = ({
  trigger,
  open,
  onOpenChange,
  listenToOpenEvent = false,
}) => {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
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
    localStorage.setItem("orderNote", note);
  };

  const handleApplyCoupon = async (code) => {
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
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      listenToOpenEvent={listenToOpenEvent}
    >
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-[92vw] sm:w-[480px] p-0 flex flex-col">
        <div className="px-6 py-4 border-b bg-white flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <SheetClose asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        <CartProducts />

        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Edit3 className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Note</p>
                {orderNote ? (
                  <div className="text-left">
                    <p className="text-xs text-gray-700 mb-2 bg-blue-50 p-2 rounded border">
                      {orderNote}
                    </p>
                    <button
                      onClick={() => setShowNoteModal(true)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Edit note
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNoteModal(true)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    Add note
                  </button>
                )}
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Coupon</p>
                {appliedCoupon ? (
                  <div className="text-left">
                    <p className="text-xs text-green-700 mb-2 bg-green-50 p-2 rounded border">
                      <strong>{appliedCoupon.code}</strong> -{" "}
                      {appliedCoupon.discount}
                    </p>
                    <button
                      onClick={() => setShowCouponModal(true)}
                      className="text-xs text-green-600 hover:text-green-800"
                    >
                      Change coupon
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="mt-2 text-xs text-green-600 hover:text-green-800"
                  >
                    Add coupon
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">
                Subtotal
              </span>
              <span className="text-xl font-bold text-gray-900">
                Tk {formatPrice(subtotal)}
              </span>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="px-6 py-4 border-t border-gray-200 bg-white space-y-3">
            <Link href="/checkout">
              <button
                onClick={() => onOpenChange(false)}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded font-medium transition"
              >
                Pay Online
              </button>
            </Link>

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => {
                onOpenChange(false);
                router.push("/checkout?payment=cod");
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              Cash on Delivery
            </Button>

            <Button onClick={clearCart} className="w-full">
              Clear Cart
            </Button>
          </SheetFooter>
        )}
      </SheetContent>

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
    </Sheet>
  );
};

export default CartSheet;
