"use client";

import { LucidePhoneCall } from "lucide-react";
import { useEffect } from "react";

const OrderSummary = ({
  items = [],
  selectedItems = [],
  quantities = {},
  onOrderConfirm,
  isSubmitting = false,
  shippingCost = 0,
  setSubTotal,
}) => {
  // Calculate subtotal from items
  const calculateSubtotal = () => {
    if (!items || items.length === 0) return 0;

    return items.reduce((total, item) => {
      const selectedItem = selectedItems.find(
        (selected) => selected.id === item.id
      );
      const quantity = quantities[item.id] || 1;

      if (selectedItem?.type === "product") {
        const variant = item.variant;
        const price = parseFloat(variant?.discountPrice || variant?.price || 0);
        return total + price * quantity;
      } else if (selectedItem?.type === "combo") {
        const combo = item.combo;
        const price = parseFloat(combo?.discountPrice || combo?.price || 0);
        return total + price * quantity;
      }
      return total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  useEffect(() => {
    setSubTotal(subtotal);
  }, [subtotal, setSubTotal]);

  return (
    <div className="border rounded-lg p-3 sm:p-4 shadow-sm bg-white md:sticky md:top-4 h-fit">
      <div className="flex justify-between items-center mb-4 pt-2  border-gray-200">
        {" "}
        {/* border-t-2 */}
        <h3 className="text-base sm:text-lg font-bold font-hind">টোটাল</h3>
        <span className="text-lg sm:text-xl font-bold text-gray-800">
          ৳{total}
        </span>
      </div>

      <button
        type="button"
        onClick={onOrderConfirm}
        disabled={isSubmitting}
        className="w-full font-hind bg-green-600 cursor-pointer hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-colors sm:text-base"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            প্রক্রিয়াকরণ হচ্ছে...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h14l-1.5 8H6L3 6h18"
              />
            </svg>
            অর্ডার টি কনফার্ম করুন ৳{total}
          </>
        )}
      </button>

      <button
        onClick={() => {
          window.open("tel:+8801335134988", "_blank");
        }}
        className="w-full mt-4 bg-sky-600 hover:bg-sky-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
      >
        <LucidePhoneCall className="size-5" />
        আমাদের বিশেষজ্ঞের সাথে সরাসরি কথা বলুন <br />
        01335134988 , 01753098960
      </button>
    </div>
  );
};

export default OrderSummary;
