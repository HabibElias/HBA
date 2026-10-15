"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds before animating in */
  delay?: number;
  /** Duration of entrance transition in milliseconds */
  duration?: number;
  /** Animation movement variant */
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  /** Movement travel distance in pixels */
  distance?: number;
  /** Intersection threshold (0.0 to 1.0) */
  threshold?: number;
  /** Optional custom rootMargin */
  rootMargin?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 650,
  variant = "fade-up",
  distance = 28,
  threshold = 0.08,
  rootMargin = "0px 0px -30px 0px",
  style,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Bidirectional IntersectionObserver:
    // When element enters viewport (scrolling down OR scrolling up), isIntersecting is TRUE.
    // When element leaves viewport completely, isIntersecting is FALSE, resetting state so it re-animates on return!
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Compute CSS transform based on variant and visibility
  const getTransform = () => {
    if (!isMounted || isVisible) return "none";
    switch (variant) {
      case "fade-up":
        return `translate3d(0, ${distance}px, 0)`;
      case "fade-down":
        return `translate3d(0, -${distance}px, 0)`;
      case "fade-left":
        return `translate3d(${distance}px, 0, 0)`;
      case "fade-right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "zoom-in":
        return `scale(0.96) translate3d(0, ${Math.round(distance * 0.4)}px, 0)`;
      case "fade":
      default:
        return "none";
    }
  };

  const dynamicStyle: CSSProperties = isMounted
    ? {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: isVisible ? `${duration}ms` : "200ms",
        transitionTimingFunction: isVisible ? "cubic-bezier(0.16, 1, 0.3, 1)" : "ease-out",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        willChange: isVisible ? "auto" : "opacity, transform",
        ...style,
      }
    : style || {};

  return (
    <Component ref={ref} className={cn(className)} style={dynamicStyle}>
      {children}
    </Component>
  );
}
