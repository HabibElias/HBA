import type { Metadata } from "next";
import { ContentProvider } from '@/lib/context/content-context';
import { getPublicContent } from '@/lib/cms/public';
import { VisitHero } from "@/components/visit/visit-hero";
import { TimeExplainerCallout } from "@/components/visit/time-explainer-callout";
import { WeeklyScheduleGrid } from "@/components/visit/weekly-schedule-grid";
import { WhatToExpect } from "@/components/visit/what-to-expect";
import { TransitDirections } from "@/components/visit/transit-directions";
import { ContactChannels } from "@/components/visit/contact-channels";
import { ContactForm } from "@/components/visit/contact-form";

export const metadata: Metadata = {
  title: "Visit, Directions & Contact | Hiwot Birhan Summit Addis Ababa",
  description:
    "Plan your visit to Hiwot Birhan Church in Summit, Addis Ababa. Explore weekly gathering schedules, Ethiopian local time guide, transit directions, and contact information.",
};

export default async function VisitPage() {
  const content = await getPublicContent('visit');
  return (
    <ContentProvider value={content}><div className="flex flex-col min-h-screen bg-background">
      <VisitHero />
      <WeeklyScheduleGrid />
      <TimeExplainerCallout />
      <WhatToExpect />
      <TransitDirections />
      <section id="contact" className="py-28 md:py-36 lg:py-40 bg-tint/25 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
          <ContactChannels />
          <ContactForm />
        </div>
      </section>
    </div></ContentProvider>
  );
}
