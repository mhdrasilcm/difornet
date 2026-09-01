import { Code, Globe, Smartphone, Cpu } from 'lucide-react';

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
    id: 'websites',
    title: 'Websites',
    description: 'Modern, responsive websites that look great on any device. Built with the latest technologies for speed and SEO.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile First'],
    icon: Globe,
  },
  {
    id: 'web-apps',
    title: 'Web Applications',
    description: 'Powerful web applications tailored to your business needs. From dashboards to complex SaaS platforms.',
    features: ['Custom Functionality', 'Scalable Architecture', 'Secure & Reliable', 'Real-time Updates'],
    icon: Code,
  },
  {
    id: 'android-apps',
    title: 'Android Apps',
    description: 'Native and cross-platform Android applications that provide smooth user experiences.',
    features: ['Native Performance', 'Cross-platform Support', 'Intuitive UI/UX', 'Play Store Ready'],
    icon: Smartphone,
  },
  {
    id: 'embedded-iot',
    title: 'Embedded & IoT',
    description: 'Smart solutions connecting hardware and software. From microcontrollers to full IoT ecosystems.',
    features: ['Hardware Integration', 'Sensor Networks', 'Cloud Connectivity', 'Real-time Monitoring'],
    icon: Cpu,
  },
];

export const works: Work[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with inventory management, payment processing, and real-time analytics dashboard.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    imageUrl: '/placeholder-ecommerce.jpg',
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_1,
    envKey: 'NEXT_PUBLIC_PROJECT_URL_1',
    status: 'live',
  },
  {
    id: 'project-2',
    title: 'Healthcare Dashboard',
    description: 'Patient management system with appointment scheduling, medical records, and telemedicine integration.',
    tags: ['React', 'Node.js', 'MongoDB'],
    imageUrl: '/placeholder-healthcare.jpg',
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_2,
    envKey: 'NEXT_PUBLIC_PROJECT_URL_2',
    status: 'live',
  },
  {
    id: 'project-3',
    title: 'IoT Smart Home',
    description: 'Control your home devices remotely with this intuitive smart home automation platform.',
    tags: ['IoT', 'MQTT', 'React Native'],
    imageUrl: '/placeholder-iot.jpg',
    liveUrl: process.env.NEXT_PUBLIC_PROJECT_URL_3,
    envKey: 'NEXT_PUBLIC_PROJECT_URL_3',
    status: 'live',
  },
  {
    id: 'project-4',
    title: 'Coming Soon',
    description: 'Exciting new project in development. Stay tuned for updates!',
    tags: ['In Progress'],
    imageUrl: '',
    status: 'coming-soon',
  },
];
