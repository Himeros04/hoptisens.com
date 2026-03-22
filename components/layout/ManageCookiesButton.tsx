"use client";

import { resetCookieConsent } from "./CookieBanner";

interface ManageCookiesButtonProps {
  label: string;
}

export function ManageCookiesButton({ label }: ManageCookiesButtonProps) {
  const handleClick = () => {
    resetCookieConsent();
    window.location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer text-left"
    >
      {label}
    </button>
  );
}
