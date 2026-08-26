"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const logoSrc = "/logo.png";
const navItems = [
  { href: "#visit", en: "Visit", am: "ጎብኙ" },
  { href: "#about", en: "About", am: "ስለ እኛ" },
  { href: "#ministries", en: "Ministries", am: "አገልግሎቶች" },
  { href: "#events", en: "Events", am: "ዝግጅቶች" },
  { href: "#sermons", en: "Sermons", am: "ስብከቶች" },
];
const copy = {
  en: {
    visit: "Plan your visit",
    hero: (
      <>
        Come and worship
        <br />
        <i>with us.</i>
      </>
    ),
    heroCopy:
      "At Hiwot Birhan, we gather to worship God, hear His Word, and grow together in faith. You are warmly welcome in His presence.",
    firstVisit: "Plan your first visit",
    latest: "Watch latest message",
    sunday: "Sundays at 9 & 11 AM",
    address: "Addis Ababa, Ethiopia",
    introTitle: (
      <>
        A family gathered
        <br />
        around <i>God&apos;s Word.</i>
      </>
    ),
    intro:
      "We believe faith is lived together. Hiwot Birhan is a family of believers learning to love God, love our neighbors, and serve our city in the name of Christ.",
    know: "Get to know us",
    sundayTitle: (
      <>
        Join us
        <br />
        <i>for worship.</i>
      </>
    ),
    sundayText:
      "Every gathering is centered on the same hope: God\u2019s Word read, preached, and sung by His people. Pick a time that works for you.",
    sermonTitle: (
      <>
        Hope that
        <br />
        <i>does not</i> disappoint.
      </>
    ),
    sermonText:
      "A message from our latest Sunday gathering on the hope we have in Christ \u2014 a hope that will never put us to shame.",
    watch: "Watch message",
    comingLabel: "What\u2019s coming up",
    eventsTitle: (
      <>
        Faith lived
        <br />
        <i>together.</i>
      </>
    ),
    allEvents: "View all events",
    ministriesTitle: (
      <>
        Serving
        <br />
        <i>together.</i>
      </>
    ),
    ministriesText:
      "Every member has a part in the body of Christ. Find your place to serve and grow alongside us.",
    quote:
      "\u201cI was glad when they said to me, \u2018Let us go into the house of the LORD.\u2019\u201d",
    citation: "Psalm 122:1",
    contactTitle: (
      <>
        Questions?
        <br />
        <i>We&apos;re here.</i>
      </>
    ),
    contactText:
      "Whether it\u2019s your first Sunday or your hundredth, we\u2019d love to hear from you.",
    name: "Your name",
    namePlaceholder: "How should we call you?",
    email: "Email address",
    message: "How can we help?",
    messagePlaceholder: "Tell us a little more...",
    time: "Preferred visit time",
    chooseTime: "Choose a time",
    send: "Send a message",
    sent: "Message sent",
    sentTitle: "Thank you.",
    sentText:
      "Your message is on its way \u2014 we\u2019ll get back to you soon.",
    sendAnother: "Send another message",
    footer: "Proclaiming the light of life in Addis Ababa.",
    footerTimes: "Worship with us",
    footerExplore: "Explore",
    footerContact: "Contact",
    midweekTime: "Wednesdays 6:30 PM",
    selectMorning: "Sunday morning",
    selectMidweek: "Wednesday evening",
    selectAny: "Any time",
    services: [
      {
        day: "Sunday",
        time: "9:00 AM",
        name: "Classic Service",
        detail: "Traditional worship with choir and communion.",
      },
      {
        day: "Sunday",
        time: "11:00 AM",
        name: "Modern Service",
        detail: "Contemporary worship and a message from God\u2019s Word.",
      },
      {
        day: "Wednesday",
        time: "6:30 PM",
        name: "Midweek Gathering",
        detail: "Prayer, Bible study, and fellowship for all ages.",
      },
    ],
    ministries: [
      {
        name: "Worship & Choir",
        detail: "Leading the congregation in song every Sunday.",
      },
      {
        name: "Children",
        detail: "Sunday school where children learn God\u2019s Word with joy.",
      },
      {
        name: "Youth",
        detail: "Young people growing in faith, friendship, and service.",
      },
      {
        name: "Prayer & Care",
        detail: "Praying for one another and meeting practical needs.",
      },
    ],
    events: [
      {
        date: "SEP 14",
        title: "Fall Community Picnic",
        detail: "Food, music, games, and neighbors. Everyone is welcome.",
        type: "Community",
      },
      {
        date: "SEP 21",
        title: "Rooted: A 6-week study",
        detail: "A practical study for growing deeper in faith together.",
        type: "Groups",
      },
      {
        date: "OCT 05",
        title: "Serve Day",
        detail: "A Saturday of practical care across our city.",
        type: "Outreach",
      },
    ],
  },
  am: {
    visit: "ጉብኝትዎን ያቅዱ",
    hero: (
      <>
        ኑና አብረን
        <br />
        <i>እናምልክ።</i>
      </>
    ),
    heroCopy:
      "በሕይወት ብርሃን እግዚአብሔርን ለማምለክ፣ ቃሉን ለመስማት እና በእምነት አብረን ለማደግ እንሰበሰባለን። በእግዚአብሔር ፊት በፍቅር እንቀበልዎታለን።",
    firstVisit: "የመጀመሪያ ጉብኝትዎን ያቅዱ",
    latest: "የቅርብ ጊዜ መልዕክትን ይመልከቱ",
    sunday: "እሁድ 9 እና 11 ሰዓት",
    address: "አዲስ አበባ፣ ኢትዮጵያ",
    introTitle: (
      <>
        በእግዚአብሔር ቃል
        <br />
        <i>ዙሪያ የተሰበሰበ</i>
        <br />
        ቤተሰብ።
      </>
    ),
    intro:
      "እምነት በአንድነት ሲኖር የተሻለ ነው ብለን እናምናለን። ሕይወት ብርሃን እግዚአብሔርንና ባልንጀሮቻችንን መውደድ የምንማርበት የአማኞች ቤተሰብ ነው።",
    know: "ስለ እኛ ይወቁ",
    sundayTitle: (
      <>
        ለአምልኮ
        <br />
        <i>ይቀላቀሉን።</i>
      </>
    ),
    sundayText:
      "እያንዳንዱ ስብሰባ በአንድ ተስፋ ላይ ያተኩራል፦ የእግዚአብሔር ቃል መነበብ፣ መሰብከል እና መዘመር።",
    sermonTitle: (
      <>
        የማያአዝድ
        <br />
        <i>ተስፋ።</i>
      </>
    ),
    sermonText: "ክርስቶስ በእኛ ውስጥ ያለውን ተስፋ የሚያስረዳ ከቅርብ እሁድ ስብሰባችን መልዕክት።",
    watch: "መልዕክቱን ይመልከቱ",
    comingLabel: "መጪ ዝግጅቶች",
    eventsTitle: (
      <>
        በአብሮነት
        <br />
        <i>የሚኖር እምነት።</i>
      </>
    ),
    allEvents: "ሁሉንም ዝግጅቶች ይመልከቱ",
    ministriesTitle: (
      <>
        አብረን
        <br />
        <i>እናገለግላለን።</i>
      </>
    ),
    ministriesText:
      "እያንዳንዱ አባል በክርስቶስ አካል ውስጥ የራሱ ድርሻ አለው። የእርስዎን የአገልግሎት ቦታ ያግኙ።",
    quote: "\u201cወደ እግዚአብሔር ቤት እንሂድ ባሉኝ ጊዜ ደስ አለኝ።\u201d",
    citation: "መዝሙር ፻፳፥፩",
    contactTitle: (
      <>
        ጥያቄ አለዎት?
        <br />
        <i>እዚህ ነን።</i>
      </>
    ),
    contactText: "የመጀመሪያ ጉብኝትዎ ይሁን መቶኛው፣ ከእርስዎ መስማት እንወዳለን።",
    name: "ስምዎ",
    namePlaceholder: "እንዴት እንጠራዎት?",
    email: "የኢሜይል አድራሻ",
    message: "እንዴት ልንረዳዎት?",
    messagePlaceholder: "ትንሽ ተጨማሪ ይንገሩን...",
    time: "የጉብኝት ጊዜ",
    chooseTime: "ጊዜ ይምረጡ",
    send: "መልዕክት ይላኩ",
    sent: "መልዕክት ተልኳል",
    sentTitle: "እናመሰግናለን።",
    sentText: "መልእክትዎ ደርሶናል \u2014 በቅርቡ እንመልሳለን።",
    sendAnother: "ሌላ መልዕክት ይላኩ",
    footer: "የሕይወት ብርሃንን በአዲስ አበባ እናስተላልፋለን።",
    footerTimes: "አብረን እናምልክ",
    footerExplore: "ያስሱ",
    footerContact: "ያግኙን",
    midweekTime: "ረቡዕ 6:30 ሰዓት",
    selectMorning: "እሁድ ጠዋት",
    selectMidweek: "ረቡዕ ማታ",
    selectAny: "ማንኛውም ጊዜ",
    services: [
      {
        day: "እሁድ",
        time: "9:00 AM",
        name: "ባህላዊ አምልኮ",
        detail: "በመዘምራን እና በቁርባን የታጀበ አምልኮ።",
      },
      {
        day: "እሁድ",
        time: "11:00 AM",
        name: "ዘመናዊ አምልኮ",
        detail: "ዘመናዊ አምልኮ እና ከእግዚአብሔር ቃል መልዕክት።",
      },
      {
        day: "ረቡዕ",
        time: "6:30 PM",
        name: "የሳምንት አጋማሽ ስብሰባ",
        detail: "ጸሎት፣ የቃል ጥናት እና ለሁሉም ዕድሜ ማኅበረሰብ።",
      },
    ],
    ministries: [
      { name: "ዜማና አምልኮ", detail: "በየእሁዱ ሕዝቡን በዜማ መሪ ሆኖ ማምለክ።" },
      {
        name: "የሕፃናት አገልግሎት",
        detail: "ሕፃናት የእግዚአብሔርን ቃል በደስታ የሚማሩበት የእሁድ ትምህርት ቤት።",
      },
      { name: "ወጣቶች", detail: "ወጣቶች በእምነትና በአብሮነት የሚያድጉበት ስብሰባ።" },
      {
        name: "ጸሎትና እንክብካቤ",
        detail: "ለእርስ በርስ የማመልከት እና የተግባር ፍላጎቶችን የማገልገል።",
      },
    ],
    events: [
      {
        date: "ሴፕ 14",
        title: "የማኅበረሰብ ሽርሽር",
        detail: "ምግብ፣ ሙዚቃ፣ ጨዋታዎች እና ጎረቤቶች። ሁሉም በደህና መጡ።",
        type: "ማኅበረሰብ",
      },
      {
        date: "ሴፕ 21",
        title: "ሥር የ6 ሳምንት ጥናት",
        detail: "በእምነት አብረን እንድናድግ የሚረዳ ግብረ ጥናት።",
        type: "መደቦች",
      },
      {
        date: "ኦክቶ 05",
        title: "የአገልግሎት ቀን",
        detail: "በከተማችን ዙሪያ የተግባር እንክብካቤ የሚደረግበት ቅዳሜ።",
        type: "አገልግሎት",
      },
    ],
  },
} as const;

