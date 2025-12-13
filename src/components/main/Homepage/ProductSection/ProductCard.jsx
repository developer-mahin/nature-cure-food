/**
 * Product Card - Compatibility Wrapper
 * Server component with CSS animations
 * Use ProductCardServer directly for better SEO in new code
 */

import ProductCardServer from "./ProductCardServer";

const ProductCard = ({
  product,
  discountClass,
  stockOutClass,
  mainClass,
  imageClass,
  onCartOpen,
}) => {
  return (
    <div className="animate-fade-in-down hover:scale-105 transition-transform duration-300">
      <ProductCardServer
        product={product}
        discountClass={discountClass}
        stockOutClass={stockOutClass}
        mainClass={mainClass}
        imageClass={imageClass}
      />
    </div>
  );
};

export default ProductCard;
