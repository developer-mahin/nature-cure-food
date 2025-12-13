"use client";

import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselPreview = ({ images, styles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (styles?.slideInterval && images.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, Number(styles.slideInterval));
      return () => clearInterval(interval);
    }
  }, [currentIndex, styles?.slideInterval, images.length]);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        width: styles?.width || "100%",
        height: styles?.height || "400px",
      }}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-center"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="max-w-full max-h-full object-cover"
              style={{
                borderRadius: styles?.borderRadius,
              }}
            />
          </div>
        ))}
      </div>

      {styles?.showControls !== false && images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {styles?.showIndicators !== false && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselPreview;
