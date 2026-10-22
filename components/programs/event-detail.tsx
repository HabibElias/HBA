"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarPlus,
  Clock,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { buttonVariants } from "@/components/ui/public-button";
import type { UpcomingEvent } from "@/lib/types/programs";
export function EventDetail({ event }: { event: UpcomingEvent }) {
  const { lang } = useLanguage(),
    am = lang === "am";
  return (
    <>
      <section className="subpage-hero text-white pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="site-container">
          <Link
            href="/programs#upcoming"
            className="inline-flex items-center gap-2 text-sm text-white/80 mb-8"
          >
            <ArrowLeft size={16} />
            {am ? "ወደ ፕሮግራሞች" : "All gatherings"}
          </Link>
          <p className="text-sm text-white/80 mb-5">
            {am ? event.dateAm : event.date} ·{" "}
            {am ? event.categoryLabelAm : event.categoryLabel}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl leading-tight">
            {am ? event.titleAm : event.title}
          </h1>
        </div>
      </section>
      <div className="site-container py-16 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
            <Image
              src={event.image}
              alt={am ? event.titleAm : event.title}
              fill
              preload
              sizes="(max-width:1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          <h2 className="section-title mt-10">
            {am ? "ስለ መርሐ ግብሩ" : "About this gathering"}
          </h2>
          <p className="body-copy mt-6 whitespace-pre-line">
            {am ? event.descriptionAm : event.description}
          </p>
          {event.theme && (
            <p className="font-display text-2xl text-primary mt-8">
              {am ? event.themeAm : event.theme}
            </p>
          )}
          {event.notice && (
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-semibold">
                {am ? "ከመምጣትዎ በፊት" : "Before you come"}
              </h3>
              <p className="body-copy mt-4">
                {am ? event.noticeAm : event.notice}
              </p>
            </div>
          )}
        </div>
        <aside className="lg:col-span-4 bg-surface border border-border rounded-3xl p-7 sm:p-9 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl font-semibold">
            {am ? "አብረውን ይሁኑ" : "Join us."}
          </h2>
          <div className="space-y-7 my-8">
            <div className="flex gap-3">
              <Clock className="text-primary shrink-0 mt-1" size={19} />
              <div>
                <strong className="block text-sm">
                  {am ? event.dateAm : event.date}
                </strong>
                <p className="text-sm text-muted-foreground mt-2">
                  {am ? event.timeAm : event.time}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="text-primary shrink-0 mt-1" size={19} />
              <div>
                <strong className="block text-sm">
                  {am ? event.locationAm : event.location}
                </strong>
                <a
                  className="text-primary text-sm mt-2 inline-flex items-center gap-1"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {am ? "ካርታ ይክፈቱ" : "Open map"}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={event.registerLink || "/visit#contact"}
              className={buttonVariants({ variant: "primary" })}
            >
              {am ? "ስለ መሳተፍ ይጠይቁ" : "Ask about attending"}
              <ArrowUpRight size={16} />
            </Link>
            <a
              href={`/api/events/${event.id}/calendar?lang=${lang}`}
              className={buttonVariants({ variant: "outline" })}
            >
              <CalendarPlus size={16} />
              {am ? "ቀኑን ያስቀምጡ" : "Save to calendar"}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
