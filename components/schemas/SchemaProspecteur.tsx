"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaProspecteur({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 160" className="w-full h-auto">
      <SchemaNode x={60} y={40} label={getLabel(labels, "source", "LinkedIn")} />
      <SchemaArrow x1={110} y1={40} x2={160} y2={40} delay={0.1} />
      <SchemaNode x={210} y={40} label={getLabel(labels, "scraping", "Scraping + IA")} isCenter />
      <SchemaArrow x1={260} y1={40} x2={300} y2={40} delay={0.2} />
      <SchemaNode x={360} y={40} label={getLabel(labels, "enrich", "Enrichissement")} />
      <SchemaArrow x1={360} y1={60} x2={360} y2={80} delay={0.3} />
      <SchemaNode x={360} y={100} label={getLabel(labels, "redaction", "Rédaction IA")} isCenter />
      <SchemaArrow x1={360} y1={125} x2={360} y2={140} delay={0.4} />
      <SchemaNode x={360} y={150} label={getLabel(labels, "output", "CRM / Email")} width={90} height={30} />
    </svg>
  );
}
