"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function SermonPreview() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-16 md:py-24 bg-tint/50" id="sermons">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-border gap-4">
          <div>
            <div className="w-10 h-0.5 bg-accent mb-3" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              {isAm ? "የቅርብ ጊዜ ስብከቶችና የትምህርት ማህደር" : "Rooted in the Word"}
            </h2>
          </div>
          <Link
            href="/programs#archive"
            className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
          >
            <span>{isAm ? "ሁሉንም ስብከቶች ይመልከቱ" : "Explore past gatherings"}</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Sermon Card */}
        <div className="bg-primary-deep text-white rounded-2xl overflow-hidden border border-white/15 grid grid-cols-1 lg:grid-cols-12">
          {/* Video Thumbnail (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[280px] bg-black/40">
            <Image
              src="/summit-worship.jpg"
              alt="Teaching during a church gathering at Summit"
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-transparent to-black/20" />

          </div>

          {/* Metadata & Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                  {isAm ? "የእሑድ ጠዋት ስብከት" : "Sunday Morning"}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  {isAm ? "የዮሐንስ ወንጌል ተከታታይ" : "Gospel of John Series"}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2">
                {isAm ? "በክርስቶስ ብርሃን መመላለስ" : "Walking in the Light of Christ"}
              </h3>
              <p className="text-xs sm:text-sm text-accent mb-6">
                {isAm ? "በፓስተር ዳዊት የተሰበከ" : "Preached by Pastor Dawit • Hiwot Birhan Summit"}
              </p>

              {/* Scripture Box without fake italics */}
              <div className="py-5 border-y border-white/15 flex items-start gap-3 mb-6">
                <BookOpen className="size-5 text-accent shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-accent mr-1">
                    {isAm ? "የመጽሐፍ ቅዱስ ንባብ:" : "Scripture Reading:"}
                  </span>
                  <p className="text-white/90 mt-1 leading-relaxed">
                    {isAm
                      ? "«እኔ የዓለም ብርሃን ነኝ፤ የሚከተለኝ የሕይወት ብርሃን ይሆንለታል እንጂ በጨለማ አይመላለስም።» — ዮሐንስ 8:12"
                      : "“I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life.” — John 8:12"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/visit#contact" className={cn(buttonVariants({variant:"on-dark"}), "group")}>
                {isAm ? "የስብከት ቅጂ ይጠይቁ" : "Ask for the message"}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <p className="text-sm text-white/80">{isAm ? "ስለ ቅጂዎች ያነጋግሩን።" : "Contact us about recordings and notes."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
