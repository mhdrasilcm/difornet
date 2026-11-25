"use client";

import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/data";

interface ServicesSectionProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function ServicesSection({
  activeIndex,
  onSelectIndex,
}: ServicesSectionProps) {
  const current = services[activeIndex] ?? services[0];

  return (
    <section
      id="services"
      className="dashed-rule relative z-10 flex min-h-[100dvh] flex-col justify-between px-6 py-24 lg:px-10"
    >
      {/* Top Bar + Interactive Discipline Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="type-label text-[12px] text-[#dc5000]">
          01 — VOID MODE · CAPABILITIES
        </span>

        <div
          role="tablist"
          aria-label="Capabilities"
          className="flex flex-wrap gap-2"
        >
          {services.map((service, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onSelectIndex(idx)}
                className={selected ? "btn-ghost-outline" : "btn-ghost-muted"}
              >
                {service.index} · {service.title.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Flanking Void Reveal (Text / 3D Artifact / Text) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto grid gap-[18px] py-16 lg:grid-cols-12 lg:items-center"
        >
          {/* Left 41px Uppercase Statement */}
          <div className="lg:col-span-4">
            <p className="type-label mb-3 text-[11px] text-[#dc5000]">
              DISCIPLINE {current.index}
            </p>
            <h2 className="type-display text-[34px] sm:text-[41px]">
              {current.title}
            </h2>
          </div>

          {/* Center Breathing Room for the 3D Monolith */}
          <div className="hidden h-72 lg:col-span-4 lg:block" aria-hidden />

          {/* Right Mixed-Case 400 Conversational Voice */}
          <div className="darkroom-card p-6 lg:col-span-4 lg:border-none lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <p className="type-prose text-[22px] sm:text-[26px] lg:text-[29px]">
              {current.description}
            </p>

            <div className="dashed-rule my-6" />

            <ul className="space-y-2.5">
              {current.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.06em]"
                >
                  <span className="text-[#6c5f51]">INCLUDED</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Micro Legal / Spec Line */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#40372e] pt-6">
        <span className="type-micro-legal">
          * ZERO BLOAT · CLEAN CODE · BUILT IN KERALA
        </span>
        <a
          href="#contact"
          className="type-label border-b border-dashed border-[#ffedd7] pb-0.5 text-[12px] hover:border-[#dc5000] hover:text-[#dc5000]"
        >
          SCOPE THIS DISCIPLINE
        </a>
      </div>
    </section>
  );
}