import { HeroSection } from "@/components/home/hero-section";
import { ContentProvider } from '@/lib/context/content-context';
import { getPublicContent } from '@/lib/cms/public';
import { AboutIntro } from "@/components/home/about-intro";
import { MinistriesPreview } from "@/components/home/ministries-preview";
import { FeaturedEvent } from "@/components/home/featured-event";
import { SermonPreview } from "@/components/home/sermon-preview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { VisitCta } from "@/components/home/visit-cta";
import { CommunityConnect } from "@/components/home/community-connect";

export default async function HomePage() {
  const content = await getPublicContent('home');
  return (
    <ContentProvider value={content}><div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutIntro />
      <MinistriesPreview />
      <FeaturedEvent />
      <SermonPreview />
      <GalleryPreview />
      <VisitCta />
      <CommunityConnect />
    </div></ContentProvider>
  );
}
