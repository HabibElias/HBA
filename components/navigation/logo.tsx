"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";

export function LogoLockup({ reversed = false }: { reversed?: boolean }) {
  const { lang, t } = useLanguage();

  const title =
    lang === "am" ? (t?.nav?.churchName ?? "ሕይወት ብርሃን") : "Hiwot Birhan";
  const subtitle =
    lang === "am" ? (t?.nav?.branchName ?? "የሰሚት ቅርንጫፍ") : "Summit Branch";

  return (
    <Link
      href="/"
      className="flex items-center gap-3 group focus:outline-none select-none"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
          reversed
            ? "border-white/30 bg-white/10 text-white"
            : "border-[#3A33A0]/20 bg-[#ECEBF8] text-[#3A33A0] group-hover:bg-[#3A33A0] group-hover:text-white"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="44" strokeWidth="5" />
          <path
            d="M50 18 V82 M30 42 H70"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`font-display font-bold text-lg leading-tight tracking-tight transition-colors ${
            reversed
              ? "text-white"
              : "text-[#14122B] group-hover:text-[#3A33A0]"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-xs font-medium transition-colors ${
            reversed ? "text-white/70" : "text-[#5B5878]"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
