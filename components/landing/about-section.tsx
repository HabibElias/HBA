"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="intro section-pad" id="about">
      <div className="intro-grid">
        <h2 data-reveal>{t.introTitle}</h2>
        <div data-reveal="row">
          <p className="lead">{t.intro}</p>
          <a className="text-link" href="#ministries">
            {t.know} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
