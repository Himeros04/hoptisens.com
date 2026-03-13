"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/lib/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll animations - Seuils très courts (0-150px) pour effet immédiat
  const navMaxWidth = useTransform(scrollY, [0, 150], ["100%", "850px"]);
  const navTop = useTransform(scrollY, [0, 150], [0, 16]);
  const borderRadius = useTransform(scrollY, [0, 150], [0, 999]);
  const bgOpacity = useTransform(scrollY, [0, 150], [0, 1]);
  const backdropBlur = useTransform(scrollY, [0, 150], [0, 12]);

  // Échelle du logo
  const logoScale = useTransform(scrollY, [0, 150], [1, 0.9]);

  // Metallic background gradient
  const metallicBg = useTransform(
    bgOpacity,
    (opacity) => opacity > 0.05
      ? `linear-gradient(180deg, 
          rgba(230, 230, 235, ${0.9 * opacity}) 0%, 
          rgba(210, 210, 215, ${0.85 * opacity}) 50%, 
          rgba(220, 220, 225, ${0.8 * opacity}) 100%)`
      : "transparent"
  );

  // Box shadow
  const boxShadow = useTransform(
    bgOpacity,
    (opacity) => opacity > 0.3
      ? `0 10px 30px rgba(0, 0, 0, 0.1)`
      : "none"
  );

  // Border dynamique
  const borderStyle = useTransform(
    bgOpacity,
    (opacity) => opacity > 0.1
      ? `1px solid rgba(180, 180, 190, ${0.3 * opacity})`
      : "1px solid transparent"
  );

  type RouteHref = "/" | "/a-propos" | "/offres" | "/contact";
  const links: { href: RouteHref, label: string }[] = [
    { href: "/offres", label: t("offres") },
    { href: "/a-propos", label: t("apropos") },
    { href: "/contact", label: t("contact") },
  ];

  const switchLocale = locale === "fr" ? "en" : "fr";
  const switchLabel = locale === "fr" ? "EN" : "FR";

  return (
    <>
      {/* Navbar Desktop & Conteneur Principal */}
      <motion.div
        className="fixed left-0 right-0 z-50 mx-auto flex items-center px-6 md:px-12"
        style={{
          height: 72,
          width: "100%", // <-- On force les 100% de base ici pour éviter les bugs au chargement
          maxWidth: navMaxWidth,
          top: navTop,
          background: metallicBg,
          backdropFilter: `blur(${backdropBlur.get()}px)`,
          boxShadow,
          borderRadius,
          border: borderStyle,
        }}
      >
        {/* 1. Zone du Logo : flex-1 prend TOUT l'espace vide et pousse le reste à droite */}
        <div className="flex-1 flex justify-start">
          <motion.div style={{ scale: logoScale, originX: 0 }}>
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Logo />
            </Link>
          </motion.div>
        </div>

        {/* 2. Zone de Navigation : Reste à droite et prend juste la place dont elle a besoin */}
        <div className="flex-shrink-0 flex items-center justify-end">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-[var(--color-border)] pl-4">
              <Link href={pathname} locale={switchLocale as any} className="text-xs font-semibold hover:text-[var(--color-accent)] transition-colors">
                {switchLabel}
              </Link>
              <Button size="sm" variant="primary">
                {t("cta")}
              </Button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 ml-4 text-[var(--color-text-primary)]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.7 }}
            className="fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col pt-6 px-6"
          >
            <div className="flex items-center justify-between mb-12">
              <Logo />
              <button
                className="p-2 text-[var(--color-text-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-2xl font-medium">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">Langue / Language</span>
                <Link href={pathname} locale={switchLocale as any} className="text-sm font-bold bg-[var(--color-surface)] py-1 px-3 rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Passer en {switchLabel}
                </Link>
              </div>
              <Button variant="primary" size="lg" className="w-full">
                {t("cta")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}