import type { Metadata } from "next";
import { ContentProvider } from '@/lib/context/content-context';
import { getPublicContent } from '@/lib/cms/public';
import { ProgramsHero } from "@/components/programs/programs-hero";
import { UpcomingSection } from "@/components/programs/upcoming-section";
import { PastProgramsGrid } from "@/components/programs/past-programs-grid";
import { ArchivalPhotoGrid } from "@/components/programs/archival-photo-grid";
import { CommunityStoryCta } from "@/components/programs/community-story-cta";

export const metadata: Metadata = {
  title: "Programs & Events | Hiwot Birhan Church Addis Ababa Summit Branch",
  description:
    "Join the fellowship at Hiwot Birhan Church Summit Branch. Discover upcoming assemblies, youth camps, and explore past program archives and testimonies.",
};

export default async function ProgramsPage() {
  const content = await getPublicContent('programs');
  return (
    <ContentProvider value={content}><div className="flex flex-col min-h-screen">
      <ProgramsHero />
      <UpcomingSection />
      <PastProgramsGrid />
      <ArchivalPhotoGrid />
      <CommunityStoryCta />
    </div></ContentProvider>
  );
}
