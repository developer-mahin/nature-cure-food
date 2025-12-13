"use client";

import { useEffect, useRef } from "react";
import { trackInitiateCheckout } from "./FacebookPixel";
import { trackTikTokInitiateCheckout } from "./TikTokPixel";

export default function CheckoutTracker({ cartItems }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      console.warn("⚠️ CheckoutTracker: No cart items to track");
      return;
    }

    const totalValue = cartItems.reduce((sum, item) => {
      const price = item.discountPrice || item.price || 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);

    const contentIds = cartItems.map((item) => item.id || item.productId);
    const numItems = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    trackInitiateCheckout({
      content_ids: contentIds,
      value: totalValue,
      currency: "BDT",
      num_items: numItems,
    });

    trackTikTokInitiateCheckout({
      value: totalValue,
      currency: "BDT",
      contents: cartItems.map((item) => ({
        content_id: item.id || item.productId,
        content_name: item.name,
        price: item.discountPrice || item.price || 0,
        quantity: item.quantity || 1,
      })),
    });

    hasTracked.current = true;
  }, []);

  return null;
}
