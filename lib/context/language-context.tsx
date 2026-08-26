"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { copy } from "@/lib/content/landing-content";
import type { LandingContent, Language } from "@/lib/types/landing";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: LandingContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "hiwot-language";

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
      // Ignore local storage error in sandboxed or restricted environments
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
    setLang(lang === "en" ? "am" : "en");
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: copy[lang],
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
