"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="services section-pad" id="visit">
      <div className="section-heading" data-reveal>
        <h2>{t.sundayTitle}</h2>
        <p>{t.sundayText}</p>
      </div>
      <div className="service-list">
        {t.services.map((service) => (
          <article
            className="service-row"
            key={service.name}
            data-reveal="row"
          >
            <div className="service-time">
              <strong>{service.day}</strong>
              <span>{service.time}</span>
            </div>
            <div>
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
            </div>
            <ArrowUpRight className="row-arrow" />
          </article>
        ))}
      </div>
    </section>
  );
}
