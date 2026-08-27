import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DiforNet collects, uses, and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
      <p className="section-eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm opacity-60">Last updated: August 2026</p>

      <div className="mt-12 space-y-10 leading-relaxed opacity-90">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            1. Who we are
          </h2>
          <p className="mt-3">
            DiforNet is a one-person web, mobile, Android, and embedded/IoT
            development studio based in Palakkad, Kerala, India. This policy
            explains what information is collected through this website
            (difornet.pages.dev) and how it is used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            2. Information we collect
          </h2>
          <p className="mt-3">
            When you use the contact form, we collect the name, email
            address, and message you submit. This information is sent
            through Web3Forms, a third-party form processing service, and
            delivered to DiforNet by email. We do not collect payment
            information through this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            3. Cookies
          </h2>
          <p className="mt-3">
            This site uses a small number of strictly necessary cookies or
            local storage entries needed for basic functionality, such as
            remembering your light/dark theme preference and your cookie
            consent choice. Any non-essential cookies — for example,
            analytics — are only set after you accept them via the cookie
            banner. You can change your choice at any time by clearing your
            browser&apos;s site data for this domain.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            4. How we use your information
          </h2>
          <p className="mt-3">
            Contact form submissions are used solely to respond to your
            inquiry about a potential project. We do not sell, rent, or
            share your information with third parties for marketing
            purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            5. Data retention
          </h2>
          <p className="mt-3">
            Messages sent through the contact form are retained only as long
            as needed to respond to your inquiry and for reasonable
            record-keeping. You may request deletion of your information at
            any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            6. Your rights
          </h2>
          <p className="mt-3">
            You may request access to, correction of, or deletion of any
            personal information you have submitted through this site by
            reaching out via the contact form or email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            7. Contact
          </h2>
          <p className="mt-3">
            DiforNet — Palakkad, Kerala, India. For any privacy-related
            questions, please use the contact form on the homepage.
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
