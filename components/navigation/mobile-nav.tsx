"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Send } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { LanguageToggle } from "./language-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t?.nav?.home ?? "Home" },
    { href: "/about", label: t?.nav?.about ?? "About" },
    { href: "/programs", label: t?.nav?.programs ?? "Programs & Events" },
    { href: "/visit", label: t?.nav?.visit ?? "Visit & Contact" },
  ];

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full text-[#14122B] hover:bg-[#ECEBF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A33A0]"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="size-6 text-[#3A33A0]" />
      </button>

      {isOpen && (
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
            className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-[#FAF9F6] border-l border-[#ECEBF8] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#ECEBF8]">
                <LanguageToggle />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 rounded-full text-[#5B5878] hover:bg-[#ECEBF8] hover:text-[#14122B] transition-colors"
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
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "px-4 py-3 rounded-full text-base font-semibold transition-all",
                        isActive
                          ? "bg-[#3A33A0] text-white shadow-xs"
                          : "text-[#14122B] hover:bg-[#ECEBF8] hover:text-[#3A33A0]"
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

            <div className="pt-6 border-t border-[#ECEBF8] flex flex-col gap-3 text-xs text-[#5B5878]">
              <a
                href="tel:+251911234567"
                className="flex items-center gap-2 hover:text-[#3A33A0] transition-colors"
              >
                <Phone className="size-4 text-[#3A33A0]" />
                <span>+251 911 234 567</span>
              </a>
              <a
                href="https://t.me/hiwotbirhansummit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#3A33A0] transition-colors"
              >
                <Send className="size-4 text-[#3A33A0]" />
                <span>Official Telegram Channel</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
