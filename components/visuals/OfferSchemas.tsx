"use client";

import { motion } from "framer-motion";

const defaultTransition = { duration: 2, ease: "linear" as const, repeat: Infinity };

export function LeadsSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 500 300" className="w-full h-full max-w-md" fill="none" aria-hidden="true" focusable="false">
        {/* Source Nodes */}
        <g>
          <rect x="30" y="50" width="120" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="90" y="75" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" className="font-sans">🔍 Web / SEO</text>

          <rect x="30" y="130" width="120" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="90" y="155" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" className="font-sans">💼 LinkedIn</text>

          <rect x="30" y="210" width="120" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x="90" y="235" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" className="font-sans">👥 Réseaux Sociaux</text>
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
        <motion.path d="M 150 70 L 180 110" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />
        <motion.path d="M 150 150 L 175 150" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />
        <motion.path d="M 150 230 L 180 190" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />

        <motion.path d="M 260 150 L 360 150" stroke="var(--color-accent)" strokeWidth="3" fill="none" />
        <motion.circle cx="310" cy="150" r="4" fill="var(--color-accent)" animate={{ x: [-50, 50], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      </svg>
    </div>
  );
}

export function AutomatisationSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 600 350" className="w-full h-full" fill="none" aria-hidden="true" focusable="false">
        {/* Left: Collaborateur (Slack) */}
        <g>
          <rect x="30" y="150" width="120" height="50" rx="25" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="2" />
          <circle cx="55" cy="175" r="16" fill="var(--color-accent)" opacity="0.1" />
          <text x="55" y="180" textAnchor="middle" fontSize="16">👥</text>
          <text x="105" y="170" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600">Collaborateur</text>
          <text x="105" y="188" textAnchor="middle" fill="#E01E5A" fontSize="10" fontWeight="bold"># Slack</text>
        </g>

        {/* Center: Deterministic Process Box (Circular Layout) */}
        <g>
          {/* Outer Box */}
          <rect x="195" y="85" width="180" height="180" rx="12" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" opacity="0.9" />
          <rect x="195" y="85" width="180" height="180" rx="12" fill="none" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Inner system center: 285, 175 */}
          {/* Connecting Triangle/Circle Background */}
          <circle cx="285" cy="175" r="50" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.25" strokeDasharray="4 2" />
          <path d="M 285 130 L 330 200 L 240 200 Z" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.4" />

          {/* Node 1: Data */}
          <g transform="translate(285, 130)">
            <circle cx="0" cy="0" r="23" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="0" y="-3" textAnchor="middle" fontSize="13">📊</text>
            <text x="0" y="11" textAnchor="middle" fill="var(--color-text-primary)" fontSize="10" fontWeight="bold">Data</text>
          </g>

          {/* Node 2: Process */}
          <g transform="translate(330, 200)">
            <circle cx="0" cy="0" r="23" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="0" y="-3" textAnchor="middle" fontSize="13">⚙️</text>
            <text x="0" y="11" textAnchor="middle" fill="var(--color-text-primary)" fontSize="10" fontWeight="bold">Process</text>
          </g>

          {/* Node 3: Outils */}
          <g transform="translate(240, 200)">
            <circle cx="0" cy="0" r="23" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="0" y="-3" textAnchor="middle" fontSize="13">🔧</text>
            <text x="0" y="11" textAnchor="middle" fill="var(--color-text-primary)" fontSize="10" fontWeight="bold">Outils</text>
          </g>
        </g>

        {/* Right: Tools (Standalone App Icons Node - 40x40) */}
        <g>
          {/* 1. Gmail */}
          <g transform="translate(450, 60)">
            <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.95" />
            <g transform="translate(8, 8)">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="var(--color-accent)" />
            </g>
          </g>
          {/* 2. Pennylane (Fallback to Emoji) */}
          <g transform="translate(485, 105)">
            <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.95" />
            <circle cx="20" cy="20" r="14" fill="var(--color-accent)" opacity="0.08" />
            <text x="20" y="24" textAnchor="middle" fontSize="14">💸</text>
          </g>
          {/* 3. Linkedin */}
          <g transform="translate(505, 150)">
            <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.95" />
            <g transform="translate(8, 8)">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="var(--color-accent)" />
            </g>
          </g>
          {/* 4. CRM (Emoji Fallback) */}
          <g transform="translate(505, 195)">
            <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.95" />
            <circle cx="20" cy="20" r="14" fill="var(--color-accent)" opacity="0.08" />
            <text x="20" y="24" textAnchor="middle" fontSize="14">📊</text>
          </g>
          {/* 5. Code (Generic outline) */}
          <g transform="translate(485, 240)">
            <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.95" />
            <circle cx="20" cy="20" r="14" fill="var(--color-accent)" opacity="0.08" />
            <text x="20" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--color-accent)">&lt;/&gt;</text>
          </g>
          {/* 6. Notion */}
          <g transform="translate(450, 285)">
            <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.95" />
            <g transform="translate(8, 8)">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="var(--color-accent)" />
            </g>
          </g>
        </g>

        {/* Paths & Flows */}
        {/* Left to Center */}
        <motion.path d="M 150 175 C 170 175, 180 175, 195 175" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />

        {/* Center to Tools (Paths ending at x=0, y=20 inside translate coordinates) */}
        {/* 1. Gmail */}
        <motion.path d="M 375 120 C 400 120, 420 80, 450 80" stroke="var(--color-accent)" strokeWidth="1.5" />
        {/* 2. Pennylane */}
        <motion.path d="M 375 140 C 410 140, 440 125, 485 125" stroke="var(--color-accent)" strokeWidth="1.5" />
        {/* 3. Linkedin */}
        <motion.path d="M 375 160 C 420 160, 460 170, 505 170" stroke="var(--color-accent)" strokeWidth="1.5" />
        {/* 4. CRM */}
        <motion.path d="M 375 190 C 420 190, 460 215, 505 215" stroke="var(--color-accent)" strokeWidth="1.5" />
        {/* 5. Code */}
        <motion.path d="M 375 210 C 410 210, 440 260, 485 260" stroke="var(--color-accent)" strokeWidth="1.5" />
        {/* 6. Notion */}
        <motion.path d="M 375 230 C 400 230, 420 305, 450 305" stroke="var(--color-accent)" strokeWidth="1.5" />

        <motion.circle cx="390" cy="140" r="3" fill="var(--color-accent)" animate={{ x: [0, 15], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      </svg>
    </div>
  );
}

