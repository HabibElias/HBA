import Image from "next/image";
import type { ReactNode } from "react";

export function PageIntro({
  title,
  description,
  image,
  imageAlt,
  scriptTag,
  badge,
  children,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  scriptTag?: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <section className="subpage-hero relative isolate overflow-hidden text-white">
      {/* Multi-shade royal purple ambient glow & watermarks */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <Image
        src="/logo-icon-white.svg"
        alt=""
        width={720}
        height={720}
        className="hero-watermark absolute pointer-events-none select-none opacity-[0.08]"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-32 relative z-10 grid lg:grid-cols-12 items-center gap-12 lg:gap-16">
        <div className="lg:col-span-7 space-y-6">
          {scriptTag && (
            <span className="font-script text-3xl sm:text-4xl text-purple-200 block font-normal">
              {scriptTag}
            </span>
          )}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] max-w-3xl">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
            {description}
          </p>
          {children && (
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {children}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 relative">
          {/* Framed Photography with glow and badge (inspired by Inspiration.webp) */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="rounded-3xl overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-xs shadow-2xl aspect-[4/3] lg:aspect-[5/4] relative">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent pointer-events-none" />

              {badge && (
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  {badge}
                </div>
              )}
            </div>

            {/* Decorative dashed curve accent behind */}
            <div className="absolute -bottom-6 -left-6 hidden sm:block pointer-events-none text-purple-300/40" aria-hidden="true">
              <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
                <path d="M5 35C25 5 75 5 95 35" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
