"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/public-button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSelect } from "@/components/ui/field-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/context/language-context";
import { useContent } from "@/lib/context/content-context";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const { settings } = useContent();
  const EMAIL = settings.email;
  const { lang } = useLanguage();
  const isAm = lang === "am";
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const categories = isAm
    ? {
        visit: "ስለ ጉብኝት",
        prayer: "የጸሎት ጥያቄ",
        pastoral: "የመጋቢ ምክር",
        general: "አጠቃላይ ጥያቄ",
      }
    : {
        visit: "Planning a visit",
        prayer: "Prayer request",
        pastoral: "Pastoral care",
        general: "General question",
      };

  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("fullName") || "").trim();
    const contact = String(form.get("contactInfo") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (
      name.length < 2 ||
      message.length < 10 ||
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) &&
        contact.replace(/\D/g, "").length < 7)
    ) {
      setError(
        isAm
          ? "ስምዎን፣ ትክክለኛ ስልክ ወይም ኢሜይልና ቢያንስ 10 ፊደላት ያሉት መልእክት ያስገቡ።"
          : "Please enter your name, a valid phone number or email, and a message of at least 10 characters.",
      );
      setDraft("");
      return;
    }

    const category = String(form.get("category")) as keyof typeof categories;
    const subject = `${categories[category]} — ${name}`;
    const body = `${name}\n${contact}\n\n${message}${form.get("prayer") ? "\n\nPrayer request / የጸሎት ጥያቄ" : ""}`;

    setDraft(
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setError("");
  };

  return (
    <div
      className="contact-composer grid lg:grid-cols-12 gap-10 lg:gap-16 items-start scroll-mt-24"
      id="contact-form-section"
    >
      {/* Left Column: Narrative & Editorial Intro */}
      <div className="lg:col-span-4">
        <span className="font-script text-2xl sm:text-3xl text-primary-soft block mb-1 font-normal">
          {isAm ? "መልእክት ይላኩ" : "Send a Note"}
        </span>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-semibold leading-tight tracking-tight">
          {isAm ? "ጥያቄዎን ያካፍሉን" : "Start a conversation"}
        </h3>

        <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
          {isAm
            ? "ስለ ጉብኝት፣ ሕብረት፣ የመጋቢ ምክር ወይም ጸሎት ይጻፉልን።"
            : "Ask about a visit, share a prayer request, or get in touch with our pastoral team."}
        </p>
      </div>

      {/* Right Column: Form Card */}
      <form
        onSubmit={prepare}
        onChange={() => {
          if (draft) setDraft("");
        }}
        className="lg:col-span-8 rounded-3xl bg-surface border border-border/80 p-6 sm:p-9 md:p-10 space-y-6 shadow-xs relative overflow-hidden"
      >
        {error && (
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 p-4 rounded-xl"
          >
            {error}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-5 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
              {isAm ? "ሙሉ ስም" : "Your name"}
            </Label>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              className="rounded-xl border-border/80 focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactInfo" className="text-sm font-medium text-foreground">
              {isAm ? "ስልክ ወይም ኢሜይል" : "Phone or email"}
            </Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              required
              maxLength={150}
              className="rounded-xl border-border/80 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <Label htmlFor="category" className="text-sm font-medium text-foreground">
            {isAm ? "የመልእክት ዓይነት" : "How can we help?"}
          </Label>
          <FieldSelect
            id="category"
            name="category"
            defaultValue="visit"
            options={Object.entries(categories).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </div>

        <div className="space-y-2 relative z-10">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">
            {isAm ? "መልእክት" : "Your message"}
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={5}
            className="rounded-xl border-border/80 focus-visible:ring-primary/20 resize-none"
          />
        </div>

        <div className="relative z-10">
          <Label className="flex items-center gap-3 text-sm font-normal text-muted-foreground leading-relaxed cursor-pointer select-none">
            <Checkbox name="prayer" onCheckedChange={() => setDraft("")} />
            <span>{isAm ? "ይህ የጸሎት ጥያቄ ነው" : "This is a prayer request"}</span>
          </Label>
        </div>

        <div className="pt-2 relative z-10">
          <Button type="submit" variant="primary" className="shadow-xs gap-2">
            <span>{isAm ? "ኢሜይሉን ያዘጋጁ" : "Prepare email"}</span>
            <ArrowUpRight className="size-4" />
          </Button>
        </div>

        {draft && (
          <div
            role="status"
            className="rounded-2xl bg-tint/80 border border-primary/25 p-5 space-y-4 relative z-10"
          >
            <p className="flex items-start gap-2.5 text-sm text-foreground">
              <Check className="size-4 shrink-0 mt-0.5 text-primary" />
              <span>
                {isAm
                  ? "መልእክትዎ ተዘጋጅቷል! ለመገምገምና ለመላክ የኢሜይል መተግበሪያዎን ይክፈቱ።"
                  : "Your message draft is ready! Click below to review and send it in your email app."}
              </span>
            </p>
            <a
              href={draft}
              className={cn(buttonVariants({ variant: "primary" }), "shadow-xs gap-2")}
            >
              <span>{isAm ? "የኢሜይል ረቂቁን ይክፈቱ" : "Open email draft"}</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
