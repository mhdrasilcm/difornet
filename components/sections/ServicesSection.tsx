"use client";

import { motion } from "framer-motion";
import { RevealDiv } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Code, Smartphone, Cpu, Globe } from "lucide-react";
import { Service } from "@/types";

interface ServicesSectionProps {
  services: Service[];
}

const serviceSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

const serviceIcons = [Code, Globe, Smartphone, Cpu];

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="01" eyebrow="What I Do" title="Services" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[index] || Code;
            return (
              <RevealDiv
                key={service.title}
                delay={index * 90}
                className={`${serviceSpans[index]} ${
                  index === 0 ? "bento-feature bento-feature-glow" : "bento-tile"
                } flex flex-col justify-between group`}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start justify-between"
                >
                  <span className="icon-chip group-hover:scale-110 transition-transform duration-300 ease-out">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <span className="bento-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg font-semibold tracking-tight lg:text-xl gradient-text">
                    {service.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">
                    {service.description}
                  </p>
                </motion.div>
              </RevealDiv>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
