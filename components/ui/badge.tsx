import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[#3A33A0] text-white",
        primary: "bg-[#3A33A0] text-white",
        secondary: "bg-[#ECEBF8] text-[#3A33A0]",
        outline: "border border-[#ECEBF8] text-[#14122B] bg-transparent",
        gold: "bg-[#C8993A]/15 text-[#C8993A] border border-[#C8993A]/30",
        accent: "bg-[#C8993A]/15 text-[#C8993A] border border-[#C8993A]/30",
        "on-dark": "bg-white/10 text-white border border-white/20",
        destructive: "bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
