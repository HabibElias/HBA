"use client";
import { useLandingContent } from "@/lib/context/landing-context";
import { useContent } from "@/lib/context/content-context";

import Link from "next/link";
import { Send, Video, Users, ArrowUpRight, Heart } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";



export function CommunityConnect() {
  const { homeText, homeValue } = useLandingContent();
const SOCIAL_CHANNELS = [
  {
    id: "telegram",
    icon: Send,
    name: homeValue("home_community_connect_card1_name"),
    nameAm: homeValue("home_community_connect_card1_nameAm"),
    handle: homeValue("home_community_connect_card1_handle"),
    desc: homeValue("home_community_connect_card1_desc"),
    descAm: homeValue("home_community_connect_card1_descAm"),
    link: homeValue("home_community_connect_card1_link"),
  },
  {
    id: "youtube",
    icon: Video,
    name: homeValue("home_community_connect_card2_name"),
    nameAm: homeValue("home_community_connect_card2_nameAm"),
    handle: homeValue("home_community_connect_card2_handle"),
    desc: homeValue("home_community_connect_card2_desc"),
    descAm: homeValue("home_community_connect_card2_descAm"),
    link: homeValue("home_community_connect_card2_link"),
  },
  {
    id: "community",
    icon: Users,
    name: homeValue("home_community_connect_card3_name"),
    nameAm: homeValue("home_community_connect_card3_nameAm"),
    handle: homeValue("home_community_connect_card3_handle"),
    desc: homeValue("home_community_connect_card3_desc"),
    descAm: homeValue("home_community_connect_card3_descAm"),
    link: homeValue("home_community_connect_card3_link"),
  },
];
  const { lang } = useLanguage();
  const {settings}=useContent();
  const isAm = lang === "am";

  return (
    <section className="py-24 md:py-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="connect">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={600} className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
          {homeText("home_community_connect_1")}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
          {homeText("home_community_connect_2")}
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
                <span>{homeText("home_community_connect_3")}</span>
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
            {homeText("home_community_connect_4")}
          </p>
        </div>

        <Link
          href={homeValue("home_community_connect_5")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface text-primary font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md hover:bg-surface/90 transition-all shrink-0"
        >
          <Heart className="size-3.5 fill-primary text-primary" />
          <span>{homeText("home_community_connect_6")}</span>
        </Link>
      </div>
    </ScrollReveal>
  </section>
);
}
