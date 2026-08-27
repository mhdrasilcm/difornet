"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
  mounted,
  onToggleTheme,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white dark:border-white/10 dark:bg-off-black">
      {/* Scroll Progress Bar */}
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-black/5 dark:bg-white/5">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#top" className="shrink-0">
          {mounted ? (
            <Image
              src="/logo-icon.png"
              alt="DiforNet"
              width={36}
              height={36}
              priority
              className="h-9 w-9"
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight">
              DiforNet
            </span>
          )}
        </a>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.id ? "true" : undefined}
              className={`group relative text-sm font-medium transition-opacity hover:opacity-100 ${
                activeSection === link.id
                  ? "text-accent opacity-100"
                  : "opacity-70"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200 ${
                  activeSection === link.id
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="btn-icon h-10 w-10"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="#contact"
            className="btn-primary hidden px-5 py-2.5 text-sm md:inline-flex"
          >
            Start a Project
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="btn-icon menu-toggle h-10 w-10"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen ? (
        <nav className="border-t border-black/10 bg-white px-6 py-4 dark:border-white/10 dark:bg-off-black md:hidden">
          <ul className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-sm font-medium ${
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
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4 w-full px-5 py-3 text-sm"
          >
            Start a Project
          </a>
        </nav>
      ) : null}
    </header>
  );
}
