"use client";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/context/content-context";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
export function ProgramsHero() {
  const { events: upcomingEvents } = useContent();
  const { lang } = useLanguage(); const isAm = lang === "am"; const next = upcomingEvents[0];
  return <section className="subpage-hero text-white">
    <div className="site-container pt-32 pb-20 md:pt-36 md:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <div className="lg:col-span-7">
        <h1 className="font-display whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight max-w-2xl">{isAm ? "አብረን እንሰብሰብ።\nአብረን እንደግ።" : "Make room\nfor fellowship."}</h1>
        <p className="text-base sm:text-lg text-white/85 mt-6 max-w-xl leading-relaxed">{isAm ? "መጪ ስብሰባዎችን ይመልከቱ፣ የቀን መቁጠሪያዎ ላይ ያስቀምጡ፣ ካለፉ የሕብረት ጊዜያትም ትዝታዎችን ያስሱ።" : "Find your next gathering, save the date, and explore the moments that have brought our church family together."}</p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Link href="#upcoming" className={buttonVariants({variant:"on-dark"})}>{isAm ? "መጪ ስብሰባዎች" : "Find a gathering"}</Link>
          <Link href="#archive" className={buttonVariants({variant:"on-dark-outline"})}>{isAm ? "ያለፉ መርሐ ግብሮች" : "Past gatherings"}</Link>
        </div>
      </div>
      {next && <Link href={`/programs/${next.id}`} className="group lg:col-span-5 rounded-3xl bg-white text-foreground overflow-hidden block focus-visible:outline-white">
        <div className="relative h-52 sm:h-60 overflow-hidden"><Image src={next.image} alt={isAm?next.titleAm:next.title} fill preload sizes="(max-width:1024px) 100vw, 480px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"/></div>
        <div className="p-7 sm:p-8"><div className="flex items-center gap-3 text-primary text-sm font-semibold"><CalendarDays className="size-5"/><span>{isAm ? "በቀጣይ የሚካሄድ" : "Next in our calendar"}</span></div>
        <p className="font-display text-2xl sm:text-3xl font-semibold text-primary mt-4">{isAm ? next.dateAm : next.date}</p>
        <h2 className="font-display text-xl sm:text-2xl font-semibold leading-snug mt-4">{isAm ? next.titleAm : next.title}</h2>
        <p className="flex items-start gap-2 text-sm text-muted-foreground mt-5"><MapPin className="size-4 shrink-0 mt-0.5"/>{isAm ? next.locationAm : next.location}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-5">{isAm ? "ዝርዝሩን ይመልከቱ" : "See gathering details"}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></span></div>
      </Link>}
    </div>
  </section>;
}
