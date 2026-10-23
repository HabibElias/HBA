import test from "node:test";
import assert from "node:assert/strict";
import {
  CalendarDays,
  BookOpen,
  Clock,
  Users,
  Archive,
  Upload,
} from "lucide-react";
import {
  getQuickActions,
  calculatePulseMetrics,
  QUICK_ACTIONS,
} from "../lib/admin/overview";

test("getQuickActions returns all 6 actions when user has all write permissions", () => {
  const allWritePermissions = [
    "events.write",
    "sermons.write",
    "schedules.write",
    "leaders.write",
    "recaps.write",
    "media.write",
  ];

  const actions = getQuickActions(allWritePermissions);
  assert.equal(actions.length, 6);
  assert.deepEqual(
    actions.map((a) => a.id),
    [
      "new-event",
      "new-sermon",
      "new-schedule",
      "new-leader",
      "new-recap",
      "upload-photo",
    ],
  );
});

test("getQuickActions returns only authorized actions for partial permissions", () => {
  const partial = ["events.write", "media.write"];
  const actions = getQuickActions(partial);

  assert.equal(actions.length, 2);
  assert.deepEqual(
    actions.map((a) => a.id),
    ["new-event", "upload-photo"],
  );
});

test("getQuickActions returns empty array when user has empty permissions", () => {
  const actions = getQuickActions([]);
  assert.deepEqual(actions, []);
});

test("getQuickActions handles irrelevant permissions cleanly", () => {
  const actions = getQuickActions(["content.read", "audit.read"]);
  assert.deepEqual(actions, []);
});

test("quick actions contain correct metadata and icons", () => {
  const expectedDefinitions = [
    {
      id: "new-event",
      title: "New event",
      subtitle: "Announce a gathering or assembly",
      href: "/admin/content/events/new",
      permission: "events.write",
      icon: CalendarDays,
      iconName: "CalendarDays",
    },
    {
      id: "new-sermon",
      title: "New sermon",
      subtitle: "Add teaching audio & study notes",
      href: "/admin/content/sermons/new",
      permission: "sermons.write",
      icon: BookOpen,
      iconName: "BookOpen",
    },
    {
      id: "new-schedule",
      title: "New gathering",
      subtitle: "Update regular weekly service times",
      href: "/admin/content/schedules/new",
      permission: "schedules.write",
      icon: Clock,
      iconName: "Clock",
    },
    {
      id: "new-leader",
      title: "New profile",
      subtitle: "Add a pastor or ministry director",
      href: "/admin/content/leaders/new",
      permission: "leaders.write",
      icon: Users,
      iconName: "Users",
    },
    {
      id: "new-recap",
      title: "New recap",
      subtitle: "Archive photos & past assembly recap",
      href: "/admin/content/recaps/new",
      permission: "recaps.write",
      icon: Archive,
      iconName: "Archive",
    },
    {
      id: "upload-photo",
      title: "Upload photos",
      subtitle: "Add high-res photos to media library",
      href: "/admin/media",
      permission: "media.write",
      icon: Upload,
      iconName: "Upload",
    },
  ];

  const actions = getQuickActions([
    "events.write",
    "sermons.write",
    "schedules.write",
    "leaders.write",
    "recaps.write",
    "media.write",
  ]);

  assert.equal(actions.length, expectedDefinitions.length);

  for (let i = 0; i < expectedDefinitions.length; i++) {
    const expected = expectedDefinitions[i];
    const actual = actions[i];

    assert.equal(actual.id, expected.id);
    assert.equal(actual.title, expected.title);
    assert.equal(actual.subtitle, expected.subtitle);
    assert.equal(actual.href, expected.href);
    assert.equal(actual.permission, expected.permission);
    assert.equal(actual.icon, expected.icon);
    assert.equal(actual.iconName, expected.iconName);
  }
});

test("calculatePulseMetrics computes metrics correctly", () => {
  const metrics = calculatePulseMetrics({
    counts: [
      { kind: "events", total: 10, published: 7 },
      { kind: "sermons", total: 15, published: 12 },
      { kind: "leaders", total: 5, published: 5 },
      { kind: "recaps", total: 8, published: 4 },
      { kind: "schedules", total: 3, published: 3 },
      { kind: "settings", total: 1, published: 1 },
    ],
    mediaCount: 42,
    upcomingEventsCount: 3,
    reviewCount: 9,
  });

  assert.deepEqual(metrics, {
    publishedTotal: 32,
    needsAttention: 9,
    mediaTotal: 42,
    upcomingEvents: 3,
  });
});

test("calculatePulseMetrics handles empty or zero counts", () => {
  const metrics = calculatePulseMetrics({
    counts: [],
    mediaCount: 0,
    upcomingEventsCount: 0,
    reviewCount: 0,
  });

  assert.deepEqual(metrics, {
    publishedTotal: 0,
    needsAttention: 0,
    mediaTotal: 0,
    upcomingEvents: 0,
  });
});

test("calculatePulseMetrics handles undefined / zero arguments safely", () => {
  const metricsNoArgs = calculatePulseMetrics();
  assert.deepEqual(metricsNoArgs, {
    publishedTotal: 0,
    needsAttention: 0,
    mediaTotal: 0,
    upcomingEvents: 0,
  });

  const metricsEmptyObj = calculatePulseMetrics({});
  assert.deepEqual(metricsEmptyObj, {
    publishedTotal: 0,
    needsAttention: 0,
    mediaTotal: 0,
    upcomingEvents: 0,
  });
});

test("calculatePulseMetrics handles nullish, string and sparse values safely", () => {
  const metrics = calculatePulseMetrics({
    counts: [
      { kind: "events", published: "14" as any },
      { kind: "sermons", published: null },
      undefined as any,
    ],
    mediaCount: "50" as any,
    upcomingEventsCount: null,
    reviewCount: "8" as any,
  });

  assert.deepEqual(metrics, {
    publishedTotal: 14,
    needsAttention: 8,
    mediaTotal: 50,
    upcomingEvents: 0,
  });
});

test("getQuickActions handles null or undefined gracefully", () => {
  assert.deepEqual(getQuickActions(), []);
  assert.deepEqual(getQuickActions(undefined), []);
  assert.deepEqual(getQuickActions(null as unknown as readonly string[]), []);
});
