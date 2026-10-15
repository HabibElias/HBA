"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Headphones, Images, ZoomIn } from "lucide-react";
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
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; alt: string; caption?: string }>({
    isOpen: false,
    src: "",
    alt: "",
  });

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
    <section className="bg-tint/25 py-16 md:py-20 border-t border-border scroll-mt-20" id="archive">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header without kicker eyebrow and without fake stat counter */}
        <div className="mb-8 border-b border-border pb-6">
          <div className="w-10 h-0.5 bg-accent mb-3" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            {isAm ? "ያለፉ ፕሮግራሞች ማህደር" : "Past Programs Archive"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            {isAm
              ? "በሰሚት ሕይወት ብርሃን የተካሄዱ ታሪካዊ ኮንፈረንሶችን፣ ምስክርነቶችንና የፎቶ መዝገቦችን ያስሱ።"
              : "Explore recorded themes, testimonies, and photographic records from past conferences and community gatherings at Summit."}
          </p>
        </div>

        <ArchiveFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />

        <div className="mt-8 space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border p-8">
              <p className="text-muted-foreground font-medium">
                {isAm ? "በተመረጠው መስፈርት የተገኘ ማህደር የለም።" : "No past programs match the selected filter."}
              </p>
            </div>
          ) : (
            filtered.map((program) => {
              const programTitle = isAm ? program.titleAm : program.title;
              const availablePhotos = program.photos.filter((photo) => photo.src.startsWith("/"));
              return (
                <article
                  key={program.id}
                  className="bg-surface rounded-2xl border border-border hover:border-primary/40 transition-colors overflow-hidden p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className={availablePhotos.length ? "lg:col-span-7" : "lg:col-span-12"}>
                      <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs">
                        <span className="px-3 py-1 rounded-full font-semibold bg-tint text-primary">
                          {isAm ? program.dateAm : program.date}
                        </span>
                        <span className="text-muted-foreground font-medium">
                          {isAm ? program.locationAm : program.location}
                        </span>
                        {program.scripture && (
                          <span className="text-primary font-semibold">
                            {isAm ? program.scriptureAm || program.scripture : program.scripture}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-3">
                        {programTitle}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                        {isAm ? program.recapAm : program.recap}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link href="#photos" className={cn(buttonVariants({variant:"outline"}), "text-sm")}>{isAm ? "የቤተ ክርስቲያን ፎቶዎች" : "View church gallery"}</Link>
                        <Link
                          href="/visit#contact"
                          className={cn(buttonVariants({ variant: "default" }), "rounded-full px-5 gap-2 text-xs sm:text-sm font-semibold")}
                        >
                          <Headphones className="size-4" />
                          <span>{isAm ? "ቅጂ ይጠይቁ" : "Ask for a recording"}</span>
                        </Link>
                        {availablePhotos[0] && (
                          <button
                            type="button"
                            onClick={() => openPhoto(availablePhotos[0], programTitle)}
                            className={cn(buttonVariants({ variant: "secondary" }), "rounded-full px-5 gap-1.5 text-xs sm:text-sm font-semibold cursor-pointer")}
                          >
                            <Images className="size-4 text-primary" />
                            <span>{isAm ? `ፎቶዎችን ይመልከቱ (${availablePhotos.length})` : `View ${program.photoCount || availablePhotos.length} Photos`}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {availablePhotos.length > 0 && <div className="lg:col-span-5 grid grid-cols-2 gap-2">
                      {availablePhotos.slice(0, 3).map((photo, i) => {
                        const isWide = i === 2 || (i === 0 && availablePhotos.length === 1);
                        return (
                          <button
                            type="button"
                            key={photo.src}
                            onClick={() => openPhoto(photo, programTitle)}
                            aria-label={isAm ? "ፎቶውን አጉላ" : "Enlarge photo"}
                            className={cn(
                              "relative rounded-xl overflow-hidden group cursor-pointer bg-tint p-0 border border-border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              isWide ? "col-span-2 h-36" : "h-36"
                            )}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-primary-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-semibold flex items-center gap-1">
                                <ZoomIn className="size-3.5" /> {isAm ? "አጉላ" : "Enlarge"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>}
                  </div>
                </article>
              );
            })
          )}
        </div>
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
