"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function Lightbox({
  isOpen,
  onClose,
  src,
  alt,
  caption,
  className,
}: LightboxProps) {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogPrimitive.Popup
          aria-label={alt || "Image lightbox"}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 outline-none transition-all duration-200 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 pointer-events-none"
        >
          <div className="relative max-h-[85vh] max-w-5xl w-full flex flex-col items-center justify-center pointer-events-auto">
            <DialogPrimitive.Close
              className="absolute -top-12 right-0 md:top-2 md:right-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
            <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className={cn(
                  "max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl transition-transform",
                  className
                )}
              />
            </div>
            {caption && (
              <p className="mt-4 text-center text-sm md:text-base font-medium text-white/90 bg-black/40 backdrop-blur-xs px-4 py-1.5 rounded-full max-w-2xl">
                {caption}
              </p>
            )}
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
