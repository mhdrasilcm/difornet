"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "./Icons";
import { NavLink } from "@/types";

interface HeaderProps {
  navLinks: NavLink[];
  activeSection: string;
  scrollProgress: number;
  theme: "light" | "dark";
  mounted: boolean;
  onToggleTheme: () => void;
}

export function Header({
  navLinks,
  activeSection,
  scrollProgress,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    scrollPositionRef.current = window.scrollY;
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.setAttribute("data-scroll-locked", "true");

    return () => {
      document.body.removeAttribute("data-scroll-locked");
      document.body.style.top = "";
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/92 backdrop-blur-md">
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a
          href="#top"
          className="inline-flex shrink-0 items-baseline gap-2.5 md:justify-self-start"
        >
          <svg
            viewBox="0 0 100 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[0.82em] w-auto shrink-0"
            aria-hidden
          >
            <polygon points="24,0 44,0 20,84 0,84" fill="var(--stripe-green)" />
            <polygon points="52,0 72,0 48,84 28,84" fill="var(--stripe-gold)" />
            <polygon points="80,0 100,0 76,84 56,84" fill="var(--stripe-red)" />
          </svg>
          <span className="font-brand text-lg tracking-wide">DiforNet</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--foreground)]"
                    : "text-muted hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[var(--accent)]" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3 md:justify-self-end">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="btn-icon h-10 w-10 min-h-10 min-w-10"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          <a
            href="#contact"
            className="btn-primary hidden px-5 py-2 text-sm md:inline-flex"
          >
            Start a Project
          </a>

          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="btn-icon menu-toggle h-11 w-11 md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={closeMenu}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/25 backdrop-blur-[1px] md:hidden"
          />
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 shadow-lg md:hidden"
          >
            <ul className="flex flex-col divide-y divide-[var(--border)]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex min-h-11 items-center py-3 text-sm font-medium ${
                      activeSection === link.id ? "text-accent" : "opacity-80"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn-primary mt-4 w-full px-5 py-3 text-sm"
            >
              Start a Project
            </a>
          </nav>
        </>
      ) : null}
    </header>
  );
}