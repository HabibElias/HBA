"use client";

import { guidingPillars } from "@/lib/data/values";
import { useLanguage } from "@/lib/context/language-context";

export function ValuesPillars() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section id="values" className="py-28 md:py-36 lg:py-40 scroll-mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 md:mb-16">
          <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
            {isAm ? "መሠረታዊ እሴቶች" : "Our Core Values"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
            {isAm ? "አምስቱ መሠረታዊ መርሆዎቻችን" : "The commitments we share"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
            {isAm
              ? "እያንዳንዱ ስብከት፣ የኅብረት ጊዜና የማኅበረሰብ አገልግሎት በእነዚህ መጽሐፍ ቅዱሳዊ መርሆዎች ላይ የተመሠረተ ነው።"
              : "Every sermon, fellowship gathering, and neighborhood initiative is anchored by these biblical commitments."}
          </p>
        </div>

        {/* Pillars Cards with periwinkle tint and royal purple numbering (from Inspiration.webp) */}
        <div className="space-y-6">
          {guidingPillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-7 sm:p-9 transition-all duration-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 flex items-start gap-4">
                <span className="size-11 rounded-2xl bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-primary font-bold text-sm flex items-center justify-center shrink-0 transition-all duration-200">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {isAm ? pillar.titleAm : pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary mt-1">
                    {isAm ? pillar.title : pillar.titleAm}
                  </p>
                  {pillar.scripture && (
                    <p className="text-xs text-primary font-medium mt-2">
                      {isAm ? pillar.scriptureAm : pillar.scripture}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:col-span-7 md:border-l md:border-border/60 md:pl-8">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAm ? pillar.descriptionAm : pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
