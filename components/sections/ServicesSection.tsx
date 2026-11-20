"use client";

import { motion } from "framer-motion";
import { Layout, Code2, Smartphone, Server } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ArrowIcon } from "./Icons";
import { services } from "@/lib/data";

const serviceIcons = [Layout, Code2, Smartphone, Server];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="border-t border-[var(--border)] bg-[var(--surface)]/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="01" eyebrow="Capabilities" title="What I Build" />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Layout;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-60px" }}
                className="group flex flex-col justify-between bg-[var(--surface-elevated)] p-7 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors group-hover:border-[var(--accent)] group-hover:text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-muted">
                      {service.index}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-2xl font-bold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {service.description}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.map((item) => (
                      <span key={item} className="tag-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-accent"
                  >
                    Start
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}