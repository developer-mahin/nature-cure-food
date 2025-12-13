/**
 * Client Product Grid - Server Component
 * Now server-rendered with CSS animations (no client-side JS needed)
 */

import AnimatedProductGrid from "./AnimatedProduct";

export default function ClientProductGrid({ products }) {
  return <AnimatedProductGrid products={products} />;
}
