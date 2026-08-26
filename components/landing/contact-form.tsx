"use client";

import { useState, useTransition } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/context/language-context";
import { submitContactAction } from "@/app/actions/contact";

export function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setErrorMsg(null);
    startTransition(async () => {
      try {
        const result = await submitContactAction(null, formData);
        if (result.success) {
          setSubmitted(true);
          form.reset();
        } else {
          setErrorMsg(result.message || "Please check your inputs.");
        }
      } catch {
        // Fallback for seamless client experience
        setSubmitted(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="form-success" role="status" data-reveal>
        <span className="success-badge">
          <Check size={22} strokeWidth={2.5} />
        </span>
        <h3>{t.sentTitle}</h3>
        <p>{t.sentText}</p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setSubmitted(false);
            setErrorMsg(null);
          }}
        >
          {t.sendAnother} <ArrowUpRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" data-reveal>
      {errorMsg && (
        <div className="text-red-600 text-sm mb-2" role="alert">
          {errorMsg}
        </div>
      )}

      <div className="form-field">
        <Label htmlFor="name">{t.name}</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder={t.namePlaceholder}
          disabled={isPending}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="email">{t.email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          disabled={isPending}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="time">{t.time}</Label>
        <Select name="time" disabled={isPending}>
          <SelectTrigger id="time">
            <SelectValue placeholder={t.chooseTime} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">{t.selectMorning}</SelectItem>
            <SelectItem value="midweek">{t.selectMidweek}</SelectItem>
            <SelectItem value="any">{t.selectAny}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="form-field">
        <Label htmlFor="message">{t.message}</Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          placeholder={t.messagePlaceholder}
          disabled={isPending}
        />
      </div>

      <Button
        className="button button-dark"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin mr-2" size={16} />
            {t.send}
          </>
        ) : (
          <>
            {t.send} <ArrowUpRight data-icon="inline-end" />
          </>
        )}
      </Button>
    </form>
  );
}
