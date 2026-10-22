"use client";

import Link from "next/link";
import { HeartHandshake, MapPin, Calendar } from "lucide-react";
import { buttonVariants } from "@/components/ui/public-button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function AboutVisitCta() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-24 md:py-32" id="visit">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-10 sm:p-14 md:p-16 transition-all duration-200 relative overflow-hidden group">
        {/* Watermark icon — rotated, peeking from bottom-right corner */}
        <HeartHandshake
          className="absolute -bottom-6 -right-6 translate-y-4 translate-x-4 size-48 text-primary opacity-[0.06] rotate-[-15deg] pointer-events-none select-none"
          aria-hidden="true"
          strokeWidth={1}
        />

        <div className="size-14 rounded-2xl bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-primary flex items-center justify-center mx-auto mb-6 transition-all duration-200 relative z-10">
          <HeartHandshake className="size-7" />
        </div>

        <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal relative z-10">
          {isAm ? "እንኳን ደህና መጡ" : "Come and See"}
        </span>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold mb-3 relative z-10">
          {isAm
            ? "በአካል ተገኝተው ይህንን መንፈሳዊ ማኅበረሰብ ይለማመዱ"
            : "Experience this community in person"}
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed relative z-10">
          {isAm
            ? "ስለ ክርስትና እምነት ለማወቅ የሚፈልጉ ወይም በአዲስ አበባ ወንጌላዊ መንፈሳዊ ቤት የሚሹ ከሆኑ፤ በራችን ሁልጊዜ ለሁሉም ክፍት ነው።"
            : "Whether you are exploring Christianity for the first time or searching for a gospel-centered home church in Addis Ababa, our doors are wide open."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            href="/visit"
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "rounded-full px-7 w-full sm:w-auto gap-2 font-semibold"
            )}
          >
            <Calendar className="size-4" />
            <span>{isAm ? "በዚህ እሁድ ይቀላቀሉን" : "Join Us This Sunday"}</span>
          </Link>

          <Link
            href="/visit#transit"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "rounded-full px-7 w-full sm:w-auto gap-2 font-semibold"
            )}
          >
            <MapPin className="size-4 text-primary" />
            <span>{isAm ? "የሰሚት አድራሻና ካርታ" : "Summit Location & Map"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
