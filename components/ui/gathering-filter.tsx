"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

type Option = { value: string; label: string };
export function GatheringFilter({
  id,
  value,
  onChange,
  options,
  isAm,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  isAm: boolean;
}) {
  const items = [
    { value: "all", label: isAm ? "ሁሉም ስብሰባዎች" : "All gatherings" },
    ...options,
  ];
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>{isAm ? "ስብሰባ" : "Gathering"}</Label>
      <Combobox
        items={items}
        value={items.find((item) => item.value === value) ?? items[0]}
        onValueChange={(item) => onChange(item?.value ?? "all")}
        itemToStringLabel={(item) => item.label}
        isItemEqualToValue={(a, b) => a.value === b.value}
      >
        <ComboboxInput
          id={id}
          placeholder={isAm ? "ስብሰባ ይፈልጉ" : "Search gatherings"}
          className="h-12 w-full rounded-full border-primary bg-surface px-3 [&_input]:h-full [&_input]:text-sm [&_input]:font-semibold [&_button]:size-9 [&_svg]:size-5"
        />
        <ComboboxContent className="border border-border shadow-sm">
          <ComboboxEmpty>
            {isAm ? "ምንም አልተገኘም" : "No gatherings found."}
          </ComboboxEmpty>
          <ComboboxList>
            {(item: Option) => (
              <ComboboxItem
                key={item.value}
                value={item}
                className="min-h-11 px-4 text-sm"
              >
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
