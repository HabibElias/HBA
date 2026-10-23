import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/libsql/migrator";
import { hashPassword } from "better-auth/crypto";
import { defaultRoles, allPermissions } from "../lib/cms/permissions";
import { upcomingEvents } from "../lib/data/upcoming-events";
import { parseContent } from "../lib/cms/collections";
import { defaultHeroPhotos, landingDefaults } from '../lib/cms/landing';
import { aboutDefaults } from '../lib/cms/about';
import { editablePages } from '../lib/cms/pages';

test('landing defaults remain editable and unsafe slideshow URLs are rejected', () => {
  const church = { title: 'Summit', titleAm: 'ሰሚት', address: 'Summit', addressAm: 'ሰሚት', phone: '+251911234567', email: 'church@example.com', telegram: 'https://t.me/Summit' };
  const parsed = parseContent('settings', church, true);
  assert.deepEqual(parsed.homeHeroPhotos, defaultHeroPhotos);
  assert.equal(parsed.home_hero_section_4, landingDefaults.home_hero_section_4);
  const edited = parseContent('settings', { ...church, home_hero_section_4: 'Welcome', home_hero_section_4Am: 'እንኳን ደህና መጡ', homeHeroPhotos: [] }, true);
  assert.equal(edited.home_hero_section_4, 'Welcome');
  assert.deepEqual(edited.homeHeroPhotos, []);
  assert.throws(() => parseContent('settings', { ...church, homeHeroPhotos: [{ src: 'https://untrusted.example/photo.jpg', alt: 'Photo' }] }, true));
  assert.throws(() => parseContent('settings', { ...church, home_hero_section_6: 'javascript:alert(1)' }, true));
});

test('page editors keep separate collections out of their sections', () => {
  assert(!editablePages.home.groups.includes('featured-event'));
  assert(!editablePages.home.groups.includes('sermon-preview'));
  assert(editablePages.about.groups.includes('about-faith-accordion'));
});

process.env.TURSO_DATABASE_URL = "file::memory:";
delete process.env.TURSO_AUTH_TOKEN;
process.env.BETTER_AUTH_SECRET = crypto.randomUUID() + crypto.randomUUID();
process.env.BETTER_AUTH_URL = "http://localhost:3999";
let database: typeof import("../lib/db"),
  schema: typeof import("../lib/db/schema"),
  service: typeof import("../lib/cms/service"),
  authentication: typeof import("../lib/auth");
