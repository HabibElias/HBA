import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  content,
  auditLog,
  roles,
  user,
  session,
  account,
} from "@/lib/db/schema";
import {
  calendarToISO,
  contentTitle,
  isCollection,
  parseContent,
} from "./collections";
import { allPermissions, canAssignRole, type Collection } from "./permissions";
import { sanitizeSermon } from "./rich-text";
import { z } from "zod";
import { hashPassword } from "better-auth/crypto";

// Trusted actors are constructed by access.ts after a fresh session/database lookup.
export interface Actor {
  id: string;
  name: string;
  roleId: string;
  permissions: string[];
}
function allowed(actor: Actor, permission: string) {
  if (!actor.permissions.includes(permission))
    throw new Error("Your role does not allow this action.");
}
const audit = (
  actor: Actor,
  action: string,
  target: string,
  detail: string,
) => ({
  id: crypto.randomUUID(),
  actorId: actor.id,
  actorName: actor.name,
  action,
  target,
  detail,
  createdAt: new Date(),
});
export interface SaveInput {
  id?: string;
  kind: Collection;
  version: number;
  position: number;
  data: unknown;
  intent: "draft" | "publish";
}
export async function saveContent(actor: Actor, input: SaveInput) {
  if (!isCollection(input.kind)) throw new Error("Unknown content collection.");
  allowed(actor, `${input.kind}.write`);
  if (input.intent !== "draft" && input.intent !== "publish")
    throw new Error("Unknown save action.");
  if (input.intent === "publish") allowed(actor, `${input.kind}.publish`);
  z.number().int().min(0).parse(input.version);
  z.number().int().min(0).max(10000).parse(input.position);
  if (JSON.stringify(input.data).length > 100000)
    throw new Error("This entry is too large.");
  const data = parseContent(input.kind, input.data, input.intent === "publish");
  if (input.kind === "sermons")
    for (const key of ["body", "bodyAm"])
      data[key] = sanitizeSermon(String(data[key] || ""));
  const id = input.id || crypto.randomUUID(),
    now = new Date();
  await db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(content)
      .where(eq(content.id, id));
    if (input.id && (!existing || existing.kind !== input.kind))
      throw new Error("This entry no longer exists.");
    if (existing && existing.version !== input.version)
      throw new Error(
        "Someone has updated this entry. Reload it before saving so their changes are preserved.",
      );
    if (input.kind === "settings" && (!existing || id !== "church-settings"))
      throw new Error("Edit the existing church details entry.");
    const version = (existing?.version || 0) + 1;
    const values = {
      title: contentTitle(input.kind, data),
      draft: data,
      version,
      position: input.position,
      updatedAt: now,
      updatedBy: actor.id,
      ...(input.intent === "publish"
        ? {
            published: data,
            publishedAt: now,
            publishedVersion: version,
            publishedPosition: input.position,
          }
        : {}),
    };
    if (existing) {
      const changed = await tx
        .update(content)
        .set(values)
        .where(and(eq(content.id, id), eq(content.version, input.version)))
        .returning({ id: content.id });
      if (!changed.length)
        throw new Error("This entry changed. Reload before saving.");
    } else await tx.insert(content).values({ id, kind: input.kind, ...values });
    await tx
      .insert(auditLog)
      .values(
        audit(
          actor,
          `content.${input.intent === "publish" ? "published" : "saved"}`,
          id,
          `${input.kind}: ${values.title} · revision ${version}`,
        ),
      );
  });
  return id;
}
export async function changeContentState(
  actor: Actor,
  id: string,
  version: number,
  intent: "publish" | "unpublish" | "delete",
) {
  await db.transaction(async (tx) => {
    const [entry] = await tx.select().from(content).where(eq(content.id, id));
    if (!entry || !isCollection(entry.kind))
      throw new Error("Entry not found.");
    if (entry.version !== version)
      throw new Error("This entry changed. Reload before continuing.");
    allowed(
      actor,
      intent === "delete" ? "content.delete" : `${entry.kind}.publish`,
    );
    if (entry.kind === "settings" && intent !== "publish")
      throw new Error("Church details must remain published.");
    if (intent === "publish") {
      const data = parseContent(entry.kind, entry.draft, true);
      if (entry.kind === "sermons")
        for (const key of ["body", "bodyAm"])
          data[key] = sanitizeSermon(String(data[key] || ""));
      await tx
        .update(content)
        .set({
          published: data,
          publishedVersion: entry.version,
          publishedPosition: entry.position,
          publishedAt: new Date(),
          updatedBy: actor.id,
          updatedAt: new Date(),
        })
        .where(eq(content.id, id));
    } else if (intent === "unpublish")
      await tx
        .update(content)
        .set({
          published: null,
          publishedVersion: null,
          publishedAt: null,
          version: entry.version + 1,
          updatedBy: actor.id,
          updatedAt: new Date(),
        })
        .where(eq(content.id, id));
    else {
      if (entry.published)
        throw new Error("Unpublish this entry before deleting it.");
      await tx.delete(content).where(eq(content.id, id));
    }
    await tx
      .insert(auditLog)
      .values(
        audit(actor, `content.${intent}`, id, `${entry.kind}: ${entry.title}`),
      );
  });
}
export async function saveRole(
  actor: Actor,
  input: {
    id?: string;
    name: string;
    description: string;
    permissions: string[];
    version: number;
  },
) {
  allowed(actor, "roles.manage");
  const data = z
    .object({
      id: z.string().optional(),
      name: z.string().trim().min(2).max(60),
      description: z.string().trim().min(5).max(300),
      permissions: z
        .array(z.enum(allPermissions as [string, ...string[]]))
        .max(allPermissions.length),
      version: z.number().int().min(0),
    })
    .parse(input);
  if (data.id === "owner")
    throw new Error("Owner permissions cannot be edited.");
  if (!data.permissions.includes("content.read"))
    throw new Error("Staff roles must include content access.");
  if (!canAssignRole(actor.permissions, data.permissions))
    throw new Error("You cannot grant permissions you do not have.");
  const id = data.id || crypto.randomUUID();
  await db.transaction(async (tx) => {
    if (data.id) {
      const changed = await tx
        .update(roles)
        .set({
          name: data.name,
          description: data.description,
          permissions: [...new Set(data.permissions)],
          version: data.version + 1,
        })
        .where(and(eq(roles.id, id), eq(roles.version, data.version)))
        .returning({ id: roles.id });
      if (!changed.length)
        throw new Error("This role changed. Reload before saving.");
    } else
      await tx.insert(roles).values({
        id,
        name: data.name,
        description: data.description,
        permissions: [...new Set(data.permissions)],
      });
    await tx
      .insert(auditLog)
      .values(
        audit(
          actor,
          "role.updated",
          id,
          `${data.name}: ${data.permissions.join(", ")}`,
        ),
      );
  });
  return id;
}
export async function createStaff(
  actor: Actor,
  input: { name: string; email: string; password: string; roleId: string },
) {
  allowed(actor, "users.manage");
  const data = z
    .object({
      name: z.string().trim().min(2).max(100),
      email: z.email().transform((s) => s.toLowerCase()),
      password: z.string().min(12).max(128),
      roleId: z.string().min(1),
    })
    .parse(input);
  const password = await hashPassword(data.password),
    id = crypto.randomUUID(),
    now = new Date();
  await db.transaction(async (tx) => {
    const [role] = await tx
      .select()
      .from(roles)
      .where(eq(roles.id, data.roleId));
    if (
      !role ||
      !canAssignRole(actor.permissions, role.permissions) ||
      (role.id === "owner" && actor.roleId !== "owner")
    )
      throw new Error("You cannot assign this role.");
    await tx.insert(user).values({
      id,
      name: data.name,
      email: data.email,
      emailVerified: true,
      roleId: role.id,
      mustChangePassword: true,
      createdAt: now,
      updatedAt: now,
    });
    await tx.insert(account).values({
      id: crypto.randomUUID(),
      accountId: id,
      providerId: "credential",
      userId: id,
      password,
      createdAt: now,
      updatedAt: now,
    });
    await tx
      .insert(auditLog)
      .values(audit(actor, "staff.created", id, `${data.name} · ${role.name}`));
  });
}
export async function updateStaff(
  actor: Actor,
  input: { id: string; roleId: string; active: boolean; password?: string },
) {
  allowed(actor, "users.manage");
  const data = z
    .object({
      id: z.string(),
      roleId: z.string(),
      active: z.boolean(),
      password: z.string().min(12).max(128).optional(),
    })
    .parse(input);
  const passwordHash = data.password
    ? await hashPassword(data.password)
    : undefined;
  if (data.id === actor.id)
    throw new Error("Ask another owner to change your own access.");
  await db.transaction(async (tx) => {
    const [target] = await tx.select().from(user).where(eq(user.id, data.id));
    const [oldRole] = target
      ? await tx.select().from(roles).where(eq(roles.id, target.roleId))
      : [];
    const [role] = await tx
      .select()
      .from(roles)
      .where(eq(roles.id, data.roleId));
    if (!target || !oldRole || !role)
      throw new Error("Staff account or role not found.");
    if (
      !canAssignRole(actor.permissions, role.permissions) ||
      !canAssignRole(actor.permissions, oldRole.permissions) ||
      ((oldRole.id === "owner" || role.id === "owner") &&
        actor.roleId !== "owner")
    )
      throw new Error("You cannot change this account's access.");
    if (
      target.roleId === "owner" &&
      target.active &&
      (!data.active || data.roleId !== "owner")
    ) {
      const [count] = await tx
        .select({ value: sql<number>`count(*)` })
        .from(user)
        .where(and(eq(user.roleId, "owner"), eq(user.active, true)));
      if (count.value <= 1)
        throw new Error("At least one active owner is required.");
    }
    if (passwordHash)
      await tx
        .update(account)
        .set({ password: passwordHash, updatedAt: new Date() })
        .where(
          and(
            eq(account.userId, data.id),
            eq(account.providerId, "credential"),
          ),
        );
    await tx
      .update(user)
      .set({
        roleId: data.roleId,
        active: data.active,
        ...(passwordHash ? { mustChangePassword: true } : {}),
        updatedAt: new Date(),
      })
      .where(eq(user.id, data.id));
    await tx.delete(session).where(eq(session.userId, data.id));
    await tx
      .insert(auditLog)
      .values(
        audit(
          actor,
          "staff.access_changed",
          data.id,
          `${target.name} · ${role.name} · ${data.active ? "active" : "disabled"}${passwordHash ? "; temporary password reset" : ""}; sessions revoked`,
        ),
      );
  });
}

