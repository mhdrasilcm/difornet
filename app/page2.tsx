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
  {
    title: "Websites",
    description:
      "Marketing sites, school and business websites, and content-driven pages built to load fast and stay maintainable.",
  },
  {
    title: "Web Apps",
    description: "Full-stack products with real logins, dashboards, and data.",
  },
  {
    title: "Android Apps",
    description: "Native and cross-platform apps shipped to real users.",
  },
  {
    title: "Embedded & IoT",
    description: "Firmware and hardware-connected software.",
  },
];

const works = [
  {
    title: "HSS Mundur",
    subtitle: "School Website",
    description:
      "A public website built for a government higher secondary school, covering admissions, staff, and announcements.",
  },
  { title: "The Golden Pitch", subtitle: "Fan Site" },
  { title: "Sulthan Flooring Experts", subtitle: "Client Website" },
  { title: "DiforNet", subtitle: "This Site" },
];

const bentoSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

const stats = [
  { label: "Founded", value: "2023" },
  { label: "Studio Size", value: "1 person" },
  { label: "Disciplines", value: "4" },
  { label: "Based In", value: "Kerala, IN" },
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

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="faq-icon h-5 w-5 shrink-0"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center gap-4">
        <span className="section-eyebrow">
          {index} — {eyebrow}
        </span>
        <span className="section-rule" aria-hidden />
      </div>
      <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h2>
    </div>
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
                className="group relative text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
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
        <section className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid-backdrop" aria-hidden />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent dark:border-white/10 dark:bg-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Based in Palakkad, Kerala
            </p>

            <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
              A one-person studio building{" "}
              <span className="text-accent">
                web, mobile, and embedded software.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-70 lg:text-xl">
              Straightforward projects, direct communication, and work
              shipped from Kerala.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="btn-primary group px-7 py-3.5 text-sm"
              >
                Start a Project
                <ArrowIcon />
              </a>
              <a
                href="#works"
                className="btn-secondary group px-7 py-3.5 text-sm"
              >
                View Work
                <ArrowIcon />
              </a>
            </div>

            <dl className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-tile">
                  <dt className="font-mono text-xs uppercase tracking-widest opacity-60">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-xl font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="services"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <SectionHeading index="01" eyebrow="What I Do" title="Services" />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]">
              {services.map((service, index) => (
                <li
                  key={service.title}
                  className={`${bentoSpans[index]} ${
                    index === 0 ? "bento-feature" : "bento-tile"
                  } flex flex-col justify-between`}
                >
                  <span className="bento-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-tight lg:text-xl">
                      {service.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed opacity-70">
                      {service.description}
                    </p>
                  </div>
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
            <SectionHeading
              index="02"
              eyebrow="Portfolio"
              title="Selected Works"
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]">
              {works.map((work, index) => (
                <li
                  key={work.title}
                  className={`${bentoSpans[index]} ${
                    index === 0 ? "bento-feature" : "bento-tile"
                  } flex flex-col justify-between`}
                >
                  <span className="bento-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xl font-semibold tracking-tight">
                      {work.title}
                    </p>
                    <p className="mt-2 text-sm font-medium text-accent">
                      {work.subtitle}
                    </p>
                    {work.description ? (
                      <p className="mt-3 text-sm leading-relaxed opacity-70">
                        {work.description}
                      </p>
                    ) : null}
                  </div>
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
            <SectionHeading index="03" eyebrow="Questions" title="FAQ" />
            <div className="mx-auto max-w-3xl divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="faq-item group py-6">
                  <summary className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold tracking-tight">
                      {faq.question}
                    </span>
                    <span className="text-accent">
                      <PlusIcon />
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed opacity-70">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <SectionHeading
              index="04"
              eyebrow="Get In Touch"
              title="Let's Talk"
            />
            <div className="grid gap-16 lg:grid-cols-5 lg:items-start">
              <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  Let&apos;s build{" "}
                  <span className="text-accent">your next project.</span>
                </h3>
                <p className="mt-4 text-lg leading-relaxed opacity-70">
                  Tell me about your project or book a conversation. This is
                  the only form on the site.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <div className="stat-tile flex-1">
                    <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden
                      />
                      Status
                    </p>
                    <p className="mt-2 font-semibold tracking-tight">
                      Currently accepting new projects
                    </p>
                  </div>
                  <div className="stat-tile flex-1">
                    <p className="font-mono text-xs uppercase tracking-widest opacity-60">
                      Response Time
                    </p>
                    <p className="mt-2 font-semibold tracking-tight">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="space-y-5 lg:col-span-3"
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
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt=""
              width={28}
              height={28}
              aria-hidden
              className="h-7 w-7"
            />
            <p className="text-sm opacity-70">DiforNet — Palakkad, Kerala</p>
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
      </footer>
    </div>
  );
}
