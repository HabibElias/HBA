import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { roles, user } from "@/lib/db/schema";
import { requirePage } from "@/lib/cms/access";
import { StaffManager } from "@/components/admin/staff-manager";
export default async function StaffPage() {
  const staff = await requirePage("users.manage");
  const [people, allRoles] = await Promise.all([
    db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        active: user.active,
        mustChangePassword: user.mustChangePassword,
      })
      .from(user)
      .orderBy(asc(user.name)),
    db.select().from(roles),
  ]);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Staff access</h1>
          <p>
            Manage your team, their responsibilities, and their access to the
            workspace.
          </p>
        </div>
      </div>
      <StaffManager people={people} roles={allRoles} actor={staff} />
    </>
  );
}
