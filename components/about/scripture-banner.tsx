"use client";

import Link from "next/link";
import { SunMedium, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function ScriptureBanner() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="bg-primary-deep text-white rounded-2xl p-8 sm:p-10 md:p-12 shadow-xl border border-white/10 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-accent/40 text-accent">
            <SunMedium className="size-7 sm:size-8" />
          </div>
          <div>
            <span className="text-accent text-xs font-semibold tracking-wider uppercase mb-1 block">
              {isAm ? "ተልዕኮአችንና ጥሪያችን" : "Our Mission & Calling"}
            </span>
            <blockquote className="font-display text-lg sm:text-xl md:text-2xl italic text-white/95 leading-snug">
              {isAm
                ? "«ክርስቶስን ማወቅና እርሱን ማሳወቅ፤ በብርሃኑ በአዲስ አበባ ማብራትና ታማኝ የሆኑ ደቀ መዛሙርትን ማፍራት።»"
                : "“To know Christ and to make Him known, shining His radiant light across Addis Ababa and raising generations of faithful disciples.”"}
            </blockquote>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href="#faith"
            className={cn(
              buttonVariants({ variant: "on-dark" }),
              "w-full sm:w-auto gap-2"
            )}
          >
            <span>{isAm ? "የእምነት መግለጫ" : "Explore Doctrine"}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
