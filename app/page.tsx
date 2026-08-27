"use client";

import { useEffect, useState } from "react";
import {
  Header,
  HeroSection,
  ServicesSection,
  WorksSection,
  FAQSection,
  ContactSection,
  Footer,
  BackToTop,
  MobileCTA,
} from "@/components/sections";
import { NavLink, Service, Work, Stat, FAQ, Theme } from "@/types";

const navLinks: NavLink[] = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Works", href: "#works", id: "works" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const services: Service[] = [
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

const works: Work[] = [
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

const stats: Stat[] = [
  { label: "Founded", value: "2026" },
  { label: "Studio Size", value: "1 person" },
  { label: "Disciplines", value: "4" },
  { label: "Based In", value: "Kerala, IN" },
];

const faqs: FAQ[] = [
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

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

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

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <div className="min-h-full bg-white text-off-black dark:bg-off-black dark:text-white">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--on-accent)]"
      >
        Skip to content
      </a>

      <Header
        navLinks={navLinks}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        theme={theme}
        mounted={mounted}
        onToggleTheme={toggleTheme}
      />

      <main id="top">
        <HeroSection stats={stats} />
        <ServicesSection services={services} />
        <WorksSection works={works} />
        <FAQSection faqs={faqs} />
        <ContactSection siteUrl={process.env.NEXT_PUBLIC_SITE_URL} />
      </main>

      <Footer />
      <MobileCTA />
      <BackToTop />
    </div>
  );
}
