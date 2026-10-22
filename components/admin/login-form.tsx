"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/admin/password-input";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false),
    [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const result = await authClient.signIn.email({
        email: String(data.get("email")).trim().toLowerCase(),
        password: String(data.get("password")),
      });
      if (result.error) {
        setError(
          result.error.status === 429
            ? "Too many attempts. Wait one minute, then try again."
            : "Unable to sign in. Check your email and password, or contact your administrator.",
        );
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit} className="admin-form-stack">
      {error && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}
      <Label>
        Email address
        <Input
          type="email"
          name="email"
          autoComplete="username"
          required
          maxLength={150}
        />
      </Label>
      <Label>
        Password
        <PasswordInput
          name="password"
          autoComplete="current-password"
          required
          maxLength={128}
        />
      </Label>
      <Button type="submit" className="admin-button primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in to workspace"}
      </Button>
      <p className="admin-muted">
        Staff access is provided by your website administrator. Contact them if
        you need an account or help signing in.
      </p>
    </form>
  );
}
