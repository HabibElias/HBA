import Link from "next/link";
import { redirect } from "next/navigation";
import { currentStaff } from "@/lib/cms/access";
import { LoginForm } from "@/components/admin/login-form";
import { ChurchMark } from "@/components/brand/church-mark";
export default async function LoginPage() {
  const staff = await currentStaff();
  if (staff) redirect(staff.mustChangePassword ? "/admin/password" : "/admin");
  return (
    <main className="admin-login">
      <div className="admin-login-story">
        <Link href="/" className="admin-brand">
          <ChurchMark reversed size={64} priority />
          <span>
            Hiwot Birhan<small>Summit branch</small>
          </span>
        </Link>
        <div>
          <h1>
            Care for the stories
            <br />
            we share.
          </h1>
          <p>
            A place for our team to prepare gatherings, share teaching, and keep
            our church family informed.
          </p>
        </div>
        <p>There is room for you here.</p>
      </div>
      <div className="admin-login-form">
        <Link href="/" className="admin-back">
          ← Back to the website
        </Link>
        <h2>Welcome back.</h2>
        <p className="admin-muted">Sign in to your church workspace.</p>
        <LoginForm />
      </div>
    </main>
  );
}
