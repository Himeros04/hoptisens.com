import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/routing";
import { Target, Compass, Sparkles, Building, Rocket, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      {/* Hero A Propos */}
      <Section className="mb-24">
        <Container className="text-center">
          <FadeInUp className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
              Notre <span className="italic text-accent">Raison d'être</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-12">
              Démocratiser l'Intelligence Artificielle pour les PME. Nous croyons que 
              l'IA ne doit pas être réservée aux géants de la tech. D'ici 2030, chaque 
              entreprise structurée devrait avoir son propre écosystème d'IA pour décupler sa productivité.
            </p>
          </FadeInUp>
          
          <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
            <FadeInUp delay={0.1}>
              <Card className="h-full p-8 bg-surface border-border hover:border-accent/40 transition-colors">
                <Target className="text-accent w-10 h-10 mb-6" />
                <h3 className="text-xl font-serif mb-4">Notre Vision</h3>
                <p className="text-text-secondary">
                  Créer un monde où l'humain est libéré des tâches répétitives pour 
                  se concentrer sur sa créativité, grâce à une IA éthique et performante.
                </p>
              </Card>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <Card className="h-full p-8 bg-surface border-border hover:border-accent/40 transition-colors">
                <Compass className="text-accent w-10 h-10 mb-6" />
                <h3 className="text-xl font-serif mb-4">Notre Mission</h3>
                <p className="text-text-secondary">
                  Accompagner les dirigeants dans leur transformation en identifiant, 
                  sourçant et intégrant les meilleures solutions d'IA applicables aujourd'hui.
                </p>
              </Card>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <Card className="h-full p-8 bg-surface border-border hover:border-accent/40 transition-colors">
                <Sparkles className="text-accent w-10 h-10 mb-6" />
                <h3 className="text-xl font-serif mb-4">Notre Stratégie</h3>
                <p className="text-text-secondary">
                  Lier pragmatisme et innovation. Déployer rapidement des POC à ROI direct 
                  (Sprint IA) avant de structurer des systèmes globaux complexes.
                </p>
              </Card>
            </FadeInUp>
          </div>
        </Container>
      </Section>

      {/* Timeline A Propos */}
      <Section className="bg-surface py-24">
        <Container>
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">L'Approche <span className="text-accent">Hoptisens</span></h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Une méthodologie éprouvée en 3 grandes étapes, garantissant l'intégration 
              et l'adoption pérenne des nouveaux outils.
            </p>
          </FadeInUp>

          <div className="max-w-4xl mx-auto relative border-l border-border pl-8 ml-4 md:ml-auto md:mr-auto space-y-16">
            <FadeInUp>
              <div className="relative">
                <div className="absolute -left-[50px] bg-bg border-4 border-accent w-6 h-6 rounded-full mt-1.5 ring-4 ring-surface"></div>
                <h3 className="text-2xl font-serif mb-3 flex items-center gap-3"><Building className="w-5 h-5 text-text-muted" /> 1. Diagnostic</h3>
                <p className="text-text-secondary">
                  Nous plongeons dans vos opérations pour cartographier vos processus. 
                  Notre équipe identifie les goulets d'étranglement et évalue les cas 
                  d'usage IA offrant le meilleur compromis faisabilité/ROI.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <div className="relative">
                <div className="absolute -left-[50px] bg-bg border-4 border-accent w-6 h-6 rounded-full mt-1.5 ring-4 ring-surface"></div>
                <h3 className="text-2xl font-serif mb-3 flex items-center gap-3"><Rocket className="w-5 h-5 text-text-muted" /> 2. Construction</h3>
                <p className="text-text-secondary">
                  Sur la base du blueprint validé ensemble, nos ingénieurs développent
                  la solution complète: sourcing des LLMs, conception des workflows
                  d'automatisation (Make/n8n) et création des interfaces si nécessaire.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="relative">
                <div className="absolute -left-[50px] bg-bg border-4 border-accent w-6 h-6 rounded-full mt-1.5 ring-4 ring-surface"></div>
                <h3 className="text-2xl font-serif mb-3 flex items-center gap-3"><GraduationCap className="w-5 h-5 text-text-muted" /> 3. Transfert & Formation</h3>
                <p className="text-text-secondary mb-8">
                  Une solution technique est inutile sans adoption. Nous formons vos
                  équipes opérationnelles pour qu'elles maîtrisent leur nouvel outil,
                  et documentons le système pour garantir son évolutivité.
                </p>
                <Button>
                  <Link href="/contact">Parler à un expert</Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}
