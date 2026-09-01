"use client";

import { motion } from "framer-motion";
import { RevealDiv } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { services } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="01" eyebrow="What I Do" title="Services" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Glassmorphic Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-full p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Spotlight Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Animated Background Orbs */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with Floating Animation */}
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="h-7 w-7 text-primary dark:text-primary-light" />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description - Reveals on Hover */}
                    <motion.div
                      initial={{ opacity: 0.7, height: 'auto' }}
                      whileHover={{ opacity: 1 }}
                      className="mb-4"
                    >
                      <p className="text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                    
                    {/* Features List */}
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center text-xs opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
