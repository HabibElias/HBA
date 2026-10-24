import { requirePage } from "@/lib/cms/access";
import { AdminShell } from "@/components/admin/shell";
import { Suspense } from "react";
import { AdminWorkspaceLoading } from "@/components/admin/loading";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminWorkspaceLoading />}>
      <AuthenticatedWorkspace>{children}</AuthenticatedWorkspace>
    </Suspense>
  );
}

async function AuthenticatedWorkspace({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requirePage();
  return <AdminShell staff={staff}>{children}</AdminShell>;
}
