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
              Le <span className="text-accent italic">Sprint Automobilisation</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Un accompagnement intensif de 10 jours pour analyser vos flux, 
              définir un plan d'action opérationnel et déployer un pipeline 
              test grandeur nature prouvant le ROI de l'IA dans votre entreprise.
            </p>
            <div className="flex gap-4">
              <a href="https://calendly.com/hoptisens/hoptisens-call" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg" className="bg-accent text-white hover:bg-white hover:text-accent border-none shadow-none">
                  Profiter de l'offre
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
