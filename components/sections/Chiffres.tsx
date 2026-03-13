import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Counter } from "../ui/Counter";

const metrics = [
  { numeric: 80, prefix: "-", suffix: "%", label: "De temps passé sur les tâches répétitives" },
  { numeric: 3, prefix: "+", suffix: "×", label: "De conversion sur les leads qualifiés" },
  { numeric: 10, prefix: "", suffix: " Jours", label: "En moyenne pour déployer notre Sprint IA" },
  { numeric: 100, prefix: "", suffix: "%", label: "D'infrastructures sécurisées et sur-mesure" },
];

export function Chiffres() {
  return (
    <Section className="bg-bg py-20 border-y border-border">
      <Container>
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
