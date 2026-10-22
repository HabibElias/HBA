"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useTransition } from "react";
import { Check, Minus, Plus, ShieldCheck } from "lucide-react";
import { permissionLabels } from "@/lib/cms/permissions";
import { saveRoleAction, type ActionResult } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  version: number;
  builtIn: boolean;
}
export function RolesManager({
  roles,
  canManage,
}: {
  roles: Role[];
  canManage: boolean;
}) {
  const router = useRouter(),
    [selected, setSelected] = useState<Role | null>(null),
    [pending, start] = useTransition(),
    [result, setResult] = useState<ActionResult | null>(null);
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
      <div className="admin-role-intro">
        <ShieldCheck size={23} />
        <p>
          Permissions apply to both workspace pages and server actions. Changing
          a role updates access immediately. The Owner role always retains full
          access.
        </p>
        {canManage && (
          <Button
            className="admin-button primary"
            onClick={() => {
              setSelected({
                id: "",
                name: "",
                description: "",
                permissions: ["content.read"],
                version: 0,
                builtIn: false,
              });
              setResult(null);
            }}
          >
            <Plus size={16} />
            Create role
          </Button>
        )}
      </div>
      {selected && (
        <form
          className="admin-role-editor"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const r = await saveRoleAction({
                ...selected,
                id: selected.id || undefined,
              });
              setResult(r);
              if (r.ok) {
                setSelected(null);
                router.refresh();
              }
            });
          }}
        >
          <div className="admin-section-heading">
            <h2>{selected.id ? `Edit ${selected.name}` : "Create a role"}</h2>
            <Button
              type="button"
              className="admin-button"
              disabled={pending}
              onClick={() => setSelected(null)}
            >
              Cancel
            </Button>
          </div>
          <div className="admin-editor-fields">
            <Label>
              Role name
              <Input
                required
                minLength={2}
                maxLength={60}
                value={selected.name}
                onChange={(e) =>
                  setSelected({ ...selected, name: e.target.value })
                }
              />
            </Label>
            <Label>
              Description
              <Input
                required
                minLength={5}
                maxLength={300}
                value={selected.description}
                onChange={(e) =>
                  setSelected({ ...selected, description: e.target.value })
                }
              />
            </Label>
          </div>
          <fieldset className="admin-permission-checks">
            <legend>Allowed actions</legend>
            {Object.entries(permissionLabels).map(([key, label]) => (
              <Label key={key}>
                <Checkbox
                  checked={selected.permissions.includes(key)}
                  disabled={key === "content.read" || pending}
                  onCheckedChange={(checked) =>
                    setSelected({
                      ...selected,
                      permissions: checked
                        ? [...selected.permissions, key]
                        : selected.permissions.filter((p) => p !== key),
                    })
                  }
                />
                {label}
              </Label>
            ))}
          </fieldset>
          <Button
            type="submit"
            disabled={pending}
            className="admin-button primary"
          >
            {pending ? "Saving…" : "Save permissions"}
          </Button>
        </form>
      )}
      <div
        className="admin-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Scrollable role permissions matrix"
      >
        <table className="admin-table admin-permissions-table">
          <caption className="sr-only">Role permissions matrix</caption>
          <thead>
            <tr>
              <th scope="col">Permission</th>
              {roles.map((role) => (
                <th key={role.id} scope="col">
                  <strong>{role.name}</strong>
                  <small>{role.description}</small>
                  {canManage && role.id !== "owner" ? (
                    <Button
                      className="admin-text-link"
                      onClick={() => {
                        setSelected(role);
                        setResult(null);
                        window.scrollTo({ top: 0, behavior: "instant" });
                      }}
                    >
                      Edit role
                    </Button>
                  ) : role.id === "owner" ? (
                    <span className="admin-muted">Protected</span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(permissionLabels).map(([key, label]) => (
              <tr key={key}>
                <th scope="row">{label}</th>
                {roles.map((role) => (
                  <td key={role.id}>
                    {role.permissions.includes(key) ? (
                      <span className="admin-allowed">
                        <Check size={18} />
                        <span className="sr-only">Allowed</span>
                      </span>
                    ) : (
                      <span className="admin-denied">
                        <Minus size={18} />
                        <span className="sr-only">Not allowed</span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
