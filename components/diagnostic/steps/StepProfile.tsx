"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import type { UserRole, Sector } from "@/lib/diagnostic/types";
import { ROLE_LABELS, SECTOR_LABELS } from "@/lib/diagnostic/catalog";

interface StepProfileProps {
  data: { role?: UserRole; roleOther?: string; sector?: Sector; sectorOther?: string };
  onChange: (data: Partial<StepProfileProps["data"]>) => void;
}

const ROLE_ICONS: Record<string, string> = {
  dirigeant: "👔",
  directeur_commercial: "📈",
  daf: "💰",
  responsable_ops: "⚙️",
  cto_dsi: "💻",
  responsable_marketing: "📣",
  autre: "✨",
};

const SECTOR_ICONS: Record<string, string> = {
  agence_esn: "🏢",
  conseil: "🤝",
  commerce_retail: "🛒",
  industrie_logistique: "🏭",
  services_b2b: "💼",
  sante: "🏥",
  immobilier: "🏠",
  education: "🎓",
  autre: "✨",
};

export function StepProfile({ data, onChange }: StepProfileProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
          Parlons de vous.
        </h2>
        <p className="text-text-muted text-sm">
          Ces informations nous permettent de cibler les automatisations les plus pertinentes pour votre fonction et votre secteur.
        </p>
      </div>

      {/* Rôle */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Votre rôle
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(ROLE_LABELS).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onChange({ role: key as UserRole })}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm cursor-pointer",
                data.role === key
                  ? "bg-accent-soft border-accent shadow-md"
                  : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
              )}
            >
              <span className="text-lg">{ROLE_ICONS[key]}</span>
              <span className="flex-1 text-text-primary">{label}</span>
              {data.role === key && <Check className="w-4 h-4 text-accent" />}
            </motion.button>
          ))}
        </div>
        {data.role === "autre" && (
          <motion.input
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            type="text"
            placeholder="Précisez votre rôle..."
            value={data.roleOther || ""}
            onChange={(e) => onChange({ roleOther: e.target.value })}
            className="mt-3 w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent"
          />
        )}
      </div>

      {/* Secteur */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Secteur d&apos;activité
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(SECTOR_LABELS).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onChange({ sector: key as Sector })}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm cursor-pointer",
                data.sector === key
                  ? "bg-accent-soft border-accent shadow-md"
                  : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
              )}
            >
              <span className="text-lg">{SECTOR_ICONS[key]}</span>
              <span className="flex-1 text-text-primary">{label}</span>
              {data.sector === key && <Check className="w-4 h-4 text-accent" />}
            </motion.button>
          ))}
        </div>
        {data.sector === "autre" && (
          <motion.input
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            type="text"
            placeholder="Précisez votre secteur..."
            value={data.sectorOther || ""}
            onChange={(e) => onChange({ sectorOther: e.target.value })}
            className="mt-3 w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent"
          />
        )}
      </div>
    </div>
  );
}
