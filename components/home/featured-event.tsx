"use client";
import { useLandingContent } from "@/lib/context/landing-context";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Calendar } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FeaturedEvent() {
  const { homeText, homeValue } = useLandingContent();
  const { events: upcomingEvents } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const featured = upcomingEvents[0];

  if (!featured) return null;

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="events">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={600} className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
              {homeText("home_featured_event_1")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              {homeText("home_featured_event_2")}
            </h2>
          </div>
          <Link
            href={homeValue("home_featured_event_3")}
            className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
          >
            <span>{homeText("home_featured_event_4")}</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Main Featured Event Card — Left-Right layout, loosened content, following card design guidelines */}
      <ScrollReveal variant="fade-up" duration={700} delay={60}>
        <div className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-200">
        {/* Watermark icon — rotated in corner */}
        <Calendar
          className="absolute -bottom-4 -right-4 translate-y-4 translate-x-4 size-44 text-primary opacity-[0.06] rotate-[-15deg] pointer-events-none select-none"
          aria-hidden="true"
          strokeWidth={1}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column (5 cols): Visual Image with Date Badge */}
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[260px] rounded-2xl overflow-hidden bg-tint/60 shadow-xs">
            <Image
              src={homeValue("home_featured_event_5")}
              alt={homeText("home_featured_event_6")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-primary text-xs font-semibold px-3.5 py-1 rounded-full transition-all duration-200">
              {isAm ? featured.dateAm : featured.date}
            </div>
          </div>

          {/* Right Column (7 cols): Clean, loosened event details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="inline-block self-start px-3 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary mb-3 transition-all duration-200">
                {isAm ? featured.categoryLabelAm : featured.categoryLabel}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                {isAm ? featured.titleAm : featured.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-muted-foreground mb-6">
                <span className="font-semibold text-primary">{isAm ? featured.timeAm : featured.time}</span>
                <span>•</span>
                <span>{isAm ? featured.locationAm : featured.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={homeValue("home_featured_event_7")}
                className={cn(
                  buttonVariants({ variant: "primary", size: "default" }),
                  "group/btn rounded-full px-7 font-semibold shadow-sm hover:shadow-md hover:bg-primary-deep transition-all"
                )}
              >
                <span>{homeText("home_featured_event_8")}</span>
                <ArrowUpRight className="size-4 ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* Upcoming Events — 3 individual Cards with centered play icons */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingEvents.slice(1, 4).map((evt, idx) => (
          <ScrollReveal
            key={evt.id}
            delay={idx * 100}
            variant="fade-up"
            distance={28}
            className="h-full flex flex-col"
          >
            <Link
              href={homeValue("home_featured_event_9")}
              className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-6 sm:p-7 flex flex-col justify-between flex-1 transition-all duration-200 cursor-pointer min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary transition-all duration-200">
                    {isAm ? evt.dateAm : evt.date}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground truncate">
                    {isAm ? evt.categoryLabelAm : evt.categoryLabel}
                  </span>
                </div>

                {/* Centered Play icon */}
                <div className="my-5 flex items-center justify-center">
                  <div className="size-12 rounded-full bg-surface group-hover:bg-primary text-primary group-hover:text-white border border-primary/10 flex items-center justify-center transition-all duration-200 shadow-xs group-hover:scale-110">
                    <Play className="size-5 fill-current ml-0.5" />
                  </div>
                </div>

                <h4 className="font-display text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-center leading-snug line-clamp-2">
                  {isAm ? evt.titleAm : evt.title}
                </h4>
                <p className="text-xs text-muted-foreground text-center mt-1.5">
                  {isAm ? evt.locationAm : evt.location} • {isAm ? evt.timeAm : evt.time}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-primary/10 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                <span>{homeText("home_featured_event_10")}</span>
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
