"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/context/language-context";
import type { UpcomingEvent } from "@/lib/types/programs";

export interface UpcomingCardProps {
  event: UpcomingEvent;
}

export function UpcomingCard({ event }: UpcomingCardProps) {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  const handleAddToCalendar = () => {
    const summary = isAm ? event.titleAm : event.title;
    const description = isAm ? event.descriptionAm : event.description;
    const location = isAm ? event.locationAm : event.location;
    const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const dtstart = event.startDate ? event.startDate.replace(/[-:]/g, "") : now;
    const dtend = event.endDate ? event.endDate.replace(/[-:]/g, "") : dtstart;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Hiwot Birhan Church//Programs//EN",
      "BEGIN:VEVENT",
      `UID:${event.id}-${Date.now()}@hiwotbirhan.org`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${summary.replace(/\r?\n/g, " ")}`,
      `DESCRIPTION:${description.replace(/\r?\n/g, "\\n")}`,
      `LOCATION:${location.replace(/\r?\n/g, " ")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const noticeText = isAm ? event.noticeAm : event.notice;

  return (
    <article className="bg-surface rounded-2xl border border-border hover:border-primary/40 transition-colors flex flex-col justify-between overflow-hidden group">
      <div>
        <div className="relative h-56 w-full overflow-hidden bg-tint/40">
          <Image
            src={event.image}
            alt={isAm ? "ከሰሚት ቤተ ክርስቲያን ሕብረት" : "From our church life in Summit"}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-250"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute bottom-4 left-4 bg-surface px-3 py-1 rounded-full text-xs font-semibold text-primary">
            {isAm ? event.dateAm : event.date}
          </div>
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {isAm ? event.categoryLabelAm : event.categoryLabel}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-2">
            <MapPin className="size-3.5 shrink-0" />
            <span>{isAm ? event.locationAm : event.location}</span>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mb-2 leading-snug">
            {isAm ? event.titleAm : event.title}
          </h3>

          {event.theme && (
            <div className="inline-block px-3 py-1 rounded-full bg-tint text-primary text-xs font-medium mb-3">
              {isAm
                ? event.themeAm || event.theme
                : `Theme: “${event.theme}”`}
            </div>
          )}

          <p className="text-muted-foreground text-sm mb-4 leading-relaxed ">
            {isAm ? event.descriptionAm : event.description}
          </p>

          <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-1">
            <div className="font-medium text-foreground">
              {isAm ? event.timeAm : event.time}
            </div>
            {noticeText && (
              <div className="text-primary font-medium">
                {noticeText}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex gap-2 mt-auto">
        <Link
          href={
            event.registerLink && !event.registerLink.startsWith("#")
              ? event.registerLink
              : "/visit#contact"
          }
          className={cn(buttonVariants({ variant: "default" }), "rounded-full flex-1 text-center font-semibold text-xs sm:text-sm")}
        >
          {isAm ? "ይመዝገቡ / አሳውቁ" : "Ask about attending"}
        </Link>
        <button
          type="button"
          onClick={handleAddToCalendar}
          aria-label={isAm ? "ቀን መቁጠሪያ ላይ አስቀምጥ" : "Add to Calendar"}
          title={isAm ? "ቀን መቁጠሪያ ላይ አስቀምጥ" : "Add to Calendar"}
          className="size-11 rounded-full border border-border text-primary hover:bg-tint transition-colors cursor-pointer flex items-center justify-center shrink-0"
        >
          <Calendar className="size-4" />
        </button>
      </div>
    </article>
  );
}
