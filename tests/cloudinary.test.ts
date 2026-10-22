import { test } from "node:test";
import assert from "node:assert/strict";
import { isCloudinaryImage, uploadImage } from "../lib/cloudinary";
import { safeImage } from "../lib/cms/collections";

test("media validation allows only this cloud and existing public assets", () => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "gnlkergh";
  assert(safeImage("/gallery/gathering.webp"));
  assert(safeImage("/api/media/legacy-id"));
  assert(safeImage("https://res.cloudinary.com/gnlkergh/image/upload/v123/photo.webp"));
  for (const url of ["https://res.cloudinary.com/other/image/upload/photo.webp", "https://res.cloudinary.com.evil.test/gnlkergh/image/upload/photo.webp", "http://res.cloudinary.com/gnlkergh/image/upload/photo.webp", "https://res.cloudinary.com/gnlkergh/raw/upload/file", "/gallery/../secret", "https://res.cloudinary.com/gnlkergh/image/upload/x?redirect=evil"])
    assert.equal(safeImage(url), false, url);
});

test("uploads use the configured preset and return Cloudinary metadata", async (t) => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "gnlkergh";
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = "deel-assets";
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.equal(url, "https://api.cloudinary.com/v1_1/gnlkergh/image/upload");
    const form = init.body as FormData;
    assert.equal(form.get("upload_preset"), "deel-assets");
    assert(form.get("file") instanceof Blob);
    return Response.json({ secure_url: "https://res.cloudinary.com/gnlkergh/image/upload/v1/test.webp", public_id: "test", width: 1, height: 1, bytes: 40 });
  });
  const result = await uploadImage(new Uint8Array([1, 2]), "test.webp");
  assert(isCloudinaryImage(result.url));
  assert.equal(result.publicId, "test");
  assert.equal(result.size, 40);
});

test("provider errors do not produce a saved image URL", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ error: { message: "Unsigned preset missing" } }, { status: 400 }));
  await assert.rejects(uploadImage(new Uint8Array([1]), "test.webp"), /Cloudinary upload failed/);
});
