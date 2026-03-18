"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaAgentEmail({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 160" className="w-full h-auto">
      <SchemaNode x={60} y={60} label={getLabel(labels, "source", "Email")} />
      <SchemaArrow x1={110} y1={60} x2={160} y2={80} delay={0.1} />
      <SchemaNode x={210} y={80} label={getLabel(labels, "agent", "Agent IA")} isCenter />
      <SchemaNode x={210} y={140} label={getLabel(labels, "db", "Base")} width={70} height={30} />
      <SchemaArrow x1={210} y1={105} x2={210} y2={125} delay={0.2} />
      <SchemaArrow x1={260} y1={65} x2={310} y2={50} delay={0.3} />
      <SchemaNode x={360} y={50} label={getLabel(labels, "output", "CRM")} />
      <SchemaArrow x1={260} y1={95} x2={310} y2={110} delay={0.4} />
      <SchemaNode x={360} y={110} label={getLabel(labels, "reply", "Réponse")} />
    </svg>
  );
}
