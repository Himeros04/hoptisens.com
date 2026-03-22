import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { SprintSchema } from "../visuals/OfferSchemas";
import { Link } from "@/lib/routing";

export function Sprint() {
  return (
    <Section id="sprint" className="py-24 relative overflow-hidden">
      {/* Background with slight dark accent theme for contrast */}
      <div className="absolute inset-0 bg-text-primary -z-10"></div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInUp className="text-white">
            <div className="inline-flex flex-col items-start gap-1 mb-6">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white">
                Offre de lancement — 490€ <span className="ml-1 opacity-60 line-through text-xs">990€</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Sprint IA
            </h2>
            <p className="text-[var(--color-accent)] font-medium text-lg mb-4">
              10 jours pour déployer un 1er cas d'usage concret.
            </p>
            <ul className="space-y-4 mb-8 text-white/80 max-w-lg">
              <li className="flex items-start gap-3">
                <span className="text-lg">⏱️</span>
                <div><span className="font-semibold text-white">Étape 1 - Le Diagnostic (Offert)</span> : Remplissez notre questionnaire ciblé. Notre IA analyse vos données réelles pour évaluer la faisabilité et calculer les gains potentiels.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🎯</span>
                <div><span className="font-semibold text-white">Étape 2 - Le Sprint Immersif (Preuve de Concept)</span> : En 10 jours ouvrés, nous cartographions vos données en immersion et délivrons une preuve de concept (facturée 990€).</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🛡️</span>
                <div><span className="font-semibold text-white">Garantie Confiance</span> : L'étape 1 filtre les idées irréalisables pour vous faire gagner du temps. L'étape 2 sécurise fonctionnellement et techniquement vos investissements.</div>
              </li>
            </ul>
            <div className="flex items-center gap-4">
               <Link href="/contact" className="inline-block">
                 <Button size="lg" className="bg-accent text-white hover:bg-white hover:text-accent border-none shadow-none">
                   🚀 Lancer mon sprint IA
                 </Button>
               </Link>
               <Link href="/offres/sprint" className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                 En savoir plus <ArrowRight className="w-4 h-4" />
               </Link>
             </div>
          </FadeInUp>
          
           <FadeInUp className="order-first lg:order-last">
             <div className="bg-white rounded-3xl p-6 shadow-lg border border-border/30">
               <SprintSchema />
             </div>
           </FadeInUp>
        </div>
      </Container>
    </Section>
  );
}
