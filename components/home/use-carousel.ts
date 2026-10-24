"use client";
import { useEffect, useState } from 'react';

export function useCarousel(count: number, interval = 6500) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [prepareNeighbors, setPrepareNeighbors] = useState(false);
  useEffect(() => {
    // Let the first visible photograph load before mounting adjacent slides.
    const timer = window.setTimeout(() => setPrepareNeighbors(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const stopped = paused || hovered || focused || reduced;
  useEffect(() => {
    if (stopped || count < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(i => (i + 1) % count);
    }, interval);
    return () => window.clearInterval(timer);
  }, [count, interval, stopped]);
  return {
    shouldLoadImage: (slide: number) => slide === index % count || (prepareNeighbors && (slide === (index + 1) % count || slide === (index - 1 + count) % count)),
    index: count ? index % count : 0, paused: paused || reduced, stopped,
    toggle: () => { setReduced(false); setPaused(!(paused || reduced)); },
    go: (next: number) => { setIndex((next + count) % count); setPaused(true); },
    interaction: {
      onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event: React.FocusEvent<HTMLElement>) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); },
    },
  };
}
