"use client";

import { RevealDiv } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceGlyph } from "./Icons";
import { Service } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ServicesSectionProps {
  services: Service[];
}

const serviceSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export function ServicesSection({ services }: ServicesSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="services"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg overflow-hidden"
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 211, 153, 0.1), transparent 40%)`,
        }}
      />
      
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading index="01" eyebrow="What I Do" title="Services" />
        </motion.div>
        
        <motion.ul 
          className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <RevealDiv
              key={service.title}
              delay={index * 90}
              className={`${serviceSpans[index]} ${
                index === 0 ? "bento-feature bento-feature-glow" : "bento-tile"
              } flex flex-col justify-between group cursor-pointer`}
              direction="scale"
              duration={0.6}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(52, 211, 153, 0.05) 0%, transparent 50%)",
                    "linear-gradient(135deg, transparent 0%, rgba(52, 211, 153, 0.08) 50%, transparent 100%)",
                    "linear-gradient(135deg, rgba(52, 211, 153, 0.05) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div 
                className="flex items-start justify-between relative z-10"
                onMouseEnter={() => setHoveredTile(index)}
                onMouseLeave={() => setHoveredTile(null)}
              >
                <motion.span 
                  className="icon-chip group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 12,
                    boxShadow: "0 10px 30px rgba(52, 211, 153, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ServiceGlyph index={index} />
                </motion.span>
                <span className="bento-index group-hover:scale-110 transition-transform duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
              
              <motion.div className="relative z-10">
                <motion.p 
                  className="text-lg font-semibold tracking-tight lg:text-xl gradient-text"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.title}
                </motion.p>
                <motion.p 
                  className="mt-2 text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
              
              {/* Glow effect on hover */}
              {hoveredTile === index && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-[1.4rem] blur-xl -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </RevealDiv>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
