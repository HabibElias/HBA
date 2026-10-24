"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
        className="w-[calc(100%-2rem)] max-w-4xl sm:max-w-4xl rounded-3xl bg-surface border border-border p-6 shadow-2xl gap-4"
        showCloseButton={true}
      >
        <DialogHeader className="pr-10 space-y-1">
          <DialogTitle className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
            {alt || "Photograph"}
          </DialogTitle>
          {caption && caption !== alt && (
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {caption}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="relative max-h-[70vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-tint/30 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={cn(
              "max-h-[66vh] w-auto max-w-full rounded-xl object-contain shadow-xs",
              className
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
