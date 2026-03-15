"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";

export function SchemaAnime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Plage de scroll élargie pour ralentir la complétion (start 85% -> start 15%)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 10%"]
  });

  // Layer 1 : Diagnostics (Y=100)
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const layer1Y = useTransform(scrollYProgress, [0, 0.2], [-20, 0]);

  // Bridge 1 -> 2
  const bridge1Length = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Layer 2 : Infrastructure (Y=260)
  const layer2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const layer2Y = useTransform(scrollYProgress, [0.4, 0.6], [-20, 0]);

  // Bridge 2 -> 3
  const bridge2Length = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  // Layer 3 : Agent IA interactif (Y=460)
  const layer3Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  
  // Branches du Cluster (Y=460+)
  const branchesLength = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);

  const flowDash = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <Section className="bg-surface/30 py-24 border-y border-border">
      <Container>
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">
              L'Architecture de votre Transformation.
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Hoptisens connecte l'expertise humaine à la puissance algorithmique. 
              Découvrez comment notre Agent IA s'intègre au cœur de votre écosystème.
            </p>
          </div>
        </FadeInUp>

        <div ref={containerRef} className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-bg rounded-3xl border border-border flex items-center justify-center overflow-hidden p-6 md:p-8 shadow-2xl">
          <svg className="w-full h-full max-w-4xl" viewBox="0 0 1000 750" fill="none">
            
            {/* Grid de fond technique léger */}
            <pattern id="grid-home-dense" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.1" />
            </pattern>
            <rect width="1000" height="750" fill="url(#grid-home-dense)" />

            {/* --- BRIDGES (CENTRAL LINE FLOW) --- */}

            {/* Bridge 1 -> 2 (Descending) */}
            <motion.path 
              d="M 500 160 L 500 250" 
              stroke="var(--color-accent)" 
              strokeWidth="4" 
              opacity="0.8"
              style={{ pathLength: bridge1Length }} 
            />
            <motion.path 
              d="M 500 160 L 500 250" 
              stroke="var(--color-accent)" 
              strokeWidth="2" 
              strokeDasharray="4 8"
              style={{ strokeDashoffset: flowDash }}
              opacity={useTransform(scrollYProgress, [0.3, 1], [0, 0.8])}
            />

            {/* Bridge 2 -> 3 (Descending) */}
            <motion.path 
              d="M 500 330 L 500 420" 
              stroke="var(--color-accent)" 
              strokeWidth="4" 
              opacity="0.8"
              style={{ pathLength: bridge2Length }} 
            />

            {/* --- LAYERS (NODES) --- */}

            {/* STEP 1 : AUDIT (Y=100) */}
            <motion.g style={{ opacity: layer1Opacity, y: layer1Y }}>
              <rect x="350" y="100" width="300" height="60" rx="12" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
              <text x="500" y="130" textAnchor="middle" fill="var(--color-text-primary)" fontSize="14" fontWeight="bold">1. AUDIT & DIAGNOSTIC</text>
              <text x="500" y="145" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11">Analyse des flux & Data</text>
            </motion.g>

            {/* STEP 2 : INFRASTRUCTURE (Y=270) */}
            <motion.g style={{ opacity: layer2Opacity, y: layer2Y }}>
              <rect x="350" y="270" width="300" height="60" rx="12" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
              <text x="500" y="300" textAnchor="middle" fill="var(--color-text-primary)" fontSize="14" fontWeight="bold">2. STRUCTURE & CÂBLAGE</text>
              <text x="500" y="315" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11">Flux n8n / Make connectés</text>
            </motion.g>

            {/* STEP 3 : CLUSTER AGENT IA (Y=440+) */}
            <motion.g style={{ opacity: layer3Opacity }}>

              {/* Central Box for Title if needed, or just graphic */}
              <text x="500" y="440" textAnchor="middle" fill="var(--color-accent)" fontSize="15" fontWeight="bold" className="tracking-wide uppercase">3. L'AGENT IA EN ACTION</text>
              <text x="500" y="458" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">Interconnexion en temps réel avec votre écosystème</text>

              {/* --- BRANCHES FROM AGENT --- */}
              {/* Branch to Datas */}
              <motion.path d="M 520 540 Q 600 500 680 500" stroke="var(--color-accent)" strokeWidth="2" style={{ pathLength: branchesLength }} />
              {/* Branch to Processus */}
              <motion.path d="M 520 540 L 680 540" stroke="var(--color-accent)" strokeWidth="2" style={{ pathLength: branchesLength }} />
              {/* Branch to Outils */}
              <motion.path d="M 520 540 Q 600 580 680 580" stroke="var(--color-accent)" strokeWidth="2" style={{ pathLength: branchesLength }} />
              {/* Branch to Web */}
              <motion.path d="M 480 580 Q 480 640 640 640" stroke="var(--color-accent)" strokeWidth="2" style={{ pathLength: branchesLength }} />

              {/* NODE : CLIENT (Left) */}
              <rect x="250" y="510" width="120" height="60" rx="12" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
              <text x="310" y="545" textAnchor="middle" fill="var(--color-text-primary)" fontSize="14" fontWeight="bold">Client 🧑‍💻</text>

              {/* CONNECTION CLIENT <-> AGENT */}
              <motion.line x1="370" y1="540" x2="440" y2="540" stroke="var(--color-accent)" strokeWidth="3" strokeDasharray="4 4" />

              {/* --- FLOWING ENERGY DOTS (INFINITE) --- */}
              <motion.g style={{ opacity: branchesLength }}>
                <motion.path d="M 370 540 L 440 540" stroke="white" strokeWidth="2" strokeDasharray="4 12" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 0.8, ease: "linear", repeat: Infinity }} />
                <motion.path d="M 520 540 Q 600 500 680 500" stroke="white" strokeWidth="1.5" strokeDasharray="4 16" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.1, ease: "linear", repeat: Infinity }} />
                <motion.path d="M 520 540 L 680 540" stroke="white" strokeWidth="1.5" strokeDasharray="4 12" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 0.9, ease: "linear", repeat: Infinity }} />
                <motion.path d="M 520 540 Q 600 580 680 580" stroke="white" strokeWidth="1.5" strokeDasharray="4 16" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.1, ease: "linear", repeat: Infinity }} />
              </motion.g>
              
              {/* NODE : AGENT IA (Center) */}
              <circle cx="480" cy="540" r="40" fill="var(--color-accent)" />
              <circle cx="480" cy="540" r="48" fill="var(--color-accent)" opacity="0.15" />
              <text x="480" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Agent IA</text>

              {/* --- SATELLITES ON THE RIGHT --- */}
              <motion.g style={{ opacity: branchesLength }}>
                {/* Vos Datas */}
                <rect x="680" y="480" width="140" height="40" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
                <circle cx="700" cy="500" r="12" fill="var(--color-accent)" opacity="0.1" />
                <circle cx="700" cy="500" r="4" fill="var(--color-accent)" />
                <text x="725" y="504" fill="var(--color-text-primary)" fontSize="12">Vos Datas 📊</text>

                {/* Vos Processus */}
                <rect x="680" y="520" width="140" height="40" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
                <circle cx="700" cy="540" r="12" fill="var(--color-accent)" opacity="0.1" />
                <circle cx="700" cy="540" r="4" fill="var(--color-accent)" />
                <text x="725" y="544" fill="var(--color-text-primary)" fontSize="12">Processus ⚙️</text>

                {/* Vos Outils */}
                <rect x="680" y="560" width="140" height="40" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
                <circle cx="700" cy="580" r="12" fill="var(--color-accent)" opacity="0.1" />
                <circle cx="700" cy="580" r="4" fill="var(--color-accent)" />
                <text x="725" y="584" fill="var(--color-text-primary)" fontSize="12">Vos Outils 🛠️</text>

                {/* Recherche Web */}
                <rect x="640" y="620" width="180" height="40" rx="8" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" />
                <circle cx="660" cy="640" r="12" fill="var(--color-accent)" opacity="0.1" />
                <circle cx="660" cy="640" r="4" fill="var(--color-accent)" />
                <text x="680" y="644" fill="var(--color-text-primary)" fontSize="12">Recherche Web Live 🌍</text>
              </motion.g>

            </motion.g>

          </svg>
        </div>
      </Container>
    </Section>
  );
}
