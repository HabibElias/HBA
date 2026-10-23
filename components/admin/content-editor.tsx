"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldSelect } from "@/components/ui/field-select";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Save, Send, Trash2, ImagePlus, X } from "lucide-react";
import {
  collectionConfig,
  calendarToISO,
  type Field,
} from "@/lib/cms/collections";
import type { Collection } from "@/lib/cms/permissions";
import {
  saveContentAction,
  contentStateAction,
  type ActionResult,
} from "@/app/admin/actions";
import { MediaPicker } from "./media-library";
import { pageDefaults, editablePages, sectionLabels, type EditablePage } from '@/lib/cms/pages';
export interface EditorEntry {
  id?: string;
  kind: Collection;
  title: string;
  draft: Record<string, unknown>;
  version: number;
  position: number;
  publishedVersion: number | null;
}
function localDate(value: string) {
  if (!value) return "";
  const date = new Date(calendarToISO(value));
  return Number.isNaN(date.getTime())
    ? ""
    : new Date(date.getTime() + 3 * 3600000).toISOString().slice(0, 16);
}
function calendarDate(value: string) {
  if (!value) return "";
  const date = new Date(value + ":00+03:00");
  return Number.isNaN(date.getTime())
    ? ""
    : date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
}
export function ContentEditor({
  entry,
  permissions,
  page,
}: {
  entry: EditorEntry;
  permissions: string[];
  page?: EditablePage;
}) {
  const router = useRouter(),
    config = collectionConfig[entry.kind];
  const pageConfig = page ? editablePages[page] : null;
  const backPath = page ? '/admin/pages' : `/admin/content/${entry.kind}`;
  const [section, setSection] = useState(pageConfig?.groups[0] ?? '');
  const [data, setData] = useState(entry.kind === 'settings' ? { ...pageDefaults, ...entry.draft } : entry.draft),
    [position, setPosition] = useState(entry.position),
    [tab, setTab] = useState("English"),
    [preview, setPreview] = useState(false),
    [leaveConfirm, setLeaveConfirm] = useState(false),
    [dirty, setDirty] = useState(false),
    [result, setResult] = useState<ActionResult | null>(null),
    [pending, start] = useTransition(),
    [picker, setPicker] = useState<Field | null>(null),
    [confirm, setConfirm] = useState<"unpublish" | "delete" | null>(null);
  const canEdit = permissions.includes(`${entry.kind}.write`),
    canPublish = permissions.includes(`${entry.kind}.publish`);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function update(key: string, value: unknown) {
    setData((old) => ({ ...old, [key]: value }));
    setDirty(true);
    setResult(null);
  }
  function save(intent: "draft" | "publish") {
    start(async () => {
      try {
        const r = await saveContentAction({
          id: entry.id,
          kind: entry.kind,
          version: entry.version,
          position,
          data,
          intent,
        });
        setResult(r);
        if (r.ok) {
          setDirty(false);
          if (!entry.id) router.replace(`/admin/content/${entry.kind}/${r.id}`);
          router.refresh();
        }
      } catch {
        setResult({
          ok: false,
          message:
            "Could not connect. Your edits remain here; try saving again.",
        });
      }
    });
  }
  const languageFields = config.fields.filter((f) =>
    (pageConfig ? f.group === section && pageConfig.groups.includes(f.group) : !f.group) && (tab === "Amharic" ? f.key.endsWith("Am") : !f.key.endsWith("Am")),
  );
  const field = (f: Field) => {
    const value = String(data[f.key] ?? "");
    const id = `field-${f.key}`;
    if (f.type === "photos") {
      const photos = (data[f.key] || []) as {
        src: string;
        alt: string;
        isMain?: boolean;
      }[];
      return (
        <div key={f.key} className="admin-field wide">
          <span className="admin-label">{f.label}</span>
          <div className="admin-photo-list">
            {photos.map((photo, i) => (
              <div key={i} className="admin-photo-row">
                <div className="admin-photo-thumb-wrap">
                  <img src={photo.src} alt={photo.alt || "Photograph"} />
                  <button
                    type="button"
                    className={`admin-media-main-toggle ${photo.isMain ? "active" : ""}`}
                    title={photo.isMain ? "Main photograph" : "Set as main photograph"}
                    aria-label={photo.isMain ? "Main photograph" : "Set as main photograph"}
                    disabled={!canEdit || pending}
                    onClick={() => {
                      update(
                        f.key,
                        photos.map((p, n) => ({
                          ...p,
                          isMain: n === i ? !p.isMain : false,
                        }))
                      );
                    }}
                  >
                    ★
                  </button>
                </div>
                <div className="admin-photo-desc-wrap">
                  <Input
                    value={photo.alt}
                    disabled={!canEdit || pending}
                    placeholder="Describe this photograph (alt text)"
                    aria-label={`Description for photograph ${i + 1}`}
                    onChange={(e) =>
                      update(
                        f.key,
                        photos.map((p, n) =>
                          n === i ? { ...p, alt: e.target.value } : p,
                        ),
                      )
                    }
                  />
                </div>
                {canEdit && (
                  <Button
                    type="button"
                    className="admin-icon-button"
                    aria-label={`Remove photo ${i + 1}`}
                    disabled={pending}
                    onClick={() =>
                      update(
                        f.key,
                        photos.filter((_, n) => n !== i),
                      )
                    }
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
            ))}
          </div>
          {canEdit && photos.length < 24 && (
            <Button
              className="admin-button"
              type="button"
              onClick={() => setPicker(f)}
            >
              <ImagePlus size={16} />
              Add photograph
            </Button>
          )}
        </div>
      );
    }
    if (f.type === "image")
      return (
        <div key={f.key} className="admin-field wide">
          <span className="admin-label">
            {f.label}
            {f.required && " *"}
          </span>
          <div className="admin-image-field">
            {value ? (
              <img src={value} alt="Selected photograph" />
            ) : (
              <div className="admin-image-empty">
                Choose a photograph from the library.
              </div>
            )}
            {canEdit && (
              <Button
                type="button"
                className="admin-button"
                onClick={() => setPicker(f)}
              >
                <ImagePlus size={16} />
                {value ? "Change photograph" : "Choose photograph"}
              </Button>
            )}
          </div>
        </div>
      );
    return (
      <Label
        key={f.key}
        htmlFor={id}
        className={`admin-field ${f.type === "textarea" ? "wide" : ""}`}
      >
        {f.label}
        {f.required && " *"}
        {f.type === "textarea" ? (
          <Textarea
            id={id}
            rows={5}
            value={value}
            disabled={!canEdit || pending}
            maxLength={10000}
            onChange={(e) => update(f.key, e.target.value)}
          />
        ) : f.type === "select" ? (
          <FieldSelect id={id} value={value} disabled={!canEdit || pending} onValueChange={(value) => update(f.key, value)} options={f.options!.map((o) => ({value: o, label: o.charAt(0).toUpperCase() + o.slice(1)}))} />
        ) : (
          <Input
            id={id}
            type={
              f.type === "datetime"
                ? "datetime-local"
                : f.type === "number"
                  ? "number"
                  : f.type === "email"
                    ? "email"
                    : "text"
            }
            value={f.type === "datetime" ? localDate(value) : value}
            disabled={!canEdit || pending}
            maxLength={500}
            onChange={(e) =>
              update(
                f.key,
                f.type === "datetime"
                  ? calendarDate(e.target.value)
                  : f.type === "number"
                    ? Number(e.target.value)
                    : e.target.value,
              )
            }
          />
        )}
        {f.hint && <small>{f.hint}</small>}
      </Label>
    );
  };
  return (
    <>
      <Link
        className="admin-back"
        href={backPath}
        onClick={(e) => {
          if (dirty) {
            e.preventDefault();
            setLeaveConfirm(true);
          }
        }}
      >
        <ArrowLeft size={16} />
        {pageConfig ? 'Pages' : config.name}
      </Link>
      <div className="admin-page-heading">
        <div>
          <h1>
            {pageConfig ? `${pageConfig.title} page` : entry.id ? entry.title : `Create ${config.singular.toLowerCase()}`}
          </h1>
          <p>
            {entry.publishedVersion === null
              ? "Draft · visible only to your team"
              : entry.publishedVersion === entry.version
                ? "Published · live on the website"
                : "Published · unpublished changes waiting for review"}
          </p>
        </div>
        <Button className="admin-button" onClick={() => setPreview(!preview)}>
          <Eye size={16} />
          {preview ? "Back to editing" : "Preview draft"}
        </Button>
      </div>
      {result && (
        <div
          role={result.ok ? "status" : "alert"}
          className={`admin-notice ${result.ok ? "success" : "error"}`}
        >
          {result.message}
        </div>
      )}
      {!canEdit && (
        <p className="admin-notice">
          You have read access. Ask an administrator if you need to edit this
          content.
        </p>
      )}
      <div className="admin-editor-layout">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(String(value))}
          className="admin-editor-panel"
        >
          {pageConfig && <div className="admin-page-section-picker"><Label className="admin-field">Page section<FieldSelect value={section} onValueChange={setSection} options={pageConfig.groups.map(group => ({ value: group, label: sectionLabels[group] }))}/></Label><p className="admin-muted">Edit page text and photos here. Programs, schedules, sermons, and leadership profiles have their own editors.</p></div>}
          <TabsList className="admin-tabs" aria-label="Content language">
            {["English", "Amharic"].map((t) => (
              <TabsTrigger key={t} value={t}>
                {t === "Amharic" ? "አማርኛ · Amharic" : t}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab}>
            {preview ? (
              <article
                className="admin-preview"
                lang={tab === "Amharic" ? "am" : "en"}
              >
                {!!data.image && (
                  <img src={String(data.image)} alt="Draft event photograph" />
                )}
                <h2>
                  {String(
                    data[
                      tab === "Amharic"
                        ? entry.kind === "leaders"
                          ? "nameAm"
                          : "titleAm"
                        : entry.kind === "leaders"
                          ? "name"
                          : "title"
                    ] || "Untitled",
                  )}
                </h2>
                {languageFields
                  .filter(
                    (f) =>
                      ![
                        "title",
                        "titleAm",
                        "name",
                        "nameAm",
                        "image",
                        "photos",
                      ].includes(f.key) && data[f.key],
                  )
                  .map((f) => f.type === 'photos' ? (
                    <div key={f.key}><strong>{f.label}</strong>{(data[f.key] as {src: string; alt: string}[]).map((photo, i) => <img key={i} src={photo.src} alt={photo.alt}/>)}</div>
                  ) : (
                    <div key={f.key}>
                      <strong>{f.label}</strong>
                      <p>{String(data[f.key])}</p>
                    </div>
                  ))}
              </article>
            ) : (
              <div className="admin-editor-fields">
                <p className="admin-muted wide">
                  Fields marked * are required in both languages before
                  publishing. You can save an incomplete draft.
                </p>
                {languageFields.map(field)}
              </div>
            )}
          </TabsContent>
        </Tabs>
        <aside className="admin-publish-panel">
          <h2>Publishing</h2>
          <p>
            {dirty
              ? "You have unsaved changes."
              : "All changes on this screen are saved."}
          </p>
          {pageConfig && <p className="admin-muted">Home, About, and Church details share a draft. Publishing applies all their saved changes together.</p>}
          {!pageConfig && <Label className="admin-field">
            Display order
            <Input
              type="number"
              min={0}
              max={10000}
              value={position}
              disabled={!canEdit || pending}
              onChange={(e) => {
                setPosition(Number(e.target.value));
                setDirty(true);
              }}
            />
            <small>
              Lower numbers appear first. Events are ordered by their start
              date.
            </small>
          </Label>}
          {canEdit && (
            <Button
              className="admin-button"
              disabled={pending}
              onClick={() => save("draft")}
            >
              <Save size={16} />
              {pending ? "Saving…" : entry.id ? "Save draft" : "Create draft"}
            </Button>
          )}
          {canPublish && canEdit && (
            <Button
              className="admin-button primary"
              disabled={pending}
              onClick={() => save("publish")}
            >
              <Send size={16} />
              {entry.id ? "Publish changes" : "Create & publish"}
            </Button>
          )}
          {canPublish && !canEdit && entry.id && (
            <Button
              className="admin-button primary"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  const r = await contentStateAction(
                    entry.id!,
                    entry.version,
                    "publish",
                  );
                  setResult(r);
                  if (r.ok) router.refresh();
                })
              }
            >
              Publish saved draft
            </Button>
          )}
          {!canPublish && canEdit && (
            <small>
              An administrator can review and publish your saved draft.
            </small>
          )}
          <Link
            className="admin-text-link"
            href={pageConfig?.path ?? config.publicPath}
            target="_blank"
          >
            View website ↗
          </Link>
          {entry.id && entry.kind !== "settings" && (
            <div className="admin-danger-zone">
              {entry.publishedVersion !== null && canPublish && (
                <Button
                  className="admin-button"
                  disabled={pending}
                  onClick={() => setConfirm("unpublish")}
                >
                  Unpublish
                </Button>
              )}
              {entry.publishedVersion === null &&
                permissions.includes("content.delete") && (
                  <Button
                    className="admin-button danger"
                    disabled={pending}
                    onClick={() => setConfirm("delete")}
                  >
                    <Trash2 size={15} />
                    Delete draft
                  </Button>
                )}
            </div>
          )}
        </aside>
      </div>
      <AlertDialog
        open={!!confirm}
        onOpenChange={(open) => {
          if (!open && !pending) setConfirm(null);
        }}
      >
        <AlertDialogContent className="admin-root admin-confirm-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirm === "delete"
                ? "Delete this draft?"
                : "Unpublish this entry?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirm === "delete"
                ? "This permanently deletes the draft. This action cannot be undone."
                : "This removes the entry from the public website. Your saved draft will remain available to your team."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending} className="admin-button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={pending}
              className="admin-button danger"
              onClick={() => {
                if (!confirm || !entry.id) return;
                const intent = confirm;
                start(async () => {
                  const r = await contentStateAction(
                    entry.id!,
                    entry.version,
                    intent,
                  );
                  setResult(r);
                  setConfirm(null);
                  if (r.ok) {
                    setDirty(false);
                    if (intent === "delete")
                      router.push("/admin/content/" + entry.kind);
                    router.refresh();
                  }
                });
              }}
            >
              {pending
                ? "Working…"
                : confirm === "delete"
                  ? "Delete draft"
                  : "Unpublish entry"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={leaveConfirm} onOpenChange={setLeaveConfirm}>
        <AlertDialogContent className="admin-root admin-confirm-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              Your latest edits have not been saved. Stay here to save your
              draft, or discard these edits and return to the content list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="admin-button">
              Keep editing
            </AlertDialogCancel>
            <AlertDialogAction
              className="admin-button danger"
              onClick={() => {
                setDirty(false);
                router.push(backPath);
              }}
            >
              Discard edits
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {picker && (() => {
        const existingPhotos = ((data[picker.key] as any[]) || []);
        const remainingCapacity = Math.max(1, 24 - existingPhotos.length);
        return (
          <MediaPicker
            onClose={() => setPicker(null)}
            maxSelect={picker.type === "photos" ? remainingCapacity : 1}
            allowMain={picker.type === "photos"}
            onChoose={(image) => {
              update(picker.key, image.src);
              setPicker(null);
            }}
            onChooseMultiple={(images, mainId) => {
              const existing = ((data[picker.key] || []) as {
                src: string;
                alt: string;
                isMain?: boolean;
              }[]);
              const updatedExisting = mainId
                ? existing.map((p) => ({ ...p, isMain: false }))
                : existing;
              const merged = [
                ...updatedExisting,
                ...images.map((img) => ({
                  src: img.src,
                  alt: img.alt,
                  isMain: mainId === img.id,
                })),
              ];
              update(picker.key, merged);
              setPicker(null);
            }}
          />
        );
      })()}
    </>
  );
}
