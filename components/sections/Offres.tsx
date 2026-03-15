import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowRight, Brain, Zap, Workflow, Users } from "lucide-react";
import { Link } from "@/lib/routing";

const offres = [
  {
    title: "Prospection & Inbound Augmentés",
    description: "Protégez le temps de vos commerciaux. Notre \"Prospecteur Augmenté\" scrape, qualifie par l'IA et rédige des approches ultra-personnalisées. En Inbound, notre Filtre IA ne fait remonter dans votre CRM que les leads chauds.",
    icon: Users,
    href: "/offres/leads"
  },
  {
    title: "Automatisation & CRM sur-mesure",
    description: "La construction et l'assemblage de vos outils. Nous concevons des agents IA, interconnectons vos logiciels existants et développons des CRM semi-automatisés pour éradiquer les tâches chronophages.",
    icon: Workflow,
    href: "/offres"
  },
  {
    title: "Audits, Stratégie & Transfert de Compétences",
    description: "L'analyse de l'existant pour concevoir une architecture solide avant les travaux. Nous formons ensuite vos équipes via des ateliers pratiques et concevons des agents formateurs internes pour l'onboarding.",
    icon: Brain,
    href: "/offres"
  },
  {
    title: "Sprint \"Processus Performants\"",
    description: "Ne devinez plus où intégrer l'IA. En 10 jours ouvrés, obtenez un plan d'action chiffré sur vos 2 processus les plus rentables à optimiser.",
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
