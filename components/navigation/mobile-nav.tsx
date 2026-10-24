"use client";
import { useContent } from "@/lib/context/content-context";


import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Send } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { LanguageToggle } from "./language-toggle";
import { buttonVariants } from "@/components/ui/public-button";
import { cn } from "@/lib/utils";

export function MobileNav({ reversed = false }: { reversed?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const {settings}=useContent();

  const navLinks = [
    { href: "/", label: t?.nav?.home ?? "Home" },
    { href: "/about", label: t?.nav?.about ?? "About" },
    { href: "/programs", label: t?.nav?.programs ?? "Programs & Events" },
    { href: "/visit", label: t?.nav?.visit ?? "Visit & Contact" },
  ];

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const panel = document.querySelector<HTMLElement>('[aria-label="Mobile navigation"]');
    panel?.querySelector<HTMLElement>('button, a')?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select'));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", trapFocus);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", trapFocus);
      previousFocus?.focus();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="xl:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2",
          reversed
            ? "text-white hover:bg-white/15 focus-visible:ring-white"
            : "text-foreground hover:bg-tint focus-visible:ring-primary"
        )}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="size-6 text-current" />
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-background border-l border-border p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <LanguageToggle className="border-border bg-tint text-foreground hover:bg-tint/80" />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 rounded-full text-muted-foreground hover:bg-tint hover:text-foreground transition-colors"
                  aria-label="Close navigation"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 py-6">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : Boolean(pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "px-4 py-3 rounded-full text-base font-semibold transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-foreground hover:bg-tint hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2">
                <Link
                  href="/visit#service-times"
                  onClick={closeMenu}
                  className={cn(
                    buttonVariants({ variant: "primary" }),
                    "w-full text-center"
                  )}
                >
                  {t?.nav?.planVisit ?? "Plan your visit"}
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex flex-col gap-3 text-xs text-muted-foreground">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="size-4 text-primary" />
                <span>+251 911 234 567</span>
              </a>
              <a
                href="https://t.me/hiwotbirhansummit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Send className="size-4 text-primary" />
                <span>Official Telegram Channel</span>
              </a>
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  );
}
