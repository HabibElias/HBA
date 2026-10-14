"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, BookOpen, HeartHandshake, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function AboutIntro() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Visual Collage Column (5 Cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden border-4 border-surface shadow-2xl ring-8 ring-tint relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2zDGYQ52r6U4Z4w1DXa8bbECaRlFcRyiCtD_jOAUp3S1Gmlks5BGIMcFoy7gYgEzhDtNsnn8S3lYpbxORFWS4dadQzV4f-OGnbb8zr4GuZAwiPuQXvWgPCSPEBaN1Jorn9w_PWjCmhVjDOwDGIiZ7jtziekI1YJ83MY1cSbB75GkgBjHZXElexPyyiok5BxVR5Zv1cL72BQv2q1areSqT2wSuex0caKUZVN_VQJ-rWKRRjUSjdDvhqw"
                alt="Hiwot Birhan Church Family in Summit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

            {/* Floating Outreach Badge */}
            <div className="absolute -bottom-4 right-2 sm:right-6 bg-surface p-4 rounded-2xl border border-border shadow-xl max-w-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
                <HeartHandshake className="size-5" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-foreground">Grace & Truth</div>
                <div className="text-xs text-muted-foreground">Community Outreach Summit</div>
              </div>
            </div>

            {/* Script Pill */}
            <div className="absolute -top-3 -left-2 bg-primary-deep text-white px-3.5 py-1.5 rounded-full shadow-md text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent" />
              <span>{isAm ? "ብርሃንና ሕይወት ለሁሉም" : "Light & Life Shared"}</span>
            </div>
          </div>
        </div>

        {/* Narrative Copy Column (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="size-4" />
            <span>{isAm ? "ስለ እኛ • የቤተክርስቲያናችን ቤተሰብ" : "About Our Church Family • ስለ እኛ"}</span>
          </div>

          <div className="w-10 h-0.5 bg-accent mb-5" />

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
            {isAm
              ? "የሕይወት ብርሃን ለሁሉም የደረሰ ሞቅ ያለ መንፈሳዊ ቤተሰብ"
              : "Light & Life (Hiwot Birhan) Shared with Everyone"}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {isAm
                ? "የሕይወት ብርሃን ቤተክርስቲያን የአዲስ አበባ ሰሚት ቅርንጫፍ ለክርስቶስ፣ ለመጽሐፍ ቅዱስ እውነትና ለእውነተኛ ክርስቲያናዊ ሕብረት የቆመች ወንጌላዊት ቤተክርስቲያን ናት። በሰሚት በር 2 አቅራቢያ በየሳምንቱ የእግዚአብሔርን ጸጋ ለማክበርና ፍቅሩን ለጎረቤቶቻችን ለማዳረስ እንሰበሰባለን።"
                : "Hiwot Birhan Church Addis Ababa Summit Branch is an evangelical Christian body deeply committed to Christ, biblical truth, and heartfelt community. Nestled within the residential heart of Summit near Gate 2, we gather each week to celebrate God's grace and bring His tangible love to our neighbors."}
            </p>
            <p>
              {isAm
                ? "ስለ ክርስትና እምነት ለማወቅ የሚፈልጉ፣ ወደ ሰሚት አካባቢ አዲስ የመጡ፣ ወይም ለቤተሰብዎ ወንጌላዊ መንፈሳዊ ቤት የሚሹ ከሆኑ፤ ክፍት ልብ፣ በአማርኛና በእንግሊዝኛ የሚቀርብ እውነተኛ አምልኮና ሞቅ ያለ ሕብረት ይጠብቆታል።"
                : "Whether you are exploring Christianity for the first time, relocating to the Summit area, or seeking a vibrant, gospel-centered spiritual home for your family, you will find open doors, authentic worship in Amharic and English, and loving fellowship."}
            </p>
          </div>

          {/* Distinctives Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
            <div className="p-4 rounded-xl bg-tint/40 border border-border">
              <div className="flex items-center gap-2.5">
                <BookOpen className="size-5 text-primary" />
                <span className="text-sm font-bold text-foreground">
                  {isAm ? "የመጽሐፍ ቅዱስ ትምህርት" : "Biblical Preaching"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isAm
                  ? "በክርስቶስ ያተኮረ፣ የቃሉን እውነት ለዘመናችን የዕለት ተዕለት ሕይወት የሚያስረዳ ትምህርት።"
                  : "Christ-centered exposition applying scripture to modern everyday life in Ethiopia."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-tint/40 border border-border">
              <div className="flex items-center gap-2.5">
                <Users className="size-5 text-primary" />
                <span className="text-sm font-bold text-foreground">
                  {isAm ? "የትውልድ አገልግሎቶች" : "Generational Ministries"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isAm
                  ? "የሕፃናት የአዋና አገልግሎት፣ ንቁ የወጣቶች ሕብረት እና የቤተሰብ ድጋፍ አውታር።"
                  : "Thriving Awana children's program, dynamic youth fellowship, and supportive family networks."}
              </p>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "primary" }), "gap-2")}
            >
              <span>{isAm ? "ታሪካችንንና እሴቶቻችንን ይወቁ" : "Discover Our Story & Values"}</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/visit#transit"
              className={cn(buttonVariants({ variant: "ghost" }), "gap-2 text-primary")}
            >
              <MapPin className="size-4" />
              <span>{isAm ? "አድራሻና ካርታ" : "Directions & Map"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
