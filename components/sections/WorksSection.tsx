"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Play, Loader2 } from "lucide-react";
import { works } from "@/lib/data";
import { Work } from "@/types";
import { KineticLine } from "./KineticText";

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
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-dashed border-[#40372e] bg-[#100904] px-5 py-3">
          <p className="type-label truncate text-[12px]">{work.title}</p>
          <div className="flex shrink-0 items-center gap-2">
            {work.liveUrl ? (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-muted h-11 w-11 px-0"
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
              className="btn-ghost-muted h-11 w-11 px-0"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#100904]">
              <div className="text-center">
                <Loader2
                  className="mx-auto mb-3 h-7 w-7 animate-spin text-[#dc5000]"
                  aria-hidden
                />
                <p className="type-label text-[11px]">LOADING PREVIEW…</p>
              </div>
            </div>
          ) : null}

          {failed ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#100904] p-8 text-center">
              <div>
                <p className="text-sm text-[#ffedd7]/80">
                  Preview timed out — this site may block embedding.
                </p>
                {work.liveUrl ? (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-outline mt-5"
                  >
                    Open in new tab
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
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
    <section
      id="works"
      className="dashed-rule relative z-10 px-6 py-28 lg:px-10"
    >
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="type-label text-[12px] text-[#dc5000]">
            02 — ARTIFACTS · SHIPPED WORK
          </span>
          <h2 className="type-display mt-4 text-[41px] sm:text-[51px]">
            <KineticLine>SELECTED</KineticLine>
            <KineticLine delay={0.08}>PROJECTS.</KineticLine>
          </h2>
        </div>

        <p className="type-prose max-w-md text-[20px] sm:text-[24px]">
          Real sites shipped for real clients — built without templates.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
        {works.map((work, index) => (
          <motion.article
            key={work.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="darkroom-card flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-dashed border-[#40372e]">
              {work.imageUrl ? (
                <Image
                  src={work.imageUrl}
                  alt={`${work.title} preview`}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full flex-col justify-between bg-[#100904]/85 p-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.08em]">
                    <span className="text-[#dc5000]">{work.category}</span>
                    <span className="text-[#6c5f51]">ISSUE · {work.year}</span>
                  </div>
                  <div>
                    <p className="type-display text-[32px] sm:text-[38px]">
                      {work.title}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="type-prose text-[20px] sm:text-[22px]">
                  {work.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#ffedd7]/75">
                  {work.outcome}
                </p>
              </div>

              <div className="dashed-rule mt-6 pt-5">
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[22.5px] border border-[#40372e] px-3 py-1 text-[11px] font-medium uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {work.liveUrl ? (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewWork(work)}
                      className="btn-pill-filled"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                      Interactive Preview
                    </button>
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-muted"
                    >
                      Visit
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
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