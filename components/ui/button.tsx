import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold whitespace-normal text-center transition-colors outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary:
          "border border-primary text-primary bg-transparent hover:bg-tint/70",
        outline:
          "border border-primary text-primary bg-transparent hover:bg-tint/70",
        "on-dark": "bg-white text-primary-deep hover:bg-white/90 font-semibold shadow-sm",
        "on-dark-outline":
          "border border-white/70 text-white bg-transparent hover:bg-white/10",
        tint: "bg-tint text-primary hover:bg-primary hover:text-white border border-border/80 transition-all font-semibold",
        ghost: "text-foreground bg-transparent hover:bg-tint",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "min-h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "min-h-12 px-8 text-base",
        icon: "h-11 w-11 p-0",
        "icon-sm": "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
