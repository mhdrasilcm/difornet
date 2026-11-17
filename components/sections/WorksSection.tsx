"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { works } from "@/lib/data";
import { Work } from "@/types";
import { ExternalLink, X, Play, Loader2 } from "lucide-react";

function WorkCard({
  work,
  index,
  onPreview,
}: {
  work: Work;
  index: number;
  onPreview: (work: Work) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-60px" }}
      className="studio-card studio-card-hover flex flex-col overflow-hidden"
    >
      {/* Preview Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
        {work.imageUrl ? (
          <Image
            src={work.imageUrl}
            alt={`${work.title} preview`}
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="paper-grain flex h-full flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {work.category}
              </span>
              <span className="font-mono text-xs text-muted">{work.year}</span>
            </div>
            <div>
              <p className="font-display text-3xl italic tracking-tight opacity-85">
                {work.title}
              </p>
              <div className="tri-stripe-bar mt-4 max-w-[96px]" aria-hidden>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              {work.category}
            </span>
            <span className="font-mono text-xs text-muted">{work.year}</span>
          </div>

          <h3 className="font-display mt-2 text-2xl font-medium tracking-tight">
            {work.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {work.description}
          </p>
          <p className="mt-3 text-sm leading-relaxed opacity-90">
            {work.outcome}
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-[var(--border)]">
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {work.liveUrl ? (
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onPreview(work)}
                className="btn-primary flex-1 px-5 py-2.5 text-sm"
              >
                <Play className="h-4 w-4" aria-hidden />
                Interactive Preview
              </button>
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${work.title} in a new tab`}
                className="btn-icon h-11 w-11 shrink-0"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function PreviewModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const scrollPositionRef = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    scrollPositionRef.current = window.scrollY;
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.setAttribute("data-scroll-locked", "true");
    closeButtonRef.current?.focus();

    return () => {
      document.body.removeAttribute("data-scroll-locked");
      document.body.style.top = "";
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading((current) => {
        if (current) setFailed(true);
        return current;
      });
    }, 6000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="work-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${work.title} live preview`}
        className="work-modal-panel"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--background)] px-4 py-2.5">
          <p className="truncate text-sm font-medium">{work.title}</p>
          <div className="flex shrink-0 items-center gap-2">
            {work.liveUrl ? (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon h-11 w-11"
                aria-label="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="btn-icon h-11 w-11"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--background)]">
              <div className="text-center">
                <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-accent" aria-hidden />
                <p className="text-sm text-muted">Loading preview…</p>
              </div>
            </div>
          ) : null}

          {failed ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--background)] p-8 text-center">
              <div>
                <p className="text-sm text-muted">
                  This preview is taking longer than expected — the site may
                  not allow embedding.
                </p>
                {work.liveUrl ? (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-4 inline-flex px-5 py-2.5 text-sm"
                  >
                    Open in new tab
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          {work.liveUrl ? (
            <iframe
              src={work.liveUrl}
              title={`${work.title} preview`}
              className="h-full w-full border-0"
              style={{ WebkitOverflowScrolling: "touch" }}
              onLoad={() => setLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function WorksSection() {
  const [previewWork, setPreviewWork] = useState<Work | null>(null);
  const closePreview = useCallback(() => setPreviewWork(null), []);

  return (
    <section id="works" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="02" eyebrow="Selected Work" title="Projects" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {works.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              onPreview={setPreviewWork}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewWork ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PreviewModal work={previewWork} onClose={closePreview} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}