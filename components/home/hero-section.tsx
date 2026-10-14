"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Play, MapPin, Sparkles, Quote } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="relative bg-gradient-to-br from-primary-deep via-primary to-primary-deep text-white overflow-hidden pt-16 pb-20 md:py-24">
      {/* Subtle Circular Watermark Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
        <div className="w-[680px] h-[680px] rounded-full border border-accent/20 flex items-center justify-center bg-[radial-gradient(circle,rgba(200,153,58,0.15)_0%,rgba(27,23,99,0)_70%)]">
          <Sparkles className="size-80 text-accent/20 select-none" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Copy Column (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-accent mb-5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">
              {t?.heroSection?.badge ?? "ሕይወት ብርሃን • Addis Ababa Summit Community"}
            </span>
          </div>

          <div className="w-10 h-0.5 bg-accent mb-6" />

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
            {isAm ? (
              t?.heroSection?.title ?? "በአዲስ አበባ የሕይወትን ብርሃን ማወጅ"
            ) : (
              <>
                Proclaiming the <span className="text-accent italic">light of life</span> in Addis Ababa
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
            {t?.heroSection?.subtitle ??
              "A welcoming Christian family gathering to worship God, hear His Word, and grow together in faith. There is room for you here."}
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              href="/visit#service-times"
              className={cn(buttonVariants({ variant: "on-dark", size: "lg" }), "gap-2")}
            >
              <Calendar className="size-5 text-primary" />
              <span>{t?.heroSection?.planVisit ?? "Plan your first visit"}</span>
            </Link>
            <Link
              href="#sermons"
              className={cn(buttonVariants({ variant: "on-dark-outline", size: "lg" }), "gap-2")}
            >
              <Play className="size-5 fill-current" />
              <span>{t?.heroSection?.watchSermon ?? "Watch latest message"}</span>
            </Link>
          </div>

          {/* Key Highlight Indicators */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 w-full max-w-lg">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-accent">10+</div>
              <div className="text-xs sm:text-sm text-white/70">
                {t?.heroSection?.statYearsLabel ?? "Years in Summit"}
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-accent">400+</div>
              <div className="text-xs sm:text-sm text-white/70">
                {t?.heroSection?.statBelieversLabel ?? "Weekly Believers"}
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-accent">Summit</div>
              <div className="text-xs sm:text-sm text-white/70">
                {t?.heroSection?.statLocationLabel ?? "Addis Ababa, ET"}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Column (5 Cols) */}
        <div className="lg:col-span-5 relative z-10">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-primary-deep aspect-[4/5] relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDiv-EzcHL4BBZjnlPGs-EOJDqziGOuaig9EDXlft2QizM4OPQfbW5bv58dq_5sH5fR4BwL0M2rgb-zJWP8YVm-f71RyMIhyYIzkYFI_ccDNaCtSeeWDsaawUlY-4aUJwBKIU748Gfg8DZS6HUXP4WD9z4L7MreZpq8yydtiK3tjhni1a7Tb97rEu0MFljTZ4__BafFEoAtD_og-LIpnBsi70wFrh7UJRY5g2tibiq_WwpU_1eqf2OVw"
                alt="Hiwot Birhan Church Sunday Worship in Addis Ababa Summit"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-primary-deep/90 backdrop-blur-md border border-white/20 text-white">
                <div className="flex items-start gap-3">
                  <Quote className="size-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm text-white/90 italic leading-snug">
                      "{t?.heroSection?.verseText ?? "እኔ የዓለም ብርሃን ነኝ፤ የሚከተለኝ የሕይወት ብርሃን ይሆንለታል"}"
                    </p>
                    <p className="text-xs text-accent font-semibold mt-1">
                      {t?.heroSection?.verseRef ?? "ዮሐንስ 8:12 (John 8:12)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Location Pill Badge */}
            <div className="absolute -top-4 -left-4 bg-surface text-foreground p-3 rounded-xl shadow-lg border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Summit Condominium</p>
                <p className="text-[11px] text-muted-foreground">Near Gate 2, Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
