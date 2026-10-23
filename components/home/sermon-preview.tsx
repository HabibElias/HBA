"use client";
import { useLandingContent } from "@/lib/context/landing-context";
import { useContent } from "@/lib/context/content-context";

import Link from "next/link";
import { BookOpen, ArrowUpRight, User } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function SermonPreview() {
  const { homeText, homeValue } = useLandingContent();
  const { sermons: RECENT_SERMONS } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="paint-band py-28 md:py-36 lg:py-40" id="sermons">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <ScrollReveal variant="fade-up" duration={600} className="mb-12 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
                {homeText("home_sermon_preview_1")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
                {homeText("home_sermon_preview_2")}
              </h2>
            </div>
            <Link
              href={homeValue("home_sermon_preview_3")}
              className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
            >
              <span>{homeText("home_sermon_preview_4")}</span>
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Simplified Sermon Link Cards — Linking directly to the archive without clutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {RECENT_SERMONS.map((sermon, idx) => (
            <ScrollReveal
              key={sermon.id}
              delay={idx * 100}
              variant="fade-up"
              distance={28}
              className="min-w-0 h-full flex flex-col"
            >
              <Link
                href={homeValue("home_sermon_preview_5")}
                className="group relative overflow-hidden bg-surface border border-border hover:border-primary/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between flex-1 transition-colors duration-200 min-w-0 min-h-[320px]"
              >
                {/* Subtle Watermark Icon in bottom-right corner */}
                <BookOpen
                  className="absolute bottom-6 right-6 size-24 text-primary opacity-[0.04] pointer-events-none select-none"
                  aria-hidden="true"
                  strokeWidth={1}
                />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
                    <span className="inline-block px-3 py-1 rounded-full bg-tint border border-primary/10 text-xs font-semibold text-primary transition-all duration-200">
                      {isAm ? sermon.seriesAm : sermon.series}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {isAm ? sermon.scriptureAm : sermon.scripture}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-primary/90 mb-2">
                    <User className="size-3.5" />
                    <span>{isAm ? sermon.speakerAm : sermon.speaker}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                    {isAm ? sermon.titleAm : sermon.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAm ? sermon.themeAm : sermon.theme}
                  </p>
                </div>

                <div className="mt-8 pt-2 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors relative z-10">
                  <span>{isAm ? "ስብከቱን በማህደር ያዳምጡ" : sermon.recordingUrl ? "Listen to the message" : "Explore the archive"}</span>
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
