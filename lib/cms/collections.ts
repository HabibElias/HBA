import { z } from "zod";
import { isCloudinaryImage } from "../cloudinary";
import { collections, type Collection } from "./permissions";

export interface Field {
  key: string;
  label: string;
  type?:
    | "textarea"
    | "select"
    | "image"
    | "photos"
    | "number"
    | "datetime"
    | "email"
    | "url";
  required?: boolean;
  options?: string[];
  hint?: string;
}
const pair = (
  key: string,
  label: string,
  options: Partial<Field> = {},
): Field[] => [
  { key, label, ...options },
  { key: `${key}Am`, label: `${label} · አማርኛ`, ...options },
];
const categories = ["camp", "awana", "conference", "outreach", "worship"];
export const collectionConfig: Record<
  Collection,
  {
    name: string;
    singular: string;
    description: string;
    publicPath: string;
    fields: Field[];
  }
> = {
  events: {
    name: "Programs & events",
    singular: "Event",
    description:
      "Plan upcoming gatherings and keep dates, locations, and invitations current.",
    publicPath: "/programs#upcoming",
    fields: [
      ...pair("title", "Event title", { required: true }),
      ...pair("description", "Description", {
        type: "textarea",
        required: true,
      }),
      ...pair("theme", "Theme / scripture"),
      ...pair("date", "Displayed date", { required: true }),
      ...pair("time", "Displayed time", { required: true }),
      ...pair("location", "Location", { required: true }),
      ...pair("notice", "Attending information", { type: "textarea" }),
      {
        key: "category",
        label: "Category",
        type: "select",
        options: categories,
        required: true,
      },
      ...pair("categoryLabel", "Category label", { required: true }),
      {
        key: "startDate",
        label: "Starts · East Africa Time",
        type: "datetime",
        required: true,
        hint: "Used to sort events and generate calendar downloads.",
      },
      {
        key: "endDate",
        label: "Ends · East Africa Time",
        type: "datetime",
        required: true,
      },
      {
        key: "image",
        label: "Event photograph",
        type: "image",
        required: true,
      },
      {
        key: "registerLink",
        label: "Attendance link",
        type: "url",
        hint: "Optional. Leave empty to use the church contact page.",
      },
    ],
  },
  recaps: {
    name: "Past gatherings",
    singular: "Recap",
    description:
      "Preserve the stories and photographs from completed programs.",
    publicPath: "/programs#archive",
    fields: [
      ...pair("title", "Gathering title", { required: true }),
      ...pair("recap", "Recap", { type: "textarea", required: true }),
      ...pair("date", "Displayed date", { required: true }),
      ...pair("location", "Location", { required: true }),
      ...pair("scripture", "Scripture"),
      { key: "year", label: "Gregorian year", type: "number", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: categories,
        required: true,
      },
      ...pair("categoryLabel", "Category label", { required: true }),
      { key: "photos", label: "Gallery photographs", type: "photos" },
      { key: "recordingUrl", label: "Recording link", type: "url" },
    ],
  },
  sermons: {
    name: "Sermons & teaching",
    singular: "Sermon",
    description: "Manage the recent messages shown on the home page.",
    publicPath: "/#sermons",
    fields: [
      ...pair("title", "Message title", { required: true }),
      ...pair("speaker", "Speaker", { required: true }),
      ...pair("series", "Series", { required: true }),
      ...pair("scripture", "Scripture", { required: true }),
      ...pair("theme", "Summary", { type: "textarea", required: true }),
      { key: "recordingUrl", label: "Recording link", type: "url" },
    ],
  },
  schedules: {
    name: "Weekly schedule",
    singular: "Gathering",
    description:
      "One source for gathering times across Home, Visit, and the footer.",
    publicPath: "/visit#service-times",
    fields: [
      ...pair("title", "Gathering title", { required: true }),
      ...pair("day", "Day", { required: true }),
      ...pair("description", "Description", {
        type: "textarea",
        required: true,
      }),
      ...pair("location", "Location", { required: true }),
      { key: "eatTime", label: "Standard time · EAT", required: true },
      { key: "localTime", label: "Ethiopian local time", required: true },
      ...pair("badge", "Short label"),
      ...pair("translationNotes", "Language / translation notes", {
        type: "textarea",
      }),
      {
        key: "iconName",
        label: "Symbol",
        type: "select",
        options: ["Sun", "BookOpen", "Music", "Church"],
      },
    ],
  },
  leaders: {
    name: "Leadership",
    singular: "Profile",
    description:
      "Keep the pastoral team and ministry responsibilities up to date.",
    publicPath: "/about",
    fields: [
      ...pair("name", "Full name", { required: true }),
      ...pair("role", "Ministry role", { required: true }),
      ...pair("bio", "Biography", { type: "textarea", required: true }),
      {
        key: "category",
        label: "Ministry",
        type: "select",
        options: ["senior", "associate", "children", "youth"],
        required: true,
      },
    ],
  },
  settings: {
    name: "Church details",
    singular: "Church details",
    description: "Public contact information shared by the website.",
    publicPath: "/visit#contact",
    fields: [
      ...pair("title", "Church name", { required: true }),
      ...pair("address", "Street address", { required: true }),
      {
        key: "phone",
        label: "Telephone",
        required: true,
        hint: "Include the international dialing code, for example +251.",
      },
      {
        key: "email",
        label: "Public email address",
        type: "email",
        required: true,
      },
      {
        key: "telegram",
        label: "Telegram channel URL",
        type: "url",
        required: true,
      },
    ],
  },
};
export function isCollection(value: string): value is Collection {
  return collections.includes(value as Collection);
}
export const safeLink = (value: string) =>
  !value ||
  /^\/(?!\/)[^\\\s]*$/.test(value) ||
  /^https:\/\/[^\s]+$/i.test(value);
