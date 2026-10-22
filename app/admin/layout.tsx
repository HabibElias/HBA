import type { Metadata } from "next";
import "./admin.css";
export const metadata: Metadata = {
  title: "Church workspace | Hiwot Birhan Summit",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root" lang="en">
      {children}
    </div>
  );
}
