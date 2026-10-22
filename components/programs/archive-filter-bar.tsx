"use client";

import { useContent } from "@/lib/context/content-context";
import { FieldSelect } from "@/components/ui/field-select";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export interface ArchiveFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedYear: string;
  onSelectYear: (year: string) => void;
}

const CATEGORIES = [
  { id: "all", labelEn: "All Archives", labelAm: "ሁሉም ማህደሮች" },
  { id: "camp", labelEn: "Youth Camp", labelAm: "የወጣቶች ካምፕ" },
  { id: "conference", labelEn: "Annual Conference", labelAm: "ዓመታዊ ኮንፈረንስ" },
  { id: "awana", labelEn: "Awana Children VBS", labelAm: "የሕፃናት አዋና" },
  { id: "worship", labelEn: "Worship Night", labelAm: "የአምልኮ ምሽት" },
  { id: "outreach", labelEn: "Gospel Outreach", labelAm: "የወንጌል ተልዕኮ" },
] as const;

export function ArchiveFilterBar({
  selectedCategory,
  onSelectCategory,
  selectedYear,
  onSelectYear,
}: ArchiveFilterBarProps) {
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const { recaps } = useContent();
  const YEARS = [
    { id: "all", labelEn: "All years", labelAm: "ሁሉም ዓመታት" },
    ...[...new Set(recaps.map((p) => p.year))]
      .sort((a, b) => b - a)
      .map((year) => ({
        id: String(year),
        labelEn: `${year} G.C.`,
        labelAm: `${year} G.C.`,
      })),
  ];

  return (
    <div className="bg-surface p-4 rounded-2xl border border-border flex flex-col xl:flex-row gap-4 justify-between items-center w-full">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
        <span className="text-xs font-bold text-muted-foreground mr-1 uppercase tracking-wider">
          {isAm ? "አጣራ:" : "Filter:"}
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "px-3.5 min-h-10 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-white"
                  : "bg-tint text-foreground hover:bg-tint/80",
              )}
            >
              {isAm ? cat.labelAm : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Year Dropdown */}
      <div className="flex items-center gap-3 w-full xl:w-auto justify-end pt-2 xl:pt-0">
        <label
          htmlFor="year-select"
          className="text-xs font-semibold text-muted-foreground whitespace-nowrap"
        >
          {isAm ? "ዓመት ምረጥ:" : "Filter Year:"}
        </label>
        <div className="relative">
          <FieldSelect id="year-select" value={selectedYear} onValueChange={onSelectYear} options={YEARS.map((yr) => ({value: yr.id, label: isAm ? yr.labelAm : yr.labelEn}))} />
        </div>
      </div>
    </div>
  );
}
