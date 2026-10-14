import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        primary: "bg-primary text-white",
        secondary: "bg-tint text-primary",
        outline: "border border-border text-foreground bg-transparent",
        gold: "bg-accent/15 text-accent border border-accent/30",
        accent: "bg-accent/15 text-accent border border-accent/30",
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
