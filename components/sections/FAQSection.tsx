"use client";

import { RevealDiv } from "./Reveal";
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
      className="relative border-t border-black/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="03" eyebrow="Questions" title="FAQ" />
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <RevealDiv key={faq.question} delay={index * 60}>
              <details className="faq-card faq-item">
                <summary className="flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold tracking-tight">
                    {faq.question}
                  </span>
                  <span className="text-accent">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed opacity-70">
                  {faq.answer}
                </p>
              </details>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
