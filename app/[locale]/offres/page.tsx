"use client";

import { useState, useRef, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/routing";
import { Brain, Zap, Workflow, Users, CheckCircle2, GraduationCap, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { motion, AnimatePresence } from "framer-motion";
import { LeadsSchema, AutomatisationSchema, AgentsSchema, SprintSchema, WorkshopSchema } from "@/components/visuals/OfferSchemas";

const offers = [
{
    id: "leads",
    title: "Acquisition et Prospect",
    shortTitle: "Acquisition et Prospect",
    icon: Users,
    description: "Ne perdez plus de temps à chercher des prospects. Nos systèmes scrutent le web et qualifient automatiquement les entreprises qui correspondent à votre client idéal.",
    bullets: ["Filtre d'intention d'achat", "Qualification automatique par Agent IA", "Synchro automatique avec votre CRM"],
    cta: "Auditer mon Acquisition",
    href: "/offres/leads",
    illustration: LeadsSchema
},
  {
    id: "automatisation",
    title: "Automatisation & RPA",
    shortTitle: "Automatisation & RPA",
    icon: Workflow,
    description: "Libérez vos équipes des tâches répétitives à faible valeur ajoutée. Nous connectons vos outils pour créer des flux de travail sans couture.",
    bullets: ["Synchronisation de données multi-sources", "Traitement automatique de documents", "Relances et suivis automatiques"],
    cta: "Chiffrer mon Gain de Temps",
    href: "/contact",
    illustration: AutomatisationSchema
  },
  {
    id: "agents",
    title: "Agents IA",
    shortTitle: "Agents IA",
    icon: Brain,
    description: "Des agents conversationnels entraînés sur vos données internes pour dialoguer avec vos clients 24/7 ou assister vos collaborateurs.",
    bullets: ["Support client multilingue autonome", "Prise de rendez-vous et qualification", "Assistant interne pour vos équipes"],
    cta: "Prototyper mon Agent IA",
    href: "https://calendly.com/hoptisens/hoptisens-call",
    isExternal: true,
    illustration: AgentsSchema
  },
{
    id: "sprint",
    title: "Sprint IA",
    shortTitle: "Sprint IA",
    icon: Zap,
    description: "10 jours pour prouver que ça marche. Diagnostic offert, puis preuve de concept livrée — votre investissement est sécurisé.",
    bullets: ["Diagnostic basé sur vos données réelles (offert)", "Sprint immersif (preuve de concept)", "Garantie anti-risque"],
    cta: "🚀 Lancer mon Sprint IA",
    href: "/offres/sprint",
    illustration: SprintSchema
},
  {
    id: "workshops",
    title: "Workshops & Ateliers",
    shortTitle: "Workshops",
    icon: GraduationCap,
    description: "D'une demi-journée à trois jours, nos experts animent vos équipes Direction, Technique et Métier pour identifier vos cas d'usage IA, prototyper en conditions réelles et repartir avec un Proof of Concept déployable.",
    bullets: ["Identification et priorisation de vos cas d'usage IA", "Proof of Concept construit en atelier avec vos équipes", "Plan d'adoption déployable en 60 jours"],
    cta: "Organiser un Workshop",
    href: "/contact",
    illustration: WorkshopSchema
  }
];

export default function OffresPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && offers.some((o) => o.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (sliderRef.current) {
      sliderRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

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

      {/* Navigation Slider */}
      <nav className="sticky top-20 z-40 bg-bg/80 backdrop-blur-md border-b border-border mb-16 py-4 overflow-x-auto no-scrollbar">
        <Container>
          <ul className="flex space-x-8 text-sm font-medium min-w-max">
            {offers.map((offer) => (
              <li key={offer.id}>
                <button 
                  onClick={() => handleTabChange(offer.id)}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition-all cursor-pointer ${
                    activeTab === offer.id 
                      ? "border-accent text-accent font-bold" 
                      : "border-transparent text-text-secondary hover:text-accent"
                  }`}
                >
                  <offer.icon className="w-4 h-4" />
                  {offer.shortTitle}
                </button>
              </li>
            ))}
            <li>
              <a href="#contact-form" className="text-accent font-bold whitespace-nowrap flex items-center gap-1.5 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                Nous Contacter
              </a>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Content Slider */}
      <div className="relative overflow-hidden mb-32" ref={sliderRef}>
        <Container>
          <AnimatePresence mode="wait">
            {offers.map((offer) => (
              activeTab === offer.id && (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Section className="py-0">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className={`${offer.id === 'automatisation' || offer.id === 'sprint' ? 'md:order-last' : ''}`}>
                        <div className="flex items-center gap-3 mb-6">
                          <offer.icon className="text-accent w-8 h-8" />
                          <h2 className="text-3xl font-serif text-text-primary">{offer.title}</h2>
                        </div>
                        <p className="text-text-secondary mb-6 text-lg">
                          {offer.description}
                        </p>
                        <ul className="space-y-3 mb-8">
                          {offer.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-text-secondary">
                              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                         {offer.isExternal ? (
                           <a href={offer.href} target="_blank" rel="noopener noreferrer" className="inline-block">
                             <Button size="lg" className="bg-accent text-white hover:bg-white hover:text-accent border-none shadow-none">
                               {offer.cta}
                             </Button>
                           </a>
                         ) : (
                           <Link href={offer.href as any} className="inline-block">
                             <Button size="lg" className="bg-accent text-white hover:bg-white hover:text-accent border-none shadow-none">
                               {offer.cta}
                             </Button>
                           </Link>
                         )}
                         {/* Additional "En savoir plus" link for specific offers */}
                         {!offer.isExternal && (offer.id === "sprint" || offer.id === "leads") && (
                           <Link href={offer.id === "sprint" ? "/offres/sprint" : "/offres/leads"} className="ml-4 inline-flex items-center text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                             En savoir plus <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                           </Link>
                         )}
                      </div>
                      <div className="bg-surface rounded-3xl border border-border flex items-center justify-center aspect-video shadow-xl overflow-hidden">
                        <offer.illustration />
                      </div>
                    </div>
                  </Section>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </Container>
      </div>

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
    </main>
  );
}
