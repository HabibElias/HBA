import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import {
  ArrowRight,
  Plus,
  Clock3,
  CheckCircle2,
  CalendarDays,
  BookOpen,
  Clock,
  Users,
  Archive,
  Settings,
  Eye,
  Calendar,
} from "lucide-react";
import { requirePage } from "@/lib/cms/access";
import { db } from "@/lib/db";
import { content, auditLog, media } from "@/lib/db/schema";
import { collectionConfig, isCollection } from "@/lib/cms/collections";
import { calculatePulseMetrics, getQuickActions } from "@/lib/admin/overview";

const collectionIcons: Record<string, typeof CalendarDays> = {
  events: CalendarDays,
  sermons: BookOpen,
  schedules: Clock,
  leaders: Users,
  recaps: Archive,
  settings: Settings,
};

export default async function Overview() {
  const staff = await requirePage();
  const [counts, review, mediaResult, activity] = await Promise.all([
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
    db.select({ count: sql<number>`count(*)` }).from(media),
    staff.permissions.includes("audit.read")
      ? db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(6)
      : Promise.resolve([]),
  ]);

  const pulseMetrics = calculatePulseMetrics({
    counts,
    mediaCount: mediaResult[0]?.count ?? 0,
    upcomingEventsCount:
      counts.find((c) => c.kind === "events")?.published ?? 0,
    reviewCount: review.length,
  });

  const quickActions = getQuickActions(staff.permissions);

  const addisDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa",
  }).format(new Date());

  return (
    <>
      {/* 1. Header & Greeting */}
      <div className="admin-page-heading">
        <div>
          <h1>Welcome, {staff.name.split(" ")[0]}.</h1>
          <div className="admin-greeting-meta">
            <span className="admin-role-badge">
              <span className="admin-role-badge-dot" />
              {staff.roleName}
            </span>
            <span className="admin-date-badge">
              <Calendar size={13} />
              {addisDate} · Addis Ababa
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pulse Metrics Strip */}
      <section className="admin-pulse-bar" aria-label="Overview Metrics">
        <div className="admin-pulse-chip">
          <div className="admin-pulse-top">
            <span className="admin-pulse-label">Live Content</span>
            <span className="admin-pulse-indicator live" />
          </div>
          <div className="admin-pulse-value">{pulseMetrics.publishedTotal}</div>
          <div className="admin-pulse-subtext">Across website sections</div>
        </div>

        <div className="admin-pulse-chip">
          <div className="admin-pulse-top">
            <span className="admin-pulse-label">Needs Attention</span>
            <span className="admin-pulse-indicator attention" />
          </div>
          <div className="admin-pulse-value">{pulseMetrics.needsAttention}</div>
          <div className="admin-pulse-subtext">Drafts & pending edits</div>
        </div>

        <div className="admin-pulse-chip">
          <div className="admin-pulse-top">
            <span className="admin-pulse-label">Media Assets</span>
            <span className="admin-pulse-indicator neutral" />
          </div>
          <div className="admin-pulse-value">{pulseMetrics.mediaTotal}</div>
          <div className="admin-pulse-subtext">Photos in library</div>
        </div>

        <div className="admin-pulse-chip">
          <div className="admin-pulse-top">
            <span className="admin-pulse-label">Upcoming Events</span>
            <span className="admin-pulse-indicator gold" />
          </div>
          <div className="admin-pulse-value">{pulseMetrics.upcomingEvents}</div>
          <div className="admin-pulse-subtext">Published gatherings</div>
        </div>
      </section>

      {/* 3. Quick Actions Grid */}
      <section
        className="admin-quick-actions-section"
        aria-label="Quick Actions"
      >
        <div className="admin-section-heading">
          <div>
            <h2>Quick actions</h2>
            <p
              className="admin-muted"
              style={{ fontSize: "12px", marginTop: "2px" }}
            >
              Direct shortcuts to create content or upload photos
            </p>
          </div>
        </div>
        {quickActions.length > 0 ? (
          <div className="admin-quick-actions-grid">
            {quickActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <Link
                  key={action.id}
                  href={action.href}
                  className="admin-quick-action-card"
                >
                  <div className="admin-action-icon">
                    <ActionIcon size={18} />
                  </div>
                  <div className="admin-action-header">
                    <span className="admin-action-title">{action.title}</span>
                    <ArrowRight size={15} className="admin-action-arrow" />
                  </div>
                  <p className="admin-action-subtitle">{action.subtitle}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="admin-quick-actions-empty">
            <Eye size={18} />
            <span>
              Your current role (<strong>{staff.roleName}</strong>) has
              read-only access. Content creation shortcuts are hidden.
            </span>
          </div>
        )}
      </section>

      {/* 4. Two-Column Workspace Split: Content Hub & Aside */}
      <div className="admin-overview-grid">
        <section className="admin-content-hub-section">
          <div className="admin-section-heading">
            <div>
              <h2>Website content</h2>
              <p
                className="admin-muted"
                style={{ fontSize: "12px", marginTop: "2px" }}
              >
                English & Amharic bilingual collections
              </p>
            </div>
          </div>
          <div className="admin-content-hub-grid">
            {Object.entries(collectionConfig).map(([kind, config]) => {
              const count = counts.find((c) => c.kind === kind);
              const total = Number(count?.total) || 0;
              const published = Number(count?.published) || 0;
              const drafts = Math.max(0, total - published);
              const HubIcon = collectionIcons[kind] ?? CalendarDays;
              const canWrite = staff.permissions.includes(`${kind}.write`);

              return (
                <article className="admin-content-hub-card" key={kind}>
                  <div>
                    <div className="admin-content-hub-top">
                      <div className="admin-content-hub-title-group">
                        <div className="admin-content-hub-icon">
                          <HubIcon size={17} />
                        </div>
                        <h3>{config.name}</h3>
                      </div>
                      {drafts > 0 && (
                        <span className="admin-content-hub-badge draft">
                          {drafts} draft{drafts > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    <p>{config.description}</p>
                  </div>

                  <div>
                    <div className="admin-content-hub-meta">
                      <span>{published} published</span>
                      <span>•</span>
                      <span>{total} total</span>
                    </div>

                    <div className="admin-content-hub-footer">
                      <Link
                        href={`/admin/content/${kind}`}
                        className="admin-content-hub-link"
                      >
                        Manage <ArrowRight size={13} />
                      </Link>
                      {kind !== "settings" && canWrite ? (
                        <Link
                          href={`/admin/content/${kind}/new`}
                          className="admin-content-hub-create"
                        >
                          <Plus size={13} /> New{" "}
                          {config.singular.toLowerCase()}
                        </Link>
                      ) : kind === "settings" && canWrite ? (
                        <Link
                          href="/admin/content/settings"
                          className="admin-content-hub-create"
                        >
                          Edit details
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside>
          <section className="admin-review">
            <div className="admin-section-heading">
              <h2>Ready for review</h2>
              <Clock3 size={18} />
            </div>
            {review.length ? (
              review.map((entry) => (
                <Link
                  key={entry.id}
                  className="admin-review-entry"
                  href={`/admin/content/${entry.kind}/${entry.id}`}
                >
                  <div className="admin-review-meta">
                    <span
                      className={`admin-review-badge ${
                        entry.publishedVersion === null ? "new" : "edited"
                      }`}
                    >
                      {entry.publishedVersion === null
                        ? "Draft"
                        : "Changes pending"}
                    </span>
                    <span className="admin-review-kind">
                      {isCollection(entry.kind)
                        ? collectionConfig[entry.kind].singular
                        : entry.kind}
                    </span>
                  </div>
                  <strong>{entry.title}</strong>
                </Link>
              ))
            ) : (
              <div className="admin-review-empty">
                <CheckCircle2 size={24} />
                <strong>You’re all caught up</strong>
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

      {/* 5. Recent Activity Feed */}
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
