"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowIcon } from "./Icons";
import { RevealDiv } from "./Reveal";
import { Stat } from "@/types";

interface HeroSectionProps {
  stats: Stat[];
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32 gradient-bg">
      <div className="grid-backdrop" aria-hidden />
      <div className="spatial-orb -right-20 -top-24 h-80 w-80" aria-hidden />
      <div className="spatial-orb left-1/2 top-40 h-64 w-64 opacity-10" aria-hidden />

      <div className="spatial-layer relative mx-auto max-w-6xl">
        <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent neumo-raised-sm dark:border-white/10 dark:bg-white/5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
          Based in Palakkad, Kerala
        </p>

        <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
          A one-person studio building{" "}
          <span className="gradient-text">
            web, mobile, and embedded software.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-70 lg:text-xl">
          Straightforward projects, direct communication, and work
          shipped from Kerala.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="btn-primary group px-7 py-3.5 text-sm"
          >
            Start a Project
            <ArrowIcon />
          </a>
          <a
            href="#works"
            className="btn-secondary group px-7 py-3.5 text-sm"
          >
            View Work
            <ArrowIcon />
          </a>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealDiv
              key={stat.label}
              delay={index * 80}
              className="stat-tile"
            >
              <dt className="font-mono text-xs uppercase tracking-widest opacity-60">
                {stat.label}
              </dt>
              <dd className="mt-2 text-xl font-semibold tracking-tight gradient-text">
                {stat.value}
              </dd>
            </RevealDiv>
          ))}
        </dl>
      </div>
    </section>
  );
}
