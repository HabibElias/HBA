"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";

interface Milestone {
  period: string;
  periodAm: string;
  title: string;
  titleAm: string;
  desc: string;
  descAm: string;
}

const milestones: Milestone[] = [
  {
    period: "1998 — Addis Ababa",
    periodAm: "1990 ዓ.ም — አዲስ አበባ",
    title: "Early Home Bible Fellowship",
    titleAm: "የመጀመሪያው የቤት ለቤት ጸሎትና ኅብረት",
    desc: "A tight-knit circle of families in Addis Ababa gathered weekly to pray, share meals, and study the scriptures in Amharic, sowing the seeds of fervent intercession and discipleship.",
    descAm: "በአዲስ አበባ የተሰባሰቡ ጥቂት ቤተሰቦች በሳምንት አንድ ጊዜ ተገናኝተው ለመጸለይ፣ ማዕድ ለመካፈልና የእግዚአብሔርን ቃል በአማርኛ ለማጥናት ጀመሩ።",
  },
  {
    period: "2005 — Formal Institution",
    periodAm: "1997 ዓ.ም — ይፋዊ ምሥረታ",
    title: "Founding of Hiwot Birhan Church",
    titleAm: "የሕይወት ብርሃን ቤተክርስቲያን መመስረት",
    desc: "Formally constituted with chartered elders and pastoral ministry, dedicating our efforts to Christ-centered biblical teaching, charitable support, and holistic spiritual growth.",
    descAm: "በተመረጡ ሽማግሌዎችና በመጋቢዎች አመራር በይፋ ተቋቁማ፣ በክርስቶስ ላይ ያተኮረ የመጽሐፍ ቅዱስ ትምህርትና ማኅበራዊ ድጋፍ ለመስጠት ተሰየመች።",
  },
  {
    period: "2016 — Expanding Horizons",
    periodAm: "2008 ዓ.ም — አድማስን ማስፋት",
    title: "Expansion to Summit Addis Ababa",
    titleAm: "ወደ ሰሚት አዲስ አበባ መስፋፋት",
    desc: "Responding to the rapid growth of the Summit residential area, leadership answered the call to plant a local sanctuary and community center for young families and workers.",
    descAm: "በሰሚት የመኖሪያ መንደር ውስጥ ለሚገኙ አዳዲስ ነዋሪዎች፣ ወጣት ቤተሰቦችና ሠራተኞች የሰሚት ቅርንጫፍ ቤተክርስቲያን ተተከለች።",
  },
  {
    period: "Present — Vibrant Flourishing",
    periodAm: "የአሁኑ ዘመን — ፍሬያማ ዕድገት",
    title: "Launch of Youth Awana & Community Care",
    titleAm: "የአዋና አገልግሎትና የማኅበረሰብ ድጋፍ",
    desc: "Today, our church family gathers for worship, children’s ministry, youth fellowship, and care for our neighbors.",
    descAm: "ዛሬ የሰሚት ቅርንጫፍ ደማቅ የአዋና ሕፃናት ክበብ፣ የወጣቶች ኅብረት፣ የአካባቢ ረድኤትና እውነተኛ አምልኮ የሚካሄድባት ንቁ ማኅበረሰብ ሆናለች።",
  },
];

export function FoundingTimeline() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Narrative & Visual */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold leading-tight">
            {isAm
              ? "ከትሑት የሳሎን ጸሎት እስከ ደማቁ የሰሚት መቅደስ"
              : "From home fellowship to a church family"}
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {isAm
              ? "የሕይወት ብርሃን ቤተክርስቲያን የተጀመረው የእግዚአብሔርን ቃል ሳይበረዝ ለማስተማር፣ በሞቅ ያለ ፍቅር ለመተሳሰብና ለወገን ለመድረስ ባለው ጥልቅ ፍላጎት ነው። የኢትዮጵያን ክርስቲያናዊ ቅርስ በማክበርና ዘመናዊ ቤተሰቦችን በቃሉ በማነጽ የሰሚት ቅርንጫፍ ለብዙዎች መንፈሳዊ መጠጊያ ሆናለች።"
              : "Hiwot Birhan (Light of Life) began with a fervent longing to preach the uncompromised Word of God with warmth, fellowship, and active communal outreach. Guided by elders honoring Ethiopian church legacy while discipling modern families, our Summit branch has become a welcoming spiritual haven."}
          </p>

          <div className="rounded-3xl overflow-hidden border border-border/60 relative group h-80 bg-tint/40 shadow-xs">
            <Image
              src="/gallery/photo_18_2026-08-27_14-11-14.jpg"
              alt={
                isAm
                  ? "የእሁድ ጠዋት አምልኮ በሰሚት ቅርንጫፍ፣ አዲስ አበባ"
                  : "Sunday Gathering at Summit Branch, Addis Ababa"
              }
              fill
              className="object-cover transition-transform duration-250 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/40 to-transparent p-6 text-white">
              <p className="text-xs sm:text-sm font-medium">
                {isAm
                  ? "የእሁድ ጠዋት አምልኮ በሰሚት ቅርንጫፍ፣ አዲስ አበባ"
                  : "Sunday Gathering at Summit Branch, Addis Ababa"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Chronological Milestones (Clean open space without artificial line connector) */}
        <div className="lg:col-span-7 lg:pl-10 space-y-10">
          <div>
            <h3 className="font-display text-xl sm:text-2xl text-foreground font-semibold">
              {isAm ? "የእምነትና የስምሪት ምዕራፎች" : "Our journey of faith"}
            </h3>
          </div>

          <div className="space-y-12 sm:space-y-14">
            {milestones.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full bg-tint text-primary text-xs font-semibold">
                  {isAm ? item.periodAm : item.period}
                </span>
                <h4 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-1">
                  {isAm ? item.titleAm : item.title}
                </h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-1">
                  {isAm ? item.descAm : item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
