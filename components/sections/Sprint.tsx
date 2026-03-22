import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Zap, ArrowRight } from "lucide-react";
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
            <div className="flex gap-4">
               <Link href="/contact" className="inline-block">
                 <Button size="lg" className="bg-accent text-white hover:bg-white hover:text-accent border-none shadow-none">
                   🚀 Lancer mon sprint IA
                 </Button>
               </Link>
             </div>
          </FadeInUp>
          
           <FadeInUp className="order-first lg:order-last">
             <div className="p-8 border border-accent/40 bg-accent-soft/30 rounded-3xl">
               <div className="flex flex-col h-full">
                 <div className="mb-6 flex items-center justify-between">
                   <div className="p-3 rounded-xl inline-flex bg-accent text-white">
                     <Zap className="w-6 h-6" />
                   </div>
                   <Badge variant="accent">Commencez ici</Badge>
                 </div>

                 <h3 className="text-2xl font-serif text-text-primary mb-3">
                   Sprint IA
                 </h3>

                 <p className="text-text-secondary flex-grow mb-6">
                   10 jours pour prouver que ça marche. Diagnostic offert, puis preuve de concept livrée.
                 </p>

<Link href="/offres/sprint" className="inline-flex items-center text-sm font-medium text-text-primary group-hover:text-accent transition-colors mt-auto">
  En savoir plus <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
</Link>
               </div>
             </div>
           </FadeInUp>
        </div>
      </Container>
    </Section>
  );
}
