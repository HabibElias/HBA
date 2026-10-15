"use client";

import Link from "next/link";
import { HeartHandshake, MapPin, Calendar } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function AboutVisitCta() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="bg-tint/30 py-20 md:py-24" id="visit">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-surface rounded-2xl p-8 sm:p-12 md:p-16 border border-border">
        <div className="w-12 h-12 rounded-full bg-tint text-primary flex items-center justify-center mx-auto mb-5">
          <HeartHandshake className="size-6" />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold mb-3">
          {isAm
            ? "በአካል ተገኝተው ይህንን መንፈሳዊ ማኅበረሰብ ይለማመዱ"
            : "Experience this community in person"}
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {isAm
            ? "ስለ ክርስትና እምነት ለማወቅ የሚፈልጉ ወይም በአዲስ አበባ ወንጌላዊ መንፈሳዊ ቤት የሚሹ ከሆኑ፤ በራችን ሁልጊዜ ለሁሉም ክፍት ነው።"
            : "Whether you are exploring Christianity for the first time or searching for a gospel-centered home church in Addis Ababa, our doors are wide open."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