export function AgentsSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 600 350" className="w-full h-full" fill="none" aria-hidden="true" focusable="false">
        {/* Left: Collaborateur (Slack) */}
        <g>
          <rect x="30" y="150" width="120" height="50" rx="25" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="2" />
          <circle cx="55" cy="175" r="16" fill="var(--color-accent)" opacity="0.1" />
          <text x="55" y="180" textAnchor="middle" fontSize="16">👥</text>
          <text x="105" y="170" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="600">Collaborateur</text>
          <text x="105" y="188" textAnchor="middle" fill="#E01E5A" fontSize="10" fontWeight="bold"># Slack</text>
        </g>

        {/* Center 1: Agent IA */}
        <g>
          <motion.circle cx="210" cy="175" r="45" fill="var(--color-accent)" opacity="0.15" animate={{ r: [40, 48, 40] }} transition={{ repeat: Infinity, duration: 3 }} />
          <circle cx="210" cy="175" r="35" fill="var(--color-accent)" />
          <text x="210" y="179" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Agent IA</text>
          <text x="210" y="160" textAnchor="middle" fontSize="14">🤖</text>
        </g>

        {/* Center 2: Validation Step */}
        <g>
          <polygon points="310,175 345,145 380,175 345,205" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
          <text x="345" y="179" textAnchor="middle" fill="var(--color-accent)" fontSize="11" fontWeight="bold">VALIDATION</text>
          <circle cx="345" cy="135" r="8" fill="var(--color-success)" />
          <text x="345" y="139" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">✓</text>
        </g>

        {/* Right: Tools Grid */}
        <g>
          <g transform="translate(430, 85)">
            <rect x="0" y="0" width="60" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" />
            <text x="30" y="24" textAnchor="middle" fontSize="16">📧</text>
            <text x="30" y="55" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9">Gmail</text>
          </g>
          <g transform="translate(430, 155)">
            <rect x="0" y="0" width="60" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" />
            <text x="30" y="24" textAnchor="middle" fontSize="16">💼</text>
            <text x="30" y="55" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9">Linkedin</text>
          </g>
          <g transform="translate(430, 225)">
            <rect x="0" y="0" width="60" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" />
            <text x="30" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="var(--color-accent)">&lt;/&gt;</text>
            <text x="30" y="55" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9">Code</text>
          </g>

          <g transform="translate(510, 85)">
            <rect x="0" y="0" width="60" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" />
            <text x="30" y="24" textAnchor="middle" fontSize="16">💸</text>
            <text x="30" y="55" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9">Pennylane</text>
          </g>
          <g transform="translate(510, 155)">
            <rect x="0" y="0" width="60" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" />
            <text x="30" y="24" textAnchor="middle" fontSize="16">📊</text>
            <text x="30" y="55" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9">CRM</text>
          </g>
          <g transform="translate(510, 225)">
            <rect x="0" y="0" width="60" height="40" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" />
            <text x="30" y="24" textAnchor="middle" fontSize="16">📝</text>
            <text x="30" y="55" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9">Notion</text>
          </g>
        </g>

        {/* Paths & Flows */}
        {/* Dialogue: Collab <--> Agent */}
        <motion.path d="M 150 165 Q 180 145 190 165" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="3 3" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M 190 185 Q 180 205 150 185" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="3 3" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />

        {/* Agent to Validation */}
        <motion.path d="M 245 175 L 310 175" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={defaultTransition} />

        {/* Validation to Col 1 */}
        <motion.path d="M 380 175 C 400 175, 410 105, 430 105" stroke="var(--color-accent)" strokeWidth="1.5" />
        <motion.path d="M 380 175 L 430 175" stroke="var(--color-accent)" strokeWidth="1.5" />
        <motion.path d="M 380 175 C 400 175, 410 245, 430 245" stroke="var(--color-accent)" strokeWidth="1.5" />

        {/* Col 1 to Col 2 */}
        <motion.path d="M 490 105 L 510 105" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
        <motion.path d="M 490 175 L 510 175" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
        <motion.path d="M 490 245 L 510 245" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
      </svg>
    </div>
  );
}

