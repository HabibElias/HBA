import { getPublicEvent } from "@/lib/cms/public";
import { createEventCalendar } from "@/lib/calendar";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await getPublicEvent(id);
  if (!event) return new Response("Gathering not found", { status: 404 });
  const calendar = createEventCalendar(
    event,
    new URL(request.url).searchParams.get("lang") === "am",
  );
  if (!calendar)
    return new Response("No calendar date available", { status: 404 });
  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id.replace(/[^a-zA-Z0-9-]/g, "")}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
