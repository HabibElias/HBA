"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Navigation, CheckCircle2, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function VisitHero() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="subpage-hero relative isolate overflow-hidden text-white">
      {/* Multi-shade royal purple ambient glow & watermarks */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <Image
        src="/logo-icon-white.svg"
        alt=""
        width={720}
        height={720}
        className="hero-watermark absolute pointer-events-none select-none opacity-[0.08]"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-script text-3xl sm:text-4xl text-purple-200 block font-normal">
              {isAm ? "እንኳን ደህና መጡ" : "Welcome Home"}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.08]">
              {isAm ? "ወደ ሰሚት ሕይወት ብርሃን ጉብኝትዎን ያቅዱ" : "Your first visit starts here"}
            </h1>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
              {isAm
                ? "ለመጀመሪያ ጊዜ እየጎበኙንም ሆነ ቋሚ መንፈሳዊ ቤተሰብ የሚፈልጉ፣ በሰሚት እምብርት በክርስቶስ ፍቅርና በሞቀ አቀባበል ልንቀበልዎ በደስታ እንጠብቃለን።"
                : "Whether you're visiting for the first time or looking for a church home, we would love to welcome you. There is room for you here."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="#service-times"
                className={cn(buttonVariants({ variant: "on-dark", size: "lg" }), "rounded-full px-7 gap-2 font-semibold shadow-md shadow-purple-950/20")}
              >
                <Calendar className="size-4 text-primary" />
                <span>{isAm ? "የአምልኮ ሰዓታት" : "Gathering times"}</span>
              </Link>
              <Link
                href="#transit"
                className={cn(buttonVariants({ variant: "on-dark-outline", size: "lg" }), "rounded-full px-7 gap-2 font-semibold")}
              >
                <Navigation className="size-4" />
                <span>{isAm ? "አቅጣጫና ትራንስፖርት" : "Getting here"}</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-3 text-sm text-white/90">
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <span>
                {isAm
                  ? "ለእንግሊዝኛ ተናጋሪ እንግዶች የትርጉም አገልግሎት ዘወትር ይገኛል"
                  : "English & Amharic fellowship translation is always available for international guests"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-xs shadow-2xl">
                <div className="relative w-full h-80 lg:h-[420px] bg-primary-deep/60">
                  <Image
                    src="/gallery/photo_18_2026-08-27_14-11-14.jpg"
                    alt={isAm ? "የሕይወት ብርሃን ሰሚት አምልኮ አዳራሽ" : "Hiwot Birhan Church Summit sanctuary and congregants"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex items-center justify-between bg-primary-deep/95 border-t border-white/10">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      {isAm ? "የእሑድ አምልኮ ፕሮግራም" : "Sunday Worship Gathering"}
                    </h2>
                    <p className="text-xs text-white/70 mt-0.5">
                      {isAm ? "የአዳራሹ በሮች በ 2:30 ጠዋት ይከፈታሉ" : "Sanctuary doors open at 8:30 AM EAT"}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs border border-accent/30">
                    {isAm ? "ሁሉም ተጋብዘዋል" : "All Welcome"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
