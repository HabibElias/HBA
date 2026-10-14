import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-11 w-full rounded-xl border border-border bg-surface px-4 py-2 text-base md:text-sm text-foreground placeholder:text-muted-foreground transition-all outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 dark:bg-primary-deep/50 dark:border-white/10 dark:text-white dark:focus-visible:border-primary-soft",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
