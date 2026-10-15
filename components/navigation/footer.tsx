"use client";

import Link from "next/link";
import { Phone, Mail, Send, MapPin, Clock } from "lucide-react";
import { LogoLockup } from "./logo";
import { useLanguage } from "@/lib/context/language-context";
import { weeklySchedules } from "@/lib/data/schedules";

export function Footer() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-deep text-white border-t-2 border-accent">
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <LogoLockup reversed />
            <div className="w-10 h-0.5 bg-accent" />
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              {t?.footerSection?.about ??
                "A welcoming Christian family in Addis Ababa gathered to worship God, hear His Word, and grow together in faith. There is room for you here."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/HiwotBirhanSummit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <Send className="size-4" />
              </a>
              <a
                href="tel:+251911234567"
                aria-label="Phone"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <Phone className="size-4" />
              </a>
              <a
                href="mailto:info@hiwotbirhan-summit.org"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-semibold text-accent mb-4">
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

          {/* Gathering Times (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold text-accent mb-4 flex items-center gap-2">
              <Clock className="size-4 text-accent" />
              <span>{t?.footerSection?.serviceTimes ?? "Gathering Times"}</span>
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-white/80">
              {weeklySchedules.map((schedule) => (
                <div key={schedule.id}>
                  <span className="font-semibold text-white block">
                    {isAm ? schedule.titleAm : schedule.title}
                  </span>
                  <span className="text-white/70">
                    {schedule.eatTime} ({schedule.localTime})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold text-accent mb-4 flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              <span>{isAm ? "አድራሻ" : "Summit Location"}</span>
            </h3>
            <div className="space-y-2 text-xs text-white/80 leading-relaxed">
              <p className="font-medium text-white">
                {isAm ? "ሰሚት ኮንዶሚኒየም 2ኛ በር" : "Summit Condominium Gate 2"}
              </p>
              <p className="text-white/70">
                {isAm ? "ከኢትዮጵያ ንግድ ባንክ አጠገብ" : "Near CBE Summit Branch"}
              </p>
              <p className="text-white/70">Bole Subcity, Addis Ababa</p>
              <div className="pt-2">
                <a
                  href="tel:+251911234567"
                  className="font-medium text-white hover:text-accent transition-colors"
                >
                  +251 911 234 567
                </a>
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
