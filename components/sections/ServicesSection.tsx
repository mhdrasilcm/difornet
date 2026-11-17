"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ArrowIcon } from "./Icons";
import { services } from "@/lib/data";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="border-t border-[var(--border)] bg-[var(--surface)]/55"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="01" eyebrow="Capabilities" title="What I Build" />

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-6 py-8 md:grid-cols-12 md:items-start"
            >
              <div className="flex items-baseline gap-4 md:col-span-5">
                <span className="font-mono text-xs tracking-widest text-accent">
                  {service.index}
                </span>
                <h3 className="font-display text-2xl font-medium tracking-tight lg:text-[1.75rem]">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-muted md:col-span-4 lg:text-base">
                {service.description}
              </p>

              <div className="flex flex-col items-start gap-3 md:col-span-3 md:items-end">
                <div className="flex flex-wrap gap-1.5 md:justify-end">
                  {service.deliverables.map((item) => (
                    <span key={item} className="tag-pill">
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent"
                >
                  Discuss this
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}