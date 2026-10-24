import type { Metadata } from "next";
import { getPublicContent } from "@/lib/cms/public";
import { ContentProvider } from "@/lib/context/content-context";
import { GalleryPageContent } from "@/components/gallery/gallery-page";

export const metadata: Metadata = {
  title: "Photo Gallery | Hiwot Birhan Summit",
  description: "Moments we share: worship, prayer, fellowship and photographs from past gatherings at Hiwot Birhan Church Summit Branch.",
};
export default async function GalleryPage() {
  const content = await getPublicContent("gallery");
  return <ContentProvider value={content}><GalleryPageContent /></ContentProvider>;
}
