"use client";

import { motion } from "framer-motion";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ y: 54, opacity: 0, scale: .985 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .9, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}
