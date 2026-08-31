"use client";

import { RevealLi } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Work } from "@/types";

interface WorksSectionProps {
  works: Work[];
}

const workSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
];

export function WorksSection({ works }: WorksSectionProps) {
  return (
    <section
      id="works"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="spatial-orb -right-10 top-1/3 h-72 w-72 opacity-10" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Portfolio"
          title="Selected Works"
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[170px]">
          {works.map((work, index) => (
            <RevealLi
              key={work.title}
              delay={index * 90}
              className={`${workSpans[index]} ${
                index === 0 ? "bento-feature" : "bento-tile"
              } group relative flex flex-col justify-between overflow-hidden`}
            >
              {index === 0 ? <span className="work-visual animate-pulse" aria-hidden /> : null}
              <div className="relative z-10 flex items-start justify-between">
                <span className="work-badge group-hover:scale-105 transition-transform duration-300 ease-out">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
                  {work.subtitle}
                </span>
                <span className="bento-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-xl font-semibold tracking-tight gradient-text">
                  {work.title}
                </p>
                {work.description ? (
                  <p className="mt-3 max-w-md text-sm leading-relaxed opacity-70">
                    {work.description}
                  </p>
                ) : null}
              </div>
            </RevealLi>
          ))}
        </ul>
      </div>
    </section>
  );
}
