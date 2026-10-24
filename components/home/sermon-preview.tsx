"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLandingContent } from "@/lib/context/landing-context";
import { useContent } from "@/lib/context/content-context";
import { useLanguage } from "@/lib/context/language-context";
import { SermonCard } from "@/components/sermons/sermon-card";

export function SermonPreview() {
  const { homeText } = useLandingContent();
  const { sermons = [] } = useContent();
  const { lang } = useLanguage();
  const isAm = lang === "am";

  const displaySermons = sermons.slice(0, 3);

  return (
    <section className="paint-band py-20 md:py-28" id="sermons">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
              {homeText("home_sermon_preview_1")}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold max-w-2xl text-foreground">
              {homeText("home_sermon_preview_2")}
            </h2>
          </div>
          <Link
            href="/sermons"
            className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-deep transition-colors"
          >
            <span>{isAm ? "ሁሉንም ስብከቶች ይመልከቱ" : "Explore all sermons"}</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {displaySermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displaySermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} preview />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-8">
            {isAm ? "ስብከቶች በቅርቡ ይታተማሉ።" : "Messages will appear here when they are published."}
          </p>
        )}
      </div>
    </section>
  );
}
