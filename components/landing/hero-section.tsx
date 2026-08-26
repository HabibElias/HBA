"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="top">
      <img
        src="/church-hero.png"
        alt="The Hiwot Birhan church family gathered"
        className="hero-image"
        data-reveal="hero"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 data-reveal="hero">{t.hero}</h1>
        <p className="hero-copy" data-reveal="hero">
          {t.heroCopy}
        </p>
        <div className="hero-actions" data-reveal="hero">
          <a className="button button-light" href="#contact">
            {t.firstVisit} <ArrowUpRight size={17} />
          </a>
          <a className="text-link light" href="#sermons">
            <Play size={15} fill="currentColor" /> {t.latest}
          </a>
        </div>
      </div>
      <div className="hero-note">
        {t.sunday} <span>&bull;</span> {t.address}
      </div>
    </section>
  );
}
