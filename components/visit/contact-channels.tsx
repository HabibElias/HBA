"use client";

import { Phone, Mail, Send } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function ContactChannels() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section id="contact-channels">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-10 h-0.5 bg-accent mx-auto mb-4" />
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
          {isAm ? "ሁልጊዜም ከጎንዎ ነን" : "Let’s talk"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
          {isAm
            ? "ከመምጣትዎ በፊት ጥያቄ ካለዎት፣ የፓስተር ምክር ከፈለጉ ወይም አብረን እንድንጸልይ የሚሹ ከሆነ በሚከተሉት አድራሻዎች ያግኙን።"
            : "Ask a question, share a prayer request, or talk with us about your first visit."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Phone */}
        <a
          href="tel:+251911234567"
          className="bg-tint/30 hover:bg-tint/60 p-8 sm:p-10 rounded-2xl border border-border/60 hover:border-primary/40 transition-all group flex flex-col items-center text-center justify-between"
        >
          <div>
            <div className="size-14 rounded-full bg-surface text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Phone className="size-6" />
            </div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">
              {isAm ? "የቤተክርስቲያን ቢሮ" : "Church Office"}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {isAm ? "ከሰኞ – ቅዳሜ፣ ከጠዋቱ 2:30 – 11:30" : "Mon – Sat, 8:30 AM – 5:30 PM"}
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-border/40 w-full space-y-1">
            <p className="text-base font-semibold text-primary group-hover:underline">+251 911 234 567</p>
            <p className="text-xs text-muted-foreground">+251 922 890 123</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:info@hiwotbirhan-summit.org"
          className="bg-tint/30 hover:bg-tint/60 p-8 sm:p-10 rounded-2xl border border-border/60 hover:border-primary/40 transition-all group flex flex-col items-center text-center justify-between"
        >
          <div>
            <div className="size-14 rounded-full bg-surface text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Mail className="size-6" />
            </div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">
              {isAm ? "የቀጥታ ኢሜይል" : "Email Inquiries"}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {isAm ? "አጠቃላይ ጥያቄዎችና መንፈሳዊ ደብዳቤዎች" : "General questions & pastoral care"}
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-border/40 w-full">
            <p className="text-sm sm:text-base font-semibold text-primary break-all group-hover:underline">
              info@hiwotbirhan-summit.org
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isAm ? "በ24 ሰዓት ውስጥ ምላሽ" : "Response within 24 hours"}
            </p>
          </div>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/HiwotBirhanSummit"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tint/30 hover:bg-tint/60 p-8 sm:p-10 rounded-2xl border border-border/60 hover:border-primary/40 transition-all group flex flex-col items-center text-center justify-between"
        >
          <div>
            <div className="size-14 rounded-full bg-surface text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Send className="size-6" />
            </div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">
              {isAm ? "ይፋዊ ቴሌግራም" : "Telegram Channel"}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {isAm ? "ሳምንታዊ ማስታወቂያዎችና ስብከቶች" : "Weekly bulletins & messages"}
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-border/40 w-full">
            <p className="text-base font-semibold text-primary group-hover:underline">@HiwotBirhanSummit</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isAm ? "ይፋዊ ማኅበረሰብ" : "Summit Community Channel"}
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
