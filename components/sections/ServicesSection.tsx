"use client";

import { RevealDiv } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceGlyph } from "./Icons";
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

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="01" eyebrow="What I Do" title="Services" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]">
          {services.map((service, index) => (
            <RevealDiv
              key={service.title}
              delay={index * 90}
              className={`${serviceSpans[index]} ${
                index === 0 ? "bento-feature bento-feature-glow" : "bento-tile"
              } flex flex-col justify-between group`}
            >
              <div className="flex items-start justify-between">
                <span className="icon-chip group-hover:scale-110 transition-transform duration-300 ease-out">
                  <ServiceGlyph index={index} />
                </span>
                <span className="bento-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight lg:text-xl gradient-text">
                  {service.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed opacity-70">
                  {service.description}
                </p>
              </div>
            </RevealDiv>
          ))}
        </ul>
      </div>
    </section>
  );
}
