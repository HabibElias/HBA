"use client";

import Link from "next/link";
import { ChurchMark } from "@/components/brand/church-mark";
import { useLanguage } from "@/lib/context/language-context";

export function LogoLockup({
  reversed = false,
  iconOnly = false,
}: {
  reversed?: boolean;
  iconOnly?: boolean;
}) {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  const title = isAm ? "ሕይወት ብርሃን" : (t?.nav?.churchName ?? "Hiwot Birhan");
  const subtitle = isAm
    ? "የአዲስ አበባ ሰሚት ቅርንጫፍ"
    : (t?.nav?.branchName ?? "Addis Ababa Summit Branch");

  if (iconOnly) {
    return (
      <Link
        href="/"
        aria-label="Hiwot Birhan Addis Ababa Summit Branch Home"
        className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white group flex items-center"
      >
        <ChurchMark
          reversed={reversed}
          size={64}
          priority
          className="size-14 sm:size-16 transition-transform duration-200 group-hover:scale-105"
        />
      </Link>
    );
  }
  return (
    <Link
      href="/"
      className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full select-none"
      aria-label="Hiwot Birhan Addis Ababa Summit Branch Home"
    >
      <div
        className={`w-16 h-16 shrink-0 flex items-center justify-center transition-colors ${
          reversed ? "" : ""
        }`}
      >
        <ChurchMark reversed={reversed} size={64} className="size-16" />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-display font-semibold text-base sm:text-lg leading-tight tracking-tight transition-colors ${
            reversed
              ? "text-white group-hover:text-white/90"
              : "text-foreground group-hover:text-primary"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-[11px] sm:text-xs font-normal transition-colors ${
            reversed ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
