import SocialIcons from "@/components/common/SocialIcons";
import Container from "@/components/reusable/Container";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../../../../public/assets";
import {
  MotionFooterTopSection,
  MotionFooterTopItem,
  MotionFooterMainSection,
  MotionFooterMainGrid,
  MotionFooterItem,
  MotionFooterBottomSection,
} from "./MotionWrappers";

const footerTopBar = [
  {
    icon: assets.icons.freeShipping,
    title: "Free Shipping",
    description: "On all orders over $49.00",
  },
  {
    icon: assets.icons.return,
    title: "07 days returns",
    description: "Money back guarantee",
  },
  {
    icon: assets.icons.secureCheckOut,
    title: "Secure checkout",
    description: "Cash on Delivery Service",
  },
  {
    icon: assets.icons.gift,
    title: "Offer & gift here",
    description: "over all of the orders",
  },
];

const footerData = {
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Locations Map", href: "/locations" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Unani Medicine", href: "/services/unani-medicine" },
    { label: "Ayurvedic Medicine", href: "/services/ayurvedic-medicine" },
    { label: "Herbal Medicine", href: "/services/herbal-medicine" },
    { label: "Diabetic Medicine", href: "/services/diabetic-medicine" },
    { label: "Sexual health", href: "/services/sexual-health" },
    { label: "Promotional Offers", href: "/services/promotional-offers" },
  ],
  myAccount: [
    { label: "Login", href: "/login" },
    { label: "My account", href: "/account" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "My Orders", href: "/orders" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Compare", href: "/compare" },
  ],
};

const Footer = () => {
  return (
    <footer className="">
      <div className="w-full">
        {/* Top Banner Section */}
        <MotionFooterTopSection className="lg:bg-[#57FF98] lg:py-8 lg:mb-0 mb-8 mt-10">
          <Container className={"py-0 lg:py-0"}>
            <div className="flex flex-wrap justify-between items-center gap-4 px-4">
              {footerTopBar.map((item, index) => (
                <MotionFooterTopItem
                  key={index}
                  index={index}
                  className="flex items-center justify-center gap-3 lg:w-fit w-full lg:bg-transparent bg-[#57FF98] lg:py-0 py-8"
                >
                  <div className="">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="lg:size-[50px] size-[80px]"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-black">{item.description}</p>
                  </div>
                </MotionFooterTopItem>
              ))}
            </div>
          </Container>
        </MotionFooterTopSection>

        {/* Main Footer Section */}
        <MotionFooterMainSection className="bg-[#CAFFCE] py-12 lg:px-0 px-6">
          <Container className="py-0 lg:py-0">
            <div className="">
              <MotionFooterMainGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Brand Section */}
                <MotionFooterItem className="lg:col-span-1">
                  <div className="pb-3">
                    <Image
                      src={assets.images.logo}
                      alt="Logo"
                      width={130}
                      height={130}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <p className="text-black text-sm mb-4">
                    Discover Natural Wellness with Unani & Herbal Care
                  </p>
                  <div className="space-y-3 text-sm text-black">
                    <div className="flex items-start gap-2">
                      <Image
                        src={assets.icons.location}
                        alt="Location"
                        width={20}
                        height={20}
                        style={{ width: "auto", height: "auto" }}
                      />
                      <p>
                        Sahera Whab Mention, Housing Estate Area, West Akur
                        Takur Para, Tangail, Bangladesh
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={assets.icons.phone}
                        alt="Location"
                        width={20}
                        height={20}
                        style={{ width: "auto", height: "auto" }}
                      />
                      <p>09617400800</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={assets.icons.email}
                        alt="Location"
                        width={20}
                        height={20}
                      />
                      <p>toxinout.online@gmail.com</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <SocialIcons />
                  </div>
                </MotionFooterItem>

                {/* Company, Services, My Account, Newsletter Sections */}
                {["company", "services", "myAccount"].map((section, idx) => (
                  <MotionFooterItem key={idx}>
                    <h3 className="font-bold text-gray-800 mb-4">
                      {section === "myAccount"
                        ? "My Account"
                        : section.charAt(0).toUpperCase() + section.slice(1)}
                    </h3>
                    <ul className="space-y-2 text-sm text-black">
                      {footerData[section].map((item, i) => (
                        <li key={i}>
                          <Link
                            href={item.href}
                            className="hover:text-green-700 transition"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </MotionFooterItem>
                ))}

                {/* Newsletter Section */}
                <MotionFooterItem>
                  <h3 className="font-bold text-gray-800 mb-4">Newsletter</h3>
                  <p className="text-sm text-black mb-4">
                    Subscribe to our weekly Newsletter and receive updates via
                    email.
                  </p>
                  <div className="flex mb-4">
                    <input
                      type="email"
                      placeholder="Email*"
                      className="flex-1 px-4 py-2 rounded-l border-none focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      suppressHydrationWarning
                    />
                    <button className="bg-primary px-4 py-2 rounded-r text-white hover:bg-primary-600 transition">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      We Accept
                    </p>
                    <div>
                      <Image
                        src={assets.images.sslcom}
                        alt="sslcom"
                        width={1000}
                        height={100}
                      />
                    </div>
                  </div>
                </MotionFooterItem>
              </MotionFooterMainGrid>
            </div>
          </Container>
        </MotionFooterMainSection>

        {/* Bottom Footer Section */}
        <MotionFooterBottomSection className="bg-[#097B35] py-4 lg:px-0 px-6">
          <Container className="py-0 lg:py-0">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <p className="text-white text-sm">
                Copyright © 2025{" "}
                <span className="font-semibold">Natural Cure</span>. All Rights
                Reserved
              </p>
              <div className="flex gap-4 text-white text-sm">
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
                <a href="#" className="hover:underline">
                  Claim
                </a>
                <a href="#" className="hover:underline">
                  Privacy & Policy
                </a>
              </div>
            </div>
          </Container>
        </MotionFooterBottomSection>
      </div>
    </footer>
  );
};

export default Footer;
