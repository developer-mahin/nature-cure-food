/**
 * Related Products - Server Component
 * Uses CSS animations for performance and SEO
 * Products fade in from top to bottom
 */

import ProductCardServer from "@/components/main/Homepage/ProductSection/ProductCardServer";

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 animate-slide-left">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item, index) => (
          <div
            key={item.id}
            className="animate-fade-in-down hover:scale-105 transition-transform duration-300"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <ProductCardServer product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
