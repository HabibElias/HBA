"use client";

import Image from "next/image";
import { History } from "lucide-react";
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
    desc: "A tight-knit circle of families in Addis Ababa gathered weekly to pray, share meals, and study the epistles in Amharic, sowing the seeds of fervent intercession and discipleship.",
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
    desc: "Today, the Summit Branch houses dynamic Awana children clubs, weekly campus fellowships, local food distribution, and robust multilinguistic Sunday liturgies.",
    descAm: "ዛሬ የሰሚት ቅርንጫፍ ደማቅ የአዋና ሕፃናት ክበብ፣ የወጣቶች ኅብረት፣ የአካባቢ ረድኤትና እውነተኛ አምልኮ የሚካሄድባት ንቁ ማኅበረሰብ ሆናለች።",
  },
];

export function FoundingTimeline() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Narrative & Visual */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-tint text-primary font-semibold text-xs tracking-wide">
            {isAm ? "በጸጋ የተመሠረተ" : "Rooted In Grace"}
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold leading-tight">
            {isAm
              ? "ከትሑት የሳሎን ጸሎት እስከ ደማቁ የሰሚት መቅደስ"
              : "From humble living room prayers to a vibrant beacon at Summit"}
          </h2>

          <div className="w-12 h-0.5 bg-accent" />

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {isAm
              ? "የሕይወት ብርሃን ቤተክርስቲያን የተጀመረው የእግዚአብሔርን ቃል ሳይበረዝ ለማስተማር፣ በሞቅ ያለ ፍቅር ለመተሳሰብና ለወገን ለመድረስ ባለው ጥልቅ ፍላጎት ነው። የኢትዮጵያን ክርስቲያናዊ ቅርስ በማክበርና ዘመናዊ ቤተሰቦችን በቃሉ በማነጽ የሰሚት ቅርንጫፍ ለብዙዎች መንፈሳዊ መጠጊያ ሆናለች።"
              : "Hiwot Birhan (Light of Life) began with a fervent longing to preach the uncompromised Word of God with warmth, fellowship, and active communal outreach. Guided by elders honoring Ethiopian church legacy while discipling modern families, our Summit branch has become a welcoming spiritual haven."}
          </p>

          <div className="rounded-2xl overflow-hidden border border-border shadow-sm relative group h-72">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiD50-lGE8xabiAqgdt7GKxSk9WN21cbfxhF30Ic--tL-MpQJP1gxL5133lPdh4PktcGhmRcbgX8938p3Yabcvo9kT7wU76QLZbhzryINs-tbiC-ifT7sy_XBlHjVwZSWAJgHILAbexDoe_wp9V_yBNcTbjZn8jYjjxm3Ok4g6p4DXQriE6GAzQLmGQM6yAxgduQlAm-hQ-G2Yv2PxcaiWj1IrLqnCecXbikhlQdmTOqpAPJ5iLgRdzA"
              alt="Sunday Gathering at Summit Branch, Addis Ababa"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
              <p className="text-xs sm:text-sm font-medium">
                {isAm
                  ? "የእሁድ ጠዋት አምልኮ በሰሚት ቅርንጫፍ፣ አዲስ አበባ"
                  : "Sunday Gathering at Summit Branch, Addis Ababa"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Vertical Timeline */}
        <div className="lg:col-span-7 bg-surface rounded-2xl p-6 sm:p-8 md:p-10 border border-border shadow-sm">
          <h3 className="font-display text-xl sm:text-2xl text-primary font-bold mb-8 flex items-center gap-3">
            <History className="size-6 text-accent shrink-0" />
            <span>{isAm ? "የእምነትና የስምሪት ምዕራፎች" : "Milestones of Faith & Expansion"}</span>
          </h3>

          <div className="relative border-l-2 border-border ml-3 pl-6 space-y-8 sm:space-y-10">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-surface transition-transform group-hover:scale-125" />
                <span className="text-accent text-xs font-semibold tracking-wider block">
                  {isAm ? item.periodAm : item.period}
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-foreground mt-1">
                  {isAm ? item.titleAm : item.title}
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed">
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
