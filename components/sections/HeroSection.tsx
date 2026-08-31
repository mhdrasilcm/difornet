"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowIcon } from "./Icons";
import { RevealDiv, FloatingOrb, RevealText, ParallaxSection } from "./Reveal";
import { Stat } from "@/types";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

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

// Advanced particle background component
function ParticleField() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Animated counter component for stats
function AnimatedCounter({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, rotate }}
      className="stat-tile group cursor-default relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        y: -8,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <dt className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-semibold tracking-tight gradient-text group-hover:scale-110 transition-transform duration-300 origin-left relative z-10">
        {value}
      </dd>
      
      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-[1.1rem] pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "inset 0 0 0 2px rgba(52, 211, 153, 0.4)",
        }}
      />
    </motion.div>
  );
}

export function HeroSection({ stats }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32 gradient-bg min-h-screen flex items-center"
    >
      <div className="grid-backdrop" aria-hidden />
      <ParticleField />
      
      {/* Animated floating orbs with parallax */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}>
        <FloatingOrb className="-right-20 -top-24" delay={0} size="h-80 w-80" />
      </motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}>
        <FloatingOrb className="left-1/2 top-40" delay={2} size="h-64 w-64" />
      </motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}>
        <FloatingOrb className="left-10 bottom-20" delay={4} size="h-48 w-48" />
      </motion.div>

      <motion.div 
        style={{ y, opacity, filter: `blur(${blur}px)` }}
        className="spatial-layer relative mx-auto max-w-6xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <motion.p 
            className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent neumo-raised-sm dark:border-white/10 dark:bg-white/5 hover:scale-105 transition-transform duration-300 cursor-default"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 10px 30px rgba(52, 211, 153, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            Based in Palakkad, Kerala
          </motion.p>
        </motion.div>

        <motion.h1 
          className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block">A one-person studio building{" "}</span>
          <motion.span 
            className="gradient-text inline-block"
            initial={{ backgroundPosition: "100% 50%" }}
            animate={{ backgroundPosition: "0% 50%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ backgroundSize: "200% 100%" }}
          >
            web, mobile, and embedded software.
          </motion.span>
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
            className="btn-primary group px-7 py-3.5 text-sm relative overflow-hidden"
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowIcon />
              </motion.span>
            </span>
          </motion.a>
          
          <motion.a
            href="#works"
            className="btn-secondary group px-7 py-3.5 text-sm relative overflow-hidden"
            whileHover={{ 
              scale: 1.08,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/10 scale-0"
              whileHover={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              View Work
              <ArrowIcon />
            </span>
          </motion.a>
        </motion.div>

        <motion.dl 
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </motion.dl>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-2"
          >
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
