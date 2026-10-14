"use client";

import { Sun, BookOpen, Music, Clock, Info } from "lucide-react";
import { weeklySchedules, type ScheduleItem } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

function getScheduleIcon(iconName: string) {
  switch (iconName) {
    case "Sun":
      return Sun;
    case "BookOpen":
      return BookOpen;
    case "Music":
    default:
      return Music;
  }
}

export function ServiceSummary() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="-mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="service-times">
      <div className="bg-surface rounded-2xl border border-border shadow-xl p-6 sm:p-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-border gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
              <Clock className="size-4" />
              <span>{isAm ? "የፕሮግራሞች ሰዓት" : "Gathering Schedule • የፕሮግራሞች ሰዓት"}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mt-1">
              {t?.schedule?.title ?? "Weekly Service Schedules"}
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-tint text-primary text-xs font-semibold self-start md:self-auto">
            <Info className="size-4 shrink-0" />
            <span>
              {isAm
                ? "ዓለም አቀፍና የኢትዮጵያ ሰዓት አቆጣጠር (ከጠዋቱ / ከሰዓት)"
                : "Showing International & Ethiopian Local Time (ከጠዋቱ / ከሰዓት)"}
            </span>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeklySchedules.map((schedule: ScheduleItem) => {
            const Icon = getScheduleIcon(schedule.iconName);
            return (
              <div
                key={schedule.id}
                className="p-5 rounded-xl bg-tint/40 border border-border hover:border-primary/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                      {isAm ? schedule.badgeAm ?? schedule.dayAm : schedule.badge ?? schedule.day}
                    </span>
                    <Icon className="size-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground">
                    {isAm ? schedule.titleAm : schedule.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {isAm ? schedule.descriptionAm : schedule.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {isAm ? "ዓለም አቀፍ ሰዓት:" : "Standard (EAT):"}
                    </span>
                    <span className="font-semibold text-foreground">{schedule.eatTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-accent font-semibold">
                      {isAm ? "የኢትዮጵያ ሰዓት:" : "Ethiopian Time:"}
                    </span>
                    <span className="font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
                      {schedule.localTime}
                    </span>
                  </div>
                  <div className="pt-2 text-[11px] text-muted-foreground flex items-start gap-1">
                    <span className="text-primary font-medium shrink-0">•</span>
                    <span>{isAm ? schedule.translationNotesAm : schedule.translationNotes}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
