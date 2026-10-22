import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { currentStaff } from "@/lib/cms/access";
import { PasswordForm } from "@/components/admin/password-form";

export default async function PasswordPage() {
  const staff = await currentStaff();
  if (!staff) redirect("/admin/login");
  return (
    <main className="admin-standalone">
      <Link href="/admin" className="admin-back">
        <ArrowLeft size={14} />
        Workspace
      </Link>
      <h1>
        {staff.mustChangePassword
          ? "Make this account yours."
          : "Change your password"}
      </h1>
      <p className="admin-muted">
        {staff.mustChangePassword
          ? "Replace your temporary password before opening the workspace."
          : "Your other sessions will be signed out."}
      </p>
      <PasswordForm />
    </main>
  );
}
