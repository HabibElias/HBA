'use client'

import { useState } from 'react'
import { ArrowUpRight, CalendarDays, ChevronDown, Menu, Play, Quote, X } from 'lucide-react'

const logoSrc = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2023-11-07_22-51-41-removebg-25HxPrACO9AMudHCzbGWwiwwjOJpYi.png'
const navItems = ['Visit', 'About', 'Ministries', 'Events', 'Sermons']
const services = [
  { day: 'Sunday', time: '9:00 AM', name: 'Classic Service', detail: 'Traditional worship with choir and communion.' },
  { day: 'Sunday', time: '11:00 AM', name: 'Modern Service', detail: 'Contemporary worship and a message for today.' },
  { day: 'Wednesday', time: '6:30 PM', name: 'Midweek Gathering', detail: 'Dinner, prayer, and community for all ages.' },
]
const events = [
  { date: 'SEP 14', title: 'Fall Community Picnic', detail: 'Food, music, games, and neighbors. Everyone is welcome.', type: 'Community' },
  { date: 'SEP 21', title: 'Rooted: A 6-week study', detail: 'A practical study for growing deeper in faith together.', type: 'Groups' },
  { date: 'OCT 05', title: 'Serve Day', detail: 'A Saturday of practical care across our city.', type: 'Outreach' },
]

export function ChurchHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Hiwot Birhan Addis Ababa Summit branch home"><img src={logoSrc} alt="Hiwot Birhan Addis Ababa Summit branch cross and globe logo" className="brand-logo" /><span>Hiwot Birhan<br /><em>Addis Ababa Summit branch</em></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
        <a className="header-cta" href="#contact">Plan your visit <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<a href="#contact" onClick={() => setMenuOpen(false)}>Plan your visit <ArrowUpRight size={16} /></a></nav>}

      <section className="hero" id="top">
        <img src="/church-hero.png" alt="Friends gathering outside Hiwot Birhan Addis Ababa Summit branch" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content"><p className="eyebrow light">A place to belong</p><h1>There is room<br /><i>for you</i> here.</h1><p className="hero-copy">Harbor is a church for the curious, the hopeful, and everyone in between. Come as you are.</p><div className="hero-actions"><a className="button button-light" href="#contact">Plan your first visit <ArrowUpRight size={17} /></a><a className="text-link light" href="#sermons"><Play size={15} fill="currentColor" /> Watch latest message</a></div></div>
        <div className="hero-note">Sundays at 9 &amp; 11 AM <span>•</span> 124 Harbor Street</div>
      </section>

      <section className="intro section-pad" id="about"><div className="section-label">01 / Welcome</div><div className="intro-grid"><h2>A community<br />for <i>real life.</i></h2><div><p className="lead">We believe faith is better when it is lived together. Harbor is a diverse family learning to love God, love our neighbors, and make a difference in our city.</p><a className="text-link dark" href="#contact">Get to know us <ArrowUpRight size={16} /></a></div></div></section>

      <section className="services section-pad" id="visit"><div className="section-label">02 / Join us</div><div className="section-heading"><h2>Find your<br /><i>Sunday.</i></h2><p>Every gathering is a little different, but each one is centered on the same hope. Pick a time that works for you.</p></div><div className="service-list">{services.map((service) => <article className="service-row" key={service.name}><div className="service-time"><strong>{service.day}</strong><span>{service.time}</span></div><div><h3>{service.name}</h3><p>{service.detail}</p></div><ArrowUpRight className="row-arrow" /></article>)}</div></section>

      <section className="sermon-feature" id="sermons"><div className="sermon-copy"><div className="section-label light">03 / Latest message</div><p className="eyebrow light">The good news, in practice</p><h2>What if hope<br /><i>is closer</i> than we think?</h2><p>Pastor James shares a message about noticing the small, ordinary places where hope is already taking root.</p><div className="sermon-meta"><span>James Walker</span><span>September 7, 2025</span></div><a className="button button-light" href="#contact"><Play size={16} fill="currentColor" /> Watch message</a></div><div className="sermon-art" aria-hidden="true"><span>Listen<br /><i>again</i></span><Play size={28} fill="currentColor" /></div></section>

      <section className="events section-pad" id="events"><div className="section-label">04 / Coming up</div><div className="section-heading"><h2>Make room<br />for <i>more.</i></h2><a className="text-link dark" href="#contact">View all events <ArrowUpRight size={16} /></a></div><div className="event-list">{events.map((event) => <article className="event-row" key={event.title}><time>{event.date}</time><div><span className="event-type">{event.type}</span><h3>{event.title}</h3><p>{event.detail}</p></div><ArrowUpRight className="row-arrow" /></article>)}</div></section>

      <section className="quote-section"><Quote size={30} /><blockquote>“Harbor helped me see that I didn&apos;t have to have it all figured out before I came through the doors.”</blockquote><p>— Maya R., Harbor family</p></section>

      <section className="contact section-pad" id="contact"><div><div className="section-label">05 / Say hello</div><h2>Questions?<br /><i>We&apos;re here.</i></h2><p>Whether it&apos;s your first Sunday or your hundredth, we&apos;d love to hear from you.</p><div className="contact-details"><span>124 Harbor Street<br />Portland, OR 97205</span><span>hello@harbor.church<br />(503) 555-0148</span></div></div><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="contact-form"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="How should we call you?" /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required placeholder="you@example.com" /><label htmlFor="message">How can we help?</label><textarea id="message" name="message" rows={3} placeholder="Tell us a little more..." /><button className="button button-dark" type="submit">{submitted ? 'Message sent' : 'Send a message'} <ArrowUpRight size={17} /></button></form></section>

      <footer className="site-footer"><a href="#top" className="brand footer-brand"><img src={logoSrc} alt="Hiwot Birhan Addis Ababa Summit branch cross and globe logo" className="brand-logo" /><span>Hiwot Birhan<br /><em>Addis Ababa Summit branch</em></span></a><p>Making room for faith, hope, and each other.</p><div className="footer-links"><a href="#about">Instagram</a><a href="#about">YouTube</a><a href="#contact">Contact</a></div><small>© 2025 Hiwot Birhan Addis Ababa Summit branch</small></footer>
    </main>
  )
}

export default ChurchHome
