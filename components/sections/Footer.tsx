"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon } from "./Icons";

export function InstagramButton() {
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/difornet";
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow DiforNet on Instagram"
      className={`btn-ghost-muted fixed bottom-6 left-6 z-40 hidden bg-[#100904]/85 backdrop-blur-md transition-all duration-200 md:inline-flex ${
        footerVisible
          ? "pointer-events-none translate-y-2 opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
    >
      <InstagramIcon className="h-3.5 w-3.5 text-[#dc5000]" />
      <span>@DIFORNET</span>
    </a>
  );
}

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
      className={`btn-ghost-muted fixed bottom-[calc(var(--mobile-cta-h)+env(safe-area-inset-bottom,0px)+0.75rem)] right-6 z-40 h-11 w-11 bg-[#100904]/85 px-0 backdrop-blur-md transition-opacity duration-200 md:bottom-6 ${
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
    <div className="mobile-cta-bar fixed inset-x-0 bottom-0 z-40 border-t border-dashed border-[#40372e] bg-[#100904] px-6 pt-3 md:hidden">
      <a href="#contact" className="btn-pill-filled w-full">
        Start a Project
      </a>
    </div>
  );
}

export function Footer() {
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/difornet";

  return (
    <footer className="dashed-rule relative z-10 bg-[#100904] pb-[calc(var(--mobile-cta-h)+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="px-6 pt-16 pb-10 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="inline-flex items-baseline gap-2">
              <svg
                viewBox="0 0 100 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[0.82em] w-auto shrink-0"
                aria-hidden
              >
                <polygon points="24,0 44,0 20,84 0,84" fill="#2f6e49" />
                <polygon points="52,0 72,0 48,84 28,84" fill="#c98a2c" />
                <polygon points="80,0 100,0 76,84 56,84" fill="#dc5000" />
              </svg>
              <span className="font-brand text-base tracking-[0.06em]">
                DiforNet
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#ffedd7]/75">
              Independent web, mobile &amp; cloud software studio based in
              Palakkad, Kerala.
            </p>

            <div className="flex items-center gap-4 pt-1 text-[#ffedd7]/70">
              <a
                href="https://github.com/mhdrasilcm/difornet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DiforNet on GitHub"
                className="transition-colors hover:text-[#dc5000]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DiforNet on Instagram"
                className="transition-colors hover:text-[#dc5000]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                aria-label="Contact DiforNet"
                className="transition-colors hover:text-[#dc5000]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div className="space-y-3 text-[12px] font-medium uppercase">
              <p className="text-[#6c5f51]">Services</p>
              <ul className="space-y-2.5">
                <li>
                  <a href="#services" className="hover:text-[#dc5000]">
                    Business Websites
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#dc5000]">
                    Web Applications
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#dc5000]">
                    Android Apps
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#dc5000]">
                    APIs &amp; Hosting
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-[12px] font-medium uppercase">
              <p className="text-[#6c5f51]">Studio</p>
              <ul className="space-y-2.5">
                <li>
                  <a href="#works" className="hover:text-[#dc5000]">
                    Selected Work
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#dc5000]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#dc5000]">
                    Start a Project
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-[12px] font-medium uppercase">
              <p className="text-[#6c5f51]">Legal</p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="hover:text-[#dc5000]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#dc5000]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="/sitemap.xml" className="hover:text-[#dc5000]">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashed-rule mt-14 flex flex-col gap-3 pt-6 text-[11px] font-medium uppercase text-[#6c5f51] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} DIFORNET · PALAKKAD, KERALA, INDIA
          </p>
          <a href="#top" className="text-[#dc5000] hover:underline">
            BACK TO TOP ↑
          </a>
        </div>
      </div>

      {/* Oversized Brand Lockup */}
      <div className="footer-brand-stage" aria-hidden>
        <div className="footer-brand-lockup px-6 lg:px-10">
          <svg
            viewBox="0 0 100 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="footer-brand-mark"
          >
            <polygon points="24,0 44,0 20,84 0,84" fill="#2f6e49" />
            <polygon points="52,0 72,0 48,84 28,84" fill="#c98a2c" />
            <polygon points="80,0 100,0 76,84 56,84" fill="#dc5000" />
          </svg>
          <span className="footer-brand-wordmark">DiforNet</span>
        </div>
      </div>
    </footer>
  );
}