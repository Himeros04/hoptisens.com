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

  // Scroll Animations
  const paddingY = useTransform(scrollY, [0, 80], [20, 10]);
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.85]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92]);
  const backdropBlur = useTransform(scrollY, [0, 80], [0, 12]);
  const shadowIntensity = useTransform(scrollY, [0, 80], [0, 1]);

  const backgroundColor = useTransform(bgOpacity, (op) => `rgba(250, 250, 249, ${op})`);
  const filter = useTransform(backdropBlur, (blur) => `blur(${blur}px)`);
  const boxShadow = useTransform(shadowIntensity, (val) => val === 1 ? `0 1px 0 var(--color-border)` : `none`);

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
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-colors"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          backgroundColor,
          backdropFilter: filter,
          boxShadow,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            <motion.div style={{ scale: logoScale, originX: 0, originY: 0.5 }}>
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
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
            className="md:hidden p-2 text-[var(--color-text-primary)]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
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
