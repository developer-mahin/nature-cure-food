import Container from "@/components/reusable/Container";
import TypographyH4 from "@/components/reusable/Typography/TypographyH4";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FooterMiddle = () => {
  return (
    <Container className={"py-0 lg:py-0"}>
      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-20 max-lg:gap-8">
        <div className="lg:col-span-3 max-lg:col-span-full">
          {/* <TypographyH2
            className={"text-primary-foreground uppercase italic -mt-4 mb-4"}
          >
            Nature Cure Food
          </TypographyH2> */}

          <TypographySmall
            className={"text-primary-foreground flex items-center gap-2"}
          >
            <MapPin /> WHOLESALE & PRESS ENQUIRIES NZ:
          </TypographySmall>

          {/* phone */}
          <TypographySmall
            className={"text-primary-foreground mt-4 flex items-center gap-1"}
          >
            <Phone />
            <Link href={"tel:+8801767-390303"}>
              <TypographySmall
                className={
                  "text-primary-foreground mt-1 hover:text-primary hover:underline transition-all duration-300 inline"
                }
              >
                +8801767-390303
              </TypographySmall>
            </Link>
          </TypographySmall>

          {/* email */}
          <TypographySmall
            className={"text-primary-foreground mt-4 flex items-center gap-2"}
          >
            <Mail />
            <Link href={"mailto:info@yokelifestyles.com"}>
              <TypographySmall
                className={
                  "text-primary-foreground mt-1 hover:text-primary hover:underline transition-all duration-300 inline"
                }
              >
                info@yokelifestyles.com
              </TypographySmall>
            </Link>
          </TypographySmall>
        </div>

        <div>
          <TypographyH4 className={"text-primary-foreground uppercase mb-4"}>
            INFORMATION
          </TypographyH4>

          <ul className="space-y-4">
            <li>
              <Link href={"/about-us"}>
                <TypographySmall
                  className={
                    "text-primary-foreground hover:text-primary hover:underline transition-all duration-300 inline"
                  }
                >
                  About Us
                </TypographySmall>
              </Link>
            </li>

            <li>
              <Link href={"/privacy-policy"}>
                <TypographySmall
                  className={
                    "text-primary-foreground hover:text-primary hover:underline transition-all duration-300 inline"
                  }
                >
                  Privacy Policy
                </TypographySmall>
              </Link>
            </li>

            <li>
              <Link href={"terms-&-conditions"}>
                <TypographySmall
                  className={
                    "text-primary-foreground hover:text-primary hover:underline transition-all duration-300 inline"
                  }
                >
                  Terms & Conditions
                </TypographySmall>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <TypographyH4 className={"text-primary-foreground uppercase mb-4"}>
            SERVICE
          </TypographyH4>
          <ul className="space-y-4">
            <li>
              <Link href={"/delivery-&-returns"}>
                <TypographySmall
                  className={
                    "text-primary-foreground hover:text-primary hover:underline transition-all duration-300 inline"
                  }
                >
                  Delivery & Returns
                </TypographySmall>
              </Link>
            </li>
            <li>
              <Link href={"/size-&-fabric"}>
                <TypographySmall
                  className={
                    "text-primary-foreground hover:text-primary hover:underline transition-all duration-300 inline"
                  }
                >
                  Size & Fabric
                </TypographySmall>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default FooterMiddle;
