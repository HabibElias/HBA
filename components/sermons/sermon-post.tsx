"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Download,
  Volume2,
  RotateCcw,
  RotateCw,
  Share2,
  BookOpen,
  User,
  Calendar,
  Clock,
  ArrowLeft,
  Check,
  Copy,
  Send,
  Headphones,
  FileText,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { useContent } from "@/lib/context/content-context";
import { buttonVariants } from "@/components/ui/public-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Sermon } from "@/lib/data/sermons";

export interface SermonPostProps {
  sermon: Sermon;
  onBack?: () => void;
  showBackLink?: boolean;
}

export function SermonPost({
  sermon,
  onBack,
  showBackLink = false,
}: SermonPostProps) {
  const { lang } = useLanguage();
  const { settings } = useContent();
  const isAm = lang === "am";

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");

  const title = isAm ? sermon.titleAm || sermon.title : sermon.title;
  const scripture = isAm ? sermon.scriptureAm || sermon.scripture : sermon.scripture;
  const series = isAm ? sermon.seriesAm || sermon.series : sermon.series;
  const speaker = isAm ? sermon.speakerAm || sermon.speaker : sermon.speaker;
  const theme = isAm ? sermon.themeAm || sermon.theme : sermon.theme;
  const recordingUrl = sermon.recordingUrl || "#";

  const copyShareLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  return (
    <article
      id="sermon-post"
      className="site-container max-w-4xl mx-auto py-8 sm:py-12 scroll-mt-28"
    >
      {/* Back Link */}
      {showBackLink && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>{isAm ? "ወደ ሁሉም ስብከቶች ተመለስ" : "Back to all messages"}</span>
        </button>
      )}

      {/* Meta Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-tint border border-primary/10 text-xs font-semibold text-primary">
            {series}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <BookOpen className="size-3.5 text-primary" />
            {scripture}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="size-3.5 text-muted-foreground/70" />
            {isAm ? "ጥቅምት 2026" : "October 2026"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5 text-muted-foreground/70" />
            {isAm ? "12 ደቂቃ ንባብ" : "12 min read"}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground tracking-tight">
          {title}
        </h1>

        {/* Speaker Byline */}
        <div className="flex items-center gap-3 pt-2">
          <div className="size-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-semibold text-base shrink-0">
            {speaker.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm sm:text-base leading-snug flex items-center gap-1.5">
              <User className="size-3.5 text-primary" />
              {speaker}
            </p>
            <p className="text-xs text-muted-foreground">
              {isAm
                ? "የሰሚት ሕይወት ብርሃን ቤተ ክርስቲያን"
                : "Hiwot Birhan Summit Branch"}
            </p>
          </div>
        </div>
      </header>

      {/* Sacred Scripture Callout */}
      <div className="my-8 rounded-3xl bg-tint/60 border border-primary/10 border-l-4 border-l-accent p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
          <Sparkles className="size-4 text-accent" />
          <span>{isAm ? "የቅዱስ ቃሉ ክፍል" : "Scripture Reading"}</span>
        </div>
        <blockquote className="font-display text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground">
          {isAm ? (
            <>
              &ldquo;እኔ የዓለም ብርሃን ነኝ፤ የሚከተለኝ የሕይወት ብርሃን ይሆንለታል እንጂ በጨለማ
              አይመላለስም።&rdquo;
            </>
          ) : (
            <>
              &ldquo;I am the light of the world. Whoever follows me will never
              walk in darkness, but will have the light of life.&rdquo;
            </>
          )}
        </blockquote>
        <p className="mt-3 text-sm font-semibold text-primary-deep text-right">
          — {scripture}
        </p>
      </div>

      {/* Audio Listening & Download Player */}
      <section
        aria-label={isAm ? "የስብከቱ የድምፅ ቅጂ" : "Sermon Audio Recording"}
        className="my-8 rounded-3xl bg-surface border border-border p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-border/60">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
              {isAm ? "የድምፅ ትምህርት" : "Message Recording"}
            </span>
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
              {isAm ? "ስብከቱን ያዳምጡና ያውርዱ" : "Listen & Download Teaching"}
            </h2>
          </div>

          {/* Download Audio Action */}
          <div className="flex items-center gap-2.5">
            <a
              href={recordingUrl}
              download={`${sermon.id}-sermon.mp3`}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "rounded-full gap-2 px-5 font-semibold shadow-xs"
              )}
            >
              <Download className="size-4" />
              <span>{isAm ? "ድምፁን አውርድ (MP3)" : "Download Audio (MP3)"}</span>
              <span className="text-xs text-white/80 hidden sm:inline">· 32 MB</span>
            </a>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={
                isPlaying
                  ? isAm
                    ? "ድምጹን አቁም"
                    : "Pause audio"
                  : isAm
                    ? "ድምጹን አጫውት"
                    : "Play audio"
              }
              className="size-13 sm:size-14 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="size-6 fill-current" />
              ) : (
                <Play className="size-6 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Scrubber & Timeline */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1.5">
                <span>{isPlaying ? "14:25" : "00:00"}</span>
                <span>48:30</span>
              </div>
              <div className="relative w-full h-2 rounded-full bg-tint overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? "32%" : "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Player Utility Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="size-3.5" />
                <span>15s</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                title="Forward 30 seconds"
              >
                <RotateCw className="size-3.5" />
                <span>30s</span>
              </button>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground/80">
                <Volume2 className="size-3.5 text-primary" />
                <span>{isAm ? "ከፍተኛ ጥራት" : "High Quality (192 kbps)"}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/80">
                {isAm ? "ፍጥነት:" : "Speed:"}
              </span>
              {(["1x", "1.25x", "1.5x"] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                    playbackSpeed === spd
                      ? "bg-primary text-white"
                      : "bg-tint text-muted-foreground hover:text-foreground"
                  )}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Reading Body */}
      <section className="prose prose-lg max-w-none my-10 space-y-8 text-foreground">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {isAm ? "የመልእክቱ ዋና ማጠቃለያ" : "Core Truth & Teaching Notes"}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {theme}
          </p>
        </div>

        <div className="space-y-6 pt-2">
          {/* Key Point 1 */}
          <div className="rounded-2xl border border-border/80 bg-tint/30 p-6">
            <h3 className="font-display text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <span className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                1
              </span>
              {isAm
                ? "በክርስቶስ ብርሃን ሥር መኖር"
                : "Living Under the Illumination of Christ"}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isAm
                ? "ጌታ ኢየሱስ በቤተ መቅደሱ ውስጥ ቆሞ 'እኔ የዓለም ብርሃን ነኝ' ሲል፣ እርሱ ወደዚህ ዓለም የመጣው መንገዳችንን ብቻ ለማብራት ሳይሆን ራሱ ሕይወትና እውነት ሆኖ ሊመራን እንደሆነ አረጋግጧል። በብርሃኑ ውስጥ ስንመላለስ ጥርጣሬና ፍርሃት ቦታ ያጣሉ።"
                : "When Jesus proclaimed 'I am the light of the world,' He revealed that He did not come merely to point to a path, but to be the path Himself. Walking in His light exposes false securities, liberates the heart from guilt, and establishes eternal assurance."}
            </p>
          </div>

          {/* Key Point 2 */}
          <div className="rounded-2xl border border-border/80 bg-tint/30 p-6">
            <h3 className="font-display text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <span className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                2
              </span>
              {isAm
                ? "የጨለማን አሠራር በሕይወት መቃወም"
                : "Rejecting the Patterns of Darkness"}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isAm
                ? "ጨለማ ስንል የኃጢአት ብቻ ሳይሆን የመገለል፣ የተስፋ መቁረጥና የሐሰት ዓለም ነው። ቃሉ የሚነግረን ብርሃኑን የምንከተል ከሆነ በጨለማ እንደማንመላለስ ነው። ይህ ዕለታዊ የውሳኔና የጸሎት ጉዞ ነው።"
                : "Darkness represents not only outward sin, but isolation, hopelessness, and deceit. The promise is active: those who continuously follow Him are freed from wandering aimlessly. Discipleship requires honest, transparent fellowship in community."}
            </p>
          </div>

          {/* Key Point 3 */}
          <div className="rounded-2xl border border-border/80 bg-tint/30 p-6">
            <h3 className="font-display text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <span className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                3
              </span>
              {isAm
                ? "የሕይወት ብርሃን ለሌሎች ማብራት"
                : "Becoming Light for Our Generation"}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isAm
                ? "ብርሃንን የተቀበለ ማኅበር ለሰሚት አከባቢና ለመላው አዲስ አበባ ምስክር ይሆናል። በፍቅር፣ በዕርዳታ፣ በጸሎትና በወንጌል ቃል እግዚአብሔርን እናከብራለን።"
                : "A believer who walks in the light inevitably radiates that warmth into Addis Ababa, our neighborhoods, and our workplaces. Through love, acts of mercy, steadfast prayer, and gospel witness, Christ is exalted."}
            </p>
          </div>
        </div>

        {/* Reflection Questions for Small Groups */}
        <div className="my-8 rounded-3xl bg-surface border border-border p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            {isAm ? "ለግልና ለቤተሰብ ማሰላሰያ" : "Questions for Reflection & Discussion"}
          </h3>
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>
                {isAm
                  ? "በዚህ ሳምንት በክርስቶስ ብርሃን ውስጥ ለመመላለስ በግል ሕይወትህ ምን ዓይነት ማስተካከያ ማድረግ ያስፈልግሃል?"
                  : "In what practical area of your daily life are you currently inviting Christ's light to bring clarity and renewal?"}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>
                {isAm
                  ? "በቤተ ክርስቲያን ሕብረት ውስጥ ከሌሎች ወንድሞችና እህቶች ጋር በግልጽነት ለመኖር ምን እንቅፋት አለ?"
                  : "How does transparent fellowship in our church family help protect us from isolated spiritual struggles?"}
              </span>
            </li>
          </ul>
        </div>

        {/* Pastoral Benediction Prayer */}
        <div className="my-8 rounded-3xl bg-tint/80 border border-primary/10 p-6 sm:p-8 text-center max-w-2xl mx-auto">
          <p className="font-display text-base sm:text-lg font-semibold text-primary mb-2">
            {isAm ? "የበረከት ጸሎት" : "Pastoral Benediction"}
          </p>
          <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
            {isAm
              ? "“የሰላም አምላክ በክርስቶስ ኢየሱስ ብርሃኑን ያብራላችሁ፤ በእውነትና በጸጋው ውስጥ እስከ መጨረሻው ያጽናችሁ። አሜን።”"
              : "“May the God of peace cause His face to shine upon you in Jesus Christ, guiding your steps in grace, and keeping you steadfast until that day. Amen.”"}
          </p>
        </div>
      </section>

      {/* Share & Actions Footer */}
      <footer className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Share2 className="size-4 text-primary" />
          <span>{isAm ? "መልእክቱን ያጋሩ:" : "Share this message:"}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Copy Link */}
          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-tint hover:bg-surface border border-primary/15 text-xs font-semibold text-primary transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green-600" />
                <span className="text-green-600">
                  {isAm ? "ተቀድቷል!" : "Link copied!"}
                </span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>{isAm ? "ሊንኩን ቅዳ" : "Copy link"}</span>
              </>
            )}
          </button>

          {/* Telegram Share */}
          {settings.telegram && (
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-tint hover:bg-surface border border-primary/15 text-xs font-semibold text-primary transition-all"
            >
              <Send className="size-3.5" />
              <span>Telegram</span>
            </a>
          )}

          {/* Ask for physical copy / contact */}
          <Link
            href="/visit#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface hover:bg-tint border border-border text-xs font-semibold text-muted-foreground hover:text-primary transition-all"
          >
            <Headphones className="size-3.5" />
            <span>{isAm ? "ቅጂ ይጠይቁ" : "Request CD/Drive"}</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
