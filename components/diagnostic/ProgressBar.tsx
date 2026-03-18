"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number; // 1-5
  totalSteps?: number;
}

const STEP_LABELS = ["Profil", "Entreprise", "Outils", "Douleurs", "Maturité"];

export function ProgressBar({ currentStep, totalSteps = 5 }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      {/* Mobile: simple text */}
      <p className="text-sm text-text-muted mb-3 md:hidden">
        Étape {currentStep}/{totalSteps}
      </p>

      {/* Desktop: labels */}
      <div className="hidden md:flex justify-between mb-2 px-1">
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={cn(
              "text-xs font-medium transition-colors",
              i + 1 <= currentStep ? "text-accent" : "text-text-muted"
            )}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Progress track */}
      <div className="relative flex items-center">
        {/* Background track */}
        <div className="absolute inset-0 h-0.5 top-1/2 -translate-y-1/2 bg-border rounded-full" />

        {/* Filled track */}
        <motion.div
          className="absolute h-0.5 top-1/2 -translate-y-1/2 bg-accent rounded-full origin-left"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {/* Dots */}
        <div className="relative flex justify-between w-full">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full border-2 transition-colors z-10",
                i + 1 < currentStep
                  ? "bg-accent border-accent"
                  : i + 1 === currentStep
                  ? "bg-bg border-accent"
                  : "bg-bg border-border"
              )}
              animate={
                i + 1 === currentStep
                  ? { scale: [1, 1.2, 1], borderColor: "var(--color-accent)" }
                  : {}
              }
              transition={
                i + 1 === currentStep
                  ? { duration: 1.5, repeat: Infinity }
                  : {}
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
