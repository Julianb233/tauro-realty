"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({ children, className, hover = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={clsx("glass-card p-5 md:p-6", hover && "glass-card-hover cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}
