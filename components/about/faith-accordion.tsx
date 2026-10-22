"use client";

import { useState } from "react";
import {
  BookOpen,
  ShieldCheck,
  Heart,
  Cross,
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
  salvation: Cross,
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
    <section className="site-container about-faith section-space" id="faith">
      <div className="text-left">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
          {isAm ? "ምን እናምናለን?" : "What We Believe"}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
          {isAm
            ? "በዘመናት ወንጌላዊ እውነትና በታሪካዊ ክርስቲያናዊ ትምህርት ላይ የጸና መሠረታዊ የእምነት መግለጫ።"
            : "The biblical beliefs that shape our worship, our life together, and our service to others."}
        </p>
      </div>

      <div className="space-y-3.5">
        {faithStatements.map((item) => {
          const isOpen = !!openItems[item.id];
          const Icon = faithIcons[item.id] || BookOpen;
          const scriptures = isAm ? item.scripturesAm : item.scriptures;

          return (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-2xl transition-colors overflow-hidden"
            >
              <h3 className="m-0 p-0 text-base font-semibold">
                <button
                  type="button"
                  id={`faith-header-${item.id}`}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faith-panel-${item.id}`}
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left cursor-pointer select-none hover:bg-tint/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary shrink-0">
                      <Icon className="size-4" />
                    </span>
                    <span
                      className={cn(
                        "font-display text-base sm:text-lg font-semibold text-foreground transition-colors",
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
                  "px-5 sm:px-6 pb-6 pt-3 text-muted-foreground text-sm leading-relaxed pl-14 sm:pl-20 space-y-3",
                  !isOpen && "hidden"
                )}
              >
                <p>{isAm ? item.summaryAm : item.summary}</p>
                {scriptures && scriptures.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {scriptures.map((citation, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tint text-primary"
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
