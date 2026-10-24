import { landingDefaults } from "../lib/cms/landing";
import { loadEnvConfig } from "@next/env";
import { upcomingEvents } from "../lib/data/upcoming-events";
import { pastPrograms } from "../lib/data/past-programs";
import { weeklySchedules } from "../lib/data/schedules";
import { pastoralTeam } from "../lib/data/leadership";
import { recentSermons } from "../lib/data/sermons";
import { defaultRoles, type Collection } from "../lib/cms/permissions";
import { contentTitle, parseContent, safeImage } from "../lib/cms/collections";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");
async function main() {
  const { db, client } = await import("../lib/db");
  const { roles, content } = await import("../lib/db/schema");
  for (const role of defaultRoles)
    await db
      .insert(roles)
      .values({ ...role, builtIn: true })
      .onConflictDoNothing();
  const groups: [Collection, { id: string; [key: string]: unknown }[]][] = [
    [
      "events",
      upcomingEvents.map((e) => ({
        ...e,
        registerLink: e.registerLink.startsWith("#") ? "" : e.registerLink,
      })),
    ],
    [
      "recaps",
      pastPrograms.map((p) => ({
        ...p,
        photos: p.photos.filter((f) => f.src.startsWith("/")),
      })),
    ],
    ["albums", [{ id: "gallery-church-life", title: "Church life", titleAm: "የቤተ ክርስቲያን ሕይወት", date: "", dateAm: "", photos: [1, 2, 3, 4, 5].map(i => ({ src: landingDefaults[`home_gallery_preview_card${i}_image`], alt: landingDefaults[`home_gallery_preview_card${i}_title`], caption: landingDefaults[`home_gallery_preview_card${i}_caption`] })) }]],
    ["sermons", recentSermons],
    ["schedules", weeklySchedules.map((s) => ({ ...s }))],
    ["leaders", pastoralTeam.map((l) => ({ ...l, image: safeImage(l.image) ? l.image : "" }))],
    [
      "settings",
      [
        {
          id: "church-settings",
          title: "Hiwot Birhan Summit",
          titleAm: "ሕይወት ብርሃን ሰሚት",
          address: "Summit Condominium, near Gate 2 · Addis Ababa",
          addressAm: "ሰሚት ኮንዶሚኒየም፣ 2ኛ በር፣ አዲስ አበባ",
          phone: "+251911234567",
          email: "info@hiwotbirhan-summit.org",
          telegram: "https://t.me/HiwotBirhanSummit",
        },
      ],
    ],
  ];
  for (const [kind, entries] of groups)
    for (const [position, entry] of entries.entries()) {
      const payload = parseContent(kind, entry, true);
      await db
        .insert(content)
        .values({
          id: entry.id,
          kind,
          title: contentTitle(kind, payload),
          draft: payload,
          published: payload,
          position,
          publishedPosition: position,
          publishedVersion: 1,
          updatedAt: new Date(),
          publishedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  console.log(
    "Seed complete. Existing content and permissions were preserved; no user accounts were created.",
  );
  client.close();
}
main().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exitCode = 1;
});
