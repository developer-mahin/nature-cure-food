import { staticProducts } from "@/lib/staticProducts";
import ProductCard from "../ProductSection/ProductCard";

const Ayurvedic = () => {
  return (
    <div>
      <div className="min-h-screen grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-8 gap-4 items-start justify-center p-4 lg:mt-3">
        {staticProducts?.map((p, index) => (
          <ProductCard
            key={index}
            product={p}
            discountClass="bg-[#FF4242] rounded-full lg:h-9"
            stockOutClass="bg-[#FFB1B1] rounded-full lg:h-8 hover:bg-[#FFB1B1] text-[#FF4242]"
          />
        ))}
      </div>
    </div>
  );
};

export default Ayurvedic;
