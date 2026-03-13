"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

export function Card({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -6, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15)", borderColor: "var(--color-accent-border)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
