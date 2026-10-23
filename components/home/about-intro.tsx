"use client";
import { useLandingContent } from "@/lib/context/landing-context";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function AboutIntro() {
  const { homeText, homeValue } = useLandingContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Narrative Copy Column (6 cols) */}
        <ScrollReveal variant="fade-right" duration={700} distance={32} className="lg:col-span-6 order-2 lg:order-1">
          <span className="font-script text-2xl sm:text-3xl text-primary-soft block mb-2 font-normal">
            {homeText("home_about_intro_1")}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-6">
            {homeText("home_about_intro_2")}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {homeText("home_about_intro_3")}
            </p>
            <p>
              {homeText("home_about_intro_4")}
            </p>
          </div>

          {/* Pull Quote / Core Conviction */}
          <div className="my-8 py-3 pl-4 border-l-2 border-primary-soft space-y-2">
            <blockquote className="font-display text-base sm:text-lg text-foreground font-medium leading-snug">
              {homeText("home_about_intro_5")}
            </blockquote>
            <p className="text-xs text-primary font-semibold mt-2">
              {homeText("home_about_intro_6")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={homeValue("home_about_intro_7")}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "group rounded-full px-7 font-semibold shadow-sm hover:shadow-md hover:bg-primary-deep transition-all"
              )}
            >
              <span>{homeText("home_about_intro_8")}</span>
              <ArrowUpRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href={homeValue("home_about_intro_9")}
              className="group inline-flex items-center justify-center rounded-full text-sm font-semibold min-h-11 px-7 py-2.5 bg-tint hover:bg-surface text-primary border border-border/80 hover:border-primary/30 transition-all shadow-xs hover:shadow-sm"
            >
              <MapPin className="size-4 mr-1.5 text-primary transition-colors" />
              <span>{homeText("home_about_intro_10")}</span>
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
                src={homeValue("home_about_intro_11")}
                alt={homeValue("home_about_intro_12")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

            {/* Floating Staggered Inset Image */}
            <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 w-48 sm:w-56 aspect-[4/3] rounded-3xl overflow-hidden border-4 border-surface bg-tint shadow-xl">
              <Image
                src={homeValue("home_about_intro_13")}
                alt={homeValue("home_about_intro_14")}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>

            {/* Pill Badge floating top right (like 10 year pathway badge in Inspiration.webp) */}
            <div className="absolute -top-3 right-0 sm:right-2 bg-tint border border-border/80 text-primary text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
              {homeText("home_about_intro_15")}
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
