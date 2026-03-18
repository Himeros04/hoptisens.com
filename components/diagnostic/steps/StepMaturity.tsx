"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { MaturityLevel, TimeHorizon } from "@/lib/diagnostic/types";
import { MATURITY_LABELS, TIME_HORIZON_LABELS } from "@/lib/diagnostic/catalog";

interface StepMaturityProps {
  data: { maturity?: MaturityLevel; timeHorizon?: TimeHorizon };
  onChange: (data: Partial<StepMaturityProps["data"]>) => void;
}

export function StepMaturity({ data, onChange }: StepMaturityProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
          Où en êtes-vous avec l&apos;IA et l&apos;automatisation ?
        </h2>
      </div>

      {/* Maturity level - visual cards */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Votre niveau actuel
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(MATURITY_LABELS).map(([key, { label, emoji, description }], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onChange({ maturity: key as MaturityLevel })}
              className={cn(
                "flex flex-col items-center text-center gap-3 px-5 py-6 rounded-2xl border transition-all cursor-pointer",
                data.maturity === key
                  ? "bg-accent-soft border-accent shadow-md"
                  : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
              )}
            >
              <span className="text-3xl">{emoji}</span>
              <span className="font-medium text-text-primary">{label}</span>
              <span className="text-xs text-text-muted leading-relaxed">
                &ldquo;{description}&rdquo;
              </span>
              {data.maturity === key && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-5 h-5 text-accent" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time horizon */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Horizon de temps
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(TIME_HORIZON_LABELS).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onChange({ timeHorizon: key as TimeHorizon })}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm cursor-pointer",
                data.timeHorizon === key
                  ? "bg-accent-soft border-accent shadow-md"
                  : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
              )}
            >
              <span className="flex-1 text-text-primary">{label}</span>
              {data.timeHorizon === key && <Check className="w-4 h-4 text-accent" />}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
