"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { logoSrc, navItems } from "@/lib/content/landing-content";
import { useLanguage } from "@/lib/context/language-context";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <a href="#top" className="brand footer-brand">
            <Image
              src={logoSrc}
              alt="Hiwot Birhan cross and globe logo"
              width={48}
              height={48}
              className="brand-logo"
            />
            <span>
              Hiwot Birhan
              <br />
              <em>Addis Ababa Summit branch</em>
            </span>
          </a>
          <p>{t.footer}</p>
        </div>

        <div className="footer-col">
          <h3>{t.footerTimes}</h3>
          <ul>
            <li>{t.sunday}</li>
            <li>{t.midweekTime}</li>
            <li>
              <a href="#visit">
                {t.visit} <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t.footerExplore}</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{lang === "en" ? item.en : item.am}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t.footerContact}</h3>
          <ul>
            <li>Summit branch, Addis Ababa</li>
            <li>
              <a href="mailto:hello@hiwotbirhan.church">
                hello@hiwotbirhan.church
              </a>
            </li>
            <li>
              <a href="tel:+251911000000">+251 911 000 000</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <small>&copy; 2026 Hiwot Birhan Addis Ababa Summit branch</small>
        <span className="footer-verse">{t.citation}</span>
      </div>
    </footer>
  );
}
