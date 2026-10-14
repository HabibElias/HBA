"use server";

import { z } from "zod";
import { validateContactForm } from "@/lib/schemas/contact";
import type { ContactActionResult } from "@/lib/types/landing";

const ContactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  contactInfo: z
    .string()
    .min(5, "Please enter a valid phone number or email")
    .max(150, "Contact info must not exceed 150 characters"),
  category: z.enum(["visit", "prayer", "pastoral", "general"]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must not exceed 3000 characters"),
  isPrayerRequest: z.boolean().optional(),
});

export type ContactState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  try {
    const isPrayerRaw = formData.get("isPrayerRequest");
    const rawData = {
      fullName:
        typeof formData.get("fullName") === "string"
          ? (formData.get("fullName") as string).trim()
          : "",
      contactInfo:
        typeof formData.get("contactInfo") === "string"
          ? (formData.get("contactInfo") as string).trim()
          : "",
      category: formData.get("category"),
      message:
        typeof formData.get("message") === "string"
          ? (formData.get("message") as string).trim()
          : "",
      isPrayerRequest:
        isPrayerRaw !== null ? isPrayerRaw === "true" || isPrayerRaw === "on" : undefined,
    };

    const parsed = ContactSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Please correct the errors in the form.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    // Simulated server processing / logging
    console.log("Contact submission received:", parsed.data);

    return {
      success: true,
      message: "Thank you. We received your message and will be in touch.",
    };
  } catch (error) {
    console.error("Failed to process contact submission:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

// Backward compatibility for existing landing page contact form
export async function submitContactAction(
  _prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const validation = validateContactForm(formData);

  if (!validation.success || !validation.data) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please check the form for errors.",
    };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: "Your message has been received.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to submit message. Please try again later.",
    };
  }
}
