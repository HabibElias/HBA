"use client";
import { useLandingContent } from "@/lib/context/landing-context";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card } from "@/components/ui/card";



export function GalleryPreview() {
  const { homeText, homeValue } = useLandingContent();
const galleryMoments = [
  {
    "id": "worship",
    "title": homeValue("home_gallery_preview_card1_title"),
    "titleAm": homeValue("home_gallery_preview_card1_titleAm"),
    "caption": homeValue("home_gallery_preview_card1_caption"),
    "captionAm": homeValue("home_gallery_preview_card1_captionAm"),
    "image": homeValue("home_gallery_preview_card1_image"),
    "featured": true
  },
  {
    "id": "study",
    "title": homeValue("home_gallery_preview_card2_title"),
    "titleAm": homeValue("home_gallery_preview_card2_titleAm"),
    "caption": homeValue("home_gallery_preview_card2_caption"),
    "captionAm": homeValue("home_gallery_preview_card2_captionAm"),
    "image": homeValue("home_gallery_preview_card2_image")
  },
  {
    "id": "praise",
    "title": homeValue("home_gallery_preview_card3_title"),
    "titleAm": homeValue("home_gallery_preview_card3_titleAm"),
    "caption": homeValue("home_gallery_preview_card3_caption"),
    "captionAm": homeValue("home_gallery_preview_card3_captionAm"),
    "image": homeValue("home_gallery_preview_card3_image")
  },
  {
    "id": "prayer",
    "title": homeValue("home_gallery_preview_card4_title"),
    "titleAm": homeValue("home_gallery_preview_card4_titleAm"),
    "caption": homeValue("home_gallery_preview_card4_caption"),
    "captionAm": homeValue("home_gallery_preview_card4_captionAm"),
    "image": homeValue("home_gallery_preview_card4_image")
  },
  {
    "id": "fellowship",
    "title": homeValue("home_gallery_preview_card5_title"),
    "titleAm": homeValue("home_gallery_preview_card5_titleAm"),
    "caption": homeValue("home_gallery_preview_card5_caption"),
    "captionAm": homeValue("home_gallery_preview_card5_captionAm"),
    "image": homeValue("home_gallery_preview_card5_image")
  }
];
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="gallery">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={600} className="mb-14 md:mb-18">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
              {homeText("home_gallery_preview_1")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              {homeText("home_gallery_preview_2")}
            </h2>
          </div>
          <Link
            href={homeValue("home_gallery_preview_3")}
            className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
          >
            <span>{homeText("home_gallery_preview_4")}</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryMoments.map((item, idx) => (
          <ScrollReveal
            key={item.id}
            delay={idx * 70}
            variant="zoom-in"
            distance={20}
            className={item.featured ? "md:col-span-2 lg:col-span-2 md:row-span-2" : ""}
          >
            <Link href="/gallery"
              className={`block rounded-3xl overflow-hidden relative group border border-border min-h-[240px] bg-tint shadow-xs h-full ${
                item.featured ? "min-h-[340px]" : "h-64"
              }`}
            >
              <Image
                src={item.image}
                alt={isAm ? item.titleAm : item.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-250"
                sizes={item.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <h3 className="font-display text-base font-semibold">
                  {isAm ? item.titleAm : item.title}
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  {isAm ? item.captionAm : item.caption}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
