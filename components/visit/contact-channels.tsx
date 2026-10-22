"use client";
import { useContent } from "@/lib/context/content-context";

import { Phone, Mail, Send, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
const channelDefinitions = [
  {id:"phone",icon:Phone,title:"Call the church office",titleAm:"ለቤተ ክርስቲያን ቢሮ ይደውሉ",detail:"+251 911 234 567",href:"tel:+251911234567",note:"Questions before your visit",noteAm:"ከጉብኝትዎ በፊት ላሉ ጥያቄዎች"},
  {id:"email",icon:Mail,title:"Write to our team",titleAm:"ለቡድናችን ይጻፉ",detail:"info@hiwotbirhan-summit.org",href:"mailto:info@hiwotbirhan-summit.org",note:"Visits, fellowship & pastoral care",noteAm:"ስለ ጉብኝት፣ ሕብረትና የመጋቢ ምክር"},
  {id:"telegram",icon:Send,title:"Follow our church life",titleAm:"የቤተ ክርስቲያናችንን ዜና ይከታተሉ",detail:"@HiwotBirhanSummit",href:"https://t.me/HiwotBirhanSummit",note:"Weekly messages & announcements",noteAm:"ሳምንታዊ መልእክቶችና ማስታወቂያዎች"},
];
export function ContactChannels() {
  const {settings}=useContent();
  const channels = channelDefinitions.map(c=>c.id==="phone"?{...c,detail:settings.phone,href:`tel:${settings.phone}`}:c.id==="email"?{...c,detail:settings.email,href:`mailto:${settings.email}`}:{...c,detail:"@"+settings.telegram.split("/").pop(),href:settings.telegram});
  const {lang}=useLanguage();const isAm=lang==="am";
  return <section id="contact-channels">
    <div className="max-w-2xl mb-10"><h2 className="section-title">{isAm ? "እንነጋገር።" : "We’d love to hear from you."}</h2><p className="body-copy mt-5">{isAm ? "ከመምጣትዎ በፊት ላሉ ጥያቄዎች፣ ለጸሎትና ለሕብረት ያግኙን።" : "A question before you come, a prayer request, or a simple hello. Choose the way that works for you."}</p></div>
    <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
      {channels.map(({id,icon:Icon,...c})=><a key={id} href={c.href} target={id==="telegram"?"_blank":undefined} rel={id==="telegram"?"noopener noreferrer":undefined} className="group min-w-0 bg-surface border border-border hover:border-primary/30 rounded-3xl p-6 lg:p-8 flex flex-col items-start transition-colors">
        <Icon className="size-6 text-primary mb-6"/>
        <h3 className="font-display text-xl font-semibold leading-snug">{isAm?c.titleAm:c.title}</h3>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{isAm?c.noteAm:c.note}</p>
        <span className="flex items-start justify-between gap-3 w-full text-sm font-semibold text-primary mt-auto pt-7"><span className="break-all">{c.detail}</span><ArrowUpRight className="size-4 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></span>
      </a>)}
    </div>
  </section>;
}
