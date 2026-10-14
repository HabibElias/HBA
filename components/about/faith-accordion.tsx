"use client";

import { useState } from "react";
import {
  BookOpen,
  ShieldCheck,
  Heart,
  Sparkles,
  Users,
  Sun,
  Flame,
  ChevronDown,
} from "lucide-react";
import { faithStatements } from "@/lib/data/faith";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

const faithIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  scripture: BookOpen,
  "the-trinity": ShieldCheck,
  "jesus-christ": Heart,
  salvation: Sparkles,
  "the-church": Users,
  "christian-living": Flame,
  "hope-of-return": Sun,
};

export function FaithAccordion() {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    scripture: true,
  });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" id="faith">
      <div className="text-center mb-12">
        <div className="w-10 h-0.5 bg-accent mx-auto mb-4" />
        <span className="text-accent-contrast dark:text-accent text-xs font-bold uppercase tracking-wider">
          {isAm ? "የዶክትሪን ንጽሕና" : "Doctrinal Integrity"}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold mt-2">
          {isAm ? "ምን እናምናለን?" : "What We Believe"}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
          {isAm
            ? "በዘመናት ወንጌላዊ እውነትና በታሪካዊ ክርስቲያናዊ ትምህርት ላይ የጸና መሠረታዊ የእምነት መግለጫ።"
            : "Our core confessional theology resting solidly upon timeless evangelical truth and historic Christian orthodoxy."}
        </p>
      </div>

      <div className="space-y-4">
        {faithStatements.map((item) => {
          const isOpen = !!openItems[item.id];
          const Icon = faithIcons[item.id] || BookOpen;
          const scriptures = isAm ? item.scripturesAm : item.scriptures;

          return (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-2xl transition-all duration-200 shadow-sm overflow-hidden"
            >
              <h3 className="m-0 p-0 text-base font-bold">
                <button
                  type="button"
                  id={`faith-header-${item.id}`}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faith-panel-${item.id}`}
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left cursor-pointer select-none hover:bg-tint/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0">
                      <Icon className="size-5" />
                    </span>
                    <span
                      className={cn(
                        "font-display text-base sm:text-lg font-bold text-foreground transition-colors",
                        isOpen && "text-primary"
                      )}
                    >
                      {isAm ? item.titleAm : item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-5 text-muted-foreground transition-transform duration-200 shrink-0",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
              </h3>

              <div
                id={`faith-panel-${item.id}`}
                role="region"
                aria-labelledby={`faith-header-${item.id}`}
                className={cn(
                  "px-5 sm:px-6 pb-6 pt-2 border-t border-border/60 text-muted-foreground text-xs sm:text-sm leading-relaxed pl-14 sm:pl-20 space-y-3",
                  !isOpen && "hidden"
                )}
              >
                <p>{isAm ? item.summaryAm : item.summary}</p>
                {scriptures && scriptures.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {scriptures.map((citation, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tint text-primary border border-primary/10"
                      >
                        {citation}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
