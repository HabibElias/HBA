"use client";

import { BookOpen, Heart, Users, Globe, GraduationCap, Flame } from "lucide-react";
import { guidingPillars } from "@/lib/data/values";
import { useLanguage } from "@/lib/context/language-context";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Heart,
  Users,
  Globe,
  GraduationCap,
  Flame,
};

export function ValuesPillars() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="bg-tint/40 py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="w-10 h-0.5 bg-accent mx-auto mb-4" />
          <span className="text-accent text-xs font-semibold uppercase tracking-wider">
            {isAm ? "ኅብረታችንን የሚመሩ እሴቶች" : "What Shapes Our Fellowship"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-2">
            {isAm ? "አምስቱ መሠረታዊ መርሆዎቻችን" : "Our Five Guiding Pillars"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
            {isAm
              ? "እያንዳንዱ ስብከት፣ የኅብረት ጊዜና የማኅበረሰብ አገልግሎት በእነዚህ መጽሐፍ ቅዱሳዊ መርሆዎች ላይ የተመሠረተ ነው።"
              : "Every sermon, fellowship gathering, and neighborhood initiative is anchored by these biblical commitments."}
          </p>
        </div>

        {/* 5 Cards Bento/Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidingPillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.iconName] || BookOpen;
            const isFifth = idx === 4;

            return (
              <div
                key={pillar.id}
                className={`bg-surface rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/40 transition-all duration-200 shadow-sm flex flex-col justify-between ${
                  isFifth ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center text-primary">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-accent/15 text-accent rounded-full">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-1">
                    {isAm ? pillar.titleAm : pillar.title}
                  </h3>
                  <p className="font-display text-xs sm:text-sm text-accent font-semibold mb-3">
                    {isAm ? pillar.title : pillar.titleAm}
                  </p>
                  <p
                    className={`text-muted-foreground text-xs sm:text-sm leading-relaxed ${
                      isFifth ? "max-w-xl" : ""
                    }`}
                  >
                    {isAm ? pillar.descriptionAm : pillar.description}
                  </p>
                </div>

                {pillar.scripture && (
                  <div className="mt-5 pt-3 border-t border-border/60">
                    <span className="text-xs font-medium text-primary-soft">
                      {isAm ? pillar.scriptureAm : pillar.scripture}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
