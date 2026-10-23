import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  BookOpen,
  Clock,
  Users,
  Archive,
  Upload,
} from "lucide-react";

/**
 * Definition for an admin dashboard quick action.
 * Note: `icon` is a React component (LucideIcon). When passing actions across
 * a Server-to-Client Component boundary, serialize using `iconName` instead
 * of passing `icon` directly.
 */
export interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  permission: string;
  icon: LucideIcon;
  iconName: string;
}

export const QUICK_ACTIONS: readonly QuickAction[] = [
  {
    id: "new-event",
    title: "New event",
    subtitle: "Announce a gathering or assembly",
    href: "/admin/content/events/new",
    permission: "events.write",
    icon: CalendarDays,
    iconName: "CalendarDays",
  },
  {
    id: "new-sermon",
    title: "New sermon",
    subtitle: "Add teaching audio & study notes",
    href: "/admin/content/sermons/new",
    permission: "sermons.write",
    icon: BookOpen,
    iconName: "BookOpen",
  },
  {
    id: "new-schedule",
    title: "New gathering",
    subtitle: "Update regular weekly service times",
    href: "/admin/content/schedules/new",
    permission: "schedules.write",
    icon: Clock,
    iconName: "Clock",
  },
  {
    id: "new-leader",
    title: "New profile",
    subtitle: "Add a pastor or ministry director",
    href: "/admin/content/leaders/new",
    permission: "leaders.write",
    icon: Users,
    iconName: "Users",
  },
  {
    id: "new-recap",
    title: "New recap",
    subtitle: "Archive photos & past assembly recap",
    href: "/admin/content/recaps/new",
    permission: "recaps.write",
    icon: Archive,
    iconName: "Archive",
  },
  {
    id: "upload-photo",
    title: "Upload photos",
    subtitle: "Add high-res photos to media library",
    href: "/admin/media",
    permission: "media.write",
    icon: Upload,
    iconName: "Upload",
  },
] as const;

export function getQuickActions(
  permissions: readonly string[] = [],
): QuickAction[] {
  const permSet = new Set(permissions ?? []);
  return QUICK_ACTIONS.filter((action) => permSet.has(action.permission));
}

export interface ContentCount {
  kind: string;
  total?: number;
  published?: number | null;
}

export interface PulseMetricsInput {
  counts?: ContentCount[] | null;
  mediaCount?: number | string | null;
  upcomingEventsCount?: number | string | null;
  reviewCount?: number | string | null;
}

export interface PulseMetrics {
  publishedTotal: number;
  needsAttention: number;
  mediaTotal: number;
  upcomingEvents: number;
}

export function calculatePulseMetrics({
  counts = [],
  mediaCount = 0,
  upcomingEventsCount = 0,
  reviewCount = 0,
}: PulseMetricsInput = {}): PulseMetrics {
  const safeCounts = Array.isArray(counts) ? counts : [];
  const publishedTotal = safeCounts.reduce(
    (acc, curr) => acc + (Number(curr?.published) || 0),
    0,
  );

  return {
    publishedTotal,
    needsAttention: Number(reviewCount) || 0,
    mediaTotal: Number(mediaCount) || 0,
    upcomingEvents: Number(upcomingEventsCount) || 0,
  };
}
