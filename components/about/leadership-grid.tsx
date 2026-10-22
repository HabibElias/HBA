"use client";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
export function LeadershipGrid() {
  const { leaders: pastoralTeam } = useContent();
  const { lang } = useLanguage(); const isAm = lang === "am";
  return <section className="section-space bg-surface" id="leadership">
    <div className="site-container">
      <div className="max-w-2xl mb-12">
        <h2 className="section-title">{isAm ? "የመጋቢዎችና የሽማግሌዎች አመራር" : "Meet our pastoral team."}</h2>
        <p className="body-copy mt-5">{isAm ? "በጸሎት፣ በቃሉና በምክር መንፈሳዊ ቤተሰባችንን የሚያገለግሉ።" : "Serving our church family through prayer, teaching, pastoral care, and the everyday work of walking alongside one another."}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
        {pastoralTeam.map(leader=><article key={leader.id} className="flex items-start gap-5 sm:gap-6 min-w-0">
          <div className="size-16 sm:size-20 shrink-0 rounded-full bg-tint text-primary font-display text-2xl font-semibold flex items-center justify-center" aria-hidden="true">{leader.name.split(" ").slice(-2).map(p=>p[0]).join("")}</div>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold">{isAm ? leader.nameAm : leader.name}</h3>
            <p className="text-sm text-primary font-medium mt-1">{isAm ? leader.roleAm : leader.role}</p>
            <p className="body-copy mt-3">{isAm ? leader.bioAm : leader.bio}</p>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
