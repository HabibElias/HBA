import type { UpcomingEvent } from "@/lib/types/programs";
const escapeText = (text: string) => text.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
function foldLine(line: string) {
  let result = "", bytes = 0;
  const encoder = new TextEncoder();
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > 75) { result += "\r\n "; bytes = 1; }
    result += char; bytes += size;
  }
  return result;
}
export function createEventCalendar(event: UpcomingEvent, amharic: boolean, now = new Date()) {
  if (!event.startDate || !/^\d{8}T\d{6}Z$/.test(event.startDate)) return null;
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Hiwot Birhan Summit//Gatherings//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    `UID:${event.id}@hiwotbirhan-summit.org`, `DTSTAMP:${now.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${event.startDate}`, `DTEND:${event.endDate || event.startDate}`,
    `SUMMARY:${escapeText(amharic ? event.titleAm : event.title)}`,
    `DESCRIPTION:${escapeText(amharic ? event.descriptionAm : event.description)}`,
    `LOCATION:${escapeText(amharic ? event.locationAm : event.location)}`, "END:VEVENT", "END:VCALENDAR"];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
