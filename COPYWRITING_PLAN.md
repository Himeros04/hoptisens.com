# Plan d'Implémentation - Refonte Copywriting Hoptisens

## Analyse du Copywriting Actuel

### 1. Mots anglais à remplacer dans la version française

| Mot anglais | Remplacer par | Emplacement |
|-------------|---------------|--------------|
| Leads / Lead | Prospect(s) | `Offres.tsx`, Footer, pages offres |
| Pipeline | Circuit/Enchaînement | `leads/page.tsx` |
| Workflow | Flux de travail | `SchemaAutoOnboarding.tsx`, catalogue |
| PoC (Proof of Concept) | Preuve de concept | `a-propos/page.tsx` |
| ROI | Retour sur investissement | (peut être conservé) |
| CRM | Gestion relation client | (peut être conservé) |
| Checkbox/Checklist | Case à cocher/Liste de vérification | (si présent) |
| Landing page | Page d'atterrissage | (si présent) |
| Pop-up / Popup | Fenêtre surgissante | (si présent) |
| Call-to-action / CTA | Appel à l'action | (si présent) |
| Chatbot | Agent conversationnel | (si présent) |
| Webhook | Crochet web | (si présent) |
| Trigger | Déclencheur | (si présent) |
| Funnel | Entonnoir | (si présent) |
| Analytics | Analyse | (si présent) |

### 2. Mots "irritants" et "douleur" à remplacer par "Processus"

**Fichiers à modifier :**
- `messages/fr.json` (lignes 46-47)
- `components/diagnostic/steps/StepPainPoints.tsx` (lignes 53, 116)
- `lib/diagnostic/prompt.ts` (si applicable pour le contexte technique)

### 3. Génération du copywriting anglais

**Fichier à créer/modifier :** `messages/en.json`

---

## Liste des Tâches

### Tâche 1 : Remplacer les mots anglais dans la version française
- [ ] **1.1** `components/sections/Offres.tsx` : "Leads" → "Prospects"
- [ ] **1.2** `components/layout/Footer.tsx` : "Leads" → "Prospects"  
- [ ] **1.3** `app/[locale]/offres/leads/page.tsx` : "pipeline" → "circuit de prospection", "leads" → "prospects"
- [ ] **1.4** `lib/diagnostic/catalog.ts` : "leads" → "prospects"
- [ ] **1.5** `components/visuals/OfferSchemas.tsx` : "Lead Qualifié" → "Prospect Qualifié"
- [ ] **1.6** `app/[locale]/a-propos/page.tsx` : "POC" → "Preuve de concept"
- [ ] **1.7** `components/schemas/SchemaAutoOnboarding.tsx` : "Workflow" → "Flux de travail"

### Tâche 2 : Remplacer "irritants" et "douleur" par "Processus"
- [ ] **2.1** `messages/fr.json` :
  - "Sélectionnez 1 à 4 irritants" → "Sélectionnez 1 à 4 processus"
  - "votre plus grand irritant" → "votre plus grand processus"
- [ ] **2.2** `components/diagnostic/steps/StepPainPoints.tsx` : Même changement

### Tâche 3 : Générer le copywriting anglais complet
- [ ] **3.1** `messages/en.json` : Compléter toutes les traductions pour correspondre au français
- [ ] **3.2** Traduire le contenu des composants (Offres, Hero, etc.)

---

## Détail des modifications pour la version anglaise

### messages/en.json - Proposition de contenu

```json
{
  "Index": {
    "title": "Simplify to Amplify."
  },
  "Navigation": {
    "offres": "Services",
    "diagnostic": "Diagnostic",
    "apropos": "About",
    "contact": "Contact",
    "cta": "Book a Call →",
    "entreprise": "Company",
    "legals": "Legal Notice",
    "rgpd": "Privacy Policy"
  },
  "Hero": {
    "multipliez": "Multiply",
    "vos": "your",
    "prospects": "qualified prospects",
    "divisez": "Divide",
    "couts": "your",
    "gaspilles": "wasted costs",
    "description": "Hoptisens designs and deploys custom AI systems for SMEs: automation, intelligent agents, connected CRM. Your margins are protected, your time is freed.",
    "cta_diagnostic": "⚡ Start my Diagnostic",
    "cta_call": "📞 Book a Call",
    "cta_calculator": "Calculate my time savings"
  },
  "Offres": {
    "acquisition": "Acquisition & Prospects",
    "automation": "Automation & RPA",
    "agents": "AI Agents",
    "sprint": "AI Sprint",
    "cta_audit": "Audit my Acquisition",
    "cta_estimate": "Calculate my Time Savings",
    "cta_prototype": "Prototype my AI Agent",
    "cta_start": "Start my Diagnostic"
  },
  "Diagnostic": {
    "steps": {
      "painPoints": {
        "subtitle": "Select 1 to 4 processes, then indicate your #1 priority.",
        "descriptionLabel": "Describe your biggest process in one sentence (optional)"
      }
    }
  }
}
```

---

## Résumé des fichiers à modifier

1. `messages/fr.json` - FR translations (irritants → processus)
2. `messages/en.json` - EN translations (complete rewrite)
3. `components/sections/Offres.tsx` - "Leads" → "Prospects"
4. `components/layout/Footer.tsx` - "Leads" → "Prospects"
5. `app/[locale]/offres/leads/page.tsx` - English words to French
6. `components/diagnostic/steps/StepPainPoints.tsx` - irritants → processus
7. `lib/diagnostic/catalog.ts` - leads → prospects
8. `components/visuals/OfferSchemas.tsx` - Lead → Prospect
9. `app/[locale]/a-propos/page.tsx` - PoC → Preuve de concept
10. `components/schemas/SchemaAutoOnboarding.tsx` - Workflow → Flux de travail