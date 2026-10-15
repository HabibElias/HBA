"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunityStoryCta() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-40">
      <div className="bg-gradient-to-r from-[#261066] via-[#351887] to-[#4C24B8] rounded-3xl p-10 sm:p-14 md:p-16 text-white relative overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-8 border border-white/20 shadow-xl">
        <div className="hero-ambient-glow" aria-hidden="true" />
        <div className="max-w-2xl relative z-10">
          <span className="font-script text-2xl sm:text-3xl text-purple-200 block mb-1 font-normal">
            {isAm ? "አብረውን ያገልግሉ" : "Serve with us"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
            {isAm
              ? "በሚቀጥሉት መርሐ ግብሮች ላይ ማገልገል ወይም በጎ ፈቃደኛ መሆን ይፈልጋሉ?"
              : "Share your gifts with the church family"}
          </h2>

          <p className="text-white/90 text-sm sm:text-base mt-3 leading-relaxed">
            {isAm
              ? "ለጸሎት፣ ለሕፃናት ማስተማር፣ ለድምፅ ቁጥጥር ወይም ቤተሰቦችን በሰሚት ደጃፍ ለመቀበል የተጠሩ ቢሆኑ፤ ለመንፈሳዊ ስጦታዎ የተዘጋጀ ቦታ አለ።"
              : "Whether you are called to prayer, children’s teaching, hospitality, or sound operations, there is room for your gifts in the church family."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full xl:w-auto shrink-0">
          <Link
            href="/visit#contact"
            className={cn(buttonVariants({ variant: "on-dark" }), "rounded-full text-center font-semibold text-sm px-6 py-2.5")}
          >
            {isAm ? "በበጎ ፈቃድ ይመዝገቡ" : "Volunteer with us"}
          </Link>
          <Link
            href="/visit#contact"
            className={cn(buttonVariants({ variant: "on-dark-outline" }), "rounded-full text-center font-semibold text-sm px-6 py-2.5")}
          >
            {isAm ? "የሁነቶች አስተባባሪዎችን ያነጋግሩ" : "Talk to our team"}
          </Link>
        </div>
      </div>
    </section>
  );
}
