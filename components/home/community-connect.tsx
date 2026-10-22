"use client";
import { useContent } from "@/lib/context/content-context";

import Link from "next/link";
import { Send, Video, Users, ArrowUpRight, Heart } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SOCIAL_CHANNELS = [
  {
    id: "telegram",
    icon: Send,
    name: "Telegram Channel",
    nameAm: "ይፋዊ ቴሌግራም",
    handle: "@HiwotBirhanSummit",
    desc: "Weekly bulletins, prayer notes & audio sermons",
    descAm: "ሳምንታዊ ማስታወቂያዎች፣ የጸሎት ነጥቦችና ስብከቶች",
    link: "https://t.me/HiwotBirhanSummit",
  },
  {
    id: "youtube",
    icon: Video,
    name: "Media & Messages",
    nameAm: "የሚዲያና ስብከቶች ቻናል",
    handle: "Hiwot Birhan Media",
    desc: "Stream Sunday messages and uplifting songs",
    descAm: "የእሑድ ስብከቶችና የዝማሬ ቪዲዮዎች",
    link: "/programs#archive",
  },
  {
    id: "community",
    icon: Users,
    name: "Community Care",
    nameAm: "የማኅበረሰብ ሕብረት",
    handle: "Summit Care Circle",
    desc: "Connect with small groups and fellowship circles",
    descAm: "ከአካባቢ የጸሎትና የሕብረት ቡድኖች ጋር ይገናኙ",
    link: "/visit#contact",
  },
];

export function CommunityConnect() {
  const { lang } = useLanguage();
  const {settings}=useContent();
  const isAm = lang === "am";

  return (
    <section className="py-24 md:py-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="connect">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={600} className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
          {isAm ? "እያንዳንዱ አባል ታሪክ አለው" : "Every Member has a story, What's yours?"}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
          {isAm ? "ከመንፈሳዊ ቤተሰባችን ጋር ይገናኙ" : "Connect With Our Church Family"}
        </h2>
      </ScrollReveal>

      {/* 3 Square Cards (Directly matching Inspiration.webp social cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {SOCIAL_CHANNELS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <ScrollReveal
              key={item.id}
              delay={idx * 100}
              variant="fade-up"
              distance={28}
              className="h-full flex flex-col"
            >
            <a
              key={item.id}
              href={item.link.startsWith("https://t.me/")?settings.telegram:item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-8 sm:p-10 text-left flex flex-col items-start justify-between transition-all duration-200 cursor-pointer min-h-[300px]"
            >
              {/* Watermark icon — rotated, peeking from bottom-right corner */}
              <Icon
                className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
                aria-hidden="true"
                strokeWidth={1}
              />

              <div className="w-full flex flex-col items-start text-left relative z-10">
                <span className="inline-block self-start px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary mb-4 transition-all duration-200">
                  {item.link.startsWith("https://t.me/")?"@"+settings.telegram.split("/").pop():item.handle}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 text-left">
                  {isAm ? item.nameAm : item.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-left">
                  {isAm ? item.descAm : item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 w-full flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors relative z-10">
                <span>{isAm ? "ይቀላቀሉ" : "Join & Follow"}</span>
                <ArrowUpRight
                  className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  strokeWidth={1.75}
                />
              </div>
            </a>
          </ScrollReveal>
        );
      })}
    </div>

    {/* Pre-Footer Banner Strip (Faithful to Inspiration.webp) */}
    <ScrollReveal variant="fade-up" duration={650} delay={150}>
      <div className="mt-16 bg-tint border border-border/80 rounded-full px-6 sm:px-10 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 hidden sm:flex">
            <Heart className="size-4 fill-primary" />
          </div>
          <p className="font-display text-sm sm:text-base font-semibold text-foreground">
            {isAm
              ? "በክርስቶስ ፍቅር ሁላችሁም ተጋብዛችኋል • እዚህ ለእርስዎም ስፍራ አለ"
              : "There is room for you in God’s house • You are always warmly welcome"}
          </p>
        </div>

        <Link
          href="/visit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface text-primary font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md hover:bg-surface/90 transition-all shrink-0"
        >
          <Heart className="size-3.5 fill-primary text-primary" />
          <span>{isAm ? "ጉብኝትዎን ያቅዱ" : "Plan Your Visit"}</span>
        </Link>
      </div>
    </ScrollReveal>
  </section>
);
}
