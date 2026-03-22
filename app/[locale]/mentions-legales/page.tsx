import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { Link } from "@/lib/routing";

export default function MentionsLegalesPage() {
  return (
    <main className="flex min-h-screen flex-col pt-32 pb-20">
      <Section className="mb-16">
        <Container>
          <FadeInUp className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">
              Mentions <span className="italic text-accent">légales</span>
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
            {/* Éditeur du site */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Éditeur du site
                </h2>
                <div className="text-text-secondary space-y-2">
                  <p><strong className="text-text-primary">Himeros Conseil</strong></p>
                  <p>Agissant sous la marque commerciale <strong className="text-text-primary">Hoptisens</strong></p>
                  <p>Entreprise individuelle</p>
                  <p>Siège social : 36 rue Victor Hugo, 64100 Bayonne, France</p>
                  <p>Adresse e-mail : hello@hoptisens.com</p>
                  <p>Directeur de la publication : <strong className="text-text-primary">M. Hadrien Peyron</strong></p>
                </div>
              </div>
            </FadeInUp>

            {/* Hébergement */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Hébergement
                </h2>
                <div className="text-text-secondary space-y-2">
                  <p>Le site hoptisens.com est hébergé par :</p>
                  <p><strong className="text-text-primary">Vercel Inc.</strong></p>
                  <p>340 S Lemon Ave #4133</p>
                  <p>Walnut, CA 91789, États-Unis</p>
                  <p>
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      vercel.com
                    </a>
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Propriété intellectuelle */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Propriété intellectuelle
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    L&apos;ensemble du contenu du site hoptisens.com — incluant, de manière non limitative,
                    les textes, images, graphismes, logos, icônes, sons, logiciels, ainsi que leur
                    mise en forme — est la propriété exclusive de Himeros Conseil ou de ses partenaires,
                    et est protégé par les lois françaises et internationales relatives à la propriété
                    intellectuelle.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou
                    partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                    interdite sans autorisation écrite préalable de Himeros Conseil.
                  </p>
                  <p>
                    Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il
                    contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie
                    conformément aux dispositions des articles L.335-2 et suivants du Code de la
                    propriété intellectuelle.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Données personnelles */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Données personnelles
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Les informations relatives à la collecte et au traitement des données personnelles
                    sont détaillées dans notre{' '}
                    <Link
                      href="/politique-confidentialite"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      Politique de confidentialité
                    </Link>.
                  </p>
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
                    et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d&apos;un
                    droit d&apos;accès, de rectification, de suppression et de portabilité de vos données
                    personnelles, ainsi que d&apos;un droit d&apos;opposition et de limitation du traitement.
                  </p>
                  <p>
                    Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse :
                    hello@hoptisens.com
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Cookies */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Cookies
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Le site hoptisens.com utilise des cookies strictement nécessaires au bon
                    fonctionnement du site. Aucun cookie de traçage à des fins publicitaires ou
                    analytiques tiers n&apos;est déposé sans votre consentement préalable.
                  </p>
                  <p>
                    Pour plus d&apos;informations sur notre utilisation des cookies, veuillez consulter
                    notre{' '}
                    <Link
                      href="/politique-confidentialite"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      Politique de confidentialité
                    </Link>.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Responsabilité */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Limitation de responsabilité
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Himeros Conseil s&apos;efforce de fournir sur le site hoptisens.com des informations
                    aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des
                    omissions, des inexactitudes et des carences dans la mise à jour, qu&apos;elles soient
                    de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                  </p>
                  <p>
                    Les informations fournies sur le site le sont à titre indicatif et ne sauraient
                    dispenser l&apos;utilisateur d&apos;une analyse complémentaire et personnalisée. Himeros
                    Conseil ne pourra en aucun cas être tenue pour responsable de l&apos;utilisation faite
                    par l&apos;utilisateur des informations et contenus disponibles sur le site.
                  </p>
                  <p>
                    Le site peut contenir des liens hypertextes vers d&apos;autres sites. Himeros Conseil
                    n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à
                    leur contenu.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Droit applicable */}
            <FadeInUp>
              <div>
                <h2 className="text-2xl font-serif text-text-primary mb-4">
                  Droit applicable et juridiction compétente
                </h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Les présentes mentions légales sont soumises au droit français. En cas de litige,
                    les tribunaux français seront seuls compétents.
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </Section>
    </main>
  );
}
