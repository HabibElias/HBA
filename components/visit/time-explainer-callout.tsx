"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { timeExplainer } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

export function TimeExplainerCallout() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-tint/70 border border-border rounded-2xl p-5 md:p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
            <Clock className="size-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary">
                {isAm ? timeExplainer.titleAm : timeExplainer.title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-accent/20 text-accent-contrast dark:text-accent font-bold">
                {isAm ? timeExplainer.badgeAm : timeExplainer.badge}
              </span>
            </div>
            <p className="text-sm text-foreground/80 mt-1.5 max-w-3xl leading-relaxed">
              {isAm ? timeExplainer.descriptionAm : timeExplainer.description}
            </p>
          </div>
        </div>

        <Link
          href="#contact-channels"
          className="shrink-0 text-primary font-semibold text-sm hover:underline flex items-center gap-1.5 self-end md:self-center transition-colors"
        >
          <span>{isAm ? "እርዳታ ይፈልጋሉ? ያነጋግሩን" : "Need Help? Contact Us"}</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
