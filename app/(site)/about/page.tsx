import type { Metadata } from "next";
import { ContentProvider } from '@/lib/context/content-context';
import { getPublicContent } from '@/lib/cms/public';
import { StoryHero } from "@/components/about/story-hero";
import { ScriptureBanner } from "@/components/about/scripture-banner";
import { FoundingTimeline } from "@/components/about/founding-timeline";
import { ValuesPillars } from "@/components/about/values-pillars";
import { FaithAccordion } from "@/components/about/faith-accordion";
import { LeadershipGrid } from "@/components/about/leadership-grid";
import { AboutVisitCta } from "@/components/about/about-visit-cta";

export const metadata: Metadata = {
  title: "About Us | Hiwot Birhan Church Addis Ababa Summit Branch",
  description:
    "Discover the story, statement of faith, guiding values, and pastoral leadership of Hiwot Birhan Church at Summit, Addis Ababa.",
};

export default async function AboutPage() {
  const content = await getPublicContent('about');
  return (
    <ContentProvider value={content}><div className="flex flex-col min-h-screen">
      <StoryHero />
      <ScriptureBanner />
      <FoundingTimeline />
      <ValuesPillars />
      <FaithAccordion />
      <LeadershipGrid />
      <AboutVisitCta />
    </div></ContentProvider>
  );
}
