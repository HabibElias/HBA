"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Bus, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function VisitCta() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 bg-tint/25" id="visit-cta">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Details Column (6 cols) */}
          <ScrollReveal variant="fade-right" duration={700} distance={32} className="lg:col-span-6">
            <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
              {isAm ? "እንኳን ደህና መጡ" : "Welcome Home"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
              {isAm ? "እዚህ ለእርስዎም ስፍራ አለ" : "There is room for you here"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
              {isAm
                ? "በአዲስ አበባ ሰሚት በር 2 አቅራቢያ የሚገኘውን መቅደሳችንን ይጎብኙ። ክፍት በሮች፣ ሞቅ ያለ አቀባበልና መንፈሳዊ ቤተሰብ ይጠብቆታል።"
                : "Whether you are visiting Addis Ababa, moving to the Summit area, or searching for a gospel-centered church family, our doors and hearts are open to you."}
            </p>

            {/* Quick Location & Schedule Details (Open layout without divider lines) */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {isAm ? "የመቅደሱ አድራሻ" : "Sanctuary Address"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Summit Condominium, Near Gate 2, Bole Subcity, Addis Ababa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Clock className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {isAm ? "የእሑድ ዋና አምልኮ" : "Sunday Main Worship"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    9:00 AM – 12:00 PM EAT (3:00 – 6:00 ጠዋት የኢትዮጵያ ሰዓት)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Bus className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {isAm ? "ትራንስፖርትና ማቆሚያ" : "Transit & Parking"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Accessible via Summit-Megenagna taxi & LRT • Free on-site parking
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/visit"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group rounded-full px-7 font-semibold gap-2")}
              >
                <span>{isAm ? "የመጀመሪያ ጉብኝትዎን ያቅዱ" : "Plan your first visit"}</span>
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/visit#transit"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-7 font-semibold")}
              >
                <span>{isAm ? "አድራሻና አቅጣጫ" : "Directions & Map"}</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Visual Map Column (6 cols) */}
          <ScrollReveal variant="fade-left" duration={750} delay={120} distance={32} className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-border bg-surface relative aspect-[16/11]">
              <Image
                src="/gallery/photo_17_2026-08-27_14-11-14.jpg"
                alt="Inside the Summit church sanctuary"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-surface/95 p-3.5 rounded-xl border border-border text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">Hiwot Birhan Summit</span>
                  <span className="text-muted-foreground text-[11px]">Summit Condominium Gate 2, Bole</span>
                </div>
                <a
                  href="https://maps.google.com/?q=9.0234,38.8682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  Open Maps
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
