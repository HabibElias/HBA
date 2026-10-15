"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoLockup } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isHome = pathname === "/";

  const navLinks = [
    { href: "/", label: t?.nav?.home ?? "Home" },
    { href: "/about", label: t?.nav?.about ?? "About" },
    { href: "/programs", label: t?.nav?.programs ?? "Programs & Events" },
    { href: "/visit", label: t?.nav?.visit ?? "Visit & Contact" },
  ];

  return (
    <header className={cn("top-0 z-40 w-full", isHome ? "absolute home-header text-white" : "sticky border-b border-border bg-background/95 backdrop-blur-sm")}>
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4", isHome ? "h-24 lg:h-28" : "h-20")}>
        <LogoLockup reversed={isHome} iconOnly={isHome} />

        <nav
          className="hidden lg:flex items-center gap-1.5"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : Boolean(pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isHome
                    ? "text-white hover:bg-white/15"
                    : isActive
                    ? "text-primary bg-tint font-semibold"
                    : "text-foreground/80 hover:text-primary hover:bg-tint/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <Link
            href="/visit#service-times"
            className={cn(
              buttonVariants({ variant: isHome ? "on-dark" : "primary", size: "default" }),
              "hidden sm:inline-flex rounded-full text-sm"
            )}
          >
            {t?.nav?.planVisit ?? "Plan your visit"}
          </Link>
          <MobileNav reversed={isHome} />
        </div>
      </div>
    </header>
  );
}
