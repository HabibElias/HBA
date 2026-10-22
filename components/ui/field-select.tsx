"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FieldSelectProps = {
  options: { value: string; label: string }[];
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  "aria-label"?: string;
  onValueChange?: (value: string) => void;
};

/** Shared form wiring for the shadcn Select, including its submitted value. */
export function FieldSelect({ options, id, className, "aria-label": ariaLabel, onValueChange, ...props }: FieldSelectProps) {
  return (
    <Select {...props} items={options} onValueChange={(value) => { if (value !== null) onValueChange?.(value); }}>
      <SelectTrigger id={id} aria-label={ariaLabel} className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
