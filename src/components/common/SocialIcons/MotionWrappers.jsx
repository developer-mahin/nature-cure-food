"use client";

import { motion } from "framer-motion";

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const iconVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    scale: 1.2,
    rotate: 8,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.9 },
};

// Motion wrapper components
export function MotionSocialContainer({ children, className }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionSocialIcon({ children, href, target, rel }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      variants={iconVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.a>
  );
}
