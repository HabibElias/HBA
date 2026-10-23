import type { AboutPageContent, ChurchSettings, PublicContent } from './public-types';
import { landingDefaults } from './landing';
import { aboutDefaults } from './about';
import { aboutCopyDefaults } from './about-copy';
import { milestones } from '../data/history';
import { guidingPillars } from '../data/values';
import { faithStatements } from '../data/faith';

export type PublicScope = 'shell' | 'home' | 'about' | 'programs' | 'visit';
export const scopeCollections = {
  shell: ['settings', 'schedules'],
  home: ['settings', 'schedules', 'events', 'sermons'],
  about: ['settings', 'leaders'],
  programs: ['settings', 'events', 'recaps'],
  visit: ['settings', 'schedules'],
} as const;

export function upcomingEvents(events: PublicContent['events'], now: number) {
  const iso = (value: string) => value.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
  return events.filter(event => !event.endDate || new Date(iso(event.endDate)).getTime() >= now)
    .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
}

function settingsForScope(settings: ChurchSettings, scope: PublicScope): ChurchSettings {
  const { title, titleAm, address, addressAm, phone, email, telegram } = settings;
  const defaults = scope === 'home' ? landingDefaults : scope === 'about' ? aboutCopyDefaults : {};
  return { title, titleAm, address, addressAm, phone, email, telegram, ...Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [key, settings[key] ?? fallback])) };
}

export function buildAboutContent(settings: ChurchSettings): AboutPageContent {
  const value = (key: string) => settings[key] ?? aboutDefaults[key];
  const fields = (name: string, index: number, keys: string[]) => Object.fromEntries(keys.flatMap(key => ['', 'Am'].map(suffix => {
    const text = String(value(`about_${name}_${index}_${key}${suffix}`) ?? '');
    return [key + suffix, key === 'scriptures' ? text.split('\n').map(line => line.trim()).filter(Boolean) : text];
  })));
  return {
    photos: value('aboutHeroPhotos') as AboutPageContent['photos'],
    milestones: milestones.map((item, i) => ({ ...item, ...fields('history', i, ['period', 'title', 'desc']) })),
    guidingPillars: guidingPillars.map((item, i) => ({id: item.id, ...fields('values', i, ['title', 'description', 'scripture'])})) as AboutPageContent['guidingPillars'],
    faithStatements: faithStatements.map((item, i) => ({id: item.id, ...fields('faith', i, ['title', 'summary', 'scriptures'])})) as AboutPageContent['faithStatements'],
  };
}

// Keep this projection at the server boundary: the browser only receives what
// its route renders, not the full CMS or the editor's field definitions.
export function projectPublicContent(content: PublicContent, scope: PublicScope, now: number): PublicContent {
  const visibleEvents = scope === 'home' || scope === 'programs' ? upcomingEvents(content.events, now) : [];
  return {
    settings: settingsForScope(content.settings, scope),
    events: scope === 'home' ? visibleEvents.slice(0, 4) : visibleEvents,
    sermons: scope === 'home' ? content.sermons.slice(0, 6) : [],
    recaps: scope === 'programs' ? [...content.recaps].sort((a,b) => b.year - a.year) : [],
    leaders: scope === 'about' ? content.leaders : [],
    schedules: ['home', 'visit'].includes(scope) ? content.schedules : scope === 'shell' ? content.schedules.map(({photos: _photos, ...schedule}) => schedule) : [],
    ...(scope === 'about' ? { about: buildAboutContent(content.settings) } : {}),
  };
}
