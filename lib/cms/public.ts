import "server-only";
import { sanitizeSermon } from "./rich-text";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { and, asc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { content } from "@/lib/db/schema";
import type { PublicContent } from "./public-types";
import { PUBLIC_CONTENT_TAG } from "./cache-tags";
import {
  projectPublicContent,
  scopeCollections,
  upcomingEvents,
  type PublicScope,
} from "./public-data";

type PublicCollection = (typeof scopeCollections)[PublicScope][number];
async function readPublishedCollection(kind: PublicCollection) {
  "use cache";
  cacheTag(PUBLIC_CONTENT_TAG);
  cacheLife({ stale: 60, revalidate: 3600, expire: 86400 });
  // No drafts, authentication data, or staff records enter the shared cache.
  const rows = await db
    .select({
      id: content.id,
      payload: content.published,
      publishedAt: content.publishedAt,
    })
    .from(content)
    .where(and(eq(content.kind, kind), isNotNull(content.published)))
    .orderBy(asc(content.publishedPosition), asc(content.id));
  return rows.map((row) => ({
    ...row.payload,
    id: row.id,
    ...(kind === "sermons"
      ? {
          body: sanitizeSermon(String(row.payload?.body || "")),
          bodyAm: sanitizeSermon(String(row.payload?.bodyAm || "")),
          publishedAt: row.publishedAt?.toISOString(),
        }
      : {}),
  }));
}
const getPublishedCollection = cache(readPublishedCollection);

export async function getPublicContent(
  scope: PublicScope,
): Promise<PublicContent> {
  "use cache";
  cacheTag(PUBLIC_CONTENT_TAG);
  // Refresh clock-sensitive event lists even when nobody publishes an edit.
  cacheLife(
    scope === "home" || scope === "programs"
      ? { stale: 60, revalidate: 60, expire: 300 }
      : { stale: 60, revalidate: 3600, expire: 86400 },
  );
  const kinds = scopeCollections[scope];
  const pairs = await Promise.all(
    kinds.map(
      async (kind) => [kind, await getPublishedCollection(kind)] as const,
    ),
  );
  const groups = Object.fromEntries(pairs);
  const settings = groups.settings?.[0];
  if (!settings)
    throw new Error("Church details are missing. Apply the database seed.");
  const result = {
    events: [],
    recaps: [],
    sermons: [],
    schedules: [],
    leaders: [],
    ...groups,
    settings,
  } as unknown as PublicContent;
  return projectPublicContent(result, scope, Date.now());
}

export async function getPublicEvent(id: string) {
  "use cache";
  cacheTag(PUBLIC_CONTENT_TAG);
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  const events = (await getPublishedCollection(
    "events",
  )) as unknown as PublicContent["events"];
  return (
    upcomingEvents(events, Date.now()).find((event) => event.id === id) ?? null
  );
}

export async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
