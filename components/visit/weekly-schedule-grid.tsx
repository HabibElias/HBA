"use client";
import { useState } from "react";
import Image from 'next/image';
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import dynamic from "next/dynamic";
const Lightbox = dynamic(() => import("@/components/ui/lightbox").then(module => module.Lightbox));
import { Images } from "lucide-react";

export function WeeklyScheduleGrid() {
  const { schedules: weeklySchedules } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    caption?: string;
  }>({
    isOpen: false,
    src: "",
    alt: "",
  });

  return (
    <section className="site-container section-space" id="service-times">
      <span id="schedule" className="sr-only" />
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-4">
          <h2 className="section-title">
            {isAm ? "በሳምንቱ\nአብረን እንሰብሰብ።" : "A rhythm\nfor the week."}
          </h2>
          <p className="body-copy mt-5">
            {isAm
              ? "ለአምልኮ፣ ለቃል ጥናት፣ ለጸሎትና ለሕብረት ይቀላቀሉን። የዓለም አቀፍና የኢትዮጵያ ሰዓት አቆጣጠር ተካትቷል።"
              : "Worship, learn, pray, and find fellowship throughout the week. Each gathering shows both EAT and Ethiopian local time."}
          </p>
        </div>
        <div className="lg:col-span-8 space-y-4">
          {weeklySchedules.map((s, i) => (
            <article
              key={s.id}
              className={`schedule-row rounded-3xl p-6 sm:p-8 ${i === 0 ? "bg-primary-deep text-white" : "bg-surface border border-border"}`}
            >
              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold ${i === 0 ? "text-white/80" : "text-primary"}`}
                >
                  {isAm ? s.dayAm : s.day}
                </p>
                <h3 className="font-display text-xl font-semibold mt-2">
                  {isAm ? s.titleAm : s.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mt-3 ${i === 0 ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {isAm ? s.descriptionAm : s.description}
                </p>
              </div>
              <div className="text-sm min-w-0">
                <p className="font-semibold tabular-nums">{s.eatTime}</p>
                <p
                  className={`mt-2 leading-relaxed ${i === 0 ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {isAm ? "የኢትዮጵያ ሰዓት" : "Ethiopian time"}
                  <br />
                  {s.localTime}
                </p>
              </div>

              {s.photos && s.photos.length > 0 && (
                <div className="col-span-full pt-5 border-t border-current/10">
                  <div className="flex items-center gap-2 mb-3 text-xs font-medium opacity-80">
                    <Images size={14} />
                    <span>
                      {isAm
                        ? `የስብሰባው ፎቶዎች (${s.photos.length})`
                        : `Gathering photographs (${s.photos.length})`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {s.photos.map((photo, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() =>
                          setLightbox({
                            isOpen: true,
                            src: photo.src,
                            alt: photo.alt,
                            caption:
                              photo.caption || (isAm ? s.titleAm : s.title),
                          })
                        }
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-black/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                        title={photo.alt || (isAm ? s.titleAm : s.title)}
                        aria-label={`View photo ${pIdx + 1}: ${photo.alt || (isAm ? s.titleAm : s.title)}`}
                      >
                        <Image
                          src={photo.src}
                          fill
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                          alt={photo.alt || (isAm ? s.titleAm : s.title)}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        {photo.isMain && (
                          <span
                            className="absolute top-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs"
                            title={isAm ? "ዋና ፎቶ" : "Main photograph"}
                          >
                            ★
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {lightbox.isOpen && <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        alt={lightbox.alt}
        caption={lightbox.caption}
      />}
    </section>
  );
}
