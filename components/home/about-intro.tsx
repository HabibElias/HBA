"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function AboutIntro() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Narrative Copy Column (6 cols) */}
        <ScrollReveal variant="fade-right" duration={700} distance={32} className="lg:col-span-6 order-2 lg:order-1">
          <span className="font-script text-2xl sm:text-3xl text-primary-soft block mb-2 font-normal">
            {isAm ? "ስለ እኛና ስለ ቤተሰባችን" : "About Us"}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-6">
            {isAm
              ? "የሕይወት ብርሃን ለሁሉም የደረሰ ሞቅ ያለ መንፈሳዊ ቤተሰብ"
              : "Life and light, shared with everyone"}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {isAm
                ? "የሕይወት ብርሃን ቤተክርስቲያን የአዲስ አበባ ሰሚት ቅርንጫፍ ለክርስቶስ፣ ለመጽሐፍ ቅዱስ እውነትና ለእውነተኛ ክርስቲያናዊ ሕብረት የቆመች ወንጌላዊት ቤተክርስቲያን ናት። በሰሚት በር 2 አቅራቢያ በየሳምንቱ የእግዚአብሔርን ጸጋ ለማክበርና ፍቅሩን ለጎረቤቶቻችን ለማዳረስ እንሰበሰባለን።"
                : "Hiwot Birhan Church Addis Ababa Summit Branch is a Christian family deeply committed to biblical truth, genuine worship, and loving fellowship. Located in the residential neighborhood of Summit near Gate 2, we gather each week to celebrate God's grace and serve our city in the name of Christ."}
            </p>
            <p>
              {isAm
                ? "ስለ ክርስትና እምነት ለማወቅ የሚፈልጉ፣ ወደ ሰሚት አካባቢ አዲስ የመጡ፣ ወይም ለቤተሰብዎ ወንጌላዊ መንፈሳዊ ቤት የሚሹ ከሆኑ፤ ክፍት ልብ፣ በአማርኛና በእንግሊዝኛ የሚቀርብ እውነተኛ አምልኮና ሞቅ ያለ ሕብረት ይጠብቆታል።"
                : "Whether you are exploring Christianity, new to eastern Addis Ababa, or searching for a gospel-centered home for your family, you will find open doors, reverent worship in Amharic and English, and genuine care."}
            </p>
          </div>

          {/* Pull Quote / Core Conviction */}
          <div className="my-8 py-3 pl-4 border-l-2 border-primary-soft space-y-2">
            <blockquote className="font-display text-base sm:text-lg text-foreground font-medium leading-snug">
              {isAm
                ? "«እግዚአብሔርን መውደድ፣ ባልንጀራን ማፍቀርና ከተማችንን በክርስቶስ ስም ማገልገል የተማረ ሞቅ ያለ መንፈሳዊ ቤተሰብ።»"
                : "“A family of believers learning to love God, love our neighbors, and serve our city in the name of Christ.”"}
            </blockquote>
            <p className="text-xs text-primary font-semibold mt-2">
              {isAm ? "የሰሚት ቅርንጫፍ መሪ ቃል" : "Hiwot Birhan Summit Mission"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "group rounded-full px-7 font-semibold shadow-sm hover:shadow-md hover:bg-primary-deep transition-all"
              )}
            >
              <span>{isAm ? "ታሪካችንንና እሴቶቻችንን ይወቁ" : "Our story & values"}</span>
              <ArrowUpRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/visit#transit"
              className="group inline-flex items-center justify-center rounded-full text-sm font-semibold min-h-11 px-7 py-2.5 bg-tint hover:bg-surface text-primary border border-border/80 hover:border-primary/30 transition-all shadow-xs hover:shadow-sm"
            >
              <MapPin className="size-4 mr-1.5 text-primary transition-colors" />
              <span>{isAm ? "አድራሻና አቅጣጫ" : "Find us in Summit"}</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Staggered Photography Composition (from Inspiration.webp) */}
        <ScrollReveal
          variant="fade-left"
          duration={750}
          delay={120}
          distance={32}
          className="lg:col-span-6 order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none pt-4 pb-10 pr-4">
            {/* Soft Ambient Lilac Splash behind */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-tint to-transparent rounded-[3rem] -z-10 blur-xl opacity-70 pointer-events-none" />

            {/* Primary Base Image */}
            <div className="rounded-3xl overflow-hidden border border-border aspect-[4/3] sm:aspect-[4/3] relative bg-tint shadow-lg shadow-purple-950/5">
              <Image
                src="/gallery/photo_18_2026-08-27_14-11-14.jpg"
                alt="Hiwot Birhan Church Family in Summit Addis Ababa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

            {/* Floating Staggered Inset Image */}
            <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 w-48 sm:w-56 aspect-[4/3] rounded-3xl overflow-hidden border-4 border-surface bg-tint shadow-xl">
              <Image
                src="/gallery/photo_10_2026-08-27_14-11-14.jpg"
                alt="Sunday Worship at Summit"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>

            {/* Pill Badge floating top right (like 10 year pathway badge in Inspiration.webp) */}
            <div className="absolute -top-3 right-0 sm:right-2 bg-tint border border-border/80 text-primary text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
              {isAm ? "10+ ዓመታት በሰሚት • አዲስ አበባ" : "10+ Years in Summit • Addis Ababa"}
            </div>

            {/* Playful Curved Dashed Line (from Inspiration.webp) */}
            <div className="absolute -bottom-8 right-12 hidden sm:block pointer-events-none text-primary-soft opacity-60" aria-hidden="true">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                <path d="M5 30C35 38 85 35 115 5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
