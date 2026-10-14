"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function ProgramsHero() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint text-primary text-xs font-semibold mb-3">
            <Sparkles className="size-3.5 text-accent shrink-0" />
            <span>
              {isAm
                ? "መንፈሳዊ ኅብረትና ጉባኤያት"
                : "Spiritual Fellowship & Assemblies"}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {isAm
              ? "የቤተ ክርስቲያን መርሐ ግብሮችና ሁነቶች"
              : "Church Programs & Events"}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mt-2 max-w-2xl leading-relaxed">
            {isAm
              ? "በአዲስ አበባ ሰሚት ሕብረታችንን ይቀላቀሉ። መጪ የጉባኤ ካምፖችን፣ የአምልኮ ፕሮግራሞችን፣ የቤተሰብ ሴሚናሮችን ይከታተሉ ወይም ያለፉትን መንፈሳዊ ጉዞዎች ማህደር ያስሱ።"
              : "Join the fellowship at Summit, Addis Ababa. Discover upcoming congregational retreats, worship gatherings, family seminars, or browse our spiritual journey archives."}
          </p>
        </div>

        {/* Anchor Tab Switcher */}
        <div className="flex items-center bg-tint p-1.5 rounded-full self-start lg:self-auto gap-1">
          <Link
            href="#upcoming"
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-surface text-primary shadow-xs transition-all hover:opacity-90"
          >
            {isAm ? "መጪ ሁነቶች" : "Upcoming Events"}
          </Link>
          <Link
            href="#archive"
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-all flex items-center gap-1.5"
          >
            <span>{isAm ? "ያለፉ ፕሮግራሞች" : "Past Programs Archive"}</span>
            <span className="text-[11px] bg-accent/20 text-accent-contrast dark:text-accent px-2 py-0.5 rounded-full font-medium">
              {isAm ? "ማህደር" : "ያለፉ"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
