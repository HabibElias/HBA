"use client";
import { useState } from "react";
import Link from "next/link";
import { Download, Headphones, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Button, buttonVariants } from "@/components/ui/public-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { audioDownloadUrl } from "@/lib/audio";
import type { Sermon } from "@/lib/data/sermons";

export interface SermonPostProps {
  sermon: Sermon;
}
export function SermonPost({ sermon }: SermonPostProps) {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [audioOpen, setAudioOpen] = useState(false);
  const title = isAm ? sermon.titleAm || sermon.title : sermon.title;
  const body = isAm ? sermon.bodyAm || sermon.body : sermon.body;
  const series = isAm ? sermon.seriesAm || sermon.series : sermon.series;
  const speaker = isAm ? sermon.speakerAm || sermon.speaker : sermon.speaker;
  const scripture = isAm
    ? sermon.scriptureAm || sermon.scripture
    : sermon.scripture;
  return (
    <article id="sermon-post" tabIndex={-1} className="scroll-mt-28">
      <header className="subpage-hero text-white pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="site-container max-w-4xl space-y-5">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white mb-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowLeft className="size-4" />
            {isAm ? "ሁሉም መልእክቶች" : "All messages"}
          </Link>
          {series && (
            <p className="text-sm font-medium text-white/85">{series}</p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
            {title}
          </h1>
          <p className="text-sm text-white/85">
            {[speaker, scripture].filter(Boolean).join(" · ")}
          </p>
          <p className="text-lg leading-relaxed text-white/85">
            {isAm ? sermon.themeAm || sermon.theme : sermon.theme}
          </p>
          <div className="flex flex-wrap gap-3">
            {sermon.audioUrl && (
              <Button
                variant="on-dark-outline"
                onClick={() => setAudioOpen(true)}
              >
                <Headphones className="size-4" />
                {isAm ? "ያዳምጡ እና ያውርዱ" : "Listen & download"}
              </Button>
            )}
            {sermon.recordingUrl && (
              <a
                href={sermon.recordingUrl}
                className={buttonVariants({ variant: "on-dark-outline" })}
              >
                {isAm ? "ቅጂውን ይክፈቱ" : "Open recording"}
              </a>
            )}
          </div>
        </div>
      </header>
      {body && (
        <div
          className="sermon-prose site-container max-w-4xl py-12 md:py-16"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {sermon.audioUrl && (
        <Dialog open={audioOpen} onOpenChange={setAudioOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {isAm
                  ? "ያዳምጡ ወይም ቅጂውን ያውርዱ።"
                  : "Listen here or download the recording for later."}
              </DialogDescription>
            </DialogHeader>
            <audio
              controls
              preload="metadata"
              src={sermon.audioUrl}
              className="w-full"
            />
            <a
              href={audioDownloadUrl(sermon.audioUrl)}
              download
              className={buttonVariants({ variant: "default" })}
            >
              <Download className="size-4" />
              {isAm ? "ድምፁን አውርድ" : "Download audio"}
            </a>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
