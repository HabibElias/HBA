"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function ScriptureBanner() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10"
      aria-label={isAm ? "ተልዕኮአችን" : "Our Calling"}
    >
      <div className="bg-gradient-to-r from-[#261066] via-[#351887] to-[#4C24B8] text-white rounded-3xl p-10 sm:p-14 md:p-16 border border-white/20 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-between">
        <div className="hero-ambient-glow" aria-hidden="true" />
        <div className="space-y-3 max-w-3xl relative z-10">
          <span className="font-script text-2xl sm:text-3xl text-purple-200 block font-normal">
            {isAm ? "የሰሚት ቅርንጫፍ ጥሪ" : "Our Calling & Vision"}
          </span>
          <blockquote className="font-display text-lg sm:text-xl md:text-2xl text-white/95 leading-snug">
            {isAm
              ? "«ክርስቶስን ማወቅና እርሱን ማሳወቅ፤ በብርሃኑ በአዲስ አበባ ማብራትና ታማኝ የሆኑ ደቀ መዛሙርትን ማፍራት።»"
              : "“To know Christ and to make Him known, shining His radiant light across Addis Ababa and raising generations of faithful disciples.”"}
          </blockquote>
        </div>

        <div className="shrink-0 w-full sm:w-auto relative z-10">
          <Link
            href="#faith"
            className={cn(
              buttonVariants({ variant: "on-dark" }),
              "group rounded-full px-7 w-full sm:w-auto gap-2 font-semibold shadow-md"
            )}
          >
            <span>{isAm ? "የእምነት መግለጫ" : "Statement of Faith"}</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
