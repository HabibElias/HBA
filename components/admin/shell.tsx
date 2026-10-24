"use client";
import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Archive,
  BookOpen,
  Clock,
  Users,
  Image,
  Settings,
  ShieldCheck,
  History,
  ArrowUpRight,
  LogOut,
  Menu,
  X,
  KeyRound,
  ChevronsUpDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { ChurchMark } from "@/components/brand/church-mark";
const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: BookOpen },
  {
    href: "/admin/content/events",
    label: "Programs & events",
    icon: CalendarDays,
  },
  { href: "/admin/content/recaps", label: "Past gatherings", icon: Archive },
  {
    href: "/admin/content/sermons",
    label: "Sermons & teaching",
    icon: BookOpen,
  },
  { href: "/admin/content/schedules", label: "Weekly schedule", icon: Clock },
  { href: "/admin/content/leaders", label: "Leadership", icon: Users },
  { href: "/admin/content/albums", label: "Gallery folders", icon: Image },
  { href: "/admin/media", label: "Image library", icon: Image },
  { href: "/admin/content/settings", label: "Church details", icon: Settings },
  {
    href: "/admin/users",
    label: "Staff access",
    icon: Users,
    permission: "users.manage",
  },
  { href: "/admin/roles", label: "Roles & permissions", icon: ShieldCheck },
  {
    href: "/admin/activity",
    label: "Activity log",
    icon: History,
    permission: "audit.read",
  },
];
export function AdminShell({
  staff,
  children,
}: {
  staff: { name: string; roleName: string; permissions: string[] };
  children: React.ReactNode;
}) {
  const pathname = usePathname(),
    router = useRouter();
  const [open, setOpen] = useState(false),
    [leaving, setLeaving] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    document.documentElement.lang = "en";
    setOpen(false);
  }, [pathname]);
  return (
    <div className="admin-layout">
      <a href="#admin-main" className="skip-link">
        Skip to workspace
      </a>
      <div className="admin-mobile-bar">
        <Link href="/admin" className="admin-wordmark">
          <ChurchMark size={40} />
          Summit <span>workspace</span>
        </Link>
        <Button
          className="admin-icon-button"
          aria-label={
            open ? "Close workspace navigation" : "Open workspace navigation"
          }
          aria-expanded={open}
          aria-controls="admin-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <aside
        className={`admin-sidebar ${open ? "is-open" : ""}`}
        id="admin-nav"
      >
        <Link href="/admin" className="admin-brand">
          <ChurchMark size={56} />
          <span>
            Hiwot Birhan<small>Summit workspace</small>
          </span>
        </Link>
        <nav aria-label="Workspace navigation">
          {links
            .filter(
              (l) => !l.permission || staff.permissions.includes(l.permission),
            )
            .map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  (
                    href === "/admin"
                      ? pathname === href
                      : pathname.startsWith(href)
                  )
                    ? "page"
                    : undefined
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" target="_blank">
            Open website <ArrowUpRight size={16} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="admin-staff" aria-label={staff.name + ", account menu"}>
              <span className="admin-avatar" aria-hidden="true">{staff.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
              <span className="admin-staff-details"><strong>{staff.name}</strong><small>{staff.roleName}</small></span>
              <ChevronsUpDown size={16} aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" sideOffset={8} className="admin-user-menu">
              <DropdownMenuItem render={<Link href="/admin/password" />} className="min-h-11">
                <KeyRound size={16} /> Change password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={leaving} closeOnClick={false} className="min-h-11" onClick={async () => {
                setLeaving(true);
                setError("");
                try {
                  const result = await authClient.signOut();
                  if (result.error) throw new Error("Sign out failed");
                  router.push("/admin/login");
                  router.refresh();
                } catch {
                  setError("Could not sign out. Try again.");
                  setLeaving(false);
                }
              }}>
                <LogOut size={16} /> {leaving ? "Signing out…" : "Sign out"}
              </DropdownMenuItem>
              {error && <p role="alert" className="px-3 py-2 text-sm text-destructive">{error}</p>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      <main id="admin-main" className="admin-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
