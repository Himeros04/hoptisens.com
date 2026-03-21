import type { ToolOption, ToolCategory } from './types';

// Catalogue de projets types injecté dans le system prompt
export const PROJECT_CATALOG = `
## Catégorie 1 — L'Étude & Les Plans (etude_plans)

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| audit-data | Audit de l'infrastructure de données | 3/10 | schema-audit |
| audit-process | Cartographie des processus automatisables | 4/10 | schema-audit |
| audit-commercial | Audit de l'architecture commerciale | 3/10 | schema-audit |
| diag-maturite | Diagnostic de maturité IA | 2/10 | schema-audit |

## Catégorie 2 — Le Gros Œuvre (gros_oeuvre)

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| agent-email | Agent IA de traitement et réponse aux emails | 6/10 | schema-agent-email |
| agent-qualification | Agent IA de qualification de prospects | 7/10 | schema-agent-leads |
| agent-support | Agent IA de support client niveau 1 | 6/10 | schema-agent-support |
| agent-interne | Agent IA interne (assistant métier) | 5/10 | schema-agent-interne |
| auto-reporting | Automatisation du reporting (Excel → Dashboard) | 4/10 | schema-auto-reporting |
| auto-facturation | Automatisation facturation et relances | 5/10 | schema-auto-facturation |
| auto-onboarding | Automatisation onboarding client/collaborateur | 5/10 | schema-auto-onboarding |
| crm-semi-auto | CRM semi-automatisé | 7/10 | schema-crm |
| interconnexion | Câblage logiciel (interconnexion d'outils) | 5/10 | schema-interconnexion |

## Catégorie 3 — Les Réseaux d'Acquisition (acquisition)

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| prospecteur-augmente | Prospection IA automatisée (scraping + rédaction) | 7/10 | schema-prospecteur |
| filtre-ia | Filtre IA de qualification inbound | 6/10 | schema-filtre-ia |
| contenu-ia | Usine à contenus multi-canaux IA | 5/10 | schema-contenu |
| seo-infra | Infrastructure de pages SEO optimisées | 6/10 | schema-seo |

## Catégorie 4 — Le Transfert de Compétences (transfert_competences)

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| formation-fondamentaux | Atelier "Les Fondamentaux de l'IA" | 2/10 | schema-formation |
| formation-assistants | Formation "Créer ses propres assistants IA" | 3/10 | schema-formation |
| agent-formateur | Agent formateur interne (onboarding IA) | 5/10 | schema-agent-interne |

SCHÉMAS DISPONIBLES ET LEURS NŒUDS :
- schema-agent-email : source, agent, db, output, reply
- schema-agent-leads : source1, source2, filter, output
- schema-agent-support : source, agent, kb, auto, escalade
- schema-agent-interne : trigger, agent, data, action
- schema-auto-reporting : source1, source2, automation, output, notif
- schema-auto-facturation : trigger, automation, template, compta, email
- schema-auto-onboarding : trigger, workflow, docs, email, task
- schema-crm : input1, input2, scoring, crm, alert, dash
- schema-interconnexion : app1, app2, app3, hub, out1, out2
- schema-prospecteur : source, scraping, enrich, redaction, output
- schema-filtre-ia : source1, source2, filter, output
- schema-contenu : brief, generation, canal1, canal2, canal3
- schema-seo : keyword, generation, pages, analytics
- schema-formation : equipe, formation, ateliers, output, certif
- schema-audit : input, analyse, entretien, livrable
`;

// Outils disponibles pour l'étape 3
export const TOOL_OPTIONS: ToolOption[] = [
  // Email & Communication
  { id: 'gmail', name: 'Gmail', category: 'email_communication', icon: '📧' },
  { id: 'outlook', name: 'Outlook', category: 'email_communication', icon: '📬' },
  { id: 'slack', name: 'Slack', category: 'email_communication', icon: '💬' },
  { id: 'teams', name: 'Teams', category: 'email_communication', icon: '👥' },
  { id: 'whatsapp', name: 'WhatsApp Business', category: 'email_communication', icon: '📱' },
  // CRM & Ventes
  { id: 'hubspot', name: 'HubSpot', category: 'crm_ventes', icon: '🟠' },
  { id: 'salesforce', name: 'Salesforce', category: 'crm_ventes', icon: '☁️' },
  { id: 'pipedrive', name: 'Pipedrive', category: 'crm_ventes', icon: '📊' },
  { id: 'monday', name: 'monday.com', category: 'crm_ventes', icon: '📋' },
  { id: 'excel-crm', name: 'Excel/Sheets (CRM)', category: 'crm_ventes', icon: '📗' },
  // Gestion de projet
  { id: 'notion', name: 'Notion', category: 'gestion_projet', icon: '📝' },
  { id: 'trello', name: 'Trello', category: 'gestion_projet', icon: '📌' },
  { id: 'asana', name: 'Asana', category: 'gestion_projet', icon: '✅' },
  { id: 'clickup', name: 'ClickUp', category: 'gestion_projet', icon: '⚡' },
  // Comptabilité & Finance
  { id: 'pennylane', name: 'Pennylane', category: 'comptabilite', icon: '💰' },
  { id: 'quickbooks', name: 'QuickBooks', category: 'comptabilite', icon: '📒' },
  { id: 'sage', name: 'Sage', category: 'comptabilite', icon: '🏦' },
  { id: 'excel-compta', name: 'Excel/Sheets', category: 'comptabilite', icon: '📗' },
  // Marketing
  { id: 'mailchimp', name: 'Mailchimp', category: 'marketing', icon: '🐵' },
  { id: 'brevo', name: 'Brevo', category: 'marketing', icon: '📨' },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', category: 'marketing', icon: '💼' },
  { id: 'meta-ads', name: 'Meta Ads', category: 'marketing', icon: '📘' },
  { id: 'wordpress', name: 'WordPress', category: 'marketing', icon: '🌐' },
];

