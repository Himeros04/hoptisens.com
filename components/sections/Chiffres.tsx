import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { FadeInUp } from "../ui/FadeInUp";
import { Counter } from "../ui/Counter";
import { ArrowRight } from "lucide-react";

const metrics = [
  { numeric: 30, prefix: "> ", suffix: "%", label: "de tâches répétitives en moins" },
  { numeric: 30, prefix: "", suffix: " Jours", label: "pour un premier ROI chiffré" },
  { numeric: 100, prefix: "", suffix: "%", label: "de l'audit déductible de la mission" },
  { numeric: 24, prefix: "", suffix: "/7", label: " qualification de prospect entrant" },
];

export function Chiffres() {
  return (
    <Section className="bg-bg py-20 border-y border-border">
      <Container>
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-text-primary)] mb-4">
            Ce que nos clients mesurent déjà
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Moyennes constatées sur nos derniers accompagnements TPE/PME.
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
        <FadeInUp className="text-center mt-12">
          <a
            href="#calculateur"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-5 py-2.5 rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200"
          >
            Calculez ce que vous économiseriez
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </FadeInUp>
      </Container>
    </Section>
  );
}
