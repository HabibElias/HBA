"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import enMessages from "@/messages/en.json";
import amMessages from "@/messages/am.json";
import { copy } from "@/lib/content/landing-content";
import type { LandingContent } from "@/lib/types/landing";

export type Language = "en" | "am";
export type Dictionary = typeof enMessages;

const dictionaries: Record<Language, Dictionary> = {
  en: enMessages,
  am: amMessages,
};

const STORAGE_KEY = "hiwot-language";

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Dictionary & LandingContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "am" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Ignore in sandboxed or restricted storage environments
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore
    }
    document.documentElement.lang = next;
  };

  const toggleLang = () => {
    const next = lang === "en" ? "am" : "en";
    setLang(next);
  };

  const activeDictionary = useMemo(() => {
    const dict = dictionaries[lang];
    const legacy = copy[lang];
    return {
      ...legacy,
      ...dict,
    } as Dictionary & LandingContent;
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: activeDictionary,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
