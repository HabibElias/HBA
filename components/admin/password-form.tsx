"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/admin/password-input";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { changePasswordAction } from "@/app/admin/actions";

export function PasswordForm() {
  const router = useRouter();
  const [pending, start] = useTransition(),
    [error, setError] = useState("");
  return (
    <form
      className="admin-form-stack"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (f.get("newPassword") !== f.get("confirm")) {
          setError("The new passwords do not match.");
          return;
        }
        start(async () => {
          const result = await changePasswordAction(
            String(f.get("currentPassword")),
            String(f.get("newPassword")),
          );
          if (!result.ok) setError(result.message);
          else {
            router.push("/admin");
            router.refresh();
          }
        });
      }}
    >
      {error && (
        <p role="alert" className="admin-notice error">
          {error}
        </p>
      )}
      <Label>
        Current password
        <PasswordInput
          name="currentPassword"
          required
          autoComplete="current-password"
        />
      </Label>
      <Label>
        New password
        <PasswordInput
          name="newPassword"
          required
          minLength={12}
          maxLength={128}
          autoComplete="new-password"
        />
        <small>Use at least 12 characters.</small>
      </Label>
      <Label>
        Confirm new password
        <PasswordInput
          name="confirm"
          required
          minLength={12}
          maxLength={128}
          autoComplete="new-password"
        />
      </Label>
      <Button type="submit" disabled={pending} className="admin-button primary">
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
