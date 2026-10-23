import type { UpcomingEvent, PastProgram } from "@/lib/types/programs";
import type { ScheduleItem } from "@/lib/data/schedules";
import type { Leader } from "@/lib/data/leadership";
import type { Sermon } from "@/lib/data/sermons";
import type { StatementOfFaith } from '../data/faith';
import type { GuidingPillar } from '../data/values';
import type { milestones } from '../data/history';
export interface AboutPageContent {
  photos: { src: string; alt: string }[];
  milestones: typeof milestones;
  guidingPillars: Pick<GuidingPillar, 'id' | 'title' | 'titleAm' | 'description' | 'descriptionAm' | 'scripture' | 'scriptureAm'>[];
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
  about?: AboutPageContent;
  events: UpcomingEvent[];
  recaps: (PastProgram & { recordingUrl?: string })[];
  sermons: Sermon[];
  schedules: ScheduleItem[];
  leaders: Leader[];
  settings: ChurchSettings;
}
