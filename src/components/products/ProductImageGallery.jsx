"use client";

import ProductImage from "@/components/common/ProductImage";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ProductImageGallery({
  images,
  productName,
  discount,
  coverImg,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Configuration
  const ZOOM_LEVEL = 2.5;
  const LENS_SIZE = 200; // px

  // Create image array from both images array and coverImg
  const productImages = (() => {
    const imageList = [];

    // Add coverImg if it exists
    if (coverImg) {
      imageList.push(coverImg);
    }

    // Add images array if it exists and has items
    if (Array.isArray(images) && images.length > 0) {
      imageList.push(...images);
    }

    // If no images at all, use fallback
    if (imageList.length === 0) {
      imageList.push("/assets/products/product-1.png");
    }

    // For testing: Add sample images if only one image exists
    if (imageList.length === 1) {
      imageList.push(
        "/assets/products/product-2.png",
        "/assets/products/product-3.png",
        "/assets/products/product-4.png"
      );
    }

    return imageList;
  })();

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    
    // Mouse position relative to the image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Ensure mouse is within bounds for the lens calculation
    // (Optional: clamp values if needed, but onMouseMove usually handles this)

    setMousePosition({ x, y });
    
    // Calculate lens position (centered on mouse)
    // We clamp it so the lens doesn't go too far outside, 
    // but for a true magnifying glass it usually just follows the mouse.
    // Let's just follow the mouse.
    setLensPosition({
      x: x - LENS_SIZE / 2,
      y: y - LENS_SIZE / 2,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group cursor-none" // cursor-none to hide default cursor when zooming
        ref={imageContainerRef}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {discount && (
          <span className="absolute top-4 left-4 bg-[#2CE514] text-black px-3 py-1.5 rounded-full text-sm font-bold z-20 shadow-sm">
            {discount}
          </span>
        )}

        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              {/* Base Image */}
              <ProductImage
                src={
                  productImages[selectedImage] ||
                  "/assets/products/product-1.png"
                }
                alt={productName || "Product"}
                width={800}
                height={800}
                className="w-full h-full object-contain"
                priority
              />

              {/* Magnifying Lens */}
              {isZoomed && (
                <div
                  className="absolute border-2 border-gray-200 rounded-full shadow-xl pointer-events-none z-30 bg-white"
                  style={{
                    width: `${LENS_SIZE}px`,
                    height: `${LENS_SIZE}px`,
                    left: `${lensPosition.x}px`,
                    top: `${lensPosition.y}px`,
                    backgroundImage: `url('${
                      productImages[selectedImage] ||
                      "/assets/products/product-1.png"
                    }')`,
                    backgroundRepeat: "no-repeat",
                    // Calculate background position to show the magnified area
                    // The point (mousePosition.x, mousePosition.y) in the original image
                    // corresponds to (mousePosition.x * ZOOM, mousePosition.y * ZOOM) in the zoomed image.
                    // We want that point to be at the center of the lens (LENS_SIZE/2, LENS_SIZE/2).
                    // So we shift the background by: LENS_SIZE/2 - (mousePosition.x * ZOOM)
                    backgroundPosition: `${
                      LENS_SIZE / 2 - mousePosition.x * ZOOM_LEVEL
                    }px ${LENS_SIZE / 2 - mousePosition.y * ZOOM_LEVEL}px`,
                    backgroundSize: `${
                      (imageContainerRef.current?.offsetWidth || 0) * ZOOM_LEVEL
                    }px ${
                      (imageContainerRef.current?.offsetHeight || 0) * ZOOM_LEVEL
                    }px`,
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 0 && (
        <div className="grid grid-cols-5 gap-3">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === idx
                  ? "border-[#2CE514] ring-2 ring-[#2CE514]/20"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <div className="w-full h-full bg-white p-1">
                <ProductImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Overlay for non-selected items */}
              {selectedImage !== idx && (
                <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
