"use client";

import Link from "next/link";
import { Music, Users, Sparkles, HeartHandshake, ArrowRight, Compass } from "lucide-react";
import { coreMinistries, type Ministry } from "@/lib/data/ministries";
import { useLanguage } from "@/lib/context/language-context";

function getMinistryIcon(iconName: string) {
  switch (iconName) {
    case "Music":
      return Music;
    case "Users":
      return Users;
    case "Sparkles":
      return Sparkles;
    case "HeartHandshake":
    default:
      return HeartHandshake;
  }
}

export function MinistriesPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const displayedMinistries = coreMinistries.slice(0, 4);

  return (
    <section className="py-16 bg-tint/25 border-y border-border" id="ministries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="size-4" />
            <span>{isAm ? "አገልግሎቶችና ማኅበረሰብ • ሕብረት" : "Ministries & Community • አገልግሎቶች"}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            {isAm ? "እያንዳንዱ ልብ የሚያድግበትና የሚያገለግልበት ስፍራ" : "A Place for Every Heart to Grow"}
          </h2>
          <div className="w-10 h-0.5 bg-accent mx-auto my-4" />
          <p className="text-sm sm:text-base text-muted-foreground">
            {isAm
              ? "በደቀመዝሙርነት ያድጉ፣ እውነተኛ ክርስቲያናዊ ወዳጅነትን ያግኙ፣ እንዲሁም በሰሚት ማኅበረሰብ ውስጥ አብረን እናገልግል።"
              : "Grow in discipleship, find genuine friendship, and serve our Summit community together with purposeful ministries."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedMinistries.map((ministry: Ministry) => {
            const Icon = getMinistryIcon(ministry.iconName);
            return (
              <div
                key={ministry.id}
                className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/40 transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {isAm ? ministry.nameAm : ministry.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isAm ? ministry.descriptionAm : ministry.description}
                  </p>
                </div>

                <Link
                  href="/about#ministries"
                  className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary-soft transition-colors"
                >
                  <span>{isAm ? "ተጨማሪ መረጃ" : "Learn More"}</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
