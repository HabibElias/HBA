export const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
export function isAudioUploadResult(result: {
  secure_url?: string;
  audio?: unknown;
  bytes?: number;
}) {
  return Boolean(
    result.secure_url &&
    isSermonAudio(result.secure_url) &&
    result.audio &&
    Number.isInteger(result.bytes) &&
    result.bytes! > 0 &&
    result.bytes! <= MAX_AUDIO_BYTES,
  );
}
export function isSermonAudio(value: string) {
  try {
    const url = new URL(value);
    const prefix = `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/`;
    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      !url.port &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      url.pathname.startsWith(prefix) &&
      /\.(mp3|m4a|wav|ogg)$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}
export function audioDownloadUrl(url: string) {
  return isSermonAudio(url)
    ? url.replace("/video/upload/", "/video/upload/fl_attachment/")
    : "";
}
