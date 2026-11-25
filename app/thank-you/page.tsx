import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-[#100904] px-6 py-24 text-[#ffedd7]">
      <div className="mx-auto max-w-lg text-center">
        <p className="type-label text-[12px] tracking-[0.14em] text-[#dc5000]">
          MESSAGE SENT
        </p>
        <h1 className="type-display mt-4 text-[42px] lg:text-[52px]">
          THANKS — YOUR MESSAGE IS IN.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#ffedd7]/75">
          I&apos;ll get back to you within 2 business days to talk through
          scope, timeline, and next steps.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-pill-filled">
            Back to home
          </Link>
          <Link href="/#works" className="btn-ghost-outline">
            See past work
          </Link>
        </div>
      </div>
    </div>
  );
}