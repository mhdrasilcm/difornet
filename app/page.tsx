"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const navLinks = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Works", href: "#works", id: "works" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
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

const serviceSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

const workSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
];

const stats = [
  { label: "Founded", value: "2026" },
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
  {
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope, features, and timeline. Share the details of your project through the contact form and you'll get a clear, upfront quote before any work starts.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A simple website usually takes one to two weeks. Web apps, Android apps, and embedded projects vary based on complexity and are scoped individually after the first conversation.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Modern, well-supported tools: React and Next.js for the web, native and cross-platform frameworks for Android, and standard embedded toolchains for hardware-connected projects.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project includes a short post-launch window for fixes, and ongoing maintenance or updates can be arranged separately if you need continued support.",
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

function MenuIcon() {
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
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
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
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ServiceGlyph({ index }: { index: number }) {
  const paths = [
    <g key="web">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M6 6h.01M8 6h.01" />
    </g>,
    <g key="app">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M11 18h2" />
    </g>,
    <g key="android">
      <rect x="6" y="8" width="12" height="10" rx="2" />
      <path d="M9 8V6M15 8V6M7 13H5M19 13h-2M10 12h.01M14 12h.01" />
    </g>,
    <g key="iot">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </g>,
  ];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      {paths[index] ?? paths[0]}
    </svg>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function RevealLi({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
    >
      {children}
    </li>
  );
}

function RevealDiv({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
    >
      {children}
    </div>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 480);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("loading");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="min-h-full bg-white text-off-black dark:bg-off-black dark:text-white">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--on-accent)]"
      >
        Skip to content
      </a>

      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-black/5 dark:bg-white/5">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
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
              className="btn-icon h-10 w-10 md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-black/10 bg-white px-6 py-4 dark:border-white/10 dark:bg-off-black md:hidden">
            <ul className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-sm font-medium ${
                      activeSection === link.id
                        ? "text-accent"
                        : "opacity-80"
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

      <main id="top">
        <section className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid-backdrop" aria-hidden />
          <div className="spatial-orb -right-20 -top-24 h-80 w-80" aria-hidden />
          <div className="spatial-orb left-1/2 top-40 h-64 w-64 opacity-10" aria-hidden />

          <div className="spatial-layer relative mx-auto max-w-6xl">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent neumo-raised-sm dark:border-white/10 dark:bg-white/5">
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
              {stats.map((stat, index) => (
                <RevealDiv
                  key={stat.label}
                  delay={index * 80}
                  className="stat-tile"
                >
                  <dt className="font-mono text-xs uppercase tracking-widest opacity-60">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-xl font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                </RevealDiv>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="services"
          className="relative border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <SectionHeading index="01" eyebrow="What I Do" title="Services" />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]">
              {services.map((service, index) => (
                <RevealLi
                  key={service.title}
                  delay={index * 90}
                  className={`${serviceSpans[index]} ${
                    index === 0 ? "bento-feature bento-feature-glow" : "bento-tile"
                  } flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between">
                    <span className="icon-chip">
                      <ServiceGlyph index={index} />
                    </span>
                    <span className="bento-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold tracking-tight lg:text-xl">
                      {service.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed opacity-70">
                      {service.description}
                    </p>
                  </div>
                </RevealLi>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="works"
          className="relative border-t border-black/10 dark:border-white/10"
        >
          <div className="spatial-orb -right-10 top-1/3 h-72 w-72 opacity-10" aria-hidden />
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <SectionHeading
              index="02"
              eyebrow="Portfolio"
              title="Selected Works"
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[170px]">
              {works.map((work, index) => (
                <RevealLi
                  key={work.title}
                  delay={index * 90}
                  className={`${workSpans[index]} ${
                    index === 0 ? "bento-feature" : "bento-tile"
                  } group relative flex flex-col justify-between overflow-hidden`}
                >
                  {index === 0 ? <span className="work-visual" aria-hidden /> : null}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="work-badge">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      {work.subtitle}
                    </span>
                    <span className="bento-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xl font-semibold tracking-tight">
                      {work.title}
                    </p>
                    {work.description ? (
                      <p className="mt-3 max-w-md text-sm leading-relaxed opacity-70">
                        {work.description}
                      </p>
                    ) : null}
                  </div>
                </RevealLi>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="faq"
          className="relative border-t border-black/10 dark:border-white/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <SectionHeading index="03" eyebrow="Questions" title="FAQ" />
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <RevealDiv key={faq.question} delay={index * 60}>
                  <details className="faq-card faq-item">
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
                </RevealDiv>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative border-t border-black/10 dark:border-white/10"
        >
          <div className="spatial-orb -left-16 bottom-0 h-72 w-72 opacity-10" aria-hidden />
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <SectionHeading
              index="04"
              eyebrow="Get In Touch"
              title="Let's Talk"
            />
            <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
              <div className="lg:col-span-2">
                <div className="bento-tile bento-feature-glow p-8">
                  <h3 className="text-3xl font-bold tracking-tight lg:text-4xl">
                    Let&apos;s build{" "}
                    <span className="text-accent">your next project.</span>
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed opacity-70">
                    Tell me about your project or book a conversation. This is
                    the only form on the site.
                  </p>

                  <div className="mt-8 flex flex-col gap-4">
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
                        Within 2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleContactSubmit}
                className="bento-tile space-y-5 p-8 lg:col-span-3"
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

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="btn-primary px-7 py-3.5 text-sm disabled:opacity-60"
                  >
                    {formStatus === "loading" ? "Sending…" : "Send message"}
                  </button>

                  <p aria-live="polite" className="text-sm">
                    {formStatus === "success" ? (
                      <span className="text-accent">
                        Thanks — your message is in. I&apos;ll reply within 2
                        business days.
                      </span>
                    ) : null}
                    {formStatus === "error" ? (
                      <span className="opacity-70">
                        Something went wrong. Please try again in a moment.
                      </span>
                    ) : null}
                  </p>
                </div>
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

      <a
        href="#top"
        aria-label="Back to top"
        className={`btn-icon fixed bottom-6 right-6 z-40 h-11 w-11 bg-white transition-opacity duration-200 dark:bg-off-black ${
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
    </div>
  );
}
