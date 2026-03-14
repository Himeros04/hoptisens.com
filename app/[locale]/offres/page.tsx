import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/routing";
import { ArrowRight, Brain, Zap, Workflow, Users, CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export default function OffresPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      {/* Hero Offres */}
      <Section className="mb-16">
        <Container>
          <FadeInUp className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
              Nos Solutions pour <span className="italic text-accent">l'Ere de l'IA</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              De l'automatisation de vos tâches chronophages à la mise en place d'agents
              conversationnels avancés, explorez nos domaines d'expertise pour transformer
              votre activité.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Détail par catégorie */}
      <nav className="sticky top-20 z-40 bg-bg/80 backdrop-blur-md border-b border-border mb-16 py-4 overflow-x-auto no-scrollbar">
        <Container>
          <ul className="flex space-x-8 text-sm font-medium min-w-max">
            <li><a href="#leads" className="text-text-secondary hover:text-accent whitespace-nowrap">Leads & CRM</a></li>
            <li><a href="#automatisation" className="text-text-secondary hover:text-accent whitespace-nowrap">Automatisation</a></li>
            <li><a href="#agents" className="text-text-secondary hover:text-accent whitespace-nowrap">Agents IA</a></li>
            <li><a href="#sprint" className="text-text-secondary hover:text-accent whitespace-nowrap">Sprint Automobilisation</a></li>
            <li>
              <a href="#contact-form" className="text-accent font-bold whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                Nous Contacter
              </a>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Sections détaillées */}
      <Container className="space-y-32">
        
        {/* Sprint */}
        <Section id="sprint" className="scroll-mt-32">
          <FadeInUp>
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-accent w-8 h-8" />
              <h2 className="text-3xl font-serif text-text-primary">Sprint Automobilisation</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-text-secondary mb-6 text-lg">
                  Notre offre phare. En 10 jours chrono, nous analysons vos processus,
                  identifions les cas d'usage IA les plus rentables, et déployons un POC
                  fonctionnel dans votre environnement.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Audit flash de vos opérations', 'Maquettage solution', 'Déploiement POC', 'Formation d\'une demi-journée'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="p-0 border-none hover:bg-transparent">
                  <Link href="/offres/sprint" className="inline-flex items-center justify-center rounded-xl font-medium transition-all h-11 px-6 text-base bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">
                    Découvrir le Sprint
                  </Link>
                </Button>
              </div>
              <div className="bg-surface rounded-3xl p-8 border border-border flex items-center justify-center aspect-video">
                <span className="text-text-muted italic">Illustration Process Sprint</span>
              </div>
            </div>
          </FadeInUp>
        </Section>

        {/* Leads */}
        <Section id="leads" className="scroll-mt-32">
          <FadeInUp>
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-accent w-8 h-8" />
              <h2 className="text-3xl font-serif text-text-primary">Génération de Leads & CRM</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-last md:order-first bg-surface rounded-3xl p-8 border border-border flex items-center justify-center aspect-video">
                <span className="text-text-muted italic">Dashboard Leads</span>
              </div>
              <div>
                <p className="text-text-secondary mb-6 text-lg">
                  Ne perdez plus de temps à chercher des prospects. Nos systèmes scrutent le web
                  et qualifient automatiquement les entreprises correspondant à votre profil idéal (ICP).
                </p>
                <Button variant="secondary" className="p-0 border-none hover:bg-transparent">
                  <Link href="/offres/leads" className="inline-flex items-center justify-center rounded-xl font-medium transition-all h-11 px-6 text-base bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">
                    Voir la génération de Leads
                  </Link>
                </Button>
              </div>
            </div>
          </FadeInUp>
        </Section>

        {/* Formulaire de Contact Direct */}
        <Section id="contact-form" className="scroll-mt-32 py-12">
          <div className="max-w-3xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-text-primary mb-3">Parlez-nous de votre projet</h2>
                <p className="text-text-secondary text-sm">
                  Remplissez le formulaire ci-dessous. Nous analysons votre besoin sous 24h.
                </p>
              </div>
              <ContactForm />
            </FadeInUp>
          </div>
        </Section>

      </Container>
    </main>
  );
}
