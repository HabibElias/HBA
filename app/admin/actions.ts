"use server";
import { revalidatePath, updateTag } from "next/cache";
import { PUBLIC_CONTENT_TAG } from "@/lib/cms/cache-tags";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requirePermission, currentStaff } from "@/lib/cms/access";
import * as service from "@/lib/cms/service";
import { manageMedia } from "@/lib/cms/media-management";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, auditLog } from "@/lib/db/schema";
export type ActionResult = { ok: boolean; message: string; id?: string };
function failure(error: unknown): ActionResult {
  if (error instanceof z.ZodError)
    return {
      ok: false,
      message: error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(" "),
    };
  const message =
    error instanceof Error
      ? error.message
      : "Could not save. Please try again.";
  if (/SQL|constraint|UNIQUE|libsql|database|query|statement/i.test(message)) {
    console.error(
      "CMS operation failed",
      error instanceof Error ? error.name : "Unknown error",
    );
    return {
      ok: false,
      message:
        "The change could not be saved. Check for an existing email or role name, then try again.",
    };
  }
  return { ok: false, message };
}
function refresh() {
  revalidatePath("/admin", "layout");
}
function refreshPublishedContent() {
  updateTag(PUBLIC_CONTENT_TAG);
  revalidatePath("/(site)", "layout");
}
export async function manageMediaAction(
  input: Parameters<typeof manageMedia>[1],
): Promise<ActionResult> {
  try {
    const actor = await requirePermission("media.write");
    await manageMedia(actor, input);
    revalidatePath("/admin/media");
    return {
      ok: true,
      message:
        input.intent === "edit"
          ? "Photograph details saved."
          : "Photograph removed from the library.",
    };
  } catch (error) {
    return failure(error);
  }
}
export async function saveContentAction(
  input: service.SaveInput,
): Promise<ActionResult> {
  try {
    const actor = await requirePermission();
    const id = await service.saveContent(actor, input);
    if (input.intent === "publish") refreshPublishedContent();
    refresh();
    return {
      ok: true,
      message:
        input.intent === "publish"
          ? "Published. The website is up to date."
          : "Draft saved. The live website is unchanged.",
      id,
    };
  } catch (e) {
    return failure(e);
  }
}
export async function contentStateAction(
  id: string,
  version: number,
  intent: "publish" | "unpublish" | "delete",
): Promise<ActionResult> {
  try {
    if (!["publish", "unpublish", "delete"].includes(intent))
      throw new Error("Unknown action.");
    const actor = await requirePermission();
    await service.changeContentState(actor, id, version, intent);
    if (intent === "publish" || intent === "unpublish")
      refreshPublishedContent();
    refresh();
    return {
      ok: true,
      message:
        intent === "publish"
          ? "Published."
          : intent === "unpublish"
            ? "Unpublished. The draft is retained."
            : "Draft deleted.",
    };
  } catch (e) {
    return failure(e);
  }
}
export async function saveRoleAction(
  input: Parameters<typeof service.saveRole>[1],
): Promise<ActionResult> {
  try {
    const actor = await requirePermission("roles.manage");
    await service.saveRole(actor, input);
    refresh();
    return { ok: true, message: "Role saved. Permissions apply immediately." };
  } catch (e) {
    return failure(e);
  }
}
export async function createStaffAction(
  input: Parameters<typeof service.createStaff>[1],
): Promise<ActionResult> {
  try {
    const actor = await requirePermission("users.manage");
    await service.createStaff(actor, input);
    refresh();
    return {
      ok: true,
      message:
        "Staff account created. Share the temporary password privately; they must change it at first sign-in.",
    };
  } catch (e) {
    return failure(e);
  }
}
export async function updateStaffAction(
  input: Parameters<typeof service.updateStaff>[1],
): Promise<ActionResult> {
  try {
    const actor = await requirePermission("users.manage");
    await service.updateStaff(actor, input);
    refresh();
    return {
      ok: true,
      message: "Access updated and existing sessions revoked.",
    };
  } catch (e) {
    return failure(e);
  }
}
export async function changePasswordAction(
  currentPassword: string,
  newPassword: string,
): Promise<ActionResult> {
  try {
    const staff = await currentStaff();
    if (!staff) throw new Error("Please sign in again.");
    z.string().min(12).max(128).parse(newPassword);
    await auth.api.changePassword({
      headers: await headers(),
      body: { currentPassword, newPassword, revokeOtherSessions: true },
    });
    await db.transaction(async (tx) => {
      await tx
        .update(user)
        .set({ mustChangePassword: false, updatedAt: new Date() })
        .where(eq(user.id, staff.id));
      await tx.insert(auditLog).values({
        id: crypto.randomUUID(),
        actorId: staff.id,
        actorName: staff.name,
        action: "staff.password_changed",
        target: staff.id,
        detail: "Password changed; other sessions revoked.",
        createdAt: new Date(),
      });
    });
    refresh();
    return { ok: true, message: "Password updated." };
  } catch (e) {
    return failure(e);
  }
}

export async function audioUploadConfigAction() {
  try {
    await requirePermission("media.write");
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset =
      process.env.NEXT_PUBLIC_CLOUDINARY_AUDIO_UPLOAD_PRESET ||
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !preset) throw new Error("Audio upload is not configured.");
    return { ok: true as const, cloud, preset };
  } catch (error) {
    return { ok: false as const, message: failure(error).message };
  }
}
export async function createRecapAction(
  id: string,
  version: number,
): Promise<ActionResult> {
  try {
    const actor = await requirePermission();
    const recapId = await service.createEventRecap(actor, id, version);
    refresh();
    return {
      ok: true,
      id: recapId,
      message:
        "Past gathering draft created. Review and publish it to show its photos in the gallery.",
    };
  } catch (error) {
    return failure(error);
  }
}
