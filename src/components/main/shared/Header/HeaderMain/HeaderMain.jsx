"use client";
import { useEffect, useState } from "react";
import MainNav from "./Navs/MainNav/MainNav";
import NavItems from "./Navs/MainNav/NavItems";
import ScrolledNav from "./Navs/ScrolledNav/ScrolledNav";
import TopNav from "./Navs/TopNav/TopNav";
import SmallDeviceNav from "./SmallDeviceNav/SmallDeviceNav";

const HeaderMain = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* header for large device */}
      <div className="hidden lg:block">
        {/* top navbar */}
        <div className="bg-transparent border-b">
          <TopNav />
        </div>

        {/* main navbar */}
        <div className="shadow-sm bg-background">
          <div className="py-4">
            <MainNav />
          </div>
          <div className="">
            <NavItems />
          </div>
        </div>

        {/* scrolled navbar */}
        <div className="fixed left-0 top-0 right-0 z-50">
          <div
            className={`bg-background border-b py-2 shadow-sm transform transition-transform duration-500 ease-in-out ${
              isScrolled ? "translate-y-0" : "-translate-y-full"
            } pointer-events-auto`}
            aria-hidden={!isScrolled}
          >
            <ScrolledNav />
          </div>
        </div>
      </div>

      {/* header for small device */}
      <div className="lg:hidden">
        <SmallDeviceNav />
      </div>
    </>
  );
};

export default HeaderMain;
