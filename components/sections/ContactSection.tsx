"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldErrors, FormStatus } from "@/types";
import { KineticLine } from "./KineticText";

interface ContactSectionProps {
  siteUrl?: string;
}

export function ContactSection({ siteUrl }: ContactSectionProps) {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validateContactForm(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors: FieldErrors = {};
    if (!name) errors.name = "Please enter your name.";
    if (!email) {
      errors.email = "Please enter your email.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!message) errors.message = "Please add a short message.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!validateContactForm(form)) {
      setFormStatus("error");
      return;
    }

    setFormStatus("loading");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus("success");
        setFieldErrors({});
        form.reset();
        router.push("/thank-you");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="dashed-rule relative z-10 px-6 py-28 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <span className="type-label text-[12px] text-[#dc5000]">
            04 — DISPATCH · CONTACT
          </span>
          <h2 className="type-display mt-4 text-[41px] sm:text-[51px]">
            <KineticLine>START A</KineticLine>
            <KineticLine delay={0.08}>PROJECT.</KineticLine>
          </h2>
          <p className="type-prose mt-5 max-w-md text-[22px] sm:text-[26px]">
            Share a rough idea, a timeline, or a link to an existing site.
          </p>

          <dl className="dashed-rule mt-10 space-y-4 pt-6 text-[12px] font-medium uppercase tracking-[0.06em]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#6c5f51]">AVAILABILITY</dt>
              <dd className="text-[#dc5000]">OPEN FOR PROJECTS</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#6c5f51]">RESPONSE</dt>
              <dd>WITHIN 2 BUSINESS DAYS</dd>
            </div>
          </dl>
        </div>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          onSubmit={handleContactSubmit}
          className="darkroom-card space-y-6 p-6 sm:p-8 lg:col-span-7"
        >
          <input
            type="hidden"
            name="access_key"
            value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""}
          />
          <input
            type="hidden"
            name="subject"
            value="DiforNet — New contact / booking"
          />
          <input
            type="hidden"
            name="redirect"
            value={`${siteUrl ?? "https://difornet.pages.dev"}/thank-you`}
          />

          <div>
            <label
              htmlFor="name"
              className="type-label mb-1 block text-[11px] text-[#6c5f51]"
            >
              NAME
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={fieldErrors.name ? "true" : undefined}
              aria-describedby="name-error"
              className="input-underline"
            />
            <p
              id="name-error"
              className="field-error"
              data-visible={fieldErrors.name ? "true" : "false"}
            >
              {fieldErrors.name}
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="type-label mb-1 block text-[11px] text-[#6c5f51]"
            >
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@domain.com"
              autoComplete="email"
              aria-invalid={fieldErrors.email ? "true" : undefined}
              aria-describedby="email-error"
              className="input-underline"
            />
            <p
              id="email-error"
              className="field-error"
              data-visible={fieldErrors.email ? "true" : "false"}
            >
              {fieldErrors.email}
            </p>
          </div>

          <div>
            <label
              htmlFor="message"
              className="type-label mb-1 block text-[11px] text-[#6c5f51]"
            >
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="What are we building?"
              aria-invalid={fieldErrors.message ? "true" : undefined}
              aria-describedby="message-error"
              className="input-underline resize-none"
            />
            <p
              id="message-error"
              className="field-error"
              data-visible={fieldErrors.message ? "true" : "false"}
            >
              {fieldErrors.message}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="btn-pill-filled disabled:opacity-60"
            >
              {formStatus === "loading" ? "SENDING…" : "SEND MESSAGE"}
            </button>

            <p aria-live="polite" className="text-xs uppercase">
              {formStatus === "success" ? (
                <span className="text-[#ffedd7]">
                  RECEIVED — REPLY WITHIN 2 BUSINESS DAYS.
                </span>
              ) : null}
              {formStatus === "error" ? (
                <span className="text-[#dc5000]">
                  {Object.keys(fieldErrors).length > 0
                    ? "FIX HIGHLIGHTED FIELDS ABOVE."
                    : "SOMETHING WENT WRONG. TRY AGAIN."}
                </span>
              ) : null}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}