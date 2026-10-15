"use client";


import { pastoralTeam } from "@/lib/data/leadership";
import { useLanguage } from "@/lib/context/language-context";

export function LeadershipGrid() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="bg-surface py-28 md:py-36 lg:py-40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
            {isAm ? "የእረኝነት አመራር" : "Pastoral Leadership"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
            {isAm ? "የመጋቢዎችና የሽማግሌዎች አመራር" : "Meet our pastoral team"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
            {isAm
              ? "የሰሚት ማኅበረሰባችንን በጸሎት፣ በእረኝነት ምክርና በቃሉ ለማገልገል የተሰጡ ታማኝ አገልጋዮች።"
              : "Dedicated servants called to prayer, pastoral care, teaching, and walking alongside our church family."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastoralTeam.map((leader) => (
            <div
              key={leader.id}
              className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-7 sm:p-8 text-center flex flex-col items-center transition-all duration-200"
            >
              {/* Circular portrait echoing circular church seal */}
              <div className="size-32 rounded-full border-2 border-primary/25 p-1 mb-5 shrink-0 bg-surface group-hover:bg-tint/60 transition-all duration-200">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-tint flex items-center justify-center">
                  <span aria-hidden="true" className="text-primary font-display font-bold text-3xl">
                    {leader.name.split(" ").slice(-2).map((part) => part[0]).join("")}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {isAm ? leader.nameAm : leader.name}
              </h3>
              <span className="inline-block px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-primary text-xs font-semibold mt-2 transition-all duration-200">
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
