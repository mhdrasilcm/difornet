import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-white px-6 py-24 text-off-black dark:bg-off-black dark:text-white">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg leading-relaxed opacity-70">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="/" className="btn-primary px-7 py-3.5 text-sm">
            Back to home
          </a>
          <a href="/#contact" className="btn-secondary px-7 py-3.5 text-sm">
            Contact DiforNet
          </a>
        </div>
      </div>
    </div>
  );
}
