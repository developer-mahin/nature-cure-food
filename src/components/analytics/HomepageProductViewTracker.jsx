"use client";

import { useEffect, useRef } from "react";
import { trackViewContent } from "./FacebookPixel";
import { trackTikTokViewContent } from "./TikTokPixel";

export default function HomepageProductViewTracker({ products }) {
  const viewedProducts = useRef(new Set());

  useEffect(() => {
    if (!products || products.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = entry.target.dataset.productId;
            const product = products.find((p) => p.id === productId);

            if (product && !viewedProducts.current.has(productId)) {
              viewedProducts.current.add(productId);

              const firstVariant = product?.variants?.[0] || {};
              const productPrice =
                firstVariant.discountPrice ||
                firstVariant.price ||
                product.price ||
                0;

              const categoryName =
                typeof product?.category === "object"
                  ? product?.category?.name
                  : product?.category || "Health Products";

              trackViewContent({
                id: product.id,
                name: product.name,
                category: categoryName,
                type: "product",
                value: productPrice,
              });

              trackTikTokViewContent({
                id: product.id,
                name: product.name,
                category: categoryName,
                type: "product",
                value: productPrice,
              });
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const productElements = document.querySelectorAll("[data-product-id]");
    productElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [products]);

  return null;
}
