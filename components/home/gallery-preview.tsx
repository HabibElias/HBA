"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

const galleryMoments = [
  {
    "id": "worship",
    "title": "Together in worship",
    "titleAm": "በአምልኮ አብረን",
    "caption": "Our church family in Summit",
    "captionAm": "በሰሚት ያለው መንፈሳዊ ቤተሰባችን",
    "image": "/gallery/photo_18_2026-08-27_14-11-14.jpg",
    "featured": true
  },
  {
    "id": "study",
    "title": "Learning from the Word",
    "titleAm": "ከቃሉ መማር",
    "caption": "Reading and reflecting together",
    "captionAm": "አብሮ ማንበብና መወያየት",
    "image": "/gallery/photo_10_2026-08-27_14-11-14.jpg"
  },
  {
    "id": "praise",
    "title": "Songs of praise",
    "titleAm": "የምስጋና ዝማሬ",
    "caption": "Offering our voices in worship",
    "captionAm": "በዝማሬ እግዚአብሔርን ማምለክ",
    "image": "/gallery/photo_24_2026-08-27_14-11-14.jpg"
  },
  {
    "id": "prayer",
    "title": "A moment of prayer",
    "titleAm": "የጸሎት ጊዜ",
    "caption": "Drawing near to God",
    "captionAm": "ወደ እግዚአብሔር መቅረብ",
    "image": "/gallery/photo_4_2026-08-27_14-11-14.jpg"
  },
  {
    "id": "fellowship",
    "title": "Faith in conversation",
    "titleAm": "የእምነት ውይይት",
    "caption": "Growing through fellowship",
    "captionAm": "በሕብረት ማደግ",
    "image": "/gallery/photo_15_2026-08-27_14-11-14.jpg"
  }
];

export function GalleryPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="gallery">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-border gap-4">
        <div>
          <div className="w-10 h-0.5 bg-accent mb-3" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            {isAm ? "የአምልኮ፣ የሕብረትና የደስታ ጊዜያት" : "Life in our church family"}
          </h2>
        </div>
        <Link
          href="/programs#photos"
          className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
        >
          <span>{isAm ? "ሁሉንም ፎቶዎች ይመልከቱ" : "Explore the gallery"}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryMoments.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl overflow-hidden relative group border border-border min-h-[240px] bg-tint/40 ${
              item.featured ? "md:col-span-2 lg:col-span-2 md:row-span-2 min-h-[340px]" : "h-64"
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
          </div>
        ))}
      </div>
    </section>
  );
}
