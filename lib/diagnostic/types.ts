import { z } from 'zod';

export type UserRole =
  | "dirigeant"
  | "directeur_commercial"
  | "daf"
  | "responsable_ops"
  | "cto_dsi"
  | "responsable_marketing"
  | "autre";

export type Sector =
  | "agence_esn"
  | "conseil"
  | "commerce_retail"
  | "industrie_logistique"
  | "services_b2b"
  | "sante"
  | "immobilier"
  | "education"
  | "autre";

export type CompanySize =
  | "1-5"
  | "6-20"
  | "21-50"
  | "51-150"
  | "150-300"
  | "300+";

export type Department =
  | "direction"
  | "commercial"
  | "marketing"
  | "finance_admin"
  | "operations"
  | "it_tech"
  | "rh"
  | "transversal";

export type ToolCategory =
  | "email_communication"
  | "crm_ventes"
  | "gestion_projet"
  | "comptabilite"
  | "marketing"
  | "autre";

export interface ToolOption {
  id: string;
  name: string;
  category: ToolCategory;
  icon: string;
}

export type PainPoint =
  | "prospection_leads"
  | "reponse_clients"
  | "saisie_reporting"
  | "suivi_commercial"
  | "facturation_admin"
  | "creation_contenu"
  | "onboarding"
  | "gestion_emails"
  | "recrutement_rh";

export type MaturityLevel =
  | "decouverte"
  | "premiers_pas"
  | "en_route";

export type TimeHorizon =
  | "urgent"
  | "court_terme"
  | "moyen_terme"
  | "exploration";

export interface DiagnosticInput {
  role: UserRole;
  roleOther?: string;
  sector: Sector;
  sectorOther?: string;
  companySize: CompanySize;
  department: Department;
  tools: string[];
  toolsOther?: string;
  painPoints: PainPoint[];
  priorityPainPoint: PainPoint;
  painPointDescription?: string;
  maturity: MaturityLevel;
  timeHorizon: TimeHorizon;
}

export interface DiagnosticResult {
  summary: string;
  projects: ProjectRecommendation[];
  recommendedEntry: "sprint" | "audit" | "formation" | "rdv_direct";
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "quick_win" | "vision";
  complexity: number;
  complexityLabel: "low" | "medium" | "high";
  estimatedHoursPerMonth: number;
  estimatedDelivery: string;
  schemaId: string;
  schemaLabels: {
    nodes: Array<{ id: string; label: string }>;
  };
  toolsInvolved: string[];
  offerCategory: "etude_plans" | "gros_oeuvre" | "acquisition" | "transfert_competences";
}

export type WizardStep = 0 | 1 | 2 | 3 | 4 | 5;

// Zod schema for API validation
export const DiagnosticInputSchema = z.object({
  role: z.enum(["dirigeant", "directeur_commercial", "daf", "responsable_ops", "cto_dsi", "responsable_marketing", "autre"]),
  roleOther: z.string().optional(),
  sector: z.enum(["agence_esn", "conseil", "commerce_retail", "industrie_logistique", "services_b2b", "sante", "immobilier", "education", "autre"]),
  sectorOther: z.string().optional(),
  companySize: z.enum(["1-5", "6-20", "21-50", "51-150", "150-300", "300+"]),
  department: z.enum(["direction", "commercial", "marketing", "finance_admin", "operations", "it_tech", "rh", "transversal"]),
  tools: z.array(z.string()).min(1),
  toolsOther: z.string().optional(),
  painPoints: z.array(z.enum(["prospection_leads", "reponse_clients", "saisie_reporting", "suivi_commercial", "facturation_admin", "creation_contenu", "onboarding", "gestion_emails", "recrutement_rh"])).min(1).max(4),
  priorityPainPoint: z.enum(["prospection_leads", "reponse_clients", "saisie_reporting", "suivi_commercial", "facturation_admin", "creation_contenu", "onboarding", "gestion_emails", "recrutement_rh"]),
  painPointDescription: z.string().max(200).optional(),
  maturity: z.enum(["decouverte", "premiers_pas", "en_route"]),
  timeHorizon: z.enum(["urgent", "court_terme", "moyen_terme", "exploration"]),
});

export const DiagnosticResultSchema = z.object({
  summary: z.string()
    .describe("Résumé personnalisé en 1-2 phrases du diagnostic"),
  projects: z.array(z.object({
    id: z.string()
      .describe("Identifiant du template de projet depuis le catalogue"),
    title: z.string()
      .describe("Titre du projet, contextualisé au secteur du visiteur"),
    description: z.string()
      .describe("Description en 2-3 phrases, mentionnant les outils du visiteur"),
    priority: z.enum(["high", "quick_win", "vision"])
      .describe("high = impact fort et aligné avec la douleur prioritaire, quick_win = facile et rapide, vision = projet structurant à moyen terme"),
    complexity: z.number().min(1).max(10)
      .describe("1 = très simple (no-code), 10 = architecture complexe"),
    complexityLabel: z.enum(["low", "medium", "high"]),
    estimatedHoursPerMonth: z.number()
      .describe("Heures économisées par mois une fois déployé"),
    estimatedDelivery: z.string()
      .describe("Fourchette de délai ex: '1-2 semaines'"),
    schemaId: z.string()
      .describe("ID du schéma d'architecture à utiliser depuis la bibliothèque"),
    schemaLabels: z.object({
      nodes: z.array(z.object({
        id: z.string(),
        label: z.string(),
      })),
    }).describe("Labels personnalisés pour les nœuds du schéma sélectionné"),
    toolsInvolved: z.array(z.string())
      .describe("Liste des outils impliqués"),
    offerCategory: z.enum([
      "etude_plans",
      "gros_oeuvre",
      "acquisition",
      "transfert_competences",
    ]).describe("Catégorie d'offre Hoptisens correspondante"),
  })).min(2).max(3),
  recommendedEntry: z.enum(["sprint", "audit", "formation", "rdv_direct"])
    .describe("Point d'entrée recommandé dans le parcours Hoptisens"),
});
