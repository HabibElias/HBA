"use client";


import { pastoralTeam } from "@/lib/data/leadership";
import { useLanguage } from "@/lib/context/language-context";

export function LeadershipGrid() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="bg-surface py-16 md:py-24 border-t border-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="w-10 h-0.5 bg-accent mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
            {isAm ? "የመጋቢዎችና የሽማግሌዎች አመራር" : "Meet our pastoral team"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
            {isAm
              ? "የሰሚት ማኅበረሰባችንን በጸሎት፣ በእረኝነት ምክርና በቃሉ ለማገልገል የተሰጡ ታማኝ አገልጋዮች።"
              : "Dedicated servants called to prayer, pastoral care, teaching, and walking alongside our church family."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pastoralTeam.map((leader) => (
            <div
              key={leader.id}
              className="text-center flex flex-col items-center group p-4"
            >
              {/* Circular portrait echoing circular church seal */}
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-primary/20 p-1 mb-5 shrink-0 bg-tint/30">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <span aria-hidden="true" className="flex h-full w-full items-center justify-center bg-tint text-primary font-display text-4xl">
                    {leader.name.split(" ").slice(-2).map((part) => part[0]).join("")}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                {isAm ? leader.nameAm : leader.name}
              </h3>
              <span className="text-primary text-xs font-semibold mt-1">
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
