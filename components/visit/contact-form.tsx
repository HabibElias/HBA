"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/context/language-context";
import { submitContactForm, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = {};

export function ContactForm() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.success && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div className="space-y-0.5">
            <h4 className="font-semibold text-sm">{t.contact.successTitle}</h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-200/90">
              {state.message || t.contact.success}
            </p>
          </div>
        </div>
      )}

      {state.message && !state.success && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
        >
          <p className="font-semibold">{t.contact.errorTitle}</p>
          <p className="mt-0.5">{state.message || t.contact.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">{t.contact.fullName}</Label>
          <Input
            id="fullName"
            name="fullName"
            required
            placeholder={t.contact.fullNamePlaceholder}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.fullName)}
          />
          {state.errors?.fullName && (
            <p className="text-xs text-red-600 dark:text-red-400">{state.errors.fullName[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contactInfo">{t.contact.contactInfo}</Label>
          <Input
            id="contactInfo"
            name="contactInfo"
            required
            placeholder={t.contact.contactInfoPlaceholder}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.contactInfo)}
          />
          {state.errors?.contactInfo && (
            <p className="text-xs text-red-600 dark:text-red-400">{state.errors.contactInfo[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="category">{t.contact.category}</Label>
        <select
          id="category"
          name="category"
          defaultValue="visit"
          disabled={isPending}
          className="border-border bg-surface rounded-xl px-4 py-2.5 text-foreground h-11 w-full text-base border outline-none transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-deep/50 dark:border-white/10 dark:text-white"
        >
          <option value="visit">{t.contact.categories.visit}</option>
          <option value="prayer">{t.contact.categories.prayer}</option>
          <option value="pastoral">{t.contact.categories.pastoral}</option>
          <option value="general">{t.contact.categories.general}</option>
        </select>
        {state.errors?.category && (
          <p className="text-xs text-red-600 dark:text-red-400">{state.errors.category[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t.contact.message}</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={t.contact.messagePlaceholder}
          disabled={isPending}
          aria-invalid={Boolean(state.errors?.message)}
        />
        {state.errors?.message && (
          <p className="text-xs text-red-600 dark:text-red-400">{state.errors.message[0]}</p>
        )}
      </div>

      <div className="flex items-center gap-2.5 pt-1">
        <input
          type="checkbox"
          id="isPrayerRequest"
          name="isPrayerRequest"
          value="true"
          disabled={isPending}
          className="size-4 rounded border-border text-primary accent-primary focus:ring-primary"
        />
        <Label htmlFor="isPrayerRequest" className="text-xs font-normal text-muted-foreground cursor-pointer">
          {t.contact.prayerRequest}
        </Label>
      </div>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto min-w-36">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>{t.contact.submitting}</span>
          </>
        ) : (
          <span>{t.contact.submit}</span>
        )}
      </Button>
    </form>
  );
}
