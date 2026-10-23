import type { Metadata } from "next";
import { Suspense } from 'react';
import "./admin.css";
import { AdminStandaloneLoading } from "@/components/admin/loading";
export const metadata: Metadata = {
  title: "Church workspace | Hiwot Birhan Summit",
  robots: { index: false, follow: false },
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root" lang="en">
      <Suspense fallback={<AdminStandaloneLoading />}>{children}</Suspense>
    </div>
  );
}
