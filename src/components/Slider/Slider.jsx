import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { assets } from "../../../public/assets";
import Container from "../reusable/Container";
import { Button } from "../ui/button";
import {
  MotionBanner,
  MotionTextContainer,
  MotionTextItem,
  MotionButton,
  MotionBrandSection,
  MotionBrandItem,
} from "./MotionWrappers";

export default function Slider() {
  const brand = [
    assets.images.optimum,
    assets.images.index,
    assets.images.sherin,
    assets.images.gsAyurvedic,
    assets.images.naturalCure,
    assets.images.arcade,
    assets.images.naturalCure,
  ];

  return (
    <section>
      {/* Hero Banner */}
      <MotionBanner
        style={{
          backgroundImage: `url('/assets/Banner-Compress-6.jpg')`,
        }}
        className="w-full lg:h-[630px] h-[350px] bg-no-repeat bg-center bg-cover"
      >
        <Container>
          <div className="grid lg:grid-cols-2 items-center justify-center lg:mt-10 mt-7 lg:px-0 px-5">
            <MotionTextContainer>
              <MotionTextItem className="font-bold text-lg lg:mb-6 mb-3">
                Explore UPTO 30% OFF
              </MotionTextItem>

              <MotionTextItem
                style={{
                  fontFamily: "Playfair Display",
                }}
                className="lg:text-[50px] text-xl lg:leading-[60px] font-semibold text-[#097B35]"
              >
                Discover the Power of Unani, Ayurvedic & Herbal Medicine for
                Natural Healing
              </MotionTextItem>

              <MotionButton>
                <Button
                  variant="primary"
                  className="lg:mt-10 mt-6 w-[150px] h-12"
                >
                  <Link href="/all-products">Shop Now</Link>
                </Button>
              </MotionButton>
            </MotionTextContainer>

            {/* Empty right side for image spacing */}
            <div></div>
          </div>
        </Container>
      </MotionBanner>

      {/* Brand Logos Marquee */}
      <MotionBrandSection className="bg-[#E6F2EB] flex items-center justify-center">
        <Container className="py-5 lg:py-5 lg:px-20">
          <Marquee
            direction="left"
            speed={100}
            gradient={false}
            className="h-[125px]"
          >
            <div className="flex items-center justify-between gap-x-20 pr-20">
              {brand.map((b, index) => (
                <MotionBrandItem key={index}>
                  <Image
                    src={b}
                    alt="brand"
                    width={1000}
                    height={1000}
                    className="w-[120px] h-fit"
                  />
                </MotionBrandItem>
              ))}
            </div>
          </Marquee>
        </Container>
      </MotionBrandSection>
    </section>
  );
}
