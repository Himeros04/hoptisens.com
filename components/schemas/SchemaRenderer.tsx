"use client";

import dynamic from "next/dynamic";

interface SchemaProps {
  labels: {
    nodes: Array<{ id: string; label: string }>;
  };
  animate?: boolean;
}

interface SchemaRendererProps {
  schemaId: string;
  labels: {
    nodes: Array<{ id: string; label: string }>;
  };
  animate?: boolean;
}

// Lazy load schemas
const schemas: Record<string, React.ComponentType<SchemaProps>> = {
  "schema-agent-email": dynamic(() => import("./SchemaAgentEmail").then(m => ({ default: m.SchemaAgentEmail }))),
  "schema-agent-leads": dynamic(() => import("./SchemaAgentLeads").then(m => ({ default: m.SchemaAgentLeads }))),
  "schema-agent-support": dynamic(() => import("./SchemaAgentSupport").then(m => ({ default: m.SchemaAgentSupport }))),
  "schema-agent-interne": dynamic(() => import("./SchemaAgentInterne").then(m => ({ default: m.SchemaAgentInterne }))),
  "schema-auto-reporting": dynamic(() => import("./SchemaAutoReporting").then(m => ({ default: m.SchemaAutoReporting }))),
  "schema-auto-facturation": dynamic(() => import("./SchemaAutoFacturation").then(m => ({ default: m.SchemaAutoFacturation }))),
  "schema-auto-onboarding": dynamic(() => import("./SchemaAutoOnboarding").then(m => ({ default: m.SchemaAutoOnboarding }))),
  "schema-crm": dynamic(() => import("./SchemaCRM").then(m => ({ default: m.SchemaCRM }))),
  "schema-interconnexion": dynamic(() => import("./SchemaInterconnexion").then(m => ({ default: m.SchemaInterconnexion }))),
  "schema-prospecteur": dynamic(() => import("./SchemaProspecteur").then(m => ({ default: m.SchemaProspecteur }))),
  "schema-filtre-ia": dynamic(() => import("./SchemaFiltreIA").then(m => ({ default: m.SchemaFiltreIA }))),
  "schema-contenu": dynamic(() => import("./SchemaContenu").then(m => ({ default: m.SchemaContenu }))),
  "schema-seo": dynamic(() => import("./SchemaSEO").then(m => ({ default: m.SchemaSEO }))),
  "schema-formation": dynamic(() => import("./SchemaFormation").then(m => ({ default: m.SchemaFormation }))),
  "schema-audit": dynamic(() => import("./SchemaAudit").then(m => ({ default: m.SchemaAudit }))),
};

export function SchemaRenderer({ schemaId, labels, animate = true }: SchemaRendererProps) {
  const Schema = schemas[schemaId];

  if (!Schema) {
    return (
      <div className="text-center text-text-muted text-sm py-8">
        Schéma non disponible
      </div>
    );
  }

  return <Schema labels={labels} animate={animate} />;
}
