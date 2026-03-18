"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProjectRecommendation } from "@/lib/diagnostic/types";
import { SchemaRenderer } from "@/components/schemas/SchemaRenderer";

interface ProjectCardProps {
  project: ProjectRecommendation;
  index: number;
}

const PRIORITY_LABELS: Record<string, { label: string; className: string }> = {
  high: { label: "PRIORITÉ HAUTE", className: "bg-accent/10 text-accent border-accent/20" },
  quick_win: { label: "QUICK WIN", className: "bg-success/10 text-success border-success/20" },
  vision: { label: "VISION", className: "bg-blue-50 text-blue-600 border-blue-200" },
};

const COMPLEXITY_LABELS: Record<string, { label: string; className: string }> = {
  low: { label: "COMPLEXITÉ FAIBLE", className: "bg-green-50 text-green-600 border-green-200" },
  medium: { label: "COMPLEXITÉ MOYENNE", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  high: { label: "COMPLEXITÉ ÉLEVÉE", className: "bg-red-50 text-red-600 border-red-200" },
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const priority = PRIORITY_LABELS[project.priority];
  const complexity = COMPLEXITY_LABELS[project.complexityLabel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={cn(
        "rounded-2xl border bg-surface overflow-hidden",
        index === 0 ? "border-accent/30 shadow-lg" : "border-border"
      )}
    >
      <div className="p-6 md:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", priority.className)}>
            {priority.label}
          </span>
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", complexity.className)}>
            {complexity.label}
          </span>
        </div>

        {/* Title & description */}
        <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-3">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Schema */}
        <div className="bg-bg/50 rounded-xl border border-border p-4 mb-6">
          <SchemaRenderer
            schemaId={project.schemaId}
            labels={project.schemaLabels}
          />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Complexity bar */}
          <div>
            <p className="text-xs text-text-muted mb-1">Complexité</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.complexity * 10}%` }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                />
              </div>
              <span className="text-xs font-medium text-text-secondary">{project.complexity}/10</span>
            </div>
          </div>

          {/* ROI */}
          <div>
            <p className="text-xs text-text-muted mb-1">ROI estimé</p>
            <p className="text-sm font-medium text-text-primary">
              ~{project.estimatedHoursPerMonth}h/mois
            </p>
          </div>

          {/* Delivery */}
          <div>
            <p className="text-xs text-text-muted mb-1">Délai</p>
            <p className="text-sm font-medium text-text-primary">
              {project.estimatedDelivery}
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs text-text-muted mb-1">Outils</p>
            <p className="text-sm font-medium text-text-primary truncate" title={project.toolsInvolved.join(', ')}>
              {project.toolsInvolved.slice(0, 3).join(', ')}
              {project.toolsInvolved.length > 3 && '...'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
