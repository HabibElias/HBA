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
        "group relative overflow-hidden inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all duration-200 cursor-pointer select-none text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        className
      )}
      aria-label={
        lang === "en" ? "Switch language to Amharic" : "ቋንቋን ወደ እንግሊዝኛ ቀይር"
      }
      title={lang === "en" ? "Switch to አማርኛ" : "Switch to English"}
    >
      <Globe
        className={cn(
          "size-3.5 text-white/80 shrink-0 transition-transform duration-300 ease-out",
          lang === "am" ? "rotate-180 text-white" : "rotate-0"
        )}
      />
      <div className="relative h-4 w-6 overflow-hidden">
        <div
          className={cn(
            "transition-transform duration-300 ease-out flex flex-col items-center",
            lang === "am" ? "-translate-y-4" : "translate-y-0"
          )}
        >
          <span className="h-4 flex items-center justify-center text-[11px] font-bold tracking-wider leading-none">
            EN
          </span>
          <span className="h-4 flex items-center justify-center text-[11px] font-bold tracking-wider leading-none">
            አማ
          </span>
        </div>
      </div>
    </button>
  );
}
