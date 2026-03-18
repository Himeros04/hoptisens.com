"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

const STEPS = [
  "Secteur identifié",
  "Outils analysés",
  "Recommandations en cours...",
];

export function DiagnosticLoading() {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setCompletedSteps(i + 1), (i + 1) * 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-md mx-auto"
    >
      {/* Animated dots / network */}
      <div className="relative w-32 h-32 mb-10">
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72 * Math.PI) / 180;
          const x = 50 + 35 * Math.cos(angle);
          const y = 50 + 35 * Math.sin(angle);
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-accent rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          );
        })}
        {/* Center node */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-5 h-5 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i * 72 * Math.PI) / 180;
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);
            return (
              <motion.line
                key={i}
                x1="50" y1="50" x2={x} y2={y}
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            );
          })}
        </svg>
      </div>

      <motion.h2
        className="font-serif text-2xl text-text-primary mb-8"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Analyse de votre contexte...
      </motion.h2>

      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-1.5 mb-8">
        <motion.div
          className="bg-accent h-full rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-3 w-full text-left">
        {STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5 }}
            className="flex items-center gap-3 text-sm"
          >
            {completedSteps > i ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-success" />
              </motion.div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-border" />
            )}
            <span className={completedSteps > i ? "text-text-primary" : "text-text-muted"}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
