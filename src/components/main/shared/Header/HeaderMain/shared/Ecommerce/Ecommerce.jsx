"use client";

import ResponsiveCart from "@/components/cart/ResponsiveCart";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../../../../../../../public/assets";
import DropdownMenuProfile from "../DropdownMenu/DropdownMenuProfile";

const Ecommerce = ({ foreground }) => {
  // const { auth } = useAuth();
  const auth = false;
  const { itemCount } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { scale: 1.15, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center sm:space-x-8 space-x-6"
    >
      {/* cart */}
      <motion.div variants={itemVariants} whileHover="hover">
        <ResponsiveCart
          listenToOpenEvent={true}
          trigger={
            <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
              <div className="relative">
                <ShoppingCart
                  className={`inline ${
                    foreground && "text-primary-foreground"
                  }`}
                />
                <TypographySmall className="absolute left-auto -ml-1 -top-1 rounded-full bg-[#EA0000] px-1 py-0 text-primary-foreground inline">
                  {itemCount}
                </TypographySmall>
              </div>
              <TypographySmall
                className={`inline ${foreground && "text-primary-foreground"}`}
              >
                Cart
              </TypographySmall>
            </div>
          }
        />
      </motion.div>

      {/* user profile or login */}
      <motion.div variants={itemVariants} whileHover="hover">
        {auth ? (
          <DropdownMenuProfile />
        ) : (
          <Link href="/sign-in" className="!bg-white">
            <Image
              src={assets.icons.user}
              alt="user"
              width={30}
              height={30}
              className="mr-2"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Ecommerce;
