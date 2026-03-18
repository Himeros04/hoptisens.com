"use client";

import { motion } from "framer-motion";

interface NodeProps {
  x: number;
  y: number;
  label: string;
  isCenter?: boolean;
  width?: number;
  height?: number;
}

export function SchemaNode({ x, y, label, isCenter = false, width = 100, height = 40 }: NodeProps) {
  const rx = x - width / 2;
  const ry = y - height / 2;

  if (isCenter) {
    return (
      <g>
        <motion.circle
          cx={x}
          cy={y}
          r={height / 2 + 4}
          fill="var(--color-accent)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="10"
          fontFamily="var(--font-sans)"
          fontWeight="500"
        >
          {label}
        </text>
      </g>
    );
  }

  return (
    <g>
      <motion.rect
        x={rx}
        y={ry}
        width={width}
        height={height}
        rx={8}
        fill="var(--color-bg)"
        stroke="var(--color-border)"
        strokeWidth={1.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--color-text-secondary)"
        fontSize="11"
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  );
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}

export function SchemaArrow({ x1, y1, x2, y2, delay = 0 }: ArrowProps) {
  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay }}
      />
      {/* Traveling dot */}
      <motion.circle
        r={3}
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={{
          cx: [x1, x2],
          cy: [y1, y2],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay + 0.5,
          ease: "linear",
        }}
      />
    </g>
  );
}

export interface SchemaProps {
  labels: {
    nodes: Array<{ id: string; label: string }>;
  };
  animate?: boolean;
}

export function getLabel(labels: SchemaProps["labels"], id: string, fallback: string): string {
  return labels.nodes.find((n) => n.id === id)?.label ?? fallback;
}
