"use client";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
export function StoryHero() {
  const { lang } = useLanguage(); const isAm = lang === "am";
  return <PageIntro title={isAm ? "ታሪካችን፣ እምነታችን እና እሴቶቻችን" : "A church family, rooted in faith."}
    description={isAm ? "በአዲስ አበባ ሰሚት እግዚአብሔርን ለማምለክ፣ ቃሉን ለመስማትና በእምነት አብሮ ለማደግ የተሰበሰብን መንፈሳዊ ቤተሰብ ነን።" : "We gather in Summit, Addis Ababa, to worship God, hear His Word, and grow together. Get to know the faith and shared commitments at the heart of our church."}
    image="/gallery/photo_2_2026-08-27_14-11-14.jpg" imageAlt={isAm ? "የሰሚት ቤተ ክርስቲያን ሕብረት" : "Our church family gathered in Summit"}>
    <Link href="#faith" className={buttonVariants({variant:"primary"})}>{isAm ? "እምነታችን" : "What we believe"}</Link>
    <Link href="/visit" className={buttonVariants({variant:"outline"})}>{isAm ? "ይጎብኙን" : "Come and meet us"}</Link>
  </PageIntro>;
}
