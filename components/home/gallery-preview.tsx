"use client";

import Link from "next/link";
import Image from "next/image";
import { Camera, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

const galleryMoments = [
  {
    id: "choir",
    title: "Sunday Praise & Choral Thanksgiving",
    titleAm: "የእሑድ አምልኮና የምስጋና ዝማሬ",
    caption: "Heartfelt adoration in Amharic & English",
    captionAm: "በአማርኛና በእንግሊዝኛ የሚቀርብ ምስጋና",
    tag: "Worship Choir",
    tagAm: "የመዘምራን አገልግሎት",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWjF7jEQEbM3hbIfxM4ZXpTwLST-ZOKDz2GBJyNnZGgspdJFbtG8dFBiTFH1VDm1NVT-BhEPBwe4Jutw8TC43fDt8y7SwPN7QDVVAS-MANm0RTR02V0PlFzQZbbfo86JSKZc5RTFF47ni9veQsc_YxI92VSSBqQdsdfKTnA1wGIh6qWWfntk1_nJF0y6bzOYQnhIJg4xwtoCimP8vEcrX4qo6SnuPk301Pf2UsNmczITkE2CPHZXpLdA",
    featured: true,
  },
  {
    id: "awana",
    title: "Awana Kids Fellowship",
    titleAm: "የአዋና ሕፃናት ሕብረት",
    caption: "Growing in God's Truth",
    captionAm: "በእግዚአብሔር እውነት ማደግ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASJ5h7sKqVIlbegS2dATG73civ72Gtn5oBWn2IaKNBJ7fcnFdVF0ADjgLaBD-WjgWifWfDW-Y1T_GP_4DxWt3vvfWesij4ZPhSQReiiC8EzopAwUh9COkobI_eCqUDv63hxnVnpPuUXMdB4Z7ep7tyREfY6M745lisElFyOmrGl4qLc2_yL43FtbmBJrdImFBgetQs7vkAHFDB1n12UlkJcndB-hWIIgetHJK8buHSF5Ic-mKULPnZBg",
  },
  {
    id: "youth",
    title: "Saturday Youth Circle",
    titleAm: "የቅዳሜ የወጣቶች ሕብረት",
    caption: "Living Faith Boldly",
    captionAm: "እምነትን በድፍረት መኖር",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDErfiuPJJvEhzaSXWj3PntmolWam5gr7YpGEvwTHzn2lemekOUw3EnRqEEIeGt4o-7U7h6ngTSfYOkycyoEZcCA5Yn-xlTBtTYYVy4MYNojvd5XtY0Emfw-ULIawRft0aEZITVNxUwzyZneSeVJ93TB3jiq7h-z-vG-lLzx1Neg8nt_V-8S43RqQba7VOC0gC484SAlI9pMKXw1GfdQAsUKC_pNOiG8iWmHwGw4n088O465OG5MPtb4g",
  },
  {
    id: "prayer",
    title: "Midweek Prayer Gathering",
    titleAm: "የሐሙስ ምሽት የጸሎት ጉባኤ",
    caption: "Intercession for our City",
    captionAm: "ስለ ከተማችን ምልጃ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOaxETxxdoc1SwlwBo5UzGVMmz1XaeO1M5IM8nYm-wJmdyNKomrH97v-xXKvi2uYBr72jgP9hqwa12Z8NWxTu4I3EgEOVihBbvuJtGfU-ISJoTDuzzW5CEhpBze1i7cKsFjdqnt0TohKi5oraK8Lg8j-m6U7er8MYamwnouGtdcQS0WoUCJJsoBMkabZTHBGrFxVcZyUOQNGG5PAYKbhBup4C2YENauR7P8USmcEF9SPglvQ0tVxvRlA",
  },
  {
    id: "outreach",
    title: "Summit Benevolence Ministry",
    titleAm: "የሰሚት የበጎ አድራጎት አገልግሎት",
    caption: "Compassion in our Neighborhood",
    captionAm: "ፍቅርን በተግባር ለጎረቤቶቻችን ማሳየት",
    tag: "City Outreach",
    tagAm: "የማኅበረሰብ አገልግሎት",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgb9xn9h7v5sPkcou11na_bnUGejLWJGt1zYsRdKmujowbqXeVHq0uWi-L6u1p6_PDvBLsXBk2cg3TA7IusBCvViyN1Fr6DRIUZCI3yg7tbkdwvTjuI2sSEf6-hQFYrBFDtT3Kj9kbWQWLJzggIRIvr3ExdhyBhjcljUAsVEbnA1QX_JAGkq7tsRKeicN5GoLYy60jlL92FNTveK87hRNuKBvt3XFl7MW2N-itCyl4vg3zp58M2Spotg",
  },
];

export function GalleryPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="gallery">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="size-4" />
            <span>{isAm ? "የማኅበረሰብ ሕይወት • ፎቶዎች" : "Community Life in Summit • የሕብረት ፎቶዎች"}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            {isAm ? "የአምልኮ፣ የሕብረትና የደስታ ጊዜያት" : "Moments of Worship, Fellowship & Joy"}
          </h2>
        </div>
        <Link
          href="/about#gallery"
          className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-soft transition-colors"
        >
          <span>{isAm ? "ሁሉንም ፎቶዎች ይመልከቱ" : "View Full Church Gallery"}</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryMoments.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl overflow-hidden relative group border border-border shadow-sm min-h-[240px] ${
              item.featured ? "md:col-span-2 lg:col-span-2 md:row-span-2 min-h-[320px]" : "h-60"
            }`}
          >
            <Image
              src={item.image}
              alt={isAm ? item.titleAm : item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={item.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              {item.tag && (
                <span className="px-2.5 py-0.5 rounded-full bg-accent text-primary-deep text-[11px] font-bold mb-2 inline-block">
                  {isAm ? item.tagAm : item.tag}
                </span>
              )}
              <h3 className="font-display text-base sm:text-lg font-bold leading-tight">
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
