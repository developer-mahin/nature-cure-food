"use client";

import { navItems } from "@/components/fakeData/navItem";
import Container from "@/components/reusable/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavItems = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms skeleton loading

    return () => clearTimeout(timer);
  }, []);

  // Animation variants for container and list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  if (isLoading) {
    // Different widths to mimic real nav items
    const skeletonWidths = [
      "w-20",
      "w-32",
      "w-28",
      "w-24",
      "w-36",
      "w-28",
      "w-24",
    ];

    return (
      <div className="bg-[#097B35] py-10">
        <Container className="py-0 lg:py-0">
          <ul className="flex items-center justify-between gap-x-5 text-white font-semibold mx-20">
            {skeletonWidths.map((width, i) => (
              <li key={i}>
                <Skeleton
                  className={`h-5 ${width} bg-white/20`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#097B35] py-10"
    >
      <Container className="py-0 lg:py-0">
        <motion.ul
          variants={containerVariants}
          className="flex items-center justify-between gap-x-5 text-white font-semibold mx-20"
        >
          {navItems.map((item) => (
            <motion.li
              key={item.path}
              variants={itemVariants}
              whileHover="hover"
              className="font-hind"
            >
              <Link href={item.path}>{item.title}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </motion.div>
  );
};

export default NavItems;
