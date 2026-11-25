"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MenuIcon, CloseIcon } from "./Icons";
import { NavLink } from "@/types";

interface HeaderProps {
  navLinks: NavLink[];
  activeSection: string;
  scrollProgress: number;
}

export function Header({
  navLinks,
  activeSection,
  scrollProgress,
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dashed border-[#40372e]/70 bg-[#100904]/75 backdrop-blur-md">
      <div className="fixed left-0 top-0 z-[60] h-[1px] w-full bg-transparent">
        <div
          className="h-full bg-[#dc5000] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="flex w-full items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#top"
          className="inline-flex shrink-0 items-baseline gap-2.5"
        >
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
          <span className="font-brand text-sm tracking-[0.06em] text-[#ffedd7]">
            DiforNet
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-[12px] font-medium uppercase tracking-[0.06em] transition-opacity ${
                  isActive
                    ? "text-[#ffedd7] opacity-100"
                    : "text-[#ffedd7] opacity-75 hover:opacity-100"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-0 -bottom-0.5 border-b border-dashed border-[#dc5000]" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="btn-ghost-muted h-11 w-11 px-0 md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={closeMenu}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-[#100904]/75 backdrop-blur-sm md:hidden"
          />
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 border-t border-dashed border-[#40372e] bg-[#100904] px-6 py-5 md:hidden"
          >
            <ul className="flex flex-col divide-y divide-dashed divide-[#40372e]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex min-h-11 items-center py-3 text-[12px] font-medium uppercase tracking-[0.06em] ${
                      activeSection === link.id
                        ? "text-[#dc5000]"
                        : "text-[#ffedd7]"
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
              className="btn-pill-filled mt-5 w-full"
            >
              Start a Project
            </a>
          </nav>
        </>
      ) : null}
    </header>
  );
}