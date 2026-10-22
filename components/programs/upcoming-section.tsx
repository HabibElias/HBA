"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";
import { useContent } from "@/lib/context/content-context";
import { UpcomingCard } from "./upcoming-card";
export function UpcomingSection() {
  const { events } = useContent(),
    { lang } = useLanguage(),
    isAm = lang === "am";
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("all");
  const categories = [
    ...new Map(
      events.map((e) => [
        e.category,
        { id: e.category, label: isAm ? e.categoryLabelAm : e.categoryLabel },
      ]),
    ).values(),
  ];
  const filtered = events.filter(
    (e) =>
      (category === "all" || e.category === category) &&
      `${e.title} ${e.titleAm} ${e.location} ${e.locationAm}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <section
      className="site-container py-20 md:py-28 scroll-mt-24"
      id="upcoming"
    >
      <span id="events" className="sr-only" />
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
        <div>
          <h2 className="section-title">
            {isAm ? "መጪ ጉባኤያትና ካምፖች" : "Find your next gathering."}
          </h2>
          <p className="body-copy mt-4">
            {isAm
              ? "ከቤተ ክርስቲያን ቤተሰባችን ጋር ለአምልኮ፣ ለትምህርትና ለሕብረት ይቀላቀሉን።"
              : "Worship, learn, and make time for one another."}
          </p>
        </div>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays size={16} />
          {isAm ? "ሰዓቶች በምስራቅ አፍሪካ ሰዓት" : "All times in East Africa Time"}
        </span>
      </div>
      <div className="program-filter-toolbar">
        <label className="program-search">
          <Search size={18} />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAm ? "ስብሰባ ይፈልጉ" : "Search gatherings"}
            aria-label={isAm ? "ስብሰባ ይፈልጉ" : "Search gatherings"}
          />
        </label>
        <div className="program-category-tabs">
          <button
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            {isAm ? "ሁሉም" : "All gatherings"}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground my-6" role="status">
        {isAm
          ? `${filtered.length} መርሐ ግብሮች`
          : `${filtered.length} ${filtered.length === 1 ? "gathering" : "gatherings"}`}
      </p>
      <div className="space-y-7">
        {filtered.map((event) => (
          <UpcomingCard key={event.id} event={event} />
        ))}
      </div>
      {!filtered.length && (
        <div className="py-16 text-center border border-border rounded-3xl bg-surface">
          <h3 className="font-display text-2xl font-semibold">
            {isAm ? "የተገኘ መርሐ ግብር የለም" : "No gatherings found."}
          </h3>
          <p className="text-muted-foreground mt-4">
            {isAm
              ? "ሌላ ፍለጋ ይሞክሩ ወይም ሳምንታዊ ስብሰባዎቻችንን ይመልከቱ።"
              : "Try another search, or join one of our weekly gatherings."}
          </p>
          <div className="flex gap-6 justify-center mt-6">
            <button
              className="font-semibold text-primary"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
            >
              {isAm ? "ፍለጋውን አጽዳ" : "Clear filters"}
            </button>
            <Link
              className="font-semibold text-primary"
              href="/visit#service-times"
            >
              {isAm ? "ሳምንታዊ መርሐ ግብር" : "Weekly schedule"}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
