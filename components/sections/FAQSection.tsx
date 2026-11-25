"use client";

import { PlusIcon } from "./Icons";
import { FAQ } from "@/types";
import { KineticLine } from "./KineticText";

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section
      id="faq"
      className="dashed-rule relative z-10 px-6 py-28 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="type-label text-[12px] text-[#dc5000]">
            03 — SPEC SHEET · FAQ
          </span>
          <h2 className="type-display mt-4 text-[41px] sm:text-[51px]">
            <KineticLine>COMMON</KineticLine>
            <KineticLine delay={0.08}>QUESTIONS.</KineticLine>
          </h2>
          <p className="type-prose mt-5 max-w-sm text-[20px] sm:text-[22px]">
            Straight answers on scope, timing, and how work is delivered.
          </p>
        </div>

        <div className="dashed-rule lg:col-span-7">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-row">
              <summary className="flex items-center justify-between gap-4">
                <span className="type-label text-[14px] sm:text-[16px]">
                  {faq.question}
                </span>
                <span className="faq-icon shrink-0 text-[#6c5f51]">
                  <PlusIcon />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-[1.45] text-[#ffedd7]/80">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}