export function WorkshopSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 620 340" className="w-full h-full" fill="none" aria-hidden="true" focusable="false">

        {/* === WORKSHOP FRAME (left) === */}
        {/* Subtle animated ring */}
        <motion.circle cx="115" cy="175" r="90" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.08" animate={{ r: [82, 95, 82] }} transition={{ duration: 4, repeat: Infinity }} />

        {/* Main frame */}
        <rect x="10" y="22" width="210" height="296" rx="14" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />

        {/* Frame header */}
        <text x="115" y="55" textAnchor="middle" fontSize="22">🎯</text>
        <text x="115" y="78" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="bold">WORKSHOP IA</text>
        <text x="115" y="96" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">½ journée → 3 jours</text>
        <line x1="26" y1="108" x2="204" y2="108" stroke="var(--color-border)" strokeWidth="1" opacity="0.6" />

        {/* Role pill: Direction Métier */}
        <rect x="26" y="122" width="178" height="36" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="48" y="145" textAnchor="middle" fontSize="14">👔</text>
        <text x="130" y="145" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10.5">Direction Métier</text>

        {/* Role pill: Technique */}
        <rect x="26" y="172" width="178" height="36" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="48" y="195" textAnchor="middle" fontSize="14">💻</text>
        <text x="130" y="195" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10.5">Technique</text>

        {/* Role pill: Métier */}
        <rect x="26" y="222" width="178" height="36" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="48" y="245" textAnchor="middle" fontSize="14">🏭</text>
        <text x="130" y="245" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10.5">Métier</text>

        {/* Subtle connectors between pills */}
        <line x1="115" y1="158" x2="115" y2="172" stroke="var(--color-border)" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        <line x1="115" y1="208" x2="115" y2="222" stroke="var(--color-border)" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />

        {/* === MAIN ARROW: Workshop → Cas d'usage === */}
        <motion.path
          d="M 220 175 C 248 175 252 58 278 58"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeDasharray="5 4"
          animate={{ strokeDashoffset: [0, -27] }}
          transition={defaultTransition}
        />

        {/* === OUTPUT FLOW (right column) === */}

        {/* Node 1: Cas d'usage identifié */}
        <rect x="278" y="36" width="195" height="44" rx="8" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="302" y="63" textAnchor="middle" fontSize="14">🗺️</text>
        <text x="388" y="63" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10.5">Cas d&apos;usage identifié</text>

        {/* Arrow 1 → 2 */}
        <motion.path d="M 375 80 L 375 106" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -24] }} transition={defaultTransition} />
        <polygon points="375,106 370,98 380,98" fill="var(--color-accent)" opacity="0.6" />

        {/* Node 2: Proof of Concept — accented */}
        <rect x="278" y="106" width="195" height="44" rx="8" fill="var(--color-accent)" opacity="0.1" />
        <rect x="278" y="106" width="195" height="44" rx="8" stroke="var(--color-accent)" strokeWidth="1.5" />
        <text x="302" y="133" textAnchor="middle" fontSize="14">✨</text>
        <text x="388" y="133" textAnchor="middle" fill="var(--color-accent)" fontSize="10.5" fontWeight="600">Proof of Concept</text>

        {/* Arrow 2 → 3 */}
        <motion.path d="M 375 150 L 375 176" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -24] }} transition={defaultTransition} />
        <polygon points="375,176 370,168 380,168" fill="var(--color-accent)" opacity="0.8" />

        {/* Node 3: Déploiement — full accent */}
        <rect x="278" y="176" width="195" height="44" rx="8" fill="var(--color-accent)" opacity="0.18" />
        <rect x="278" y="176" width="195" height="44" rx="8" stroke="var(--color-accent)" strokeWidth="2" />
        <text x="302" y="203" textAnchor="middle" fontSize="14">🚀</text>
        <text x="388" y="203" textAnchor="middle" fill="var(--color-accent)" fontSize="10.5" fontWeight="700">Déploiement</text>

        {/* Badge: Plan adoption 60 jours */}
        <rect x="278" y="230" width="195" height="24" rx="12" fill="var(--color-accent)" opacity="0.07" />
        <rect x="278" y="230" width="195" height="24" rx="12" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" />
        <text x="375" y="246" textAnchor="middle" fill="var(--color-accent)" fontSize="9" fontWeight="600">Plan d&apos;adoption : 60 jours</text>

      </svg>
    </div>
  );
}

