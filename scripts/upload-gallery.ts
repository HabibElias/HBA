import { loadEnvConfig } from "@next/env";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");

async function main() {
  const { db, client } = await import("../lib/db");
  const { media } = await import("../lib/db/schema");
  const { uploadImage } = await import("../lib/cloudinary");

  try {
    const galleryDir = path.join(process.cwd(), "public/gallery");
    const files = (await readdir(galleryDir)).filter((n) =>
      /\.(jpg|jpeg|webp|png)$/i.test(n),
    );

    // Load already-uploaded gallery entries by name to allow safe re-runs
    const existing = await db
      .select({ name: media.name })
      .from(media);
    const existingNames = new Set(existing.map((e) => e.name));

    const toUpload = files.filter((f) => {
      const baseName = path.basename(f, path.extname(f));
      const name = baseName.replace(/[^\p{L}\p{N} ._-]/gu, " ").trim() || "Church photograph";
      return !existingNames.has(f) && !existingNames.has(name);
    });
    console.log(
      `Found ${files.length} gallery files. ${toUpload.length} need uploading.`,
    );

    let uploaded = 0;
    for (const filename of toUpload) {
      const raw = await readFile(path.join(galleryDir, filename));
      const { data } = await sharp(raw, { limitInputPixels: 40_000_000 })
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer({ resolveWithObject: true });

      const id = crypto.randomUUID();
      const baseName = path.basename(filename, path.extname(filename));
      const name = baseName.replace(/[^\p{L}\p{N} ._-]/gu, " ").trim() || "Church photograph";
      const alt = "Church gathering at Summit";

      const result = await uploadImage(data, `${id}.webp`);
      await db.insert(media).values({
        id,
        name,
        alt,
        url: result.url,
        publicId: result.publicId,
        size: result.size,
        width: result.width,
        height: result.height,
        createdAt: new Date(),
        createdBy: null,
      });

      uploaded++;
      console.log(`[${uploaded}/${toUpload.length}] ✓ ${filename}`);
    }

    console.log(`Done. ${uploaded} new photos uploaded to Cloudinary.`);
  } finally {
    client.close();
  }
}

main().catch((e) => {
  console.error("Gallery upload failed:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
