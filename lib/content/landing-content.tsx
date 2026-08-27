import type { LandingContent, Language, NavMenuItem } from "@/lib/types/landing";

export const logoSrc = "/logo.png";

export const navItems: NavMenuItem[] = [
  { href: "#visit", en: "Visit", am: "ጎብኙ" },
  { href: "#about", en: "About", am: "ስለ እኛ" },
  { href: "#ministries", en: "Ministries", am: "አገልግሎቶች" },
  { href: "#events", en: "Events", am: "ዝግጅቶች" },
  { href: "#gallery", en: "Gallery", am: "ፎቶዎች" },
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
    galleryTitle: (
      <>
        Life together,
        <br />
        <i>in pictures.</i>
      </>
    ),
    galleryText:
      "Explore moments from our gatherings — worship, Bible study circles, altar prayer, and testimonies.",
    galleryViewAll: "All Photos",
    galleryBackToAlbums: "Back to all albums",
    galleryPhotosLabel: "photos",
    galleryAlbums: [
      {
        id: "worship",
        tag: "Youth Worship",
        title: "Youth Worship & Praise",
        description:
          "Vibrant praise, live youth choir, band, and passionate worship in God's presence.",
        coverSrc: "/gallery/photo_24_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_24_2026-08-27_14-11-14.jpg", alt: "Worship team and live band leading praise" },
          { src: "/gallery/photo_23_2026-08-27_14-11-14.jpg", alt: "Lead vocalist singing with the worship band" },
          { src: "/gallery/photo_19_2026-08-27_14-11-14.jpg", alt: "Lifting hands in heartfelt praise" },
          { src: "/gallery/photo_22_2026-08-27_14-11-14.jpg", alt: "Congregation members in deep worship" },
          { src: "/gallery/photo_25_2026-08-27_14-11-14.jpg", alt: "Worship team gathered before the cross" },
          { src: "/gallery/photo_20_2026-08-27_14-11-14.jpg", alt: "Youth worshipping under the sanctuary cross" },
          { src: "/gallery/photo_21_2026-08-27_14-11-14.jpg", alt: "Church family standing in reverence" },
        ],
      },
      {
        id: "youth",
        tag: "Youth Ministry",
        title: "Youth Bible Study & Fellowship",
        description:
          "Small group circles, open Bibles, diligent note-taking, and genuine community.",
        coverSrc: "/gallery/photo_10_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_10_2026-08-27_14-11-14.jpg", alt: "Youth circle discussion and Bible study" },
          { src: "/gallery/photo_14_2026-08-27_14-11-14.jpg", alt: "Group studying scriptures together" },
          { src: "/gallery/photo_16_2026-08-27_14-11-14.jpg", alt: "Small group open Bible discussions" },
          { src: "/gallery/photo_11_2026-08-27_14-11-14.jpg", alt: "Youth writing sermon and study notes" },
          { src: "/gallery/photo_12_2026-08-27_14-11-14.jpg", alt: "Personal journaling and Bible study notes" },
          { src: "/gallery/photo_13_2026-08-27_14-11-14.jpg", alt: "Diligently studying the Word" },
          { src: "/gallery/photo_15_2026-08-27_14-11-14.jpg", alt: "Fellowship and active listening in small groups" },
          { src: "/gallery/photo_17_2026-08-27_14-11-14.jpg", alt: "Sanctuary hall with multiple small groups" },
          { src: "/gallery/photo_18_2026-08-27_14-11-14.jpg", alt: "Fellowship and reflection under the cross" },
        ],
      },
      {
        id: "prayer",
        tag: "Prayer & Ministry",
        title: "Prayer & Altar Ministry",
        description:
          "United in earnest prayer, laying on of hands, and heartfelt intercession for one another.",
        coverSrc: "/gallery/photo_4_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_4_2026-08-27_14-11-14.jpg", alt: "Youth holding hands in united prayer" },
          { src: "/gallery/photo_1_2026-08-27_14-11-14.jpg", alt: "Passionate prayer and intercession" },
          { src: "/gallery/photo_2_2026-08-27_14-11-14.jpg", alt: "Pastoral blessing and laying on of hands" },
          { src: "/gallery/photo_3_2026-08-27_14-11-14.jpg", alt: "Congregation standing together in altar prayer" },
        ],
      },
      {
        id: "word",
        tag: "Word & Sharing",
        title: "Testimonies & Speaking the Word",
        description:
          "Believers and youth leaders stepping up to testify and share God's goodness from the pulpit.",
        coverSrc: "/gallery/photo_9_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_9_2026-08-27_14-11-14.jpg", alt: "Speaker sharing under the illuminated cross" },
          { src: "/gallery/photo_5_2026-08-27_14-11-14.jpg", alt: "Sister sharing scripture and exhortation" },
          { src: "/gallery/photo_6_2026-08-27_14-11-14.jpg", alt: "Speaker sharing God's Word at the podium" },
          { src: "/gallery/photo_7_2026-08-27_14-11-14.jpg", alt: "Young brother sharing message notes" },
          { src: "/gallery/photo_8_2026-08-27_14-11-14.jpg", alt: "Sharing testimony with congregation" },
        ],
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
    galleryTitle: (
      <>
        አብሮ የሚኖር
        <br />
        <i>ሕይወት።</i>
      </>
    ),
    galleryText:
      "ከስብሰባዎቻችን — ከአምልኮ፣ ከየቃል ጥናት ክበባት፣ ከጸሎት እና ከመድረክ ምስክርነት የተወሰዱ ምስሎች።",
    galleryViewAll: "ሁሉም ፎቶዎች",
    galleryBackToAlbums: "ወደ ሁሉም አልበሞች ተመለስ",
    galleryPhotosLabel: "ፎቶዎች",
    galleryAlbums: [
      {
        id: "worship",
        tag: "የወጣቶች አምልኮ",
        title: "የወጣቶች አምልኮና ምስጋና",
        description:
          "የወጣቶች መዘምራን፣ የሙዚቃ ባንድ እና ሕያው አምልኮ በእግዚአብሔር ፊት።",
        coverSrc: "/gallery/photo_24_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_24_2026-08-27_14-11-14.jpg", alt: "የአምልኮ ቡድኑና የሙዚቃ ባንድ አምልኮን ሲመሩ" },
          { src: "/gallery/photo_23_2026-08-27_14-11-14.jpg", alt: "የአምልኮ መሪዋ በዝማሬ ስታመልክ" },
          { src: "/gallery/photo_19_2026-08-27_14-11-14.jpg", alt: "እጅን አንስቶ እግዚአብሔርን ማመስገን" },
          { src: "/gallery/photo_22_2026-08-27_14-11-14.jpg", alt: "ምዕመናን በጥልቅ አምልኮ ውስጥ" },
          { src: "/gallery/photo_25_2026-08-27_14-11-14.jpg", alt: "የአምልኮ ቡድኑ በመስቀሉ ፊት" },
          { src: "/gallery/photo_20_2026-08-27_14-11-14.jpg", alt: "ወጣቶች በመስቀሉ ስር ሲያመልኩ" },
          { src: "/gallery/photo_21_2026-08-27_14-11-14.jpg", alt: "ቤተሰባችን በአክብሮት ቆሞ ሲያመልክ" },
        ],
      },
      {
        id: "youth",
        tag: "የወጣቶች አገልግሎት",
        title: "የወጣቶች የቃል ጥናትና ሕብረት",
        description:
          "ወጣቶች በክበብ ተቀምጠው መጽሐፍ ቅዱስን ሲያጠኑ፣ ማስታወሻ ሲይዙ እና በእምነት ሲያድጉ።",
        coverSrc: "/gallery/photo_10_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_10_2026-08-27_14-11-14.jpg", alt: "የወጣቶች የክበብ ውይይትና የቃል ጥናት" },
          { src: "/gallery/photo_14_2026-08-27_14-11-14.jpg", alt: "ቃሉን በአንድነት ማጥናት" },
          { src: "/gallery/photo_16_2026-08-27_14-11-14.jpg", alt: "የትንንሽ ቡድኖች የመጽሐፍ ቅዱስ ጥናት" },
          { src: "/gallery/photo_11_2026-08-27_14-11-14.jpg", alt: "የስብከትና የጥናት ማስታወሻ ሲያዝ" },
          { src: "/gallery/photo_12_2026-08-27_14-11-14.jpg", alt: "የግል ማስታወሻ መያዝ" },
          { src: "/gallery/photo_13_2026-08-27_14-11-14.jpg", alt: "ቃሉን በትጋት ማጥናት" },
          { src: "/gallery/photo_15_2026-08-27_14-11-14.jpg", alt: "የወጣቶች ሕብረትና በጥሞና ማዳመጥ" },
          { src: "/gallery/photo_17_2026-08-27_14-11-14.jpg", alt: "በአዳራሹ ውስጥ የተደረጉ የቡድን ጥናቶች" },
          { src: "/gallery/photo_18_2026-08-27_14-11-14.jpg", alt: "በመስቀሉ ስር የተደረገ ውይይት" },
        ],
      },
      {
        id: "prayer",
        tag: "የጸሎት አገልግሎት",
        title: "የጸሎትና የምልጃ ጊዜያት",
        description:
          "በአንድ ልብ በመሆን የተደረገ ልባዊ ጸሎት፣ እጅ መጫን እና ምልጃ።",
        coverSrc: "/gallery/photo_4_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_4_2026-08-27_14-11-14.jpg", alt: "ወጣቶች እጅ ለእጅ ተያይዘው ሲጸልዩ" },
          { src: "/gallery/photo_1_2026-08-27_14-11-14.jpg", alt: "ልባዊ ጸሎትና ምልጃ" },
          { src: "/gallery/photo_2_2026-08-27_14-11-14.jpg", alt: "የአገልጋይ ምርቃትና እጅ መጫን" },
          { src: "/gallery/photo_3_2026-08-27_14-11-14.jpg", alt: "ምዕመናን በመድረኩ ፊት ለጸሎት ቆመው" },
        ],
      },
      {
        id: "word",
        tag: "የቃል ምስክርነት",
        title: "ምስክርነትና የቃል ማካፈል",
        description:
          "አማኞች እና የወጣቶች መሪዎች የእግዚአብሔርን ታላቅ ሥራ ከመድረክ ሲመሰክሩ።",
        coverSrc: "/gallery/photo_9_2026-08-27_14-11-14.jpg",
        photos: [
          { src: "/gallery/photo_9_2026-08-27_14-11-14.jpg", alt: "በብርሃን መስቀል ስር ምስክርነት ሲሰጥ" },
          { src: "/gallery/photo_5_2026-08-27_14-11-14.jpg", alt: "እህት ቃሉንና ምክርን ስታካፍል" },
          { src: "/gallery/photo_6_2026-08-27_14-11-14.jpg", alt: "ከመድረክ የእግዚአብሔርን ቃል ማካፈል" },
          { src: "/gallery/photo_7_2026-08-27_14-11-14.jpg", alt: "ወጣት ወንድም ማስታወሻውን ይዞ ሲናገር" },
          { src: "/gallery/photo_8_2026-08-27_14-11-14.jpg", alt: "ምስክርነትን ለምዕመናን ማካፈል" },
        ],
      },
    ],
  },
};

