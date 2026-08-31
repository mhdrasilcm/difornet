"use client";

import { RevealLi } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Work } from "@/types";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface WorksSectionProps {
  works: Work[];
}

const workSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
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

export function WorksSection({ works }: WorksSectionProps) {
  return (
    <section
      id="works"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="spatial-orb -right-10 top-1/3 h-72 w-72"
        aria-hidden
        animate={{
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="spatial-orb left-0 bottom-1/4 h-64 w-64"
        aria-hidden
        animate={{
          opacity: [0.08, 0.12, 0.08],
          scale: [1, 1.05, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            index="02"
            eyebrow="Portfolio"
            title="Selected Works"
          />
        </motion.div>
        
        <motion.ul 
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[170px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {works.map((work, index) => (
            <RevealLi
              key={work.title}
              delay={index * 90}
              className={`${workSpans[index]} ${
                index === 0 ? "bento-feature" : "bento-tile"
              } group relative flex flex-col justify-between overflow-hidden cursor-pointer`}
              direction="scale"
              duration={0.6}
            >
              {/* Animated visual panel */}
              {index === 0 && (
                <motion.span 
                  className="work-visual"
                  aria-hidden
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
              
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(52, 211, 153, 0.05) 0%, transparent 50%)",
                    "linear-gradient(135deg, transparent 0%, rgba(52, 211, 153, 0.1) 50%, transparent 100%)",
                    "linear-gradient(135deg, rgba(52, 211, 153, 0.05) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div 
                className="relative z-10 flex items-start justify-between"
                initial={{ y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span 
                  className="work-badge group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 ease-out"
                  whileHover={{ 
                    boxShadow: "0 10px 30px rgba(52, 211, 153, 0.2)",
                  }}
                >
                  <motion.span 
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {work.subtitle}
                </motion.span>
                <span className="bento-index group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
              
              <motion.div 
                className="relative z-10"
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.p 
                  className="text-xl font-semibold tracking-tight gradient-text flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  {work.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.p>
                {work.description ? (
                  <motion.p 
                    className="mt-3 max-w-md text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, x: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    {work.description}
                  </motion.p>
                ) : null}
                
                {/* View project link on hover */}
                <motion.div
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </motion.div>
              </motion.div>
              
              {/* Border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-[1.3rem] pointer-events-none -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: "inset 0 0 0 2px rgba(52, 211, 153, 0.3)",
                }}
              />
            </RevealLi>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
