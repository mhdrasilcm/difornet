"use client";

import { SectionHeading } from "./SectionHeading";
import { PlusIcon } from "./Icons";
import { FAQ } from "@/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section
      id="faq"
      className="border-t border-[var(--border)] bg-[var(--surface)]/55"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading index="03" eyebrow="Questions" title="FAQ" />
            <p className="text-sm leading-relaxed text-muted">
              Plain answers about how projects are scoped, priced, and shipped.
            </p>
          </div>

          <div className="border-t border-[var(--border)] lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-row">
                <summary className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold tracking-tight sm:text-lg">
                    {faq.question}
                  </span>
                  <span className="faq-icon shrink-0 text-muted">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}