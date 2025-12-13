import Container from "@/components/reusable/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const OfferSection = () => {
  return (
    <div className="bg-[#EDE3D1] lg:h-[540px] lg:pb-0 pb-10">
      <Container className={"py-0 lg:py-0"}>
        <div className="lg:grid lg:grid-cols-2 items-center flex flex-col-reverse">
          <div className="">
            <Image
              src="/assets/images/offer.png"
              alt="offer"
              width={1000}
              height={100}
              className="w-[600px] lg:mt-16 mt-8"
            />
          </div>
          <div className="lg:mt-0 mt-14 lg:px-0 px-5">
            <p className="text-5xl font-semibold mb-8">UPTO 30% Off</p>
            <p>
              100% herbal formulas for daily wellness. Limited‑time offer — buy{" "}
              <br /> today and start living fresh and chemical‑free.
            </p>

            <Button className="w-[160px] h-12 mt-8" variant="primary">
              Buy Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OfferSection;
