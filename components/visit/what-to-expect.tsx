"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

const EXPECT_ITEMS = [
  {
    titleEn: "Warm Welcome & Greeters",
    titleAm: "ሞቅ ያለ አቀባበልና አስተናጋጆች",
    descEn: "From the sanctuary gate to the entrance lobby, friendly greeters will assist you with parking, guide you to our guest lounge, and comfortably seat you.",
    descAm: "ከዋናው በር አንስቶ እስከ አዳራሹ፣ አስተናጋጆቻችን በመኪና ማቆሚያ፣ በእንግዶች ማረፊያና በመቀመጫ ምርጫ በደስታ ያግዙዎታል።",
    tagEn: "Grace & Warmth",
    tagAm: "ጸጋና ሞቅ ያለ አቀባበል",
  },
  {
    titleEn: "What to Wear",
    titleAm: "የአለባበስ ሁኔታ",
    descEn: "Come exactly as you feel comfortable. Congregants worship in classic Ethiopian white cotton netela, formal suits, or relaxed everyday casual attire.",
    descAm: "እንደተመቸዎ ሆነው ይምጡ! ምዕመናኑ በባህላዊ ነጠላ፣ በሙሉ ልብስ እንዲሁም በመደበኛ ልብስ አምረው ያገኛሉ።",
    tagEn: "Come As You Are",
    tagAm: "እንደመጡ ይሁኑ",
  },
  {
    titleEn: "Children & Nursery",
    titleAm: "ሕፃናትና ቤተሰቦች",
    descEn: "A secure and vibrant Sunday school environment with engaging Bible lessons, crafts, and caring background-verified teachers for ages 2 to 14.",
    descAm: "ደህንነቱ የተጠበቀና ሳቢ የሰንበት ትምህርት ቤት ከደረጃቸው ጋር የሚስማማ የመጽሐፍ ቅዱስ ትምህርትና አፍቃሪ መምህራን ተዘጋጅተዋል።",
    tagEn: "Nursery & Awana",
    tagAm: "የሕፃናትና አዋና ክበብ",
  },
  {
    titleEn: "Languages & Translations",
    titleAm: "የሚነገሩ ቋንቋዎች",
    descEn: "Main preachings are in Amharic with scriptures on screen. Live English translation headsets or translation mentors are gladly provided on request.",
    descAm: "ዋናው ስብከት በአማርኛ ሲሆን የመጽሐፍ ቅዱስ ጥቅሶች በስክሪን ይታያሉ። የእንግሊዝኛ የትርጉም የጆሮ ማዳመጫዎችም ይገኛሉ።",
    tagEn: "Amharic & English",
    tagAm: "አማርኛና እንግሊዝኛ",
  },
];

export function WhatToExpect() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="w-10 h-0.5 bg-accent mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
            {isAm ? "ሲመጡ ምን ይጠብቆታል?" : "What to Expect When You Visit"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
            {isAm
              ? "ወደ አዲስ አዳራሽ መምጣት አያሳስብዎ። የመስተንግዶ ቡድናችን የመጀመሪያ እሑድዎን ሰላማዊና የተባረከ ለማድረግ ዝግጁ ነው።"
              : "Walking into a new sanctuary shouldn't feel intimidating. Here is how our hospitality team makes your first Sunday peaceful, uplifting, and memorable."}
          </p>
        </div>

        {/* Open 4-Column Editorial Layout (Zero generic cards, Zero circle icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-16 border-b border-border/60">
          {EXPECT_ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-2">
                  {isAm ? item.tagAm : item.tagEn}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">
                  {isAm ? item.titleAm : item.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAm ? item.descAm : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Elegant Host Invitation Strip */}
        <div
          id="plan-visit"
          className="mt-16 bg-tint/30 rounded-2xl p-8 sm:p-10 border border-border/60 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
              {isAm ? "የግል አስተናጋጅ ይፈልጋሉ?" : "Would You Like a Personal Host?"}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {isAm
                ? "መምጣትዎን አስቀድመው ያሳውቁን፤ አስተናጋጅ በሩ ላይ ተቀብሎ ቦታ ያዘጋጅልዎታል።"
                : "Let us know you're coming and we'll have a greeter waiting at the gate to welcome you and guide you to comfortable seating."}
            </p>
          </div>
          <Link
            href="#contact-form-section"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-8 shrink-0 font-semibold")}
          >
            {isAm ? "ጉብኝቴን አስቀድሜ ላስመዝግብ" : "Let us know you’re coming"}
          </Link>
        </div>
      </div>
    </section>
  );
}
