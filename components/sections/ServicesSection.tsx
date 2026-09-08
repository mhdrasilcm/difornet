"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ArrowIcon } from "./Icons";
import { services } from "@/lib/data";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="spatial-orb -left-16 top-0 h-72 w-72 opacity-10" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="01" eyebrow="What I Do" title="Services" />

        {/* 1 column on mobile, 2 from md, 3 from lg. Only give the
            trailing card the wide `bento-feature` treatment when it would
            otherwise sit alone in the final lg row (i.e. total count % 3
            === 1) — with 5 services the last row is a balanced pair, so
            no special-casing is needed there. */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isOrphan =
              index === services.length - 1 && services.length % 3 === 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`group ${isOrphan ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className={`relative h-full p-7 ${
                    isOrphan ? "bento-tile bento-feature" : "bento-tile"
                  }`}
                >
                  <div className="icon-chip icon-chip-tilt mb-5">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed opacity-70">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-xs opacity-80"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="group/link relative z-10 mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent"
                  >
                    Learn more
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
