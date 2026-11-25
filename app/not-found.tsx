import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-[#100904] px-6 py-24 text-[#ffedd7]">
      <div className="mx-auto max-w-lg text-center">
        <p className="type-label text-[12px] tracking-[0.14em] text-[#dc5000]">
          ERROR 404
        </p>
        <h1 className="type-display mt-4 text-[44px] lg:text-[56px]">
          PAGE NOT FOUND.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#ffedd7]/75">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-pill-filled">
            Back to home
          </Link>
          <Link href="/#contact" className="btn-ghost-outline">
            Contact DiforNet
          </Link>
        </div>
      </div>
    </div>
  );
}