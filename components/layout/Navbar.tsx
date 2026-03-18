"use client";

import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/lib/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll animations - shrink to pill
  const navMaxWidth = useTransform(scrollY, [0, 150], ["100%", "850px"]);
  const navTop = useTransform(scrollY, [0, 150], [0, 16]);
  const borderRadius = useTransform(scrollY, [0, 150], [0, 999]);
  const bgOpacity = useTransform(scrollY, [0, 150], [0, 1]);
  const backdropBlur = useTransform(scrollY, [0, 150], [0, 16]);
  const backdropFilterValue = useMotionTemplate`blur(${backdropBlur}px)`;

  const metallicBg = useTransform(
    bgOpacity,
    (opacity) => opacity > 0.05
      ? `linear-gradient(180deg,
          rgba(230, 230, 235, ${0.9 * opacity}) 0%,
          rgba(210, 210, 215, ${0.85 * opacity}) 50%,
          rgba(220, 220, 225, ${0.8 * opacity}) 100%)`
      : "transparent"
  );

  const boxShadow = useTransform(
    bgOpacity,
    (opacity) => opacity > 0.3
      ? `0 10px 30px rgba(0, 0, 0, 0.1)`
      : "none"
  );

  const borderStyle = useTransform(
    bgOpacity,
    (opacity) => opacity > 0.1
      ? `1px solid rgba(180, 180, 190, ${0.3 * opacity})`
      : "1px solid transparent"
  );

  const logoScale = useTransform(scrollY, [0, 150], [1, 0.9]);
  const scrollPercent = useTransform(scrollY, [0, 150], [1, 0]);
  const logoX = useTransform(scrollPercent, (v) => `calc(-30vw * ${v})`);
  const navX = useTransform(scrollPercent, (v) => `calc(1vw * ${v})`);

  // Nav text color: blanc cassé en haut → sombre au scroll
  const navTextColor = useTransform(scrollY, [0, 150], ["#E8E3DB", "#6B6B6B"]);
  const langTextColor = useTransform(scrollY, [0, 150], ["#E8E3DB", "#6B6B6B"]);
  const ctaBg = useTransform(scrollY, [0, 150], ["rgba(26,26,26,0.15)", "rgba(26,26,26,1)"]);
  const ctaTextColor = useTransform(scrollY, [0, 150], ["#E8E3DB", "#FFFFFF"]);

  type RouteHref = "/" | "/a-propos" | "/offres" | "/contact" | "/diagnostic";
  const links: { href: RouteHref; label: string }[] = [
    { href: "/offres", label: t("offres") },
    { href: "/diagnostic", label: t("diagnostic") },
    { href: "/a-propos", label: t("apropos") },
    { href: "/contact", label: t("contact") },
  ];

  const switchLocale = (locale === "fr" ? "en" : "fr") as "fr" | "en";
  const switchLabel = locale === "fr" ? "EN" : "FR";

  return (
    <>
      {/* Navbar */}
      <div className="fixed left-0 right-0 z-50" style={{ top: 0 }}>
        <motion.div
          className="mx-auto h-16 w-full"
          style={{
            maxWidth: navMaxWidth,
            marginTop: navTop,
            background: metallicBg,
            backdropFilter: backdropFilterValue,
            boxShadow,
            borderRadius,
            border: borderStyle,
          }}
        >
          <div className="flex h-full w-full">
            {/* Left half: Logo — poussé à gauche */}
            <div className="flex flex-1 items-center pl-6 md:pl-10">
              <motion.div style={{ scale: logoScale, x: logoX, originX: 0 }}>
                <Link href="/" className="transition-opacity hover:opacity-70">
                  <Logo />
                </Link>
              </motion.div>
            </div>

            {/* Right half: Nav + CTA — poussé à droite */}
            <div className="flex flex-1 items-center justify-end pr-6 md:pr-5">
              {/* Desktop Nav */}
              <motion.nav className="hidden md:flex items-center gap-1" style={{ x: navX }}>
                {links.map((link) => (
                  <motion.div key={link.href} style={{ color: navTextColor }}>
                    <Link
                      href={link.href}
                      className="relative px-4 py-2 text-[13px] font-medium tracking-wide rounded-full whitespace-nowrap block"
                      style={{ color: "inherit" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="ml-3 flex items-center gap-2">
                  <motion.div style={{ color: langTextColor }}>
                    <Link
                      href={pathname}
                      locale={switchLocale}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                      style={{ color: "inherit" }}
                    >
                      {switchLabel}
                    </Link>
                  </motion.div>

                  <motion.a
                    href="https://calendly.com/hoptisens/hoptisens-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group ml-1 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-all hover:gap-2.5 whitespace-nowrap"
                    style={{ backgroundColor: ctaBg, color: ctaTextColor }}
                  >
                    {t("cta")}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </motion.a>
                </div>
              </motion.nav>

              {/* Mobile Toggle */}
              <button
                className="md:hidden p-2 ml-2 text-[var(--color-text-primary)] rounded-lg hover:bg-black/[0.04] transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex h-16 items-center justify-between px-5">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <button
                className="p-2 text-[var(--color-text-primary)] rounded-lg hover:bg-black/[0.04] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex flex-col px-5 pt-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center py-3.5 text-lg font-medium text-[var(--color-text-primary)] border-b border-black/[0.06]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile footer */}
            <div className="mt-auto px-5 pb-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--color-text-muted)]">Langue</span>
                <Link
                  href={pathname}
                  locale={switchLocale}
                  className="text-sm font-semibold bg-black/[0.04] py-1.5 px-4 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {switchLabel}
                </Link>
              </div>
              <a
                href="https://calendly.com/hoptisens/hoptisens-call"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-[15px] font-medium text-white"
              >
                {t("cta")}
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}