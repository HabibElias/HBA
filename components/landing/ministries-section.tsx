"use client";

import { useLanguage } from "@/lib/context/language-context";

export function MinistriesSection() {
  const { t } = useLanguage();

  return (
    <section className="ministries section-pad" id="ministries">
      <div className="section-heading" data-reveal>
        <h2>{t.ministriesTitle}</h2>
        <p>{t.ministriesText}</p>
      </div>
      <ul className="ministry-list">
        {t.ministries.map((ministry) => (
          <li className="ministry-row" key={ministry.name} data-reveal="row">
            <h3>{ministry.name}</h3>
            <p>{ministry.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
