import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold whitespace-nowrap transition-all outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#3A33A0] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 gap-2",
  {
    variants: {
      variant: {
        default: "bg-[#3A33A0] text-white hover:bg-[#2F2985] shadow-sm",
        primary: "bg-[#3A33A0] text-white hover:bg-[#2F2985] shadow-sm",
        secondary:
          "border border-[#3A33A0] text-[#3A33A0] bg-transparent hover:bg-[#ECEBF8]",
        outline:
          "border border-[#3A33A0] text-[#3A33A0] bg-transparent hover:bg-[#ECEBF8]",
        "on-dark": "bg-white text-[#3A33A0] hover:bg-neutral-100 shadow-md",
        "on-dark-outline":
          "border border-white/70 text-white bg-transparent hover:bg-white/10",
        ghost: "text-[#14122B] bg-transparent hover:bg-[#ECEBF8]",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        link: "text-[#3A33A0] underline-offset-4 hover:underline p-0 h-auto active:scale-100",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

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
