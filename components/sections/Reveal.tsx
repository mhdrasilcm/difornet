"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealProps {
  delay?: number;
  className?: string;
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  duration?: number;
  once?: boolean;
}

const variants = {
  hidden: (direction: string) => ({
    opacity: 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
    x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
    scale: direction === "scale" ? 0.8 : 1,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function RevealLi({
  delay = 0,
  className = "",
  children,
  direction = "up",
  duration = 0.7,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60, transition: { delay, duration } },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            delay, 
            duration,
            ease: [0.25, 0.46, 0.45, 0.94]
          } 
        },
      }}
      className={`${className}`}
    >
      {children}
    </motion.li>
  );
}

export function RevealDiv({
  delay = 0,
  className = "",
  children,
  direction = "up",
  duration = 0.7,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { 
          opacity: 0, 
          y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
          x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
          scale: direction === "scale" ? 0.8 : 1,
          transition: { delay, duration } 
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          x: 0,
          scale: 1,
          transition: { 
            delay, 
            duration,
            ease: [0.25, 0.46, 0.45, 0.94]
          } 
        },
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{
          delay,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FloatingOrb({
  className = "",
  delay = 0,
  size = "h-80 w-80",
}: {
  className?: string;
  delay?: number;
  size?: string;
}) {
  return (
    <motion.div
      className={`spatial-orb ${size} ${className}`}
      aria-hidden
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0, -20, 0],
        scale: [1, 1.05, 1, 1.08, 1],
        opacity: [0.22, 0.3, 0.22, 0.28, 0.22],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function ParallaxSection({
  children,
  speed = 0.1,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setOffset(rect.y * speed);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y: offset }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