export const TOOL_CATEGORIES: Record<ToolCategory, string> = {
  email_communication: 'Email & Communication',
  crm_ventes: 'CRM & Ventes',
  gestion_projet: 'Gestion de projet',
  comptabilite: 'Comptabilité & Finance',
  marketing: 'Marketing',
  autre: 'Autre',
};

// Labels pour affichage UI
export const ROLE_LABELS: Record<string, string> = {
  dirigeant: 'Dirigeant / Gérant',
  directeur_commercial: 'Directeur Commercial',
  daf: 'DAF / Resp. Financier',
  responsable_ops: 'Responsable Opérations',
  cto_dsi: 'CTO / DSI',
  responsable_marketing: 'Responsable Marketing',
  autre: 'Autre',
};

export const SECTOR_LABELS: Record<string, string> = {
  agence_esn: 'Agence / ESN',
  conseil: 'Conseil',
  commerce_retail: 'Commerce / Retail',
  industrie_logistique: 'Industrie / Logistique',
  services_b2b: 'Services B2B',
  sante: 'Santé',
  immobilier: 'Immobilier',
  education: 'Éducation / Formation',
  autre: 'Autre',
};

export const COMPANY_SIZE_LABELS: Record<string, string> = {
  '1-5': '1-5',
  '6-20': '6-20',
  '21-50': '21-50',
  '51-150': '51-150',
  '150-300': '150-300',
  '300+': '300+',
};

export const DEPARTMENT_LABELS: Record<string, string> = {
  direction: 'Direction générale',
  commercial: 'Commercial / Ventes',
  marketing: 'Marketing',
  finance_admin: 'Finance / Admin',
  operations: 'Opérations / Production',
  it_tech: 'IT / Tech',
  rh: 'RH',
  transversal: 'Transversal',
};

export const PAIN_POINT_LABELS: Record<string, { label: string; description: string }> = {
  prospection_leads: {
    label: 'Prospection & qualification de prospects',
    description: 'Recherche manuelle de prospects, tri, relances',
  },
  reponse_clients: {
    label: 'Réponse aux demandes clients',
    description: 'Emails répétitifs, FAQ, support niveau 1',
  },
  saisie_reporting: {
    label: 'Saisie de données & reporting',
    description: 'Double saisie, consolidation Excel, rapports manuels',
  },
  suivi_commercial: {
    label: 'Suivi commercial (CRM)',
    description: 'Mise à jour des fiches, relances, pipeline',
  },
  facturation_admin: {
    label: 'Facturation & administratif',
    description: 'Devis, factures, relances de paiement',
  },
  creation_contenu: {
    label: 'Création de contenu',
    description: 'Posts réseaux sociaux, newsletters, articles',
  },
  onboarding: {
    label: 'Onboarding clients/collaborateurs',
    description: "Processus d'intégration, documentation, formation",
  },
  gestion_emails: {
    label: 'Gestion des emails & tri',
    description: 'Boîte de réception débordante, routage manuel',
  },
  recrutement_rh: {
    label: 'Recrutement & RH',
    description: 'Tri de CV, réponses candidats, planification entretiens',
  },
};

export const MATURITY_LABELS: Record<string, { label: string; emoji: string; description: string }> = {
  decouverte: {
    label: 'Découverte',
    emoji: '🌱',
    description: "On n'a rien mis en place, on explore les possibilités.",
  },
  premiers_pas: {
    label: 'Premiers pas',
    emoji: '🔧',
    description: "On utilise ChatGPT ou quelques outils, mais rien de structuré.",
  },
  en_route: {
    label: 'En route',
    emoji: '🚀',
    description: "On a déjà des automatisations (Make, Zapier) et on veut aller plus loin.",
  },
};

export const TIME_HORIZON_LABELS: Record<string, string> = {
  urgent: 'Urgent (< 1 mois)',
  court_terme: 'Court terme (1-3 mois)',
  moyen_terme: 'Moyen terme (3-6 mois)',
  exploration: 'Exploration (pas de deadline)',
};
