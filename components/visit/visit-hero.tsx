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
    <section className="py-16 md:py-24 bg-surface border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="w-10 h-0.5 bg-accent" />

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold tracking-tight leading-tight">
              {isAm ? "ወደ ሰሚት ሕይወት ብርሃን ጉብኝትዎን ያቅዱ" : "Your first visit starts here"}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {isAm
                ? "ለመጀመሪያ ጊዜ እየጎበኙንም ሆነ ቋሚ መንፈሳዊ ቤተሰብ የሚፈልጉ፣ በሰሚት እምብርት በክርስቶስ ፍቅርና በሞቀ አቀባበል ልንቀበልዎ በደስታ እንጠብቃለን።"
                : "Whether you're visiting for the first time or looking for a church home, we would love to welcome you. There is room for you here."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#service-times"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-7 gap-2 font-semibold")}
              >
                <Calendar className="size-4" />
                <span>{isAm ? "የአምልኮ ሰዓታት" : "Gathering times"}</span>
              </Link>
              <Link
                href="#transit"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7 gap-2 font-semibold")}
              >
                <Navigation className="size-4 text-primary" />
                <span>{isAm ? "አቅጣጫና ትራንስፖርት" : "Getting here"}</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-3 text-sm text-foreground/80">
              <CheckCircle2 className="size-4 text-primary shrink-0" />
              <span>
                {isAm
                  ? "ለእንግሊዝኛ ተናጋሪ እንግዶች የትርጉም አገልግሎት ዘወትር ይገኛል"
                  : "English & Amharic fellowship translation is always available for international guests"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-border bg-surface">
                <div className="relative w-full h-80 lg:h-[420px] bg-tint/40">
                  <Image
                    src="/gallery/photo_18_2026-08-27_14-11-14.jpg"
                    alt={isAm ? "የሕይወት ብርሃን ሰሚት አምልኮ አዳራሽ" : "Hiwot Birhan Church Summit sanctuary and congregants"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 border-t border-border flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-base font-semibold text-foreground">
                      {isAm ? "የእሑድ አምልኮ ፕሮግራም" : "Sunday Worship Gathering"}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isAm ? "የአዳራሹ በሮች በ 2:30 ጠዋት ይከፈታሉ" : "Sanctuary doors open at 8:30 AM EAT"}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-tint text-primary font-semibold text-xs">
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
