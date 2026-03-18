"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Card } from "@/components/ui/Card";
import { Mail, X, FileText, MessageCircle, Video } from "lucide-react";
import { ContactChat } from "@/components/agent/ContactChat";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">

      {/* Chat modal overlay */}
      {showChat && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowChat(false); }}
        >
          <div className="w-full max-w-lg h-[600px] bg-bg rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden relative">
            <button
              onClick={() => setShowChat(false)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-surface transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
            <ContactChat />
          </div>
        </div>
      )}

      <Section className="mb-12">
        <Container className="text-center max-w-3xl">
          <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary mb-6">
              Démarrez votre <span className="italic text-accent">projet IA</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Remplissez le formulaire ci-dessous et nous analysons votre besoin sous 24h.
            </p>

            {/* CTA trio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              <a
                href="#contact-form"
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-accent-soft/10 transition-all text-sm text-text-secondary hover:text-text-primary"
              >
                <FileText className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-center">Vous savez ce que vous voulez ?</span>
                <strong className="text-text-primary">Formulaire</strong>
              </a>

              <button
                onClick={() => setShowChat(true)}
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-accent-soft/10 transition-all text-sm text-text-secondary hover:text-text-primary cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-center">Vous explorez encore ?</span>
                <strong className="text-text-primary">Discutez avec Lucio</strong>
              </button>

              <a
                href="https://calendly.com/hoptisens/hoptisens-call"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 px-4 py-4 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-accent-soft/10 transition-all text-sm text-text-secondary hover:text-text-primary"
              >
                <Video className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-center">Vous préférez une visio ?</span>
                <strong className="text-text-primary">Réservez un créneau</strong>
              </a>
            </div>
          </FadeInUp>
        </Container>
      </Section>

      <Section id="contact-form" className="scroll-mt-32">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Colonne Formulaire (3 cols) */}
            <div className="lg:col-span-3">
              <FadeInUp delay={0.1}>
                <ContactForm />
              </FadeInUp>
            </div>

            {/* Colonne Coordonnées (2 cols) */}
            <div className="lg:col-span-2">
              <FadeInUp delay={0.2} className="h-full">
                <Card className="p-8 h-full bg-bg border-none">
                  <h3 className="text-2xl font-serif mb-6 border-b border-border pb-4">Coordonnées Directes</h3>

                  <div className="space-y-8">
                    <div>
                      <p className="text-sm text-text-muted font-mono mb-2">EMAIL</p>
                      <a
                        href="mailto:hello@hoptisens.com"
                        className="group flex items-center text-lg font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-3 text-text-muted group-hover:text-accent transition-colors" />
                        hello@hoptisens.com
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-text-muted font-mono mb-2">RÉSEAUX</p>
                      <a
                        href="https://www.linkedin.com/in/hadrien-peyron/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-lg font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        <svg className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                        Hadrien PEYRON
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
