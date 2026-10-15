"use client";

import Link from "next/link";
import { BookOpen, ArrowUpRight, User } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const RECENT_SERMONS = [
  {
    id: "light-of-christ",
    series: "Gospel of John",
    seriesAm: "የዮሐንስ ወንጌል",
    scripture: "John 8:12",
    scriptureAm: "ዮሐንስ 8:12",
    title: "Walking in the Light of Christ",
    titleAm: "በክርስቶስ ብርሃን መመላለስ",
    speaker: "Pastor Dawit",
    speakerAm: "ፓስተር ዳዊት",
    theme: "Living boldly in biblical truth and Christ’s grace.",
    themeAm: "በእግዚአብሔር ቃል እውነትና ጸጋ ውስጥ የመመላለስ ጥሪ።",
  },
  {
    id: "living-with-hope",
    series: "First Peter Series",
    seriesAm: "1ኛ ጴጥሮስ",
    scripture: "1 Peter 1:13-16",
    scriptureAm: "1ኛ ጴጥሮስ 1:13-16",
    title: "Living with Holy Hope in Uncertain Times",
    titleAm: "በማይናወጥ ቅዱስ ተስፋ መኖር",
    speaker: "Senior Pastoral Team",
    speakerAm: "የአጥቢያው አገልጋዮች",
    theme: "Anchoring our faith during trials and seasons of testing.",
    themeAm: "በፈተናና በችግር ወቅት እምነትን በክርስቶስ ላይ ማጽናት።",
  },
  {
    id: "rooted-in-love",
    series: "Ephesians Expository",
    seriesAm: "ኤፌሶን",
    scripture: "Ephesians 3:17-19",
    scriptureAm: "ኤፌሶን 3:17-19",
    title: "Rooted and Grounded in Christ’s Love",
    titleAm: "በክርስቶስ ፍቅር ሥር ሰዶ ማደግ",
    speaker: "Elder Yohannes",
    speakerAm: "ሽማግሌ ዮሐንስ",
    theme: "Knowing the breadth, length, height, and depth of God’s love.",
    themeAm: "የክርስቶስን ፍቅር ስፋት፣ ርዝመት፣ ከፍታና ጥልቀት ማወቅ።",
  },
];

export function SermonPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40" id="sermons">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <ScrollReveal variant="fade-up" duration={600} className="mb-12 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
                {isAm ? "የቃሉ ትምህርት" : "Recent Messages"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
                {isAm ? "የቅርብ ጊዜ ስብከቶችና የትምህርት ማህደር" : "Recent Sermons & Teaching"}
              </h2>
            </div>
            <Link
              href="/programs#archive"
              className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
            >
              <span>{isAm ? "ሁሉንም ስብከቶች ይመልከቱ" : "Explore sermon archive"}</span>
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Simplified Sermon Link Cards — Linking directly to the archive without clutter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_SERMONS.map((sermon, idx) => (
            <ScrollReveal
              key={sermon.id}
              delay={idx * 100}
              variant="fade-up"
              distance={28}
              className="h-full flex flex-col"
            >
              <Link
                href="/programs#archive"
                className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between flex-1 transition-all duration-200 cursor-pointer min-h-[260px]"
              >
                {/* Subtle Watermark Icon in bottom-right corner */}
                <BookOpen
                  className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.06] rotate-[-15deg] pointer-events-none select-none"
                  aria-hidden="true"
                  strokeWidth={1}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary transition-all duration-200">
                      {isAm ? sermon.seriesAm : sermon.series}
                    </span>
                    <span className="text-xs font-medium text-primary/80">
                      {isAm ? sermon.scriptureAm : sermon.scripture}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-primary/90 mb-2">
                    <User className="size-3.5" />
                    <span>{isAm ? sermon.speakerAm : sermon.speaker}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                    {isAm ? sermon.titleAm : sermon.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {isAm ? sermon.themeAm : sermon.theme}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors relative z-10">
                  <span>{isAm ? "ስብከቱን በማህደር ያዳምጡ" : "Listen in archive"}</span>
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
