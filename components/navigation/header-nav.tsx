"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LogoLockup } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { cn } from "@/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [headerState, setHeaderState] = useState<"top" | "hidden" | "pinned">("top");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroEl = document.querySelector(".home-hero, .subpage-hero");
      const threshold = heroEl ? (heroEl as HTMLElement).offsetHeight - 100 : 450;

      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (currentScrollY <= 60) {
        setHeaderState("top");
      } else if (currentScrollY >= threshold) {
        setHeaderState("pinned");
      } else if (isScrollingDown) {
        setHeaderState("hidden");
      } else {
        setHeaderState("pinned");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t?.nav?.home ?? "Home" },
    { href: "/about", label: t?.nav?.about ?? "About" },
    { href: "/programs", label: t?.nav?.programs ?? "Programs & Events" },
    { href: "/visit", label: t?.nav?.visit ?? "Visit & Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full text-white transition-all duration-300 ease-out",
        headerState === "top" && "translate-y-0 bg-transparent border-b border-transparent shadow-none",
        headerState === "hidden" && "-translate-y-full bg-[#2A136E]/95 backdrop-blur-xl border-b border-white/15 shadow-lg shadow-purple-950/20",
        headerState === "pinned" && "translate-y-0 bg-[#2A136E]/95 backdrop-blur-xl border-b border-white/15 shadow-lg shadow-purple-950/20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        <LogoLockup reversed iconOnly />

        {/* Desktop Navigation Links — no pill background, active is underlined, hover has animated arrow */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
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
                className="group relative inline-flex items-center gap-1.5 py-2 text-xs xl:text-sm font-medium transition-colors cursor-pointer select-none"
              >
                <span
                  className={cn(
                    "relative transition-colors duration-200",
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/80 group-hover:text-white"
                  )}
                >
                  {link.label}
                  {/* Underline indicator: solid when active, expands on hover */}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-200",
                      isActive
                        ? "bg-white opacity-100 scale-x-100"
                        : "bg-white/70 opacity-0 scale-x-75 group-hover:opacity-100 group-hover:scale-x-100"
                    )}
                  />
                </span>

                {/* Animated Arrow on hover */}
                <ArrowUpRight
                  className="size-3.5 text-white/80 transition-all duration-200 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <LanguageToggle />

          {/* Reverted "Plan your visit" back to solid on-dark pill button */}
          <Link
            href="/visit#service-times"
            className={cn(
              buttonVariants({ variant: "on-dark", size: "default" }),
              "hidden sm:inline-flex rounded-full text-xs xl:text-sm font-semibold px-5 py-2 shrink-0 shadow-md shadow-purple-950/20"
            )}
          >
            {t?.nav?.planVisit ?? "Plan your visit"}
          </Link>

          <MobileNav reversed />
        </div>
      </div>
    </header>
  );
}
