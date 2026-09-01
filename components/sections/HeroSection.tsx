"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
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
      <div className="spatial-orb right-1/3 bottom-0 h-96 w-96 opacity-5" aria-hidden />

      <div className="spatial-layer relative mx-auto max-w-6xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent neumo-raised-sm dark:border-white/10 dark:bg-white/5 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden />
          <MapPin className="h-3 w-3" />
          Based in Palakkad, Kerala
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl xl:text-8xl"
        >
          A one-person studio building{" "}
          <span className="gradient-text inline-block mt-2">
            web, mobile, and embedded software.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed opacity-70 lg:text-xl"
        >
          Straightforward projects, direct communication, and work
          shipped from Kerala.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="btn-primary group px-8 py-4 text-sm"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#works"
            className="btn-secondary group px-8 py-4 text-sm"
          >
            View Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <dl className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealDiv
              key={stat.label}
              delay={index * 80}
              className="stat-tile hover-lift"
            >
              <dt className="font-mono text-xs uppercase tracking-widest opacity-60">
                {stat.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight gradient-text">
                {stat.value}
              </dd>
            </RevealDiv>
          ))}
        </dl>
      </div>
    </section>
  );
}
