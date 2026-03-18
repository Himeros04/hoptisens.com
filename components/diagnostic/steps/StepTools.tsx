"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { TOOL_OPTIONS, TOOL_CATEGORIES } from "@/lib/diagnostic/catalog";
import type { ToolCategory } from "@/lib/diagnostic/types";

interface StepToolsProps {
  data: { tools?: string[]; toolsOther?: string };
  onChange: (data: Partial<StepToolsProps["data"]>) => void;
}

export function StepTools({ data, onChange }: StepToolsProps) {
  const selectedTools = data.tools || [];

  const toggleTool = (toolId: string) => {
    const updated = selectedTools.includes(toolId)
      ? selectedTools.filter((t) => t !== toolId)
      : [...selectedTools, toolId];
    onChange({ tools: updated });
  };

  // Group tools by category
  const grouped = Object.entries(TOOL_CATEGORIES)
    .filter(([key]) => key !== "autre")
    .map(([key, label]) => ({
      category: key as ToolCategory,
      label,
      tools: TOOL_OPTIONS.filter((t) => t.category === key),
    }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
          Quels outils utilisez-vous au quotidien ?
        </h2>
        <p className="text-text-muted text-sm">
          Sélectionnez au moins 1 outil. Nous adapterons nos recommandations à votre stack existante.
        </p>
      </div>

      {grouped.map((group) => (
        <div key={group.category}>
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
            {group.label}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {group.tools.map((tool, i) => {
              const isSelected = selectedTools.includes(tool.id);
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggleTool(tool.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-all text-sm cursor-pointer relative",
                    isSelected
                      ? "bg-accent-soft border-accent shadow-md"
                      : "bg-surface border-border hover:border-accent-border hover:-translate-y-0.5"
                  )}
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-text-primary font-medium text-xs text-center leading-tight">
                    {tool.name}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Other tools */}
      <div>
        <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
          Autre
        </label>
        <input
          type="text"
          placeholder="Précisez vos outils clés..."
          value={data.toolsOther || ""}
          onChange={(e) => onChange({ toolsOther: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  );
}
