import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Counter } from "../ui/Counter";

const metrics = [
  { numeric: 80, prefix: "", suffix: "%", label: "De temps de prospection manuel économisé grâce à nos systèmes de données pré-qualifiées." },
  { numeric: 10, prefix: "", suffix: " Jours", label: "Le temps exact pour cibler 2 processus clés et chiffrer votre ROI lors de notre Sprint." },
  { numeric: 100, prefix: "", suffix: "%", label: "De l'audit initial déductible de votre phase d'implémentation." },
  { numeric: 24, prefix: "", suffix: "/7", label: "De qualification de leads grâce à nos agents IA conversationnels." },
];

export function Chiffres() {
  return (
    <Section className="bg-bg py-20 border-y border-border">
      <Container>
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-text-primary)] mb-4">
            Votre nouvelle architecture de croissance
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Nous installons les bases d’une architecture d’entreprise flexible, orientée IA et responsable pour que vous puissiez anticiper ce changement plutôt que de le subir.
          </p>
        </FadeInUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border">
          {metrics.map((metric, index) => (
            <FadeInUp key={index} delay={index * 0.1} className="text-center px-4">
              <div className="text-4xl md:text-5xl font-serif text-[var(--color-accent)] mb-2">
                <Counter value={metric.numeric} prefix={metric.prefix} suffix={metric.suffix} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-[150px] mx-auto">
                {metric.label}
              </p>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
