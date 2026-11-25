import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://difornet.pages.dev";
const cleanUrl =
  rawUrl.replace(/\[|\]|\(.*\)/g, "").trim() || "https://difornet.pages.dev";
const siteUrl = cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DIFORNET — Independent Web, Mobile & Cloud Studio",
    template: "%s | DIFORNET",
  },
  description:
    "An independent software studio in Palakkad, Kerala crafting web apps, mobile apps, and cloud infrastructure.",
  keywords: [
    "DiforNet",
    "web development Kerala",
    "Android app development Palakkad",
    "full-stack developer India",
    "freelance developer Kerala",
  ],
  authors: [{ name: "DiforNet" }],
  creator: "DiforNet",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "DiforNet",
    title: "DIFORNET — Independent Web, Mobile & Cloud Studio",
    description:
      "An independent software studio in Palakkad, Kerala crafting web apps, mobile apps, and cloud infrastructure.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DiforNet Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIFORNET — Independent Web, Mobile & Cloud Studio",
    description:
      "An independent software studio in Palakkad, Kerala crafting web apps, mobile apps, and cloud infrastructure.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  verification: {
    google: "sFph9IuGIu6YvB8BN0p455LYOtRbaHjpLCaqExiKRrg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#100904",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DiforNet",
  alternateName: ["Difornet", "DiforNet Studio"],
  image: `${siteUrl}/logo-icon.png`,
  sameAs: [
    "https://github.com/mhdrasilcm/difornet",
    "https://instagram.com/difornet",
  ],
  description:
    "Independent web, mobile, Android, and cloud development studio based in Palakkad, Kerala, India.",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palakkad",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: "IN",
  founder: { "@type": "Person", name: "DiforNet" },
  foundingDate: "2026",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DiforNet",
  alternateName: "Difornet",
  url: siteUrl,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#100904] text-[#ffedd7]">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}