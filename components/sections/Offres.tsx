import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowRight, Brain, Zap, Workflow, Users } from "lucide-react";
import { Link } from "@/lib/routing";

type RouteHref = "/" | "/a-propos" | "/offres" | "/contact";

const offres = [
  {
    title: "Ingénierie d'Acquisition",
    description: "Vos commerciaux perdent un temps précieux sur des prospects froids. Notre 'Prospecteur Augmenté' automatise la collecte et le filtrage des leads. Nous garantissons un CRM alimenté exclusivement en opportunités qualifiées.",
    icon: Users,
    href: "/contact",
    cta: "Auditer mon Acquisition"
  },
  {
    title: "Automatisation & RPA",
    description: "La double-saisie détruit votre rentabilité. De la facturation à l'onboarding client, vos flux s'exécutent en temps réel, sans erreur humaine, réduisant drastiquement vos coûts opérationnels.",
    icon: Workflow,
    href: "/#calculateur",
    cta: "Chiffrer mon Gain de Temps"
  },
  {
    title: "Agents IA Personnalisés",
    description: "Exploitez la richesse de vos données. Nous développons des applications métiers robustes et des assistants virtuels sécurisés pour accélérer la prise de décision de vos équipes.",
    icon: Brain,
    href: "https://calendly.com/hoptisens/hoptisens-call",
    cta: "Prototyper mon Agent IA"
  },
  {
    title: "Sprint POC",
    description: "Un processus en deux étapes pour valider techniquement et financièrement votre transition vers l'IA, sécurisant vos investissements lourds.",
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
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">Notre ingénierie au service de votre rentabilité</h2>
            <p className="text-text-secondary text-lg">
              De l'audit initial au déploiement technique, nous couvrons 
              l'ensemble des besoins de transformation digitale pour les PME.
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
                    {offre.highlight && <Badge variant="accent">Populaire</Badge>}
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
      </Container>
    </Section>
  );
}
