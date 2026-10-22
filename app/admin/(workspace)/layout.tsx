import { requirePage } from "@/lib/cms/access";
import { AdminShell } from "@/components/admin/shell";
export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requirePage();
  return <AdminShell staff={staff}>{children}</AdminShell>;
}
