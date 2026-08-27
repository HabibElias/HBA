"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { logoSrc, navItems } from "@/lib/content/landing-content";
import { useLanguage } from "@/lib/context/language-context";

export function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <a href="#top" className="brand" aria-label="Hiwot Birhan home">
        <Image
          src={logoSrc}
          alt="Hiwot Birhan cross and globe logo"
          width={48}
          height={48}
          priority
          className="brand-logo"
        />
        <span>
          Hiwot Birhan
          <br />
          <em>Addis Ababa Summit branch</em>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {lang === "en" ? item.en : item.am}
          </a>
        ))}
      </nav>

      <div className="header-tools">
        <button
          className="language-toggle"
          type="button"
          aria-label="Change language"
          onClick={toggleLang}
        >
          {lang === "en" ? "አማ" : "EN"}
        </button>
        <a className="header-cta" href="#contact">
          {t.visit} <ArrowUpRight size={16} />
        </a>
      </div>

      <button
        className="menu-button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          <button
            className="language-toggle"
            type="button"
            onClick={toggleLang}
          >
            {lang === "en" ? "አማርኛ" : "English"}
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {lang === "en" ? item.en : item.am}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            {t.visit} <ArrowUpRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}
