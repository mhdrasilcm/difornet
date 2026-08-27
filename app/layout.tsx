import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL in your environment once the domain is live —
// used for canonical/OG URLs, robots.txt, and the sitemap.
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://difornet.pages.dev";
// Strip any markdown link artifacts if present
const cleanUrl = rawUrl.replace(/\[|\]|\(.*\)/g, "").trim() || "https://difornet.pages.dev";
const siteUrl = cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DiforNet — Web, Mobile & Embedded Studio",
    template: "%s | DiforNet",
  },
  description:
    "A one-person studio in Palakkad, Kerala building websites, web apps, Android apps, and embedded software.",
  keywords: [
    "DiforNet",
    "web development Kerala",
    "Android app development Palakkad",
    "embedded systems developer India",
    "freelance developer Kerala",
    "IoT development studio",
  ],
  authors: [{ name: "DiforNet" }],
  creator: "DiforNet",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "DiforNet",
    title: "DiforNet — Web, Mobile & Embedded Studio",
    description:
      "A one-person studio in Palakkad, Kerala building websites, web apps, Android apps, and embedded software.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DiforNet — Web, Mobile & Embedded Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiforNet — Web, Mobile & Embedded Studio",
    description:
      "A one-person studio in Palakkad, Kerala building websites, web apps, Android apps, and embedded software.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DiforNet",
  description:
    "One-person web, mobile, Android, and embedded/IoT development studio based in Palakkad, Kerala, India.",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palakkad",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: "IN",
  founder: {
    "@type": "Person",
    name: "DiforNet",
  },
  foundingDate: "2026",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
