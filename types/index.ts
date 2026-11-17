export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Work {
  id: string;
  year: string;
  category: string;
  title: string;
  description: string;
  outcome: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type Theme = "light" | "dark";

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}