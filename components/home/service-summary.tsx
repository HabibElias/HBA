"use client";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Church, BookOpen, Flame, Heart } from 'lucide-react';
import { useContent } from '@/lib/context/content-context';
import { useLanguage } from '@/lib/context/language-context';
import { useCarousel } from './use-carousel';
import { CarouselControls } from './carousel-controls';

const symbols = [Church, BookOpen, Flame, Heart];
export function ServiceSummary() {
  const { schedules } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === 'am';
  const carousel = useCarousel(schedules.length, 7500);
  if (!schedules.length) return null;
  return <section id="service-times" aria-label={isAm ? 'የሳምንቱ መርሃ ግብር' : 'Weekly schedule'} aria-roledescription="carousel" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 lg:-mt-28 relative z-20" {...carousel.interaction}>
    <div className="relative grid rounded-3xl overflow-hidden bg-tint">
      {schedules.map((card, index) => {
        const Icon = symbols[index % symbols.length];
        const photo = card.photos?.find(p => p.isMain) ?? card.photos?.[0];
        const active = index === carousel.index;
        return <article key={card.id} inert={!active} aria-hidden={!active} aria-roledescription="slide" aria-label={`${index + 1} / ${schedules.length}`} className={`col-start-1 row-start-1 relative flex flex-col justify-between p-7 sm:p-8 md:p-12 min-h-[330px] transition-opacity duration-700 motion-reduce:transition-none ${active ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'} ${photo ? 'text-white' : 'text-foreground'}`}>
          {photo && <>{carousel.shouldLoadImage(index) && <Image src={photo.src} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover"/>}<div className="absolute inset-0 bg-gradient-to-r from-primary-soft/90 via-primary-soft/55 to-transparent"/></>}
          <Icon className={`absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 rotate-[-15deg] pointer-events-none ${photo ? 'text-white/15' : 'text-primary opacity-[0.08]'}`} aria-hidden="true" strokeWidth={1}/>
          <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
            <span className="self-start px-3 py-1 rounded-full bg-surface border border-primary/10 text-primary text-[11px] font-semibold tracking-wide">{isAm ? card.dayAm : card.day}</span>
            <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug">{isAm ? card.titleAm : card.title}</h2>
            <p className={`text-sm leading-relaxed ${photo ? 'text-white/90' : 'text-muted-foreground'}`}>{isAm ? card.descriptionAm : card.description}</p>
            {card.localTime && <p className={`text-xs font-semibold mt-1 ${photo ? 'text-white' : 'text-primary/80'}`}>{card.localTime}</p>}
          </div>
          <div className="relative z-10 pt-8 pb-16 sm:pb-0 sm:pr-60 flex flex-wrap items-center justify-between gap-6">
            <Link href="/visit#service-times" className={`group flex items-center justify-between gap-10 min-h-11 text-xs font-semibold ${photo ? 'text-white' : 'text-primary'}`}><span>{isAm ? 'ተጨማሪ ዝርዝር' : 'Learn more'}</span><ArrowUpRight className="size-6" strokeWidth={1.75}/></Link>
          </div>
        </article>;
      })}
      <div className={`absolute bottom-7 right-7 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-20 ${schedules[carousel.index].photos?.length ? 'text-white' : 'text-primary'}`}><CarouselControls carousel={carousel} count={schedules.length} label="gathering" am={isAm}/></div>
    </div>
  </section>;
}
