"use client";

import { weeklySchedules, type ScheduleItem } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

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
    <section className="py-16 md:py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16" id="service-times">
      <span id="schedule" className="sr-only" />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border gap-4">
        <div>
          <div className="w-10 h-0.5 bg-accent mb-3" />
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

          return (
            <div
              key={schedule.id}
              className={`rounded-2xl bg-surface border p-6 sm:p-8 flex flex-col justify-between transition-colors ${
                isFeatured ? "border-primary/40" : "border-border/80 hover:border-primary/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {isAm ? schedule.badgeAm ?? schedule.dayAm : schedule.badge ?? schedule.day}
                  </span>
                  {isFeatured && (
                    <span className="text-xs font-semibold text-primary">
                      {isAm ? "ዋና ፕሮግራም" : "Main Gathering"}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                  {isAm ? schedule.titleAm : schedule.title}
                </h3>
                <p className="text-xs text-primary font-medium mt-1">
                  {isAm ? schedule.title : schedule.titleAm}
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {isAm ? schedule.descriptionAm : schedule.description}
                </p>

                {/* Direct Typographic Time Block (No nested card wrap) */}
                <div className="my-6 py-4 border-y border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground font-medium">
                      {isAm ? "ዓለም አቀፍ ሰዓት:" : "Standard Time:"}
                    </span>
                    <span className="font-semibold text-foreground">{schedule.eatTime} (EAT)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-border/40">
                    <span className="text-muted-foreground font-medium">
                      {isAm ? "የኢትዮጵያ ሰዓት:" : "Ethiopian Time:"}
                    </span>
                    <span className="font-semibold text-primary">
                      {schedule.localTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>{featureText}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
