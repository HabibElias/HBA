"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Bus, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function VisitCta() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-16 bg-tint/30 border-t border-border" id="visit-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Details Column (6 cols) */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="size-4" />
              <span>{isAm ? "ይምጡና ይጎብኙን • አድራሻችን" : "Visit Us In Summit • አድራሻችን"}</span>
            </div>

            <div className="w-10 h-0.5 bg-accent mb-4" />

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
              {isAm ? "እዚህ ለእርስዎም ስፍራ አለ" : "There Is Room for You Here"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
              {isAm
                ? "በአዲስ አበባ ሰሚት በር 2 አቅራቢያ የሚገኘውን መቅደሳችንን ይጎብኙ። ክፍት በሮች፣ ሞቅ ያለ አቀባበልና መንፈሳዊ ቤተሰብ ይጠብቆታል።"
                : "Whether you are visiting Addis Ababa, moving to the Summit area, or searching for a gospel-centered church family, our doors and hearts are open to you."}
            </p>

            {/* Quick Location & Schedule Cards */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border">
                <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    {isAm ? "የመቅደሱ አድራሻ" : "Sanctuary Address"}
                  </h3>
                  <p className="text-xs text-muted-foreground">Summit Condominium, Near Gate 2, Bole, Addis Ababa</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border">
                <Clock className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    {isAm ? "የእሑድ ዋና አምልኮ" : "Sunday Main Worship"}
                  </h3>
                  <p className="text-xs text-muted-foreground">9:00 AM – 12:00 PM EAT (3:00 – 6:00 ጠዋት የኢትዮጵያ ሰዓት)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border">
                <Bus className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    {isAm ? "ትራንስፖርትና ማቆሚያ" : "Transit & Parking"}
                  </h3>
                  <p className="text-xs text-muted-foreground">Accessible via Summit-Megenagna taxi & bus • Free On-site Parking</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/visit"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "gap-2")}
              >
                <span>{isAm ? "የመጀመሪያ ጉብኝትዎን ያቅዱ" : "Plan Your First Visit"}</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/visit#transit"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
              >
                <span>{isAm ? "አድራሻና አቅጣጫ" : "Directions & Map"}</span>
              </Link>
            </div>
          </div>

          {/* Visual Column (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-surface relative aspect-[16/11]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFhYSUCXMoe_sGni6m9H6Gd7h5AJ4d_nqtjZtLSGEVvOA_at29IvLg8tNJPbdYv2ulMd2e1ksV8i-1F-4mJvRiHm8LYQEGy1IZkeMjPJU5pbcFSxCCCqPoRLG8arC44_gmTug3em9-q-vR7oYk5QYQZT4RVkHpnbqXIIbVjuDahb9JizV5RB3nYSOKpXDeH8LrJWmaWbUkvn4BqEvKMj07rGErPTgwNlE2JRGjeD7ZKqkBQ3BxWU7_xA"
                alt="Map location of Hiwot Birhan Church in Summit Addis Ababa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Pin Overlay Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface p-3 sm:p-4 rounded-2xl shadow-2xl border-2 border-primary flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-primary">Hiwot Birhan Summit</div>
                  <div className="text-[11px] text-muted-foreground">Near Gate 2 Condominium</div>
                </div>
              </div>

              {/* Transportation Tip Card */}
              <div className="absolute bottom-3 left-3 right-3 bg-surface/95 backdrop-blur-md p-3 rounded-xl border border-border text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                  <Bus className="size-4 text-accent shrink-0" />
                  <span className="truncate">Near Summit Gate 2 Condominium stop</span>
                </div>
                <span className="font-bold text-primary shrink-0 hidden sm:inline ml-2">
                  Free Parking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
