"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaSEO({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 150" className="w-full h-auto">
      <SchemaNode x={60} y={50} label={getLabel(labels, "keyword", "Mots-clés")} />
      <SchemaArrow x1={110} y1={50} x2={160} y2={55} delay={0.1} />
      <SchemaNode x={210} y={55} label={getLabel(labels, "generation", "Génération IA")} isCenter />
      <SchemaArrow x1={260} y1={55} x2={300} y2={55} delay={0.2} />
      <SchemaNode x={350} y={55} label={getLabel(labels, "pages", "Pages web")} />
      <SchemaArrow x1={350} y1={75} x2={350} y2={100} delay={0.3} />
      <SchemaNode x={350} y={120} label={getLabel(labels, "analytics", "Analytics")} />
    </svg>
  );
}
