"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaFiltreIA({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 400 130" className="w-full h-auto">
      <SchemaNode x={60} y={40} label={getLabel(labels, "source1", "Site web")} />
      <SchemaNode x={60} y={100} label={getLabel(labels, "source2", "Email")} />
      <SchemaArrow x1={110} y1={45} x2={160} y2={65} delay={0.1} />
      <SchemaArrow x1={110} y1={95} x2={160} y2={75} delay={0.15} />
      <SchemaNode x={210} y={70} label={getLabel(labels, "filter", "Filtre IA")} isCenter />
      <SchemaArrow x1={260} y1={70} x2={300} y2={70} delay={0.3} />
      <SchemaNode x={345} y={70} label={getLabel(labels, "output", "CRM")} />
    </svg>
  );
}
