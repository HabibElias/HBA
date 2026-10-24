"use client";
import { useAboutContent } from "@/lib/context/about-context";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import Image from 'next/image';
export function LeadershipGrid() {
  const { pageText, pageValue } = useAboutContent();
  const { leaders: pastoralTeam } = useContent();
  const { lang } = useLanguage(); const isAm = lang === "am";
  return <section className="section-space bg-surface" id="leadership">
    <div className="site-container">
      <div className="max-w-2xl mb-12">
        <h2 className="section-title">{pageText("about_leadership_grid_1")}</h2>
        <p className="body-copy mt-5">{pageText("about_leadership_grid_2")}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
        {pastoralTeam.map(leader=><article key={leader.id} className="flex items-start gap-5 sm:gap-6 min-w-0">
          {leader.image ? (
            <Image
              src={leader.image}
              width={80}
              height={80}
              sizes="(max-width: 640px) 64px, 80px"
              alt={isAm ? leader.altAm || leader.nameAm : leader.alt || leader.name}
              className="size-16 sm:size-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="size-16 sm:size-20 shrink-0 rounded-full bg-tint text-primary font-display text-2xl font-semibold flex items-center justify-center" aria-hidden="true">{leader.name.split(" ").slice(-2).map(p=>p[0]).join("")}</div>
          )}
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
