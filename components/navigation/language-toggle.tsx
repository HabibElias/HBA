"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ECEBF8] bg-white/90 hover:bg-[#ECEBF8] dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/20 transition-all text-xs font-semibold text-[#14122B] dark:text-white cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A33A0]",
        className
      )}
      aria-label={
        lang === "en" ? "Switch language to Amharic" : "ቋንቋን ወደ እንግሊዝኛ ቀይር"
      }
      title={lang === "en" ? "አማርኛ" : "English"}
    >
      <Globe className="size-3.5 text-[#3A33A0] dark:text-[#8F89EA] shrink-0" />
      <span
        className={cn(
          "px-1.5 py-0.5 rounded-full text-[11px] transition-colors",
          lang === "en"
            ? "bg-[#3A33A0] text-white font-bold"
            : "text-[#5B5878] dark:text-white/60"
        )}
      >
        EN
      </span>
      <span className="text-[#5B5878]/30 dark:text-white/20">/</span>
      <span
        className={cn(
          "px-1.5 py-0.5 rounded-full text-[11px] transition-colors",
          lang === "am"
            ? "bg-[#3A33A0] text-white font-bold"
            : "text-[#5B5878] dark:text-white/60"
        )}
      >
        አማ
      </span>
    </button>
  );
}
