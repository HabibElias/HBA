"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { weeklySchedules, type ScheduleItem } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

export function ServiceSummary() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  return (
    <section
      className="-mt-10 relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      id="service-times"
      aria-label="Service Times"
    >
      <div className="bg-surface rounded-2xl border border-border/80 p-6 sm:p-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-5 mb-6 border-b border-border/60 gap-4">
          <div>
            <div className="w-8 h-0.5 bg-accent mb-2" />
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
              {t?.schedule?.title ?? (isAm ? "ሳምንታዊ የአምልኮ ፕሮግራሞች" : "Weekly Gathering Times")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            {isAm
              ? "ዓለም አቀፍ (EAT) እና የኢትዮጵያ ሰዓት አቆጣጠር (ከጠዋቱ / ከሰዓት)"
              : "Showing both Standard International Time (EAT) and Ethiopian local time."}
          </p>
        </div>

        {/* 3 Columns with desktop divider lines instead of nested cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-border/60">
          {weeklySchedules.map((schedule: ScheduleItem, idx: number) => {
            return (
              <div
                key={schedule.id}
                className={`flex flex-col justify-between ${
                  idx === 0 ? "md:pr-8" : idx === 1 ? "md:px-8" : "md:pl-8"
                }`}
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    {isAm ? schedule.badgeAm ?? schedule.dayAm : schedule.badge ?? schedule.day}
                  </span>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {isAm ? schedule.titleAm : schedule.title}
                  </h3>

                </div>

                <div className="pt-4 border-t border-border/40 space-y-1.5">
                  <div className="text-sm font-semibold text-foreground">
                    {schedule.eatTime} <span className="text-xs font-normal text-muted-foreground">(EAT)</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-primary">
                    {isAm ? "የኢትዮጵያ ሰዓት: " : "Ethiopian Time: "}
                    {schedule.localTime}
                  </div>


                  <Link
                    href="/visit#schedule"
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-deep transition-colors pt-3"
                  >
                    <span>{isAm ? "የሙሉ ሳምንት ፕሮግራም" : "Full details"}</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
