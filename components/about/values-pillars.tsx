"use client";

import { guidingPillars } from "@/lib/data/values";
import { useLanguage } from "@/lib/context/language-context";

export function ValuesPillars() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section id="values" className="py-16 md:py-24 scroll-mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="w-10 h-0.5 bg-accent mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
            {isAm ? "አምስቱ መሠረታዊ መርሆዎቻችን" : "The commitments we share"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
            {isAm
              ? "እያንዳንዱ ስብከት፣ የኅብረት ጊዜና የማኅበረሰብ አገልግሎት በእነዚህ መጽሐፍ ቅዱሳዊ መርሆዎች ላይ የተመሠረተ ነው።"
              : "Every sermon, fellowship gathering, and neighborhood initiative is anchored by these biblical commitments."}
          </p>
        </div>

        {/* Open Editorial Layout (Zero generic cards, Zero unnecessary icons) */}
        <div className="divide-y divide-border/60 border-y border-border/60">
          {guidingPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
            >
              <div className="md:col-span-5">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                  {isAm ? pillar.titleAm : pillar.title}
                </h3>
                <p className="text-xs font-semibold text-primary mt-1.5">
                  {isAm ? pillar.title : pillar.titleAm}
                </p>
                {pillar.scripture && (
                  <p className="text-sm text-primary font-medium mt-3">
                    {isAm ? pillar.scriptureAm : pillar.scripture}
                  </p>
                )}
              </div>

              <div className="md:col-span-7">
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
