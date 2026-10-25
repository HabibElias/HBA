import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { media, content, auditLog } from '../db/schema';
import type { Actor } from './service';
import { pageDefaults } from './pages';

const photoRevision = z.object({
  id: z.string().min(1).max(200),
  previousName: z.string().max(160),
  previousAlt: z.string().max(300),
});
export type MediaRevision = z.infer<typeof photoRevision>;

export function containsMediaReference(value: unknown, sources: readonly string[]): boolean {
  if (typeof value === 'string') return sources.includes(value);
  if (Array.isArray(value)) return value.some(item => containsMediaReference(item, sources));
  if (value && typeof value === 'object') return Object.values(value).some(item => containsMediaReference(item, sources));
  return false;
}

/** Metadata changes apply to library selections; published content keeps its own descriptions. */
export async function manageMedia(actor: Actor, input: MediaRevision & ({ intent: 'edit'; name: string; alt: string } | { intent: 'remove' })) {
  if (!actor.permissions.includes('media.write')) throw new Error('Your role does not allow this action.');
  const revision = photoRevision.parse(input);
  if (input.intent !== 'edit' && input.intent !== 'remove') throw new Error('Unknown media action.');
  const edited = input.intent === 'edit' ? z.object({ name: z.string().trim().min(1).max(160), alt: z.string().trim().min(3).max(300) }).parse(input) : null;
  await db.transaction(async tx => {
    const photo = await tx.query.media.findFirst({ where: eq(media.id, revision.id) });
    if (!photo) throw new Error('This photograph is no longer in the library. Reload the page.');
    if (photo.name !== revision.previousName || photo.alt !== revision.previousAlt) throw new Error('Someone edited this photograph. Reload the library before trying again.');
    if (input.intent === 'remove') {
      const sources = [`/api/media/${photo.id}`, ...(photo.url ? [photo.url] : [])];
      const records = await tx.select({ title: content.title, draft: content.draft, published: content.published }).from(content);
      const uses = records.filter(record => containsMediaReference(record.draft, sources) || containsMediaReference(record.published, sources));
      if (uses.length) throw new Error(`This photograph is used in ${[...new Set(uses.map(record => record.title))].slice(0, 3).join(', ')}. Replace it in both drafts and published content before removing it.`);
      if (containsMediaReference(pageDefaults, sources)) throw new Error('This photograph is a default page image and cannot be removed from the library.');
    }
    const where = and(eq(media.id, photo.id), eq(media.name, revision.previousName), eq(media.alt, revision.previousAlt));
    const changed = edited
      ? await tx.update(media).set(edited).where(where).returning({ id: media.id })
      : await tx.delete(media).where(where).returning({ id: media.id });
    if (!changed.length) throw new Error('This photograph changed. Reload the library before trying again.');
    await tx.insert(auditLog).values({ id: crypto.randomUUID(), actorId: actor.id, actorName: actor.name, action: edited ? 'media.updated' : 'media.removed', target: photo.id, detail: edited?.name ?? photo.name, createdAt: new Date() });
  });
}
