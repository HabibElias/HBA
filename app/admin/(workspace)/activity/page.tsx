import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";
import { requirePage } from "@/lib/cms/access";
export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requirePage("audit.read");
  const search = await searchParams,
    page = Math.max(1, Number(search.page) || 1);
  const [entries, [count]] = await Promise.all([
    db
      .select()
      .from(auditLog)
      .orderBy(desc(auditLog.createdAt))
      .limit(30)
      .offset((page - 1) * 30),
    db.select({ value: sql<number>`count(*)` }).from(auditLog),
  ]);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Activity log</h1>
          <p>
            A record of content publishing and staff access changes. Times are
            shown in EAT.
          </p>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">When</th>
              <th scope="col">Who</th>
              <th scope="col">Action</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="admin-nowrap">
                  {e.createdAt.toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Africa/Addis_Ababa",
                  })}
                </td>
                <td>{e.actorName}</td>
                <td>{e.action.replaceAll(".", " · ").replaceAll("_", " ")}</td>
                <td>{e.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!entries.length && (
          <div className="admin-empty">
            <h2>No changes recorded yet.</h2>
            <p>Publishing, role updates, and staff changes will appear here.</p>
          </div>
        )}
      </div>
      <div className="admin-pagination">
        <span>{count.value} recorded changes</span>
        <div>
          {page > 1 && (
            <Link
              className="admin-button"
              href={`/admin/activity?page=${page - 1}`}
            >
              Previous
            </Link>
          )}
          {page * 30 < count.value && (
            <Link
              className="admin-button"
              href={`/admin/activity?page=${page + 1}`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
