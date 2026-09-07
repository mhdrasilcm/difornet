"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { works, type Work } from "@/lib/data";
import { ExternalLink, X, Play, Loader2, Construction } from "lucide-react";

function ComingSoonCard({ work, index }: { work: Work; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="bento-tile flex h-72 flex-col items-center justify-center p-8 text-center">
        <div className="icon-chip mb-5 h-16 w-16">
          <Construction className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Coming Soon</h3>
        <p className="mt-2 max-w-xs text-sm opacity-70">{work.description}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {work.tags.map((tag) => (
            <span key={tag} className="work-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group"
    >
      <div className="bento-tile relative flex h-72 flex-col overflow-hidden p-0">
        <div className="work-visual" aria-hidden />

        <div className="relative flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span key={tag} className="work-badge">
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-tight">{work.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70 line-clamp-2">
              {work.description}
            </p>

            {work.liveUrl ? (
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onPreview(work)}
                  className="btn-primary flex-1 px-4 py-2.5 text-sm"
                >
                  <Play className="h-4 w-4" aria-hidden />
                  Live Preview
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
            ) : (
              <div className="mt-5 flex items-center gap-2 text-sm opacity-60">
                <Play className="h-4 w-4" aria-hidden />
                Project preview coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Full-screen, touch-friendly preview modal. Rendered as a fixed overlay
 * (not inline inside the card) so it gets real screen real-estate on
 * mobile, locks background scroll while open, and is dismissible via the
 * close button, a backdrop tap, or Escape.
 */
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

  // Some sites block being framed entirely (X-Frame-Options / CSP
  // frame-ancestors). The iframe's onLoad still fires for a blocked frame
  // in most browsers, so a timeout is the only reliable signal — if it's
  // still "loading" after a few seconds, offer the new-tab fallback
  // instead of leaving a spinner running forever.
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
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/10 bg-white px-4 py-2.5 dark:border-white/10 dark:bg-off-black">
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
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white dark:bg-off-black">
              <div className="text-center">
                <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-accent" aria-hidden />
                <p className="text-sm opacity-70">Loading preview…</p>
              </div>
            </div>
          ) : null}

          {failed ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white p-8 text-center dark:bg-off-black">
              <div>
                <p className="text-sm opacity-70">
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
    <section
      id="works"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="spatial-orb -right-10 top-1/3 h-72 w-72 opacity-10" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="02" eyebrow="Portfolio" title="Selected Works" />

        {/* 1 column on mobile, 2 from md, 3 from lg. */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) =>
            work.status === "coming-soon" ? (
              <ComingSoonCard key={work.id} work={work} index={index} />
            ) : (
              <WorkCard
                key={work.id}
                work={work}
                index={index}
                onPreview={setPreviewWork}
              />
            )
          )}
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
