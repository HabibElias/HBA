"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/90 backdrop-blur-none"
        className="w-[calc(100%-2rem)] max-w-5xl sm:max-w-5xl flex flex-col items-center justify-center bg-transparent text-white p-0 ring-0"
      >
        <DialogTitle className="sr-only">{alt || "Image lightbox"}</DialogTitle>
        <div className="relative max-h-[85vh] max-w-5xl w-full flex flex-col items-center justify-center pointer-events-auto">
          <DialogClose
            className="absolute -top-12 right-0 md:top-2 md:right-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </DialogClose>
          <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className={cn(
                "max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl transition-transform",
                className,
              )}
            />
          </div>
          {caption && (
            <p className="mt-4 text-center text-sm md:text-base font-medium text-white/90 bg-black/40 backdrop-blur-xs px-4 py-1.5 rounded-full max-w-2xl">
              {caption}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
