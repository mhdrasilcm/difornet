import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the DiforNet website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
      <p className="section-eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm opacity-60">Last updated: August 2026</p>

      <div className="mt-12 space-y-10 leading-relaxed opacity-90">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            1. Overview
          </h2>
          <p className="mt-3">
            These terms govern your use of the DiforNet website
            (difornet.pages.dev), operated by DiforNet, a one-person
            development studio based in Palakkad, Kerala, India. By using
            this site, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            2. Website content
          </h2>
          <p className="mt-3">
            Content on this site — including text, design, and listed work
            — is provided for informational purposes to describe DiforNet&apos;s
            services and past projects. It may be updated at any time
            without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            3. Project engagements
          </h2>
          <p className="mt-3">
            This website is not itself a contract for services. Any actual
            project — pricing, scope, timeline, and deliverables — is agreed
            separately in writing between DiforNet and the client after an
            initial conversation through the contact form.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            4. Intellectual property
          </h2>
          <p className="mt-3">
            Unless otherwise agreed in a project contract, the design,
            branding, and content of this website belong to DiforNet and may
            not be copied or reused without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            5. Limitation of liability
          </h2>
          <p className="mt-3">
            This website and its content are provided &quot;as is&quot;
            without warranties of any kind. DiforNet is not liable for any
            damages arising from your use of this site, to the fullest
            extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            6. Governing law
          </h2>
          <p className="mt-3">
            These terms are governed by the laws of India, without regard to
            conflict-of-law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            7. Contact
          </h2>
          <p className="mt-3">
            DiforNet — Palakkad, Kerala, India. Questions about these terms
            can be sent through the contact form on the homepage.
          </p>
        </section>

        <p className="text-sm opacity-60">
          This page is provided as a general template and does not
          constitute legal advice. Consider having it reviewed by a legal
          professional for your specific circumstances and jurisdiction.
        </p>
      </div>

      <a
        href="/"
        className="btn-secondary mt-14 inline-flex px-6 py-3 text-sm"
      >
        Back to home
      </a>
    </div>
  );
}
