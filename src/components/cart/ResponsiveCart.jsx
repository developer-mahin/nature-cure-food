"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartSheet from "./CartSheet";
import DesktopCartPage from "./DesktopCartPage";

const ResponsiveCart = ({
  trigger,
  open,
  onOpenChange,
  listenToOpenEvent = false,
  isMobile = false,
}) => {
  const [screenSize, setScreenSize] = useState("desktop");
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setScreenSize("mobile");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle cart opening for desktop - navigate to cart page
  const handleDesktopCartOpen = () => {
    router.push("/cart");
  };

  // If mobile or forced mobile mode, use drawer
  if (screenSize === "mobile" || isMobile) {
    return (
      <CartSheet
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
        listenToOpenEvent={listenToOpenEvent}
      />
    );
  }

  // If desktop, use page navigation
  if (trigger) {
    // Clone the trigger and add onClick handler for desktop
    const triggerWithClick = {
      ...trigger,
      props: {
        ...trigger.props,
        onClick: (e) => {
          e.preventDefault();
          handleDesktopCartOpen();
          if (trigger.props.onClick) {
            trigger.props.onClick(e);
          }
        },
      },
    };

    return triggerWithClick;
  }

  return null;
};

export default ResponsiveCart;
