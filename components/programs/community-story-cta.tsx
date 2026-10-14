"use client";

import Link from "next/link";
import { HandHeart } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunityStoryCta() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-primary-deep rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-accent/30 shadow-xl">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold mb-4 border border-accent/30">
            <HandHeart className="size-3.5" />
            <span>{isAm ? "ማገልገልና መገናኘት" : "Serve & Connect"}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            {isAm
              ? "በሚቀጥሉት መርሐ ግብሮች ላይ ማገልገል ወይም በጎ ፈቃደኛ መሆን ይፈልጋሉ?"
              : "Want to Host or Volunteer for an Upcoming Program?"}
          </h2>

          <p className="text-white/80 text-base sm:text-lg mt-3 leading-relaxed">
            {isAm
              ? "ለጸሎት፣ ለሕፃናት ማስተማር፣ ለድምፅ ቁጥጥር ወይም ቤተሰቦችን በሰሚት ደጃፍ ለመቀበል የተጠሩ ቢሆኑ፤ ለመንፈሳዊ ስጦታዎ የተዘጋጀ ቦታ አለ።"
              : "Whether you are called to intercessory prayer, children’s teaching, technical sound operations, or greeting families at the Summit gate, there is a place for your spiritual gift."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto shrink-0">
          <Link
            href="/visit#contact"
            className={cn(buttonVariants({ variant: "on-dark" }), "text-center font-bold text-sm px-6 py-3")}
          >
            {isAm ? "በበጎ ፈቃድ ይመዝገቡ" : "Sign Up to Volunteer"}
          </Link>
          <Link
            href="/visit#contact"
            className={cn(buttonVariants({ variant: "on-dark-outline" }), "text-center text-sm px-6 py-3")}
          >
            {isAm ? "የሁነቶች ኮሚቴን ያነጋግሩ" : "Contact Events Committee"}
          </Link>
        </div>
      </div>
    </section>
  );
}
