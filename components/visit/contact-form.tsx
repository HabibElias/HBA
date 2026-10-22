"use client";
import { useState, type FormEvent } from "react";
import { Mail, ArrowUpRight, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/public-button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSelect } from "@/components/ui/field-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/context/language-context";
import { useContent } from "@/lib/context/content-context";

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
      className="contact-composer grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
      id="contact-form-section"
    >
      <div className="lg:col-span-4">
        <Mail className="size-7 text-primary mb-5" />
        <h3 className="section-title">
          {isAm ? "ጥያቄዎን\nያካፍሉን።" : "Start a\nconversation."}
        </h3>
        <p className="body-copy mt-5">
          {isAm
            ? "ስለ ጉብኝት፣ ሕብረት፣ የመጋቢ ምክር ወይም ጸሎት ይጻፉልን።"
            : "Ask about a visit, share a prayer request, or get in touch with our pastoral team."}
        </p>
        <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
          {isAm
            ? "መልእክትዎን ያዘጋጁ። ከዚያ በእርስዎ የኢሜይል መተግበሪያ ገምግመው ይላኩት።"
            : "Prepare your message here, then review and send it from your own email app."}
        </p>
      </div>
      <form
        onSubmit={prepare}
        onChange={() => {
          if (draft) setDraft("");
        }}
        className="lg:col-span-8 rounded-3xl bg-surface border border-border p-6 sm:p-9 space-y-6"
      >
        {error && (
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-50 p-4 rounded-xl"
          >
            {error}
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">{isAm ? "ሙሉ ስም" : "Your name"}</Label>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactInfo">
              {isAm ? "ስልክ ወይም ኢሜይል" : "Phone or email"}
            </Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              required
              maxLength={150}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">
            {isAm ? "የመልእክት ዓይነት" : "How can we help?"}
          </Label>
          <FieldSelect id="category" name="category" defaultValue="visit" options={Object.entries(categories).map(([value, label]) => ({value, label}))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">{isAm ? "መልእክት" : "Your message"}</Label>
          <Textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={5}
          />
        </div>
        <Label className="flex items-center gap-3 text-sm font-normal text-muted-foreground leading-relaxed">
          <Checkbox name="prayer" onCheckedChange={() => setDraft("")} />
          {isAm ? "ይህ የጸሎት ጥያቄ ነው" : "This is a prayer request"}
        </Label>
        <Button type="submit">
          {isAm ? "ኢሜይሉን ያዘጋጁ" : "Prepare email"}
          <ArrowUpRight className="size-4" />
        </Button>
        {draft && (
          <div role="status" className="rounded-2xl bg-tint p-5 space-y-4">
            <p className="flex items-start gap-2 text-sm text-foreground">
              <Check className="size-4 shrink-0 mt-0.5 text-primary" />
              {isAm
                ? "መልእክትዎ ተዘጋጅቷል። ለመላክ የኢሜይል መተግበሪያዎን ይክፈቱ።"
                : "Your draft is ready. Open your email app to review and send it."}
            </p>
            <a href={draft} className={buttonVariants({ variant: "primary" })}>
              {isAm ? "የኢሜይል ረቂቁን ይክፈቱ" : "Open email draft"}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
