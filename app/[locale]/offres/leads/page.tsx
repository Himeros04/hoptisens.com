import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/routing";
import { Radar, Filter, Share2 } from "lucide-react";

export default function LeadsPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      <Section className="mb-20">
        <Container className="text-center">
          <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6 max-w-4xl mx-auto">
              Alimentez votre circuit de prospection, <span className="italic text-accent">automatiquement</span>.
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Nous construisons des systèmes de prospection sur-mesure combinant
              scraping éthique, qualification IA et outreach multi-canal.
            </p>
            <Button size="lg">
              <Link href="/contact">Me générer des prospects</Link>
            </Button>
          </FadeInUp>
        </Container>
      </Section>

      <Section className="bg-surface py-24">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <FadeInUp delay={0.1}>
              <Card className="p-8 h-full hover:-translate-y-2 transition-transform">
                <Radar className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-serif mb-4">Prospecteur Augmenté</h3>
                <p className="text-text-secondary">
                  Surveillance en temps réel du web, LinkedIn et bases de données publiques 
                  pour identifier vos cibles dès l'apparition d'un signal d'affaire.
                </p>
              </Card>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <Card className="p-8 h-full hover:-translate-y-2 transition-transform">
                <Filter className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-serif mb-4">Filtre IA</h3>
                <p className="text-text-secondary">
                  Un agent IA analyse chaque prospect pour s'assurer qu'il correspond
                  parfaitement à votre Persona, rejetant les faux positifs automatiquement.
                </p>
              </Card>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <Card className="p-8 h-full hover:-translate-y-2 transition-transform">
                <Share2 className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-serif mb-4">Campagnes Connectées</h3>
                <p className="text-text-secondary">
                  Push automatisé des prospects qualifiés dans votre CRM et déclenchement
                  de séquences emails personnalisées via IA (Icebreakers uniques).
                </p>
              </Card>
            </FadeInUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}
