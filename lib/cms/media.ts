import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
export async function listMedia() {
  const uploaded = await db
    .select({
      id: media.id,
      name: media.name,
      alt: media.alt,
      width: media.width,
      height: media.height,
      url: media.url,
    })
    .from(media)
    .orderBy(desc(media.createdAt))
    .limit(200);
  const existing = (
    await readdir(path.join(process.cwd(), "public/gallery"))
  ).filter((n) => /\.(jpg|jpeg|webp|png)$/i.test(n));
  return [
    ...uploaded.map(({ url, ...m }) => ({ ...m, src: url || `/api/media/${m.id}` })),
    ...existing.map((name) => ({
      id: name,
      name,
      alt: "Church gathering at Summit",
      src: `/gallery/${name}`,
      width: 0,
      height: 0,
    })),
  ];
}
