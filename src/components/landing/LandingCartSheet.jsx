"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLandingCart } from "@/context/LandingCartContext";
import { Edit3, Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CouponModal from "../ui/CouponModal";
import NoteModal from "../ui/NoteModal";
import LandingCartProducts from "./LandingCartProducts";

const LandingCartSheet = ({
  trigger,
  open,
  onOpenChange,
  listenToOpenEvent = false,
}) => {
  const { items, subtotal, clearCart } = useLandingCart();
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
    // Here you can also save to localStorage or send to API
    localStorage.setItem("landingOrderNote", note);
  };

  const handleApplyCoupon = async (code) => {
    // Simulate API call for coupon validation
    return new Promise((resolve) => {
      setTimeout(() => {
        const validCoupons = {
          SAVE10: { discount: 10, type: "percentage" },
          FLAT50: { discount: 50, type: "fixed" },
          WELCOME: { discount: 15, type: "percentage" },
        };

        if (validCoupons[code]) {
          setAppliedCoupon({ code, ...validCoupons[code] });
          resolve({ success: true, coupon: validCoupons[code] });
        } else {
          resolve({ success: false, message: "Invalid coupon code" });
        }
      }, 1000);
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, subtotal);
    }
  };

  const calculateTotal = () => {
    const discount = calculateDiscount();
    return Math.max(0, subtotal - discount);
  };

  const handleCheckout = () => {
    // Store cart data and redirect to checkout
    const cartData = {
      items,
      subtotal,
      discount: calculateDiscount(),
      total: calculateTotal(),
      orderNote,
      appliedCoupon,
    };

    localStorage.setItem("landingCheckoutData", JSON.stringify(cartData));
    router.push("/checkout");
  };

  // Listen for custom open event
  useEffect(() => {
    if (listenToOpenEvent) {
      const handleOpenCart = () => {
        onOpenChange(true);
      };

      window.addEventListener("openLandingCart", handleOpenCart);
      return () => {
        window.removeEventListener("openLandingCart", handleOpenCart);
      };
    }
  }, [listenToOpenEvent, onOpenChange]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
        <SheetContent className="w-full sm:max-w-lg">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">ল্যান্ডিং কার্ট</h2>
              <SheetClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              <LandingCartProducts />
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <SheetFooter className="flex flex-col gap-4 pt-6 border-t">
                {/* Order Note */}
                <div className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNoteModal(true)}
                    className="w-full justify-start"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {orderNote ? "নোট সম্পাদনা করুন" : "অর্ডার নোট যোগ করুন"}
                  </Button>
                  {orderNote && (
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {orderNote}
                    </p>
                  )}
                </div>

                {/* Coupon */}
                <div className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCouponModal(true)}
                    className="w-full justify-start"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    {appliedCoupon ? "কুপন পরিবর্তন করুন" : "কুপন কোড যোগ করুন"}
                  </Button>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-green-600">
                        {appliedCoupon.code} প্রয়োগ করা হয়েছে
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="w-full space-y-2 font-hind">
                  <div className="flex justify-between text-sm">
                    <span>সাবটোটাল:</span>
                    <span>৳{formatPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>ছাড় ({appliedCoupon.code}):</span>
                      <span>-৳{formatPrice(calculateDiscount())}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-semibold text-base border-t pt-2">
                    <span>মোট:</span>
                    <span>৳{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1"
                  >
                    কার্ট খালি করুন
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1">
                    চেকআউট
                  </Button>
                </div>
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Modals */}
      <NoteModal
        open={showNoteModal}
        onOpenChange={setShowNoteModal}
        onSave={handleSaveNote}
        initialNote={orderNote}
      />

      <CouponModal
        open={showCouponModal}
        onOpenChange={setShowCouponModal}
        onApply={handleApplyCoupon}
        appliedCoupon={appliedCoupon}
      />
    </>
  );
};

export default LandingCartSheet;
