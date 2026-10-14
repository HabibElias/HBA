"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/context/language-context";
import { submitContactForm } from "@/app/actions/contact";

const CATEGORIES = ["visit", "prayer", "pastoral", "general"] as const;

export function ContactForm() {
  const { t, lang } = useLanguage();
  const isAm = lang === "am";
  const [state, formAction, isPending] = useActionState(submitContactForm, {});
  const [submitted, setSubmitted] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (state.success) setSubmitted(true);
  }, [state]);

  if (state.success && submitted) {
    return (
      <div id="contact-form-section" role="status" className="max-w-3xl mx-auto flex flex-col items-center text-center p-8 rounded-2xl border border-emerald-200 bg-emerald-50/90 text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100 space-y-4">
        <CheckCircle2 className="size-12 text-emerald-600 dark:text-emerald-400" />
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{t?.contact?.successTitle ?? "Message Sent"}</h3>
          <p className="text-sm text-emerald-800 dark:text-emerald-200/90 max-w-md">
            {t?.contact?.success ?? "Thank you. We received your message and will be in touch."}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => { setSubmitted(false); setResetKey((k) => k + 1); }}>
          {isAm ? "ሌላ መልእክት ይላኩ" : "Send another message"}
        </Button>
      </div>
    );
  }

  return (
    <div id="contact-form-section" className="max-w-3xl mx-auto bg-surface rounded-2xl border border-border p-6 sm:p-10 shadow-md">
      <div className="mb-6 border-b border-border pb-4">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
          {isAm ? "መልእክት ይላኩ ወይም የጸሎት ጥያቄ ያቅርቡ" : "Send a Message or Prayer Request"}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {isAm
            ? "ስለ ጉብኝት፣ አገልግሎት ወይም ጸሎት ለአገልጋዮቻችን ያካፍሉን።"
            : "Send our administrative team or pastoral staff a note regarding visiting, ministry, or services."}
        </p>
      </div>

      <form key={resetKey} action={formAction} className="space-y-5">
        {state.message && !state.success && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            <p className="font-semibold">{t?.contact?.errorTitle ?? "Submission Notice"}</p>
            <p className="mt-0.5">
              {state.errors && Object.keys(state.errors).length > 0
                ? (t?.contact?.error ?? state.message)
                : state.message}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">{t?.contact?.fullName ?? "Full Name"}</Label>
            <Input id="fullName" name="fullName" required placeholder={t?.contact?.fullNamePlaceholder ?? "e.g. Dawit Tadesse"} disabled={isPending} aria-invalid={Boolean(state.errors?.fullName)} aria-describedby={state.errors?.fullName ? "fullName-error" : undefined} />
            {state.errors?.fullName && <p id="fullName-error" className="text-xs text-red-600 dark:text-red-400">{state.errors.fullName[0]}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contactInfo">{t?.contact?.contactInfo ?? "Contact Info"}</Label>
            <Input id="contactInfo" name="contactInfo" required placeholder={t?.contact?.contactInfoPlaceholder ?? "+251 9... or email"} disabled={isPending} aria-invalid={Boolean(state.errors?.contactInfo)} aria-describedby={state.errors?.contactInfo ? "contactInfo-error" : undefined} />
            {state.errors?.contactInfo && <p id="contactInfo-error" className="text-xs text-red-600 dark:text-red-400">{state.errors.contactInfo[0]}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">{t?.contact?.category ?? "Category"}</Label>
          <select id="category" name="category" defaultValue="visit" disabled={isPending} aria-invalid={Boolean(state.errors?.category)} aria-describedby={state.errors?.category ? "category-error" : undefined} className="border-border bg-surface rounded-xl px-4 py-2.5 text-foreground h-11 w-full text-sm border outline-none transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-deep/50 dark:border-white/10 dark:text-white">
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{t?.contact?.categories?.[cat] ?? cat}</option>
            ))}
          </select>
          {state.errors?.category && <p id="category-error" className="text-xs text-red-600 dark:text-red-400">{state.errors.category[0]}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">{t?.contact?.message ?? "Message"}</Label>
          <Textarea id="message" name="message" rows={4} required placeholder={t?.contact?.messagePlaceholder ?? "Let us know how we can serve you..."} disabled={isPending} aria-invalid={Boolean(state.errors?.message)} aria-describedby={state.errors?.message ? "message-error" : undefined} />
          {state.errors?.message && <p id="message-error" className="text-xs text-red-600 dark:text-red-400">{state.errors.message[0]}</p>}
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <input type="checkbox" id="isPrayerRequest" name="isPrayerRequest" value="true" disabled={isPending} className="size-4 rounded border-border text-primary accent-primary focus:ring-primary" />
          <Label htmlFor="isPrayerRequest" className="text-xs font-normal text-muted-foreground cursor-pointer">
            {t?.contact?.prayerRequest ?? "Confidential prayer request"}
          </Label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-36">
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>{t?.contact?.submitting ?? "Sending..."}</span>
              </>
            ) : (
              <span>{t?.contact?.submit ?? "Send Message"}</span>
            )}
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5 text-primary" />
            <span>{isAm ? "መልእክትዎ በሚስጥር ይጠበቃል።" : "Your message is kept strictly confidential."}</span>
          </div>
        </div>
      </form>
    </div>
  );
}
