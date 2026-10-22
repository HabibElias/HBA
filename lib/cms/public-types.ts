import type { UpcomingEvent, PastProgram } from "@/lib/types/programs";
import type { ScheduleItem } from "@/lib/data/schedules";
import type { Leader } from "@/lib/data/leadership";
import type { Sermon } from "@/lib/data/sermons";
export interface ChurchSettings {
  title: string;
  titleAm: string;
  address: string;
  addressAm: string;
  phone: string;
  email: string;
  telegram: string;
}
export interface PublicContent {
  events: UpcomingEvent[];
  recaps: (PastProgram & { recordingUrl?: string })[];
  sermons: Sermon[];
  schedules: ScheduleItem[];
  leaders: Leader[];
  settings: ChurchSettings;
}
