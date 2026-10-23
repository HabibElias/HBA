import type { Field } from './collections';
import { aboutCopyDefaults, aboutCopyFields } from './about-copy';
import { milestones } from '../data/history';
import { guidingPillars } from '../data/values';
import { faithStatements } from '../data/faith';

export const aboutDefaults: Record<string, unknown> = { ...aboutCopyDefaults };
export const aboutFields: Field[] = [...aboutCopyFields];
const groups = [
  { name: 'history', group: 'about-founding-timeline', items: milestones, keys: ['period', 'title', 'desc'] },
  { name: 'values', group: 'about-values-pillars', items: guidingPillars, keys: ['title', 'description', 'scripture'] },
  { name: 'faith', group: 'about-faith-accordion', items: faithStatements, keys: ['title', 'summary', 'scriptures'] },
];
for (const { name, group, items, keys } of groups) {
  items.forEach((item, index) => {
    const record = item as unknown as Record<string, unknown>;
    for (const property of keys) for (const suffix of ['', 'Am']) {
      const key = `about_${name}_${index}_${property}${suffix}`;
      const value = record[property + suffix];
      aboutDefaults[key] = Array.isArray(value) ? value.join('\n') : value;
      aboutFields.push({ key, group, label: `${item.title} · ${property === 'desc' ? 'Description' : property}${suffix ? ' · Amharic' : ''}`, type: ['desc', 'description', 'summary', 'scriptures'].includes(property) ? 'textarea' : undefined, hint: property === 'scriptures' ? 'One scripture reference per line.' : undefined });
    }
  });
}
export const aboutHeroPhotos = [
  { src: '/gallery/photo_2_2026-08-27_14-11-14.jpg', alt: 'Our church family in fellowship' },
  { src: '/gallery/photo_18_2026-08-27_14-11-14.jpg', alt: 'The Summit sanctuary' },
  { src: '/gallery/photo_10_2026-08-27_14-11-14.jpg', alt: 'Learning from the Word together' },
];
aboutDefaults.aboutHeroPhotos = aboutHeroPhotos;
aboutFields.push({ key: 'aboutHeroPhotos', label: 'Hero photographs', type: 'photos', group: 'about-story-hero', hint: 'Shown in the selected order. Remove a photograph to hide it.' });
