"use client";

import LandingCartSheet from "@/components/landing/LandingCartSheet";
import { useState } from "react";

const LandingCartWrapper = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {children}
      <LandingCartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        listenToOpenEvent={true}
      />
    </>
  );
};

export default LandingCartWrapper;
