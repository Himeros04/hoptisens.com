import type { DiagnosticInput, DiagnosticResult, PainPoint, MaturityLevel } from './types';

// Données de fallback pour chaque projet type
const PROJECT_DEFAULTS: Record<string, {
  title: string;
  description: string;
  complexity: number;
  complexityLabel: "low" | "medium" | "high";
  estimatedHoursPerMonth: number;
  estimatedDelivery: string;
  schemaId: string;
  defaultNodes: Array<{ id: string; label: string }>;
  offerCategory: "etude_plans" | "gros_oeuvre" | "acquisition" | "transfert_competences";
}> = {
  'diag-maturite': {
    title: 'Diagnostic de maturité IA',
    description: "Un état des lieux complet de votre maturité numérique et IA, avec un plan d'action priorisé adapté à votre contexte.",
    complexity: 2,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 5,
    estimatedDelivery: '1 semaine',
    schemaId: 'schema-audit',
    defaultNodes: [
      { id: 'input', label: 'Vos données' },
      { id: 'analyse', label: 'Analyse Hoptisens' },
      { id: 'entretien', label: 'Entretiens' },
      { id: 'livrable', label: 'Rapport + Plan' },
    ],
    offerCategory: 'etude_plans',
  },
  'audit-process': {
    title: 'Cartographie des processus automatisables',
    description: "Identification et priorisation de tous les processus manuels qui pourraient être automatisés dans votre entreprise.",
    complexity: 4,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 10,
    estimatedDelivery: '1-2 semaines',
    schemaId: 'schema-audit',
    defaultNodes: [
      { id: 'input', label: 'Processus actuels' },
      { id: 'analyse', label: 'Analyse Hoptisens' },
      { id: 'entretien', label: 'Audit terrain' },
      { id: 'livrable', label: 'Cartographie' },
    ],
    offerCategory: 'etude_plans',
  },
  'audit-commercial': {
    title: "Audit de l'architecture commerciale",
    description: "Analyse complète de votre pipeline commercial et identification des leviers d'automatisation à fort impact.",
    complexity: 3,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 8,
    estimatedDelivery: '1-2 semaines',
    schemaId: 'schema-audit',
    defaultNodes: [
      { id: 'input', label: 'Pipeline actuel' },
      { id: 'analyse', label: 'Analyse Hoptisens' },
      { id: 'entretien', label: 'Audit CRM' },
      { id: 'livrable', label: "Plan d'action" },
    ],
    offerCategory: 'etude_plans',
  },
  'audit-data': {
    title: "Audit de l'infrastructure de données",
    description: "État des lieux de vos flux de données et recommandations pour une architecture qui soutient l'automatisation.",
    complexity: 3,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 8,
    estimatedDelivery: '1-2 semaines',
    schemaId: 'schema-audit',
    defaultNodes: [
      { id: 'input', label: 'Données existantes' },
      { id: 'analyse', label: 'Analyse Hoptisens' },
      { id: 'entretien', label: 'Audit data' },
      { id: 'livrable', label: 'Rapport + Plan' },
    ],
    offerCategory: 'etude_plans',
  },
  'agent-email': {
    title: 'Agent IA de traitement des emails',
    description: "Un agent intelligent qui analyse, trie et répond automatiquement à vos emails entrants selon vos règles métier.",
    complexity: 6,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 20,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-agent-email',
    defaultNodes: [
      { id: 'source', label: 'Email' },
      { id: 'agent', label: 'Agent IA' },
      { id: 'db', label: 'Base de règles' },
      { id: 'output', label: 'CRM' },
      { id: 'reply', label: 'Réponse auto' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'agent-qualification': {
    title: 'Agent IA de qualification de leads',
    description: "Un agent connecté à vos canaux d'acquisition qui analyse chaque prospect, évalue son potentiel et envoie une réponse personnalisée.",
    complexity: 7,
    complexityLabel: 'high',
    estimatedHoursPerMonth: 25,
    estimatedDelivery: '3-4 semaines',
    schemaId: 'schema-agent-leads',
    defaultNodes: [
      { id: 'source1', label: 'Site web' },
      { id: 'source2', label: 'LinkedIn' },
      { id: 'filter', label: 'Filtre IA' },
      { id: 'output', label: 'CRM' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'agent-support': {
    title: 'Agent IA de support client niveau 1',
    description: "Un agent qui répond automatiquement aux questions fréquentes et escalade les demandes complexes vers votre équipe.",
    complexity: 6,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 30,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-agent-support',
    defaultNodes: [
      { id: 'source', label: 'Chat / Email' },
      { id: 'agent', label: 'Agent IA' },
      { id: 'kb', label: 'FAQ / Base' },
      { id: 'auto', label: 'Réponse auto' },
      { id: 'escalade', label: 'Équipe' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'agent-interne': {
    title: 'Agent IA interne (assistant métier)',
    description: "Un assistant IA interne qui aide vos équipes à trouver l'information et à exécuter les tâches récurrentes.",
    complexity: 5,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 15,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-agent-interne',
    defaultNodes: [
      { id: 'trigger', label: 'Slack / Teams' },
      { id: 'agent', label: 'Agent IA' },
      { id: 'data', label: 'Base données' },
      { id: 'action', label: 'Action' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'auto-reporting': {
    title: 'Automatisation du reporting',
    description: "Vos données consolidées automatiquement depuis vos sources, transformées en tableaux de bord clairs et envoyées à la bonne personne.",
    complexity: 4,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 15,
    estimatedDelivery: '1-2 semaines',
    schemaId: 'schema-auto-reporting',
    defaultNodes: [
      { id: 'source1', label: 'CRM' },
      { id: 'source2', label: 'Compta' },
      { id: 'automation', label: 'Automation' },
      { id: 'output', label: 'Dashboard' },
      { id: 'notif', label: 'Notification' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'auto-facturation': {
    title: 'Automatisation facturation et relances',
    description: "Génération automatique de vos factures et relances de paiement à partir de vos données CRM.",
    complexity: 5,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 12,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-auto-facturation',
    defaultNodes: [
      { id: 'trigger', label: 'CRM' },
      { id: 'automation', label: 'Automation' },
      { id: 'template', label: 'Template' },
      { id: 'compta', label: 'Comptabilité' },
      { id: 'email', label: 'Email' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'auto-onboarding': {
    title: 'Automatisation onboarding',
    description: "Un workflow automatisé qui guide chaque nouveau client ou collaborateur à travers toutes les étapes d'intégration.",
    complexity: 5,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 10,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-auto-onboarding',
    defaultNodes: [
      { id: 'trigger', label: 'Nouveau client' },
      { id: 'workflow', label: 'Workflow' },
      { id: 'docs', label: 'Documentation' },
      { id: 'email', label: 'Séquence email' },
      { id: 'task', label: 'Tâches PM' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'crm-semi-auto': {
    title: 'CRM semi-automatisé',
    description: "Un CRM enrichi par l'IA qui score vos prospects, automatise les relances et vous donne un pipeline toujours à jour.",
    complexity: 7,
    complexityLabel: 'high',
    estimatedHoursPerMonth: 20,
    estimatedDelivery: '3-4 semaines',
    schemaId: 'schema-crm',
    defaultNodes: [
      { id: 'input1', label: 'Site web' },
      { id: 'input2', label: 'LinkedIn' },
      { id: 'scoring', label: 'Scoring IA' },
      { id: 'crm', label: 'CRM' },
      { id: 'alert', label: 'Alertes' },
      { id: 'dash', label: 'Dashboard' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'interconnexion': {
    title: 'Câblage logiciel (interconnexion d\'outils)',
    description: "Connecter tous vos outils entre eux pour que les données circulent automatiquement, sans double saisie.",
    complexity: 5,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 15,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-interconnexion',
    defaultNodes: [
      { id: 'app1', label: 'App 1' },
      { id: 'app2', label: 'App 2' },
      { id: 'app3', label: 'App 3' },
      { id: 'hub', label: 'Hub Automation' },
      { id: 'out1', label: 'Sortie 1' },
      { id: 'out2', label: 'Sortie 2' },
    ],
    offerCategory: 'gros_oeuvre',
  },
  'prospecteur-augmente': {
    title: 'Prospection IA automatisée',
    description: "Un système qui scrape, enrichit et contacte automatiquement vos prospects idéaux avec des messages personnalisés.",
    complexity: 7,
    complexityLabel: 'high',
    estimatedHoursPerMonth: 25,
    estimatedDelivery: '3-4 semaines',
    schemaId: 'schema-prospecteur',
    defaultNodes: [
      { id: 'source', label: 'LinkedIn' },
      { id: 'scraping', label: 'Scraping + IA' },
      { id: 'enrich', label: 'Enrichissement' },
      { id: 'redaction', label: 'Rédaction IA' },
      { id: 'output', label: 'CRM / Email' },
    ],
    offerCategory: 'acquisition',
  },
  'filtre-ia': {
    title: 'Filtre IA de qualification inbound',
    description: "Un filtre intelligent qui analyse et qualifie automatiquement chaque lead entrant selon vos critères.",
    complexity: 6,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 15,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-filtre-ia',
    defaultNodes: [
      { id: 'source1', label: 'Site web' },
      { id: 'source2', label: 'Email' },
      { id: 'filter', label: 'Filtre IA' },
      { id: 'output', label: 'CRM' },
    ],
    offerCategory: 'acquisition',
  },
  'contenu-ia': {
    title: 'Usine à contenus multi-canaux IA',
    description: "Générez automatiquement des contenus adaptés pour chaque canal à partir d'un brief unique.",
    complexity: 5,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 20,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-contenu',
    defaultNodes: [
      { id: 'brief', label: 'Brief' },
      { id: 'generation', label: 'Génération IA' },
      { id: 'canal1', label: 'LinkedIn' },
      { id: 'canal2', label: 'Blog' },
      { id: 'canal3', label: 'Newsletter' },
    ],
    offerCategory: 'acquisition',
  },
  'seo-infra': {
    title: 'Infrastructure de pages SEO optimisées',
    description: "Générez automatiquement des pages web optimisées pour le SEO afin de capter du trafic qualifié.",
    complexity: 6,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 15,
    estimatedDelivery: '3-4 semaines',
    schemaId: 'schema-seo',
    defaultNodes: [
      { id: 'keyword', label: 'Mots-clés' },
      { id: 'generation', label: 'Génération IA' },
      { id: 'pages', label: 'Pages web' },
      { id: 'analytics', label: 'Analytics' },
    ],
    offerCategory: 'acquisition',
  },
  'formation-fondamentaux': {
    title: 'Atelier "Les Fondamentaux de l\'IA"',
    description: "Une formation pratique pour comprendre l'IA et l'automatisation, avec des ateliers hands-on adaptés à votre métier.",
    complexity: 2,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 5,
    estimatedDelivery: '1 semaine',
    schemaId: 'schema-formation',
    defaultNodes: [
      { id: 'equipe', label: 'Votre équipe' },
      { id: 'formation', label: 'Formation' },
      { id: 'ateliers', label: 'Ateliers + TP' },
      { id: 'output', label: 'Compétences IA' },
      { id: 'certif', label: 'Certification' },
    ],
    offerCategory: 'transfert_competences',
  },
  'formation-assistants': {
    title: 'Formation "Créer ses propres assistants IA"',
    description: "Apprenez à concevoir et déployer vos propres assistants IA pour automatiser votre quotidien.",
    complexity: 3,
    complexityLabel: 'low',
    estimatedHoursPerMonth: 8,
    estimatedDelivery: '1-2 semaines',
    schemaId: 'schema-formation',
    defaultNodes: [
      { id: 'equipe', label: 'Votre équipe' },
      { id: 'formation', label: 'Formation' },
      { id: 'ateliers', label: 'Création IA' },
      { id: 'output', label: 'Assistants IA' },
      { id: 'certif', label: 'Certification' },
    ],
    offerCategory: 'transfert_competences',
  },
  'agent-formateur': {
    title: 'Agent formateur interne',
    description: "Un agent IA dédié à la formation continue de vos équipes sur les outils et processus internes.",
    complexity: 5,
    complexityLabel: 'medium',
    estimatedHoursPerMonth: 10,
    estimatedDelivery: '2-3 semaines',
    schemaId: 'schema-agent-interne',
    defaultNodes: [
      { id: 'trigger', label: 'Collaborateur' },
      { id: 'agent', label: 'Agent Formateur' },
      { id: 'data', label: 'Base savoir' },
      { id: 'action', label: 'Parcours formation' },
    ],
    offerCategory: 'transfert_competences',
  },
};

// Matrice de fallback pain → maturité → projets
const FALLBACK_MATRIX: Record<string, Record<MaturityLevel, string[]>> = {
  prospection_leads: {
    decouverte: ['diag-maturite', 'filtre-ia'],
    premiers_pas: ['prospecteur-augmente', 'auto-reporting'],
    en_route: ['prospecteur-augmente', 'crm-semi-auto'],
  },
  reponse_clients: {
    decouverte: ['formation-fondamentaux', 'agent-support'],
    premiers_pas: ['agent-email', 'auto-reporting'],
    en_route: ['agent-support', 'crm-semi-auto'],
  },
  saisie_reporting: {
    decouverte: ['audit-process', 'auto-reporting'],
    premiers_pas: ['auto-reporting', 'interconnexion'],
    en_route: ['auto-reporting', 'crm-semi-auto', 'agent-interne'],
  },
  suivi_commercial: {
    decouverte: ['audit-commercial', 'crm-semi-auto'],
    premiers_pas: ['crm-semi-auto', 'auto-reporting'],
    en_route: ['crm-semi-auto', 'prospecteur-augmente'],
  },
  facturation_admin: {
    decouverte: ['audit-process', 'auto-facturation'],
    premiers_pas: ['auto-facturation', 'interconnexion'],
    en_route: ['auto-facturation', 'agent-interne'],
  },
  creation_contenu: {
    decouverte: ['formation-assistants', 'contenu-ia'],
    premiers_pas: ['contenu-ia', 'seo-infra'],
    en_route: ['contenu-ia', 'seo-infra', 'prospecteur-augmente'],
  },
  onboarding: {
    decouverte: ['audit-process', 'auto-onboarding'],
    premiers_pas: ['auto-onboarding', 'agent-interne'],
    en_route: ['auto-onboarding', 'agent-formateur'],
  },
  gestion_emails: {
    decouverte: ['formation-fondamentaux', 'agent-email'],
    premiers_pas: ['agent-email', 'interconnexion'],
    en_route: ['agent-email', 'agent-interne'],
  },
  recrutement_rh: {
    decouverte: ['audit-process', 'auto-onboarding'],
    premiers_pas: ['auto-onboarding', 'agent-interne'],
    en_route: ['auto-onboarding', 'agent-formateur'],
  },
};

function getRecommendedEntry(input: DiagnosticInput): "sprint" | "audit" | "formation" | "rdv_direct" {
  if (input.timeHorizon === 'urgent') return 'rdv_direct';
  if (input.maturity === 'decouverte' && ['51-150', '150-300', '300+'].includes(input.companySize)) return 'formation';
  if (input.painPoints.length >= 3) return 'audit';
  if (input.maturity === 'decouverte' || input.maturity === 'premiers_pas') return 'sprint';
  return 'sprint';
}

export function getFallbackResult(input: DiagnosticInput): DiagnosticResult {
  const painKey = input.priorityPainPoint;
  const maturity = input.maturity;

  const projectIds = FALLBACK_MATRIX[painKey]?.[maturity] ?? ['audit-process', 'auto-reporting'];

  const projects = projectIds.slice(0, 3).map((id, index) => {
    const defaults = PROJECT_DEFAULTS[id];
    if (!defaults) {
      return {
        id,
        title: 'Projet recommandé',
        description: 'Contactez-nous pour une recommandation personnalisée.',
        priority: index === 0 ? 'high' as const : index === 1 ? 'quick_win' as const : 'vision' as const,
        complexity: 5,
        complexityLabel: 'medium' as const,
        estimatedHoursPerMonth: 10,
        estimatedDelivery: '2-3 semaines',
        schemaId: 'schema-audit',
        schemaLabels: { nodes: [] },
        toolsInvolved: [],
        offerCategory: 'gros_oeuvre' as const,
      };
    }

    return {
      id,
      title: defaults.title,
      description: defaults.description,
      priority: index === 0 ? 'high' as const : index === 1 ? 'quick_win' as const : 'vision' as const,
      complexity: defaults.complexity,
      complexityLabel: defaults.complexityLabel,
      estimatedHoursPerMonth: defaults.estimatedHoursPerMonth,
      estimatedDelivery: defaults.estimatedDelivery,
      schemaId: defaults.schemaId,
      schemaLabels: { nodes: defaults.defaultNodes },
      toolsInvolved: input.tools.slice(0, 4),
      offerCategory: defaults.offerCategory,
    };
  });

  const sectorLabel = input.sector.replace(/_/g, ' ');
  const summary = `Pour une entreprise de ${input.companySize} collaborateurs dans le secteur ${sectorLabel}, voici les projets à plus fort impact pour répondre à vos priorités.`;

  return {
    summary,
    projects,
    recommendedEntry: getRecommendedEntry(input),
  };
}
