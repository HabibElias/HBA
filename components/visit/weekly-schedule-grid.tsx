"use client";

import { Sun, BookOpen, Music, Users, Baby, Sparkles } from "lucide-react";
import { weeklySchedules, type ScheduleItem } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

function getScheduleMeta(id: string, isAm: boolean) {
  switch (id) {
    case "sunday-worship":
      return {
        icon: Sun,
        featureIcon: Baby,
        featureText: isAm ? "የሕፃናትና የሰንበት ትምህርት ቤት አገልግሎት አለ" : "Children & nursery ministry available",
        isFeatured: true,
      };
    case "thursday-prayer":
      return {
        icon: BookOpen,
        featureIcon: Users,
        featureText: isAm ? "የጠበቀ ሕብረትና የትንንሽ ቡድኖች ጸሎት" : "Intimate fellowship & small group prayer",
        isFeatured: false,
      };
    case "saturday-youth":
    default:
      return {
        icon: Music,
        featureIcon: Sparkles,
        featureText: isAm ? "ለወጣቶች፣ ለተማሪዎችና ለመዘምራን ክፍት ነው" : "Youth, university students & singers welcome",
        isFeatured: false,
      };
  }
}

export function WeeklyScheduleGrid() {
  const { lang, t } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="schedule">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent-contrast dark:text-accent font-bold text-xs uppercase tracking-wider">
            <span className="w-5 h-0.5 bg-accent" />
            <span>{isAm ? "ሳምንታዊ አምልኮና ሕብረት" : "WEEKLY LITURGY & FELLOWSHIP"}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-2">
            {t?.schedule?.title ?? (isAm ? "ሳምንታዊ የአገልግሎት ፕሮግራሞች" : "Weekly Service Schedules")}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
          {t?.schedule?.description ??
            (isAm
              ? "በሰሚት በሚገኘው ዋናው የመሰብሰቢያ አዳራሻችን በሳምንቱ ውስጥ በአምልኮ፣ በቃል ጥናትና በጸሎት አብረውን ያሳልፉ።"
              : "Join us in praise, study, prayer, and intercession throughout the week at our main sanctuary auditorium in Summit.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weeklySchedules.map((schedule: ScheduleItem) => {
          const { icon: MainIcon, featureIcon: FeatureIcon, featureText, isFeatured } = getScheduleMeta(schedule.id, isAm);

          return (
            <div
              key={schedule.id}
              className={`rounded-2xl bg-surface border p-6 flex flex-col justify-between transition-all duration-200 relative group shadow-sm ${
                isFeatured ? "border-primary/40 ring-1 ring-primary/20 hover:border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              {isFeatured && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {isAm ? schedule.badgeAm ?? "ዋና ፕሮግራም" : schedule.badge ?? "Main Service"}
                </div>
              )}

              <div>
                <div className="size-12 rounded-full bg-tint flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MainIcon className="size-6" />
                </div>

                <h3 className="font-display text-xl font-bold text-primary">
                  {isAm ? schedule.titleAm : schedule.title}
                </h3>
                <p className="text-xs text-accent-contrast dark:text-accent font-bold mt-0.5">
                  {isAm ? schedule.title : schedule.titleAm}
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {isAm ? schedule.descriptionAm : schedule.description}
                </p>

                <div className="my-6 p-4 rounded-xl bg-tint/50 border border-border space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-foreground/70 font-medium">
                      {isAm ? "ዓለም አቀፍ ሰዓት:" : "Standard Time:"}
                    </span>
                    <span className="font-bold text-foreground">{schedule.eatTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-border">
                    <span className="text-foreground/70 font-medium">
                      {isAm ? "የኢትዮጵያ ሰዓት:" : "Ethiopian Time:"}
                    </span>
                    <span className="font-bold text-accent-contrast dark:text-accent bg-accent/15 px-2 py-0.5 rounded">
                      {schedule.localTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-foreground/80 pt-2 border-t border-border">
                <FeatureIcon className="size-4 text-accent-contrast dark:text-accent shrink-0" />
                <span>{featureText}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
