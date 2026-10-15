import Image from "next/image";
import type { ReactNode } from "react";

export function PageIntro({ title, description, image, imageAlt, children }: {
  title: string; description: string; image: string; imageAlt: string; children?: ReactNode;
}) {
  return (
    <section className="bg-tint/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid lg:grid-cols-12 items-center gap-10 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="divider-gold mb-6" aria-hidden="true" />
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight max-w-3xl">{title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mt-6">{description}</p>
          {children && <div className="flex flex-wrap gap-3 mt-8">{children}</div>}
        </div>
        <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden bg-tint">
          <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
