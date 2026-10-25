import { landingDefaults } from './landing';
import { aboutDefaults } from './about';

export const pageDefaults = { ...landingDefaults, ...aboutDefaults };
export const editablePages = {
  home: { title: 'Home', path: '/', description: 'Welcome text, photographs, ministry cards, gallery, and visitor information.', groups: ['hero-section', 'about-intro', 'ministries-preview', 'gallery-preview', 'visit-cta', 'community-connect'] },
  about: { title: 'About', path: '/about', description: 'Our story, calling, history, values, beliefs, and invitation to visit.', groups: ['about-story-hero', 'about-scripture-banner', 'about-founding-timeline', 'about-values-pillars', 'about-faith-accordion', 'about-leadership-grid', 'about-about-visit-cta'] },
};
export type EditablePage = keyof typeof editablePages;
export const sectionLabels: Record<string, string> = {
  'hero-section': 'Hero', 'about-intro': 'About introduction', 'ministries-preview': 'Ministries', 'gallery-preview': 'Photo gallery', 'visit-cta': 'Visit invitation', 'community-connect': 'Community links',
  'about-story-hero': 'Hero', 'about-scripture-banner': 'Calling & vision', 'about-founding-timeline': 'Story & timeline', 'about-values-pillars': 'Values', 'about-faith-accordion': 'Statement of faith', 'about-leadership-grid': 'Leadership introduction', 'about-about-visit-cta': 'Visit invitation',
};