/** A stable ID makes repeated clicks and concurrent conversions idempotent. */
export async function createEventRecap(
  actor: Actor,
  id: string,
  version: number,
) {
  allowed(actor, "events.write");
  allowed(actor, "recaps.write");
  const recapId = `event-recap-${id}`;
  await db.transaction(async (tx) => {
    const [event] = await tx.select().from(content).where(eq(content.id, id));
    if (!event || event.kind !== "events") throw new Error("Event not found.");
    if (event.version !== version)
      throw new Error("This event changed. Reload before continuing.");
    const data = event.draft;
    const end = new Date(calendarToISO(String(data.endDate || ""))).getTime();
    if (!Number.isFinite(end) || end > Date.now())
      throw new Error("Only completed events can become past gatherings.");
    const [existing] = await tx
      .select()
      .from(content)
      .where(eq(content.id, recapId));
    if (existing) return;
    const draft = parseContent(
      "recaps",
      {
        ...data,
        recap: data.description,
        recapAm: data.descriptionAm,
        scripture: data.theme,
        scriptureAm: data.themeAm,
        year: new Date(end + 3 * 3600000).getUTCFullYear(),
        photos: data.image
          ? [{ src: data.image, alt: data.title, isMain: true }]
          : [],
      },
      false,
    );
    await tx
      .insert(content)
      .values({
        id: recapId,
        kind: "recaps",
        title: contentTitle("recaps", draft),
        draft,
        position: event.position,
        updatedAt: new Date(),
        updatedBy: actor.id,
      });
    await tx
      .insert(auditLog)
      .values(
        audit(
          actor,
          "event.recap-created",
          recapId,
          `Created from event: ${event.title}`,
        ),
      );
  });
  return recapId;
}
