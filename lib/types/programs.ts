export type ProgramCategory =
  | "camp"
  | "awana"
  | "conference"
  | "outreach"
  | "worship";

export interface UpcomingEvent {
  id: string;
  title: string;
  titleAm: string;
  theme?: string;
  themeAm?: string;
  date: string;
  dateAm: string;
  time: string;
  timeAm: string;
  location: string;
  locationAm: string;
  description: string;
  descriptionAm: string;
  category: ProgramCategory;
  categoryLabel: string;
  categoryLabelAm: string;
  registerLink: string;
  image: string;
  startDate?: string;
  endDate?: string;
  notice?: string;
  noticeAm?: string;
}

export interface PastProgramPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImpactMetric {
  label: string;
  labelAm: string;
  value: string;
}

export interface PastProgram {
  id: string;
  year: number;
  category: ProgramCategory;
  categoryLabel: string;
  categoryLabelAm: string;
  title: string;
  titleAm: string;
  date: string;
  dateAm: string;
  location: string;
  locationAm: string;
  attendeeCount: number;
  scripture?: string;
  scriptureAm?: string;
  metrics?: ImpactMetric[];
  audioLabel?: string;
  audioLabelAm?: string;
  photoCount?: number;
  recap: string;
  recapAm: string;
  photos: PastProgramPhoto[];
}
