"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 480);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`btn-icon fixed bottom-24 right-6 z-40 h-11 w-11 bg-white transition-opacity duration-200 dark:bg-off-black md:bottom-6 ${
        showBackToTop
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white px-6 py-3 dark:border-white/10 dark:bg-off-black md:hidden">
      <a href="#contact" className="btn-primary block w-full py-3 text-sm">
        Start a Project
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/10 pb-24 dark:border-white/10 md:pb-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="DiforNet logo"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <p className="text-sm opacity-70">
              DiforNet — Palakkad, Kerala, India
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs uppercase tracking-widest opacity-50">
              © {new Date().getFullYear()}
            </span>
            <a
              href="#top"
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              Back to top
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/10 pt-6 text-sm opacity-70 dark:border-white/10">
          <a href="/privacy" className="hover:text-accent hover:opacity-100">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-accent hover:opacity-100">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
