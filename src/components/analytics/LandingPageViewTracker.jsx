"use client";

import { useEffect, useState } from "react";
import { trackViewContent } from "./FacebookPixel";
import {
  trackTikTokInitiateCheckout,
  trackTikTokViewContent,
} from "./TikTokPixel";

export default function LandingPageViewTracker({ landingPage }) {
  const [pixelReady, setPixelReady] = useState(false);

  useEffect(() => {
    const checkPixelReady = setInterval(() => {
      if (typeof window !== "undefined" && window.fbq && window.ttq) {
        setPixelReady(true);
        clearInterval(checkPixelReady);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(checkPixelReady);
      if (!pixelReady) {
        setPixelReady(true);
      }
    }, 5000);

    return () => {
      clearInterval(checkPixelReady);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (landingPage && pixelReady) {
      let totalValue = 0;

      if (landingPage.products && Array.isArray(landingPage.products)) {
        totalValue += landingPage.products.reduce((sum, item) => {
          const price = item.variant?.discountPrice || item.variant?.price || 0;
          const quantity = item.quantity || 1;
          return sum + Number(price) * quantity;
        }, 0);
      }

      if (landingPage.combos && Array.isArray(landingPage.combos)) {
        totalValue += landingPage.combos.reduce((sum, item) => {
          const price = item.combo?.discountPrice || item.combo?.price || 0;
          return sum + Number(price);
        }, 0);
      }

      const contentNames = [
        ...(landingPage.products || []).map(
          (item) => item.product?.name || "Product"
        ),
        ...(landingPage.combos || []).map(
          (item) => item.combo?.name || "Combo"
        ),
      ].filter(Boolean);

      const contentName =
        contentNames.length > 0
          ? contentNames.join(", ")
          : landingPage.title || landingPage.name || "Product";

      trackViewContent({
        id: landingPage.id || landingPage.slug,
        name: contentName,
        category: "Landing Page",
        type: "product",
        value: totalValue,
      });

      trackTikTokViewContent({
        id: landingPage.id || landingPage.slug,
        name: contentName,
        category: "Landing Page",
        type: "product",
        value: totalValue,
        contents: [
          ...(landingPage.products || []).map((item) => ({
            content_id: item.product?.id,
            content_name: item.product?.name || "Product",
            price: item.variant?.discountPrice || item.variant?.price || 0,
            quantity: item.quantity || 1,
          })),
          ...(landingPage.combos || []).map((item) => ({
            content_id: item.combo?.id,
            content_name: item.combo?.name || "Combo",
            price: item.combo?.discountPrice || item.combo?.price || 0,
            quantity: 1,
          })),
        ],
      });

      if (landingPage.products?.length > 0 || landingPage.combos?.length > 0) {
        trackTikTokInitiateCheckout({
          value: totalValue,
          currency: "BDT",
          contents: [
            ...(landingPage.products || []).map((item) => ({
              content_id: item.product?.id,
              content_name: item.product?.name,
              price: item.variant?.discountPrice || item.variant?.price || 0,
              quantity: item.quantity || 1,
            })),
            ...(landingPage.combos || []).map((item) => ({
              content_id: item.combo?.id,
              content_name: item.combo?.name,
              price: item.combo?.discountPrice || item.combo?.price || 0,
              quantity: 1,
            })),
          ],
        });
      }
    }
  }, [landingPage, pixelReady]);

  return null;
}
