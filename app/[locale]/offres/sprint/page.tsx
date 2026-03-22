import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/routing";
import { CheckCircle2, Clock, Map, Target, ArrowRight } from "lucide-react";

export default function SprintPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      <Section className="mb-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInUp>
              <div className="flex flex-col items-start gap-2 mb-6">
                <Badge variant="accent">Offre de lancement</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
                Le <span className="italic text-accent">Sprint</span> IA
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                10 jours pour prouver que ça marche. Un investissement minimal
                pour un premier ROI chiffré.
              </p>
              <div className="flex gap-4">
                <a href="https://calendly.com/hoptisens/hoptisens-call" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button size="lg">
                    Profiter de l'offre
                  </Button>
                </a>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2} className="relative">
              <div className="text-[var(--color-accent)] text-sm font-medium mb-3 text-center bg-accent/5 py-1.5 rounded-xl border border-accent/10">
                Tarif garanti — Offre de lancement
              </div>
              <div className="aspect-square bg-accent/5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl w-[120%] h-[120%] -z-10"></div>
              <Card className="p-8 border-accent/20">
                <h3 className="text-2xl font-serif mb-4 flex justify-between items-center">
                  <span>Tarif de lancement</span>
                  <div className="text-right">
                    <span className="text-accent font-bold text-2xl">490€ <span className="text-sm text-text-muted font-normal">HT</span></span>
                    <div className="text-text-muted text-xs line-through">990€ HT</div>
                  </div>
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-accent w-5 h-5 shrink-0" /> <span className="text-text-secondary">Note de synthèse détaillée</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-accent w-5 h-5 shrink-0" /> <span className="text-text-secondary">Fiches "cas d'usage" prioritaires</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-accent w-5 h-5 shrink-0" /> <span className="text-text-secondary">Devis de mise en œuvre technique</span></li>
                </ul>
                <div className="bg-surface-hover p-4 rounded-xl text-sm text-text-secondary italic">
                  *Ce montant est intégralement déductible si vous décidez de nous confier la réalisation technique par la suite.
                </div>
              </Card>
            </FadeInUp>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface py-24">
        <Container>
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-6">La Timeline du Sprint</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">10 jours découpés en 3 phases intenses pour maximiser la valeur sans mobiliser excessivement vos équipes.</p>
          </FadeInUp>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeInUp delay={0.1}>
              <Card className="p-8 h-full">
                <Map className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-bold mb-2">Jours 1-2 : Immersion</h3>
                <p className="text-text-secondary">Ateliers d'analyse de vos process actuels et cartographie de vos flux de données.</p>
              </Card>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <Card className="p-8 h-full">
                <Target className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-bold mb-2">Jours 3-8 : Conception</h3>
                <p className="text-text-secondary">Nos experts conçoivent l'architecture de la solution et développent un premier prototype fonctionnel.</p>
              </Card>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <Card className="p-8 h-full">
                <Clock className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-bold mb-2">Jours 9-10 : Restitution</h3>
                <p className="text-text-secondary">Présentation du prototype, tests avec vos équipes et livraison de la feuille de route.</p>
              </Card>
            </FadeInUp>
          </div>
        </Container>
       </Section>
       
       {/* Back to offers link */}
       <Section className="mb-20">
         <Container>
           <FadeInUp className="text-center">
             <Link href="/offres" className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors">
               Retour à toutes les offres <ArrowRight className="ml-2 w-4 h-4" />
             </Link>
           </FadeInUp>
         </Container>
       </Section>
     </main>
   );
 }
