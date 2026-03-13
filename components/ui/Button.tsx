"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "default",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#2A2A2A] text-[#F9F7F3] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.1)] hover:bg-[#1A1A1A] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_6px_14px_rgba(0,0,0,0.15)]",
    secondary: "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
    ghost: "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
  };

  const sizes = {
    default: "h-11 px-6 text-base",
    sm: "h-9 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
