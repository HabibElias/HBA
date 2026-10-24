"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, Church, BookOpen, Flame, Heart } from "lucide-react";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const symbols = [Church, BookOpen, Flame, Heart];

export function ServiceSummary() {
  const { schedules } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 7500,
        active: !reducedMotion && schedules.length > 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    [reducedMotion, schedules.length],
  );
  const plugins = useMemo(() => [autoplay], [autoplay]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  if (!schedules.length) return null;

  return (
    <section
      id="service-times"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28"
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: reducedMotion ? 0 : 30 }}
        plugins={plugins}
        aria-label={isAm ? "የሳምንቱ መርሃ ግብር" : "Weekly schedule"}
      >
        <CarouselContent
          className="ml-0"
          aria-live={reducedMotion ? "polite" : "off"}
        >
          {schedules.map((card, index) => {
            const Icon = symbols[index % symbols.length];
            const photo =
              card.photos?.find((photo) => photo.isMain) ?? card.photos?.[0];
            const active = index === current;
            return (
              <CarouselItem
                key={card.id}
                className="pl-0"
                inert={!active}
                aria-hidden={!active}
                aria-label={`${index + 1} / ${schedules.length}`}
              >
                <article
                  id={`schedule-${card.id}`}
                  className={`relative isolate flex min-h-[460px] sm:min-h-[500px] lg:min-h-[560px] h-full flex-col justify-between overflow-hidden rounded-3xl bg-tint p-8 sm:p-12 lg:p-16 ${photo ? "text-white" : "text-foreground"}`}
                >
                  {photo && (
                    <>
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 1216px, 100vw"
                        className="object-cover"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/95 via-primary-deep/80 to-primary-deep/35" />
                    </>
                  )}
                  <Icon
                    className={`absolute -bottom-5 -right-5 size-48 sm:size-64 rotate-[-15deg] pointer-events-none ${photo ? "text-white/10" : "text-primary/10"}`}
                    aria-hidden="true"
                    strokeWidth={1}
                  />
                  <div className="relative z-10 flex max-w-2xl flex-col gap-5">
                    <span className="self-start rounded-full border border-primary/10 bg-surface px-4 py-2 text-sm font-semibold text-primary">
                      {isAm ? card.dayAm : card.day}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                      {isAm ? card.titleAm : card.title}
                    </h2>
                    <p
                      className={`text-base sm:text-lg leading-relaxed ${photo ? "text-white/90" : "text-muted-foreground"}`}
                    >
                      {isAm ? card.descriptionAm : card.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base sm:text-lg font-semibold">
                      <span>{card.eatTime}</span>
                      {card.localTime && (
                        <span
                          className={photo ? "text-white/90" : "text-primary"}
                        >
                          {card.localTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href="/visit#service-times"
                    className={`group relative z-10 mt-10 inline-flex min-h-11 w-fit items-center gap-4 text-sm font-semibold ${photo ? "text-white" : "text-primary"}`}
                  >
                    <span>{isAm ? "ተጨማሪ ዝርዝር" : "Learn more"}</span>
                    <ArrowUpRight
                      className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {schedules.length > 1 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1">
            <div
              className="flex flex-wrap justify-center"
              role="group"
              aria-label={isAm ? "ስብሰባ ይምረጡ" : "Choose a gathering"}
            >
              {schedules.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={isAm ? card.titleAm || card.title : card.title}
                  aria-current={index === current ? "true" : undefined}
                  aria-controls={`schedule-${card.id}`}
                  className="group inline-flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none ${index === current ? "w-8 bg-primary" : "w-3 bg-primary/30 group-hover:bg-primary/60"}`}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </Carousel>
    </section>
  );
}
