"use client";
import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { createEventCalendar } from "@/lib/calendar";
import type { UpcomingEvent } from "@/lib/types/programs";
export interface UpcomingCardProps { event: UpcomingEvent; }
export function UpcomingCard({ event }: UpcomingCardProps) {
  const { lang } = useLanguage(); const isAm = lang === "am";
  const saveDate = () => {
    const content = createEventCalendar(event, isAm); if (!content) return;
    const url = URL.createObjectURL(new Blob([content], {type:"text/calendar;charset=utf-8"}));
    const a = document.createElement("a"); a.href = url; a.download = `${event.id}.ics`; a.click();
    window.setTimeout(()=>URL.revokeObjectURL(url), 1000);
  };
  return <article id={event.id} className="agenda-event bg-surface rounded-3xl border border-border overflow-hidden">
    <div className="relative agenda-event-photo bg-tint">
      <Image src={event.image} alt={isAm ? "ከሰሚት ቤተ ክርስቲያን ሕይወት" : "From church life at Summit"} fill sizes="(max-width: 768px) 100vw, 280px" className="object-cover"/>
    </div>
    <div className="p-6 sm:p-8 lg:p-9 min-w-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
        <span className="text-primary font-semibold">{isAm ? event.dateAm : event.date}</span>
        <span className="px-3 py-1 bg-tint rounded-full text-primary text-xs font-medium">{isAm ? event.categoryLabelAm : event.categoryLabel}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold leading-snug"><Link href={`/programs/${event.id}`} className="hover:text-primary transition-colors">{isAm ? event.titleAm : event.title}</Link></h3>
      <p className="body-copy mt-4 max-w-3xl">{isAm ? event.descriptionAm : event.description}</p>
      {event.theme && <p className="text-sm font-medium text-primary mt-4">{isAm ? event.themeAm : event.theme}</p>}
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground mt-5">
        <span className="inline-flex items-start gap-2"><Clock className="size-4 shrink-0 mt-0.5"/>{isAm ? event.timeAm : event.time}</span>
        <span className="inline-flex items-start gap-2"><MapPin className="size-4 shrink-0 mt-0.5"/>{isAm ? event.locationAm : event.location}</span>
      </div>
      {(isAm ? event.noticeAm : event.notice) && <p className="text-sm text-muted-foreground mt-3">{isAm ? event.noticeAm : event.notice}</p>}
      <div className="flex flex-wrap gap-3 mt-7">
        <Link href={`/programs/${event.id}`} className={`${buttonVariants({variant:"primary"})} group`}>
          {isAm ? "ዝርዝሩን ይመልከቱ" : "View gathering"}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
        </Link>
        {event.startDate && <button type="button" onClick={saveDate} className={buttonVariants({variant:"outline"})} aria-label={`${isAm ? "ቀን ያስቀምጡ" : "Add to calendar"}: ${isAm ? event.titleAm : event.title}`}><CalendarPlus className="size-4"/>{isAm ? "ቀኑን ያስቀምጡ" : "Save the date"}</button>}
      </div>
    </div>
  </article>;
}
