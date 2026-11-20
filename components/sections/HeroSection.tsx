"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { works } from "@/lib/data";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWork = works[activeIndex] ?? works[0];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
      <div
        className="engineer-grid pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Sharp Positioning */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--stripe-green)]" />
              Palakkad, Kerala · Open for work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display mt-5 text-4xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]"
            >
              Websites, apps &amp; tools{" "}
              <span className="text-accent">built to ship.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              One-person studio designing and engineering fast websites, web
              apps, and Android software directly with clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="btn-primary group px-6 py-3 text-sm"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#works" className="btn-secondary px-6 py-3 text-sm">
                View All Work
              </a>
            </motion.div>
          </div>

          {/* Right: Interactive Project Browser */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="studio-card overflow-hidden lg:col-span-7"
          >
            {/* Browser Chrome + Tab Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--stripe-red)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--stripe-gold)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--stripe-green)]" />
              </div>

              <div
                role="tablist"
                aria-label="Featured projects"
                className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--background)] p-1"
              >
                {works.map((work, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={work.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveIndex(index)}
                      className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        selected
                          ? "text-[var(--on-accent)]"
                          : "text-muted hover:text-[var(--foreground)]"
                      }`}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="hero-showcase-tab"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-full bg-[var(--foreground)]"
                        />
                      ) : null}
                      <span className="relative z-10">{work.title}</span>
                    </button>
                  );
                })}
              </div>

              {activeWork.liveUrl ? (
                <a
                  href={activeWork.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${activeWork.title}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-muted transition-colors hover:border-[var(--accent)] hover:text-accent"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-muted">
                  {activeWork.year}
                </span>
              )}
            </div>

            {/* Browser Viewport */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--background)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-full"
                >
                  {activeWork.imageUrl ? (
                    <Image
                      src={activeWork.imageUrl}
                      alt={`${activeWork.title} screenshot`}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  ) : (
                    <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                            {activeWork.category}
                          </span>
                          <h2 className="font-display mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                            {activeWork.title}
                          </h2>
                        </div>
                        <span className="tag-pill">{activeWork.year}</span>
                      </div>

                      <div className="my-auto py-4">
                        <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                          {activeWork.description}
                        </p>
                        <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed">
                          {activeWork.outcome}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {activeWork.tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href="#works"
                          className="font-mono text-xs font-medium text-accent hover:underline"
                        >
                          See details →
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}