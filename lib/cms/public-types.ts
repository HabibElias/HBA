import type { UpcomingEvent, PastProgram } from "@/lib/types/programs";
import type { ScheduleItem } from "@/lib/data/schedules";
import type { Leader } from "@/lib/data/leadership";
import type { Sermon } from "@/lib/data/sermons";
import type { StatementOfFaith } from "../data/faith";
import type { GuidingPillar } from "../data/values";
import type { milestones } from "../data/history";
export interface AboutPageContent {
  photos: { src: string; alt: string }[];
  milestones: typeof milestones;
  guidingPillars: Pick<
    GuidingPillar,
    | "id"
    | "title"
    | "titleAm"
    | "description"
    | "descriptionAm"
    | "scripture"
    | "scriptureAm"
  >[];
  faithStatements: StatementOfFaith[];
}
export interface ChurchSettings {
  [key: string]: unknown;
  title: string;
  titleAm: string;
  address: string;
  addressAm: string;
  phone: string;
  email: string;
  telegram: string;
}
export interface PublicContent {
  albums?: GalleryAlbum[];
  gallery?: GalleryPhoto[];
  about?: AboutPageContent;
  events: UpcomingEvent[];
  recaps: (PastProgram & { recordingUrl?: string })[];
  sermons: Sermon[];
  schedules: ScheduleItem[];
  leaders: Leader[];
  settings: ChurchSettings;
}
export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  titleAm: string;
  caption: string;
  captionAm: string;
  album: string;
  albumAm: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  titleAm: string;
  date: string;
  dateAm: string;
  description?: string;
  descriptionAm?: string;
  photos: { src: string; alt: string; caption?: string; isMain?: boolean }[];
  recapId?: string;
}
