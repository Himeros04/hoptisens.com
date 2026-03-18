"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DiagnosticIntroProps {
  onStart: () => void;
}

export function DiagnosticIntro({ onStart }: DiagnosticIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center max-w-2xl mx-auto py-12 md:py-20 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent-border text-sm font-medium text-accent mb-8"
      >
        <Sparkles className="w-4 h-4" />
        DIAGNOSTIC GRATUIT · 2 MIN
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-6"
      >
        Quel projet IA aura le plus d&apos;impact dans votre entreprise ?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
      >
        Répondez à 5 questions. Notre IA analyse votre contexte et vous propose
        des projets concrets d&apos;automatisation, avec leur architecture et leur
        niveau de complexité.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button size="lg" onClick={onStart} className="gap-2 text-lg">
          Commencer le diagnostic
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-text-muted text-sm mt-6"
      >
        Aucune donnée personnelle requise. Résultats immédiats.
      </motion.p>
    </motion.div>
  );
}
