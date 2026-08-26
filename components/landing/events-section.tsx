"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function EventsSection() {
  const { t } = useLanguage();

  return (
    <section className="events section-pad" id="events">
      <div className="section-heading" data-reveal>
        <h2>{t.eventsTitle}</h2>
        <a className="text-link" href="#contact">
          {t.allEvents} <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="event-list">
        {t.events.map((event) => (
          <article className="event-row" key={event.title} data-reveal="row">
            <time>{event.date}</time>
            <div>
              <span className="event-type">{event.type}</span>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
            <ArrowUpRight className="row-arrow" />
          </article>
        ))}
      </div>
    </section>
  );
}
