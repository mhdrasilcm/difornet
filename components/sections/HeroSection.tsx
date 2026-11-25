"use client";

import { Play, ArrowDownRight } from "lucide-react";
import { KineticLine } from "./KineticText";
import { works } from "@/lib/data";

export function HeroSection() {
  const featured = works[0];

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between px-6 pb-10 pt-28 lg:px-10 lg:pb-10 lg:pt-28">
      {/* Right-Margin Vertical Serial Label */}
      <div
        className="pointer-events-none fixed right-3 top-1/2 z-20 hidden -translate-y-1/2 lg:flex"
        aria-hidden
      >
        <span className="vertical-serial">DIFORNET · STUDIO-01 · IN</span>
      </div>

      {/* Upper-Left Lockup */}
      <div className="relative z-10 max-w-4xl pt-4 lg:pt-8">
        <p className="type-label mb-5 text-[12px] tracking-[0.12em]">
          MADE FOR SPEED, BUILT FOR REAL WORK.{" "}
          <span className="text-[#dc5000]">PALAKKAD, KERALA.</span>
        </p>

        <h1 className="type-display text-[44px] sm:text-[64px] lg:text-[84px]">
          <KineticLine delay={0.04}>SOFTWARE</KineticLine>
          <KineticLine delay={0.12}>WITHOUT</KineticLine>
          <KineticLine delay={0.2}>BLOAT.</KineticLine>
        </h1>

        <p className="type-prose mt-7 max-w-lg text-[20px] sm:text-[24px] lg:text-[26px]">
          Designed and engineered directly with the person shipping it. Websites,
          web apps, and Android tools that feel considered.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#contact" className="btn-pill-filled">
            Start a Project
          </a>
          <a href="#services" className="btn-ghost-outline">
            Explore Capabilities
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      {/* Bottom Corners: Attribution Card (left) + Preview Card (right) */}
      <div className="relative z-10 mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="darkroom-card max-w-xs p-5">
          <p className="type-label text-[11px] tracking-[0.06em]">
            ENGINEERED BY{" "}
            <span className="text-[#dc5000]">DIFORNET STUDIO</span>, INDEPENDENT
            PRACTICE.
          </p>
          <div className="dashed-rule my-3" />
          <p className="text-[13px] leading-[1.35] text-[#ffedd7]/80">
            One-person studio. Direct communication, zero agency handoffs,
            clean static &amp; edge delivery.
          </p>
        </div>

        <a
          href="#works"
          className="darkroom-card group flex items-center gap-4 p-4 transition-colors hover:border-[#ffedd7]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-dashed border-[#40372e] bg-[#382416] text-[#ffedd7] transition-colors group-hover:bg-[#dc5000] group-hover:text-[#100904]">
            <Play className="h-4 w-4 fill-current" aria-hidden />
          </div>
          <div>
            <p className="type-label text-[11px] tracking-[0.08em] text-[#dc5000]">
              LATEST BUILD · {featured.year}
            </p>
            <p className="type-label mt-1 text-[13px]">
              {featured.title}
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}