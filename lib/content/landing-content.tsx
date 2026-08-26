import type { LandingContent, Language, NavMenuItem } from "@/lib/types/landing";

export const logoSrc = "/logo.png";

export const navItems: NavMenuItem[] = [
  { href: "#visit", en: "Visit", am: "ጎብኙ" },
  { href: "#about", en: "About", am: "ስለ እኛ" },
  { href: "#ministries", en: "Ministries", am: "አገልግሎቶች" },
  { href: "#events", en: "Events", am: "ዝግጅቶች" },
  { href: "#sermons", en: "Sermons", am: "ስብከቶች" },
];

export const copy: Record<Language, LandingContent> = {
  en: {
    visit: "Plan your visit",
    hero: (
      <>
        Come and worship
        <br />
        <i>with us.</i>
      </>
    ),
    heroCopy:
      "At Hiwot Birhan, we gather to worship God, hear His Word, and grow together in faith. You are warmly welcome in His presence.",
    firstVisit: "Plan your first visit",
    latest: "Watch latest message",
    sunday: "Sundays at 9 & 11 AM",
    address: "Addis Ababa, Ethiopia",
    introTitle: (
      <>
        A family gathered
        <br />
        around <i>God&apos;s Word.</i>
      </>
    ),
    intro:
      "We believe faith is lived together. Hiwot Birhan is a family of believers learning to love God, love our neighbors, and serve our city in the name of Christ.",
    know: "Get to know us",
    sundayTitle: (
      <>
        Join us
        <br />
        <i>for worship.</i>
      </>
    ),
    sundayText:
      "Every gathering is centered on the same hope: God’s Word read, preached, and sung by His people. Pick a time that works for you.",
    sermonTitle: (
      <>
        Hope that
        <br />
        <i>does not</i> disappoint.
      </>
    ),
    sermonText:
      "A message from our latest Sunday gathering on the hope we have in Christ — a hope that will never put us to shame.",
    watch: "Watch message",
    comingLabel: "What’s coming up",
    eventsTitle: (
      <>
        Faith lived
        <br />
        <i>together.</i>
      </>
    ),
    allEvents: "View all events",
    ministriesTitle: (
      <>
        Serving
        <br />
        <i>together.</i>
      </>
    ),
    ministriesText:
      "Every member has a part in the body of Christ. Find your place to serve and grow alongside us.",
    quote: "“I was glad when they said to me, ‘Let us go into the house of the LORD.’”",
    citation: "Psalm 122:1",
    contactTitle: (
      <>
        Questions?
        <br />
        <i>We&apos;re here.</i>
      </>
    ),
    contactText:
      "Whether it’s your first Sunday or your hundredth, we’d love to hear from you.",
    name: "Your name",
    namePlaceholder: "How should we call you?",
    email: "Email address",
    message: "How can we help?",
    messagePlaceholder: "Tell us a little more...",
    time: "Preferred visit time",
    chooseTime: "Choose a time",
    send: "Send a message",
    sent: "Message sent",
    sentTitle: "Thank you.",
    sentText:
      "Your message is on its way — we’ll get back to you soon.",
    sendAnother: "Send another message",
    footer: "Proclaiming the light of life in Addis Ababa.",
    footerTimes: "Worship with us",
    footerExplore: "Explore",
    footerContact: "Contact",
    midweekTime: "Wednesdays 6:30 PM",
    selectMorning: "Sunday morning",
    selectMidweek: "Wednesday evening",
    selectAny: "Any time",
    services: [
      {
        day: "Sunday",
        time: "9:00 AM",
        name: "Classic Service",
        detail: "Traditional worship with choir and communion.",
      },
      {
        day: "Sunday",
        time: "11:00 AM",
        name: "Modern Service",
        detail: "Contemporary worship and a message from God’s Word.",
      },
      {
        day: "Wednesday",
        time: "6:30 PM",
        name: "Midweek Gathering",
        detail: "Prayer, Bible study, and fellowship for all ages.",
      },
    ],
    ministries: [
      {
        name: "Worship & Choir",
        detail: "Leading the congregation in song every Sunday.",
      },
      {
        name: "Children",
        detail: "Sunday school where children learn God’s Word with joy.",
      },
      {
        name: "Youth",
        detail: "Young people growing in faith, friendship, and service.",
      },
      {
        name: "Prayer & Care",
        detail: "Praying for one another and meeting practical needs.",
      },
    ],
    events: [
      {
        date: "SEP 14",
        title: "Fall Community Picnic",
        detail: "Food, music, games, and neighbors. Everyone is welcome.",
        type: "Community",
      },
      {
        date: "SEP 21",
        title: "Rooted: A 6-week study",
        detail: "A practical study for growing deeper in faith together.",
        type: "Groups",
      },
      {
        date: "OCT 05",
        title: "Serve Day",
        detail: "A Saturday of practical care across our city.",
        type: "Outreach",
      },
    ],
  },
  am: {
    visit: "ጉብኝትዎን ያቅዱ",
    hero: (
      <>
        ኑና አብረን
        <br />
        <i>እናምልክ።</i>
      </>
    ),
    heroCopy:
      "በሕይወት ብርሃን እግዚአብሔርን ለማምለክ፣ ቃሉን ለመስማት እና በእምነት አብረን ለማደግ እንሰበሰባለን። በእግዚአብሔር ፊት በፍቅር እንቀበልዎታለን።",
    firstVisit: "የመጀመሪያ ጉብኝትዎን ያቅዱ",
    latest: "የቅርብ ጊዜ መልዕክትን ይመልከቱ",
    sunday: "እሁድ 9 እና 11 ሰዓት",
    address: "አዲስ አበባ፣ ኢትዮጵያ",
    introTitle: (
      <>
        በእግዚአብሔር ቃል
        <br />
        <i>ዙሪያ የተሰበሰበ</i>
        <br />
        ቤተሰብ።
      </>
    ),
    intro:
      "እምነት በአንድነት ሲኖር የተሻለ ነው ብለን እናምናለን። ሕይወት ብርሃን እግዚአብሔርንና ባልንጀሮቻችንን መውደድ የምንማርበት የአማኞች ቤተሰብ ነው።",
    know: "ስለ እኛ ይወቁ",
    sundayTitle: (
      <>
        ለአምልኮ
        <br />
        <i>ይቀላቀሉን።</i>
      </>
    ),
    sundayText:
      "እያንዳንዱ ስብሰባ በአንድ ተስፋ ላይ ያተኩራል፦ የእግዚአብሔር ቃል መነበብ፣ መሰብከል እና መዘመር።",
    sermonTitle: (
      <>
        የማያአዝድ
        <br />
        <i>ተስፋ።</i>
      </>
    ),
    sermonText: "ክርስቶስ በእኛ ውስጥ ያለውን ተስፋ የሚያስረዳ ከቅርብ እሁድ ስብሰባችን መልዕክት።",
    watch: "መልዕክቱን ይመልከቱ",
    comingLabel: "መጪ ዝግጅቶች",
    eventsTitle: (
      <>
        በአብሮነት
        <br />
        <i>የሚኖር እምነት።</i>
      </>
    ),
    allEvents: "ሁሉንም ዝግጅቶች ይመልከቱ",
    ministriesTitle: (
      <>
        አብረን
        <br />
        <i>እናገለግላለን።</i>
      </>
    ),
    ministriesText:
      "እያንዳንዱ አባል በክርስቶስ አካል ውስጥ የራሱ ድርሻ አለው። የእርስዎን የአገልግሎት ቦታ ያግኙ።",
    quote: "“ወደ እግዚአብሔር ቤት እንሂድ ባሉኝ ጊዜ ደስ አለኝ።”",
    citation: "መዝሙር ፻፳፥፩",
    contactTitle: (
      <>
        ጥያቄ አለዎት?
        <br />
        <i>እዚህ ነን።</i>
      </>
    ),
    contactText: "የመጀመሪያ ጉብኝትዎ ይሁን መቶኛው፣ ከእርስዎ መስማት እንወዳለን።",
    name: "ስምዎ",
    namePlaceholder: "እንዴት እንጠራዎት?",
    email: "የኢሜይል አድራሻ",
    message: "እንዴት ልንረዳዎት?",
    messagePlaceholder: "ትንሽ ተጨማሪ ይንገሩን...",
    time: "የጉብኝት ጊዜ",
    chooseTime: "ጊዜ ይምረጡ",
    send: "መልዕክት ይላኩ",
    sent: "መልዕክት ተልኳል",
    sentTitle: "እናመሰግናለን።",
    sentText: "መልእክትዎ ደርሶናል — በቅርቡ እንመልሳለን።",
    sendAnother: "ሌላ መልዕክት ይላኩ",
    footer: "የሕይወት ብርሃንን በአዲስ አበባ እናስተላልፋለን።",
    footerTimes: "አብረን እናምልክ",
    footerExplore: "ያስሱ",
    footerContact: "ያግኙን",
    midweekTime: "ረቡዕ 6:30 ሰዓት",
    selectMorning: "እሁድ ጠዋት",
    selectMidweek: "ረቡዕ ማታ",
    selectAny: "ማንኛውም ጊዜ",
    services: [
      {
        day: "እሁድ",
        time: "9:00 AM",
        name: "ባህላዊ አምልኮ",
        detail: "በመዘምራን እና በቁርባን የታጀበ አምልኮ።",
      },
      {
        day: "እሁድ",
        time: "11:00 AM",
        name: "ዘመናዊ አምልኮ",
        detail: "ዘመናዊ አምልኮ እና ከእግዚአብሔር ቃል መልዕክት።",
      },
      {
        day: "ረቡዕ",
        time: "6:30 PM",
        name: "የሳምንት አጋማሽ ስብሰባ",
        detail: "ጸሎት፣ የቃል ጥናት እና ለሁሉም ዕድሜ ማኅበረሰብ።",
      },
    ],
    ministries: [
      { name: "ዜማና አምልኮ", detail: "በየእሁዱ ሕዝቡን በዜማ መሪ ሆኖ ማምለክ።" },
      {
        name: "የሕፃናት አገልግሎት",
        detail: "ሕፃናት የእግዚአብሔርን ቃል በደስታ የሚማሩበት የእሁድ ትምህርት ቤት።",
      },
      { name: "ወጣቶች", detail: "ወጣቶች በእምነትና በአብሮነት የሚያድጉበት ስብሰባ።" },
      {
        name: "ጸሎትና እንክብካቤ",
        detail: "ለእርስ በርስ የማመልከት እና የተግባር ፍላጎቶችን የማገልገል።",
      },
    ],
    events: [
      {
        date: "ሴፕ 14",
        title: "የማኅበረሰብ ሽርሽር",
        detail: "ምግብ፣ ሙዚቃ፣ ጨዋታዎች እና ጎረቤቶች። ሁሉም በደህና መጡ።",
        type: "ማኅበረሰብ",
      },
      {
        date: "ሴፕ 21",
        title: "ሥር የ6 ሳምንት ጥናት",
        detail: "በእምነት አብረን እንድናድግ የሚረዳ ግብረ ጥናት።",
        type: "መደቦች",
      },
      {
        date: "ኦክቶ 05",
        title: "የአገልግሎት ቀን",
        detail: "በከተማችን ዙሪያ የተግባር እንክብካቤ የሚደረግበት ቅዳሜ።",
        type: "አገልግሎት",
      },
    ],
  },
};
