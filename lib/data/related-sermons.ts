import type { Sermon } from "./sermons";

/** Published input is already newest-first; stable sorting retains that order for ties. */
export function relatedSermons(current: Sermon, published: Sermon[]) {
  const matches = (a: string, b: string) =>
    Boolean(a.trim()) &&
    a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase();
  const score = (sermon: Sermon) =>
    Number(matches(current.series, sermon.series)) * 4 +
    Number(matches(current.scripture, sermon.scripture)) * 2 +
    Number(matches(current.speaker, sermon.speaker));
  return published
    .filter((sermon) => sermon.id !== current.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 3);
}
