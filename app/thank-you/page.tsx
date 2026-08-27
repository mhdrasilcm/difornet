import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-white px-6 py-24 text-off-black dark:bg-off-black dark:text-white">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          Message Sent
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Thanks — your message is in.
        </h1>
        <p className="mt-4 text-lg leading-relaxed opacity-70">
          I&apos;ll get back to you within 2 business days to talk through
          scope, timeline, and next steps.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="/" className="btn-primary px-7 py-3.5 text-sm">
            Back to home
          </a>
          <a href="/#works" className="btn-secondary px-7 py-3.5 text-sm">
            See past work
          </a>
        </div>
      </div>
    </div>
  );
}
