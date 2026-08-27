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
    <section
      id="contact"
      className="relative border-t border-black/10 dark:border-white/10 gradient-bg"
    >
      <div className="spatial-orb -left-16 bottom-0 h-72 w-72 opacity-10" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Get In Touch"
          title="Let's Talk"
        />
        <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <div className="bento-tile bento-feature-glow p-8 group">
              <h3 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Let&apos;s build{" "}
                <span className="gradient-text">your next project.</span>
              </h3>
              <p className="mt-4 text-lg leading-relaxed opacity-70">
                Tell me about your project or book a conversation. This is
                the only form on the site.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                <div className="stat-tile flex-1 hover:scale-[1.02] transition-transform duration-300 ease-out">
                  <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                      aria-hidden
                    />
                    Status
                  </p>
                  <p className="mt-2 font-semibold tracking-tight gradient-text">
                    Currently accepting new projects
                  </p>
                </div>
                <div className="stat-tile flex-1 hover:scale-[1.02] transition-transform duration-300 ease-out">
                  <p className="font-mono text-xs uppercase tracking-widest opacity-60">
                    Response Time
                  </p>
                  <p className="mt-2 font-semibold tracking-tight gradient-text">
                    Within 2 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={handleContactSubmit}
            className="bento-tile space-y-5 p-8 lg:col-span-3 group"
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
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-invalid={fieldErrors.name ? "true" : undefined}
                aria-describedby={
                  fieldErrors.name ? "name-error" : undefined
                }
                className="input-field"
              />
              {fieldErrors.name ? (
                <p id="name-error" className="field-error">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-invalid={fieldErrors.email ? "true" : undefined}
                aria-describedby={
                  fieldErrors.email ? "email-error" : undefined
                }
                className="input-field"
              />
              {fieldErrors.email ? (
                <p id="email-error" className="field-error">
                  {fieldErrors.email}
                </p>
              ) : null}
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
                aria-describedby={
                  fieldErrors.message ? "message-error" : undefined
                }
                className="input-field resize-none"
              />
              {fieldErrors.message ? (
                <p id="message-error" className="field-error">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn-primary px-7 py-3.5 text-sm disabled:opacity-60"
              >
                {formStatus === "loading" ? "Sending…" : "Send message"}
              </button>

              <p aria-live="polite" className="text-sm">
                {formStatus === "success" ? (
                  <span className="text-accent">
                    Thanks — your message is in. I&apos;ll reply within 2
                    business days.
                  </span>
                ) : null}
                {formStatus === "error" ? (
                  <span className="opacity-70">
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
