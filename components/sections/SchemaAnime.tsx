"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";

export function SchemaAnime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end center"]
  });

  const staticProgress = 1;

  // Lignes d'entrée : de 0.1 à 0.4
  const inPathLength = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const inPathOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // HOPTISENS Pulse : de 0.3 à 0.6 puis 1
  const hoptisensScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 1], [1, 1.15, 1.15, 1]);
  const glowFilter = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 1], [
    "drop-shadow(0 0 0px var(--color-accent))", 
    "drop-shadow(0 0 20px var(--color-accent))", 
    "drop-shadow(0 0 20px var(--color-accent))", 
    "drop-shadow(0 0 0px var(--color-accent))"
  ]);

  // Lignes de sortie (vers Synergie) : de 0.5 à 0.8
  const outPathLength = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const outPathOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  // Noeuds cibles (Agent IA & Humain) s'allument : de 0.7 à 0.9
  const targetColor = useTransform(scrollYProgress, [0.7, 0.9], ["var(--color-bg)", "var(--color-accent)"]);
  const targetTextColor = useTransform(scrollYProgress, [0.7, 0.9], ["var(--color-text-secondary)", "var(--color-bg)"]);
  const targetBorderColor = useTransform(scrollYProgress, [0.7, 0.9], ["var(--color-border)", "var(--color-accent)"]);
  
  // Boucle de synergie : de 0.8 à 1.0
  const synergyPathLength = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <Section className="bg-[var(--color-surface)] py-24">
      <Container>
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-text-primary)] mb-4">La Synergie Hoptisens</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Nous transformons vos fondations existantes en un écosystème performant où la <strong>Data</strong>, les <strong>Process</strong> et les <strong>Outils</strong> alimentent une synergie parfaite entre l'<strong>Agent IA</strong> et l'<strong>Humain</strong>.
            </p>
          </div>
        </FadeInUp>

        <div ref={containerRef} className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[var(--color-bg)] rounded-3xl border border-[var(--color-border)] flex items-center justify-center overflow-hidden p-4 md:p-8">
          <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
            
            {/* --- ZONES ARRIÈRE-PLAN --- */}
            
            {/* Boîte Entreprise Cliente */}
            <rect x="50" y="50" width="200" height="400" rx="16" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
            <text x="150" y="80" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14" fontWeight="600" letterSpacing="1" className="font-sans uppercase">Votre Entreprise</text>

            {/* Boîte Synergie */}
            <rect x="730" y="50" width="240" height="400" rx="16" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
            <text x="850" y="80" textAnchor="middle" fill="var(--color-accent)" fontSize="14" fontWeight="600" letterSpacing="1" className="font-sans uppercase opacity-80">Synergie Opérationnelle</text>

            {/* --- PATHS (LIGNES DE FLUX) --- */}
            
            {/* Lignes Entreprise -> Hoptisens */}
            <motion.path 
              d="M 190 150 C 300 150, 400 250, 440 250" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              fill="none" 
              style={{ pathLength: shouldReduceMotion ? staticProgress : inPathLength, opacity: shouldReduceMotion ? 1 : inPathOpacity }}
            />
            <motion.path 
              d="M 190 250 L 440 250" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              fill="none" 
              style={{ pathLength: shouldReduceMotion ? staticProgress : inPathLength, opacity: shouldReduceMotion ? 1 : inPathOpacity }}
            />
            <motion.path 
              d="M 190 350 C 300 350, 400 250, 440 250" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              fill="none" 
              style={{ pathLength: shouldReduceMotion ? staticProgress : inPathLength, opacity: shouldReduceMotion ? 1 : inPathOpacity }}
            />

            {/* Lignes Hoptisens -> IA & Humain */}
            <motion.path 
              d="M 560 250 C 650 250, 750 160, 810 160" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              fill="none" 
              style={{ pathLength: shouldReduceMotion ? staticProgress : outPathLength, opacity: shouldReduceMotion ? 1 : outPathOpacity }}
            />
            <motion.path 
              d="M 560 250 C 650 250, 750 340, 810 340" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              fill="none" 
              style={{ pathLength: shouldReduceMotion ? staticProgress : outPathLength, opacity: shouldReduceMotion ? 1 : outPathOpacity }}
            />

            {/* Synergie IA <-> Humain */}
            <motion.path 
              d="M 830 210 C 780 250, 780 250, 830 290" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              strokeDasharray="6 6"
              fill="none" 
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
              style={{ pathLength: shouldReduceMotion ? staticProgress : synergyPathLength, opacity: synergyPathLength }}
            />
            <motion.path 
              d="M 870 290 C 920 250, 920 250, 870 210" 
              stroke="var(--color-accent)" 
              strokeWidth="3" 
              strokeDasharray="6 6"
              fill="none" 
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
              style={{ pathLength: shouldReduceMotion ? staticProgress : synergyPathLength, opacity: synergyPathLength }}
            />


            {/* --- NŒUDS --- */}
            
            {/* Nœuds Entreprise Cliente */}
            <g>
              <circle cx="150" cy="150" r="40" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="2" />
              <text x="150" y="155" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="14" fontWeight="500" className="font-sans">Data</text>

              <circle cx="150" cy="250" r="40" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="2" />
              <text x="150" y="255" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="14" fontWeight="500" className="font-sans">Process</text>

              <circle cx="150" cy="350" r="40" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="2" />
              <text x="150" y="355" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="14" fontWeight="500" className="font-sans">Outils</text>
            </g>

            {/* Nœud Central Hoptisens */}
            <motion.g style={{ scale: shouldReduceMotion ? 1 : hoptisensScale, transformOrigin: "500px 250px" }}>
              <motion.circle 
                cx="500" cy="250" r="60" 
                fill="var(--color-surface)" 
                stroke="var(--color-accent)" 
                strokeWidth="4"
                style={{ filter: shouldReduceMotion ? "none" : glowFilter }}
              />
              <circle cx="500" cy="250" r="50" fill="var(--color-accent)" />
              <text x="500" y="255" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" className="font-sans tracking-wide">HOPTISENS</text>
            </motion.g>

            {/* Nœuds Résultat : Humain & IA */}
            <g>
              {/* IA */}
              <motion.circle 
                cx="850" cy="160" r="40" 
                style={{ fill: shouldReduceMotion ? "var(--color-accent)" : targetColor, stroke: shouldReduceMotion ? "var(--color-accent)" : targetBorderColor }} 
                strokeWidth="2" 
              />
              <motion.text x="850" y="165" textAnchor="middle" style={{ fill: shouldReduceMotion ? "var(--color-bg)" : targetTextColor }} fontSize="14" fontWeight="600" className="font-sans">Agent IA</motion.text>
              
              {/* Humain */}
              <motion.circle 
                cx="850" cy="340" r="40" 
                style={{ fill: shouldReduceMotion ? "var(--color-accent)" : targetColor, stroke: shouldReduceMotion ? "var(--color-accent)" : targetBorderColor }} 
                strokeWidth="2" 
              />
              <motion.text x="850" y="345" textAnchor="middle" style={{ fill: shouldReduceMotion ? "var(--color-bg)" : targetTextColor }} fontSize="14" fontWeight="600" className="font-sans">Humain</motion.text>
            </g>

          </svg>
        </div>
      </Container>
    </Section>
  );
}
