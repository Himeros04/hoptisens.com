import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Card } from "../ui/Card";

export function Temoignages() {
  return (
    <Section className="bg-bg py-24 border-y border-border">
      <Container>
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary mb-4">
            Ils nous font <span className="italic text-accent">confiance</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Découvrez comment nous avons transformé les opérations de nos clients, 
            avec des résultats concrets à la clé.
          </p>
        </FadeInUp>

        {/* Placeholder Carrousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <FadeInUp key={index} /* dynamic delay will be added later */>
              <Card className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex text-accent mb-6">
                    {/* Stars placeholder */}
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-primary italic mb-6">
                    "Grâce au Sprint Automobilisation de Hoptisens, nous avons réduit
                    nos temps de traitement devis de 3 jours à quelques heures."
                  </p>
                </div>
                <div>
                  <p className="font-bold text-text-primary">Jean Dupont</p>
                  <p className="text-sm text-text-muted">CEO, MonEntreprise SA</p>
                </div>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
