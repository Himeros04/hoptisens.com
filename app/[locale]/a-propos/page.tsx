import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/routing";
import { Target, Compass, Sparkles, Building, Rocket, GraduationCap, Linkedin } from "lucide-react";
import Image from "next/image";

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
                  Lier pragmatisme et innovation. Déployer rapidement des preuves de concept à ROI direct 
                  (Sprint IA) avant de structurer des systèmes globaux complexes.
                </p>
              </Card>
            </FadeInUp>
          </div>
        </Container>
      </Section>

      {/* Section Fondateur */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <div className="flex flex-col md:flex-row items-center gap-12">
                              
                 <div className="flex-shrink-0 mt-[10px]">
                  {/* Remplacer par votre photo : public/hadrien-peyron.jpg + Pour modifier le positionnement de l'image dans le cercle : object-[50%_5%] */}
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-accent/30 bg-surface flex items-center justify-center">
                    <Image
                      src="/hadrien-peyron.png"
                      alt="Hadrien Peyron, fondateur de Hoptisens"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover object-[50%_5%]"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-accent text-sm font-medium uppercase tracking-wider mb-2">Le fondateur</p>
                  <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-2">Hadrien Peyron</h2>
                  <p className="text-text-muted text-sm mb-6">Orchestrateur d'Agents IA · Fondateur Hoptisens · Passionné de musique</p>
                  <p className="text-text-secondary mb-4">
                    Ingénieur reconverti en Business Developer, Hadrien a passé 7 ans à piloter
                    une Business Unit de 60 consultants IT au sein d'un grand groupe de conseil — apprenant sur le terrain comment
                    structurer, vendre et faire grandir une activité de services complexes.
                  </p>
                  <p className="text-text-secondary mb-4">
                    En 2024, il fonde Hoptisens avec une conviction : l'IA doit servir les opérations,
                    pas impressionner les investisseurs. Sa philosophie tient en trois mots : <span className="text-text-primary font-medium">Simplifier pour Amplifier.</span>
                  </p>
                  <p className="text-text-secondary italic mb-8">
                    "Ingénieur dans l'esprit, Business Developer dans la pratique. Je me focalise sur
                    l'identification de problématiques et me plais à imaginer des solutions pour y répondre."
                  </p>
                  <a
                    href="https://www.linkedin.com/in/hadrien-peyron/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    <Linkedin className="w-5 h-5" />
                    Voir le profil LinkedIn
                  </a>
                </div>
              </div>
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
                  Sur la base du plan d'action validé ensemble, nos ingénieurs développent
                  la solution complète : choix des modèles d'IA, conception des flux
                  d'automatisation et création des interfaces si nécessaire.
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
                  <Link href="/contact">Réserver 30 min avec Hadrien</Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}
