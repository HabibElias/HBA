"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { upcomingEvents } from "@/lib/data/programs";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function FeaturedEvent() {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const featured = upcomingEvents[0];

  if (!featured) return null;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="events">
      <div className="bg-primary-deep text-white rounded-3xl overflow-hidden shadow-2xl relative border border-accent/30">
        {/* Subtle Watermark Graphic */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none hidden lg:block">
          <Sparkles className="size-96 text-accent" />
        </div>

        <div className="relative p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details (8 cols) */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold mb-6">
              <Star className="size-4" />
              <span>{isAm ? "ልዩ የሰሚት መርሐ ግብር 2026" : "Featured Summit Event 2026"}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
              {isAm ? featured.titleAm : featured.title}
            </h2>

            <p className="text-sm sm:text-base text-accent font-medium mb-3">
              {isAm ? featured.themeAm : `"${featured.theme}"`}
            </p>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed mb-8">
              {isAm ? featured.descriptionAm : featured.description}
            </p>

            {/* Event Metadata Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/10">
                <Calendar className="size-5 text-accent shrink-0" />
                <div>
                  <div className="text-[11px] text-white/70">{isAm ? "ቀን" : "Date"}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {isAm ? featured.dateAm : featured.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/10">
                <Clock className="size-5 text-accent shrink-0" />
                <div>
                  <div className="text-[11px] text-white/70">{isAm ? "ሰዓት" : "Time"}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {isAm ? featured.timeAm : featured.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/10">
                <MapPin className="size-5 text-accent shrink-0" />
                <div>
                  <div className="text-[11px] text-white/70">{isAm ? "ቦታ" : "Venue"}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">
                    {isAm ? featured.locationAm : featured.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/programs#events"
                className={cn(buttonVariants({ variant: "on-dark" }), "gap-2 font-bold")}
              >
                <span>{isAm ? "ይመዝገቡና ይሳተፉ" : "Register & Learn More"}</span>
              </Link>
              <Link
                href="/programs"
                className={cn(buttonVariants({ variant: "on-dark-outline" }), "gap-2")}
              >
                <span>{isAm ? "የመርሐ ግብር ቀን መቁጠሪያ" : "View Full Church Calendar"}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Date Showcase (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-56 h-56 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center p-6 text-center shadow-xl">
              <Calendar className="size-10 text-accent mb-2" />
              <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                {isAm ? "4 ቀናት" : "Four Days"}
              </span>
              <span className="font-display text-4xl font-bold text-white leading-none my-1">
                {isAm ? "ህዳር" : "NOV"}
              </span>
              <span className="font-display text-lg text-accent font-semibold">
                {isAm ? "5–8, 2019" : "14–17, 2026"}
              </span>
              <span className="text-xs text-white/70 mt-2">
                {isAm ? "የወጣቶች ካምፕ" : "Youth Retreat"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
