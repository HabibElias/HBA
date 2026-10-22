"use client";
import { useContent } from "@/lib/context/content-context";


import Link from "next/link";
import { ArrowUpRight, Church, BookOpen, Flame, Heart } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ServiceSummary() {
  const { schedules } = useContent();
  const symbols = [Church, BookOpen, Flame, Heart];
  const FEATURE_CARDS = schedules.map((s,i)=>({id:s.id,icon:symbols[i % symbols.length],badge:s.day,badgeAm:s.dayAm,title:s.title,titleAm:s.titleAm,desc:s.description,descAm:s.descriptionAm,timeLocal:s.localTime,link:"/visit#service-times"}));
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 lg:-mt-28 relative z-20"
      id="service-times"
      aria-label={isAm ? "የአምልኮ ጊዜዎች" : "Service Times"}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURE_CARDS.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <ScrollReveal
              key={card.id}
              delay={idx * 80}
              variant="fade-up"
              distance={28}
              className="h-full flex flex-col"
            >
              <Link
                href={card.link}
                className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-7 sm:p-8 transition-all duration-200 flex flex-col justify-between flex-1 min-h-[220px]"
              >
                {/* Watermark icon — rotated, peeking from bottom-right corner */}
                <IconComponent
                  className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
                  aria-hidden="true"
                  strokeWidth={1}
                />

                {/* Card body */}
                <div className="relative z-10 flex flex-col gap-3">
                  {/* Day / session badge */}
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-primary text-[11px] font-semibold tracking-wide transition-all duration-200">
                    {isAm ? card.badgeAm : card.badge}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                    {isAm ? card.titleAm : card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAm ? card.descAm : card.desc}
                  </p>

                  {/* Time — shown only when provided */}
                  {card.timeLocal && (
                    <p className="text-xs font-semibold text-primary/80 mt-1">
                      {card.timeLocal}
                    </p>
                  )}
                </div>

                {/* Footer row: "Learn more" + ArrowUpRight */}
                <div className="relative z-10 pt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {isAm ? "ተጨማሪ ዝርዝር" : "Learn more"}
                  </span>
                  <ArrowUpRight
                    className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    strokeWidth={1.75}
                  />
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
