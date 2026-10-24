"use client";
import { useAboutContent } from "@/lib/context/about-context";

import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";

export function FoundingTimeline() {
  const { pageText, pageValue, milestones } = useAboutContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Narrative & Visual */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold leading-tight">
            {pageText("about_founding_timeline_1")}
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {pageText("about_founding_timeline_2")}
          </p>

          <div className="rounded-3xl overflow-hidden border border-border/60 relative group h-80 bg-tint/40 shadow-xs">
            <Image
              src={pageValue("about_founding_timeline_3")}
              alt={
                pageText("about_founding_timeline_4")
              }
              fill
              className="object-cover transition-transform duration-250 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/40 to-transparent p-6 text-white">
              <p className="text-xs sm:text-sm font-medium">
                {pageText("about_founding_timeline_5")}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Chronological Milestones (Clean open space without artificial line connector) */}
        <div className="lg:col-span-7 lg:pl-10 space-y-10">
          <div>
            <h3 className="font-display text-xl sm:text-2xl text-foreground font-semibold">
              {pageText("about_founding_timeline_6")}
            </h3>
          </div>

          <div className="space-y-12 sm:space-y-14">
            {milestones.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full bg-tint text-primary text-xs font-semibold">
                  {isAm ? item.periodAm : item.period}
                </span>
                <h4 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-1">
                  {isAm ? item.titleAm : item.title}
                </h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-1">
                  {isAm ? item.descAm : item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
