"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaCRM({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 170" className="w-full h-auto">
      <SchemaNode x={60} y={40} label={getLabel(labels, "input1", "Site web")} />
      <SchemaNode x={60} y={100} label={getLabel(labels, "input2", "LinkedIn")} />
      <SchemaArrow x1={110} y1={45} x2={160} y2={65} delay={0.1} />
      <SchemaArrow x1={110} y1={95} x2={160} y2={80} delay={0.15} />
      <SchemaNode x={210} y={75} label={getLabel(labels, "scoring", "Scoring IA")} isCenter />
      <SchemaArrow x1={260} y1={60} x2={310} y2={35} delay={0.3} />
      <SchemaNode x={360} y={35} label={getLabel(labels, "crm", "CRM")} />
      <SchemaArrow x1={260} y1={75} x2={310} y2={85} delay={0.35} />
      <SchemaNode x={360} y={85} label={getLabel(labels, "alert", "Alertes")} />
      <SchemaArrow x1={260} y1={90} x2={310} y2={135} delay={0.4} />
      <SchemaNode x={360} y={135} label={getLabel(labels, "dash", "Dashboard")} />
    </svg>
  );
}
