"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";
import type { DiagnosticResult, DiagnosticInput } from "@/lib/diagnostic/types";
import { SECTOR_LABELS, COMPANY_SIZE_LABELS, MATURITY_LABELS } from "@/lib/diagnostic/catalog";
import { Link } from "@/lib/routing";

interface DiagnosticResultsProps {
  result: DiagnosticResult;
  input: DiagnosticInput;
  onRestart: () => void;
}

type AppRoute = "/" | "/a-propos" | "/offres" | "/offres/sprint" | "/offres/leads" | "/contact" | "/diagnostic";

const ENTRY_CTA: Record<string, { label: string; href: AppRoute }> = {
  sprint: { label: "Découvrir le Sprint IA", href: "/offres/sprint" },
  audit: { label: "Réserver un audit", href: "/contact" },
  formation: { label: "Découvrir nos formations", href: "/offres" },
  rdv_direct: { label: "Réserver un appel stratégique", href: "/contact" },
};

export function DiagnosticResults({ result, input, onRestart }: DiagnosticResultsProps) {
  const entryCta = ENTRY_CTA[result.recommendedEntry];

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
          Votre diagnostic personnalisé
        </h1>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-secondary">
            {SECTOR_LABELS[input.sector] ?? input.sector}
          </span>
          <span className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-secondary">
            {input.companySize} collaborateurs
          </span>
          <span className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-secondary">
            {MATURITY_LABELS[input.maturity]?.emoji} {MATURITY_LABELS[input.maturity]?.label}
          </span>
        </div>

        {/* AI Summary */}
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {result.summary}
        </p>
      </motion.div>

      {/* Project cards */}
      <div className="space-y-6 mb-12">
        {result.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-surface rounded-2xl border border-border p-8 text-center"
      >
        <h2 className="font-serif text-2xl text-text-primary mb-6">
          Envie d&apos;aller plus loin ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Primary CTA */}
          <Link href="/contact">
            <Button className="w-full gap-2">
              <Phone className="w-4 h-4" />
              Réserver un appel
            </Button>
          </Link>

          {/* Recommended entry */}
          <Link href={entryCta.href}>
            <Button variant="secondary" className="w-full gap-2">
              <ArrowRight className="w-4 h-4" />
              {entryCta.label}
            </Button>
          </Link>

          {/* Restart */}
          <Button variant="ghost" onClick={onRestart} className="w-full gap-2">
            <RotateCcw className="w-4 h-4" />
            Refaire le diagnostic
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
