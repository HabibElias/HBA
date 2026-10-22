"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function HeroSection() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";
  return (
    <section className="home-hero relative isolate overflow-hidden text-white">
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-photo absolute inset-y-0 right-0" aria-hidden="true">
        <Image src="/summit-worship.jpg" alt="" fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover object-[58%_center]" />
      </div>
      <div className="hero-photo-shade absolute inset-0 pointer-events-none" aria-hidden="true" />
      <Image src="/logo-icon-white.svg" alt="" width={720} height={720} className="hero-watermark absolute pointer-events-none select-none" aria-hidden="true" />
      
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 pt-36 pb-32 lg:pt-48 lg:pb-44 flex items-center">

        <ScrollReveal variant="fade-up" duration={800} distance={32} className="hero-copy relative z-10 max-w-xl">
          <h1 className="font-display font-medium leading-[1.04] tracking-tight mb-6 text-white">
            {isAm ? (
              <>
                <span className="font-script text-2xl sm:text-3xl text-purple-200 block mb-2 font-normal">
                  በአዲስ አበባ ሰሚት
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold">
                  {t?.heroSection?.title ?? "የሕይወትን ብርሃን ማወጅ"}
                </span>
              </>
            ) : (
              <>
                <span className="font-script text-2xl sm:text-3xl lg:text-4xl text-purple-200 block mb-1 font-normal">
                  Come and worship
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  WITH US.
                </span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-lg mb-8 leading-relaxed">
            {isAm
              ? "እግዚአብሔርን ለማምለክ፣ ቃሉን ለመስማትና በእምነት አብሮ ለማደግ የተሰበሰበ ሞቅ ያለ ክርስቲያናዊ ቤተሰብ። እዚህ ለእርስዎም ስፍራ አለ።"
              : "We gather to worship God, hear His Word, and grow together in faith. Whether you are exploring faith or looking for a church home, you are warmly welcome."}
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              href="#service-times"
              className={cn(
                buttonVariants({ variant: "on-dark", size: "lg" }),
                "gap-2.5 rounded-full font-semibold px-7 shadow-lg shadow-purple-950/20"
              )}
            >
              <Calendar className="size-4 text-primary" />
              <span>{t?.heroSection?.planVisit ?? "Plan your first visit"}</span>
            </Link>
            <Link
              href="#sermons"
              className={cn(
                buttonVariants({ variant: "on-dark-outline", size: "lg" }),
                "gap-2.5 rounded-full font-semibold px-7"
              )}
            >
              <Play className="size-4 fill-current" />
              <span>{t?.heroSection?.watchSermon ?? "Explore messages"}</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
