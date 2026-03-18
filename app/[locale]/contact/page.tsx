import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Mail, ArrowRight } from "lucide-react";
import { ContactChat } from "@/components/agent/ContactChat";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      <Section className="mb-12">
        <Container className="text-center max-w-3xl">
          <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
              Démarrez votre <span className="italic text-accent">projet IA</span>
            </h1>
            <p className="text-xl text-text-secondary mb-4">
              Remplissez le formulaire ci-dessous et nous analysons votre besoin sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-text-muted mb-10">
              <span>📝 Vous savez ce que vous voulez ? → <strong className="text-text-primary">Formulaire</strong></span>
              <span>💬 Vous explorez encore ? → <strong className="text-text-primary">Discutez avec Lucio</strong></span>
              <span>📞 Vous préférez le téléphone ? → <strong className="text-text-primary">Réservez un créneau</strong></span>
            </div>
          </FadeInUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Colonne Formulaire (3 cols) */}
            <div className="lg:col-span-3">
              <FadeInUp delay={0.1}>
                <div>
                  <ContactForm />
                </div>
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
                      <a href="https://www.linkedin.com/in/hadrien-peyron/" target="_blank" rel="noopener noreferrer" className="group flex items-center text-lg font-medium text-text-primary hover:text-accent transition-colors cursor-pointer">
                        <ArrowRight className="w-5 h-5 mr-3 text-text-muted group-hover:text-accent transition-colors" />
                        Hadrien Peyron sur LinkedIn
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
