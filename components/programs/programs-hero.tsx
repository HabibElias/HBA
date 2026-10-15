"use client";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
export function ProgramsHero() {
  const { lang } = useLanguage(); const isAm = lang === "am";
  return <PageIntro title={isAm ? "አብረን እንሰብሰብ፣ አብረን እንደግ።" : "Gather together. Grow together."}
    description={isAm ? "መጪ የአምልኮ፣ የትምህርትና የሕብረት መርሐ ግብሮችን ይመልከቱ። ካለፉት የቤተ ክርስቲያናችን ስብሰባዎች ትዝታዎችንም ያስሱ።" : "Make time for worship, learning, and fellowship. Find your next gathering, and look back on moments from our life as a church family."}
    image="/gallery/photo_15_2026-08-27_14-11-14.jpg" imageAlt={isAm ? "የቃል ጥናትና የሕብረት ጊዜ" : "A small group sharing a Bible study"}>
    <Link href="#upcoming" className={buttonVariants({variant:"primary"})}>{isAm ? "መጪ መርሐ ግብሮች" : "Upcoming gatherings"}</Link>
    <Link href="#archive" className={buttonVariants({variant:"outline"})}>{isAm ? "ያለፉ መርሐ ግብሮች" : "Explore past gatherings"}</Link>
  </PageIntro>;
}
