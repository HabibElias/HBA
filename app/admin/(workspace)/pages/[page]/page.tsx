import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { requirePage } from '@/lib/cms/access';
import { db } from '@/lib/db';
import { content } from '@/lib/db/schema';
import { ContentEditor } from '@/components/admin/content-editor';

export default async function PageEditor({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (page !== 'home' && page !== 'about') notFound();
  const staff = await requirePage('content.read');
  const entry = await db.query.content.findFirst({ where: eq(content.id, 'church-settings') });
  if (!entry) notFound();
  return <ContentEditor key={`${page}-${entry.id}-${entry.version}-${entry.publishedVersion}`} entry={{...entry, kind: 'settings'}} permissions={staff.permissions} page={page}/>;
}
