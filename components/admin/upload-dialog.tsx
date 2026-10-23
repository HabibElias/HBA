"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  X,
  Check,
  AlertCircle,
  RefreshCw,
  Plus,
  CheckCircle2,
} from "lucide-react";
import type { MediaItem } from "./media-library";

export interface UploadItem {
  id: string;
  file: File;
  preview: string;
  name: string;
  sizeFormatted: string;
  alt: string;
  status: "pending" | "uploading" | "ok" | "err";
  error?: string;
  uploadedItem?: MediaItem;
}

export interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (uploadedItems: MediaItem[]) => void;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function sanitizeName(fileName: string) {
  const base = fileName.replace(/\.[^/.]+$/, "");
  return base.replace(/[^\p{L}\p{N} ._-]/gu, " ").trim() || "Church photograph";
}

export function UploadDialog({ open, onClose, onSuccess }: UploadDialogProps) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [defaultAlt, setDefaultAlt] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<UploadItem[]>(items);
  itemsRef.current = items;
  const prevOpenRef = useRef(open);

  // Clean up object URLs on unmount or when dialog closes
  const cleanupPreviews = useCallback((list: UploadItem[]) => {
    list.forEach((item) => {
      try {
        URL.revokeObjectURL(item.preview);
      } catch {
        // Ignore revocation errors
      }
    });
  }, []);

  const handleReset = useCallback(() => {
    cleanupPreviews(itemsRef.current);
    setItems((prev) => (prev.length === 0 ? prev : []));
    setDefaultAlt("");
    setGlobalError("");
    setIsUploading(false);
  }, [cleanupPreviews]);

  // Reset only when dialog transitions from open to closed
  useEffect(() => {
    if (prevOpenRef.current && !open) {
      handleReset();
    }
    prevOpenRef.current = open;
  }, [open, handleReset]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      cleanupPreviews(itemsRef.current);
    };
  }, [cleanupPreviews]);

  const addFiles = (selectedFiles: FileList | File[]) => {
    const list = Array.from(selectedFiles);
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const newItems: UploadItem[] = [];

    for (const file of list) {
      if (!validImageTypes.includes(file.type)) {
        setGlobalError(
          "Only JPEG, PNG, and WebP images under 4 MB are supported."
        );
        continue;
      }
      if (file.size > 4 * 1024 * 1024) {
        setGlobalError(`"${file.name}" exceeds the 4 MB limit.`);
        continue;
      }

      newItems.push({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        sizeFormatted: formatBytes(file.size),
        alt: defaultAlt.trim() || sanitizeName(file.name),
        status: "pending",
      });
    }

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
      setGlobalError("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        try {
          URL.revokeObjectURL(target.preview);
        } catch {
          // Ignore
        }
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const updateItemAlt = (id: string, alt: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, alt } : item))
    );
  };

  const uploadSingle = async (
    targetItem: UploadItem
  ): Promise<MediaItem | null> => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === targetItem.id
          ? { ...i, status: "uploading", error: undefined }
          : i
      )
    );

    const formData = new FormData();
    formData.append("file", targetItem.file);
    const altText = targetItem.alt.trim() || "Church photograph";
    formData.append("alt", altText);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // Non-JSON response
      }

      if (!res.ok) {
        throw new Error(data?.message || res.statusText || "Upload failed");
      }

      const uploaded: MediaItem = data;
      setItems((prev) =>
        prev.map((i) =>
          i.id === targetItem.id
            ? { ...i, status: "ok", uploadedItem: uploaded }
            : i
        )
      );
      return uploaded;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to upload image.";
      setItems((prev) =>
        prev.map((i) =>
          i.id === targetItem.id ? { ...i, status: "err", error: message } : i
        )
      );
      return null;
    }
  };

  const startUploadBatch = async (itemsToUpload?: UploadItem[]) => {
    const targets =
      itemsToUpload ||
      items.filter((i) => i.status === "pending" || i.status === "err");
    if (targets.length === 0) return;

    setIsUploading(true);
    setGlobalError("");

    const results: MediaItem[] = [];

    for (const item of targets) {
      const uploaded = await uploadSingle(item);
      if (uploaded) {
        results.push(uploaded);
      }
    }

    setIsUploading(false);
  };

  const retrySingle = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target || isUploading) return;
    uploadSingle(target);
  };

  const retryAllFailed = () => {
    const failedItems = items.filter((i) => i.status === "err");
    if (failedItems.length > 0) {
      startUploadBatch(failedItems);
    }
  };

  // Completion check
  const allUploaded =
    items.length > 0 && items.every((i) => i.status === "ok");
  const failedCount = items.filter((i) => i.status === "err").length;
  const pendingCount = items.filter((i) => i.status === "pending").length;

  const handleFinishAndClose = () => {
    const uploadedMedia = items
      .map((i) => i.uploadedItem)
      .filter((m): m is MediaItem => Boolean(m));
    if (uploadedMedia.length > 0) {
      onSuccess(uploadedMedia);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isUploading && !isOpen) {
          // If some were uploaded, pass them through
          const uploadedMedia = items
            .map((i) => i.uploadedItem)
            .filter((m): m is MediaItem => Boolean(m));
          if (uploadedMedia.length > 0) {
            onSuccess(uploadedMedia);
          }
          onClose();
        }
      }}
    >
      <DialogContent className="admin-root admin-upload-dialog">
        <DialogHeader>
          <DialogTitle>
            {allUploaded ? "Upload complete" : "Upload photographs"}
          </DialogTitle>
          <DialogDescription>
            {allUploaded
              ? "All selected photographs have been uploaded to Cloudinary."
              : "Upload JPEG, PNG, or WebP photos up to 4 MB each."}
          </DialogDescription>
        </DialogHeader>

        {allUploaded ? (
          /* ── SUCCESS VIEW ── */
          <div className="admin-upload-complete">
            <div className="admin-upload-complete-icon">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3>All {items.length} photographs uploaded!</h3>
              <p className="admin-muted" style={{ marginTop: 4 }}>
                The images are ready and available in the image library.
              </p>
            </div>

            <div className="admin-upload-complete-grid">
              {items.map((item) => (
                <div key={item.id} className="admin-upload-complete-thumb">
                  <img src={item.preview} alt={item.alt} />
                  <span>✓</span>
                </div>
              ))}
            </div>

            <div className="admin-actions" style={{ marginTop: 12 }}>
              <Button
                type="button"
                className="admin-button primary"
                onClick={handleFinishAndClose}
              >
                <Check size={16} />
                View in library
              </Button>
              <Button
                type="button"
                className="admin-button"
                onClick={handleReset}
              >
                <Plus size={16} />
                Upload more photos
              </Button>
            </div>
          </div>
        ) : (
          /* ── UPLOAD / PREPARATION VIEW ── */
          <>
            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              style={{ display: "none" }}
              disabled={isUploading}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  addFiles(e.target.files);
                  e.target.value = "";
                }
              }}
            />

            {/* Custom Dropzone */}
            <div
              className={`admin-dropzone ${isDragging ? "dragging" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => {
                if (!isUploading) fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!isUploading) fileInputRef.current?.click();
                }
              }}
            >
              <div className="admin-dropzone-icon">
                <UploadCloud size={24} />
              </div>
              <div className="admin-dropzone-title">
                Drag and drop photos here, or <span>browse files</span>
              </div>
              <div className="admin-dropzone-hint">
                Add one or multiple photographs (JPEG, PNG, or WebP up to 4 MB)
              </div>
            </div>

            {globalError && (
              <p
                role="alert"
                className="admin-notice error"
                style={{ marginTop: 14, marginBottom: 0 }}
              >
                {globalError}
              </p>
            )}

            {/* Batch description when files are selected */}
            {items.length > 0 && (
              <div className="admin-upload-batch-desc">
                <Label>
                  Default description for this batch
                  <Input
                    value={defaultAlt}
                    disabled={isUploading}
                    placeholder="e.g. Sunday worship gathering"
                    onChange={(e) => {
                      const val = e.target.value;
                      setDefaultAlt(val);
                      // Update any pending item that still has its default name
                      setItems((prev) =>
                        prev.map((i) =>
                          i.status === "pending"
                            ? {
                                ...i,
                                alt: val.trim() || sanitizeName(i.name),
                              }
                            : i
                        )
                      );
                    }}
                  />
                  <small>
                    Applied to all photos. You can also adjust descriptions
                    individually below.
                  </small>
                </Label>
              </div>
            )}

            {/* Selected Photos List */}
            {items.length > 0 && (
              <div className="admin-upload-list">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`admin-upload-card ${item.status}`}
                  >
                    <img
                      src={item.preview}
                      alt={item.name}
                      className="admin-upload-card-thumb"
                    />
                    <div className="admin-upload-card-info">
                      <div className="admin-upload-card-top">
                        <span
                          className="admin-upload-card-name"
                          title={item.name}
                        >
                          {item.name}
                        </span>
                        <span className="admin-upload-card-size">
                          {item.sizeFormatted}
                        </span>
                      </div>
                      <Input
                        value={item.alt}
                        disabled={isUploading || item.status === "ok"}
                        placeholder="Image description (alt text)"
                        aria-label={`Description for ${item.name}`}
                        className="admin-upload-card-input"
                        onChange={(e) => updateItemAlt(item.id, e.target.value)}
                      />
                    </div>
                    <div className="admin-upload-card-status">
                      {item.status === "pending" && (
                        <>
                          <span className="admin-upload-badge pending">
                            Ready
                          </span>
                          {!isUploading && (
                            <Button
                              type="button"
                              className="admin-icon-button"
                              title="Remove photo"
                              aria-label={`Remove ${item.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(item.id);
                              }}
                            >
                              <X size={16} />
                            </Button>
                          )}
                        </>
                      )}

                      {item.status === "uploading" && (
                        <span className="admin-upload-badge uploading">
                          <RefreshCw size={12} className="spin" />
                          Uploading…
                        </span>
                      )}

                      {item.status === "ok" && (
                        <span className="admin-upload-badge ok">
                          <Check size={13} />
                          Uploaded
                        </span>
                      )}

                      {item.status === "err" && (
                        <>
                          <span
                            className="admin-upload-badge err"
                            title={item.error || "Upload failed"}
                          >
                            <AlertCircle size={13} />
                            Failed
                          </span>
                          {!isUploading && (
                            <Button
                              type="button"
                              className="admin-button"
                              style={{
                                padding: "4px 8px",
                                minHeight: 28,
                                fontSize: 11,
                              }}
                              onClick={() => retrySingle(item.id)}
                            >
                              <RefreshCw size={12} />
                              Retry
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions Footer */}
            {items.length > 0 && (
              <div
                className="admin-actions"
                style={{
                  justifyContent: "space-between",
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid var(--admin-line)",
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Button
                    type="button"
                    className="admin-button primary"
                    disabled={isUploading || pendingCount === 0}
                    onClick={() => startUploadBatch()}
                  >
                    <UploadCloud size={16} />
                    {isUploading
                      ? "Uploading…"
                      : pendingCount > 0
                        ? `Upload ${pendingCount} photograph${pendingCount > 1 ? "s" : ""}`
                        : "All uploaded"}
                  </Button>

                  {failedCount > 0 && !isUploading && (
                    <Button
                      type="button"
                      className="admin-button"
                      onClick={retryAllFailed}
                    >
                      <RefreshCw size={14} />
                      Retry {failedCount} failed
                    </Button>
                  )}
                </div>

                <Button
                  type="button"
                  className="admin-button"
                  disabled={isUploading}
                  onClick={() => {
                    const uploadedMedia = items
                      .map((i) => i.uploadedItem)
                      .filter((m): m is MediaItem => Boolean(m));
                    if (uploadedMedia.length > 0) {
                      onSuccess(uploadedMedia);
                    }
                    onClose();
                  }}
                >
                  {items.some((i) => i.status === "ok") ? "Done" : "Cancel"}
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
