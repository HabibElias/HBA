"use client";

import { useLanguage } from "@/lib/context/language-context";
import { upcomingEvents } from "@/lib/data/programs";
import { UpcomingCard } from "./upcoming-card";

export function UpcomingSection() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20"
      id="upcoming"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-accent-contrast dark:text-accent font-bold text-xs uppercase tracking-wider block mb-1">
            {isAm ? "በብርሃን መሰብሰብ" : "GATHERING IN LIGHT"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {isAm ? "መጪ ጉባኤያትና ካምፖች" : "Upcoming Assemblies & Camps"}
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs sm:text-sm text-muted-foreground font-medium px-3.5 py-1 rounded-full bg-tint border border-border">
            {isAm
              ? "የኢትዮጵያ ዘመን አቆጣጠር፡ 2017 ዓ.ም"
              : "Ethiopian Year: 2017 E.C."}
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
