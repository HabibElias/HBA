"use client";

import { useLanguage } from "@/lib/context/language-context";

export function StoryHero() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="bg-tint/60 w-full py-16 md:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Gold Accent Divider */}
        <div className="w-10 h-0.5 bg-accent mb-6" />

        <p className="text-xs sm:text-sm font-bold text-accent-contrast dark:text-accent uppercase tracking-widest mb-3">
          {isAm
            ? "የሕይወት ብርሃን አዲስ አበባ • ሰሚት ቅርንጫፍ"
            : "Hiwot Birhan Addis Ababa • Summit Branch"}
        </p>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight font-bold mb-4">
          {isAm ? "ታሪካችን፣ እምነታችን እና መርሆዎቻችን" : "Our Story, Faith & Values"}
        </h1>

        <p className="font-display text-lg sm:text-xl md:text-2xl text-primary-soft mb-6 font-normal">
          {isAm ? "Our Story, Faith & Values" : "ታሪካችን፣ እምነታችን እና መርሆዎቻችን"}
        </p>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          {isAm
            ? "በወንጌል እውነትና በኢትዮጵያ ክርስቲያናዊ ቅርስ ላይ የተመሠረተ፤ በጌታችን በኢየሱስ ክርስቶስ ሕይወትና ጸጋ ልቦችን እያበራን በአዲስ አበባ ሰሚት የተሰበሰብን መንፈሳዊ ቤተሰብ ነን።"
            : "Rooted in gospel truth and the rich soil of Ethiopian Christian heritage, we are a family gathered in Summit, Addis Ababa, illuminating hearts through the life and grace of our Lord Jesus Christ."}
        </p>
      </div>
    </section>
  );
}
