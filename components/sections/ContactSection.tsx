"use client";

import { FormEvent, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { FieldErrors, FormStatus } from "@/types";

interface ContactSectionProps {
  siteUrl?: string;
}

export function ContactSection({ siteUrl }: ContactSectionProps) {
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
        window.location.href = "/thank-you";
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Get In Touch"
          title="Let's Talk"
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="studio-panel p-8 lg:col-span-5">
            <h3 className="font-display text-3xl font-medium tracking-tight lg:text-4xl">
              Have something in mind?{" "}
              <em className="italic text-accent">Let&apos;s scope it.</em>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Share a rough idea, a timeline, or a link to an existing site that
              needs an overhaul.
            </p>

            <dl className="mt-8 space-y-4 border-t border-[var(--border)] pt-6 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Availability
                </dt>
                <dd className="font-medium text-[var(--stripe-green)]">
                  Accepting new projects
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Response
                </dt>
                <dd className="font-medium">Within 2 business days</dd>
              </div>
            </dl>
          </div>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={handleContactSubmit}
            className="studio-card space-y-4 p-8 lg:col-span-7"
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
              value={`${
                siteUrl ?? "https://difornet.pages.dev"
              }/thank-you`}
            />

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-invalid={fieldErrors.name ? "true" : undefined}
                aria-describedby="name-error"
                className="input-field"
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
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-invalid={fieldErrors.email ? "true" : undefined}
                aria-describedby="email-error"
                className="input-field"
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
                className="mb-2 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                aria-invalid={fieldErrors.message ? "true" : undefined}
                aria-describedby="message-error"
                className="input-field resize-none"
              />
              <p
                id="message-error"
                className="field-error"
                data-visible={fieldErrors.message ? "true" : "false"}
              >
                {fieldErrors.message}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn-primary px-7 py-3.5 text-sm disabled:opacity-60"
              >
                {formStatus === "loading" ? "Sending…" : "Send message"}
              </button>

              <p aria-live="polite" className="text-sm">
                {formStatus === "success" ? (
                  <span className="text-[var(--stripe-green)]">
                    Thanks — your message is in.
                  </span>
                ) : null}
                {formStatus === "error" ? (
                  <span className="text-muted">
                    {Object.keys(fieldErrors).length > 0
                      ? "Please fix the highlighted fields above."
                      : "Something went wrong. Please try again in a moment."}
                  </span>
                ) : null}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}