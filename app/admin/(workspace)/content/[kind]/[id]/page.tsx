import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { requirePage } from "@/lib/cms/access";
import { isCollection, newContent } from "@/lib/cms/collections";
import { db } from "@/lib/db";
import { content } from "@/lib/db/schema";
import { ContentEditor } from "@/components/admin/content-editor";
export default async function EditorPage({
  params,
}: {
  params: Promise<{ kind: string; id: string }>;
}) {
  const { kind, id } = await params;
  if (!isCollection(kind)) notFound();
  const staff = await requirePage(
    id === "new" ? `${kind}.write` : "content.read",
  );
  if (id === "new") {
    if (kind === "settings") notFound();
    return (
      <ContentEditor
        entry={{
          kind,
          title: "",
          draft: newContent(kind),
          version: 0,
          position: 0,
          publishedVersion: null,
        }}
        permissions={staff.permissions}
      />
    );
  }
  const entry = await db.query.content.findFirst({
    where: and(eq(content.id, id), eq(content.kind, kind)),
  });
  if (!entry) notFound();
  return (
    <ContentEditor
      key={`${entry.id}-${entry.version}-${entry.publishedVersion}`}
      entry={{ ...entry, kind }}
      permissions={staff.permissions}
    />
  );
}
