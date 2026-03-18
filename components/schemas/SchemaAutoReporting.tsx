"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaAutoReporting({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 150" className="w-full h-auto">
      <SchemaNode x={60} y={40} label={getLabel(labels, "source1", "CRM")} />
      <SchemaNode x={60} y={100} label={getLabel(labels, "source2", "Compta")} />
      <SchemaArrow x1={110} y1={45} x2={160} y2={65} delay={0.1} />
      <SchemaArrow x1={110} y1={95} x2={160} y2={75} delay={0.15} />
      <SchemaNode x={210} y={70} label={getLabel(labels, "automation", "Automation")} isCenter />
      <SchemaArrow x1={260} y1={55} x2={310} y2={40} delay={0.3} />
      <SchemaNode x={360} y={40} label={getLabel(labels, "output", "Dashboard")} />
      <SchemaArrow x1={260} y1={85} x2={310} y2={110} delay={0.4} />
      <SchemaNode x={360} y={110} label={getLabel(labels, "notif", "Notification")} />
    </svg>
  );
}
