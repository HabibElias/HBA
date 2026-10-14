"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { History, Headphones, Images, ZoomIn } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { pastPrograms } from "@/lib/data/programs";
import { Lightbox } from "@/components/ui/lightbox";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArchiveFilterBar } from "./archive-filter-bar";
import type { PastProgramPhoto } from "@/lib/types/programs";

export function PastProgramsGrid() {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; alt: string; caption?: string }>({ isOpen: false, src: "", alt: "" });

  const filtered = useMemo(() => {
    return pastPrograms.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchYear = selectedYear === "all" || p.year.toString() === selectedYear;
      return matchCat && matchYear;
    });
  }, [selectedCategory, selectedYear]);

  const openPhoto = (photo: PastProgramPhoto, title: string) => {
    setLightbox({ isOpen: true, src: photo.src, alt: photo.alt, caption: photo.caption || title });
  };

  return (
    <section className="bg-tint/30 py-16 border-t border-border scroll-mt-20" id="archive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-accent-contrast dark:text-accent font-bold text-xs uppercase tracking-wider mb-1">
              <History className="size-3.5" />
              <span>{isAm ? "የቤተ ክርስቲያን ታሪክና ቅርስ" : "Church Chronicle & Heritage"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {isAm ? "ያለፉ ፕሮግራሞች ማህደር" : "Past Programs Archive"}{" "}
              <span className="text-accent-contrast dark:text-accent font-display font-normal text-xl sm:text-2xl">
                {isAm ? "(Chronicle)" : "(ያለፉ ፕሮግራሞች)"}
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1 max-w-xl leading-relaxed">
              {isAm
                ? "በሰሚት ሕይወት ብርሃን የተካሄዱ ታሪካዊ ኮንፈረንሶችን፣ ምስክርነቶችን፣ የስታቲስቲክስ ውጤቶችንና የፎቶ መዝገቦችን ያስሱ።"
                : "Explore testimonies, statistical impacts, photo logs, and recorded themes from historical conferences and ministry events at Hiwot Birhan Summit."}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-surface border border-border px-5 py-3 rounded-2xl shadow-xs shrink-0">
            <div className="text-center">
              <span className="font-display text-xl sm:text-2xl font-bold text-primary block leading-none">24+</span>
              <span className="text-[11px] text-muted-foreground font-medium">{isAm ? "ዋና ኮንፈረንሶች" : "Major Conferences"}</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <span className="font-display text-xl sm:text-2xl font-bold text-primary block leading-none">4.8k</span>
              <span className="text-[11px] text-muted-foreground font-medium">{isAm ? "የተነኩ ነፍሳት" : "Souls Impacted"}</span>
            </div>
          </div>
        </div>

        <ArchiveFilterBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} selectedYear={selectedYear} onSelectYear={setSelectedYear} />

        <div className="mt-8 space-y-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border p-8">
              <p className="text-muted-foreground font-medium">{isAm ? "በተመረጠው መስፈርት የተገኘ ማህደር የለም።" : "No past programs match the selected filter."}</p>
            </div>
          ) : (
            filtered.map((program) => {
              const programTitle = isAm ? program.titleAm : program.title;
              return (
                <article key={program.id} className="bg-surface rounded-2xl border border-border hover:border-primary/40 transition-all overflow-hidden p-6 md:p-8 shadow-xs hover:shadow-md">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs">
                        <span className="px-3 py-1 rounded-full font-bold bg-accent/20 text-accent-contrast dark:text-accent">
                          {isAm ? program.dateAm : program.date}
                        </span>
                        <span className="text-muted-foreground font-medium">{isAm ? program.locationAm : program.location}</span>
                        {program.scripture && (
                          <span className="text-accent-contrast dark:text-accent font-bold">
                            {isAm ? program.scriptureAm || program.scripture : program.scripture}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">{programTitle}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{isAm ? program.recapAm : program.recap}</p>
                      {program.metrics && (
                        <div className="grid grid-cols-3 gap-3 bg-tint/60 p-4 rounded-xl mb-6">
                          {program.metrics.map((m, idx) => (
                            <div key={idx}>
                              <span className="text-[11px] uppercase text-muted-foreground block font-bold truncate">{isAm ? m.labelAm : m.label}</span>
                              <span className="font-display text-lg sm:text-xl font-bold text-primary">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        <Link href="/sermons" className={cn(buttonVariants({ variant: "default" }), "gap-2 text-xs sm:text-sm font-semibold")}>
                          <Headphones className="size-4" />
                          <span>{isAm ? program.audioLabelAm || "ስብከቱን ያዳምጡ" : program.audioLabel || "Listen to Sermon Audio"}</span>
                        </Link>
                        {program.photos[0] && (
                          <button type="button" onClick={() => openPhoto(program.photos[0], programTitle)} className={cn(buttonVariants({ variant: "secondary" }), "gap-1.5 text-xs sm:text-sm font-semibold cursor-pointer")}>
                            <Images className="size-4" />
                            <span>{isAm ? `ፎቶዎችን ይመልከቱ (${program.photoCount || program.photos.length})` : `View ${program.photoCount || program.photos.length} Photos`}</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="lg:col-span-5 grid grid-cols-2 gap-2">
                      {program.photos.slice(0, 3).map((photo, i) => {
                        const isWide = i === 2 || (i === 0 && program.photos.length === 1);
                        return (
                          <button
                            type="button"
                            key={photo.src}
                            onClick={() => openPhoto(photo, programTitle)}
                            aria-label={isAm ? "ፎቶውን አጉላ" : "Enlarge photo"}
                            className={cn("relative rounded-xl overflow-hidden group cursor-pointer bg-tint p-0 border-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", isWide ? "col-span-2 h-36" : "h-36")}
                          >
                            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-primary-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-semibold flex items-center gap-1"><ZoomIn className="size-3.5" /> {isAm ? "አጉላ" : "Enlarge"}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
      <Lightbox isOpen={lightbox.isOpen} onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))} src={lightbox.src} alt={lightbox.alt} caption={lightbox.caption} />
    </section>
  );
}
