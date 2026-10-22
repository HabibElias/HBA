import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
export const runtime = "nodejs";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/.test(id)) return new Response(null, { status: 404 });
  const entry = await db.query.media.findFirst({ where: eq(media.id, id) });
  if (!entry) return new Response(null, { status: 404 });
  // Preserve links saved before the Cloudinary migration.
  if (entry.url) return Response.redirect(entry.url, 307);
  if (!entry.data) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(entry.data), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(entry.size),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
