"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Upload,
  X,
  Check,
  Search,
  Grid2X2,
  List,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface MediaItem {
  id: string;
  name: string;
  alt: string;
  src: string;
  width?: number;
  height?: number;
}

export interface MediaPickerProps {
  onChoose?: (image: MediaItem) => void;
  onChooseMultiple?: (images: MediaItem[], mainId: string | null) => void;
  onClose: () => void;
  allowMain?: boolean;
  maxSelect?: number;
}

export interface MediaLibraryProps {
  canUpload: boolean;
}

interface LightboxProps {
  images: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        if (images.length > 1) {
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }
      } else if (e.key === "ArrowRight") {
        if (images.length > 1) {
          onNavigate((currentIndex + 1) % images.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <div
      className="admin-lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Photograph preview"
    >
      <button
        type="button"
        className="admin-lightbox-close"
        onClick={onClose}
        aria-label="Close preview"
      >
        <X size={20} />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="admin-lightbox-prev"
            onClick={() =>
              onNavigate((currentIndex - 1 + images.length) % images.length)
            }
            aria-label="Previous photograph"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            className="admin-lightbox-next"
            onClick={() =>
              onNavigate((currentIndex + 1) % images.length)
            }
            aria-label="Next photograph"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}
      <div className="admin-lightbox-body">
        <img src={current.src} alt={current.alt} />
        <p>{current.alt}</p>
      </div>
    </div>
  );
}

function SkeletonCards({
  count,
  viewMode,
}: {
  count: number;
  viewMode: "grid" | "list";
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`admin-media-skeleton ${viewMode === "list" ? "list" : ""}`}
          aria-hidden="true"
        >
          <div className="admin-media-skeleton-img" />
          <div className="admin-media-skeleton-text" />
        </div>
      ))}
    </>
  );
}

