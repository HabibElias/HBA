"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldSelect } from "@/components/ui/field-select";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Plus, UserRound } from "lucide-react";
import {
  createStaffAction,
  updateStaffAction,
  type ActionResult,
} from "@/app/admin/actions";
import { canAssignRole } from "@/lib/cms/permissions";
import type { Role } from "./roles-manager";
interface Person {
  id: string;
  name: string;
  email: string;
  roleId: string;
  active: boolean;
  mustChangePassword: boolean;
}
export function StaffManager({
  people,
  roles,
  actor,
}: {
  people: Person[];
  roles: Role[];
  actor: { id: string; roleId: string; permissions: string[] };
}) {
  const router = useRouter(),
    [editing, setEditing] = useState<Person | null>(null),
    [creating, setCreating] = useState(false),
    [result, setResult] = useState<ActionResult | null>(null),
    [pending, start] = useTransition();
  const assignable = roles.filter(
    (r) =>
      canAssignRole(actor.permissions, r.permissions) &&
      (r.id !== "owner" || actor.roleId === "owner"),
  );
  return (
    <>
      {result && (
        <p
          role={result.ok ? "status" : "alert"}
          className={`admin-notice ${result.ok ? "success" : "error"}`}
        >
          {result.message}
        </p>
      )}
      <div className="admin-list-toolbar">
        <p className="admin-muted">
          {people.length} staff accounts · administrators create accounts for
          the team.
        </p>
        <Button
          className="admin-button primary"
          onClick={() => {
            setCreating(true);
            setEditing(null);
            setResult(null);
          }}
        >
          <Plus size={16} />
          Add staff member
        </Button>
      </div>
      <Dialog
        open={creating}
        onOpenChange={(open) => {
          if (!pending) setCreating(open);
        }}
      >
        <DialogContent
          className="admin-root admin-staff-dialog"
          showCloseButton={!pending}
        >
          <form
            className="admin-staff-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget,
                data = new FormData(form);
              start(async () => {
                const r = await createStaffAction({
                  name: String(data.get("name")),
                  email: String(data.get("email")),
                  password: String(data.get("password")),
                  roleId: String(data.get("roleId")),
                });
                setResult(r);
                if (r.ok) {
                  form.reset();
                  setCreating(false);
                  router.refresh();
                }
              });
            }}
          >
            <DialogHeader>
              <DialogTitle>Add a staff member</DialogTitle>
              <DialogDescription>
                Set an initial password and share it privately. They must
                replace it at first sign-in. No invitation email is sent.
              </DialogDescription>
            </DialogHeader>
            {result && !result.ok && (
              <p role="alert" className="admin-notice error">
                {result.message}
              </p>
            )}
            <div className="admin-editor-fields">
              <Label>
                Full name
                <Input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="off"
                />
              </Label>
              <Label>
                Email address
                <Input
                  type="email"
                  name="email"
                  required
                  maxLength={150}
                  autoComplete="off"
                />
              </Label>
              <Label>
                Temporary password
                <Input
                  type="password"
                  name="password"
                  required
                  minLength={12}
                  maxLength={128}
                  autoComplete="new-password"
                />
                <small>At least 12 characters.</small>
              </Label>
              <Label>
                Role
                <FieldSelect name="roleId" defaultValue="editor" aria-label="Role" options={assignable.map((role) => ({value: role.id, label: role.name}))} />
              </Label>
            </div>
            <div className="admin-actions">
              <Button
                type="submit"
                disabled={pending}
                className="admin-button primary"
              >
                {pending ? "Creating…" : "Create staff account"}
              </Button>
              <Button
                type="button"
                disabled={pending}
                className="admin-button"
                onClick={() => setCreating(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {editing && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open && !pending) setEditing(null);
          }}
        >
          <DialogContent
            className="admin-root admin-staff-dialog"
            showCloseButton={!pending}
          >
            <form
              className="admin-staff-form"
              onSubmit={(e) => {
                e.preventDefault();
                const password = String(
                  new FormData(e.currentTarget).get("resetPassword") || "",
                );
                start(async () => {
                  const r = await updateStaffAction({
                    id: editing.id,
                    roleId: editing.roleId,
                    active: editing.active,
                    password: password || undefined,
                  });
                  setResult(r);
                  if (r.ok) {
                    setEditing(null);
                    router.refresh();
                  }
                });
              }}
            >
              <DialogHeader>
                <DialogTitle>Access for {editing.name}</DialogTitle>
                <DialogDescription>
                  Saving access changes signs this person out of existing
                  sessions.
                </DialogDescription>
              </DialogHeader>
              {result && !result.ok && (
                <p role="alert" className="admin-notice error">
                  {result.message}
                </p>
              )}
              <div className="admin-editor-fields">
                <Label>
                  Role
                  <FieldSelect value={editing.roleId} aria-label="Role" onValueChange={(value) => setEditing({...editing, roleId: value})} options={assignable.map((role) => ({value: role.id, label: role.name}))} />
                </Label>
                <Label>
                  Account status
                  <FieldSelect value={String(editing.active)} aria-label="Account status" onValueChange={(value) => setEditing({...editing, active: value === "true"})} options={[{value: "true", label: "Active"}, {value: "false", label: "Disabled"}]} />
                </Label>
                <Label className="wide">
                  Reset temporary password (optional)
                  <Input
                    type="password"
                    name="resetPassword"
                    minLength={12}
                    maxLength={128}
                    autoComplete="new-password"
                  />
                  <small>
                    Leave blank to keep their password. A reset requires a
                    password change at next sign-in.
                  </small>
                </Label>
              </div>
              <div className="admin-actions">
                <Button
                  type="submit"
                  className="admin-button primary"
                  disabled={pending}
                >
                  {pending ? "Saving…" : "Save access"}
                </Button>
                <Button
                  type="button"
                  className="admin-button"
                  disabled={pending}
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Staff member</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="sr-only">Manage access</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => {
              const role = roles.find((r) => r.id === person.roleId),
                canManage =
                  person.id !== actor.id &&
                  role &&
                  assignable.some((r) => r.id === role.id);
              return (
                <tr key={person.id}>
                  <td>
                    <div className="admin-person">
                      <UserRound size={19} />
                      <div>
                        <strong>
                          {person.name}
                          {person.id === actor.id ? " (you)" : ""}
                        </strong>
                        <small>{person.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>{role?.name}</td>
                  <td>
                    <span
                      className={`admin-status ${person.active ? "published" : "draft"}`}
                    >
                      {person.active ? "Active" : "Disabled"}
                    </span>
                    {person.mustChangePassword && (
                      <small>Password change required</small>
                    )}
                  </td>
                  <td>
                    {canManage && (
                      <Button
                        className="admin-text-link"
                        onClick={() => {
                          setEditing(person);
                          setCreating(false);
                          setResult(null);
                          window.scrollTo({ top: 0, behavior: "instant" });
                        }}
                      >
                        Manage<span className="sr-only"> {person.name}</span>
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
