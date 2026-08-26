"use server";

import { validateContactForm } from "@/lib/schemas/contact";
import type { ContactActionResult } from "@/lib/types/landing";

export async function submitContactAction(
  _prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  // Validate data server-side
  const validation = validateContactForm(formData);

  if (!validation.success || !validation.data) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please check the form for errors.",
    };
  }

  // Process contact form securely (e.g. email / database)
  // In development/production demonstration, log and return success
  try {
    // Simulated async operation
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
