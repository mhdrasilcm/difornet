"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { works } from "@/lib/data";
import { ExternalLink, X, Play, Loader2, Construction } from "lucide-react";

export function WorksSection() {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<string | null>(null);
  const iframeRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  const handlePreviewClick = (workId: string, url?: string) => {
    if (!url) return;
    
    if (activePreview === workId) {
      setActivePreview(null);
    } else {
      setLoadingPreview(workId);
      setActivePreview(workId);
      
      // Simulate loading time for better UX
      setTimeout(() => {
        setLoadingPreview(null);
      }, 1500);
    }
  };

  const handleIframeLoad = (workId: string) => {
    setLoadingPreview(null);
  };

  return (
    <section
      id="works"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="spatial-orb -right-10 top-1/3 h-72 w-72 opacity-10" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Portfolio"
          title="Selected Works"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {works.map((work, index) => {
            if (work.status === 'coming-soon') {
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Coming Soon Card */}
                  <div className="relative h-80 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-2xl animate-pulse" />
                      <div className="absolute bottom-10 right-10 w-16 h-16 bg-secondary rounded-full blur-2xl animate-pulse delay-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                      {/* Construction Icon with Animation */}
                      <motion.div
                        animate={{ 
                          rotate: [0, -10, 10, -5, 5, 0],
                          y: [0, -5, 0]
                        }}
                        transition={{ 
                          rotate: { duration: 2, repeat: Infinity },
                          y: { duration: 1.5, repeat: Infinity }
                        }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mb-6"
                      >
                        <Construction className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                        Coming Soon
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
                        {work.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {work.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Pulsing Dots */}
                      <div className="flex gap-2 mt-6">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                                    key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-amber-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Interactive Preview Card */}
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Card Background with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
                  
                  {/* Main Content Container */}
                  <div className={`relative h-full transition-all duration-500 ${activePreview === work.id ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                    {/* Thumbnail/Image Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                      {work.imageUrl ? (
                        <img
                          src={work.imageUrl}
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <Play className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-sm opacity-60">Project Preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {work.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-white/20 backdrop-blur-sm text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                        {work.title}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2 mb-4">
                        {work.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {work.liveUrl && (
                          <button
                            onClick={() => handlePreviewClick(work.id, work.liveUrl)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all duration-300 hover:scale-105"
                          >
                            <Play className="h-4 w-4" />
                            Live Preview
                          </button>
                        )}
                        {work.liveUrl && (
                          <a
                            href={work.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                            aria-label="Visit site"
                          >
                            <ExternalLink className="h-5 w-5 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Live Preview iframe */}
                  <AnimatePresence>
                    {activePreview === work.id && work.liveUrl && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
                      >
                        {/* Loading State */}
                        {loadingPreview === work.id && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                            <div className="text-center">
                              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3 text-primary" />
                              <p className="text-sm font-medium">Loading preview...</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Close Button */}
                        <button
                          onClick={() => setActivePreview(null)}
                          className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/80 hover:bg-black text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          <X className="h-4 w-4" />
                          Close Preview
                        </button>
                        
                        {/* iframe */}
                        <iframe
                          ref={(el) => {
                            iframeRefs.current[work.id] = el;
                          }}
                          src={work.liveUrl}
                          title={`${work.title} Preview`}
                          className="w-full h-full border-0"
                          onLoad={() => handleIframeLoad(work.id)}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
