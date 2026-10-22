"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from "react";
export interface ScrollRevealProps {
  children: ReactNode; className?: string; delay?: number; duration?: number;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  distance?: number; threshold?: number; rootMargin?: string; style?: CSSProperties; as?: ElementType;
}
export function ScrollReveal({ children, className, delay = 0, duration = 500, variant = "fade-up", distance = 20, threshold = .08, rootMargin = "0px 0px -30px 0px", style, as: Component = "div" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || revealed.current) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || element.getBoundingClientRect().top < innerHeight || !("IntersectionObserver" in window) || typeof element.animate !== "function") { revealed.current = true; return; }
    const original = { opacity: element.style.opacity, transform: element.style.transform };
    const travel = Math.min(Math.max(distance, 0), 24);
    const transform = variant === "fade-up" ? `translateY(${travel}px)` : variant === "fade-down" ? `translateY(-${travel}px)` : variant === "fade-left" ? `translateX(${travel}px)` : variant === "fade-right" ? `translateX(-${travel}px)` : variant === "zoom-in" ? "scale(.98)" : "none";
    let animation: Animation | undefined;
    const restore = () => { element.style.opacity = original.opacity; element.style.transform = original.transform; };
    element.style.opacity = "0"; element.style.transform = transform;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || revealed.current) return;
      revealed.current = true; observer.disconnect();
      animation = element.animate([{ opacity: 0, transform }, { opacity: 1, transform: original.transform || "none" }], { duration: Math.min(Math.max(duration, 0), 650), delay: Math.min(Math.max(delay, 0), 200), easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
      restore();
    }, { threshold, rootMargin });
    const show = () => { revealed.current = true; observer.disconnect(); animation?.cancel(); restore(); };
    const onPreference = () => { if (preference.matches) show(); };
    observer.observe(element); element.addEventListener("focusin", show); preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); animation?.cancel(); restore(); element.removeEventListener("focusin", show); preference.removeEventListener("change", onPreference); };
  }, [delay, duration, variant, distance, threshold, rootMargin]);
  return <Component ref={ref} className={className} style={style}>{children}</Component>;
}
