"use client";

import Link from "next/link";
import { Heart, Users, Sparkles, Baby, Languages, HeartHandshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

const EXPECT_ITEMS = [
  {
    icon: Users,
    titleEn: "Warm Welcome & Greeters",
    titleAm: "ሞቅ ያለ አቀባበልና አስተናጋጆች",
    descEn: "From the sanctuary gate to the entrance lobby, friendly greeters will assist you with parking, guide you to our guest lounge, and comfortably seat you.",
    descAm: "ከዋናው በር አንስቶ እስከ አዳራሹ፣ አስተናጋጆቻችን በመኪና ማቆሚያ፣ በእንግዶች ማረፊያና በመቀመጫ ምርጫ በደስታ ያግዙዎታል።",
    tagEn: "No pressure • Just grace",
    tagAm: "ምንም ጫና የለም • ጸጋ ብቻ",
  },
  {
    icon: Sparkles,
    titleEn: "What to Wear",
    titleAm: "የአለባበስ ሁኔታ",
    descEn: "Come exactly as you feel comfortable! You will see congregants in classic Ethiopian white cotton netela, business suits, and relaxed casual clothing.",
    descAm: "እንደተመቸዎ ሆነው ይምጡ! ምዕመናኑ በባህላዊ ነጠላ፣ በሙሉ ልብስ እንዲሁም በመደበኛ ልብስ አምረው ያገኛሉ።",
    tagEn: "Come as you are",
    tagAm: "እንደመጡ ይሁኑ",
  },
  {
    icon: Baby,
    titleEn: "Children & Families",
    titleAm: "ሕፃናትና ቤተሰቦች",
    descEn: "We provide a clean, secure, and vibrant Sunday school environment with engaging Bible lessons, crafts, and caring background-verified teachers.",
    descAm: "ደህንነቱ የተጠበቀና ሳቢ የሰንበት ትምህርት ቤት ከደረጃቸው ጋር የሚስማማ የመጽሐፍ ቅዱስ ትምህርትና አፍቃሪ መምህራን ተዘጋጅተዋል።",
    tagEn: "Ages 2 to 14 • Nursery available",
    tagAm: "ከ2 እስከ 14 ዓመት • የሕፃናት ክፍል",
  },
  {
    icon: Languages,
    titleEn: "Languages Spoken",
    titleAm: "የሚነገሩ ቋንቋዎች",
    descEn: "Main preachings are in Amharic with scripture displayed on screens. Live English translation headsets or translation mentors are gladly provided on request.",
    descAm: "ዋናው ስብከት በአማርኛ ሲሆን የመጽሐፍ ቅዱስ ጥቅሶች በስክሪን ይታያሉ። የእንግሊዝኛ የትርጉም የጆሮ ማዳመጫዎችም ይገኛሉ።",
    tagEn: "Amharic & English support",
    tagAm: "የአማርኛና የእንግሊዝኛ ድጋፍ",
  },
];

export function WhatToExpect() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-12 md:py-20 bg-tint/25 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent-contrast dark:text-accent text-xs font-bold border border-border mb-3 shadow-xs">
            <Heart className="size-3.5 fill-current" />
            <span>{isAm ? "ለአዲስ እንግዶች መመሪያ" : "FIRST-TIME VISITORS GUIDE"}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold">
            {isAm ? "ሲመጡ ምን ይጠብቆታል?" : "What to Expect When You Visit"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
            {isAm
              ? "ወደ አዲስ አዳራሽ መምጣት አያሳስብዎ። የመስተንግዶ ቡድናችን የመጀመሪያ እሑድዎን ሰላማዊና የተባረከ ለማድረግ ዝግጁ ነው።"
              : "Walking into a new sanctuary shouldn't feel intimidating. Here is how our hospitality team makes your first Sunday peaceful, uplifting, and memorable."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPECT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/50 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="size-12 rounded-xl bg-tint text-primary flex items-center justify-center mb-5">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary">
                    {isAm ? item.titleAm : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                    {isAm ? item.descAm : item.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border text-xs font-bold text-accent-contrast dark:text-accent">
                  {isAm ? item.tagAm : item.tagEn}
                </div>
              </div>
            );
          })}
        </div>

        <div
          id="plan-visit"
          className="mt-12 bg-surface rounded-2xl p-6 md:p-8 border border-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-accent/20 text-accent-contrast dark:text-accent flex items-center justify-center shrink-0">
              <HeartHandshake className="size-6" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-primary">
                {isAm ? "የግል አስተናጋጅ ይፈልጋሉ?" : "Would You Like a Personal Host?"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {isAm
                  ? "መምጣትዎን አስቀድመው ያሳውቁን፤ አስተናጋጅ በሩ ላይ ተቀብሎ ቦታ ያዘጋጅልዎታል።"
                  : "Let us know you're coming and we'll have a host waiting at the gate to show you around and save seats."}
              </p>
            </div>
          </div>
          <Link
            href="#contact-form-section"
            className={cn(buttonVariants({ variant: "default" }), "shrink-0 shadow-sm")}
          >
            {isAm ? "ጉብኝቴን አስቀድሜ ላስመዝግብ" : "Pre-register My Visit"}
          </Link>
        </div>
      </div>
    </section>
  );
}
