"use client";

import TypographyH2 from "@/components/reusable/Typography/TypographyH2";
import Tabs from "@/components/ui/Tab";

const ProductCategorise = () => {
  return (
    <div>
      <TypographyH2
        className={
          "text-center mb-3 bg-transparent mt-6 lg:text-5xl text-3xl lg:pt-20 lg:pb-10 pb-3"
        }
      >
        Our Medicine Hub
      </TypographyH2>
      <Tabs />
    </div>
  );
};

export default ProductCategorise;
