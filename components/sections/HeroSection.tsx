"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowIcon } from "./Icons";
import { RevealDiv, FloatingOrb, RevealText } from "./Reveal";
import { Stat } from "@/types";
import { motion } from "framer-motion";

interface HeroSectionProps {
  stats: Stat[];
}

const floatVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32 gradient-bg">
      <div className="grid-backdrop" aria-hidden />
      
      {/* Animated floating orbs */}
      <FloatingOrb className="-right-20 -top-24" delay={0} size="h-80 w-80" />
      <FloatingOrb className="left-1/2 top-40" delay={2} size="h-64 w-64" />
      <FloatingOrb className="left-10 bottom-20" delay={4} size="h-48 w-48" />

      <div className="spatial-layer relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent neumo-raised-sm dark:border-white/10 dark:bg-white/5 hover:scale-105 transition-transform duration-300 cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
            Based in Palakkad, Kerala
          </p>
        </motion.div>

        <motion.h1 
          className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block">A one-person studio building{" "}</span>
          <span className="gradient-text inline-block">
            web, mobile, and embedded software.
          </span>
        </motion.h1>

        <motion.p 
          className="mt-8 max-w-2xl text-lg leading-relaxed opacity-70 lg:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Straightforward projects, direct communication, and work
          shipped from Kerala.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="#contact"
            className="btn-primary group px-7 py-3.5 text-sm"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Start a Project
            <ArrowIcon />
          </motion.a>
          <motion.a
            href="#works"
            className="btn-secondary group px-7 py-3.5 text-sm"
            whileHover={{ 
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View Work
            <ArrowIcon />
          </motion.a>
        </motion.div>

        <motion.dl 
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <RevealDiv
              key={stat.label}
              delay={index * 100}
              className="stat-tile group cursor-default"
              direction="scale"
            >
              <dt className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                {stat.label}
              </dt>
              <dd className="mt-2 text-xl font-semibold tracking-tight gradient-text group-hover:scale-110 transition-transform duration-300 origin-left">
                {stat.value}
              </dd>
            </RevealDiv>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
