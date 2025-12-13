import { staticProducts } from "@/lib/staticProducts";
import ProductCard from "../ProductSection/ProductCard";
import { MotionProductContainer, MotionProductCard } from "./MotionWrappers";

const Unani = () => {
  return (
    <MotionProductContainer>
      <div className="min-h-screen grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-8 gap-4 items-start justify-center p-4 lg:mt-3">
        {staticProducts?.map((p, index) => (
          <MotionProductCard key={index}>
            <ProductCard
              product={p}
              discountClass="bg-[#FF4242] hover:bg-[#FF1748] rounded-full lg:h-9"
              stockOutClass="bg-[#FFB1B1] hover:bg-[#ACA1A1] rounded-full lg:h-8 hover:bg-error-100 text-[#FF4242]"
            />
          </MotionProductCard>
        ))}
      </div>
    </MotionProductContainer>
  );
};

export default Unani;
