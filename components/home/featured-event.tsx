"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
    <section className="py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="events">
      <div className="bg-primary-deep text-white rounded-2xl overflow-hidden relative border border-white/15">
        <div className="relative h-56 sm:h-72"><Image src="/gallery/photo_16_2026-08-27_14-11-14.jpg" alt={isAm ? "???? ????" : "Fellowship at Summit"} fill sizes="(max-width: 1280px) 100vw, 1216px" className="object-cover object-center" /></div>
        {/* Subtle Authentic Seal Watermark */}
        <div
          className="absolute -right-16 -bottom-16 w-80 h-80 opacity-10 pointer-events-none select-none hidden lg:block"
          aria-hidden="true"
        >
          <Image
            src="/logo-white-no-background.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Details (8 cols) */}
          <div className="lg:col-span-12">
            <div className="w-10 h-0.5 bg-accent mb-5" />

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-3">
              {isAm ? featured.titleAm : featured.title}
            </h2>

            <p className="text-sm sm:text-base text-accent font-medium mb-4">
              {isAm ? featured.themeAm : `"${featured.theme}"`}
            </p>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed mb-8">
              {isAm ? featured.descriptionAm : featured.description}
            </p>

            {/* Event Metadata (Clean typographic bar matching Inspiration.webp) */}
            <div className="py-4 border-y border-white/15 mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
              <span className="font-semibold text-accent">
                {isAm ? featured.dateAm : featured.date}
              </span>
              <span className="text-white/30 hidden sm:inline" aria-hidden="true">•</span>
              <span>{isAm ? featured.timeAm : featured.time}</span>
              <span className="text-white/30 hidden sm:inline" aria-hidden="true">•</span>
              <span className="text-white/80">{isAm ? featured.locationAm : featured.location}</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/programs#upcoming"
                className={cn(buttonVariants({ variant: "on-dark" }), "rounded-full px-6 font-semibold")}
              >
                <span>{isAm ? "ይመዝገቡና ይሳተፉ" : "Register & Learn More"}</span>
              </Link>
              <Link
                href="/programs"
                className={cn(buttonVariants({ variant: "on-dark-outline" }), "group rounded-full px-6 gap-2")}
              >
                <span>{isAm ? "የመርሐ ግብር ቀን መቁጠሪያ" : "View Full Calendar"}</span>
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