const password = crypto.randomUUID() + "SafePassword!";
const actors = Object.fromEntries(
  defaultRoles.map((r) => [
    r.id,
    {
      id: `staff-${r.id}`,
      name: r.name,
      roleId: r.id,
      permissions: r.permissions,
    },
  ]),
);
const eventData = { ...upcomingEvents[0], registerLink: "" };
before(async () => {
  database = await import("../lib/db");
  schema = await import("../lib/db/schema");
  service = await import("../lib/cms/service");
  await migrate(database.db, { migrationsFolder: "./drizzle" });
  const hash = await hashPassword(password),
    now = new Date();
  for (const role of defaultRoles) {
    await database.db.insert(schema.roles).values({ ...role, builtIn: true });
    const actor = actors[role.id];
    await database.db
      .insert(schema.user)
      .values({
        id: actor.id,
        name: actor.name,
        email: `${role.id}@example.test`,
        roleId: role.id,
        createdAt: now,
        updatedAt: now,
        emailVerified: true,
      });
    await database.db
      .insert(schema.account)
      .values({
        id: crypto.randomUUID(),
        accountId: actor.id,
        providerId: "credential",
        userId: actor.id,
        password: hash,
        createdAt: now,
        updatedAt: now,
      });
  }
  authentication = await import("../lib/auth");
});
after(() => {
  database.client.close();
});
test("editors can save incomplete drafts but cannot publish", async () => {
  const id = await service.saveContent(actors.editor, {
    kind: "events",
    version: 0,
    position: 0,
    data: { title: "Private preparation" },
    intent: "draft",
  });
  const row = await database.db.query.content.findFirst({
    where: eq(schema.content.id, id),
  });
  assert.equal(row?.published, null);
  await assert.rejects(
    () =>
      service.saveContent(actors.editor, {
        id,
        kind: "events",
        version: 1,
        position: 0,
        data: eventData,
        intent: "publish",
      }),
    /role does not allow/,
  );
  await assert.rejects(
    () => service.changeContentState(actors.editor, id, 1, "publish"),
    /role does not allow/,
  );
});
test("viewers cannot mutate content even through direct service calls", async () => {
  await assert.rejects(
    () =>
      service.saveContent(actors.viewer, {
        kind: "events",
        version: 0,
        position: 0,
        data: eventData,
        intent: "draft",
      }),
    /role does not allow/,
  );
});
test("draft edits never overwrite the published snapshot", async () => {
  const id = await service.saveContent(actors.administrator, {
    kind: "events",
    version: 0,
    position: 0,
    data: eventData,
    intent: "publish",
  });
  await service.saveContent(actors.editor, {
    id,
    kind: "events",
    version: 1,
    position: 9,
    data: { ...eventData, title: "Unreleased draft title" },
    intent: "draft",
  });
  const row = await database.db.query.content.findFirst({
    where: eq(schema.content.id, id),
  });
  assert.equal(row?.published?.title, eventData.title);
  assert.equal(row?.draft.title, "Unreleased draft title");
  assert.equal(row?.publishedVersion, 1);
  assert.equal(row?.publishedPosition, 0);
  assert.equal(row?.position, 9);
  await service.changeContentState(actors.administrator, id, 2, "publish");
  const updated = await database.db.query.content.findFirst({
    where: eq(schema.content.id, id),
  });
  assert.equal(updated?.published?.title, "Unreleased draft title");
  assert.equal(updated?.publishedPosition, 9);
});
test("stale revisions and cross-collection writes are rejected", async () => {
  const id = await service.saveContent(actors.editor, {
    kind: "events",
    version: 0,
    position: 0,
    data: eventData,
    intent: "draft",
  });
  await assert.rejects(
    () =>
      service.saveContent(actors.editor, {
        id,
        kind: "events",
        version: 0,
        position: 0,
        data: eventData,
        intent: "draft",
      }),
    /updated this entry/,
  );
  await assert.rejects(
    () =>
      service.saveContent(actors.editor, {
        id,
        kind: "sermons",
        version: 1,
        position: 0,
        data: { title: "Wrong collection" },
        intent: "draft",
      }),
    /no longer exists/,
  );
});
test("unpublishing keeps the draft; deletion requires unpublished content", async () => {
  const id = await service.saveContent(actors.administrator, {
    kind: "events",
    version: 0,
    position: 0,
    data: eventData,
    intent: "publish",
  });
  await assert.rejects(
    () => service.changeContentState(actors.administrator, id, 1, "delete"),
    /Unpublish/,
  );
  await service.changeContentState(actors.administrator, id, 1, "unpublish");
  const row = await database.db.query.content.findFirst({
    where: eq(schema.content.id, id),
  });
  assert.equal(row?.published, null);
  assert.equal(row?.draft.title, eventData.title);
  await service.changeContentState(actors.administrator, id, 2, "delete");
  assert.equal(
    await database.db.query.content.findFirst({
      where: eq(schema.content.id, id),
    }),
    undefined,
  );
});
test("publication validates bilingual fields, image paths, and event chronology", () => {
  assert.throws(() =>
    parseContent("events", { ...eventData, titleAm: "" }, true),
  );
  assert.throws(() =>
    parseContent(
      "events",
      { ...eventData, registerLink: "javascript:alert(1)" },
      true,
    ),
  );
  assert.throws(() =>
    parseContent(
      "events",
      { ...eventData, image: "//attacker.test/image.png" },
      true,
    ),
  );
  assert.throws(() =>
    parseContent(
      "events",
      { ...eventData, image: "/gallery/../../secret" },
      true,
    ),
  );
  assert.throws(() =>
    parseContent("events", { ...eventData, endDate: "20260101T000000Z" }, true),
  );
  assert.throws(() =>
    parseContent(
      "events",
      { ...eventData, startDate: "20260230T000000Z" },
      true,
    ),
  );
});
test("administrators cannot grant Owner access or edit roles", async () => {
  await assert.rejects(
    () =>
      service.createStaff(actors.administrator, {
        name: "Escalation",
        email: "escalation@example.test",
        password,
        roleId: "owner",
      }),
    /cannot assign/,
  );
  await assert.rejects(
    () =>
      service.updateStaff(actors.administrator, {
        id: actors.editor.id,
        roleId: "owner",
        active: true,
      }),
    /cannot change/,
  );
  await assert.rejects(
    () =>
      service.saveRole(actors.administrator, {
        name: "Elevated",
        description: "Should be blocked",
        permissions: allPermissions,
        version: 0,
      }),
    /role does not allow/,
  );
});
test("Owner role is immutable and self-demotion is blocked", async () => {
  await assert.rejects(
    () =>
      service.saveRole(actors.owner, {
        id: "owner",
        name: "Owner",
        description: "Protected owner",
        permissions: [],
        version: 1,
      }),
    /cannot be edited/,
  );
  await assert.rejects(
    () =>
      service.updateStaff(actors.owner, {
        id: actors.owner.id,
        roleId: "viewer",
        active: false,
      }),
    /another owner/,
  );
});
test("role edits support optimistic locking and a read-only access floor", async () => {
  const id = await service.saveRole(actors.owner, {
    name: "Event helper",
    description: "Prepare event drafts",
    permissions: ["content.read", "events.write"],
    version: 0,
  });
  await service.saveRole(actors.owner, {
    id,
    name: "Event helper",
    description: "Read event content",
    permissions: ["content.read"],
    version: 1,
  });
  await assert.rejects(
    () =>
      service.saveRole(actors.owner, {
        id,
        name: "Event helper",
        description: "Stale update",
        permissions: ["content.read", "events.write"],
        version: 1,
      }),
    /role changed/,
  );
  await assert.rejects(
    () =>
      service.saveRole(actors.owner, {
        name: "No access",
        description: "Invalid configuration",
        permissions: [],
        version: 0,
      }),
    /content access/,
  );
});
test("staff access changes revoke sessions and prevent privilege escalation", async () => {
  const now = new Date();
  await database.db
    .insert(schema.session)
    .values({
      id: "editor-session",
      token: crypto.randomUUID(),
      userId: actors.editor.id,
      createdAt: now,
      updatedAt: now,
      expiresAt: new Date(Date.now() + 3600000),
    });
  await service.updateStaff(actors.administrator, {
    id: actors.editor.id,
    roleId: "viewer",
    active: false,
  });
  assert.equal(
    (
      await database.db
        .select()
        .from(schema.session)
        .where(eq(schema.session.userId, actors.editor.id))
    ).length,
    0,
  );
});
test("sign-in issues a session; public signup and disabled users are blocked", async () => {
  const request = (endpoint: string, body: unknown) =>
    authentication.auth.handler(
      new Request(`http://localhost:3999/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3999",
          "x-forwarded-for": "127.0.0.1",
        },
        body: JSON.stringify(body),
      }),
    );
  const login = await request("sign-in/email", {
    email: "viewer@example.test",
    password,
  });
  assert.equal(login.status, 200, await login.clone().text());
  assert.match(login.headers.get("set-cookie") || "", /httponly/i);
  const signup = await request("sign-up/email", {
    name: "Uninvited",
    email: "stranger@example.test",
    password,
  });
  assert.notEqual(signup.status, 200);
  const disabled = await request("sign-in/email", {
    email: "editor@example.test",
    password,
  });
  assert.notEqual(disabled.status, 200);
});
test("mutations leave an audit trail without passwords", async () => {
  const logs = await database.db.select().from(schema.auditLog);
  assert(logs.length >= 8);
  assert(!JSON.stringify(logs).includes(password));
  assert(logs.some((l) => l.action === "staff.access_changed"));
  assert(logs.some((l) => l.action === "content.published"));
});

test("password recovery revokes sessions and forces a new password", async () => {
  const temporaryPassword = crypto.randomUUID() + "Reset!";
  await service.updateStaff(actors.owner, {
    id: actors.viewer.id,
    roleId: "viewer",
    active: true,
    password: temporaryPassword,
  });
  const person = await database.db.query.user.findFirst({
    where: eq(schema.user.id, actors.viewer.id),
  });
  assert.equal(person?.mustChangePassword, true);
  assert.equal(
    (
      await database.db
        .select()
        .from(schema.session)
        .where(eq(schema.session.userId, actors.viewer.id))
    ).length,
    0,
  );
  const account = await database.db.query.account.findFirst({
    where: eq(schema.account.userId, actors.viewer.id),
  });
  assert.notEqual(account?.password, temporaryPassword);
});

test('About content preserves defaults and only becomes public after publishing', async () => {
  const base = parseContent('settings', { title: 'Summit', titleAm: 'ሰሚት', address: 'Summit', addressAm: 'ሰሚት', phone: '+251911234567', email: 'church@example.com', telegram: 'https://t.me/Summit' }, true);
  assert.equal(base.about_story_hero_1, aboutDefaults.about_story_hero_1);
  assert.equal(base.about_faith_0_summary, aboutDefaults.about_faith_0_summary);
  await database.db.insert(schema.content).values({ id: 'church-settings', kind: 'settings', title: 'Summit', draft: base, published: base, publishedVersion: 1, updatedAt: new Date() });
  const edited = { ...base, about_story_hero_1: 'Our story', about_story_hero_1Am: 'ታሪካችን', aboutHeroPhotos: [] };
  await service.saveContent(actors.owner, { id: 'church-settings', kind: 'settings', version: 1, position: 0, data: edited, intent: 'draft' });
  let entry = await database.db.query.content.findFirst({ where: eq(schema.content.id, 'church-settings') });
  assert.equal(entry?.published?.about_story_hero_1, base.about_story_hero_1);
  assert.equal(entry?.draft.about_story_hero_1, 'Our story');
  await service.saveContent(actors.owner, { id: 'church-settings', kind: 'settings', version: 2, position: 0, data: edited, intent: 'publish' });
  entry = await database.db.query.content.findFirst({ where: eq(schema.content.id, 'church-settings') });
  assert.equal(entry?.published?.about_story_hero_1, 'Our story');
  assert.deepEqual(entry?.published?.aboutHeroPhotos, []);
  assert.equal(entry?.published?.home_hero_section_4, base.home_hero_section_4);
});

test('media editing enforces permissions, validates metadata, and rejects stale changes', async () => {
  const { manageMedia } = await import('../lib/cms/media-management');
  const id = 'media-edit-test';
  await database.db.insert(schema.media).values({ id, name: 'Original.jpg', alt: 'Original photograph', url: 'https://example.com/original.jpg', size: 100, width: 20, height: 20, createdAt: new Date() });
  const input = { id, previousName: 'Original.jpg', previousAlt: 'Original photograph', intent: 'edit' as const, name: 'Updated name', alt: 'Updated description' };
  await assert.rejects(manageMedia(actors.viewer, input), /does not allow/);
  await assert.rejects(manageMedia(actors.owner, { ...input, alt: ' ' }));
  await manageMedia(actors.owner, input);
  const photo = await database.db.query.media.findFirst({ where: eq(schema.media.id, id) });
  assert.equal(photo?.name, 'Updated name');
  assert.equal(photo?.alt, 'Updated description');
  await assert.rejects(manageMedia(actors.owner, input), /Someone edited/);
});

test('media removal protects draft and published references and records an audit event', async () => {
  const { manageMedia } = await import('../lib/cms/media-management');
  const id = 'media-remove-test', src = 'https://example.com/in-use.jpg';
  await database.db.insert(schema.media).values({ id, name: 'Used.jpg', alt: 'Used photograph', url: src, size: 100, width: 20, height: 20, createdAt: new Date() });
  await database.db.insert(schema.content).values({ id: 'media-reference-test', kind: 'schedules', title: 'Referenced gathering', draft: { photos: [{src}] }, published: { image: `/api/media/${id}` }, updatedAt: new Date() });
  const remove = { id, previousName: 'Used.jpg', previousAlt: 'Used photograph', intent: 'remove' as const };
  await assert.rejects(manageMedia(actors.viewer, remove), /does not allow/);
  await assert.rejects(manageMedia(actors.owner, remove), /Referenced gathering/);
  await database.db.update(schema.content).set({ draft: {} }).where(eq(schema.content.id, 'media-reference-test'));
  await assert.rejects(manageMedia(actors.owner, remove), /Referenced gathering/);
  await database.db.update(schema.content).set({ published: null }).where(eq(schema.content.id, 'media-reference-test'));
  await manageMedia(actors.owner, remove);
  assert.equal(await database.db.query.media.findFirst({ where: eq(schema.media.id, id) }), undefined);
  const audit = await database.db.query.auditLog.findFirst({ where: eq(schema.auditLog.target, id) });
  assert.equal(audit?.action, 'media.removed');
});
