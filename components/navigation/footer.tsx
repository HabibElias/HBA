"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { LogoLockup } from "./logo";
import { useLanguage } from "@/lib/context/language-context";
import { useContent } from "@/lib/context/content-context";


export function Footer({ year }: { year: number }) {
  const { schedules, settings } = useContent();
  const heroServices = schedules.map(s=>({...s,badge:s.day,badgeAm:s.dayAm,timeLocal:s.localTime}));
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  return (
    <footer className="paint-footer bg-primary-deep text-white relative isolate">
      <Image src="/illustrations/summit-sanctuary.png" alt="" width={1536} height={1024} sizes="(max-width: 910px) 90vw, 820px" className="footer-art" aria-hidden="true" />
      <div className="relative w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14 md:mb-16">
          <p className="font-script text-4xl sm:text-5xl lg:text-6xl max-w-2xl leading-tight">{isAm ? "እዚህ ለእርስዎም ስፍራ አለ።" : "There is room for you here."}</p>
          <Link href="/visit" className="group inline-flex items-center gap-3 self-start md:self-auto rounded-full bg-white text-primary-deep font-semibold text-sm px-6 py-3.5 shrink-0 hover:bg-tint transition-colors">{t?.nav?.planVisit ?? "Plan your visit"}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12">
          {/* Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <LogoLockup reversed />
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              {t?.footerSection?.about ??
                "A welcoming Christian family in Addis Ababa gathered to worship God, hear His Word, and grow together in faith. There is room for you here."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white shadow-xs"
              >
                <Send className="size-4" />
              </a>
              <a
                href={`tel:${settings.phone}`}
                aria-label="Phone"
                className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white shadow-xs"
              >
                <Phone className="size-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                aria-label="Email"
                className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white shadow-xs"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              {t?.footerSection?.quickLinks ?? "Explore"}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t?.nav?.home ?? "Home"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t?.nav?.about ?? "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  {t?.nav?.programs ?? "Programs & Events"}
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-white transition-colors">
                  {isAm ? "ስብከቶች" : "Sermons"}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {isAm ? "ፎቶዎች" : "Gallery"}
                </Link>
              </li>
              <li>
                <Link href="/visit" className="hover:text-white transition-colors">
                  {t?.nav?.visit ?? "Visit & Contact"}
                </Link>
              </li>
              <li>
                <Link href="/visit#service-times" className="hover:text-white transition-colors">
                  {t?.footerSection?.serviceTimes ?? "Gathering Times"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services from Hero Section (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="size-4 text-accent" />
              <span>{t?.footerSection?.serviceTimes ?? "Gathering Times"}</span>
            </h3>
            <div className="space-y-3.5 text-xs leading-relaxed text-white/80">
              {heroServices.map((service) => (
                <div key={service.id} className="border-b border-white/5 pb-2.5 last:border-none last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">
                      {isAm ? service.badgeAm : service.badge}
                    </span>
                    <span className="font-medium text-accent">
                      {service.timeLocal}
                    </span>
                  </div>
                  <span className="text-white/60 block mt-0.5">
                    {isAm ? service.titleAm : service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Directions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-semibold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              <span>{isAm ? "አድራሻ" : "Summit Location"}</span>
            </h3>
            <div className="text-xs text-white/80 leading-relaxed space-y-1.5">
              <p className="font-medium text-white">
                {isAm ? settings.addressAm : settings.address}
              </p>
              <p className="text-white/70">
                {isAm ? "ከኢትዮጵያ ንግድ ባንክ አጠገብ፣ ቦሌ" : "Near CBE Summit Branch, Bole Subcity"}
              </p>
              <p className="text-white/70">Addis Ababa, Ethiopia</p>
              <div className="pt-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="font-medium text-white hover:text-accent transition-colors block"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="pt-1">
                <Link
                  href="/visit#transit"
                  className="inline-flex items-center gap-1 text-accent hover:underline font-semibold text-xs transition-colors"
                >
                  <span>{isAm ? "አቅጣጫና ካርታ" : "Directions & Map"}</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>
            © {year} Hiwot Birhan Addis Ababa Summit Branch.{" "}
            {isAm ? "መብቱ በሕግ የተጠበቀ ነው።" : "All rights reserved."}
          </p>
          <p className="font-display italic text-accent/90">
            {isAm ? "«ሰላም ለእናንተ ይሁን»" : "“Peace be with you.”"}
          </p>
        </div>
      </div>
    </footer>
  );
}