export function ChurchHome() {
  const [lang, setLang] = useState<"en" | "am">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const saved = window.localStorage.getItem("hiwot-language");
    if (saved === "am") setLang("am");
  }, []);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("revealed", entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.classList.add("will-reveal");
      if (el.dataset.reveal === "row") {
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children)
          : [];
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el) * 90, 360)}ms`;
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const changeLanguage = (next: "en" | "am") => {
    setLang(next);
    window.localStorage.setItem("hiwot-language", next);
    document.documentElement.lang = next === "am" ? "am" : "en";
  };
  const t = copy[lang];

  return (
    <main className="site-shell">
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <a href="#top" className="brand" aria-label="Hiwot Birhan home">
          <img
            src={logoSrc}
            alt="Hiwot Birhan cross and globe logo"
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
              {t === copy.en ? item.en : item.am}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button
            className="language-toggle"
            type="button"
            aria-label="Change language"
            onClick={() => changeLanguage(lang === "en" ? "am" : "en")}
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
              onClick={() => changeLanguage(lang === "en" ? "am" : "en")}
            >
              {lang === "en" ? "አማርኛ" : "English"}
            </button>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {t === copy.en ? item.en : item.am}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {t.visit} <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>
      <section className="hero" id="top">
        <img
          src="/church-hero.png"
          alt="The Hiwot Birhan church family gathered"
          className="hero-image"
          data-reveal="hero"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 data-reveal="hero">{t.hero}</h1>
          <p className="hero-copy" data-reveal="hero">
            {t.heroCopy}
          </p>
          <div className="hero-actions" data-reveal="hero">
            <a className="button button-light" href="#contact">
              {t.firstVisit} <ArrowUpRight size={17} />
            </a>
            <a className="text-link light" href="#sermons">
              <Play size={15} fill="currentColor" /> {t.latest}
            </a>
          </div>
        </div>
        <div className="hero-note">
          {t.sunday} <span>&bull;</span> {t.address}
        </div>
      </section>
      <section className="intro section-pad" id="about">
        <div className="intro-grid">
          <h2 data-reveal>{t.introTitle}</h2>
          <div data-reveal="row">
            <p className="lead">{t.intro}</p>
            <a className="text-link" href="#ministries">
              {t.know} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="services section-pad" id="visit">
        <div className="section-heading" data-reveal>
          <h2>{t.sundayTitle}</h2>
          <p>{t.sundayText}</p>
        </div>
        <div className="service-list">
          {t.services.map((service) => (
            <article
              className="service-row"
              key={service.name}
              data-reveal="row"
            >
              <div className="service-time">
                <strong>{service.day}</strong>
                <span>{service.time}</span>
              </div>
              <div>
                <h3>{service.name}</h3>
                <p>{service.detail}</p>
              </div>
              <ArrowUpRight className="row-arrow" />
            </article>
          ))}
        </div>
      </section>
      <section className="ministries section-pad" id="ministries">
        <div className="section-heading" data-reveal>
          <h2>{t.ministriesTitle}</h2>
          <p>{t.ministriesText}</p>
        </div>
        <ul className="ministry-list">
          {t.ministries.map((ministry) => (
            <li className="ministry-row" key={ministry.name} data-reveal="row">
              <h3>{ministry.name}</h3>
              <p>{ministry.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="sermon-feature" id="sermons">
        <div className="sermon-copy" data-reveal>
          <h2>{t.sermonTitle}</h2>
          <p>{t.sermonText}</p>
          <a className="button button-light" href="#contact">
            <Play size={16} fill="currentColor" /> {t.watch}
          </a>
        </div>
      </section>
      <section className="events section-pad" id="events">
        <div className="section-heading" data-reveal>
          <h2>{t.eventsTitle}</h2>
          <a className="text-link" href="#contact">
            {t.allEvents} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="event-list">
          {t.events.map((event) => (
            <article className="event-row" key={event.title} data-reveal="row">
              <time>{event.date}</time>
              <div>
                <span className="event-type">{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.detail}</p>
              </div>
              <ArrowUpRight className="row-arrow" />
            </article>
          ))}
        </div>
      </section>
      <section className="quote-section">
        <blockquote data-reveal="hero">{t.quote}</blockquote>
        <cite data-reveal="row">{t.citation}</cite>
      </section>
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
        {submitted ? (
          <div className="form-success" role="status" data-reveal>
            <span className="success-badge">
              <Check size={22} strokeWidth={2.5} />
            </span>
            <h3>{t.sentTitle}</h3>
            <p>{t.sentText}</p>
            <button
              type="button"
              className="text-link"
              onClick={() => setSubmitted(false)}
            >
              {t.sendAnother} <ArrowUpRight size={15} />
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="contact-form"
            data-reveal
          >
            <div className="form-field">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder={t.namePlaceholder}
              />
            </div>
            <div className="form-field">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="form-field">
              <Label htmlFor="time">{t.time}</Label>
              <Select name="time">
                <SelectTrigger id="time">
                  <SelectValue placeholder={t.chooseTime} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">{t.selectMorning}</SelectItem>
                  <SelectItem value="midweek">{t.selectMidweek}</SelectItem>
                  <SelectItem value="any">{t.selectAny}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="form-field">
              <Label htmlFor="message">{t.message}</Label>
              <Textarea
                id="message"
                name="message"
                rows={3}
                placeholder={t.messagePlaceholder}
              />
            </div>
            <Button className="button button-dark" type="submit">
              {t.send} <ArrowUpRight data-icon="inline-end" />
            </Button>
          </form>
        )}
      </section>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a href="#top" className="brand footer-brand">
              <img
                src={logoSrc}
                alt="Hiwot Birhan cross and globe logo"
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
                  <a href={item.href}>{t === copy.en ? item.en : item.am}</a>
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
    </main>
  );
}

export default ChurchHome;
