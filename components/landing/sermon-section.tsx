"use client";

import { Play } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function SermonSection() {
  const { t } = useLanguage();

  return (
    <section className="sermon-feature" id="sermons">
      <div className="sermon-copy" data-reveal>
        <h2>{t.sermonTitle}</h2>
        <p>{t.sermonText}</p>
        <a className="button button-light" href="#contact">
          <Play size={16} fill="currentColor" /> {t.watch}
        </a>
      </div>
    </section>
  );
}
