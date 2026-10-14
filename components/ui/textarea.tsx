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
          "flex min-h-[120px] w-full rounded-xl border border-[#ECEBF8] bg-white px-4 py-3 text-base md:text-sm text-[#14122B] placeholder:text-[#5B5878]/60 transition-all outline-none resize-y focus-visible:border-[#3A33A0] focus-visible:ring-2 focus-visible:ring-[#3A33A0]/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 dark:bg-[#1B1763]/50 dark:border-white/10 dark:text-white dark:focus-visible:border-[#8F89EA]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
