import type { ReactNode } from "react";

export type Language = "en" | "am";

export interface NavMenuItem {
  href: string;
  en: string;
  am: string;
}

export interface ServiceItem {
  day: string;
  time: string;
  name: string;
  detail: string;
}

export interface MinistryItem {
  name: string;
  detail: string;
}

export interface EventItem {
  date: string;
  title: string;
  detail: string;
  type: string;
}

export interface LandingContent {
  visit: string;
  hero: ReactNode;
  heroCopy: string;
  firstVisit: string;
  latest: string;
  sunday: string;
  address: string;
  introTitle: ReactNode;
  intro: string;
  know: string;
  sundayTitle: ReactNode;
  sundayText: string;
  sermonTitle: ReactNode;
  sermonText: string;
  watch: string;
  comingLabel: string;
  eventsTitle: ReactNode;
  allEvents: string;
  ministriesTitle: ReactNode;
  ministriesText: string;
  quote: string;
  citation: string;
  contactTitle: ReactNode;
  contactText: string;
  name: string;
  namePlaceholder: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  time: string;
  chooseTime: string;
  send: string;
  sent: string;
  sentTitle: string;
  sentText: string;
  sendAnother: string;
  footer: string;
  footerTimes: string;
  footerExplore: string;
  footerContact: string;
  midweekTime: string;
  selectMorning: string;
  selectMidweek: string;
  selectAny: string;
  services: ServiceItem[];
  ministries: MinistryItem[];
  events: EventItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  time?: string;
  message?: string;
}

export interface ContactActionResult {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}
