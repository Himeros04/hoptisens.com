"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaAudit({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 140" className="w-full h-auto">
      <SchemaNode x={60} y={55} label={getLabel(labels, "input", "Données existantes")} />
      <SchemaArrow x1={110} y1={55} x2={160} y2={65} delay={0.1} />
      <SchemaNode x={210} y={65} label={getLabel(labels, "analyse", "Analyse Hoptisens")} isCenter />
      <SchemaNode x={210} y={125} label={getLabel(labels, "entretien", "Entretien + Audit")} width={90} height={30} />
      <SchemaArrow x1={210} y1={90} x2={210} y2={110} delay={0.2} />
      <SchemaArrow x1={260} y1={65} x2={310} y2={65} delay={0.3} />
      <SchemaNode x={360} y={65} label={getLabel(labels, "livrable", "Rapport + Plan")} />
    </svg>
  );
}
