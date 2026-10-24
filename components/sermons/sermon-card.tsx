"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Headphones, User } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import type { Sermon } from "@/lib/data/sermons";

export interface SermonCardProps {
  sermon: Sermon;
}

export function SermonCard({ sermon }: SermonCardProps) {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  const title = isAm ? sermon.titleAm || sermon.title : sermon.title;
  const scripture = isAm
    ? sermon.scriptureAm || sermon.scripture
    : sermon.scripture;
  const series = isAm ? sermon.seriesAm || sermon.series : sermon.series;
  const speaker = isAm ? sermon.speakerAm || sermon.speaker : sermon.speaker;
  const theme = isAm ? sermon.themeAm || sermon.theme : sermon.theme;

  const href = `/sermons/${encodeURIComponent(sermon.id)}`;
  const label =
    !sermon.audioUrl && !sermon.recordingUrl
      ? isAm
        ? "መልእክቱን ያንብቡ"
        : "Read message"
      : isAm
        ? "ስብከቱን ያንብቡና ያዳምጡ"
        : "Read & Listen";

  const content = (
    <>
      {/* Watermark icon — rotated, peeking from bottom-right corner */}
      <BookOpen
        className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
        strokeWidth={1}
      />

      <div className="w-full flex flex-col items-start text-left relative z-10">
        <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
          <span className="inline-block self-start px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary transition-all duration-200">
            {series || (isAm ? "ነጠላ መልእክት" : "Standalone message")}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {scripture}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
          <User className="size-3.5" />
          <span>{speaker}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 text-left leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-left line-clamp-3">
          {theme}
        </p>
      </div>

      <div className="mt-8 pt-4 w-full flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors relative z-10 border-t border-border/40">
        <span className="inline-flex items-center gap-1.5">
          <Headphones className="size-4 text-primary" />
          <span>{label}</span>
        </span>
        <ArrowUpRight
          className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          strokeWidth={1.75}
        />
      </div>
    </>
  );

  const cardClassName =
    "group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-7 sm:p-8 text-left flex flex-col items-start justify-between transition-all duration-200 cursor-pointer min-h-[300px] h-full w-full";

  return (
    <Link
      href={href}
      id={`message-${sermon.id}`}
      className={cardClassName}
      aria-label={`${label}: ${title}`}
    >
      {content}
    </Link>
  );
}
