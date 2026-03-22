import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      <Section className="mb-16">
        <Container>
          <FadeInUp className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">
              Politique de <span className="italic text-accent">confidentialité</span>
            </h1>
            <p className="text-text-muted text-sm">
              En vigueur au 22 mars 2026
            </p>
          </FadeInUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Introduction */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Introduction
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Himeros Conseil, agissant sous la marque commerciale <strong className="text-text-primary">Hoptisens</strong>,
                    accorde une importance particulière à la protection de vos données personnelles.
                    La présente politique de confidentialité vous informe de la manière dont nous
                    collectons, utilisons et protégeons vos données lorsque vous utilisez le site
                    hoptisens.com.
                  </p>
                  <p>
                    Cette politique est conforme au Règlement Général sur la Protection des Données
                    (RGPD — UE 2016/679) et à la loi française Informatique et Libertés du
                    6 janvier 1978 modifiée.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Responsable du traitement */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Responsable du traitement
                </h2>
                <div className="text-text-secondary space-y-2">
                  <p><strong className="text-text-primary">Himeros Conseil</strong></p>
                  <p>36 rue Victor Hugo, 64100 Bayonne, France</p>
                  <p>Responsable : M. Hadrien Peyron</p>
                  <p>Contact dédié : hello@hoptisens.com</p>
                </div>
              </div>
            </FadeInUp>

            {/* Données collectées */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Données personnelles collectées
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Nous collectons uniquement les données strictement nécessaires à nos finalités
                    de traitement :
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        a) Formulaire de contact
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Nom et prénom</li>
                        <li>Adresse e-mail</li>
                        <li>Nom de l&apos;entreprise</li>
                        <li>Contenu du message</li>
                      </ul>
                      <p className="mt-2 italic text-text-muted text-sm">
                        Base légale : consentement explicite (article 6.1.a du RGPD).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        b) Auto-diagnostic IA
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Rôle professionnel</li>
                        <li>Secteur d&apos;activité</li>
                        <li>Taille de l&apos;entreprise</li>
                        <li>Outils utilisés</li>
                        <li>Points de friction identifiés</li>
                        <li>Niveau de maturité IA</li>
                      </ul>
                      <p className="mt-2 italic text-text-muted text-sm">
                        Base légale : consentement explicite (article 6.1.a du RGPD). Aucune donnée
                        personnelle nominative n&apos;est requise pour accéder au diagnostic.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        c) Données de navigation
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Adresse IP (anonymisée)</li>
                        <li>Type de navigateur et système d&apos;exploitation</li>
                        <li>Pages consultées et durée de visite</li>
                        <li>Site référent</li>
                      </ul>
                      <p className="mt-2 italic text-text-muted text-sm">
                        Base légale : intérêt légitime (article 6.1.f du RGPD) pour assurer la sécurité
                        et l&apos;amélioration du site.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        d) Chatbot IA (Lucio)
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Contenu des échanges avec le chatbot</li>
                        <li>Toute information que vous choisissez de partager</li>
                      </ul>
                      <p className="mt-2 italic text-text-muted text-sm">
                        Base légale : consentement explicite (article 6.1.a du RGPD).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Finalités */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Finalités du traitement
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>Vos données sont utilisées pour les finalités suivantes :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Répondre à vos demandes de contact et de renseignements</li>
                    <li>Établir un diagnostic IA personnalisé et vous proposer des solutions adaptées</li>
                    <li>Améliorer la qualité de nos services et de notre site web</li>
                    <li>Assurer la sécurité et le bon fonctionnement technique du site</li>
                    <li>Respecter nos obligations légales et réglementaires</li>
                  </ul>
                  <p>
                    Vos données ne sont <strong className="text-text-primary">jamais</strong> utilisées ou vendues à des fins
                    de prospection commerciale sans votre consentement explicite.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Destinataires */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Destinataires des données
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Vos données personnelles sont destinées à Himeros Conseil (Hoptisens). Elles peuvent
                    être transmises aux sous-traitants suivants, dans la stricte mesure nécessaire à
                    l&apos;accomplissement de leurs missions :
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-text-primary">Vercel Inc.</strong> — hébergement du site</li>
                    <li><strong className="text-text-primary">Resend</strong> — envoi des e-mails transactionnels</li>
                    <li><strong className="text-text-primary">Airtable</strong> — stockage des données de diagnostic</li>
                    <li><strong className="text-text-primary">Google LLC (Google AI)</strong> — traitement par les modèles d&apos;IA pour le diagnostic et le chatbot</li>
                  </ul>
                  <p>
                  </p>
                  <p>
                    Aucune donnée personnelle n&apos;est vendue à des tiers ni utilisée à des fins publicitaires.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Durée de conservation */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Durée de conservation
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Nous conservons vos données pendant les durées suivantes :
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-text-primary">Données de contact</strong> : 3 ans à compter
                      du dernier échange, ou jusqu&apos;à retrait du consentement.
                    </li>
                    <li>
                      <strong className="text-text-primary">Données de diagnostic</strong> : 12 mois à compter
                      de la réalisation du diagnostic, sauf si une relation commerciale s&apos;ensuit.
                    </li>
                    <li>
                      <strong className="text-text-primary">Données de navigation</strong> : 13 mois maximum
                      (durée maximale des cookies conformément aux recommandations de la CNIL).
                    </li>
                    <li>
                      <strong className="text-text-primary">Données contractuelles</strong> : durée de la relation
                      commerciale + 5 ans (durée légale de prescription).
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* Vos droits */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Vos droits
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des
                    droits suivants :
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-text-primary">Droit d&apos;accès</strong> — obtenir la confirmation
                      que vos données sont traitées et en recevoir une copie.
                    </li>
                    <li>
                      <strong className="text-text-primary">Droit de rectification</strong> — corriger les
                      données inexactes ou incomplètes vous concernant.
                    </li>
                    <li>
                      <strong className="text-text-primary">Droit à l&apos;effacement</strong> — demander la
                      suppression de vos données dans les cas prévus par la loi.
                    </li>
                    <li>
                      <strong className="text-text-primary">Droit à la limitation</strong> — demander la
                      suspension temporaire du traitement de vos données.
                    </li>
                    <li>
                      <strong className="text-text-primary">Droit d&apos;opposition</strong> — vous opposer au
                      traitement de vos données pour des motifs légitimes.
                    </li>
                    <li>
                      <strong className="text-text-primary">Droit à la portabilité</strong> — recevoir vos
                      données dans un format structuré et lisible par machine.
                    </li>
                    <li>
                      <strong className="text-text-primary">Droit de retirer votre consentement</strong> à
                      tout moment, sans affecter la licéité du traitement antérieur.
                    </li>
                  </ul>
                  <p>
                    Pour exercer l&apos;un de ces droits, contactez-nous à :{' '}
                    <strong className="text-text-primary">hello@hoptisens.com</strong>
                  </p>
                  <p>
                    Nous répondons dans un délai d&apos;un mois à compter de la réception de votre demande.
                    En cas de doute sur votre identité, nous pouvons vous demander une pièce d&apos;identité.
                  </p>
                  <p>
                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
                    réclamation à la CNIL :{' '}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      www.cnil.fr
                    </a>.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Cookies */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Cookies et traceurs
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Le site hoptisens.com utilise les types de cookies suivants :
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-4 text-text-primary font-medium">Type</th>
                          <th className="text-left py-3 pr-4 text-text-primary font-medium">Finalité</th>
                          <th className="text-left py-3 text-text-primary font-medium">Consentement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 pr-4">Strictement nécessaires</td>
                          <td className="py-3 pr-4">Fonctionnement technique du site (session, sécurité)</td>
                          <td className="py-3">Non requis</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 pr-4">Chatbot IA</td>
                          <td className="py-3 pr-4">Mémorisation du contexte de conversation</td>
                          <td className="py-3">Consentement</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    Vous pouvez à tout moment paramétrer vos préférences de cookies via les paramètres
                    de votre navigateur. Le refus de certains cookies peut toutefois altérer le
                    fonctionnement de certaines fonctionnalités du site.
                  </p>
                  <p>
                    Nous ne déposons aucun cookie publicitaire ni cookie de tracking tiers.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Sécurité */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Sécurité des données
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Himeros Conseil met en œuvre les mesures techniques et organisationnelles appropriées
                    pour garantir un niveau de sécurité adapté au risque, notamment :
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Chiffrement des communications (HTTPS/TLS)</li>
                    <li>Hébergement chez des prestataires certifiés</li>
                    <li>Accès restreint aux données sur la base du besoin d&apos;en connaître</li>
                    <li>Sauvegardes régulières et sécurisées</li>
                    <li>Audits de sécurité périodiques</li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

          
            {/* Mineurs */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Protection des mineurs
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Notre site et nos services ne sont pas destinés aux personnes de moins de 16 ans.
                    Nous ne collectons pas sciemment de données personnelles de mineurs. Si vous êtes
                    parent ou tuteur et que vous constatez que votre enfant nous a fourni des données
                    personnelles, veuillez nous contacter à hello@hoptisens.com.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Modifications */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Modifications de la politique
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Himeros Conseil se réserve le droit de modifier la présente politique de
                    confidentialité à tout moment. Les modifications prendront effet dès leur
                    publication sur cette page. Nous vous encourageons à consulter régulièrement
                    cette politique.
                  </p>
                  <p>
                    En cas de modification substantielle, nous vous en informerons par tout moyen
                    approprié.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Contact */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Nous contacter
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Pour toute question relative à la présente politique de confidentialité ou à
                    vos données personnelles :
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-text-primary">Himeros Conseil (Hoptisens)</strong></p>
                    <p>36 rue Victor Hugo, 64100 Bayonne, France</p>
                    <p>
                      E-mail :{' '}
                      <a
                        href="mailto:hello@hoptisens.com"
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        hello@hoptisens.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}
