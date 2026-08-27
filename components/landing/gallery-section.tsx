"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, Images, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/types/landing";

export function GallerySection() {
  const { t } = useLanguage();

  // State: selectedAlbumId (null = album cards view, "all" = all photos, or album.id)
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const albums = t.galleryAlbums || [];

  // Flatten all photos for "all" mode
  const allPhotos = useMemo(() => {
    return albums.flatMap((album) => album.photos);
  }, [albums]);

  // Current active photos based on selected view
  const currentPhotos: GalleryPhoto[] = useMemo(() => {
    if (!activeAlbumId) return [];
    if (activeAlbumId === "all") return allPhotos;
    const found = albums.find((a) => a.id === activeAlbumId);
    return found ? found.photos : [];
  }, [activeAlbumId, albums, allPhotos]);

  const activeAlbum: GalleryAlbum | undefined = useMemo(() => {
    return albums.find((a) => a.id === activeAlbumId);
  }, [activeAlbumId, albums]);

  // Lightbox controls
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || currentPhotos.length === 0) return null;
      return (i - 1 + currentPhotos.length) % currentPhotos.length;
    });
  }, [currentPhotos]);

  const next = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || currentPhotos.length === 0) return null;
      return (i + 1) % currentPhotos.length;
    });
  }, [currentPhotos]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, prev, next]);

  return (
    <>
      <section className="gallery section-pad" id="gallery">
        {/* Section Header */}
        <div className="section-heading" data-reveal>
          <div>
            <h2>{t.galleryTitle}</h2>
          </div>
          <p>{t.galleryText}</p>
        </div>

        {/* VIEW 1: ALBUM CARDS GRID (When no album is actively expanded) */}
        {!activeAlbumId ? (
          <div className="gallery-albums-view">
            <div className="gallery-album-grid" data-reveal="row">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="gallery-album-card"
                  onClick={() => {
                    setActiveAlbumId(album.id);
                    const el = document.getElementById("gallery");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveAlbumId(album.id);
                    }
                  }}
                  aria-label={`Open ${album.title} album`}
                >
                  {/* Cover Image Container */}
                  <div className="album-cover-wrap">
                    <Image
                      src={album.coverSrc}
                      alt={album.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="album-cover-img"
                    />
                    <div className="album-overlay" />
                    
                    {/* Top Badges */}
                    <div className="album-badges">
                      <span className="album-tag">{album.tag}</span>
                      <span className="album-count">
                        <Images size={12} />
                        {album.photos.length} {t.galleryPhotosLabel}
                      </span>
                    </div>

                    {/* Mini Thumbnails Reel */}
                    <div className="album-preview-strip">
                      {album.photos.slice(0, 4).map((p, idx) => (
                        <div key={idx} className="preview-thumb">
                          <Image
                            src={p.src}
                            alt=""
                            fill
                            sizes="38px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ))}
                      {album.photos.length > 4 && (
                        <div className="preview-thumb preview-more">
                          +{album.photos.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="album-info">
                    <div className="album-title-row">
                      <h3 className="album-title">{album.title}</h3>
                      <span className="album-action-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <p className="album-desc">{album.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action to view all photos */}
            <div className="gallery-all-trigger" data-reveal>
              <button
                type="button"
                className="button button-dark"
                onClick={() => setActiveAlbumId("all")}
              >
                <Sparkles size={14} />
                {t.galleryViewAll} ({allPhotos.length})
              </button>
            </div>
          </div>
        ) : (
          /* VIEW 2: EXPANDED ALBUM / ALL PHOTOS VIEW */
          <div className="gallery-expanded-view">
            {/* Top Navigation Bar */}
            <div className="gallery-expanded-bar">
              <button
                type="button"
                className="gallery-back-button"
                onClick={() => setActiveAlbumId(null)}
              >
                <ArrowLeft size={16} />
                <span>{t.galleryBackToAlbums}</span>
              </button>

              {/* Tabs Switcher for seamless jumping between albums */}
              <div className="gallery-tabs">
                {albums.map((album) => (
                  <button
                    key={album.id}
                    type="button"
                    className={`gallery-tab ${activeAlbumId === album.id ? "active" : ""}`}
                    onClick={() => setActiveAlbumId(album.id)}
                  >
                    {album.title.split("&")[0].trim()}
                    <span className="tab-badge">{album.photos.length}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className={`gallery-tab ${activeAlbumId === "all" ? "active" : ""}`}
                  onClick={() => setActiveAlbumId("all")}
                >
                  {t.galleryViewAll}
                  <span className="tab-badge">{allPhotos.length}</span>
                </button>
              </div>
            </div>

            {/* Active Album Banner */}
            <div className="gallery-expanded-header">
              <div>
                <span className="album-active-tag">
                  {activeAlbumId === "all" ? t.galleryViewAll : activeAlbum?.tag}
                </span>
                <h3 className="album-active-title">
                  {activeAlbumId === "all"
                    ? `${t.galleryViewAll} (${allPhotos.length})`
                    : activeAlbum?.title}
                </h3>
              </div>
              {activeAlbum && (
                <p className="album-active-desc">{activeAlbum.description}</p>
              )}
            </div>

            {/* Photos Masonry Grid */}
            <div className="gallery-photos-grid">
              {currentPhotos.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  className="gallery-photo-item"
                  onClick={() => openLightbox(i)}
                  aria-label={`Open photo ${i + 1}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    draggable={false}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="photo-item-overlay">
                    <span className="photo-expand-cue">
                      <ArrowUpRight size={16} />
                    </span>
                    {photo.alt && <span className="photo-caption">{photo.alt}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FULLSCREEN LIGHTBOX */}
      {lightboxIndex !== null && currentPhotos[lightboxIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="lightbox-img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentPhotos[lightboxIndex].src}
              alt={currentPhotos[lightboxIndex].alt}
              width={1200}
              height={1600}
              sizes="(max-width: 1024px) 90vw, 920px"
              className="lightbox-img"
              priority
              style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "80vh" }}
            />
            {currentPhotos[lightboxIndex].alt && (
              <p className="lightbox-caption">
                {currentPhotos[lightboxIndex].alt}
              </p>
            )}
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {currentPhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
