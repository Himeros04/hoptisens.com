"use client";

import { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Users,
  Headphones,
  BarChart2,
  FileText,
  Megaphone,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface AgentTask {
  label: string;
  hoursPerMonth: number;
}

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tasks: AgentTask[];
  totalHours: number;
}

type CostPath = "salarie" | "independant";

interface ROIResult {
  totalHours: number;
  hourlyCost: number;
  monthlySavings: number;
}

// ============================================================================
// Static Data: 5 AI Agents
// ============================================================================

const AGENTS: Agent[] = [
  {
    id: "leads",
    name: "Agent de Qualification de Leads",
    icon: Users,
    totalHours: 15,
    tasks: [
      { label: "Qualification automatique des leads entrants", hoursPerMonth: 8 },
      { label: "Scoring & segmentation des prospects", hoursPerMonth: 4 },
      { label: "Relances automatiques de prospects", hoursPerMonth: 3 },
    ],
  },
  {
    id: "support",
    name: "Agent Support Client",
    icon: Headphones,
    totalHours: 17,
    tasks: [
      { label: "Réponses automatiques aux FAQ (70% tickets L1)", hoursPerMonth: 10 },
      { label: "Tri et routage intelligent des demandes", hoursPerMonth: 4 },
      { label: "Rédaction et envoi de réponses types", hoursPerMonth: 3 },
    ],
  },
  {
    id: "crm",
    name: "Agent CRM & Suivi Commercial",
    icon: BarChart2,
    totalHours: 14,
    tasks: [
      { label: "Mise à jour automatique des fiches CRM", hoursPerMonth: 6 },
      { label: "Génération de rapports de suivi hebdomadaires", hoursPerMonth: 3 },
      { label: "Rappels et relances commerciales", hoursPerMonth: 5 },
    ],
  },
  {
    id: "admin",
    name: "Agent Administratif & Comptabilité",
    icon: FileText,
    totalHours: 16,
    tasks: [
      { label: "Traitement et saisie des factures", hoursPerMonth: 8 },
      { label: "Gestion et tri des emails administratifs", hoursPerMonth: 5 },
      { label: "Génération de rapports et synthèses", hoursPerMonth: 3 },
    ],
  },
  {
    id: "marketing",
    name: "Agent Marketing & Contenu",
    icon: Megaphone,
    totalHours: 15,
    tasks: [
      { label: "Rédaction & programmation posts réseaux sociaux", hoursPerMonth: 6 },
      { label: "Analyse des performances marketing", hoursPerMonth: 4 },
      { label: "Création de newsletters et emailings", hoursPerMonth: 5 },
    ],
  },
];

// ============================================================================
// AnimatedNumber Sub-component
// ============================================================================

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    return rounded.on("change", (v) => {
      setDisplay(v.toLocaleString("fr-FR"));
    });
  }, [rounded]);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: "easeOut",
    });
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

// ============================================================================
// Main Component: Calculateur
// ============================================================================

