"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ZoomIn } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import dynamic from "next/dynamic";
const Lightbox = dynamic(() => import("@/components/ui/lightbox").then(module => module.Lightbox));

const ARCHIVE_PHOTOS = [
  {
    "id": "study",
    "title": "Learning from the Word",
    "titleAm": "ከቃሉ መማር",
    "src": "/gallery/photo_10_2026-08-27_14-11-14.jpg",
    "alt": "Learning from the Word"
  },
  {
    "id": "praise",
    "title": "Songs of praise",
    "titleAm": "የምስጋና ዝማሬ",
    "src": "/gallery/photo_24_2026-08-27_14-11-14.jpg",
    "alt": "Songs of praise"
  },
  {
    "id": "prayer",
    "title": "A moment of prayer",
    "titleAm": "የጸሎት ጊዜ",
    "src": "/gallery/photo_4_2026-08-27_14-11-14.jpg",
    "alt": "A moment of prayer"
  },
  {
    "id": "fellowship",
    "title": "Faith in conversation",
    "titleAm": "የእምነት ውይይት",
    "src": "/gallery/photo_15_2026-08-27_14-11-14.jpg",
    "alt": "Faith in conversation"
  }
];

export function ArchivalPhotoGrid() {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    caption?: string;
  }>({ isOpen: false, src: "", alt: "" });

  return (
    <section id="photos" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-40">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            {isAm ? "የሰሚት የፎቶ ማህደር" : "Moments worth remembering"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
            {isAm
              ? "ኅብረትን፣ ጥምቀትን፣ የመዘምራን አገልግሎትንና የወንጌል ተልዕኮን የሚያሳዩ በመቶዎች የሚቆጠሩ ምስሎችን ያስሱ።"
              : "A glimpse of worship, prayer, and learning together in our Summit church family."}
          </p>
        </div>
        <Link
          href="#archive"
          className="group inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-deep transition-colors self-start md:self-auto"
        >
          <span>{isAm ? "ሁሉንም ፎቶዎች ይመልከቱ" : "Browse past gatherings"}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ARCHIVE_PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() =>
              setLightbox({
                isOpen: true,
                src: photo.src,
                alt: photo.alt,
                caption: isAm ? photo.titleAm : photo.title,
              })
            }
            className="h-64 rounded-2xl overflow-hidden relative group cursor-pointer text-left p-0 border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full bg-tint/40"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-250"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-0 inset-x-0 p-4 text-white">
              <span className="text-xs sm:text-sm font-semibold block leading-snug">
                {isAm ? photo.titleAm : photo.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightbox.isOpen && <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        alt={lightbox.alt}
        caption={lightbox.caption}
      />}
    </section>
  );
}
