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
          "flex h-11 w-full rounded-xl border border-[#ECEBF8] bg-white px-4 py-2 text-base md:text-sm text-[#14122B] placeholder:text-[#5B5878]/60 transition-all outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-[#3A33A0] focus-visible:ring-2 focus-visible:ring-[#3A33A0]/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 dark:bg-[#1B1763]/50 dark:border-white/10 dark:text-white dark:focus-visible:border-[#8F89EA]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
