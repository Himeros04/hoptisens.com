"use client";

import { SchemaNode, SchemaArrow, getLabel, type SchemaProps } from "./schemaUtils";

export function SchemaInterconnexion({ labels }: SchemaProps) {
  return (
    <svg viewBox="0 0 420 160" className="w-full h-auto">
      {/* Top row: 3 apps */}
      <SchemaNode x={80} y={30} label={getLabel(labels, "app1", "App 1")} width={80} />
      <SchemaNode x={210} y={30} label={getLabel(labels, "app2", "App 2")} width={80} />
      <SchemaNode x={340} y={30} label={getLabel(labels, "app3", "App 3")} width={80} />
      {/* Arrows down to hub */}
      <SchemaArrow x1={80} y1={50} x2={170} y2={75} delay={0.1} />
      <SchemaArrow x1={210} y1={50} x2={210} y2={70} delay={0.15} />
      <SchemaArrow x1={340} y1={50} x2={250} y2={75} delay={0.2} />
      {/* Hub */}
      <SchemaNode x={210} y={85} label={getLabel(labels, "hub", "Hub Automation")} isCenter />
      {/* Arrows down to outputs */}
      <SchemaArrow x1={180} y1={105} x2={120} y2={130} delay={0.3} />
      <SchemaArrow x1={240} y1={105} x2={300} y2={130} delay={0.35} />
      {/* Outputs */}
      <SchemaNode x={120} y={145} label={getLabel(labels, "out1", "Sortie 1")} width={80} />
      <SchemaNode x={300} y={145} label={getLabel(labels, "out2", "Sortie 2")} width={80} />
    </svg>
  );
}
