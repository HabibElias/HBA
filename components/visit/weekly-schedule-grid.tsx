"use client";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
export function WeeklyScheduleGrid() {
  const { schedules: weeklySchedules } = useContent();
  const { lang } = useLanguage(); const isAm = lang === "am";
  return <section className="site-container section-space" id="service-times">
    <span id="schedule" className="sr-only"/>
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-4">
        <h2 className="section-title">{isAm ? "በሳምንቱ\nአብረን እንሰብሰብ።" : "A rhythm\nfor the week."}</h2>
        <p className="body-copy mt-5">{isAm ? "ለአምልኮ፣ ለቃል ጥናት፣ ለጸሎትና ለሕብረት ይቀላቀሉን። የዓለም አቀፍና የኢትዮጵያ ሰዓት አቆጣጠር ተካትቷል።" : "Worship, learn, pray, and find fellowship throughout the week. Each gathering shows both EAT and Ethiopian local time."}</p>
      </div>
      <div className="lg:col-span-8 space-y-4">
        {weeklySchedules.map((s,i)=><article key={s.id} className={`schedule-row rounded-3xl p-6 sm:p-8 ${i===0 ? "bg-primary-deep text-white" : "bg-surface border border-border"}`}>
          <div className="min-w-0">
            <p className={`text-sm font-semibold ${i===0 ? "text-white/80" : "text-primary"}`}>{isAm ? s.dayAm : s.day}</p>
            <h3 className="font-display text-xl font-semibold mt-2">{isAm ? s.titleAm : s.title}</h3>
            <p className={`text-sm leading-relaxed mt-3 ${i===0 ? "text-white/80" : "text-muted-foreground"}`}>{isAm ? s.descriptionAm : s.description}</p>
          </div>
          <div className="text-sm min-w-0">
            <p className="font-semibold tabular-nums">{s.eatTime}</p>
            <p className={`mt-2 leading-relaxed ${i===0 ? "text-white/80" : "text-muted-foreground"}`}>{isAm ? "የኢትዮጵያ ሰዓት" : "Ethiopian time"}<br/>{s.localTime}</p>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
