import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowRight, Brain, Zap, Workflow, Users, GraduationCap } from "lucide-react";
import { Link } from "@/lib/routing";

type RouteHref = "/" | "/a-propos" | "/offres" | "/contact";

const offres = [
  {
    title: "Acquisition & Leads",
    description: "Vos commerciaux passent plus de temps à chercher des prospects qu'à closer. On automatise tout jusqu'au CRM.",
    icon: Users,
    href: "/contact",
    cta: "Auditer mon Acquisition"
  },
  {
    title: "Automatisation & RPA",
    description: "La double-saisie détruit votre rentabilité. Vos flux s'exécutent en temps réel, sans erreur humaine.",
    icon: Workflow,
    href: "/#calculateur",
    cta: "Chiffrer mon Gain de Temps"
  },
  {
    title: "Agents IA",
    description: "Un assistant virtuel entraîné sur vos données, disponible 24/7 pour vos clients ou vos équipes.",
    icon: Brain,
    href: "https://calendly.com/hoptisens/hoptisens-call",
    cta: "Prototyper mon Agent IA"
  },
  {
    title: "Sprint IA",
    description: "10 jours pour prouver que ça marche. Diagnostic offert, puis preuve de concept livrée.",
    icon: Zap,
    href: "/contact",
    cta: "Commencer mon Diagnostic",
    highlight: true
  }
];

export function Offres() {
  return (
    <Section className="bg-surface py-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <FadeInUp className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">Nos solutions pour votre croissance</h2>
            <p className="text-text-secondary text-lg">
              De l'acquisition de clients à l'automatisation de vos process,
              chaque offre répond à un besoin concret de votre PME.
            </p>
          </FadeInUp>
          <FadeInUp className="mt-6 md:mt-0">
            <Link href="/offres" className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors">
              Voir tout notre catalogue <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offres.map((offre, index) => {
            const isExternal = offre.href.startsWith("http");
            const cardContent = (
              <Card className={`h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${offre.highlight ? 'border-accent/40 bg-accent-soft/30' : ''}`}>
                <div className="flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div className={`p-3 rounded-xl inline-flex ${offre.highlight ? 'bg-accent text-white' : 'bg-surface-hover text-text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300'}`}>
                      <offre.icon className="w-6 h-6" />
                    </div>
                    {offre.highlight && <Badge variant="accent">Commencez ici</Badge>}
                  </div>

                  <h3 className="text-2xl font-serif text-text-primary mb-3">
                    {offre.title}
                  </h3>

                  <p className="text-text-secondary flex-grow mb-6">
                    {offre.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-text-primary group-hover:text-accent transition-colors mt-auto">
                    {offre.cta || "Découvrir"} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            );

            return (
              <FadeInUp key={index}>
                {isExternal ? (
                  <a href={offre.href} target="_blank" rel="noopener noreferrer" className="block group h-full">
                    {cardContent}
                  </a>
                ) : (
                  <Link href={offre.href as RouteHref} className="block group h-full">
                    {cardContent}
                  </Link>
                )}
              </FadeInUp>
            );
          })}
        </div>

        {/* Teaser Workshop */}
        <FadeInUp className="mt-6">
          <Link href="/offres" className="group block">
            <div className="border border-border rounded-2xl px-6 py-4 flex items-center justify-between bg-surface-hover/20 hover:border-accent/40 hover:bg-accent-soft/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-surface-hover group-hover:bg-accent/10 transition-colors">
                  <GraduationCap className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="font-medium text-text-primary text-sm">Workshops & Ateliers IA</p>
                  <p className="text-text-secondary text-xs">Formez vos équipes en conditions réelles — demi-journée ou journée complète</p>
                </div>
              </div>
              <span className="text-sm text-accent font-medium flex items-center gap-1 shrink-0 ml-4">
                En savoir plus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </FadeInUp>
      </Container>
    </Section>
  );
}
