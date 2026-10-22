"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { Upload, X, Check, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export interface MediaItem {
  id: string;
  name: string;
  src: string;
  alt: string;
}
export function MediaPicker({
  onChoose,
  onClose,
}: {
  onChoose: (image: MediaItem) => void;
  onClose: () => void;
}) {
  const [images, setImages] = useState<MediaItem[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [query, setQuery] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/media", { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        setImages(await r.json());
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError("Could not load the library. Close and try again.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="admin-root admin-media-dialog">
        <DialogHeader>
          <DialogTitle>Choose a photograph</DialogTitle>
          <DialogDescription>
            Select a photograph from the church image library.
          </DialogDescription>
        </DialogHeader>
        <Label className="admin-search">
          <Search size={18} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search images"
            aria-label="Search images"
          />
        </Label>
        {loading && <p role="status">Loading photographs…</p>}
        {error && <p role="alert">{error}</p>}
        <div className="admin-media-grid">
          {images
            .filter((i) =>
              `${i.name} ${i.alt}`.toLowerCase().includes(query.toLowerCase()),
            )
            .map((image) => (
              <Button
                className="admin-media-item"
                key={image.id}
                onClick={() => onChoose(image)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{image.name}</span>
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export function MediaLibrary({
  initial,
  canUpload,
}: {
  initial: MediaItem[];
  canUpload: boolean;
}) {
  const [images, setImages] = useState(initial),
    [pending, setPending] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState(false),
    [query, setQuery] = useState(""),
    [copied, setCopied] = useState("");
  return (
    <>
      {canUpload && (
        <form
          className="admin-upload"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setPending(true);
            setMessage("");
            try {
              const r = await fetch("/api/admin/media", {
                method: "POST",
                body: new FormData(form),
              });
              const data = await r.json();
              if (!r.ok) throw new Error(data.message);
              setImages((old) => [data, ...old]);
              form.reset();
              setError(false);
              setMessage(
                "Photograph uploaded and available in the content editor.",
              );
            } catch (e) {
              setError(true);
              setMessage(
                e instanceof Error
                  ? e.message
                  : "Upload failed. Please try again.",
              );
            } finally {
              setPending(false);
            }
          }}
        >
          <div>
            <h2>Add a photograph</h2>
            <p>
              JPEG, PNG, or WebP, up to 4 MB. Images are public; upload only
              photos intended for the church website.
            </p>
          </div>
          <Label>
            Photograph
            <Input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              required
              disabled={pending}
            />
          </Label>
          <Label>
            Describe the image
            <Input
              name="alt"
              minLength={3}
              maxLength={300}
              required
              disabled={pending}
              placeholder="For example: Choir singing during Sunday worship"
            />
          </Label>
          <Button
            type="submit"
            disabled={pending}
            className="admin-button primary"
          >
            <Upload size={16} />
            {pending ? "Uploading…" : "Upload photograph"}
          </Button>
        </form>
      )}
      {message && (
        <p
          role={error ? "alert" : "status"}
          className={`admin-notice ${error ? "error" : "success"}`}
        >
          {message}
        </p>
      )}
      <div className="admin-list-toolbar">
        <Label className="admin-search">
          <Search size={18} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the library"
            aria-label="Search the library"
          />
        </Label>
        <span className="admin-muted">{images.length} photographs</span>
      </div>
      <div className="admin-media-grid">
        {images
          .filter((i) =>
            `${i.name} ${i.alt}`.toLowerCase().includes(query.toLowerCase()),
          )
          .map((image) => (
            <div className="admin-media-item" key={image.id}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <strong>{image.alt}</strong>
              <Button
                className="admin-button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(image.src);
                    setCopied(image.id);
                  } catch {
                    setMessage(
                      "Use the content editor’s image picker to select this photograph.",
                    );
                    setError(false);
                  }
                }}
              >
                {copied === image.id ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  "Copy image path"
                )}
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}
