import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { ArrowRight, Plus, Clock3, CheckCircle2 } from "lucide-react";
import { requirePage } from "@/lib/cms/access";
import { db } from "@/lib/db";
import { content, auditLog } from "@/lib/db/schema";
import { collectionConfig, isCollection } from "@/lib/cms/collections";
export default async function Overview() {
  const staff = await requirePage();
  const [counts, review, activity] = await Promise.all([
    db
      .select({
        kind: content.kind,
        total: sql<number>`count(*)`,
        published: sql<number>`sum(case when ${content.published} is not null then 1 else 0 end)`,
      })
      .from(content)
      .groupBy(content.kind),
    db
      .select({
        id: content.id,
        kind: content.kind,
        title: content.title,
        publishedVersion: content.publishedVersion,
      })
      .from(content)
      .where(
        sql`(${content.publishedVersion} is null or ${content.version} > ${content.publishedVersion})`,
      )
      .orderBy(desc(content.updatedAt))
      .limit(6),
    staff.permissions.includes("audit.read")
      ? db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(5)
      : Promise.resolve([]),
  ]);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Welcome, {staff.name.split(" ")[0]}.</h1>
          <p>
            Keep our church family informed. Prepare, review, and share what’s
            next.
          </p>
        </div>
        {staff.permissions.includes("events.write") && (
          <Link
            className="admin-button primary"
            href="/admin/content/events/new"
          >
            <Plus size={17} />
            Create an event
          </Link>
        )}
      </div>
      <div className="admin-overview-grid">
        <section>
          <div className="admin-section-heading">
            <h2>Website content</h2>
            <span className="admin-muted">English & Amharic</span>
          </div>
          <div className="admin-collection-list">
            {Object.entries(collectionConfig).map(([kind, config]) => {
              const count = counts.find((c) => c.kind === kind);
              return (
                <div className="admin-collection-row" key={kind}>
                  <Link href={`/admin/content/${kind}`}>
                    <h3>{config.name}</h3>
                    <p>{config.description}</p>
                    <span className="admin-collection-count">
                      {count?.published || 0} published
                    </span>
                  </Link>
                  {kind !== "settings" &&
                  staff.permissions.includes(`${kind}.write`) ? (
                    <Link
                      className="admin-button"
                      href={`/admin/content/${kind}/new`}
                    >
                      <Plus size={16} /> Create {config.singular.toLowerCase()}
                    </Link>
                  ) : (
                    <Link
                      className="admin-text-link"
                      href={`/admin/content/${kind}`}
                    >
                      {kind === "settings" &&
                      staff.permissions.includes("settings.write")
                        ? "Edit details"
                        : "View entries"}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        <aside>
          <section className="admin-review">
            <div className="admin-section-heading">
              <h2>Ready for a review</h2>
              <Clock3 size={18} />
            </div>
            {review.length ? (
              review.map((entry) => (
                <Link
                  key={entry.id}
                  className="admin-review-entry"
                  href={`/admin/content/${entry.kind}/${entry.id}`}
                >
                  <span className="admin-status review">
                    {entry.publishedVersion === null
                      ? "Draft"
                      : "Changes pending"}
                  </span>
                  <strong>{entry.title}</strong>
                  <small>
                    {isCollection(entry.kind)
                      ? collectionConfig[entry.kind].name
                      : entry.kind}
                  </small>
                </Link>
              ))
            ) : (
              <div className="admin-empty compact">
                <CheckCircle2 size={25} />
                <h3>You’re up to date.</h3>
                <p>Drafts and unpublished changes will appear here.</p>
              </div>
            )}
          </section>
          <section className="admin-role-note">
            <h2>Your access</h2>
            <strong>{staff.roleName}</strong>
            <p>
              {staff.permissions.includes("events.publish")
                ? "You can review drafts and publish updates to the website."
                : staff.permissions.includes("events.write")
                  ? "You can prepare drafts. An administrator reviews and publishes your work."
                  : "You can read content and preview drafts."}
            </p>
            <Link href="/admin/roles">
              See role permissions <ArrowRight size={15} />
            </Link>
          </section>
        </aside>
      </div>
      {staff.permissions.includes("audit.read") && (
        <section className="admin-recent">
          <div className="admin-section-heading">
            <h2>Recent activity</h2>
            <Link href="/admin/activity">
              View activity log <ArrowRight size={15} />
            </Link>
          </div>
          {activity.length ? (
            <ul className="admin-activity-list">
              {activity.map((event) => (
                <li key={event.id}>
                  <div>
                    <strong>{event.actorName}</strong>
                    <p>{event.detail}</p>
                  </div>
                  <time>
                    {event.createdAt.toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Africa/Addis_Ababa",
                    })}
                  </time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-muted">
              Content and access changes will be recorded here.
            </p>
          )}
        </section>
      )}
    </>
  );
}
