import { requirePermission, AccessError } from "@/lib/cms/access";
import { listMediaPage } from "@/lib/cms/media";
import { db } from "@/lib/db";
import { media, auditLog } from "@/lib/db/schema";
import sharp from "sharp";
import { uploadImage } from "@/lib/cloudinary";
export const maxDuration = 60;
export async function GET(request: Request) {
  try {
    await requirePermission();
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || null;
    const query = searchParams.get("q") || null;
    const page = await listMediaPage(cursor, query);
    return Response.json(page, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (e) {
    return Response.json(
      {
        message:
          e instanceof AccessError ? e.message : "Unable to load images.",
      },
      { status: e instanceof AccessError ? e.status : 500 },
    );
  }
}
export async function POST(request: Request) {
  try {
    const requestOrigin = request.headers.get("origin");
    const configuredOrigin = process.env.BETTER_AUTH_URL
      ? new URL(process.env.BETTER_AUTH_URL).origin
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : null;

    const isOriginAllowed =
      Boolean(requestOrigin) &&
      (requestOrigin === configuredOrigin ||
        (requestOrigin ? /^https:\/\/[a-zA-Z0-9_.-]+\.vercel\.app$/.test(requestOrigin) : false));

    if (!isOriginAllowed)
      return Response.json(
        { message: "Invalid request origin." },
        { status: 403 },
      );
    const actor = await requirePermission("media.write");
    if (Number(request.headers.get("content-length") || 0) > 5 * 1024 * 1024)
      return Response.json(
        { message: "Choose an image smaller than 4 MB." },
        { status: 413 },
      );
    const form = await request.formData(),
      file = form.get("file"),
      alt = String(form.get("alt") || "").trim();
    if (
      !(file instanceof File) ||
      file.size > 4 * 1024 * 1024 ||
      file.size === 0 ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      alt.length < 3 ||
      alt.length > 300
    )
      return Response.json(
        {
          message:
            "Choose a JPEG, PNG, or WebP under 4 MB and add a short image description.",
        },
        { status: 400 },
      );
    const image = sharp(Buffer.from(await file.arrayBuffer()), {
      limitInputPixels: 20_000_000,
      animated: false,
    });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format || ""))
      return Response.json(
        { message: "Unsupported image format." },
        { status: 400 },
      );
    const { data } = await image
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true });
    if (data.length > 1024 * 1024)
      return Response.json(
        {
          message:
            "This image is still too large after compression. Try a smaller photograph.",
        },
        { status: 413 },
      );
    const id = crypto.randomUUID(),
      name =
        file.name.replace(/[^\p{L}\p{N} ._-]/gu, "").slice(0, 160) ||
        "Photograph";
    let uploaded;
    try {
      uploaded = await uploadImage(data, `${id}.webp`);
    } catch {
      return Response.json({ message: "Image storage is unavailable. Please try uploading again shortly." }, { status: 502 });
    }
    await db.transaction(async (tx) => {
      await tx
        .insert(media)
        .values({
          id,
          name,
          alt,
          url: uploaded.url,
          publicId: uploaded.publicId,
          size: uploaded.size,
          width: uploaded.width,
          height: uploaded.height,
          createdAt: new Date(),
          createdBy: actor.id,
        });
      await tx
        .insert(auditLog)
        .values({
          id: crypto.randomUUID(),
          actorId: actor.id,
          actorName: actor.name,
          action: "media.uploaded",
          target: id,
          detail: name,
          createdAt: new Date(),
        });
    });
    return Response.json(
      {
        id,
        name,
        alt,
        src: uploaded.url,
        width: uploaded.width,
        height: uploaded.height,
      },
      { status: 201 },
    );
  } catch (e) {
    return Response.json(
      {
        message:
          e instanceof AccessError
            ? e.message
            : "The image could not be processed. Try a smaller JPEG or WebP.",
      },
      { status: e instanceof AccessError ? e.status : 400 },
    );
  }
}