export function SprintSchema() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-surface/50 rounded-2xl border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-full" fill="none" aria-hidden="true" focusable="false">
        {/* Timeline Arrow Background */}
        <path d="M 80 120 L 520 120" stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <motion.path d="M 80 120 L 520 120" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* --- Étape 1 : Diagnostic --- */}
        <g transform="translate(160, 120)">
          {/* Main Node */}
          <motion.circle cx="0" cy="0" r="30" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="3" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
          <text x="0" y="7" textAnchor="middle" fontSize="20">📋</text>

          {/* text Details */}
          <text x="0" y="50" textAnchor="middle" fill="var(--color-text-primary)" fontSize="13" fontWeight="bold">1. DIAGNOSTIC</text>
          <text x="0" y="68" textAnchor="middle" fill="var(--color-success)" fontSize="11" fontWeight="600">OFFERT</text>
        </g>

        {/* --- Étape 2 : Sprint Immersif --- */}
        <g transform="translate(420, 120)">
          {/* Main Node */}
          <motion.circle cx="0" cy="0" r="35" fill="var(--color-accent)" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
          <text x="0" y="7" textAnchor="middle" fontSize="22">🚀</text>

          {/* text Details */}
          <text x="0" y="55" textAnchor="middle" fill="var(--color-text-primary)" fontSize="13" fontWeight="bold">2. SPRINT IMMERSIF</text>
          <text x="0" y="73" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11">4 JOURS OUVRÉS</text>
        </g>

        {/* --- Séparateur --- */}
        <line x1="60" y1="240" x2="540" y2="240" stroke="var(--color-border)" strokeWidth="1" opacity="0.3" />

        {/* --- Livrables en dessous du schéma (2 par ligne) --- */}
        <text x="300" y="268" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="bold" opacity="0.6" className="uppercase tracking-wide">LIVRABLES</text>

        {/* Ligne 1 : 2 livrables */}
        <g transform="translate(55, 285)">
          <rect x="0" y="0" width="230" height="38" rx="19" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="22" cy="19" r="12" fill="var(--color-accent)" opacity="0.1" />
          <text x="22" y="23" textAnchor="middle" fontSize="12">📝</text>
          <text x="130" y="24" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11">Questionnaire ciblé</text>
        </g>
        <g transform="translate(315, 285)">
          <rect x="0" y="0" width="230" height="38" rx="19" fill="var(--color-accent)" opacity="0.1" />
          <rect x="0" y="0" width="230" height="38" rx="19" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="22" cy="19" r="12" fill="var(--color-accent)" opacity="0.1" />
          <text x="22" y="23" textAnchor="middle" fontSize="12">📊</text>
          <text x="130" y="24" textAnchor="middle" fill="var(--color-accent)" fontSize="11" fontWeight="600">Pré-rapport ROI</text>
        </g>

        {/* Ligne 2 : 2 livrables */}
        <g transform="translate(55, 335)">
          <rect x="0" y="0" width="230" height="38" rx="19" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="22" cy="19" r="12" fill="var(--color-accent)" opacity="0.1" />
          <text x="22" y="23" textAnchor="middle" fontSize="12">🗺️</text>
          <text x="130" y="24" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11">Cartographie Données</text>
        </g>
        <g transform="translate(315, 335)">
          <rect x="0" y="0" width="230" height="38" rx="19" fill="var(--color-accent)" opacity="0.1" />
          <rect x="0" y="0" width="230" height="38" rx="19" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="22" cy="19" r="12" fill="var(--color-accent)" opacity="0.1" />
          <text x="22" y="23" textAnchor="middle" fontSize="12">✨</text>
          <text x="130" y="24" textAnchor="middle" fill="var(--color-accent)" fontSize="11" fontWeight="600">PoC / MVP Délivré</text>
        </g>
      </svg>
    </div>
  );
}
