"use client";

import { usePathname } from "next/navigation";
import HeaderMain from "./HeaderMain/HeaderMain";

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/landing")) return null;

  return (
    <header className="bg-background mb-[0px] lg:pb-0 pb-10 xs:mb-[70px] md:mb-[81px] lg:mb-0">
      <HeaderMain />
    </header>
  );
};

export default Header;
