import { Link } from "@/lib/routing";
import { useTranslations } from "next-intl";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";

export function Footer() {
  const t = useTranslations("Navigation");
  
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Simplifier pour amplifier. Agence IA & Automatisation pour dirigeants lucides.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-[var(--color-text-primary)]">{t("offres")}</h4>
            <ul className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/offres" className="hover:text-[var(--color-accent)] transition-colors">Acquisition & Prospects</Link></li>
              <li><Link href="/offres" className="hover:text-[var(--color-accent)] transition-colors">Automatisation & RPA</Link></li>
              <li><Link href="/offres" className="hover:text-[var(--color-accent)] transition-colors">Agents IA</Link></li>
              <li><Link href="/offres" className="hover:text-[var(--color-accent)] transition-colors">Sprint IA</Link></li>
              <li><Link href="/diagnostic" className="hover:text-[var(--color-accent)] transition-colors">{t("diagnostic")}</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-[var(--color-text-primary)]">{t("entreprise")}</h4>
            <ul className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/a-propos" className="hover:text-[var(--color-accent)] transition-colors">{t("apropos")}</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">{t("contact")}</Link></li>
              <li><Link href="/" className="hover:text-[var(--color-accent)] transition-colors">{t("legals")}</Link></li>
              <li><Link href="/" className="hover:text-[var(--color-accent)] transition-colors">{t("rgpd")}</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div id="contact" className="flex flex-col gap-4">
            <h4 className="font-semibold text-[var(--color-text-primary)]">{t("contact")}</h4>
            <a 
              href="mailto:hello@hoptisens.com?subject=Demande%20d%27information%20%5Bhoptisens.com%5D&body=Bonjour%2C%20suite%20%C3%A0%20la%20visite%20de%20votre%20site%20web%2C%20je%20suis%20int%C3%A9ress%C3%A9%20d%27en%20savoir%20plus%20sur%20vos%20prestations.%20%C3%AAtes%20vous%20disponible%20pour%20un%20%C3%A9change%20dans%20les%20prochains%20jours%20%3F"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
            >
              hello@hoptisens.com
            </a>
            <div className="flex gap-4 mt-2">
              <a href="https://www.linkedin.com/in/hadrien-peyron/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© 2026 Hoptisens. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
}
