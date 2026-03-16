"use client";

import { motion } from "framer-motion";

const defaultTransition = { duration: 2, ease: "linear" as const, repeat: Infinity };

export function LeadsSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 500 300" className="w-full h-full max-w-md" fill="none" aria-hidden="true" focusable="false">
        {/* Source Nodes */}
        <g>
          <rect x="30" y="50" width="100" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="80" y="75" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" className="font-sans">🔍 Web / SEO</text>

          <rect x="30" y="130" width="100" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="80" y="155" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" className="font-sans">💼 LinkedIn</text>

          <rect x="30" y="210" width="100" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="80" y="235" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" className="font-sans">📢 Ads</text>
        </g>

        {/* Central Filter / AI */}
        <g>
          <path d="M 180 50 L 260 130 L 260 170 L 180 250 Z" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2" opacity="0.4" />
          <circle cx="210" cy="150" r="35" fill="var(--color-accent)" opacity="0.1" />
          <circle cx="210" cy="150" r="25" fill="var(--color-accent)" />
          <text x="210" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="font-sans">IA</text>
        </g>

        {/* Output Node */}
        <g>
          <rect x="360" y="120" width="110" height="60" rx="12" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="2" />
          <text x="415" y="145" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" className="font-sans">Lead Qualifié</text>
          <circle cx="415" cy="165" r="8" fill="var(--color-accent)" />
          <text x="415" y="169" textAnchor="middle" fill="white" fontSize="10" className="font-sans">✓</text>
        </g>

        {/* Paths / Flows */}
        <motion.path d="M 130 70 L 180 110" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />
        <motion.path d="M 130 150 L 175 150" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />
        <motion.path d="M 130 230 L 180 190" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />

        <motion.path d="M 260 150 L 360 150" stroke="var(--color-accent)" strokeWidth="3" fill="none" />
        <motion.circle cx="310" cy="150" r="4" fill="var(--color-accent)" animate={{ x: [-50, 50], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      </svg>
    </div>
  );
}

export function AutomatisationSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 500 300" className="w-full h-full max-w-md" fill="none" aria-hidden="true" focusable="false">
        {/* Source Apps */}
        <g>
          <circle cx="80" cy="80" r="25" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="80" y="84" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">Mail</text>

          <circle cx="80" cy="150" r="25" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="80" y="154" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">Form</text>

          <circle cx="80" cy="220" r="25" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="80" y="224" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">Pay</text>
        </g>

        {/* Cental Automate */}
        <g>
          <rect x="210" y="120" width="80" height="60" rx="12" fill="var(--color-accent)" opacity="0.1" stroke="var(--color-accent)" strokeWidth="2" />
          <rect x="220" y="130" width="60" height="40" rx="8" fill="var(--color-accent)" />
          <text x="250" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">FLUX</text>
        </g>

        {/* Destiny Apps */}
        <g>
          <rect x="380" y="100" width="80" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="420" y="125" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">Slack</text>

          <rect x="380" y="160" width="80" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="420" y="185" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">CRM</text>
        </g>

        {/* Paths */}
        <motion.path d="M 105 80 C 150 80, 180 140, 210 140" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />
        <motion.path d="M 105 150 L 210 150" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />
        <motion.path d="M 105 220 C 150 220, 180 160, 210 160" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />

        <motion.path d="M 290 140 C 330 140, 340 120, 380 120" stroke="var(--color-accent)" strokeWidth="2" />
        <motion.path d="M 290 160 C 330 160, 340 180, 380 180" stroke="var(--color-accent)" strokeWidth="2" />

        <motion.circle cx="335" cy="130" r="4" fill="var(--color-accent)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} />
      </svg>
    </div>
  );
}

export function AgentsSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 500 300" className="w-full h-full max-w-md" fill="none" aria-hidden="true" focusable="false">
        {/* User Node */}
        <circle cx="100" cy="150" r="30" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2" />
        <text x="100" y="154" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600">Client</text>

        {/* Central Agent */}
        <g>
          <motion.circle cx="250" cy="150" r="45" fill="var(--color-accent)" opacity="0.1" animate={{ r: [40, 48, 40] }} transition={{ repeat: Infinity, duration: 3 }} />
          <circle cx="250" cy="150" r="35" fill="var(--color-accent)" />
          <text x="250" y="154" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Agent IA</text>
        </g>

        {/* Data / Knowledges Nodes */}
        <g>
          <rect x="380" y="60" width="90" height="35" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" />
          <text x="425" y="82" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">Base Documentaire</text>

          <rect x="380" y="132" width="90" height="35" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" />
          <text x="425" y="154" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">API Rest</text>

          <rect x="380" y="204" width="90" height="35" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" />
          <text x="425" y="226" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">ERP / CRM</text>
        </g>

        {/* Loops & Interaction */}
        <path d="M 130 140 Q 190 120 215 140" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 215 160 Q 190 180 130 160" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" />

        <motion.path d="M 285 140 Q 330 110 380 80" stroke="var(--color-accent)" strokeWidth="1.5" />
        <motion.path d="M 285 150 L 380 150" stroke="var(--color-accent)" strokeWidth="1.5" />
        <motion.path d="M 285 160 Q 330 190 380 220" stroke="var(--color-accent)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function SprintSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 500 300" className="w-full h-full max-w-md" fill="none" aria-hidden="true" focusable="false">
        {/* Timeline Path */}
        <path d="M 60 150 L 440 150" stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round" />
        <motion.path d="M 60 150 L 440 150" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />

        {/* Steps */}
        <g>
          {/* J1 */}
          <circle cx="80" cy="150" r="16" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="3" />
          <text x="80" y="154" textAnchor="middle" fill="var(--color-accent)" fontSize="12" fontWeight="bold">1</text>
          <text x="80" y="185" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600">Audit</text>

          {/* J2 */}
          <circle cx="180" cy="150" r="16" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="3" />
          <text x="180" y="154" textAnchor="middle" fill="var(--color-accent)" fontSize="12" fontWeight="bold">2</text>
          <text x="180" y="185" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600">Cadrage</text>

          {/* J3 */}
          <circle cx="280" cy="150" r="16" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="3" />
          <text x="280" y="154" textAnchor="middle" fill="var(--color-accent)" fontSize="12" fontWeight="bold">3</text>
          <text x="280" y="185" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600">Build</text>

          {/* J4 */}
          <circle cx="380" cy="150" r="20" fill="var(--color-accent)" />
          <text x="380" y="154" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
          <text x="380" y="185" textAnchor="middle" fill="var(--color-accent)" fontSize="12" fontWeight="600">Livraison</text>
        </g>

        {/* Floating elements */}
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <rect x="350" y="80" width="60" height="25" rx="6" fill="var(--color-accent)" />
          <text x="380" y="96" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PoC ✓</text>
        </motion.g>
      </svg>
    </div>
  );
}
