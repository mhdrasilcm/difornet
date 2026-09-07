"use client";

import Image from "next/image";
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
  mounted,
  onToggleTheme,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Robust scroll lock: plain `overflow: hidden` on the body doesn't stop
  // touch scrolling on iOS Safari and can cause the page to visibly jump
  // if the scrollbar disappears. Pinning the body to `position: fixed` at
  // its current scroll offset blocks scroll on every platform and we
  // restore the exact position on close, so there's no jump either way.
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

  // Close on Escape and return focus to the toggle button so keyboard/
  // screen-reader users aren't left inside a menu that's no longer there.
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
            className="btn-icon h-11 w-11"
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
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="btn-icon menu-toggle h-11 w-11"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — absolutely positioned so it overlays the page
          instead of pushing content down (no layout jump), and sits in
          its own stacking context above everything except the scroll
          progress bar. */}
      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={closeMenu}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/20 backdrop-blur-[1px] md:hidden"
          />
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-white px-6 py-4 shadow-lg dark:border-white/10 dark:bg-off-black md:hidden"
          >
            <ul className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
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
