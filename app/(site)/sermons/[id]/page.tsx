import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/cms/public";
import { ContentProvider } from "@/lib/context/content-context";
import { SermonPost } from "@/components/sermons/sermon-post";
import { RelatedSermons } from "@/components/sermons/related-sermons";
import { relatedSermons } from "@/lib/data/related-sermons";

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

  const otherSermons = relatedSermons(sermon, content.sermons);

  return (
    <ContentProvider value={content}>
      <div className="bg-surface min-h-screen">
        <SermonPost sermon={sermon} />
        <RelatedSermons sermons={otherSermons} />
      </div>
    </ContentProvider>
  );
}
