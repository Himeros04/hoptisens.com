import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowRight, Brain, Zap, Workflow, Users } from "lucide-react";
import { Link } from "@/lib/routing";

const offres = [
  {
    title: "Leads Qualifiés & CRM",
    description: "Système automatisé de prospection, captant les signaux d'intérêt pour alimenter vos commerciaux en rdv chauds.",
    icon: Users,
    href: "/offres/leads"
  },
  {
    title: "Automatisation Processus",
    description: "Connectez vos outils et supprimez la double-saisie. De la facture à l'onboarding, tout s'exécute seul.",
    icon: Workflow,
    href: "/offres"
  },
  {
    title: "Agents IA Personnalisés",
    description: "Développez des assistants experts sur votre base de connaissance pour le support client ou aide à la décision.",
    icon: Brain,
    href: "/offres"
  },
  {
    title: "Sprint Automobilisation",
    description: "En 10 jours, nous identifions, construisons et déployons votre première grande victoire IA.",
    icon: Zap,
    href: "/offres/sprint",
    highlight: true
  }
];

export function Offres() {
  return (
    <Section className="bg-surface py-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <FadeInUp className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">Nos Domaines d'Intervention</h2>
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
          {offres.map((offre, index) => (
            <FadeInUp key={index}>
              <Link href={offre.href as any} className="block group">
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
                      Découvrir <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
