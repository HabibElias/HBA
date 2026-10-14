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
    <section className="relative overflow-hidden py-12 md:py-20 bg-surface">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-tint opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-accent/20 opacity-40 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tint text-primary text-xs font-semibold">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span>Summit Sub-City, Addis Ababa • ሳሚት ቅርንጫፍ</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-bold tracking-tight leading-tight">
              {isAm ? "ወደ ሰሚት ሕይወት ብርሃን ጉብኝትዎን ያቅዱ" : "Plan Your Visit to Hiwot Birhan Summit"}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {isAm
                ? "ለመጀመሪያ ጊዜ እየጎበኙንም ሆነ ቋሚ መንፈሳዊ ቤተሰብ የሚፈልጉ፣ በሰሚት እምብርት በክርስቶስ ፍቅርና በሞቀ አቀባበል ልንቀበልዎ በደስታ እንጠብቃለን።"
                : "Whether you're visiting for the first time or looking for a church home, we can't wait to welcome you with open arms and Christ's boundless grace in the heart of Summit."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#schedule"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "gap-2 shadow-md")}
              >
                <Calendar className="size-5" />
                <span>{isAm ? "የአምልኮ ሰዓታት" : "View Gathering Times"}</span>
              </Link>
              <Link
                href="#directions"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
              >
                <Navigation className="size-5 text-primary" />
                <span>{isAm ? "አቅጣጫና ትራንስፖርት" : "Directions & Transit"}</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-3 text-sm text-foreground/80">
              <CheckCircle2 className="size-5 text-accent-contrast dark:text-accent shrink-0" />
              <span>
                {isAm
                  ? "ለእንግሊዝኛ ተናጋሪ እንግዶች የትርጉም አገልግሎት ዘወትር ይገኛል"
                  : "English & Amharic fellowship translation always available for international guests"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-surface">
                <div className="relative w-full h-80 bg-tint">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXYAcscuIlK-5I_2kjpum-LpcFPhPnP2_LNcyg9dhW2Yimqa1acGwLMOGT5e74VeHdoAQtp7gXrkdGJfDOeZAMEdRQRzXUXxGnGUsFnheu9TOR4nWSmRKllzysjgnTV8DiLDhwiMuuanO0u4lzcK6blX4vcHUaohfYBPUVrEgSBHOR8bPeGYHcPNE_Oy98sXaje0RV-tpzFGaev4AiY95UNeGdK5fXqJWJ4UjgFJhh_arbATWUZoAQug"
                    alt={isAm ? "የሕይወት ብርሃን ሰሚት አምልኮ አዳራሽ" : "Hiwot Birhan Church Summit sanctuary and congregants"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 border-t border-border flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-base font-bold text-primary">
                      {isAm ? "የእሑድ አምልኮ ፕሮግራም" : "Sunday Worship Gathering"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isAm ? "የአዳራሹ በሮች በ 2:30 ጠዋት ይከፈታሉ" : "Sanctuary Doors Open at 8:30 AM"}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/15 text-accent-contrast dark:text-accent font-bold text-xs">
                    {isAm ? "ሁሉም ተጋብዘዋል" : "All Welcome"}
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 bg-surface border border-border p-4 rounded-xl shadow-md hidden sm:flex items-center gap-3 max-w-xs">
                <div className="size-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0">
                  <MapPin className="size-5 text-accent-contrast dark:text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">{isAm ? "ሰሚት 2ኛ በር" : "Summit Gate 2"}</p>
                  <p className="text-xs text-muted-foreground">{isAm ? "ከኢትዮጵያ ንግድ ባንክ አጠገብ" : "CBE Summit Branch Junction"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
