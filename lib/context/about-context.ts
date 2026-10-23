"use client";
import { useContent } from './content-context';
import { useLanguage } from './language-context';

export function useAboutContent() {
  const { settings, about } = useContent();
  const { lang } = useLanguage();
  if (!about) throw new Error('About page content is required.');
  const pageValue = (key: string) => String(settings[key] ?? '');
  const pageText = (key: string) => pageValue(key + (lang === 'am' ? 'Am' : ''));
  return { pageValue, pageText, ...about };
}
