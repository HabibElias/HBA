"use client";
import { useLandingContent } from "@/lib/context/landing-context";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";



export function MinistriesPreview() {
  const { homeText, homeValue } = useLandingContent();
const MINISTRY_SHOWCASE = [
  {
    id: "worship-choir",
    name: homeValue("home_ministries_preview_card1_name"),
    nameAm: homeValue("home_ministries_preview_card1_nameAm"),
    schedule: homeValue("home_ministries_preview_card1_schedule"),
    scheduleAm: homeValue("home_ministries_preview_card1_scheduleAm"),
    image:
      homeValue("home_ministries_preview_card1_image"),
    link: homeValue("home_ministries_preview_card1_link"),
  },
  {
    id: "youth-ministry",
    name: homeValue("home_ministries_preview_card2_name"),
    nameAm: homeValue("home_ministries_preview_card2_nameAm"),
    schedule: homeValue("home_ministries_preview_card2_schedule"),
    scheduleAm: homeValue("home_ministries_preview_card2_scheduleAm"),
    image:
      homeValue("home_ministries_preview_card2_image"),
    link: homeValue("home_ministries_preview_card2_link"),
  },
  {
    id: "children-awana",
    name: homeValue("home_ministries_preview_card3_name"),
    nameAm: homeValue("home_ministries_preview_card3_nameAm"),
    schedule: homeValue("home_ministries_preview_card3_schedule"),
    scheduleAm: homeValue("home_ministries_preview_card3_scheduleAm"),
    image:
      homeValue("home_ministries_preview_card3_image"),
    link: homeValue("home_ministries_preview_card3_link"),
  },
];
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="ministries">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={600} className="mb-14 md:mb-18">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
              {homeText("home_ministries_preview_1")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              {homeText("home_ministries_preview_2")}
            </h2>
          </div>
          <Link
            href={homeValue("home_ministries_preview_3")}
            className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
          >
            <span>{homeText("home_ministries_preview_4")}</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </ScrollReveal>

      {/* 4 Cards Grid (3 photo cards + 1 vibrant royal purple accent card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MINISTRY_SHOWCASE.map((item, idx) => (
          <ScrollReveal
            key={item.id}
            delay={idx * 90}
            variant="fade-up"
            distance={28}
            className="h-full flex flex-col"
          >
            <div
              className="group bg-tint hover:bg-surface rounded-3xl overflow-hidden border border-transparent hover:border-primary/20 transition-all duration-200 flex flex-col justify-between flex-1"
            >
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-tint/40">
                <Image
                  src={item.image}
                  alt={isAm ? item.nameAm : item.name}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">
                  {isAm ? item.nameAm : item.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {isAm ? item.scheduleAm : item.schedule}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-200">
                {homeText("home_ministries_preview_5")}
              </span>
              <Link
                href={item.link}
                aria-label={isAm ? `${item.nameAm} ዝርዝር` : `Learn more about ${item.name}`}
              >
                <ArrowUpRight
                  className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      ))}

      {/* 4th Card: Prayer & Pastoral Care — clean, unclustered, following card design guidelines */}
      <ScrollReveal
        delay={270}
        variant="fade-up"
        distance={28}
        className="h-full flex flex-col"
      >
        <div className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-7 sm:p-8 transition-all duration-200 flex flex-col justify-between flex-1 min-h-[360px]">
          {/* Watermark icon — rotated, peeking from bottom-right corner */}
          <Heart
            className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
            aria-hidden="true"
            strokeWidth={1}
          />

          <div className="relative z-10 flex flex-col gap-3">
            <span className="inline-block self-start px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary transition-all duration-200">
              {homeText("home_ministries_preview_6")}
            </span>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
              {homeText("home_ministries_preview_7")}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {homeText("home_ministries_preview_8")}
            </p>

            <div className="mt-1 text-xs font-semibold text-primary/85">
              {homeText("home_ministries_preview_9")}
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-200">
              {homeText("home_ministries_preview_10")}
            </span>
            <Link
              href={homeValue("home_ministries_preview_11")}
              aria-label={homeText("home_ministries_preview_12")}
            >
              <ArrowUpRight
                className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
}
