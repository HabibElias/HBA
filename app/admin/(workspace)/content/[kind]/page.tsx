import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldSelect } from "@/components/ui/field-select";
import Link from "next/link";
import { and, asc, desc, eq, isNull, isNotNull, like, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Plus, Search, ArrowUpRight, FileText } from "lucide-react";
import { requirePage } from "@/lib/cms/access";
import { isCollection, collectionConfig } from "@/lib/cms/collections";
import { db } from "@/lib/db";
import { content } from "@/lib/db/schema";
export default async function ContentList({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const staff = await requirePage();
  const { kind } = await params;
  if (!isCollection(kind)) notFound();
  const config = collectionConfig[kind],
    canCreate =
      kind !== "settings" && staff.permissions.includes(`${kind}.write`),
    search = await searchParams,
    q = String(search.q || "").slice(0, 100),
    page = Math.max(1, Math.min(10000, Number(search.page) || 1));
  const where = and(
    eq(content.kind, kind),
    q ? like(content.title, `%${q}%`) : undefined,
    search.status === "draft"
      ? isNull(content.published)
      : search.status === "published"
        ? isNotNull(content.published)
        : search.status === "review"
          ? sql`(${content.publishedVersion} is null or ${content.version} > ${content.publishedVersion})`
          : undefined,
  );
  const [entries, [count]] = await Promise.all([
    db
      .select({
        id: content.id,
        title: content.title,
        version: content.version,
        publishedVersion: content.publishedVersion,
        updatedAt: content.updatedAt,
      })
      .from(content)
      .where(where)
      .orderBy(desc(content.updatedAt), asc(content.title))
      .limit(20)
      .offset((page - 1) * 20),
    db
      .select({ value: sql<number>`count(*)` })
      .from(content)
      .where(where),
  ]);
  const pageLink = (n: number) =>
    `/admin/content/${kind}?${new URLSearchParams({ q, status: search.status || "", page: String(n) })}`;
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>{config.name}</h1>
          <p>{config.description}</p>
        </div>
      </div>
      <div
        className="admin-content-actions"
        role="group"
        aria-label={`${config.name} actions`}
      >
        <Link
          className="admin-text-link"
          href={config.publicPath}
          target="_blank"
        >
          View on website <ArrowUpRight size={14} />
        </Link>
        {canCreate && (
          <Link
            className="admin-button primary"
            href={`/admin/content/${kind}/new`}
          >
            <Plus size={17} />
            Create {config.singular.toLowerCase()}
          </Link>
        )}
      </div>
      <form className="admin-list-toolbar">
        <Label className="admin-search">
          <Search size={18} />
          <Input
            name="q"
            defaultValue={q}
            placeholder={`Search ${config.name.toLowerCase()}`}
            aria-label="Search content"
          />
        </Label>
        <FieldSelect name="status" defaultValue={search.status || ""} aria-label="Publication status" options={[{value: "", label: "All statuses"}, {value: "draft", label: "Drafts"}, {value: "review", label: "Needs publishing"}, {value: "published", label: "Published"}]} />
        <Button type="submit" className="admin-button">
          Apply filters
        </Button>
        {(q || search.status) && (
          <Link className="admin-text-link" href={`/admin/content/${kind}`}>
            Clear
          </Link>
        )}
      </form>
      <div className="admin-list-caption">
        <span>
          {count.value} {count.value === 1 ? "entry" : "entries"}
        </span>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Last updated</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <Link
                    className="admin-entry-title"
                    href={`/admin/content/${kind}/${entry.id}`}
                  >
                    <FileText size={17} />
                    {entry.title}
                  </Link>
                </td>
                <td>
                  <span
                    className={`admin-status ${entry.publishedVersion === null ? "draft" : entry.version > entry.publishedVersion ? "review" : "published"}`}
                  >
                    {entry.publishedVersion === null
                      ? "Draft"
                      : entry.version > entry.publishedVersion
                        ? "Unpublished changes"
                        : "Published"}
                  </span>
                </td>
                <td>
                  <time dateTime={entry.updatedAt.toISOString()}>
                    {entry.updatedAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "Africa/Addis_Ababa",
                    })}
                  </time>
                </td>
                <td>
                  <Link
                    className="admin-text-link"
                    href={`/admin/content/${kind}/${entry.id}`}
                  >
                    {staff.permissions.includes(`${kind}.write`)
                      ? "Edit"
                      : "View"}
                    <span className="sr-only"> {entry.title}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!entries.length && (
          <div className="admin-empty">
            <h2>
              {q || search.status
                ? "No matching entries"
                : "Your next story starts here."}
            </h2>
            <p>
              {q || search.status
                ? "Try another search or clear the filters."
                : "Create a draft. It stays private until someone with publishing access approves it."}
            </p>
          </div>
        )}
      </div>
      <div className="admin-pagination">
        <span>
          Page {page} of {Math.max(1, Math.ceil(count.value / 20))}
        </span>
        <div>
          {page > 1 && (
            <Link className="admin-button" href={pageLink(page - 1)}>
              Previous
            </Link>
          )}
          {page * 20 < count.value && (
            <Link className="admin-button" href={pageLink(page + 1)}>
              Next
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
