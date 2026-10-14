import { HeroSection } from "@/components/home/hero-section";
import { ServiceSummary } from "@/components/home/service-summary";
import { AboutIntro } from "@/components/home/about-intro";
import { MinistriesPreview } from "@/components/home/ministries-preview";
import { FeaturedEvent } from "@/components/home/featured-event";
import { SermonPreview } from "@/components/home/sermon-preview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { VisitCta } from "@/components/home/visit-cta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ServiceSummary />
      <AboutIntro />
      <MinistriesPreview />
      <FeaturedEvent />
      <SermonPreview />
      <GalleryPreview />
      <VisitCta />
    </div>
  );
}
