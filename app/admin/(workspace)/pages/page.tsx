import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { requirePage } from '@/lib/cms/access';
import { editablePages } from '@/lib/cms/pages';

export default async function PagesPage() {
  await requirePage('content.read');
  return <>
    <div className="admin-page-heading"><div><h1>Pages</h1><p>Edit the website’s page text, photographs, and links in English and Amharic.</p></div></div>
    <div className="admin-pages-list">
      {Object.entries(editablePages).map(([slug, page]) => <Link className="admin-page-link" key={slug} href={`/admin/pages/${slug}`}><div><h2>{page.title}</h2><p>{page.description}</p></div><ArrowUpRight size={22} aria-hidden="true"/></Link>)}
    </div>
    <div className="admin-page-content-links"><h2>Manage recurring content</h2><p className="admin-muted">These have their own editors and are not duplicated in Pages.</p><div className="admin-inline-actions">{[['events', 'Programs & events'], ['recaps', 'Past gatherings'], ['schedules', 'Weekly schedule'], ['sermons', 'Sermons'], ['leaders', 'Leadership']].map(([kind, label]) => <Link key={kind} className="admin-button" href={`/admin/content/${kind}`}>{label}</Link>)}</div></div>
  </>;
}
