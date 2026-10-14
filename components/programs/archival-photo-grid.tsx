"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ZoomIn } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Lightbox } from "@/components/ui/lightbox";

const ARCHIVE_PHOTOS = [
  {
    id: "baptism",
    title: "Baptismal Service 2024",
    titleAm: "የጥምቀት ሥነ ሥርዓት 2024",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0TuTMt7QW9iD16dmny2Vq_jZxsOyDVdFOgR3QotEombyCLJv0o_ctQ9Bz-xxEvwx2trjIq_oLQqF8wFJVA4Ss3CQxfqxLRo5JC0kZrUYjeh-nIGoOqY2yYXWiLjY2aGjmZOsuZ_bB7yZSMZxbRO9JuWVlrGxUzyqWN3Bc2LYcGgLUC7sjCgG7jtDbYCKuPuDbBepR2Pouav5W9ngtFHioSZxCmewemllYGrXKB4EVk-6e-SokJ-xIgQ",
    alt: "Outdoor water baptism ceremony in Addis Ababa",
  },
  {
    id: "sunday-school",
    title: "Sunday School Milestones",
    titleAm: "የሰንበት ት/ቤት ምዕራፎች",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT-JEIvZRZTrKxyxndnfhNbzfIJbRkrtjynYRIEZhQ-GJv5kycVgmNmDMwzmXn-msQFzBEQf-f1nDjeu9UCRvKswmuwwKTP52_06xsbYLJUzHkbU72Op2GWiP2aIW0jhoRAN91PSZVz5i1T2Foqptvb2jUmIEGsm0gZQap4adXFBSm08-uMkXNmceKfHs9KODaiaD59sWVZ-mSh5E_bSfGkk9n-_29YBK-d2LBUyfO0MKwcZYpwcXd-Q",
    alt: "Children reciting scripture during Awana ceremony",
  },
  {
    id: "agape-meal",
    title: "Agape Fellowship Meal",
    titleAm: "የአጋፔ ፍቅር ማዕድ",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIIHTwQSc6gzuia_HVTzmu7vcRVOz7Dyb_-oq2dWOmskJbDtlXcTJCuDZlSqlqqI_sF7iOWsHbvsfkqC36zDbR9wLV7dt5aTEvYA4zw3QOgl8zh0O5K0u3qyOpKu7DitTiQ_C_sz3_R_osSksmWrRa-dIQDU9mZwfG3x1jb1jEAWf0f9AQdxtMqLjGh5mlp3CVOPciYTuHQ82be9GhWt3Q4nq0CZrQ48i0M3lZPwVwaBNZVoexMxtgLQ",
    alt: "Agape fellowship meal following church service",
  },
  {
    id: "choir",
    title: "Choir & Orchestra Guild",
    titleAm: "የመዘምራንና የኦርኬስትራ ህብረት",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAldA7KnDgRn90GZFE8hjAOozzLukjqvvglOyruncwU5Cw3m8YB3AE9ZbRS3-DsVV38DQw_F03SJtp7zUIFwzKo3tAYuYg1jYrDYD7n8JKmccRvEIi4NbUZ-3Xga7XEdtnCLJRJ48VK7F5WffheeK0LlRFP2n6UyIc1Yb2UpbAyVX5hZjhlKwSTfD_Z6cv76uk_Izal2VXKwx_3BnxYoVTdRSQ76dBoctEMjb9g1AW0NGsEt9ePjbN2HQ",
    alt: "Summit youth choir and orchestra practicing in sanctuary",
  },
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-accent-contrast dark:text-accent font-bold text-xs uppercase tracking-wider block mb-1">
            {isAm ? "የምስል ምስክርነት" : "Visual Testimony"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {isAm ? "የሰሚት የፎቶ ማህደር" : "Summit Photographic Records"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-1 max-w-xl">
            {isAm
              ? "ኅብረትን፣ ጥምቀትን፣ የመዘምራን አገልግሎትንና የወንጌል ተልዕኮን የሚያሳዩ በመቶዎች የሚቆጠሩ ምስሎችን ያስሱ።"
              : "Browse through curated moments documenting fellowship, baptisms, choir ministries, and outreach across Addis Ababa."}
          </p>
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:underline self-start md:self-auto"
        >
          <span>{isAm ? "ሁሉንም 1,200+ ፎቶዎች ይመልከቱ" : "Explore All 1,200+ Photos"}</span>
          <ArrowRight className="size-4" />
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
            className="h-64 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md text-left p-0 border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                <ZoomIn className="size-5" />
              </span>
            </div>
            <span className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm font-semibold truncate">
              {isAm ? photo.titleAm : photo.title}
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        alt={lightbox.alt}
        caption={lightbox.caption}
      />
    </section>
  );
}
