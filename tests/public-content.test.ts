import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projectPublicContent, upcomingEvents as filterEvents, newestSermons, buildGalleryPhotos } from '../lib/cms/public-data';
import { upcomingEvents } from '../lib/data/upcoming-events';
import { weeklySchedules } from '../lib/data/schedules';
import { recentSermons } from '../lib/data/sermons';
import { pastoralTeam } from '../lib/data/leadership';
import { pastPrograms } from '../lib/data/past-programs';
import type { PublicContent } from '../lib/cms/public-types';

const now = Date.parse('2026-10-23T12:00:00Z');
const content: PublicContent = {
  settings: { title: 'Summit', titleAm: 'ሰሚት', address: 'Summit', addressAm: 'ሰሚት', phone: '+251911234567', email: 'church@example.test', telegram: 'https://t.me/Summit', home_hero_section_4: 'Home heading', about_story_hero_1: 'About heading', about_faith_0_summary: 'Updated faith statement', about_faith_0_scriptures: 'John 1:1\n\nPsalm 23:1', homeHeroPhotos: [], aboutHeroPhotos: [] },
  events: Array.from({ length: 10 }, (_, i) => ({ ...upcomingEvents[0], id: `event-${i}`, startDate: `209901${String(i+1).padStart(2, '0')}T080000Z`, endDate: '20990201T100000Z' })),
  sermons: Array.from({ length: 10 }, (_, i) => ({ ...recentSermons[0], id: `sermon-${i}` })),
  schedules: weeklySchedules.map(schedule => ({ ...schedule, photos: [{ src: '/gallery/fixture.jpg', alt: 'Fixture' }] })),
  recaps: pastPrograms,
  leaders: pastoralTeam,
};

test('shared navigation payload excludes page copy, galleries, and unrelated collections', () => {
  const shell = projectPublicContent(content, 'shell', now);
  assert.equal(shell.settings.phone, content.settings.phone);
  assert.equal(shell.settings.home_hero_section_4, undefined);
  assert.equal(shell.settings.about_story_hero_1, undefined);
  assert(shell.schedules.every(schedule => !schedule.photos));
  assert.deepEqual([shell.events, shell.recaps, shell.leaders, shell.sermons], [[], [], [], []]);
});

test('homepage previews are bounded and include only their own editable settings', () => {
  const home = projectPublicContent(content, 'home', now);
  assert.equal(home.events.length, 4);
  assert.equal(home.sermons.length, 4);
  assert.equal(home.settings.home_hero_section_4, 'Home heading');
  assert.deepEqual(home.settings.homeHeroPhotos, []);
  assert.equal(home.settings.about_story_hero_1, undefined);
  assert.deepEqual(home.recaps, []);
  assert.deepEqual(home.leaders, []);
});

test('About projection resolves bilingual defaults and editable lists on the server', () => {
  const about = projectPublicContent(content, 'about', now);
  assert.equal(about.settings.about_story_hero_1, 'About heading');
  assert.equal(about.settings.home_hero_section_4, undefined);
  assert.equal(about.settings.about_faith_0_summary, undefined);
  assert.equal(about.about?.faithStatements[0].summary, 'Updated faith statement');
  assert(about.about?.faithStatements[0].summaryAm);
  assert.deepEqual(about.about?.faithStatements[0].scriptures, ['John 1:1', 'Psalm 23:1']);
  assert.deepEqual(about.about?.photos, []);
  assert.deepEqual(about.schedules, []);
});

test('Visit keeps schedule photos without shipping other pages or collections', () => {
  const visit = projectPublicContent(content, 'visit', now);
  assert.equal(visit.schedules[0].photos?.[0].src, '/gallery/fixture.jpg');
  assert.deepEqual([visit.events, visit.recaps, visit.leaders, visit.sermons], [[], [], [], []]);
  assert.equal(visit.settings.about_story_hero_1, undefined);
});

test('expired events disappear as time advances without mutating cached records', () => {
  const event = { ...upcomingEvents[0], startDate: '20261023T100000Z', endDate: '20261023T120000Z' };
  const input = [event];
  assert.equal(filterEvents(input, now - 1).length, 1);
  assert.equal(filterEvents(input, now + 1).length, 0);
  assert.equal(input.length, 1);
  assert.equal(input[0], event);
});

test('latest published sermon leads Home and Sermons without mutating collection order', () => {
  const sermons = [
    { ...recentSermons[0], id: 'old', publishedAt: '2026-09-01T10:00:00Z' },
    { ...recentSermons[1], id: 'new', publishedAt: '2026-10-24T10:00:00Z' },
    { ...recentSermons[2], id: 'legacy' },
  ];
  assert.deepEqual(newestSermons(sermons).map(item => item.id), ['new', 'old', 'legacy']);
  assert.equal(sermons[0].id, 'old');
  assert.equal(projectPublicContent({ ...content, sermons }, 'home', now).sermons[0].id, 'new');
  const page = projectPublicContent(content, 'sermons', now);
  assert.equal(page.sermons.length, 10);
  assert.deepEqual([page.events, page.recaps, page.leaders, page.schedules], [[], [], [], []]);
  assert.equal(page.settings.home_hero_section_4, undefined);
});

test('gallery combines editable moments and published recap photos once, including CDN URLs', () => {
  const settings = { ...content.settings, home_gallery_preview_card1_image: 'https://res.cloudinary.com/church/image/upload/moment.jpg', home_gallery_preview_card1_title: 'Published moment', home_gallery_preview_card2_image: 'https://res.cloudinary.com/church/image/upload/moment.jpg' };
  const recaps = [{ ...pastPrograms[0], photos: [{ src: '/gallery/unique.jpg', alt: 'Published recap photo' }, { src: 'https://res.cloudinary.com/church/image/upload/moment.jpg', alt: 'Repeated photo' }] }];
  const photos = buildGalleryPhotos(settings, recaps);
  assert.equal(photos[0].title, 'Published moment');
  assert.equal(photos.filter(photo => photo.src.includes('moment.jpg')).length, 1);
  assert(photos.some(photo => photo.src === '/gallery/unique.jpg'));
  const page = projectPublicContent({ ...content, settings, recaps }, 'gallery', now);
  assert.deepEqual(page.gallery, photos);
  assert.deepEqual([page.events, page.sermons, page.recaps, page.schedules, page.leaders], [[], [], [], [], []]);
  assert.equal(page.settings.home_hero_section_4, undefined);
});

test('legacy archive links point at dedicated destinations without replacing custom links', () => {
  const home = projectPublicContent({ ...content, settings: { ...content.settings, home_gallery_preview_3: '/programs#photos', home_sermon_preview_3: '/programs#archive', home_community_connect_card2_link: 'https://example.test/messages' } }, 'home', now);
  assert.equal(home.settings.home_gallery_preview_3, '/gallery');
  assert.equal(home.settings.home_sermon_preview_3, '/sermons');
  assert.equal(home.settings.home_community_connect_card2_link, 'https://example.test/messages');
});
