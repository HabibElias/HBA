import "server-only";
import { desc, lt, sql, like, and, isNotNull, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const MEDIA_PAGE_SIZE = 24;

export interface MediaItem {
  id: string;
  name: string;
  alt: string;
  src: string;
  width: number;
  height: number;
}

export interface MediaPage {
  items: MediaItem[];
  nextCursor: string | null; // ISO timestamp of last item's createdAt
}

/**
 * Returns a page of Cloudinary-only media items.
 * @param cursor - ISO timestamp from previous page's nextCursor (or null for first page)
 * @param query  - free-text filter against name + alt
 */
export async function listMediaPage(
  cursor: string | null,
  query: string | null,
): Promise<MediaPage> {
  const q = query?.trim().toLowerCase() || null;
  const parsedCursor = cursor ? new Date(cursor) : null;
  const validCursor =
    parsedCursor && !Number.isNaN(parsedCursor.getTime()) ? parsedCursor : null;

  const rows = await db
    .select({
      id: media.id,
      name: media.name,
      alt: media.alt,
      url: media.url,
      width: media.width,
      height: media.height,
      createdAt: media.createdAt,
    })
    .from(media)
    .where(
      and(
        isNotNull(media.url), // Cloudinary only
        validCursor ? lt(media.createdAt, validCursor) : undefined,
        q
          ? or(
              like(sql`lower(${media.name})`, `%${q}%`),
              like(sql`lower(${media.alt})`, `%${q}%`),
            )
          : undefined,
      ),
    )
    .orderBy(desc(media.createdAt))
    .limit(MEDIA_PAGE_SIZE + 1); // fetch one extra to know if there's a next page

  const hasMore = rows.length > MEDIA_PAGE_SIZE;
  const items = rows.slice(0, MEDIA_PAGE_SIZE);

  return {
    items: items.map((r) => ({
      id: r.id,
      name: r.name,
      alt: r.alt,
      src: r.url!,
      width: r.width,
      height: r.height,
    })),
    nextCursor: hasMore
      ? items[items.length - 1].createdAt.toISOString()
      : null,
  };
}

/**
 * Backward compatibility helper for existing callers.
 * Returns the first page of media items.
 */
export async function listMedia(): Promise<MediaItem[]> {
  const page = await listMediaPage(null, null);
  return page.items;
}
