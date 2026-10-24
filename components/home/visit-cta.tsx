"use client";
import { useLandingContent } from "@/lib/context/landing-context";
import { useContent } from "@/lib/context/content-context";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Bus, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function VisitCta() {
  const { homeText, homeValue } = useLandingContent();
  const { lang } = useLanguage();
  const {schedules}=useContent();
  const isAm = lang === "am";

  return (
    <section className="paint-band py-28 md:py-36 lg:py-40" id="visit-cta">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Details Column (6 cols) */}
          <ScrollReveal variant="fade-right" duration={700} distance={32} className="lg:col-span-6">
            <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
              {homeText("home_visit_cta_1")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
              {homeText("home_visit_cta_2")}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
              {homeText("home_visit_cta_3")}
            </p>

            {/* Quick Location & Schedule Details (Open layout without divider lines) */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {homeText("home_visit_cta_4")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {homeValue("home_visit_cta_5")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Clock className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {homeText("home_visit_cta_6")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {schedules[0] ? `${schedules[0].eatTime} (${schedules[0].localTime})` : (homeText("home_visit_cta_7"))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Bus className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {homeText("home_visit_cta_8")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {homeValue("home_visit_cta_9")}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={homeValue("home_visit_cta_10")}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group rounded-full px-7 font-semibold gap-2")}
              >
                <span>{homeText("home_visit_cta_11")}</span>
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href={homeValue("home_visit_cta_12")}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-7 font-semibold")}
              >
                <span>{homeText("home_visit_cta_13")}</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Visual Map Column (6 cols) */}
          <ScrollReveal variant="fade-left" duration={750} delay={120} distance={32} className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-border bg-surface relative aspect-[16/11]">
              <Image
                src={homeValue("home_visit_cta_14")}
                alt={homeValue("home_visit_cta_15")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-surface/95 p-3.5 rounded-xl border border-border text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">{homeValue("home_visit_cta_16")}</span>
                  <span className="text-muted-foreground text-[11px]">{homeValue("home_visit_cta_17")}</span>
                </div>
                <a
                  href={homeValue("home_visit_cta_18")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {homeValue("home_visit_cta_19")}</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
