import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublicContent } from "@/lib/cms/public";
import { ContentProvider } from "@/lib/context/content-context";
import { SermonPost } from "@/components/sermons/sermon-post";
import { SermonCard } from "@/components/sermons/sermon-card";

interface SermonDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const content = await getPublicContent("sermons");
  return content.sermons.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: SermonDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const content = await getPublicContent("sermons");
  const sermon = content.sermons.find((s) => s.id === id);
  if (!sermon) {
    return { title: "Sermon Not Found | Hiwot Birhan Summit" };
  }
  return {
    title: `${sermon.title} | Sermons | Hiwot Birhan Summit`,
    description:
      sermon.theme || `Sermon on ${sermon.scripture} by ${sermon.speaker}.`,
  };
}

export default async function SermonDetailPage({
  params,
}: SermonDetailPageProps) {
  const { id } = await params;
  const content = await getPublicContent("sermons");
  const sermon = content.sermons.find((s) => s.id === id);

  if (!sermon) {
    notFound();
  }

  const otherSermons = content.sermons.filter((s) => s.id !== id).slice(0, 3);

  return (
    <ContentProvider value={content}>
      <div className="pt-28 md:pt-36 bg-surface min-h-screen">
        <div className="site-container py-6">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep mb-2 transition-colors group"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to all messages</span>
          </Link>
        </div>

        <div className="border-b border-border pb-12">
          <SermonPost sermon={sermon} />
        </div>

        {otherSermons.length > 0 && (
          <div className="site-container py-16 md:py-20">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-8 text-foreground">
              More Messages from Summit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherSermons.map((other) => (
                <SermonCard key={other.id} sermon={other} preview />
              ))}
            </div>
          </div>
        )}
      </div>
    </ContentProvider>
  );
}
