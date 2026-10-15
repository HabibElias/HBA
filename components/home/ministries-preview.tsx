"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

const MINISTRY_SHOWCASE = [
  {
    id: "worship-choir",
    name: "Worship & Choir",
    nameAm: "የአምልኮና የመዘምራን አገልግሎት",
    schedule: "Saturdays 3:30 PM & Sundays 8:00 AM",
    scheduleAm: "ቅዳሜ ከሰዓት 9:30 እና እሑድ ጠዋት 2:00",
    image:
      "/gallery/photo_24_2026-08-27_14-11-14.jpg",
    link: "/visit#contact",
  },
  {
    id: "youth-ministry",
    name: "Youth & Young Adults",
    nameAm: "የወጣቶችና የዩኒቨርሲቲ ተማሪዎች",
    schedule: "Saturdays 4:00 PM – 6:00 PM EAT",
    scheduleAm: "ቅዳሜ ከሰዓት 10:00 – 12:00",
    image:
      "/gallery/photo_15_2026-08-27_14-11-14.jpg",
    link: "/visit#contact",
  },
  {
    id: "children-awana",
    name: "Children & Awana Club",
    nameAm: "የሕፃናትና የአዋና አገልግሎት",
    schedule: "Sundays 9:30 AM & Saturdays 9:00 AM",
    scheduleAm: "እሑድ ጠዋት 3:30 እና ቅዳሜ ጠዋት 3:00",
    image:
      "/gallery/photo_11_2026-08-27_14-11-14.jpg",
    link: "/visit#contact",
  },
];

export function MinistriesPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-16 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="ministries">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 pb-6 border-b border-border/60 gap-4">
        <div>
          <div className="w-10 h-0.5 bg-accent mb-3" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            {isAm ? "እያንዳንዱ ልብ የሚያድግበት ስፍራ" : "A place to grow together"}
          </h2>
        </div>
        <Link
          href="/visit#contact"
          className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
        >
          <span>{isAm ? "ሁሉንም አገልግሎቶች ይመልከቱ" : "Find your place"}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* 4 Cards Grid (3 photo cards + 1 solid deep indigo accent card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MINISTRY_SHOWCASE.map((item) => (
          <div
            key={item.id}
            className="group bg-surface rounded-2xl overflow-hidden border border-border/80 hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-tint/40">
                <Image
                  src={item.image}
                  alt={isAm ? item.nameAm : item.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-250"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1 leading-snug">
                  {isAm ? item.nameAm : item.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {isAm ? item.scheduleAm : item.schedule}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={item.link}
                aria-label={isAm ? `${item.nameAm} ዝርዝር` : `Learn more about ${item.name}`}
                className="group/arrow size-9 rounded-full bg-tint text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        ))}

        {/* 4th Card: Solid Deep Indigo Accent Card (Inspired by Inspiration.webp's Water Wells Card) */}
        <div className="bg-primary-deep text-white rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden border border-white/10">
          <div>
            <div className="w-8 h-0.5 bg-accent mb-6" />
            <span className="font-display text-xl font-semibold text-white block mb-4">
              {isAm ? "የጸሎትና የምክር አገልግሎት" : "Pastoral Care & Prayer"}
            </span>
            <blockquote className="font-display text-lg sm:text-xl font-medium leading-relaxed text-white">
              {isAm
                ? "«እኔ የዓለም ብርሃን ነኝ፤ የሚከተለኝ የሕይወት ብርሃን ይሆንለታል»"
                : "“Whoever follows me will not walk in darkness, but will have the light of life.”"}
            </blockquote>
            <p className="text-xs text-white/70 mt-3">— ዮሐንስ / John 8:12</p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/80">
              {isAm ? "ሐሙስ ማታ 12:00" : "Thursdays 6:00 PM"}
            </span>
            <Link
              href="/visit#contact"
              aria-label={isAm ? "የጸሎት ጥያቄ ይላኩ" : "Send prayer request"}
              className="group size-9 rounded-full bg-white text-primary-deep hover:bg-accent hover:text-primary-deep flex items-center justify-center transition-colors"
            >
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
