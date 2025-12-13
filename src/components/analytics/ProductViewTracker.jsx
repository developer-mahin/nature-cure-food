"use client";

import { useEffect, useRef, useState } from "react";
import { trackViewContent } from "./FacebookPixel";
import { trackTikTokViewContent } from "./TikTokPixel";

export default function ProductViewTracker({ product, eventID = null }) {
  const [pixelReady, setPixelReady] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);
  const currentProductId = useRef(null);

  useEffect(() => {
    if (product?.id !== currentProductId.current) {
      setHasTracked(false);
      currentProductId.current = product?.id;
    }
  }, [product?.id]);

  useEffect(() => {
    let checkCount = 0;
    const maxChecks = 50;

    const checkPixelReady = setInterval(() => {
      checkCount++;

      const fbqReady =
        typeof window !== "undefined" && typeof window.fbq === "function";
      const ttqReady =
        typeof window !== "undefined" &&
        (typeof window.ttq === "function" ||
          (Array.isArray(window.ttq) && window.ttq.push));

      if (fbqReady && ttqReady) {
        setPixelReady(true);
        clearInterval(checkPixelReady);
      } else if (checkCount >= maxChecks) {
        setPixelReady(true);
        clearInterval(checkPixelReady);
      }
    }, 100);

    return () => {
      clearInterval(checkPixelReady);
    };
  }, []);

  useEffect(() => {
    if (hasTracked) {
      return;
    }

    if (!product) {
      return;
    }

    if (!pixelReady) {
      return;
    }

    const firstVariant = product?.variants?.[0] || {};
    const productPrice =
      firstVariant.discountPrice || firstVariant.price || product.price || 0;

    const categoryName =
      typeof product?.category === "object"
        ? product?.category?.name
        : product?.category || "Health Products";

    const eventIdToUse = eventID || product?.pixelEventId || null;

    trackViewContent(
      {
        id: product.id,
        name: product.name,
        category: categoryName,
        type: "product",
        value: productPrice,
      },
      eventIdToUse
    );

    trackTikTokViewContent(
      {
        id: product.id,
        name: product.name,
        category: categoryName,
        type: "product",
        value: productPrice,
      },
      eventIdToUse
    );

    setHasTracked(true);
  }, [product?.id, eventID, pixelReady, hasTracked]);

  return null;
}
