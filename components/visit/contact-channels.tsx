"use client";

import { Phone, Mail, Send, Headphones } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function ContactChannels() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section id="contact-channels">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent-contrast dark:text-accent text-xs font-bold border border-border mb-3 shadow-xs">
          <Headphones className="size-3.5" />
          <span>{isAm ? "ያግኙን" : "GET IN TOUCH"}</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold">
          {isAm ? "ሁልጊዜም ከጎንዎ ነን" : "We Are Here For You"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
          {isAm
            ? "ከመምጣትዎ በፊት ጥያቄ ካለዎት፣ የፓስተር ምክር ከፈለጉ ወይም አብረን እንድንጸልይ የሚሹ ከሆነ በሚከተሉት አድራሻዎች ያግኙን።"
            : "Have questions before your visit, need pastoral guidance, or want someone to agree with you in prayer? Reach out through any channel below."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone */}
        <a
          href="tel:+251911234567"
          className="bg-surface p-6 rounded-2xl border border-border hover:border-primary transition-all group block shadow-xs"
        >
          <div className="size-12 rounded-xl bg-tint text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <Phone className="size-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-primary">
            {isAm ? "የቤተክርስቲያን ቢሮና የምክር አገልግሎት" : "Church Office & Pastoral Care"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {isAm ? "ከሰኞ – ቅዳሜ፣ ከጠዋቱ 2:30 – 11:30" : "Available Mon – Sat, 8:30 AM – 5:30 PM"}
          </p>
          <div className="mt-4 space-y-1">
            <p className="text-sm font-bold text-primary group-hover:underline">+251 911 234 567</p>
            <p className="text-xs text-muted-foreground">+251 922 890 123</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:info@hiwotbirhan-summit.org"
          className="bg-surface p-6 rounded-2xl border border-border hover:border-primary transition-all group block shadow-xs"
        >
          <div className="size-12 rounded-xl bg-tint text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <Mail className="size-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-primary">
            {isAm ? "የቀጥታ ኢሜይል መልእክት" : "Direct Email Inquiries"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {isAm ? "አጠቃላይ ጥያቄዎችና መንፈሳዊ ደብዳቤዎች" : "General inquiries and pastoral letters"}
          </p>
          <div className="mt-4">
            <p className="text-sm font-bold text-primary break-all group-hover:underline">
              info@hiwotbirhan-summit.org
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isAm ? "በ24 ሰዓት ውስጥ ምላሽ እንሰጣለን" : "Response within 24 hours"}
            </p>
          </div>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/HiwotBirhanSummit"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface p-6 rounded-2xl border border-border hover:border-primary transition-all group block shadow-xs"
        >
          <div className="size-12 rounded-xl bg-tint text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <Send className="size-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-primary">
            {isAm ? "ይፋዊ የቴሌግራም ቻናል" : "Official Telegram Channel"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {isAm ? "ሳምንታዊ ማስታወቂያዎች፣ ስብከቶችና መረጃዎች" : "Weekly bulletins, audio sermons & updates"}
          </p>
          <div className="mt-4">
            <p className="text-sm font-bold text-primary group-hover:underline">@HiwotBirhanSummit</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isAm ? "ከ3,400 በላይ ንቁ አባላት" : "Over 3,400 active members"}
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
