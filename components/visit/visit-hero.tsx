"use client";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/context/content-context";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
export function VisitHero() {
  const { schedules: weeklySchedules, settings } = useContent();
  const { lang } = useLanguage(); const isAm = lang === "am"; const sunday = weeklySchedules[0];
  return <section className="subpage-hero text-white">
    <div className="site-container pt-36 pb-24 md:pt-44 md:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <div className="lg:col-span-7">
        <h1 className="font-display whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight max-w-2xl">{isAm ? "እዚህ ለእርስዎም\nስፍራ አለ።" : "A warm welcome.\nA place for you."}</h1>
        <p className="text-white/85 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">{isAm ? "ለመጀመሪያ ጊዜ እየጎበኙንም ሆነ መንፈሳዊ ቤተሰብ የሚፈልጉ፣ በሰሚት በፍቅር ልንቀበልዎ እንጠብቃለን። የስብሰባ ሰዓታትን፣ መንገድና የግንኙነት አማራጮችን ከዚህ ያግኙ።" : "Whether it’s your first Sunday or you’re looking for a church home, we would love to meet you. Find a gathering, plan your journey, and come as you are."}</p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Link href="#service-times" className={buttonVariants({variant:"on-dark"})}><CalendarDays className="size-4"/>{isAm ? "የስብሰባ ሰዓታት" : "Choose a gathering"}</Link>
          <Link href="#transit" className={buttonVariants({variant:"on-dark-outline"})}><MapPin className="size-4"/>{isAm ? "አቅጣጫና ካርታ" : "Get directions"}</Link>
        </div>
        <p className="inline-flex items-start gap-2 text-sm text-white/80 mt-8"><MapPin className="size-4 shrink-0 mt-0.5"/>{isAm ? settings.addressAm : settings.address}</p>
      </div>
      <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-surface text-foreground">
        <div className="relative h-64 sm:h-72"><Image src="/gallery/photo_18_2026-08-27_14-11-14.jpg" alt={isAm ? "የሰሚት ቤተ ክርስቲያን አዳራሽ" : "Inside the Summit sanctuary"} fill preload sizes="(max-width: 1024px) 100vw, 440px" className="object-cover object-[center_65%]"/></div>
        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">{isAm ? "በዚህ እሑድ ይቀላቀሉን" : "Join us this Sunday"}</h2>
          <p className="text-primary text-base font-semibold mt-4">{sunday?.eatTime || (isAm ? "ለሰዓቱ ያነጋግሩን" : "Contact us for gathering times")}</p>
          <p className="text-sm text-muted-foreground mt-2">{isAm ? "የኢትዮጵያ ሰዓት" : "Ethiopian time"}: {sunday?.localTime || "—"}</p>
          <Link href="#expect" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary mt-6">{isAm ? "ምን እጠብቃለሁ?" : "What to expect"}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link>
        </div>
      </div>
    </div>
  </section>;
}
