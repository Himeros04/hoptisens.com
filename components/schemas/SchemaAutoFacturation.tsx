"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaAutoFacturation({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 160" className="w-full h-auto">
      <SchemaNode x={60} y={60} label={getLabel(labels, "trigger", "CRM")} />
      <SchemaArrow x1={110} y1={60} x2={160} y2={75} delay={0.1} />
      <SchemaNode x={210} y={80} label={getLabel(labels, "automation", "Automation")} isCenter />
      <SchemaNode x={210} y={140} label={getLabel(labels, "template", "Template")} width={70} height={30} />
      <SchemaArrow x1={210} y1={105} x2={210} y2={125} delay={0.2} />
      <SchemaArrow x1={260} y1={65} x2={310} y2={45} delay={0.3} />
      <SchemaNode x={360} y={45} label={getLabel(labels, "compta", "Comptabilité")} />
      <SchemaArrow x1={260} y1={95} x2={310} y2={115} delay={0.4} />
      <SchemaNode x={360} y={115} label={getLabel(labels, "email", "Email")} />
    </svg>
  );
}
