"use client";

import { Phone, Mail, Send, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function ContactChannels() {
  const { lang } = useLanguage();
  const isAm = lang === "am";

  return (
    <section id="contact-channels" className="py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-script text-3xl sm:text-4xl text-primary-soft block mb-1 font-normal">
          {isAm ? "እርስዎን ለመስማት ዝግጁ ነን" : "We are here for you"}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold">
          {isAm ? "ሁልጊዜም ከጎንዎ ነን" : "Contact & Fellowship Channels"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
          {isAm
            ? "ከመምጣትዎ በፊት ጥያቄ ካለዎት፣ የፓስተር ምክር ከፈለጉ ወይም አብረን እንድንጸልይ የሚሹ ከሆነ በሚከተሉት አድራሻዎች ያግኙን።"
            : "Ask a question, share a prayer request, or talk with us about your first visit."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone */}
        <a
          href="tel:+251911234567"
          className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-8 sm:p-10 transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[300px] cursor-pointer"
        >
          {/* Watermark icon — rotated, peeking from bottom-right corner */}
          <Phone
            className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
            aria-hidden="true"
            strokeWidth={1}
          />

          <div className="w-full flex flex-col items-center relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary mb-4 transition-all duration-200">
              {isAm ? "ስልክ" : "Phone"}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {isAm ? "የቤተክርስቲያን ቢሮ" : "Church Office"}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {isAm ? "ከሰኞ – ቅዳሜ፣ ከጠዋቱ 2:30 – 11:30" : "Mon – Sat, 8:30 AM – 5:30 PM"}
            </p>
          </div>

          <div className="mt-8 pt-4 w-full relative z-10 flex items-center justify-between">
            <div className="text-left space-y-0.5">
              <p className="text-base font-semibold text-primary">+251 911 234 567</p>
              <p className="text-xs text-muted-foreground">+251 922 890 123</p>
            </div>
            <ArrowUpRight
              className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              strokeWidth={1.75}
            />
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:info@hiwotbirhan-summit.org"
          className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-8 sm:p-10 transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[300px] cursor-pointer"
        >
          {/* Watermark icon — rotated, peeking from bottom-right corner */}
          <Mail
            className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
            aria-hidden="true"
            strokeWidth={1}
          />

          <div className="w-full flex flex-col items-center relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary mb-4 transition-all duration-200">
              {isAm ? "ኢሜይል" : "Email"}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {isAm ? "የቀጥታ ኢሜይል" : "Email Inquiries"}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {isAm ? "አጠቃላይ ጥያቄዎችና መንፈሳዊ ደብዳቤዎች" : "General questions & pastoral care"}
            </p>
          </div>

          <div className="mt-8 pt-4 w-full relative z-10 flex items-center justify-between">
            <div className="text-left space-y-0.5">
              <p className="text-sm sm:text-base font-semibold text-primary break-all">
                info@hiwotbirhan-summit.org
              </p>
              <p className="text-xs text-muted-foreground">
                {isAm ? "በ24 ሰዓት ውስጥ ምላሽ" : "Response within 24 hours"}
              </p>
            </div>
            <ArrowUpRight
              className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              strokeWidth={1.75}
            />
          </div>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/HiwotBirhanSummit"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-tint hover:bg-surface border border-transparent hover:border-primary/20 rounded-3xl p-8 sm:p-10 transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[300px] cursor-pointer"
        >
          {/* Watermark icon — rotated, peeking from bottom-right corner */}
          <Send
            className="absolute -bottom-3 -right-3 translate-y-4 translate-x-4 size-36 sm:size-40 text-primary opacity-[0.08] rotate-[-15deg] pointer-events-none select-none"
            aria-hidden="true"
            strokeWidth={1}
          />

          <div className="w-full flex flex-col items-center relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-surface group-hover:bg-tint border border-primary/10 group-hover:border-primary/20 text-xs font-semibold text-primary mb-4 transition-all duration-200">
              {isAm ? "ቴሌግራም" : "Telegram"}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {isAm ? "ይፋዊ ቴሌግራም" : "Telegram Channel"}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {isAm ? "ሳምንታዊ ማስታወቂያዎችና ስብከቶች" : "Weekly bulletins & messages"}
            </p>
          </div>

          <div className="mt-8 pt-4 w-full relative z-10 flex items-center justify-between">
            <div className="text-left space-y-0.5">
              <p className="text-base font-semibold text-primary">@HiwotBirhanSummit</p>
              <p className="text-xs text-muted-foreground">
                {isAm ? "ይፋዊ ማኅበረሰብ" : "Summit Community Channel"}
              </p>
            </div>
            <ArrowUpRight
              className="size-6 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              strokeWidth={1.75}
            />
          </div>
        </a>
      </div>
    </section>
  );
}
