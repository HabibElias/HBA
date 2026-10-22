"use client";
import { Input } from "@/components/ui/input";
import { useState, type ComponentPropsWithoutRef } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type">;

export function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="admin-password-wrap">
      <Input {...props} type={visible ? "text" : "password"} />
      <button
        type="button"
        className="admin-password-eye"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
