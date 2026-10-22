import { before, after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { eq } from "drizzle-orm";

// Stub server-only so tests can import server modules in Node test runner
const require = createRequire(import.meta.url);
try {
  const serverOnlyPath = require.resolve("server-only");
  require.cache[serverOnlyPath] = {
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    exports: {},
  } as unknown as NodeModule;
} catch {
  // Ignore if server-only cannot be resolved
}

process.env.TURSO_DATABASE_URL = "file::memory:";
delete process.env.TURSO_AUTH_TOKEN;

let database: typeof import("../lib/db");
let schema: typeof import("../lib/db/schema");
let mediaLib: typeof import("../lib/cms/media");

before(async () => {
  const { migrate } = await import("drizzle-orm/libsql/migrator");
  database = await import("../lib/db");
  schema = await import("../lib/db/schema");
  mediaLib = await import("../lib/cms/media");

  await migrate(database.db, { migrationsFolder: "./drizzle" });
});

after(() => {
  database?.client?.close?.();
});

beforeEach(async () => {
  await database.db.delete(schema.media);
});

test("empty results when no matching items", async () => {
  // Empty database
  const emptyPage = await mediaLib.listMediaPage(null, null);
  assert.equal(emptyPage.items.length, 0);
  assert.equal(emptyPage.nextCursor, null);

  // Insert an item, then search with non-matching query
  await database.db.insert(schema.media).values({
    id: "item-1",
    name: "Sunday Service",
    alt: "Congregation praying",
    url: "https://res.cloudinary.com/summit/image/upload/v1/item-1.webp",
    size: 1000,
    width: 800,
    height: 600,
    createdAt: new Date(),
  });

  const noMatchPage = await mediaLib.listMediaPage(null, "nonexistent-query-xyz");
  assert.equal(noMatchPage.items.length, 0);
  assert.equal(noMatchPage.nextCursor, null);
});

test("rows where url is NULL are excluded from results", async () => {
  const now = Date.now();

  // Cloudinary row (url not null)
  await database.db.insert(schema.media).values({
    id: "cloud-1",
    name: "Cloud Image",
    alt: "Cloudinary hosted photograph",
    url: "https://res.cloudinary.com/summit/image/upload/v1/cloud-1.webp",
    publicId: "summit/cloud-1",
    size: 2048,
    width: 1200,
    height: 800,
    createdAt: new Date(now),
  });

  // Local/legacy DB row (url is null)
  await database.db.insert(schema.media).values({
    id: "local-1",
    name: "Local DB Image",
    alt: "Legacy image stored locally or in blob",
    url: null,
    size: 1024,
    width: 800,
    height: 600,
    createdAt: new Date(now + 1000),
  });

  const page = await mediaLib.listMediaPage(null, null);
  assert.equal(page.items.length, 1);
  assert.equal(page.items[0].id, "cloud-1");
  assert.equal(page.items[0].src, "https://res.cloudinary.com/summit/image/upload/v1/cloud-1.webp");
});

test("first page fetches up to 24 items and returns correct nextCursor when > 24 items exist", async () => {
  const baseTime = Date.now() - 100000;

  // Insert 30 Cloudinary items
  for (let i = 0; i < 30; i++) {
    await database.db.insert(schema.media).values({
      id: `photo-${i.toString().padStart(2, "0")}`,
      name: `Photo ${i}`,
      alt: `Description for photo ${i}`,
      url: `https://res.cloudinary.com/summit/image/upload/v1/photo-${i}.webp`,
      size: 1000 + i,
      width: 1200,
      height: 800,
      createdAt: new Date(baseTime + i * 1000), // photo-29 is newest
    });
  }

  const page1 = await mediaLib.listMediaPage(null, null);

  assert.equal(page1.items.length, 24);
  assert.equal(page1.items[0].id, "photo-29"); // Newest first
  assert.equal(page1.items[23].id, "photo-06"); // 24th item

  // nextCursor must match the 24th item's createdAt ISO string
  const expectedCursor = new Date(baseTime + 6 * 1000).toISOString();
  assert.equal(page1.nextCursor, expectedCursor);
});

test("cursor pagination progresses correctly (page 2 cursor filters results with lt())", async () => {
  const baseTime = Date.now() - 100000;

  // Insert 30 Cloudinary items
  for (let i = 0; i < 30; i++) {
    await database.db.insert(schema.media).values({
      id: `photo-${i.toString().padStart(2, "0")}`,
      name: `Photo ${i}`,
      alt: `Description for photo ${i}`,
      url: `https://res.cloudinary.com/summit/image/upload/v1/photo-${i}.webp`,
      size: 1000 + i,
      width: 1200,
      height: 800,
      createdAt: new Date(baseTime + i * 1000),
    });
  }

  const page1 = await mediaLib.listMediaPage(null, null);
  assert.ok(page1.nextCursor !== null);

  // Fetch page 2 using page 1's cursor
  const page2 = await mediaLib.listMediaPage(page1.nextCursor, null);

  assert.equal(page2.items.length, 6); // 30 - 24 = 6 remaining items
  assert.equal(page2.items[0].id, "photo-05");
  assert.equal(page2.items[5].id, "photo-00");
  assert.equal(page2.nextCursor, null); // Last page has null nextCursor

  // Verify all page 2 items are strictly older than cursor
  const cursorDate = new Date(page1.nextCursor!);
  for (const item of page2.items) {
    // Look up row to check createdAt
    const [row] = await database.db
      .select({ createdAt: schema.media.createdAt })
      .from(schema.media)
      .where(eq(schema.media.id, item.id));
    assert.ok(row.createdAt < cursorDate);
  }
});

test("search filtering works across both name and alt fields (case-insensitive)", async () => {
  const now = Date.now();

  await database.db.insert(schema.media).values([
    {
      id: "media-1",
      name: "Community Baptism",
      alt: "Outdoors by the lake",
      url: "https://res.cloudinary.com/summit/image/upload/v1/1.webp",
      size: 1000,
      width: 1000,
      height: 1000,
      createdAt: new Date(now),
    },
    {
      id: "media-2",
      name: "Sunday Worship",
      alt: "Community gathering in the main hall",
      url: "https://res.cloudinary.com/summit/image/upload/v1/2.webp",
      size: 1000,
      width: 1000,
      height: 1000,
      createdAt: new Date(now + 1000),
    },
    {
      id: "media-3",
      name: "Youth Night",
      alt: "Volleyball tournament in gym",
      url: "https://res.cloudinary.com/summit/image/upload/v1/3.webp",
      size: 1000,
      width: 1000,
      height: 1000,
      createdAt: new Date(now + 2000),
    },
  ]);

  // Search "community" matches media-1 (name) and media-2 (alt), but not media-3
  const communityResults = await mediaLib.listMediaPage(null, "community");
  assert.equal(communityResults.items.length, 2);
  const ids = communityResults.items.map((i) => i.id);
  assert.ok(ids.includes("media-1"));
  assert.ok(ids.includes("media-2"));
  assert.ok(!ids.includes("media-3"));

  // Case-insensitive search on name: "BAPTISM"
  const baptismResults = await mediaLib.listMediaPage(null, "BAPTISM");
  assert.equal(baptismResults.items.length, 1);
  assert.equal(baptismResults.items[0].id, "media-1");

  // Case-insensitive search on alt: "VOLLEYBALL"
  const volleyballResults = await mediaLib.listMediaPage(null, "VOLLEYBALL");
  assert.equal(volleyballResults.items.length, 1);
  assert.equal(volleyballResults.items[0].id, "media-3");
});

test("invalid cursor string is safely ignored rather than crashing", async () => {
  await database.db.insert(schema.media).values({
    id: "item-1",
    name: "Item 1",
    alt: "Alt 1",
    url: "https://res.cloudinary.com/summit/image/upload/v1/item-1.webp",
    size: 1000,
    width: 800,
    height: 600,
    createdAt: new Date(),
  });

  // Passing an invalid string as cursor should be ignored and not throw NaN error
  const page = await mediaLib.listMediaPage("invalid-cursor-date", null);
  assert.equal(page.items.length, 1);
  assert.equal(page.items[0].id, "item-1");
});
