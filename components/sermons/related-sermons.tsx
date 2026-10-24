"use client";
import type { Sermon } from "@/lib/data/sermons";
import { useLanguage } from "@/lib/context/language-context";
import { SermonCard } from "./sermon-card";

export function RelatedSermons({ sermons }: { sermons: Sermon[] }) {
  const { lang } = useLanguage();
  if (!sermons.length) return null;
  return (
    <section
      className="site-container py-16 md:py-20"
      aria-labelledby="related-sermons-heading"
    >
      <h2
        id="related-sermons-heading"
        className="font-display text-2xl sm:text-3xl font-semibold mb-8 text-foreground"
      >
        {lang === "am" ? "ተዛማጅ መልእክቶች" : "Related messages"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sermons.map((sermon) => (
          <SermonCard key={sermon.id} sermon={sermon} />
        ))}
      </div>
    </section>
  );
}
