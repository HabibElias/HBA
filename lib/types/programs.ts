export type ProgramCategory = "camp" | "awana" | "conference" | "outreach";

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
}

export interface PastProgramPhoto {
  src: string;
  alt: string;
  caption?: string;
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
  recap: string;
  recapAm: string;
  photos: PastProgramPhoto[];
}
