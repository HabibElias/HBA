"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { ContactForm } from "@/components/landing/contact-form";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-intro" data-reveal>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <ul className="contact-details">
          <li>
            <MapPin size={18} />
            <span>
              Summit branch
              <br />
              Addis Ababa, Ethiopia
            </span>
          </li>
          <li>
            <Mail size={18} />
            <a href="mailto:hello@hiwotbirhan.church">
              hello@hiwotbirhan.church
            </a>
          </li>
          <li>
            <Phone size={18} />
            <a href="tel:+251911000000">+251 911 000 000</a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </section>
  );
}
