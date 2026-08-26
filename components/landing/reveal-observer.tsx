"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("revealed", entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    elements.forEach((el) => {
      el.classList.add("will-reveal");
      if (el.dataset.reveal === "row") {
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children)
          : [];
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el) * 90, 360)}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
