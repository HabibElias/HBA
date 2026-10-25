import { loadEnvConfig } from "@next/env";
import { eq, isNull, isNotNull, and } from "drizzle-orm";
import { uploadImage } from "../lib/cloudinary";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");

async function main() {
  const { db, client } = await import("../lib/db");
  const { media, content } = await import("../lib/db/schema");
  try {
    const pending = await db.select().from(media).where(and(isNull(media.url), isNotNull(media.data)));
    for (const entry of pending) {
      const uploaded = await uploadImage(entry.data!, `${entry.id}.webp`);
      await db.update(media).set({ ...uploaded, data: null }).where(eq(media.id, entry.id));
    }
    // Reruns also repair old content references if an earlier run was interrupted.
    const images = await db.select({ id: media.id, url: media.url }).from(media).where(isNotNull(media.url));
    const urls = new Map(images.map((m) => [`/api/media/${m.id}`, m.url!]));
    function replace(value: unknown): unknown {
      if (typeof value === "string") return urls.get(value) || value;
      if (Array.isArray(value)) return value.map(replace);
      if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replace(v)]));
      return value;
    }
    await db.transaction(async (tx) => {
      for (const entry of await tx.select().from(content)) {
        const draft = replace(entry.draft) as Record<string, unknown>;
        const published = replace(entry.published) as Record<string, unknown> | null;
        if (JSON.stringify(draft) !== JSON.stringify(entry.draft) || JSON.stringify(published) !== JSON.stringify(entry.published))
          await tx.update(content).set({ draft, published }).where(eq(content.id, entry.id));
      }
    });
    console.log(`Cloudinary migration complete: ${pending.length} uploads; content links updated.`);
  } finally { client.close(); }
}
main().catch(() => { console.error("Media migration failed. Check Cloudinary configuration and connectivity; completed uploads can be resumed safely."); process.exitCode = 1; });
