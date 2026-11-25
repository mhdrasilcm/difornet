"use client";

import { useEffect, useState } from "react";
import { StudioArtifact3D } from "@/components/StudioArtifact3D";
import { DarkroomSpotlight } from "@/components/sections/KineticText";
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
  InstagramButton,
} from "@/components/sections";
import { NavLink, FAQ } from "@/types";

const navLinks: NavLink[] = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Works", href: "#works", id: "works" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const faqs: FAQ[] = [
  {
    question: "Who builds the sites?",
    answer:
      "DiforNet is a one-person studio. Every website, app, and API is designed and built directly by the founder in Palakkad, Kerala.",
  },
  {
    question: "How does a project start?",
    answer:
      "Send a message through the contact form below with a brief description of what you need. I will reply within 2 business days to discuss scope, timeline, and next steps before any work begins.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Pricing depends on scope, features, and timeline. Share the details of your project through the contact form and you'll get a clear, upfront quote before any work starts.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A simple website usually takes one to two weeks. Web apps, Android apps, and API projects vary based on complexity and are scoped individually after our first conversation.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Clean HTML/CSS, React, Next.js, and TypeScript for the web; native tooling for Android; and PostgreSQL with Cloudflare or Vercel for hosting and APIs.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project includes a short post-launch window for fixes, and ongoing maintenance or updates can be arranged separately if you need continued support.",
  },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);

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

  return (
    <div className="relative min-h-full bg-[#100904] text-[#ffedd7]">
      <StudioArtifact3D activeServiceIndex={activeServiceIndex} />
      <DarkroomSpotlight />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#382416] focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:text-[#ffedd7]"
      >
        Skip to content
      </a>

      <Header
        navLinks={navLinks}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      <main id="top" className="relative z-10">
        <HeroSection />
        <ServicesSection
          activeIndex={activeServiceIndex}
          onSelectIndex={setActiveServiceIndex}
        />
        <WorksSection />
        <FAQSection faqs={faqs} />
        <ContactSection siteUrl={process.env.NEXT_PUBLIC_SITE_URL} />
      </main>

      <Footer />
      <MobileCTA />
      <InstagramButton />
      <BackToTop />
    </div>
  );
}