"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Websites",
  "Web Apps",
  "Android Apps",
  "Embedded & IoT",
];

const works = [
  { title: "HSS Mundur", subtitle: "School Website" },
  { title: "The Golden Pitch", subtitle: "Fan Site" },
  { title: "Sulthan Flooring Experts", subtitle: "Client Website" },
  { title: "DiforNet", subtitle: "This Site" },
];

const faqs = [
  {
    question: "Who builds the sites?",
    answer:
      "DiforNet is a one-person studio. Every website, app, and embedded project is designed and built directly by the founder in Palakkad, Kerala.",
  },
  {
    question: "How does a project start?",
    answer:
      "Send a message through the contact form below with a brief description of what you need. We will reply to discuss scope, timeline, and next steps before any work begins.",
  },
];

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-5 w-5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <div className="min-h-full bg-white text-off-black dark:bg-off-black dark:text-white">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white dark:border-white/10 dark:bg-off-black">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="shrink-0">
            {mounted ? (
              <Image
                src={theme === "light" ? "/logo-light.jpg" : "/logo-dark.jpg"}
                alt="DiforNet"
                width={140}
                height={42}
                priority
                className="h-9 w-auto"
              />
            ) : (
              <span className="text-lg font-semibold tracking-tight">
                DiforNet
              </span>
            )}
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="btn-icon h-10 w-10"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <a href="#contact" className="btn-primary px-5 py-2.5 text-sm">
              Start a Project
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent">
            Palakkad, Kerala
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
            A one-person studio building{" "}
            <span className="text-accent">
              web, mobile, and embedded software.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-70 lg:text-xl">
            Straightforward projects, direct communication, and work shipped from
            Kerala.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary px-7 py-3.5 text-sm">
              Start a Project
            </a>
            <a href="#works" className="btn-secondary px-7 py-3.5 text-sm">
              View Work
            </a>
          </div>
        </section>

        <section
          id="services"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <h2 className="mb-12 text-4xl font-bold tracking-tight lg:text-5xl">
              Services
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <li
                  key={service}
                  className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <p className="text-lg font-semibold tracking-tight">
                    {service}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="works"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <h2 className="mb-12 text-4xl font-bold tracking-tight lg:text-5xl">
              Works
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {works.map((work) => (
                <li
                  key={work.title}
                  className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <p className="text-xl font-semibold tracking-tight">
                    {work.title}
                  </p>
                  <p className="mt-2 text-sm font-medium text-accent">
                    {work.subtitle}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="faq"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <h2 className="mb-12 text-4xl font-bold tracking-tight lg:text-5xl">
              FAQ
            </h2>
            <dl className="grid gap-6 lg:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <dt className="text-lg font-semibold tracking-tight text-accent">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 leading-relaxed opacity-70">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  Let&apos;s build{" "}
                  <span className="text-accent">your next project.</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed opacity-70">
                  Tell me about your project or book a conversation. This is the
                  only form on the site.
                </p>
              </div>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="space-y-5"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""}
                />
                <input
                  type="hidden"
                  name="subject"
                  value="DiforNet — New contact / booking"
                />

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary px-7 py-3.5 text-sm"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-8 lg:px-8">
          <p className="text-sm opacity-70">DiforNet — Palakkad, Kerala</p>
          <Image
            src="/logo-icon.png"
            alt=""
            width={32}
            height={32}
            aria-hidden
            className="h-8 w-8"
          />
        </div>
      </footer>
    </div>
  );
}
