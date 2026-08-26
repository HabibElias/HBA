import { LanguageProvider } from "@/lib/context/language-context";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { ServicesSection } from "@/components/landing/services-section";
import { MinistriesSection } from "@/components/landing/ministries-section";
import { SermonSection } from "@/components/landing/sermon-section";
import { EventsSection } from "@/components/landing/events-section";
import { QuoteSection } from "@/components/landing/quote-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";
import { RevealObserver } from "@/components/landing/reveal-observer";

export function LandingPage() {
  return (
    <LanguageProvider>
      <main className="site-shell">
        <RevealObserver />
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <MinistriesSection />
        <SermonSection />
        <EventsSection />
        <QuoteSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}

export default LandingPage;
