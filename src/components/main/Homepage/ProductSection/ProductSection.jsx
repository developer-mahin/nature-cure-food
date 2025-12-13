// ProductSection.tsx
import Container from "@/components/reusable/Container";
import TypographyH2 from "@/components/reusable/Typography/TypographyH2";
import ClientProductGrid from "./ClientProductGrid";

const ProductSection = ({ products = [] }) => {
  return (
    <section className="bg-white">
      <Container className="py-8 sm:py-10 lg:py-14">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-5 mb-6 sm:mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm px-3 py-1 font-semibold tracking-wide">
            Trusted Ayurvedic Remedies
          </span>
          <TypographyH2 className="bg-transparent text-3xl sm:text-[2.5rem] lg:text-[3.25rem] leading-tight font-semibold text-slate-900">
            Our Medicine Hub
          </TypographyH2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl">
            Discover physician-approved natural formulas tailored for modern
            Bangladeshi lifestyles. Every product is vetted for purity, safety,
            and fast relief so you can shop with complete confidence.
          </p>
        </div>

        <ClientProductGrid products={products} />
      </Container>
    </section>
  );
};

export default ProductSection;
