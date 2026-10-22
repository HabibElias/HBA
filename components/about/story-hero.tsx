"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
export function StoryHero() {
  const { lang } = useLanguage(); const isAm = lang === "am";
  return (
    <section className="subpage-hero about-story-hero text-white">
      <div className="site-container pt-36 md:pt-44 pb-20 md:pb-28 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            {isAm ? "በእምነት የጸናን። በብርሃን የምንመላለስ።" : "Rooted in faith.\nA family in Summit."}
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            {isAm ? "እግዚአብሔርን ለማምለክ፣ ቃሉን ለመስማትና በእምነት አብሮ ለማደግ በአዲስ አበባ ሰሚት የተሰበሰብን መንፈሳዊ ቤተሰብ ነን።" : "We are a Christian family in Addis Ababa, gathered to worship God, hear His Word, and share the life and light of Christ with our neighbors."}
          </p>
          <Link href="#faith" className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold text-white hover:text-white/80">
            {isAm ? "እምነታችንን ይወቁ" : "Get to know our faith"}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="about-photo-essay mt-12 md:mt-16" aria-label={isAm ? "ከቤተ ክርስቲያናችን ሕይወት" : "Life in our church"}>
          {[{n:2,alt:"Our church family in fellowship"},{n:18,alt:"The Summit sanctuary"},{n:10,alt:"Learning from the Word together"}].map((photo)=>(
            <div key={photo.n} className="relative rounded-3xl overflow-hidden bg-white/10">
              <Image src={`/gallery/photo_${photo.n}_2026-08-27_14-11-14.jpg`} alt={isAm ? "የሰሚት ቤተ ክርስቲያን ሕብረት" : photo.alt} fill sizes="(max-width: 640px) 34vw, 32vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
