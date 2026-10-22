import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, roles } from "@/lib/db/schema";
import { allPermissions, hasPermission } from "./permissions";

export class AccessError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function currentStaff() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const [staff] = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      roleId: user.roleId,
      roleName: roles.name,
      permissions: roles.permissions,
      mustChangePassword: user.mustChangePassword,
    })
    .from(user)
    .innerJoin(roles, eq(user.roleId, roles.id))
    .where(eq(user.id, session.user.id));
  if (!staff?.active) return null;
  return {
    ...staff,
    permissions: staff.roleId === "owner" ? allPermissions : staff.permissions,
  };
}
export async function requirePermission(permission = "content.read") {
  const staff = await currentStaff();
  if (!staff) throw new AccessError(401, "Please sign in again.");
  if (staff.mustChangePassword)
    throw new AccessError(
      403,
      "Change your temporary password before continuing.",
    );
  if (!hasPermission(staff.permissions, permission))
    throw new AccessError(403, "Your role does not allow this action.");
  return staff;
}
export async function requirePage(permission = "content.read") {
  const staff = await currentStaff();
  if (!staff) redirect("/admin/login");
  if (staff.mustChangePassword) redirect("/admin/password");
  if (!hasPermission(staff.permissions, permission))
    redirect("/admin/forbidden");
  return staff;
}
