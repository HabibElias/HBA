"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/public-button";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import { SermonCard } from "./sermon-card";

export function SermonsPageContent() {
  const { sermons = [] } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";

  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);

  const searching = !!query.trim();

  const filtered = useMemo(
    () =>
      sermons.filter((sermon) =>
        `${sermon.title} ${sermon.titleAm} ${sermon.speaker} ${sermon.speakerAm} ${sermon.series} ${sermon.seriesAm} ${sermon.scripture} ${sermon.scriptureAm}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
      ),
    [sermons, query],
  );

  return (
    <>
      {/* Subpage Hero */}
      <section className="subpage-hero text-white">
        <div className="site-container pt-36 pb-20 md:pt-44 md:pb-24">
          <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-2 font-normal">
            {isAm ? "የእግዚአብሔር ቃል" : "The Living Word"}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl">
            {isAm ? "ስብከቶችና ትምህርቶች" : "Sermons & Teaching"}
          </h1>
          <p className="mt-6 text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl">
            {isAm
              ? "የእግዚአብሔርን ቃል አብረን እንማር። የተዘጋጁ ስብከቶችን ያንብቡ፣ የድምፅ ቅጂዎችን ያዳምጡና ያውርዱ።"
              : "Grow in faith through the Word. Read comprehensive teaching notes, stream recordings, and download audio messages."}
          </p>
        </div>
      </section>

      <div className="site-container py-16 md:py-24">
        <section aria-labelledby="messages-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
                {isAm ? "የስብከቶች ማህደር" : "Sermon Archive"}
              </span>
              <h2
                id="messages-heading"
                className="font-display text-2xl sm:text-3xl font-semibold text-foreground"
              >
                {searching
                  ? isAm
                    ? "የፍለጋ ውጤቶች"
                    : "Search results"
                  : isAm
                    ? "ተጨማሪ ስብከቶችና ትምህርቶች"
                    : "All messages"}
              </h2>
            </div>

            {/* Search Input using shadcn Input with Icon and Label */}
            <div className="w-full md:max-w-sm">
              <Label htmlFor="sermon-search" className="sr-only">
                {isAm
                  ? "ስብከቶችን ይፈልጉ"
                  : "Search title, speaker, series or scripture"}
              </Label>
              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="sermon-search"
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setLimit(12);
                  }}
                  placeholder={
                    isAm
                      ? "በርእስ፣ በሰባኪ ወይም በክፍል ፈልግ…"
                      : "Title, speaker, series, or scripture…"
                  }
                  className="pl-10 h-11 rounded-4xl bg-surface border-border focus-visible:ring-primary/20 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid — faithfully following CommunityConnect and MinistriesPreview card design */}
          <div aria-live="polite">
            {filtered.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, limit).map((sermon) => (
                  <SermonCard key={sermon.id} sermon={sermon} />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-muted-foreground">
                {searching
                  ? isAm
                    ? "ከፍለጋዎ ጋር የሚዛመድ ስብከት አልተገኘም።"
                    : "No messages match your search. Try a different title or speaker."
                  : sermons.length
                    ? isAm
                      ? "ተጨማሪ ስብከቶች ሲታተሙ እዚህ ይታያሉ።"
                      : "Earlier messages will appear here as more teaching is published."
                    : isAm
                      ? "ስብከቶች በቅርቡ ይታተማሉ።"
                      : "Messages will appear here when they are published."}
              </p>
            )}
          </div>

          {/* Pagination Button */}
          {filtered.length > limit && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                type="button"
                onClick={() => setLimit((value) => value + 12)}
              >
                {isAm ? "ተጨማሪ ስብከቶች አሳይ" : "Show more messages"}
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
