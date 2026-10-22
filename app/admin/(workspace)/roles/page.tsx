import { db } from "@/lib/db";
import { roles } from "@/lib/db/schema";
import { requirePage } from "@/lib/cms/access";
import { RolesManager } from "@/components/admin/roles-manager";
export default async function RolesPage() {
  const staff = await requirePage();
  const entries = await db.select().from(roles);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Roles & permissions</h1>
          <p>Give each person the access they need to care for the website.</p>
        </div>
      </div>
      <RolesManager
        roles={entries}
        canManage={staff.permissions.includes("roles.manage")}
      />
    </>
  );
}
