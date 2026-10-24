"use client";
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { useCarousel } from './use-carousel';

export function CarouselControls({ carousel, count, label, am = false }: { carousel: ReturnType<typeof useCarousel>; count: number; label: string; am?: boolean }) {
  if(count < 2) return null;
  const button = 'inline-flex size-11 items-center justify-center rounded-full border border-current/25 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4';
  return <div className="flex items-center gap-2" role="group" aria-label={label}>
    <button type="button" className={button} aria-label={am ? 'ያለፈው' : `Previous ${label}`} onClick={() => carousel.go(carousel.index - 1)}><ChevronLeft size={18}/></button>
    <span className="min-w-12 text-center text-xs tabular-nums">{carousel.index + 1} / {count}</span>
    <button type="button" className={button} aria-label={am ? 'ቀጣዩ' : `Next ${label}`} onClick={() => carousel.go(carousel.index + 1)}><ChevronRight size={18}/></button>
    <button type="button" className={button} aria-label={carousel.paused ? (am ? 'ማሽከርከር ጀምር' : `Play ${label}`) : (am ? 'ማሽከርከር አቁም' : `Pause ${label}`)} onClick={carousel.toggle}>{carousel.paused ? <Play size={15}/> : <Pause size={15}/>}</button>
  </div>;
}
