"use client";

import Link from "next/link";
import { Phone, Mail, Send, MapPin, Clock } from "lucide-react";
import { LogoLockup } from "./logo";
import { useLanguage } from "@/lib/context/language-context";
import { weeklySchedules } from "@/lib/data/schedules";

export function Footer() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-deep text-dark-fg border-t-2 border-accent">
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & About */}
          <div className="lg:col-span-4">
            <LogoLockup reversed />
            <div className="w-10 h-0.5 bg-accent my-4" />
            <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-sm">
              {t?.footerSection?.about ??
                "A welcoming evangelical fellowship dedicated to biblical teaching, warm discipleship, and shining the radiant light of Jesus Christ to Summit and beyond."}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/hiwotbirhansummit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <Send className="size-4" />
              </a>
              <a
                href="tel:+251911234567"
                aria-label="Phone"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <Phone className="size-4" />
              </a>
              <a
                href="mailto:info@hiwotbirhan-summit.org"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-accent mb-4">
              {t?.footerSection?.quickLinks ?? "Quick Links"}
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t?.nav?.home ?? "Home"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t?.nav?.about ?? "About Our Church"}
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
                  {t?.footerSection?.serviceTimes ?? "Service Times"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-bold text-accent mb-4 flex items-center gap-1.5">
              <Clock className="size-4" />
              {t?.footerSection?.serviceTimes ?? "Gathering Times"}
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-white/80">
              {weeklySchedules.map((schedule) => (
                <div key={schedule.id}>
                  <span className="font-semibold text-white block">
                    {lang === "am" ? schedule.titleAm : schedule.title}:
                  </span>
                  <span>
                    {schedule.eatTime} ({schedule.localTime})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-bold text-accent mb-4 flex items-center gap-1.5">
              <MapPin className="size-4" />
              {t?.footerSection?.contact ?? "Summit Sanctuary"}
            </h4>
            <p className="text-xs text-white/80 leading-relaxed space-y-1">
              <span className="block">Near Summit Condominium Gate 2</span>
              <span className="block">Bole Sub-City, Addis Ababa</span>
              <span className="block pt-2 text-white font-medium">+251 911 234 567</span>
              <span className="block text-white font-medium">info@hiwotbirhan-summit.org</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p>
            © {year} {t?.nav?.churchName ?? "Hiwot Birhan"}{" "}
            {t?.nav?.branchName ?? "Summit Branch"}.{" "}
            {t?.footerSection?.rights ?? "All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/visit#service-times" className="text-accent hover:underline">
              {t?.nav?.planVisit ?? "Plan your visit"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
