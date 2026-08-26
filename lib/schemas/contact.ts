import type { ContactFormData } from "@/lib/types/landing";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Partial<Record<keyof T, string[]>>;
}

export function validateContactForm(formData: FormData | Record<string, unknown>): ValidationResult<ContactFormData> {
  const getField = (key: string): string => {
    if (formData instanceof FormData) {
      return (formData.get(key) as string)?.trim() ?? "";
    }
    return String(formData[key] ?? "").trim();
  };

  const name = getField("name");
  const email = getField("email");
  const time = getField("time");
  const message = getField("message");

  const errors: Partial<Record<keyof ContactFormData, string[]>> = {};

  if (!name || name.length < 2) {
    errors.name = ["Name must be at least 2 characters."];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: {
      name,
      email,
      time: time || undefined,
      message: message || undefined,
    },
  };
}
