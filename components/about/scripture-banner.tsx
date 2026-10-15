"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function ScriptureBanner() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10"
      aria-label={isAm ? "ተልዕኮአችን" : "Our Calling"}
    >
      <div className="bg-primary-deep text-white rounded-2xl p-8 sm:p-10 md:p-12 border border-white/15 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
        <div className="space-y-3 max-w-3xl">
          <div className="w-8 h-0.5 bg-accent" />
          <blockquote className="font-display text-lg sm:text-xl md:text-2xl text-white/95 leading-snug">
            {isAm
              ? "«ክርስቶስን ማወቅና እርሱን ማሳወቅ፤ በብርሃኑ በአዲስ አበባ ማብራትና ታማኝ የሆኑ ደቀ መዛሙርትን ማፍራት።»"
              : "“To know Christ and to make Him known, shining His radiant light across Addis Ababa and raising generations of faithful disciples.”"}
          </blockquote>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href="#faith"
            className={cn(
              buttonVariants({ variant: "on-dark" }),
              "group rounded-full px-6 w-full sm:w-auto gap-2 font-semibold"
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
