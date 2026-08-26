"use client";

import { useLanguage } from "@/lib/context/language-context";

export function QuoteSection() {
  const { t } = useLanguage();

  return (
    <section className="quote-section">
      <blockquote data-reveal="hero">{t.quote}</blockquote>
      <cite data-reveal="row">{t.citation}</cite>
    </section>
  );
}
