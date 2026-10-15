"use client";

import { Church, Flame, Heart } from "lucide-react";
import { weeklySchedules, type ScheduleItem } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

const SCHEDULE_ICONS: Record<string, typeof Church> = {
  "sunday-worship": Church,
  "thursday-prayer": Flame,
  "saturday-youth": Heart,
};

function getScheduleMeta(id: string, isAm: boolean) {
  switch (id) {
    case "sunday-worship":
      return {
        featureText: isAm ? "የሕፃናትና የሰንበት ትምህርት ቤት አገልግሎት አለ" : "Children & nursery ministry available",
        isFeatured: true,
      };
    case "thursday-prayer":
      return {
        featureText: isAm ? "የጠበቀ ሕብረትና የትንንሽ ቡድኖች ጸሎት" : "Intimate fellowship & small group prayer",
        isFeatured: false,
      };
    case "saturday-youth":
    default:
      return {
        featureText: isAm ? "ለወጣቶች፣ ለተማሪዎችና ለመዘምራን ክፍት ነው" : "Youth, university students & choir welcome",
        isFeatured: false,
      };
  }
}

export function WeeklyScheduleGrid() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-28 md:py-36 lg:py-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16" id="service-times">
      <span id="schedule" className="sr-only" />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div>
          <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
            {isAm ? "የአምልኮ ሰዓታት" : "Service Times"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
            {t?.schedule?.title ?? (isAm ? "ሳምንታዊ የአገልግሎት ፕሮግራሞች" : "Weekly Service Schedules")}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
          {t?.schedule?.description ??
            (isAm
              ? "በሰሚት በሚገኘው ዋናው የመሰብሰቢያ አዳራሻችን በሳምንቱ ውስጥ በአምልኮ፣ በቃል ጥናትና በጸሎት አብረውን ያሳልፉ።"
              : "Join us in praise, study, prayer, and intercession throughout the week at our main sanctuary in Summit.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {weeklySchedules.map((schedule: ScheduleItem) => {
          const { featureText, isFeatured } = getScheduleMeta(schedule.id, isAm);

          if (isFeatured) {
            return (
              <div
                key={schedule.id}
                className="rounded-3xl bg-gradient-to-br from-[#261066] via-[#351887] to-[#4C24B8] text-white border border-white/20 p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                <div className="hero-ambient-glow" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
                      {isAm ? schedule.badgeAm ?? schedule.dayAm : schedule.badge ?? schedule.day}
                    </span>
                    <span className="text-xs font-semibold text-accent">
                      {isAm ? "★ ዋና ፕሮግራም" : "★ Main Gathering"}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {isAm ? schedule.titleAm : schedule.title}
                  </h3>
                  <p className="text-xs text-accent font-medium mt-1">
                    {isAm ? schedule.title : schedule.titleAm}
                  </p>
                  <p className="text-sm text-white/85 mt-3 leading-relaxed">
                    {isAm ? schedule.descriptionAm : schedule.description}
                  </p>

                  <div className="my-6 py-4 px-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/70 font-medium">
                        {isAm ? "ዓለም አቀፍ ሰዓት:" : "Standard Time:"}
                      </span>
                      <span className="font-bold text-white">{schedule.eatTime} (EAT)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-t border-white/10">
                      <span className="text-white/70 font-medium">
                        {isAm ? "የኢትዮጵያ ሰዓት:" : "Ethiopian Time:"}
                      </span>
                      <span className="font-bold text-accent">
                        {schedule.localTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-white/80 relative z-10">
                  <span className="size-1.5 rounded-full bg-accent shrink-0" />
                  <span>{featureText}</span>
                </div>
              </div>
            );
          }

          const ScheduleIcon = SCHEDULE_ICONS[schedule.id] ?? Flame;

          return (
            <div
              key={schedule.id}
              className="group relative overflow-hidden rounded-3xl bg-tint hover:bg-surface border border-transparent hover:border-primary/20 p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 min-h-[340px]"
            >
              {/* Watermark icon — rotated, peeking from bottom-right corner */}
              <ScheduleIcon
                className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
                aria-hidden="true"
                strokeWidth={1}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-primary text-xs font-semibold tracking-wide transition-all duration-200">
                    {isAm ? schedule.badgeAm ?? schedule.dayAm : schedule.badge ?? schedule.day}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {isAm ? schedule.titleAm : schedule.title}
                </h3>
                <p className="text-xs text-primary font-medium mt-1">
                  {isAm ? schedule.title : schedule.titleAm}
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {isAm ? schedule.descriptionAm : schedule.description}
                </p>

                <div className="my-6 py-4 px-5 rounded-2xl bg-surface group-hover:bg-tint/60 border border-border/60 group-hover:border-primary/10 space-y-2.5 transition-colors">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground font-medium">
                      {isAm ? "ዓለም አቀፍ ሰዓት:" : "Standard Time:"}
                    </span>
                    <span className="font-semibold text-foreground">{schedule.eatTime} (EAT)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-t border-border/60">
                    <span className="text-muted-foreground font-medium">
                      {isAm ? "የኢትዮጵያ ሰዓት:" : "Ethiopian Time:"}
                    </span>
                    <span className="font-bold text-primary">
                      {schedule.localTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground relative z-10">
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                <span>{featureText}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
