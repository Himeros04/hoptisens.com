"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Users } from "lucide-react";
import type { CompanySize, Department } from "@/lib/diagnostic/types";
import { COMPANY_SIZE_LABELS, DEPARTMENT_LABELS } from "@/lib/diagnostic/catalog";

interface StepCompanyProps {
  data: { companySize?: CompanySize; department?: Department };
  onChange: (data: Partial<StepCompanyProps["data"]>) => void;
}

const DEPT_ICONS: Record<string, string> = {
  direction: "👑",
  commercial: "📊",
  marketing: "📣",
  finance_admin: "💰",
  operations: "⚙️",
  it_tech: "💻",
  rh: "👥",
  transversal: "🔄",
};

export function StepCompany({ data, onChange }: StepCompanyProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
          Votre entreprise en bref.
        </h2>
      </div>

      {/* Taille */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Nombre de collaborateurs
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Object.entries(COMPANY_SIZE_LABELS).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onChange({ companySize: key as CompanySize })}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-4 rounded-xl border transition-all text-sm cursor-pointer",
                data.companySize === key
                  ? "bg-accent-soft border-accent shadow-md"
                  : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
              )}
            >
              <Users className={cn("w-5 h-5", data.companySize === key ? "text-accent" : "text-text-muted")} />
              <span className="font-medium text-text-primary">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Département */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Département principal concerné
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(DEPARTMENT_LABELS).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onChange({ department: key as Department })}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm cursor-pointer",
                data.department === key
                  ? "bg-accent-soft border-accent shadow-md"
                  : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
              )}
            >
              <span className="text-lg">{DEPT_ICONS[key]}</span>
              <span className="flex-1 text-text-primary">{label}</span>
              {data.department === key && <Check className="w-4 h-4 text-accent" />}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
