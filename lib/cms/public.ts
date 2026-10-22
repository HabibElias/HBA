import "server-only";
import { cache } from "react";
import { asc, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { content } from "@/lib/db/schema";
import type { PublicContent, ChurchSettings } from "./public-types";
import { calendarToISO } from "./collections";
export const getPublicContent = cache(async (): Promise<PublicContent> => {
  // Select published payloads only. Drafts and staff data never enter the public client tree.
  const rows = await db
    .select({ id: content.id, kind: content.kind, payload: content.published })
    .from(content)
    .where(isNotNull(content.published))
    .orderBy(asc(content.publishedPosition), asc(content.id));
  const records = (kind: string) =>
    rows
      .filter((r) => r.kind === kind)
      .map((r) => ({ ...r.payload, id: r.id }));
  const result = {
    events: records("events"),
    recaps: records("recaps"),
    sermons: records("sermons"),
    schedules: records("schedules"),
    leaders: records("leaders"),
    settings: records("settings")[0],
  } as unknown as PublicContent;
  if (!result.settings)
    throw new Error("Church details are missing. Apply the database seed.");
  const now = Date.now();
  result.events = result.events
    .filter(
      (e) => !e.endDate || new Date(calendarToISO(e.endDate)).getTime() >= now,
    )
    .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
  result.recaps.sort((a, b) => b.year - a.year);
  return result;
});
