"use client";

import { motion } from "framer-motion";

// Animation variants
export const textContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const buttonVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.1 },
  },
};

export const bannerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// Motion wrapper components
export function MotionBanner({ children, className, style }) {
  return (
    <motion.div
      variants={bannerVariant}
      initial="hidden"
      animate="visible"
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionTextContainer({ children }) {
  return (
    <motion.div variants={textContainer} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}

export function MotionTextItem({ children, className, style }) {
  return (
    <motion.p variants={textItem} className={className} style={style}>
      {children}
    </motion.p>
  );
}

export function MotionButton({ children }) {
  return (
    <motion.div variants={buttonVariant} whileHover="hover">
      {children}
    </motion.div>
  );
}

export function MotionBrandSection({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionBrandItem({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {children}
    </motion.div>
  );
}
