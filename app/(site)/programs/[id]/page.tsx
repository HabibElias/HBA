import { notFound } from "next/navigation";
import { getPublicEvent } from "@/lib/cms/public";
import { EventDetail } from "@/components/programs/event-detail";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getPublicEvent(id);
  return {
    title: event
      ? `${event.title} | Hiwot Birhan Summit`
      : "Gathering not found",
    description: event?.description,
  };
}
export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getPublicEvent(id);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
