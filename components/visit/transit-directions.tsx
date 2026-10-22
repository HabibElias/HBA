"use client";

import { MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

const ROUTES = [
  {
    titleEn: "By Minibus / Taxi from Megenagna",
    titleAm: "በሚኒባስ / ታክሲ ከመገናኛ",
    descEn: "Take any standard minibus taxi heading toward Summit / Ayat from Megenagna terminal. Ask to get off at Summit Gate 2 (“ሳሚት 2ኛ በር”). Walk 150 meters past the CBE branch; the gates are directly on your right.",
    descAm: "ከመገናኛ ተርሚናል ወደ ሰሚት / አያት የሚሄድ ታክሲ ይያዙ። ሰሚት 2ኛ በር ላይ ይውረዱ። ከኢትዮጵያ ንግድ ባንክ 150 ሜትር ገባ ሲሉ አዳራሻችን በስተቀኝ ይገኛል።",
  },
  {
    titleEn: "By Light Rail Transit (LRT)",
    titleAm: "በቀላል ባቡር ትራንዚት (LRT)",
    descEn: "Board the East-West (Green) Light Rail Line toward Ayat. Disembark at Summit Station. From the station overpass, take a brief 3-minute ride or a 10-minute walk eastward to Gate 2.",
    descAm: "የምስራቅ-ምዕራብ (አረንጓዴ) ባቡርን ወደ አያት ተሳፍረው ሰሚት ጣቢያ ላይ ይውረዱ። ከጣቢያው በ3 ደቂቃ የባጃጅ ጉዞ ወይም በ10 ደቂቃ የእግር መንገድ ወደ 2ኛ በር ያመራሉ።",
  },
  {
    titleEn: "Driving & Parking Information",
    titleAm: "በግል መኪና ለሚመጡና የመኪና ማቆሚያ",
    descEn: "Secure on-campus parking is free for all attendees and first-time guests. Church safety attendants will guide you to dedicated spots in the paved compound lot.",
    descAm: "ለሁሉም ተሳታፊዎችና አዲስ እንግዶች የተጠበቀ ነጻ የመኪና ማቆሚያ አለን። የመስተንግዶ ቡድናችን አመቺ ቦታ ይመራዎታል።",
  },
];

export function TransitDirections() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16" id="transit">
      <span id="directions" className="sr-only" />
      <div className="text-left mb-14 md:mb-18">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
          {isAm ? "የአዳራሹ አድራሻና የመጓጓዣ መመሪያዎች" : "Location & Transit Directions"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mt-2 leading-relaxed">
          {isAm
            ? "በምስራቅ አዲስ አበባ ሰሚት ኮንዶሚኒየም 2ኛ በር አቅራቢያ የሚገኝ፤ በዋና ዋና ታክሲዎችና በባቡር በቀላሉ የሚደረስ።"
            : "Conveniently located near Summit Condominium Gate 2 in eastern Addis Ababa, accessible via major bus corridors and light rail."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Map Column (7 cols) */}
        <div className="lg:col-span-7 bg-surface border border-border/60 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-5 bg-tint/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-foreground">
                {isAm ? "ሰሚት ኮንዶሚኒየም 2ኛ በር፣ ቦሌ ክፍለ ከተማ" : "Summit Condominium Gate 2, Bole Subcity"}
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=9.0234,38.8682"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isAm ? "በጉግል ካርታ ይክፈቱ (በአዲስ መስኮት)" : "Open in Google Maps (opens in new tab)"}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group"
            >
              <span>{isAm ? "በጉግል ካርታ ይክፈቱ" : "Open in Google Maps"}</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="relative w-full h-80 sm:h-96 bg-tint overflow-hidden">
            <iframe
              title={isAm ? "የካርታ እይታ" : "Map of the Summit area"}
              src="https://maps.google.com/maps?q=9.0234,38.8682&z=15&output=embed"
              className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="p-5 bg-surface flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-2">
            <span>GPS: 9.0234° N, 38.8682° E</span>
            <span className="font-medium text-foreground">Bole Subcity, Woreda 06</span>
          </div>
        </div>

        {/* Transit Options Column (5 cols, open editorial layout without generic cards or dividers) */}
        <div className="lg:col-span-5 space-y-8 md:space-y-10 lg:pl-6">
          {ROUTES.map((route, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                {isAm ? route.titleAm : route.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isAm ? route.descAm : route.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
