"use client";
import { useLandingContent } from "@/lib/context/landing-context";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Pause, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useCarousel } from './use-carousel';

export function HeroSection() {
  const { homeText, homeValue, settings } = useLandingContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const photos = [...(settings.homeHeroPhotos ?? []) as {src: string; alt: string; isMain?: boolean}[]].sort((a, b) => Number(!!b.isMain) - Number(!!a.isMain));
  const carousel = useCarousel(photos.length);
  return (
    <section className="home-hero relative isolate overflow-hidden text-white" {...carousel.interaction}>
      <div className="hero-photo absolute inset-y-0 right-0" aria-hidden="true">
        {photos.map((photo, index) => carousel.shouldLoadImage(index) && <Image key={`${photo.src}-${index}`} src={photo.src} alt="" fill preload={index === 0} sizes="(min-width: 1024px) 65vw, 100vw" className={`object-cover object-[58%_center] transition-opacity duration-1000 motion-reduce:transition-none ${index === carousel.index ? 'opacity-100' : 'opacity-0'}`} />)}
        <div className="hero-photo-shade absolute inset-0 pointer-events-none" />
      </div>
      <Image src="/logo-icon-white.svg" alt="" width={540} height={540} className="hero-watermark absolute pointer-events-none select-none" aria-hidden="true" />
      
      <div className="hero-content relative w-full max-w-7xl mx-auto px-6 sm:px-8 pt-36 pb-48 lg:pt-48 lg:pb-56 flex items-center">

        <ScrollReveal variant="fade-up" duration={800} distance={32} className="hero-copy relative z-10 max-w-xl">
          <h1 className="font-display font-medium leading-[1.04] tracking-tight mb-6 text-white">
            {isAm ? (
              <>
                <span className="font-script text-2xl sm:text-3xl text-purple-200 block mb-2 font-normal">
                  {homeText("home_hero_section_3")}</span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold">
                  {homeText("home_hero_section_4")}
                </span>
              </>
            ) : (
              <>
                <span className="font-script text-2xl sm:text-3xl lg:text-4xl text-purple-200 block mb-1 font-normal">
                  {homeValue("home_hero_section_3")}</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  {homeValue("home_hero_section_4")}</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-lg mb-8 leading-relaxed">
            {homeText("home_hero_section_5")}
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              href={homeValue("home_hero_section_6")}
              className={cn(
                buttonVariants({ variant: "on-dark", size: "lg" }),
                "gap-2.5 rounded-full font-semibold px-7 shadow-lg shadow-purple-950/20"
              )}
            >
              <Calendar className="size-4 text-primary" />
              <span>{homeText("homeHeroPrimaryLabel")}</span>
            </Link>
            <Link
              href={homeValue("home_hero_section_7")}
              className={cn(
                buttonVariants({ variant: "on-dark-outline", size: "lg" }),
                "gap-2.5 rounded-full font-semibold px-7"
              )}
            >
              <Play className="size-4 fill-current" />
              <span>{homeText("homeHeroSecondaryLabel")}</span>
            </Link>
          </div>
          {photos.length > 1 && (
            <button type="button" onClick={carousel.toggle} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              {carousel.paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              {carousel.paused ? (isAm ? 'ፎቶዎችን ማሳየት ቀጥል' : 'Play slideshow') : (isAm ? 'ፎቶዎችን ማሳየት አቁም' : 'Pause slideshow')}
            </button>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
