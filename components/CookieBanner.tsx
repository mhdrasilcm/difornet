"use client";

import { useEffect, useState } from "react";

export type CookieConsent = "accepted" | "rejected";

const STORAGE_KEY = "difornet-cookie-consent";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "rejected" ? stored : null;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getCookieConsent());
    setMounted(true);
  }, []);

  function choose(value: CookieConsent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent("difornet-cookie-consent", { detail: value })
    );
    setConsent(value);
  }

  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="cookie-banner fixed inset-x-0 bottom-[calc(var(--mobile-cta-h)+env(safe-area-inset-bottom,0px))] z-[70] md:bottom-0"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-[#ffedd7]/80">
          This site uses cookies for essential functionality and, only with
          your consent, for analytics. Non-essential cookies stay off until
          you accept. Read the{" "}
          <a href="/privacy" className="font-medium text-[#dc5000] underline">
            privacy policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="btn-ghost-muted"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-pill-filled"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}