export const safeImage = (value: string) =>
  (/^\/(gallery|illustrations|api\/media)\/[A-Za-z0-9_./-]+$/.test(value) &&
  !value.includes("..")) || isCloudinaryImage(value);
export function parseContent(
  kind: Collection,
  input: unknown,
  publishing: boolean,
): Record<string, unknown> {
  const shape: Record<string, z.ZodType> = {};
  for (const field of collectionConfig[kind].fields) {
    const required = publishing && field.required;
    if (field.type === "photos") {
      shape[field.key] = z
        .array(
          z.object({
            src: z
              .string()
              .refine(safeImage, "Choose an image from the library."),
            alt: z.string().trim().min(1).max(300),
            caption: z.string().max(500).optional(),
          }),
        )
        .max(24)
        .default([]);
    } else if (field.type === "number") {
      shape[field.key] = z.coerce.number().int().min(1900).max(2200);
    } else {
      let rule = z
        .string()
        .trim()
        .max(field.type === "textarea" ? 10000 : 500);
      if (required || field.key === "title" || field.key === "name")
        rule = rule.min(
          1,
          `${field.label} is required${publishing ? " before publishing" : ""}.`,
        );
      shape[field.key] = rule
        .default("")
        .refine(
          (value) =>
            !value || field.type !== "select" || field.options!.includes(value),
          "Select a valid option.",
        )
        .refine(
          (value) => !value || field.type !== "url" || safeLink(value),
          "Use an https:// link or a local /path.",
        )
        .refine(
          (value) =>
            !value ||
            field.type !== "email" ||
            z.email().safeParse(value).success,
          "Enter a valid email address.",
        )
        .refine(
          (value) => !value || field.type !== "image" || safeImage(value),
          "Choose an image from the library.",
        )
        .refine(
          (value) =>
            !value || field.type !== "datetime" || validCalendarDate(value),
          "Enter a valid date and time.",
        );
    }
  }
  const result = z.object(shape).parse(input) as Record<string, unknown>;
  if (
    kind === "events" &&
    result.startDate &&
    result.endDate &&
    String(result.endDate) <= String(result.startDate)
  )
    throw new Error("The end time must be after the start time.");
  if (kind === "settings") {
    if (!/^\+[1-9][0-9 ()-]{6,24}$/.test(String(result.phone)))
      throw new Error("Use an international telephone number starting with +.");
    if (!/^https:\/\/t\.me\/[a-zA-Z0-9_]+$/.test(String(result.telegram)))
      throw new Error(
        "Use the Telegram channel link, such as https://t.me/YourChannel.",
      );
  }
  return result;
}
export function calendarToISO(value: string) {
  return value.replace(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/,
    "$1-$2-$3T$4:$5:$6Z",
  );
}
function validCalendarDate(value: string) {
  if (!/^\d{8}T\d{6}Z$/.test(value)) return false;
  const date = new Date(calendarToISO(value));
  return (
    !Number.isNaN(date.getTime()) &&
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "") === value
  );
}
export function contentTitle(kind: Collection, data: Record<string, unknown>) {
  return String(data[kind === "leaders" ? "name" : "title"] || "Untitled");
}
export function newContent(kind: Collection): Record<string, unknown> {
  return Object.fromEntries(
    collectionConfig[kind].fields.map((f) => [
      f.key,
      f.type === "photos"
        ? []
        : f.type === "number"
          ? new Date().getFullYear()
          : f.type === "select"
            ? f.options![0]
            : "",
    ]),
  );
}
