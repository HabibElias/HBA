"use client";
import { guidingPillars } from "@/lib/data/values";
import { useLanguage } from "@/lib/context/language-context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
export function ValuesPillars() {
  const { lang } = useLanguage(); const isAm = lang === "am";
  return <section id="values" className="paint-band section-space">
    <div className="site-container grid lg:grid-cols-12 gap-10 lg:gap-20">
      <div className="lg:col-span-4">
        <h2 className="section-title">{isAm ? "የምንጋራቸው እሴቶች" : "The commitments\nwe share."}</h2>
        <p className="body-copy mt-5">{isAm ? "አምልኳችን፣ ሕብረታችንና አገልግሎታችን በእነዚህ መጽሐፍ ቅዱሳዊ መርሆዎች ላይ የተመሠረቱ ናቸው።" : "Our faith shapes more than Sunday. These biblical commitments guide how we worship, care for one another, and serve our city."}</p>
      </div>
      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-14">
        {guidingPillars.map((pillar,i)=><ScrollReveal key={pillar.id} delay={i*35}>
          <h3 className="font-display text-xl sm:text-2xl font-semibold leading-snug">{isAm ? pillar.titleAm : pillar.title}</h3>
          <p className="text-sm font-medium text-primary mt-3">{isAm ? pillar.scriptureAm : pillar.scripture}</p>
          <p className="body-copy mt-3">{isAm ? pillar.descriptionAm : pillar.description}</p>
        </ScrollReveal>)}
      </div>
    </div>
  </section>;
}