export function Calculateur() {
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [costPath, setCostPath] = useState<CostPath>("salarie");
  const [inputValue, setInputValue] = useState<string>("");

  const result = useMemo<ROIResult | null>(() => {
    if (selectedAgents.size === 0 || inputValue === "") return null;
    const numericInput = parseFloat(inputValue);
    if (isNaN(numericInput) || numericInput <= 0) return null;

    const totalHours = AGENTS.filter((a) => selectedAgents.has(a.id)).reduce(
      (sum, a) => sum + a.totalHours,
      0
    );

    // Salarié: coût chargé réel = (net × 1.82) / 151.67h légales
    // Indépendant: coût horaire = TJM / 8h
    const hourlyCost =
      costPath === "salarie"
        ? (numericInput * 1.82) / 151.67
        : numericInput / 8;

    return { totalHours, hourlyCost, monthlySavings: hourlyCost * totalHours };
  }, [selectedAgents, costPath, inputValue]);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) => {
      const next = new Set(prev);
      next.has(agentId) ? next.delete(agentId) : next.add(agentId);
      return next;
    });
  };

  const toggleAccordion = (agentId: string) => {
    setOpenAccordion((prev) => (prev === agentId ? null : agentId));
  };

  const handleCostPathChange = (path: CostPath) => {
    setCostPath(path);
    setInputValue("");
  };

  return (
    <Section id="calculateur" className="bg-[var(--color-bg)]">
      <Container>
        {/* ===== Header ===== */}
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="accent" className="mb-4">
            Basé sur des études McKinsey, UiPath & Botmind
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-text-primary)] mb-4">
            Calculez votre ROI avec les Agents IA
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Sélectionnez les agents adaptés à votre activité et estimez les
            heures récupérées chaque mois.
          </p>
        </FadeInUp>

        {/* ===== Step 1: Agent Selection ===== */}
        <FadeInUp className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              1
            </span>
            <h3 className="font-semibold text-[var(--color-text-primary)] text-lg">
              Quels agents souhaitez-vous déployer ?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map((agent) => {
              const isSelected = selectedAgents.has(agent.id);
              const Icon = agent.icon;

              return (
                <div
                  key={agent.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => toggleAgent(agent.id)}
                  onKeyDown={(e) => e.key === "Enter" && toggleAgent(agent.id)}
                  className={cn(
                    "rounded-[var(--radius-card)] border p-5 transition-all duration-200 cursor-pointer select-none",
                    isSelected
                      ? "border-[var(--color-accent)] shadow-md bg-[var(--color-accent-soft)]"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-accent-border)] hover:-translate-y-0.5"
                  )}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-colors flex-shrink-0",
                          isSelected
                            ? "bg-[var(--color-accent)] text-white"
                            : "bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-[var(--color-text-primary)] text-sm leading-tight">
                        {agent.name}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0 ml-2">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Hours pill */}
                  <div className="text-xs text-[var(--color-text-muted)] mb-3">
                    <span className="font-semibold text-[var(--color-accent)]">
                      {agent.totalHours}h
                    </span>{" "}
                    économisées/mois
                  </div>

                  {/* Accordion toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAccordion(agent.id);
                    }}
                    className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    aria-expanded={openAccordion === agent.id}
                  >
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        openAccordion === agent.id && "rotate-180"
                      )}
                    />
                    {openAccordion === agent.id ? "Masquer le détail" : "Voir les tâches"}
                  </button>

                  {/* Animated tasks list */}
                  <AnimatePresence initial={false}>
                    {openAccordion === agent.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
                          {agent.tasks.map((task, i) => (
                            <li key={i} className="flex items-start justify-between gap-2">
                              <span className="text-xs text-[var(--color-text-secondary)]">
                                {task.label}
                              </span>
                              <span className="text-xs font-medium text-[var(--color-accent)] whitespace-nowrap flex-shrink-0">
                                {task.hoursPerMonth}h
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeInUp>

        {/* ===== Step 2: Cost Path & Input ===== */}
        <FadeInUp delay={0.1} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              2
            </span>
            <h3 className="font-semibold text-[var(--color-text-primary)] text-lg">
              Quel est votre profil ?
            </h3>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6 md:p-8 max-w-2xl">
            {/* Toggle: Salarié / Indépendant */}
            <div className="flex gap-2 mb-6 p-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl w-fit">
              {(["salarie", "independant"] as CostPath[]).map((path) => (
                <button
                  key={path}
                  onClick={() => handleCostPathChange(path)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    costPath === path
                      ? "bg-[var(--color-text-primary)] text-[var(--color-bg)] shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {path === "salarie" ? "Salarié(e)" : "Indépendant / Freelance"}
                </button>
              ))}
            </div>

            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                {costPath === "salarie"
                  ? "Salaire mensuel net (€)"
                  : "Tarif journalier moyen — TJM (€)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder={costPath === "salarie" ? "ex : 2 500" : "ex : 450"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={cn(
                    "w-full border rounded-xl px-4 py-3 pr-10",
                    "bg-[var(--color-bg)] border-[var(--color-border)]",
                    "text-[var(--color-text-primary)] text-lg font-medium",
                    "placeholder:text-[var(--color-text-muted)]",
                    "focus:outline-none focus:border-[var(--color-accent)]",
                    "transition-colors"
                  )}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-medium pointer-events-none">
                  €
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                {costPath === "salarie"
                  ? "Coût horaire réel = (salaire net × 1,82) ÷ 151,67 heures légales"
                  : "Coût horaire = TJM ÷ 8 heures"}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] italic">
                Cette donnée reste anonyme et sert uniquement à estimer votre coût horaire réel. Rien n'est stocké.
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* ===== Results Panel ===== */}
        <AnimatePresence>
          {result !== null && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <h3 className="font-semibold text-[var(--color-text-primary)] text-lg">
                  Votre estimation de ROI
                </h3>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl">
                {/* Hours */}
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6">
                  <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                    Heures économisées / mois
                  </p>
                  <AnimatedNumber
                    value={result.totalHours}
                    suffix="h"
                    className="text-4xl md:text-5xl font-serif text-[var(--color-text-primary)]"
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">
                    {selectedAgents.size} agent{selectedAgents.size > 1 ? "s" : ""} déployé
                    {selectedAgents.size > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Savings (gold) */}
                <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent-border)] rounded-[var(--radius-card)] p-6">
                  <p className="text-xs uppercase tracking-widest text-[var(--color-accent)] mb-2">
                    Économie estimée / mois
                  </p>
                  <AnimatedNumber
                    value={Math.round(result.monthlySavings)}
                    suffix=" €"
                    className="text-4xl md:text-5xl font-serif text-[var(--color-accent)]"
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">
                    soit ~{Math.round(result.monthlySavings * 12).toLocaleString("fr-FR")} €/an
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[var(--color-text-muted)] italic mb-6 max-w-xl">
                * Estimation basée sur les études McKinsey (2024), UiPath, Botmind et MITRIX.
                Le coût horaire réel intègre les charges salariales françaises (×1,82) et les 151,67h légales.
              </p>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-8 text-lg font-medium rounded-xl bg-[#2A2A2A] text-[#F9F7F3] hover:bg-[#1A1A1A] transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
              >
                Récupérer {result.totalHours}h/mois — Parlons-en
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
