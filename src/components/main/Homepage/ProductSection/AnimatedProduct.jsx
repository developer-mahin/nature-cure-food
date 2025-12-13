/**
 * Animated Product Grid - Server Component
 * Uses CSS animations instead of Framer Motion for full SSR
 * Products fade in from top to bottom on page load
 */

import ProductCardServer from "./ProductCardServer";

const AnimatedProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 min-[390px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-start justify-center p-2 sm:p-4 lg:px-0 animate-fade-in">
      {products?.map((p, index) => {
        return (
          <div
            key={p.id || index}
            className="animate-fade-in-down hover:scale-[1.015] sm:hover:scale-105 transition-transform duration-300"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <ProductCardServer product={p} />
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedProductGrid;
