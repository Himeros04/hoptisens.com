import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Button } from "../ui/Button";
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
              <div className="text-[var(--color-accent)] text-xs font-medium ml-1">
                ⚠️ Valable pour les 7 prochains clients
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Le Sprint "Processus Performants" — 490€ HT
            </h2>
            <p className="text-[var(--color-accent)] font-medium text-lg mb-4">
              On ne vous propose pas un service, on initie votre transformation.
            </p>
            <ul className="space-y-4 mb-8 text-white/80 max-w-lg">
              <li className="flex items-start gap-3">
                <span className="text-lg">🕒</span>
                <div><span className="font-semibold text-white">10 jours ouvrés</span> chronomètre : Nous ciblons les 2 processus de votre entreprise où l'optimisation aura un ROI rapide.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📄</span>
                <div><span className="font-semibold text-white">Livrable actionnable</span> : Une synthèse claire du problème, 2 fiches détaillées avec le plan d'action, les outils préconisés et un devis d'implémentation.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🛡️</span>
                <div><span className="font-semibold text-white">Garantie Zéro Risque</span> ($100M Offer) : Le montant du sprint se transforme intégralement en avoir, déductible du coût de l'implémentation si vous continuez avec nous.</div>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="https://calendly.com/hoptisens/hoptisens-call" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg" className="bg-accent text-white hover:bg-white hover:text-accent border-none shadow-none">
                  🚀 Réserver mon Sprint maintenant
                </Button>
              </a>
            </div>
          </FadeInUp>
          
          <FadeInUp className="order-first lg:order-last">
            {/* Graphique abstrait ou placeholder */}
            <div className="aspect-square relative flex items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 to-transparent"></div>
              <div className="relative text-center">
                <div className="text-6xl font-serif text-white mb-4">10</div>
                <div className="text-white/70 uppercase tracking-widest text-sm">Jours pour tout changer</div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </Container>
    </Section>
  );
}
