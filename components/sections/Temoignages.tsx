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
            Études de <span className="italic text-accent">cas</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Résultats constatés sur des accompagnements récents.
          </p>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "PME Services B2B",
              context: "25 collaborateurs",
              action: "Mise en place d'un assistant IA pour qualifier les prospects",
              result: "Réduction de 70% du temps de qualification et de suivi, augmentation du taux de conversion."

            },
            {
              title: "TPE Organisation d'évènements",
              context: "6 collaborateurs",
              action: "Déploiement d'un CRM semi-automatisé via Telegram",
              result: "Interface centralisée (telegram) pour gérer un CRM synchronisé avec différents outils de suivi (Notion, Excel, Drive, Dashboard de pilotage). 30% de temps gagné au niveau de la saisie et de l'accès aux informations"
            },
            {
              title: "Société de conseil IT - ESN",
              context: "60 collaborateurs",
              action: "Déploiement d'un systeme de matching inteligent entre les Besoins et les Candidats.",
              result: "Interface centralisée pour consulter instantannément le vivier de candidat pertinent vis à vis du besoin client. Outil devenu indispensable pour l'efficience des équipes commerciales et de recrutement."
            }
          ].map((item, index) => (
            <FadeInUp key={index}>
              <Card className="p-8 h-full flex flex-col justify-between border-accent/20 bg-surface/50">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-xs font-mono uppercase tracking-wider text-accent">{item.title}</span>
                  </div>
                  <p className="text-sm text-text-muted mb-4">{item.context}</p>
                  <p className="text-text-primary font-medium mb-4">
                    {item.action}
                  </p>
                  <p className="text-text-secondary italic text-sm border-l-2 border-accent/30 pl-4 py-1">
                    "{item.result}"
                  </p>
                </div>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
