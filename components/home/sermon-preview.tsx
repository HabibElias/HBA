"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Headphones, Download, BookOpen, Volume2, ArrowRight, Radio } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function SermonPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-16 bg-surface" id="sermons">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <Radio className="size-4" />
              <span>{isAm ? "የእግዚአብሔር ቃል • የቅርብ ጊዜ ስብከት" : "God's Word Proclaimed • የቅርብ ጊዜ ስብከት"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {isAm ? "የቅርብ ጊዜ ስብከቶችና የትምህርት ማህደር" : "Latest Sermon & Message Archive"}
            </h2>
          </div>
          <Link
            href="/programs#archive"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-soft transition-colors"
          >
            <span>{isAm ? "ሁሉንም ስብከቶች ይመልከቱ" : "Browse Complete Audio & Video Archive"}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Sermon Card */}
        <div className="bg-primary-deep text-white rounded-2xl overflow-hidden shadow-xl border border-white/10 grid grid-cols-1 lg:grid-cols-12">
          {/* Video Thumbnail (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[260px] bg-black/40">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD204h23hJIXBD4hf-WKHCtXa4qkSW6ycRXHW1Z355439gsObZy0arl1_tyE1Hl475cYxO3Xdx3b8YzhXbsTiH1CFU5ZjrBKAysu7f2P4T9aRA9ZYVMriP8aE3mlXLHmbCqZlfA5buf2NztI8EbboxII_JNjKgledXKUoCbR2FSYbEvHRiinMi44xFMaGeWWwGKs8wIp2GAK7qtNR1CabcKMd1dlnR_74EMij5xmQMnIEkOA7eYnGq5Cg"
              alt="Pastor Dawit preaching at Hiwot Birhan Church"
              fill
              className="object-cover opacity-85"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-transparent to-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Play sermon video"
                className="w-16 h-16 rounded-full bg-accent text-primary-deep flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
              >
                <Play className="size-8 fill-current ml-1" />
              </a>
            </div>
            <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-xs font-mono text-white">
              42:15
            </div>
          </div>

          {/* Metadata & Controls (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                  {isAm ? "የእሑድ ጠዋት ስብከት" : "Sunday Morning Sermon"}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  {isAm ? "የዮሐንስ ወንጌል ተከታታይ" : "Gospel of John Series"}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                {isAm ? "በክርስቶስ ብርሃን መመላለስ" : "Walking in the Light of Christ"}
              </h3>
              <p className="text-xs sm:text-sm text-accent mb-4">
                {isAm ? "በፓስተር ዳዊት የተሰበከ" : "በክርስቶስ ብርሃን መመላለስ • Preached by Pastor Dawit"}
              </p>

              {/* Scripture Box */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3 mb-5">
                <BookOpen className="size-5 text-accent shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-accent mr-1">
                    {isAm ? "የመጽሐፍ ቅዱስ ንባብ:" : "Scripture Reading:"}
                  </span>
                  <p className="text-white/90 italic mt-0.5">
                    {isAm
                      ? '"እኔ የዓለም ብርሃን ነኝ፤ የሚከተለኝ የሕይወት ብርሃን ይሆንለታል" — ዮሐንስ 8:12'
                      : '"I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life." — John 8:12'}
                  </p>
                </div>
              </div>

              {/* Mock Audio Player */}
              <div className="bg-black/25 rounded-xl p-3.5 border border-white/10 mb-5">
                <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                  <span className="font-mono">14:20</span>
                  <span className="font-medium text-white">{isAm ? "የድምፅ ስርጭት" : "Audio Stream"}</span>
                  <span className="font-mono">42:15</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-1/3 rounded-full" />
                </div>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button type="button" aria-label="Play sermon" className="w-8 h-8 rounded-full bg-white text-primary-deep flex items-center justify-center hover:bg-accent transition-colors">
                      <Play className="size-4 fill-current ml-0.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Volume2 className="size-4" />
                    <span className="font-mono text-[11px]">1.0x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#sermons"
                className={cn(buttonVariants({ variant: "on-dark", size: "sm" }), "gap-2")}
              >
                <Headphones className="size-4" />
                <span>{isAm ? "ኦንላይን ያዳምጡ" : "Listen Online"}</span>
              </a>
              <a
                href="#notes"
                className={cn(buttonVariants({ variant: "on-dark-outline", size: "sm" }), "gap-2")}
              >
                <Download className="size-4" />
                <span>{isAm ? "የትምህርት ማስታወሻ (PDF)" : "Download Notes (PDF)"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
