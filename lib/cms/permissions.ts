export const collections = [
  "events",
  "recaps",
  "sermons",
  "schedules",
  "leaders",
  "settings",
] as const;
export type Collection = (typeof collections)[number];
export const permissionLabels: Record<string, string> = {
  "content.read": "View content and previews",
  ...Object.fromEntries(
    collections.flatMap((k) => [
      [`${k}.write`, `Edit ${k}`],
      [`${k}.publish`, `Publish and unpublish ${k}`],
    ]),
  ),
  "content.delete": "Delete content",
  "media.write": "Upload public images",
  "users.manage": "Manage staff accounts",
  "roles.manage": "Manage roles and permissions",
  "audit.read": "View activity log",
};
export const allPermissions = Object.keys(permissionLabels);
export function hasPermission(
  permissions: readonly string[],
  permission: string,
) {
  return permissions.includes(permission);
}
export const defaultRoles = [
  {
    id: "owner",
    name: "Owner",
    description:
      "Full access, including roles and staff access. This role cannot be edited.",
    permissions: allPermissions,
  },
  {
    id: "administrator",
    name: "Administrator",
    description:
      "Publishes content and manages staff with equal or lower permissions.",
    permissions: allPermissions.filter((p) => p !== "roles.manage"),
  },
  {
    id: "editor",
    name: "Editor",
    description:
      "Prepares content drafts and uploads images. A publisher reviews changes.",
    permissions: [
      "content.read",
      ...collections.filter((k) => k !== "settings").map((k) => `${k}.write`),
      "media.write",
    ],
  },
  {
    id: "viewer",
    name: "Viewer",
    description:
      "Reads content and previews drafts without changing the website.",
    permissions: ["content.read"],
  },
];
export function canAssignRole(
  actorPermissions: readonly string[],
  targetPermissions: readonly string[],
) {
  return targetPermissions.every((p) => actorPermissions.includes(p));
}
