"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 * 13; // 13 mois en secondes

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function CookieBanner() {
  const t = useTranslations("CookieConsent");
  const [visible, setVisible] = useState(() => !getCookie(COOKIE_NAME));

  const handleChoice = (value: "accepted" | "refused") => {
    setCookie(COOKIE_NAME, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm"
          role="dialog"
          aria-label={t("message")}
        >
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
              {t("message")}{" "}
              <Link
                href="/politique-confidentialite"
                className="underline text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 transition-colors"
              >
                {t("policyLink")}
              </Link>
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleChoice("refused")}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
              >
                {t("refuse")}
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="inline-flex items-center justify-center rounded-xl bg-[#2A2A2A] px-5 py-2.5 text-sm font-medium text-[#F9F7F3] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.1)] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function resetCookieConsent() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}
