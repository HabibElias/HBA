"use client";

import Image from "next/image";
import { pastoralTeam } from "@/lib/data/leadership";
import { useLanguage } from "@/lib/context/language-context";

export function LeadershipGrid() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="bg-surface py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-10 h-0.5 bg-accent mx-auto mb-4" />
          <span className="text-accent text-xs font-semibold uppercase tracking-wider">
            {isAm ? "በክርስቶስ ስር የሚመራ እረኝነት" : "Shepherding Under Christ"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-2">
            {isAm ? "የመጋቢዎችና የሽማግሌዎች አመራር" : "Pastoral & Shepherding Leadership"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
            {isAm
              ? "የሰሚት ማኅበረሰባችንን በጸሎት፣ በእረኝነት ምክርና በቃሉ ለማገልገል የተሰጡ ታማኝ አገልጋዮች።"
              : "Meet the faithful servants dedicated to prayer, pastoral care, teaching, and walking alongside our Summit community."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pastoralTeam.map((leader) => (
            <div
              key={leader.id}
              className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/40 text-center transition-all duration-300 group flex flex-col items-center shadow-sm hover:shadow-md"
            >
              {/* Rounded portrait with gold accent ring */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-accent p-1 mb-5 shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={isAm && leader.altAm ? leader.altAm : leader.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 112px, 128px"
                  />
                </div>
              </div>

              <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                {isAm ? leader.nameAm : leader.name}
              </h3>
              <span className="text-accent text-xs font-semibold mt-1">
                {isAm ? leader.roleAm : leader.role}
              </span>
              <p className="text-muted-foreground text-xs sm:text-sm mt-3 leading-relaxed">
                {isAm ? leader.bioAm : leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
