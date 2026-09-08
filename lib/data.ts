import { Smartphone, Layers, Database, Zap, Palette } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  envKey?: string; // e.g., 'NEXT_PUBLIC_PROJECT_URL_1'
  status: 'live' | 'coming-soon';
}

export const services: Service[] = [
  {
    id: 'full-stack-web',
    title: 'Full-Stack Web Architecture',
    description: 'High-performance web applications, serverless backends, edge deployments, and responsive frontends built with Next.js, React, and TypeScript.',
    features: ['Next.js & React', 'Serverless Backends', 'Edge Deployments', 'Responsive Frontends'],
    icon: Layers,
  },
  {
    id: 'mobile-apps',
    title: 'Native & Cross-Platform Mobile Apps',
    description: 'High-performance Android applications and responsive mobile-first utilities, built on clean architecture with optimized runtime memory management.',
    features: ['Native Android', 'Cross-Platform Utilities', 'Clean Architecture', 'Optimized Runtime Memory'],
    icon: Smartphone,
  },
  {
    id: 'apis-cloud',
    title: 'Custom APIs & Cloud Infrastructure',
    description: 'Scalable REST/GraphQL backends with thoughtful database schema design, microservices, authentication systems, and cloud edge routing.',
    features: ['REST & GraphQL APIs', 'PostgreSQL / Supabase', 'Microservices', 'Auth & Edge Routing'],
    icon: Database,
  },
  {
    id: 'performance',
    title: 'Performance & Speed Optimization',
    description: 'Core Web Vitals refinement, asset caching, bundle-size optimization, and low-latency execution for a zero-bloat codebase.',
    features: ['Core Web Vitals', 'Asset Caching', 'Bundle-Size Optimization', 'Low-Latency Execution'],
    icon: Zap,
  },
  {
    id: 'ui-ux-systems',
    title: 'UI/UX System Design',
    description: 'Dark-mode neumorphism, responsive Bento grid design systems, interactive prototypes, and conversion-focused web layouts.',
    features: ['Dark-Mode Neumorphism', 'Bento Grid Systems', 'Interactive Prototypes', 'Conversion-Focused Layouts'],
    icon: Palette,
  },
];

export const works: Work[] = [
  {
    id: 'project-1',
    title: 'Flooring Company Portfolio',
    description: 'A full-featured Portfolio for a local flooring contract company.',
    tags: ['HTML', 'Web3Forms'],
    // No screenshot asset yet — leave empty so the card falls back to the
    // built-in placeholder instead of requesting a file that 404s.
    imageUrl: '',
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_1,
    envKey: 'NEXT_PUBLIC_PROJECT_URL_1',
    status: 'live',
  },
  {
    id: 'project-2',
    title: 'The Golden Pitch',
    description: 'A Lionel Messi fan site',
    tags: ['HTML', 'Github Actions'],
    imageUrl: '',
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_2,
    envKey: 'NEXT_PUBLIC_PROJECT_URL_2',
    status: 'live',
  },
  {
    id: 'project-3',
    title: 'Coming Soon',
    description: 'Exciting new project in development. Stay tuned for updates!',
    tags: ['In Progress'],
    imageUrl: '',
    status: 'coming-soon',
  },

];
