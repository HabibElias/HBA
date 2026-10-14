import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-border bg-surface px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground transition-all outline-none resize-y focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 dark:bg-primary-deep/50 dark:border-white/10 dark:text-white dark:focus-visible:border-primary-soft",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
