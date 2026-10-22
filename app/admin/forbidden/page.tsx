import Link from "next/link";
export default function ForbiddenPage() {
  return (
    <main className="admin-standalone">
      <h1>This page needs additional access.</h1>
      <p className="admin-muted">
        Ask an owner to review your role permissions.
      </p>
      <Link className="admin-button primary" href="/admin">
        Return to workspace
      </Link>
    </main>
  );
}
