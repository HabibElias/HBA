"use client";

import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { timeExplainer } from "@/lib/data/schedules";
import { useLanguage } from "@/lib/context/language-context";

export function TimeExplainerCallout() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-tint/50 border border-border rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="size-11 rounded-full bg-tint flex items-center justify-center text-primary shrink-0 border border-border">
            <Clock className="size-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground">
                {isAm ? timeExplainer.titleAm : timeExplainer.title}
              </h2>
              <span className="px-3 py-0.5 rounded-full text-xs bg-surface text-primary border border-border font-medium">
                {isAm ? timeExplainer.badgeAm : timeExplainer.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-3xl leading-relaxed">
              {isAm ? timeExplainer.descriptionAm : timeExplainer.description}
            </p>
          </div>
        </div>

        <Link
          href="#contact-channels"
          className="group shrink-0 text-primary font-semibold text-sm hover:text-primary-deep flex items-center gap-1.5 self-end md:self-center transition-colors"
        >
          <span>{isAm ? "እርዳታ ይፈልጋሉ? ያነጋግሩን" : "Need Help? Contact Us"}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
