"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className, isAm = false }: { className?: string; isAm?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const label = isAm ? "የብርሃን እና የጨለማ ገጽታ ቀይር" : "Toggle light and dark theme";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring", className)}
    >
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
    </button>
  );
}