export function MediaPicker({
  onChoose,
  onChooseMultiple,
  onClose,
  allowMain = false,
  maxSelect = 1,
}: MediaPickerProps) {
  const isMulti = maxSelect > 1;
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMap, setSelectedMap] = useState<Map<string, MediaItem>>(
    new Map()
  );
  const [mainId, setMainId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch first page on mount and when debounced query changes
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim());
    }

    const url = `/api/admin/media${params.toString() ? `?${params.toString()}` : ""}`;
    fetch(url, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        const data: { items: MediaItem[]; nextCursor: string | null } =
          await r.json();
        setItems(data.items);
        setNextCursor(data.nextCursor);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError("Could not load the library. Close and try again.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  // Load next page
  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore || loading) return;
    setLoadingMore(true);
    try {
      const params = new URLSearchParams();
      params.set("cursor", nextCursor);
      if (debouncedQuery.trim()) {
        params.set("q", debouncedQuery.trim());
      }
      const r = await fetch(`/api/admin/media?${params.toString()}`);
      if (!r.ok) throw new Error();
      const data: { items: MediaItem[]; nextCursor: string | null } =
        await r.json();
      setItems((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } catch {
      setError("Could not load more photographs.");
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore, loading, debouncedQuery]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !nextCursor || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [nextCursor, loadingMore, loading, loadMore]);

  // Handle single pick or multi select toggle
  const handleSelect = (image: MediaItem) => {
    if (!isMulti) {
      onChoose?.(image);
      onClose();
      return;
    }

    setSelectedMap((prev) => {
      const next = new Map(prev);
      if (next.has(image.id)) {
        next.delete(image.id);
        if (mainId === image.id) {
          setMainId(null);
        }
      } else {
        if (next.size < maxSelect) {
          next.set(image.id, image);
        }
      }
      return next;
    });
  };

  const handleInlineUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setUploadError("");
    const form = e.currentTarget;
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      setItems((prev) => [data, ...prev]);
      setShowUpload(false);
      form.reset();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const selectedImages = Array.from(selectedMap.values());
  const hasMain =
    Boolean(allowMain && mainId && selectedMap.has(mainId));

  return (
    <>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="admin-root admin-media-dialog">
          <DialogHeader>
            <DialogTitle>
              {isMulti ? "Choose photographs" : "Choose a photograph"}
            </DialogTitle>
            <DialogDescription>
              {isMulti
                ? `Select up to ${maxSelect} photographs from the church image library.`
                : "Select a photograph from the church image library."}
            </DialogDescription>
          </DialogHeader>

          <div className="admin-media-toolbar">
            <Label className="admin-search">
              <Search size={18} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search images"
                aria-label="Search images"
              />
            </Label>
            <div className="admin-media-toolbar-right">
              <Button
                type="button"
                className="admin-button"
                onClick={() => setShowUpload((prev) => !prev)}
              >
                <Upload size={16} />
                Upload new photo
              </Button>
              <Button
                type="button"
                className={`admin-icon-button ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                title="Grid view"
              >
                <Grid2X2 size={18} />
              </Button>
              <Button
                type="button"
                className={`admin-icon-button ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
                title="List view"
              >
                <List size={18} />
              </Button>
            </div>
          </div>

          {showUpload && (
            <form className="admin-picker-upload" onSubmit={handleInlineUpload}>
              <h3>Upload new photograph</h3>
              <Label>
                Photograph
                <Input
                  type="file"
                  name="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                  disabled={uploading}
                />
              </Label>
              <Label>
                Describe the image
                <Input
                  name="alt"
                  minLength={3}
                  maxLength={300}
                  required
                  disabled={uploading}
                  placeholder="For example: Choir singing during Sunday worship"
                />
              </Label>
              {uploadError && (
                <p role="alert" className="admin-notice error">
                  {uploadError}
                </p>
              )}
              <div className="admin-actions">
                <Button
                  type="submit"
                  className="admin-button primary"
                  disabled={uploading}
                >
                  <Upload size={16} />
                  {uploading ? "Uploading…" : "Upload photograph"}
                </Button>
                <Button
                  type="button"
                  className="admin-button"
                  disabled={uploading}
                  onClick={() => {
                    setShowUpload(false);
                    setUploadError("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {error && <p role="alert" className="admin-notice error">{error}</p>}

          <div
            className={
              viewMode === "grid"
                ? "admin-media-grid"
                : "admin-media-list-view"
            }
          >
            {items.map((image, index) => {
              const isSelected = selectedMap.has(image.id);
              const isItemMain = mainId === image.id;

              return (
                <div
                  key={image.id}
                  className={`admin-media-pick-item ${viewMode === "list" ? "list" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelect(image)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(image);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isMulti ? isSelected : undefined}
                  aria-label={`${image.alt}${isSelected ? " (selected)" : ""}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className="admin-media-pick-meta">
                    <span className="admin-media-pick-alt">{image.alt}</span>
                    <span className="admin-media-pick-name admin-muted">
                      {image.name}
                    </span>
                  </div>
                  <div className="admin-media-pick-controls">
                    <button
                      type="button"
                      className="admin-media-pick-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(index);
                      }}
                      title="View larger"
                      aria-label={`View ${image.alt} larger`}
                    >
                      <Eye size={14} />
                    </button>
                    {isMulti && allowMain && isSelected && (
                      <button
                        type="button"
                        className={`admin-media-pick-btn ${isItemMain ? "main" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMainId((curr) =>
                            curr === image.id ? null : image.id
                          );
                        }}
                        title={
                          isItemMain
                            ? "Remove as main photo"
                            : "Set as main photo"
                        }
                        aria-label={
                          isItemMain
                            ? "Remove as main photo"
                            : "Set as main photo"
                        }
                      >
                        <Star
                          size={14}
                          fill={isItemMain ? "currentColor" : "none"}
                        />
                      </button>
                    )}
                    {isMulti && isSelected && (
                      <span
                        className="admin-media-pick-check"
                        aria-hidden="true"
                      >
                        <Check size={13} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && items.length === 0 && (
              <SkeletonCards count={12} viewMode={viewMode} />
            )}

            {loadingMore && (
              <SkeletonCards count={4} viewMode={viewMode} />
            )}
          </div>

          {!loading && items.length === 0 && (
            <p className="admin-muted" role="status" style={{ padding: "20px 0" }}>
              No photographs found.
            </p>
          )}

          <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

          {isMulti && (
            <div className="admin-media-footer">
              <span className="admin-muted">
                {selectedImages.length} of {maxSelect} selected
                {hasMain ? " · 1 set as main" : ""}
              </span>
              <Button
                type="button"
                className="admin-button primary"
                disabled={selectedImages.length === 0}
                onClick={() => {
                  onChooseMultiple?.(selectedImages, mainId);
                  onClose();
                }}
              >
                Add{" "}
                {selectedImages.length === 1
                  ? "1 photograph"
                  : `${selectedImages.length} photographs`}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {lightboxIndex !== null && (
        <Lightbox
          images={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

export function MediaLibrary({ canUpload }: MediaLibraryProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Bulk upload dialog state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [progressList, setProgressList] = useState<
    { name: string; status: "pending" | "uploading" | "ok" | "err"; error?: string }[]
  >([]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch first page on mount and when debounced query changes
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim());
    }

    const url = `/api/admin/media${params.toString() ? `?${params.toString()}` : ""}`;
    fetch(url, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        const data: { items: MediaItem[]; nextCursor: string | null } =
          await r.json();
        setItems(data.items);
        setNextCursor(data.nextCursor);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError("Could not load the image library. Please refresh.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  // Load next page
  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore || loading) return;
    setLoadingMore(true);
    try {
      const params = new URLSearchParams();
      params.set("cursor", nextCursor);
      if (debouncedQuery.trim()) {
        params.set("q", debouncedQuery.trim());
      }
      const r = await fetch(`/api/admin/media?${params.toString()}`);
      if (!r.ok) throw new Error();
      const data: { items: MediaItem[]; nextCursor: string | null } =
        await r.json();
      setItems((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } catch {
      setError("Could not load more photographs.");
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore, loading, debouncedQuery]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !nextCursor || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [nextCursor, loadingMore, loading, loadMore]);

  const handleBulkUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadFiles.length === 0) return;
    setBulkUploading(true);
    setUploadError("");

    const newItems: MediaItem[] = [];

    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      setProgressList((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, status: "uploading" } : p))
      );

      const formData = new FormData();
      formData.append("file", file);
      const fileAlt =
        uploadFiles.length > 1 ? `${uploadAlt} (${i + 1})` : uploadAlt;
      formData.append("alt", fileAlt);

      try {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");
        newItems.push(data);
        setProgressList((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, status: "ok" } : p))
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setProgressList((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, status: "err", error: msg } : p
          )
        );
      }
    }

    if (newItems.length > 0) {
      setItems((prev) => [...newItems, ...prev]);
    }
    setBulkUploading(false);
  };

  return (
    <>
      <div className="admin-media-toolbar">
        <Label className="admin-search">
          <Search size={18} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the library"
            aria-label="Search the library"
          />
        </Label>
        <div className="admin-media-toolbar-right">
          <span className="admin-muted">{items.length} photographs</span>
          {canUpload && (
            <Button
              type="button"
              className="admin-button primary"
              onClick={() => {
                setUploadOpen(true);
                setUploadFiles([]);
                setUploadAlt("");
                setProgressList([]);
                setUploadError("");
              }}
            >
              <Upload size={16} />
              Upload photograph
            </Button>
          )}
        </div>
      </div>

      {error && <p role="alert" className="admin-notice error">{error}</p>}

      <div className="admin-media-grid">
        {items.map((image, index) => (
          <div className="admin-media-item" key={image.id}>
            <div className="admin-media-item-img-wrap">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <button
                type="button"
                className="admin-media-item-view"
                onClick={() => setLightboxIndex(index)}
                title="View photograph"
                aria-label={`View ${image.alt}`}
              >
                <Eye size={16} />
              </button>
            </div>
            <strong>{image.alt}</strong>
            <Button
              type="button"
              className="admin-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(image.src);
                  setCopied(image.id);
                  setTimeout(() => {
                    setCopied((cur) => (cur === image.id ? "" : cur));
                  }, 2000);
                } catch {
                  // Ignore clipboard write failures
                }
              }}
            >
              {copied === image.id ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                "Copy URL"
              )}
            </Button>
          </div>
        ))}

        {loading && items.length === 0 && (
          <SkeletonCards count={12} viewMode="grid" />
        )}

        {loadingMore && (
          <SkeletonCards count={4} viewMode="grid" />
        )}
      </div>

      {!loading && items.length === 0 && (
        <p className="admin-muted" role="status" style={{ padding: "20px 0" }}>
          No photographs found.
        </p>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

      {/* Bulk Upload Dialog */}
      <Dialog
        open={uploadOpen}
        onOpenChange={(open) => {
          if (!bulkUploading) setUploadOpen(open);
        }}
      >
        <DialogContent className="admin-root admin-upload-dialog">
          <DialogHeader>
            <DialogTitle>Upload photographs</DialogTitle>
            <DialogDescription>
              JPEG, PNG, or WebP, up to 4 MB. Images are public; upload only
              photos intended for the church website.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBulkUpload}>
            <Label>
              Photograph(s)
              <Input
                type="file"
                name="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                required
                disabled={bulkUploading}
                onChange={(e) => {
                  const fileList = Array.from(e.target.files || []);
                  setUploadFiles(fileList);
                  setProgressList(
                    fileList.map((f) => ({ name: f.name, status: "pending" }))
                  );
                }}
              />
            </Label>
            <Label style={{ marginTop: 14 }}>
              Describe the photograph(s)
              <Input
                name="alt"
                value={uploadAlt}
                onChange={(e) => setUploadAlt(e.target.value)}
                minLength={3}
                maxLength={300}
                required
                disabled={bulkUploading}
                placeholder="For example: Choir singing during Sunday worship"
              />
            </Label>

            {uploadError && (
              <p
                role="alert"
                className="admin-notice error"
                style={{ marginTop: 14 }}
              >
                {uploadError}
              </p>
            )}

            {progressList.length > 0 && (
              <div className="admin-upload-progress">
                {progressList.map((p, idx) => (
                  <div key={idx} className="admin-upload-progress-item">
                    <span>{p.name}</span>
                    {p.status === "uploading" && (
                      <span className="admin-muted">Uploading…</span>
                    )}
                    {p.status === "ok" && <span className="ok">✓ Uploaded</span>}
                    {p.status === "err" && (
                      <span className="err">✕ {p.error || "Failed"}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="admin-actions" style={{ marginTop: 20 }}>
              <Button
                type="submit"
                className="admin-button primary"
                disabled={bulkUploading || uploadFiles.length === 0}
              >
                <Upload size={16} />
                {bulkUploading
                  ? "Uploading…"
                  : `Upload ${uploadFiles.length > 1 ? `${uploadFiles.length} photographs` : "photograph"}`}
              </Button>
              <Button
                type="button"
                className="admin-button"
                disabled={bulkUploading}
                onClick={() => setUploadOpen(false)}
              >
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Standalone Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
