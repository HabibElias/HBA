"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function StoryHero() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="subpage-hero relative isolate overflow-clip text-white pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-36">
      {/* 1. Ambient Lighting with Living Pulse */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* 2. Left Architectural Asset: Church Building (Entire Asset Floats Naturally in Harmonic Orbit) */}
      <div
        className="hero-asset-entrance-left absolute left-0 -bottom-4 sm:-bottom-6 lg:-bottom-8 w-[35vw] max-w-[490px] min-w-[140px] pointer-events-none select-none z-[12] opacity-[0.22] sm:opacity-[0.28] mix-blend-screen filter grayscale-[50%] contrast-125"
        aria-hidden="true"
      >
        <div className="hero-asset-floating-left w-full h-auto">
          <Image
            src="/illustrations/church-building.svg"
            alt=""
            width={1000}
            height={580}
            className="w-full h-auto pointer-events-none select-none"
            priority
          />
        </div>
      </div>

      {/* 3. Right Architectural Asset: Summit Sanctuary (Counter-Rhythmic Fluid Float) */}
      <div
        className="hero-asset-entrance-right absolute right-0 -bottom-4 sm:-bottom-6 lg:-bottom-8 w-[37vw] max-w-[520px] min-w-[150px] pointer-events-none select-none z-[12] opacity-[0.22] sm:opacity-[0.28] mix-blend-screen"
        aria-hidden="true"
      >
        <div className="hero-asset-floating-right w-full h-auto">
          <Image
            src="/illustrations/summit-sanctuary.png"
            alt=""
            width={1536}
            height={1024}
            sizes="(max-width: 1024px) 37vw, 520px"
            className="w-full h-auto pointer-events-none select-none"
            priority
          />
        </div>
      </div>

      {/* 4. Hero Content: Headline & Narrative with Fluid Staggered Reveal */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down" duration={700} delay={60} distance={16}>
            <span className="font-script text-2xl sm:text-3xl text-purple-200 block font-normal">
              {isAm ? "ታሪካችን፣ እምነታችን እና ጥሪያችን" : "Our Heritage & Calling"}
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={800} delay={160} distance={24}>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              {isAm
                ? "በእምነት የጸናን፣ በብርሃን የምንመላለስ፣ በክርስቶስ የምናድግ"
                : "Rooted in Faith. Walking in Light. Growing Together."}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={850} delay={280} distance={20}>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto pt-1">
              {isAm
                ? "ከ1990 ዓ.ም የቤት ለቤት ጸሎት ጀምሮ እስከ ዛሬው የሰሚት 2ኛ በር መቅደስ፤ ታሪካችን በእግዚአብሔር ጸጋ የተመሠረተ፣ በቃሉ የታነፀና ለወገን የደረሰ ሕያው ምስክር ነው።"
                : "From an intimate home prayer circle in 1998 to a vibrant congregation in eastern Addis Ababa, our story is one of sovereign grace, faithful discipleship, and a deep love for Summit."}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
