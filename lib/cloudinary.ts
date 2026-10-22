/** Accept only image delivery URLs belonging to this Cloudinary account. */
export function isCloudinaryImage(value: string) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com" &&
      !url.port && !url.username && !url.password && !url.search && !url.hash &&
      url.pathname.startsWith(`/${cloud}/image/upload/`) &&
      url.pathname.length > `/${cloud}/image/upload/`.length;
  } catch { return false; }
}

export async function uploadImage(data: Uint8Array, filename: string) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) throw new Error("Cloudinary upload configuration is missing.");
  const form = new FormData();
  form.set("file", new Blob([new Uint8Array(data)], { type: "image/webp" }), filename);
  form.set("upload_preset", preset);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`, {
    method: "POST", body: form, signal: AbortSignal.timeout(30_000),
  });
  const result = await response.json();
  if (!response.ok || !isCloudinaryImage(result.secure_url) || !result.public_id ||
    !Number.isInteger(result.width) || result.width < 1 ||
    !Number.isInteger(result.height) || result.height < 1 ||
    !Number.isInteger(result.bytes) || result.bytes < 1) {
    throw new Error("Cloudinary upload failed. Check that the configured preset allows unsigned image uploads.");
  }
  return { url: result.secure_url as string, publicId: result.public_id as string,
    width: result.width as number, height: result.height as number, size: result.bytes as number };
}
