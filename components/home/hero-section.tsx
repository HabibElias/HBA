"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";
  return (
    <section className="home-hero relative isolate overflow-hidden text-white">
      <div className="hero-photo absolute inset-y-0 right-0" aria-hidden="true">
        <Image src="/summit-worship.jpg" alt="" fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover object-[58%_center]" />
      </div>
      <div className="hero-photo-shade absolute inset-0 pointer-events-none" aria-hidden="true" />
      <Image src="/logo-icon-white.svg" alt="" width={720} height={720} className="hero-watermark absolute pointer-events-none select-none" aria-hidden="true" />
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 w-full pt-36 pb-28 lg:pt-48 lg:pb-36">
        <div className="hero-copy relative z-10 max-w-xl">
          <h1 className="font-display font-medium leading-[1.02] tracking-tight mb-7 text-white">
            {isAm ? (t?.heroSection?.title ?? "በአዲስ አበባ የሕይወትን ብርሃን ማወጅ"
            ) : (
              <>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mb-3">Come and worship</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl italic">with us.</span>
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
                "gap-2.5 rounded-full font-semibold px-7"
              )}
            >
              <Calendar className="size-4 text-primary-deep" />
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
        </div>
      </div>
    </section>
  );
}
