"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  FileAudio,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { audioUploadConfigAction } from "@/app/admin/actions";
import { isAudioUploadResult, MAX_AUDIO_BYTES } from "@/lib/audio";

export function AudioUploadDialog({
  onClose,
  onChoose,
}: {
  onClose: () => void;
  onChoose: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadInFlight = useRef(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function chooseFiles(files: FileList | null) {
    if (uploadInFlight.current || !files?.length) return;
    if (files.length !== 1) {
      setError("Choose one recording for this sermon.");
      return;
    }
    const next = files[0];
    if (
      !next.size ||
      next.size > MAX_AUDIO_BYTES ||
      !/\.(mp3|m4a|wav|ogg)$/i.test(next.name)
    ) {
      setError("Choose an MP3, M4A, WAV, or OGG recording up to 50 MB.");
      return;
    }
    setFile(next);
    setError("");
  }

  function finish() {
    if (uploadInFlight.current) return;
    if (uploadedUrl) onChoose(uploadedUrl);
    onClose();
  }

  async function upload() {
    if (!file || uploadInFlight.current) return;
    uploadInFlight.current = true;
    setBusy(true);
    setError("");
    try {
      const config = await audioUploadConfigAction();
      if (!config.ok) throw new Error(config.message);
      const body = new FormData();
      body.set("file", file);
      body.set("upload_preset", config.preset);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${encodeURIComponent(config.cloud)}/video/upload`,
        {
          method: "POST",
          body,
          signal: AbortSignal.timeout(120000),
        },
      );
      const result = await response.json();
      if (!response.ok || !isAudioUploadResult(result))
        throw new Error(
          "The recording could not be uploaded. Try again, or choose another audio file.",
        );
      setUploadedUrl(result.secure_url);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Upload failed. Try again.",
      );
    } finally {
      uploadInFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) finish();
      }}
    >
      <DialogContent
        className="admin-root admin-upload-dialog admin-audio-upload-dialog"
        showCloseButton={!busy}
      >
        <DialogHeader>
          <DialogTitle>
            {uploadedUrl ? "Upload complete" : "Upload sermon audio"}
          </DialogTitle>
          <DialogDescription>
            {uploadedUrl
              ? "Your recording is ready to attach to this sermon."
              : "Upload one MP3, M4A, WAV, or OGG recording up to 50 MB."}
          </DialogDescription>
        </DialogHeader>
        {uploadedUrl ? (
          <div className="admin-upload-complete" role="status">
            <div className="admin-upload-complete-icon">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>
            <div>
              <h3>Recording uploaded!</h3>
              <p className="admin-muted mt-1">
                Save the sermon to keep this recording. Publish it when you are
                ready to share.
              </p>
            </div>
            <p className="admin-audio-filename">{file?.name}</p>
            <audio
              controls
              preload="metadata"
              src={uploadedUrl}
              aria-label="Uploaded recording preview"
              className="admin-audio-preview"
            />
            <div className="admin-actions">
              <Button
                type="button"
                className="admin-button primary"
                onClick={finish}
              >
                <Check size={16} />
                Use recording
              </Button>
            </div>
          </div>
        ) : (
          <>
            <input
              ref={fileInput}
              type="file"
              accept=".mp3,.m4a,.wav,.ogg"
              hidden
              disabled={busy}
              aria-label="Choose sermon recording"
              onChange={(event) => {
                chooseFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <div
              className={`admin-dropzone ${dragging ? "dragging" : ""}`}
              role="button"
              tabIndex={busy ? -1 : 0}
              aria-disabled={busy}
              aria-label={
                file
                  ? "Choose a different recording"
                  : "Choose an audio recording"
              }
              onClick={() => {
                if (!busy) fileInput.current?.click();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (!busy) fileInput.current?.click();
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
                if (!busy) setDragging(true);
              }}
              onDragLeave={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                )
                  setDragging(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                chooseFiles(event.dataTransfer.files);
              }}
            >
              <div className="admin-dropzone-icon">
                <UploadCloud size={24} aria-hidden="true" />
              </div>
              <div className="admin-dropzone-title">
                Drag and drop a recording here, or <span>browse files</span>
              </div>
              <div className="admin-dropzone-hint">
                {file
                  ? "Choose another file to replace the selected recording"
                  : "One audio recording (MP3, M4A, WAV, or OGG up to 50 MB)"}
              </div>
            </div>
            {error && (
              <p role="alert" className="admin-notice error">
                {error}
              </p>
            )}
            {file && (
              <div className="admin-upload-list">
                <div
                  className={`admin-upload-card ${error ? "err" : busy ? "uploading" : "pending"}`}
                >
                  <div className="admin-upload-card-thumb admin-audio-thumb">
                    <FileAudio size={24} aria-hidden="true" />
                  </div>
                  <div className="admin-upload-card-info">
                    <div className="admin-upload-card-top">
                      <span
                        className="admin-upload-card-name"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                      <span className="admin-upload-card-size">
                        {file.size < 1024 * 1024
                          ? `${Math.ceil(file.size / 1024)} KB`
                          : `${(file.size / 1024 / 1024).toFixed(1)} MB`}
                      </span>
                    </div>
                    <p className="admin-muted">
                      Preview your recording before uploading.
                    </p>
                  </div>
                  <div className="admin-upload-card-status" role="status">
                    <span
                      className={`admin-upload-badge ${busy ? "uploading" : error ? "err" : "pending"}`}
                    >
                      {busy ? (
                        <>
                          <RefreshCw
                            size={12}
                            className="motion-safe:animate-spin"
                          />
                          Uploading...
                        </>
                      ) : error ? (
                        <>
                          <AlertCircle size={13} />
                          Try again
                        </>
                      ) : (
                        "Ready"
                      )}
                    </span>
                    {!busy && (
                      <Button
                        type="button"
                        className="admin-icon-button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => {
                          setFile(null);
                          setError("");
                        }}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                </div>
                {preview && (
                  <audio
                    controls
                    preload="metadata"
                    src={preview}
                    aria-label="Selected recording preview"
                    className="admin-audio-preview"
                  />
                )}
              </div>
            )}
            <div className="admin-actions admin-audio-upload-actions">
              <Button
                type="button"
                className="admin-button primary"
                disabled={busy || !file}
                onClick={upload}
              >
                {error ? <RefreshCw size={16} /> : <UploadCloud size={16} />}
                {busy
                  ? "Uploading..."
                  : error && file
                    ? "Retry upload"
                    : "Upload recording"}
              </Button>
              <Button
                type="button"
                className="admin-button"
                disabled={busy}
                onClick={finish}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
