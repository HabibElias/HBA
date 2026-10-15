"use client";

import { ChevronDown } from "lucide-react";
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

const YEARS = [
  { id: "all", labelEn: "All Years (2022 - 2025)", labelAm: "ሁሉም ዓመታት (2014 - 2017)" },
  { id: "2025", labelEn: "2025 G.C.", labelAm: "2025 / 2017 ዓ.ም" },
  { id: "2024", labelEn: "2024 Archive", labelAm: "2024 / 2016 ማህደር" },
  { id: "2023", labelEn: "2023 Archive", labelAm: "2023 / 2015 ማህደር" },
  { id: "2022", labelEn: "2022 Archive", labelAm: "2022 / 2014 ማህደር" },
] as const;

export function ArchiveFilterBar({
  selectedCategory,
  onSelectCategory,
  selectedYear,
  onSelectYear,
}: ArchiveFilterBarProps) {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <div className="bg-surface p-4 rounded-2xl border border-border flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
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
                  : "bg-tint text-foreground hover:bg-tint/80"
              )}
            >
              {isAm ? cat.labelAm : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Year Dropdown */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-end pt-2 lg:pt-0">
        <label
          htmlFor="year-select"
          className="text-xs font-semibold text-muted-foreground whitespace-nowrap"
        >
          {isAm ? "ዓመት ምረጥ:" : "Filter Year:"}
        </label>
        <div className="relative">
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => onSelectYear(e.target.value)}
            className="appearance-none bg-tint/60 border border-border text-foreground font-semibold text-xs rounded-full py-1.5 pl-4 pr-9 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {YEARS.map((yr) => (
              <option key={yr.id} value={yr.id}>
                {isAm ? yr.labelAm : yr.labelEn}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-2.5 size-3.5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
