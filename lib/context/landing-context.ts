"use client";
import { useContent } from './content-context';
import { useLanguage } from './language-context';

export function useLandingContent() {
  const { settings } = useContent();
  const { lang } = useLanguage();
  const homeValue = (key: string) => String(settings[key] ?? '');
  const homeText = (key: string) => homeValue(lang === 'am' ? key + 'Am' : key);
  return { homeValue, homeText, settings };
}
