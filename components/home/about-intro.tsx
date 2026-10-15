"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function AboutIntro() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-16 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Narrative Copy Column (7 cols) */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="w-10 h-0.5 bg-accent mb-5" />

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-5">
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

          {/* Pull Quote / Core Conviction (replaces generic icon cards) */}
          <div className="my-8 py-5 border-y border-border">
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
              className={cn(buttonVariants({ variant: "primary", size: "default" }), "group rounded-full px-7 font-semibold")}
            >
              <span>{isAm ? "ታሪካችንንና እሴቶቻችንን ይወቁ" : "Our story and values"}</span>
              <ArrowUpRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/visit#transit"
              className={cn(buttonVariants({ variant: "outline", size: "default" }), "rounded-full px-7 font-semibold")}
            >
              <MapPin className="size-4 mr-1.5 text-primary" />
              <span>{isAm ? "አድራሻና አቅጣጫ" : "Find us in Summit"}</span>
            </Link>
          </div>
        </div>

        {/* Staggered Photography Composition (5 cols, inspired by Inspiration.webp) */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative mx-auto max-w-md lg:max-w-none pt-4 pb-8 pr-4">
            {/* Primary Base Image */}
            <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3] sm:aspect-[4/3] relative bg-tint/50">
              <Image
                src="/gallery/photo_18_2026-08-27_14-11-14.jpg"
                alt="Hiwot Birhan Church Family in Summit Addis Ababa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

            {/* Floating Staggered Inset Image */}
            <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 w-44 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-surface bg-tint">
              <Image
                src="/gallery/photo_10_2026-08-27_14-11-14.jpg"
                alt="Sunday Worship at Summit"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Pill Badge floating top right */}
            <div className="absolute -top-3 right-0 sm:-right-2 bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              {isAm ? "ሰሚት • አዲስ አበባ" : "Summit Branch • Addis Ababa"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
