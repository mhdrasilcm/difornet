"use client";

import { useEffect, useState } from "react";

export type CookieConsent = "accepted" | "rejected";

const STORAGE_KEY = "difornet-cookie-consent";

/**
 * Reads the stored consent value. Non-essential scripts (analytics, etc.)
 * should check this — via `getCookieConsent() === "accepted"` — before
 * loading anything. Nothing non-essential should fire until this returns
 * "accepted".
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "rejected" ? stored : null;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
      className="cookie-banner fixed inset-x-0 bottom-[60px] z-[70] md:bottom-0"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="max-w-2xl text-sm leading-relaxed opacity-80">
          This site uses cookies for essential functionality and, only with
          your consent, for analytics. Non-essential cookies stay off until
          you accept. Read the{" "}
          <a href="/privacy" className="text-accent font-medium">
            privacy policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="btn-secondary px-5 py-2.5 text-sm"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
