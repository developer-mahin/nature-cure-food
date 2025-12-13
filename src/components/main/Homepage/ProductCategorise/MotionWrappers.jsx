"use client";

import { motion } from "framer-motion";

// Animation variants
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Motion wrapper components
export function MotionProductContainer({ children, className }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionProductCard({ children }) {
  return <motion.div variants={cardVariants}>{children}</motion.div>;
}
