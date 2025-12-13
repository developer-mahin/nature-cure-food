"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Product Image Component
 * Handles image loading with error fallback
 */
export default function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/assets/products/product-1.png",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false); // Reset error state when src changes
  }, [src]);

  // Handle image loading error
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Use regular img tag if URL has spaces or special characters
  const needsUnoptimized = imgSrc?.includes(" ") || imgSrc?.includes("%20");

  if (needsUnoptimized || hasError) {
    return (
      <img
        src={imgSrc || fallbackSrc}
        alt={alt || "Product image"}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    );
  }

  return (
    <Image
      src={imgSrc || fallbackSrc}
      alt={alt || "Product image"}
      width={width}
      height={height}
      quality={75}
      className={className}
      onError={handleError}
      loading="lazy"
      // {...props}
    />
  );
}
