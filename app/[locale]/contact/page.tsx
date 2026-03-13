import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Mail, ArrowRight } from "lucide-react";
import { ContactChat } from "@/components/agent/ContactChat";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      <Section className="mb-12">
        <Container className="text-center max-w-3xl">
          <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
              Parlons de votre <span className="italic text-accent">avenir</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10">
              Démarrez une conversation avec notre Agent IA pour pré-qualifier 
              votre besoin, ou contactez-nous directement.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Colonne Chat Agent Placeholder (3 cols) */}
            <div className="lg:col-span-3">
              <FadeInUp delay={0.1}>
                <Card className="p-0 overflow-hidden h-[600px] flex flex-col border border-border bg-surface">
                  <ContactChat />
                </Card>
              </FadeInUp>
            </div>

            {/* Colonne Fallback Info (2 cols) */}
            <div className="lg:col-span-2">
              <FadeInUp delay={0.2} className="h-full">
                <Card className="p-8 h-full bg-bg border-none">
                  <h3 className="text-2xl font-serif mb-6 border-b border-border pb-4">Coordonnées Directes</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm text-text-muted font-mono mb-2">EMAIL</p>
                      <a href="mailto:contact@hoptisens.com" className="group flex items-center text-lg font-medium text-text-primary hover:text-accent transition-colors">
                        <Mail className="w-5 h-5 mr-3 text-text-muted group-hover:text-accent transition-colors" />
                        contact@hoptisens.com
                      </a>
                    </div>
                    
                    <div>
                      <p className="text-sm text-text-muted font-mono mb-2">RÉSEAUX</p>
                      <a href="https://linkedin.com/company/hoptisens" target="_blank" rel="noopener noreferrer" className="group flex items-center text-lg font-medium text-text-primary hover:text-accent transition-colors">
                        <ArrowRight className="w-5 h-5 mr-3 text-text-muted group-hover:text-accent transition-colors" />
                        Suivez-nous sur LinkedIn
                      </a>
                    </div>

                    <div className="pt-8 mt-8 border-t border-border">
                      <p className="text-text-secondary text-sm italic">
                        Notre équipe vous répond généralement sous 24 à 48 heures ouvrées 
                        pour planifier un premier appel de découverte de 30 minutes.
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeInUp>
            </div>

          </div>
        </Container>
      </Section>
    </main>
  );
}
