"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

export function KineticLine({
  children,
  delay = 0,
  immediate = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={immediate ? { y: "0%", opacity: 1 } : undefined}
        whileInView={immediate ? undefined : { y: "0%", opacity: 1 }}
        viewport={immediate ? undefined : { once: true, amount: "some" }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function DarkroomSpotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!finePointer) return;

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(255, 237, 215, 0.055), transparent 70%)`,
      }}
    />
  );
}