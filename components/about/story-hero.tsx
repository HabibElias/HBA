"use client";
import { useAboutContent } from "@/lib/context/about-context";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
export function StoryHero() {
  const { pageText, pageValue, photos } = useAboutContent();
  const { lang } = useLanguage(); const isAm = lang === "am";
  return (
    <section className="subpage-hero about-story-hero text-white">
      <div className="site-container pt-36 md:pt-44 pb-20 md:pb-28 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            {pageText("about_story_hero_1")}
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            {pageText("about_story_hero_2")}
          </p>
          <Link href={pageValue("about_story_hero_3")} className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold text-white hover:text-white/80">
            {pageText("about_story_hero_4")}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="about-photo-essay mt-12 md:mt-16" aria-label={pageText("about_story_hero_5")}>
          {photos.map((photo, index)=>(
            <div key={`${photo.src}-${index}`} className="relative rounded-3xl overflow-hidden bg-white/10">
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 34vw, 32vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
