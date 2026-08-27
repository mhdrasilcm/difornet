// Type definitions for DiforNet portfolio

export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Work {
  title: string;
  subtitle: string;
  description?: string;
}

export interface Stat {
  label: string;
  value: string;
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
