"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import type { PainPoint } from "@/lib/diagnostic/types";
import { PAIN_POINT_LABELS } from "@/lib/diagnostic/catalog";

interface StepPainPointsProps {
  data: {
    painPoints?: PainPoint[];
    priorityPainPoint?: PainPoint;
    painPointDescription?: string;
  };
  onChange: (data: Partial<StepPainPointsProps["data"]>) => void;
}

export function StepPainPoints({ data, onChange }: StepPainPointsProps) {
  const selected = data.painPoints || [];

  const togglePainPoint = (pp: PainPoint) => {
    let updated: PainPoint[];
    if (selected.includes(pp)) {
      updated = selected.filter((p) => p !== pp);
      // If we removed the priority, reset it
      if (data.priorityPainPoint === pp) {
        onChange({ painPoints: updated, priorityPainPoint: updated[0] });
        return;
      }
    } else {
      if (selected.length >= 4) return; // max 4
      updated = [...selected, pp];
    }
    onChange({
      painPoints: updated,
      priorityPainPoint: data.priorityPainPoint && updated.includes(data.priorityPainPoint)
        ? data.priorityPainPoint
        : updated[0],
    });
  };

  const setPriority = (pp: PainPoint) => {
    onChange({ priorityPainPoint: pp });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
          Quels processus vous font perdre le plus de temps ?
        </h2>
        <p className="text-text-muted text-sm">
          Sélectionnez 1 à 4 irritants, puis indiquez votre priorité n°1.
        </p>
      </div>

      {/* Pain points selection */}
      <div className="space-y-3">
        {Object.entries(PAIN_POINT_LABELS).map(([key, { label, description }], i) => {
          const pp = key as PainPoint;
          const isSelected = selected.includes(pp);
          const isPriority = data.priorityPainPoint === pp;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => togglePainPoint(pp)}
                className={cn(
                  "flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm cursor-pointer",
                  isSelected
                    ? isPriority
                      ? "bg-accent-soft border-accent shadow-md ring-2 ring-accent/20"
                      : "bg-accent-soft border-accent shadow-md"
                    : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
                )}
              >
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{description}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-accent shrink-0" />}
              </button>

              {/* Priority star */}
              {isSelected && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setPriority(pp)}
                  title="Définir comme priorité n°1"
                  className={cn(
                    "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer",
                    isPriority
                      ? "bg-accent text-white border-accent"
                      : "bg-surface border-border text-text-muted hover:border-accent-border"
                  )}
                >
                  <Star className="w-4 h-4" fill={isPriority ? "currentColor" : "none"} />
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Free text */}
      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Décrivez en une phrase votre plus grand irritant (optionnel)
          </label>
          <textarea
            placeholder="Ex: Je passe 2h par jour à recopier des données entre mon CRM et mes tableaux Excel..."
            value={data.painPointDescription || ""}
            onChange={(e) => onChange({ painPointDescription: e.target.value.slice(0, 200) })}
            maxLength={200}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent resize-none"
          />
          <p className="text-xs text-text-muted mt-1 text-right">
            {(data.painPointDescription || "").length}/200
          </p>
        </motion.div>
      )}
    </div>
  );
}
