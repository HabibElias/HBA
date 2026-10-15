"use client";

import { useLanguage } from "@/lib/context/language-context";
import { upcomingEvents } from "@/lib/data/programs";
import { UpcomingCard } from "./upcoming-card";

export function UpcomingSection() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20"
      id="upcoming"
    >
      <span id="events" className="sr-only" />
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-border pb-4">
        <div>
          <div className="w-8 h-0.5 bg-accent mb-2" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            {isAm ? "መጪ ጉባኤያትና ካምፖች" : "Coming together soon"}
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs sm:text-sm text-muted-foreground font-medium px-4 py-1.5 rounded-full bg-tint/60 border border-border">
            {isAm
              ? "የኢትዮጵያ ዘመን አቆጣጠር፡ 2019 ዓ.ም"
              : "Ethiopian Year: 2019 E.C."}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <UpcomingCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
