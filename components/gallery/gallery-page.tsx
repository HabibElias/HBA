"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, FolderOpen, ZoomIn } from "lucide-react";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import { Button } from "@/components/ui/public-button";
import type { GalleryAlbum } from "@/lib/cms/public-types";
const Lightbox = dynamic(() =>
  import("@/components/ui/lightbox").then((module) => module.Lightbox),
);
export function GalleryPageContent() {
  const { albums = [] } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [albumId, setAlbumId] = useState<string | null>(null);
  const [selected, setSelected] = useState<
    GalleryAlbum["photos"][number] | null
  >(null);
  const album = albums.find((item) => item.id === albumId);
  const title = album
    ? isAm
      ? album.titleAm || album.title
      : album.title
    : isAm
      ? "የፎቶ ማህደሮች"
      : "Photo folders";
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

      <section
        className="site-container py-16 md:py-24"
        aria-labelledby="gallery-heading"
      >
        {album && (
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => setAlbumId(null)}
          >
            <ArrowLeft className="size-4" />
            {isAm ? "ሁሉም ማህደሮች" : "All folders"}
          </Button>
        )}
        <h2 id="gallery-heading" className="section-title">
          {title}
        </h2>
        {album && (
          <p className="body-copy mt-4 max-w-2xl">
            {isAm
              ? album.descriptionAm || album.description
              : album.description}
          </p>
        )}
        {album?.recapId && (
          <Link
            className="inline-block mt-4 text-primary underline underline-offset-4"
            href={`/programs#${album.recapId}`}
          >
            {isAm ? "ያለፈውን ስብሰባ ይመልከቱ" : "View past gathering"}
          </Link>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {album
            ? album.photos.map((photo, index) => (
                <button
                  key={`${photo.src}-${index}`}
                  type="button"
                  onClick={() => setSelected(photo)}
                  className="group rounded-2xl overflow-hidden border border-border bg-surface text-left focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="flex items-center gap-2 p-4 text-sm text-primary">
                    <ZoomIn className="size-4" />
                    {photo.caption ||
                      (isAm ? "ፎቶውን አጉላ" : "Enlarge photograph")}
                  </span>
                </button>
              ))
            : albums.map((folder) => {
                const cover =
                  folder.photos.find((photo) => photo.isMain) ||
                  folder.photos[0];
                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => setAlbumId(folder.id)}
                    className="group rounded-2xl overflow-hidden border border-border bg-surface text-left focus-visible:ring-2 focus-visible:ring-primary hover:border-primary transition-colors"
                  >
                    <div className="relative aspect-[4/3] bg-tint">
                      {cover ? (
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <FolderOpen className="absolute inset-0 m-auto size-12 text-primary" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold">
                        {isAm ? folder.titleAm || folder.title : folder.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isAm ? folder.dateAm || folder.date : folder.date}
                      </p>
                      <p className="mt-4 text-sm text-primary flex items-center gap-2">
                        <FolderOpen className="size-4" />
                        {folder.photos.length} {isAm ? "ፎቶዎች" : "photographs"}
                      </p>
                    </div>
                  </button>
                );
              })}
        </div>
        {(album ? !album.photos.length : !albums.length) && (
          <p className="py-12 text-muted-foreground">
            {isAm
              ? "ፎቶዎች ሲታተሙ እዚህ ይታያሉ።"
              : "Photographs will appear here when they are added."}
          </p>
        )}
      </section>
      {selected && (
        <Lightbox
          isOpen
          onClose={() => setSelected(null)}
          src={selected.src}
          alt={selected.alt}
          caption={selected.caption || title}
        />
      )}
    </>
  );
}
