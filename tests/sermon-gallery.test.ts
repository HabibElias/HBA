import { test } from "node:test";
import assert from "node:assert/strict";
import { databaseConfig } from "../lib/db/config";
import { parseContent } from "../lib/cms/collections";
import { sanitizeSermon } from "../lib/cms/rich-text";
import { buildGalleryAlbums } from "../lib/cms/public-data";
import { recentSermons } from "../lib/data/sermons";
import { isAudioUploadResult, audioDownloadUrl } from "../lib/audio";
import type { PublicContent } from "../lib/cms/public-types";

test("Cloudinary audio metadata is accepted even when it includes an empty video object", () => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test-cloud";
  const secure_url =
    "https://res.cloudinary.com/test-cloud/video/upload/v1/recording.wav";
  const result = {
    secure_url,
    audio: { codec: "pcm_s16le" },
    video: {},
    bytes: 4044,
  };
  assert.equal(isAudioUploadResult(result), true);
  assert.equal(isAudioUploadResult({ ...result, bytes: 0 }), false);
  assert.equal(
    isAudioUploadResult({
      ...result,
      secure_url: "https://evil.example/audio.wav",
    }),
    false,
  );
  assert.match(audioDownloadUrl(secure_url), /video\/upload\/fl_attachment\//);
  delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
});

test("development never inherits a production URL or token", () => {
  const config = databaseConfig({
    NODE_ENV: "development",
    TURSO_DATABASE_URL: "libsql://production.turso.io",
    TURSO_AUTH_TOKEN: "production-secret",
  });
  assert.equal(config.url, "file:./data/church-development.db");
  assert.equal(config.authToken, undefined);
  assert.throws(() =>
    databaseConfig({
      NODE_ENV: "development",
      TURSO_DATABASE_URL: "libsql://same",
      TURSO_DEVELOPMENT_DATABASE_URL: "libsql://same",
    }),
  );
  assert.throws(() => databaseConfig({ NODE_ENV: "production" }));
  assert.throws(() =>
    databaseConfig({
      NODE_ENV: "production",
      TURSO_PRODUCTION_DATABASE_URL: "file:./data/church-development.db",
    }),
  );
  assert.throws(() =>
    databaseConfig({
      NODE_ENV: "development",
      TURSO_DATABASE_URL: "file:./data/shared.db",
      TURSO_DEVELOPMENT_DATABASE_URL: "file:data/shared.db",
    }),
  );
});
test("standalone sermons publish without a series or audio", () => {
  const post = parseContent(
    "sermons",
    {
      ...recentSermons[0],
      series: "",
      seriesAm: "",
      body: "<h2>A message</h2><p>Teaching</p>",
    },
    true,
  );
  assert.equal(post.series, "");
  assert.equal(post.audioUrl, "");
  assert.throws(() =>
    parseContent("sermons", { ...post, audioUrl: "javascript:alert(1)" }, true),
  );
});
test("rich text keeps supported formatting and strips executable content", () => {
  const clean = sanitizeSermon(
    '<h2>Message</h2><p onclick="bad()"><strong>Faith</strong><script>alert(1)</script><img src=x onerror=bad()><a href="javascript:bad()">link</a></p>',
  );
  assert.match(clean, /<strong>Faith<\/strong>/);
  assert.doesNotMatch(clean, /script|onclick|onerror|javascript|<img/);
});
test("folders preserve distinct gatherings with the same title and shared photos", () => {
  const content = {
    settings: Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [
        `home_gallery_preview_card${i + 1}_image`,
        "",
      ]),
    ),
    albums: [{ id: "folder", title: "Sunday", photos: [] }],
    recaps: [
      {
        id: "one",
        title: "Sunday",
        year: 2026,
        photos: [{ src: "/gallery/shared.jpg", alt: "First" }],
      },
      {
        id: "two",
        title: "Sunday",
        year: 2025,
        photos: [{ src: "/gallery/shared.jpg", alt: "Second" }],
      },
    ],
  } as unknown as PublicContent;
  const albums = buildGalleryAlbums(content);
  assert.deepEqual(
    albums.map((album) => album.id),
    ["folder", "recap-one", "recap-two"],
  );
  assert.equal(albums[1].photos.length, 1);
  assert.equal(albums[2].photos.length, 1);
});
