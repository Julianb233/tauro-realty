"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      {badge && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20 mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h1>
      {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
    </motion.div>
  );
}
