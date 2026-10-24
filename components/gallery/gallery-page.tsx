"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ZoomIn, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/public-button";
import { FieldSelect } from "@/components/ui/field-select";
import { Label } from "@/components/ui/label";
import type { GalleryPhoto } from "@/lib/cms/public-types";

const Lightbox = dynamic(() =>
  import("@/components/ui/lightbox").then((module) => module.Lightbox)
);

export function GalleryPageContent() {
  const { gallery = [] } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [album, setAlbum] = useState("");
  const [limit, setLimit] = useState(18);
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  const albums = useMemo(
    () => [...new Map(gallery.map((photo) => [photo.album, photo.albumAm])).entries()],
    [gallery]
  );
  const photos = album ? gallery.filter((photo) => photo.album === album) : gallery;

  const selectOptions = useMemo(
    () => [
      { value: "all", label: isAm ? "ሁሉም ፎቶዎች" : "All photos" },
      ...albums.map(([name, nameAm]) => ({
        value: name,
        label: isAm ? nameAm || name : name,
      })),
    ],
    [albums, isAm]
  );

  return (
    <>
      <section className="subpage-hero text-white">
        <div className="site-container pt-36 pb-24 md:pt-44 md:pb-28">
          <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
            {isAm ? "የማህበራችን ትውስታዎች" : "Visual Memories"}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl">
            {isAm ? "የምንጋራቸው ትዝታዎች" : "Moments we share"}
          </h1>
          <p className="mt-6 text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl">
            {isAm
              ? "በአምልኮ፣ በጸሎትና በሕብረት አብረን። የቤተ ክርስቲያን ቤተሰባችንን የፎቶ ትዝታዎች ይመልከቱ።"
              : "Worship, prayer, learning and fellowship. A photo gallery of life together in our Summit church family."}
          </p>
        </div>
      </section>

      <section className="site-container py-16 md:py-24" aria-labelledby="gallery-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
              {isAm ? "የፎቶ ማህደር" : "Photo Archives"}
            </span>
            <h2 id="gallery-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
              {isAm ? "የፎቶ ማዕከል" : "Our photo gallery"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isAm
                ? `${photos.length} ፎቶዎች`
                : `${photos.length} ${photos.length === 1 ? "photograph" : "photographs"}`}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:max-w-xs w-full">
            <Label htmlFor="gathering-select" className="text-sm font-semibold text-muted-foreground">
              {isAm ? "ስብስብ ይምረጡ" : "Browse by gathering"}
            </Label>
            <FieldSelect
              id="gathering-select"
              value={album || "all"}
              onValueChange={(val) => {
                setAlbum(val === "all" ? "" : val);
                setLimit(18);
              }}
              options={selectOptions}
              className="bg-surface border-border"
            />
          </div>
        </div>

        <div aria-live="polite">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.slice(0, limit).map((photo) => {
              const photoTitle = isAm ? photo.titleAm || photo.title : photo.title;
              const photoCaption = isAm ? photo.captionAm || photo.caption : photo.caption;
              const albumLabel = isAm ? photo.albumAm || photo.album : photo.album;

              return (
                <button
                  type="button"
                  key={photo.id}
                  id={photo.id}
                  onClick={() => setSelected(photo)}
                  aria-label={`${isAm ? "ፎቶውን አጉላ" : "Enlarge photo"}: ${photoTitle}`}
                  className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl text-left flex flex-col justify-between transition-all duration-200 cursor-pointer scroll-mt-28 shadow-xs"
                >
                  <div className="relative block w-full aspect-[4/3] overflow-hidden bg-tint/60 select-none">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-primary-deep/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="flex size-11 items-center justify-center rounded-full bg-primary-deep/90 text-white shadow-lg backdrop-blur-xs transition-transform group-hover:scale-105">
                        <ZoomIn className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                    {albumLabel && (
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-block px-3 py-0.5 rounded-full bg-surface/90 text-primary border border-primary/10 text-xs font-semibold backdrop-blur-xs shadow-xs">
                          {albumLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 w-full">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {photoTitle}
                      </h3>
                      {photoCaption && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                          {photoCaption}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 w-full flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors border-t border-border/40">
                      <span className="inline-flex items-center gap-1.5">
                        <ZoomIn className="size-4 text-primary" />
                        <span>{isAm ? "ፎቶውን አጉላ" : "Enlarge photo"}</span>
                      </span>
                      <ArrowUpRight
                        className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {!photos.length && (
            <p className="py-12 text-center text-muted-foreground">
              {isAm ? "ፎቶዎች ሲታተሙ እዚህ ይታያሉ።" : "Photos will appear here when they are published."}
            </p>
          )}
        </div>

        {photos.length > limit && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              type="button"
              onClick={() => setLimit((value) => value + 18)}
            >
              {isAm ? "ተጨማሪ ፎቶዎች" : "Show more photos"}
            </Button>
          </div>
        )}
      </section>

      {selected && (
        <Lightbox
          isOpen
          onClose={() => setSelected(null)}
          src={selected.src}
          alt={isAm ? selected.titleAm || selected.title : selected.title}
          caption={isAm ? selected.captionAm || selected.titleAm : selected.caption || selected.title}
        />
      )}
    </>
  );
}
