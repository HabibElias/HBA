import type { Metadata } from "next";
import { getPublicContent } from "@/lib/cms/public";
import { ContentProvider } from "@/lib/context/content-context";
import { SermonsPageContent } from "@/components/sermons/sermons-page";

export const metadata: Metadata = {
  title: "Sermons & Teaching | Hiwot Birhan Summit",
  description: "Explore the latest sermon and earlier messages from Hiwot Birhan Church Summit Branch. Find teaching by speaker, series, or scripture.",
};
export default async function SermonsPage() {
  const content = await getPublicContent("sermons");
  return <ContentProvider value={content}><SermonsPageContent /></ContentProvider>;
}
