"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="font-mono text-xs uppercase tracking-[0.16em] text-muted"
            >
              Independent Software Studio · Palakkad, Kerala
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="font-display mt-5 text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem]"
            >
              Thoughtful web &amp; mobile software,{" "}
              <em className="italic text-accent">built directly</em> with the
              person shipping it.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            >
              DiforNet is a one-person studio designing and engineering fast
              websites, web apps, and Android tools for businesses and founders
              who want clear work without agency bloat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="btn-primary group px-7 py-3.5 text-sm">
                Start a Conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#works" className="btn-secondary px-7 py-3.5 text-sm">
                See Selected Work
              </a>
            </motion.div>
          </div>

          {/* Right Studio Dispatch Card */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="studio-card p-6 sm:p-7 lg:col-span-5"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Studio Note
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--stripe-green)]">
                <span className="h-2 w-2 rounded-full bg-[var(--stripe-green)]" />
                Open for projects
              </span>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Focus
                </dt>
                <dd className="text-right font-medium">
                  Websites, Web Apps, Android
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Location
                </dt>
                <dd className="text-right font-medium">
                  Palakkad, Kerala (IST)
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Replies
                </dt>
                <dd className="text-right font-medium">
                  Within 2 business days
                </dd>
              </div>
            </dl>

            <div className="mt-6 pt-5 border-t border-[var(--border)]">
              <div className="tri-stripe-bar" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                No account managers or handoffs — every line of design and code
                is handled in one place.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}