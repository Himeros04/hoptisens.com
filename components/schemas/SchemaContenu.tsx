"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaContenu({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 160" className="w-full h-auto">
      <SchemaNode x={60} y={70} label={getLabel(labels, "brief", "Brief")} />
      <SchemaArrow x1={110} y1={70} x2={160} y2={75} delay={0.1} />
      <SchemaNode x={210} y={75} label={getLabel(labels, "generation", "Génération IA")} isCenter />
      <SchemaArrow x1={260} y1={55} x2={310} y2={35} delay={0.2} />
      <SchemaNode x={360} y={35} label={getLabel(labels, "canal1", "LinkedIn")} />
      <SchemaArrow x1={260} y1={75} x2={310} y2={80} delay={0.3} />
      <SchemaNode x={360} y={80} label={getLabel(labels, "canal2", "Blog")} />
      <SchemaArrow x1={260} y1={95} x2={310} y2={125} delay={0.4} />
      <SchemaNode x={360} y={125} label={getLabel(labels, "canal3", "Newsletter")} />
    </svg>
  );
}
