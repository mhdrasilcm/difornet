import type { Service, Work } from "@/types";

export const services: Service[] = [
  {
    id: "websites",
    index: "01",
    title: "Business Websites & Portfolios",
    description:
      "Fast, custom-designed websites for local businesses, schools, and independent brands — built cleanly from scratch without bloated page builders.",
    deliverables: [
      "Custom responsive UI",
      "Contact & inquiry wiring",
      "SEO & metadata setup",
    ],
  },
  {
    id: "web-apps",
    index: "02",
    title: "Full-Stack Web Applications",
    description:
      "Interactive web tools, client portals, and database-backed workflows built with React, Next.js, TypeScript, and PostgreSQL.",
    deliverables: [
      "Next.js & React",
      "Auth & database design",
      "Edge deployment",
    ],
  },
  {
    id: "android",
    index: "03",
    title: "Android Applications",
    description:
      "Focused mobile utilities and client-ready Android apps designed for real-world devices, smooth navigation, and reliable offline behavior.",
    deliverables: [
      "Native Android UI",
      "API & local storage sync",
      "Play Store prep",
    ],
  },
  {
    id: "care",
    index: "04",
    title: "APIs, Hosting & Ongoing Care",
    description:
      "Custom API endpoints, domain and SSL setup, performance tuning, and dependable post-launch support when you need updates.",
    deliverables: [
      "REST APIs & webhooks",
      "Cloudflare / Vercel setup",
      "Post-launch fixes",
    ],
  },
];

export const works: Work[] = [
  {
    id: "sulthan-flooring",
    year: "2026",
    category: "Local Business",
    title: "Sulthan Flooring Experts",
    description:
      "A clean service showcase and quote-inquiry site for a flooring contract business in Mundur, Palakkad.",
    outcome:
      "Replaced scattered WhatsApp photos with a structured gallery, service breakdown, and direct Web3Forms quote request.",
    tags: ["HTML / CSS", "Responsive UI", "Web3Forms"],
    // Drop a real screenshot at public/works/sulthan-flooring.png when ready
    imageUrl: "",
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_1,
  },
  {
    id: "the-golden-pitch",
    year: "2026",
    category: "Editorial Tribute",
    title: "The Golden Pitch",
    description:
      "An interactive Lionel Messi editorial micro-site featuring career milestones, stats, and automated deployment.",
    outcome:
      "Built as a lightweight static experience with zero framework overhead and automated CI/CD via GitHub Actions.",
    tags: ["HTML / CSS", "Interactive Layout", "GitHub Actions"],
    imageUrl: "",
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_2,
  },
];