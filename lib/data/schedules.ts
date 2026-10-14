export interface ScheduleItem {
  id: string;
  title: string;
  titleAm: string;
  day: string;
  dayAm: string;
  eatTime: string;
  localTime: string;
  location: string;
  locationAm: string;
  description: string;
  descriptionAm: string;
  badge?: string;
  badgeAm?: string;
  icon: string;
  translationNotes: string;
  translationNotesAm: string;
}

export interface TimeExplainer {
  title: string;
  titleAm: string;
  badge: string;
  badgeAm: string;
  description: string;
  descriptionAm: string;
  offsetHours: number;
  conversionGuide: {
    standard: string;
    ethiopian: string;
    note: string;
    noteAm: string;
  }[];
}

export const timeExplainer: TimeExplainer = {
  title: "Understanding Ethiopian Local Time",
  titleAm: "የኢትዮጵያ ሰዓት አቆጣጠር ማብራሪያ",
  badge: "6-Hour Offset Guide",
  badgeAm: "የ6 ሰዓት ልዩነት",
  description:
    "Ethiopian daytime counting starts at sunrise (6:00 AM standard clock time = 12:00 ጠዋት). To eliminate confusion for our international visitors and diaspora family, our schedules show both Standard East Africa Time (EAT) and local Ethiopian Time (ቀን / ማታ).",
  descriptionAm:
    "በኢትዮጵያ የቀን ሰዓት አቆጣጠር ከጠዋቱ 12:00 ፀሐይ ስትወጣ (በዓለም አቀፍ አቆጣጠር 6:00 AM) ይጀምራል። ለተጠቃሚዎቻችን ግልጽ እንዲሆን ሁለቱም ዓለም አቀፍ (EAT) እና የኢትዮጵያ ሰዓት አቆጣጠር ተካቷል።",
  offsetHours: 6,
  conversionGuide: [
    { standard: "6:00 AM EAT", ethiopian: "12:00 ጠዋት", note: "Daybreak / Sunrise", noteAm: "የንጋት ፀሐይ መውጫ" },
    { standard: "9:00 AM EAT", ethiopian: "3:00 ጠዋት", note: "Sunday Morning Worship", noteAm: "የእሑድ ጠዋት አምልኮ" },
    { standard: "12:00 PM EAT", ethiopian: "6:00 እኩለ ቀን", note: "Midday / Lunch", noteAm: "እኩለ ቀን" },
    { standard: "4:00 PM EAT", ethiopian: "10:00 ከሰዓት", note: "Saturday Youth Gathering", noteAm: "የቅዳሜ የወጣቶች ሕብረት" },
    { standard: "6:00 PM EAT", ethiopian: "12:00 ማታ / ምሽት", note: "Thursday Evening Prayer", noteAm: "የሐሙስ ምሽት ጸሎት" },
  ],
};

export const weeklySchedules: ScheduleItem[] = [
  {
    id: "sunday-worship",
    title: "Sunday Main Worship",
    titleAm: "የእሑድ አምልኮና ቃለ-እግዚአብሔር",
    day: "Sunday",
    dayAm: "እሑድ",
    eatTime: "9:00 AM – 12:00 PM EAT",
    localTime: "3:00 – 6:00 ጠዋት",
    location: "Main Sanctuary Auditorium, Summit",
    locationAm: "ዋናው የመሰብሰቢያ አዳራሽ፣ ሰሚት",
    description:
      "Corporate praise, communion thanksgiving, inspired biblical preaching, and Sunday school for all children classes.",
    descriptionAm:
      "የሕብረት ምስጋና፣ የጌታ እራት፣ መንፈሳዊ ትምህርት እንዲሁም ለሁሉም ዕድሜ የሰንበት ትምህርት ቤት አገልግሎት።",
    badge: "Main Service",
    badgeAm: "ዋና ፕሮግራም",
    icon: "Sun",
    translationNotes: "Simultaneous English translation headphones available at the entrance hospitality desk.",
    translationNotesAm: "በእንግሊዝኛ ቋንቋ የትርጉም የጆሮ ማዳመጫዎች በመስተንግዶ ጠረጴዛው ላይ ይገኛሉ።",
  },
  {
    id: "thursday-prayer",
    title: "Thursday Word & Prayer",
    titleAm: "የሐሙስ የጸሎትና የቃል ምሽት",
    day: "Thursday",
    dayAm: "ሐሙስ",
    eatTime: "6:00 PM – 7:30 PM EAT",
    localTime: "12:00 – 1:30 ማታ",
    location: "Fellowship Hall & Prayer Chapel",
    locationAm: "የሕብረት አዳራሽና የጸሎት ክፍል",
    description:
      "Deep dive into scriptures with verse-by-verse exposition followed by intentional pastoral prayer and healing intercession.",
    descriptionAm:
      "የመጽሐፍ ቅዱስ ጥናት ከጥልቅ የቃል ማብራሪያ ጋር፣ የፈውስና የልመና ጸሎት።",
    badge: "Midweek Gathering",
    badgeAm: "የሳምንቱ አጋማሽ",
    icon: "BookOpen",
    translationNotes: "Conducted in Amharic with bilingual personal ministry available.",
    translationNotesAm: "በአማርኛ የሚካሄድ ሲሆን የሁለትዮሽ የግል ጸሎት አገልግሎት ይሰጣል።",
  },
  {
    id: "saturday-youth",
    title: "Saturday Youth & Choir",
    titleAm: "የወጣቶችና የመዘምራን ሕብረት",
    day: "Saturday",
    dayAm: "ቅዳሜ",
    eatTime: "4:00 PM – 6:00 PM EAT",
    localTime: "10:00 – 12:00 ከሰዓት",
    location: "Summit Youth & Awana Center",
    locationAm: "የወጣቶችና አዋና ማዕከል፣ ሰሚት",
    description:
      "Vibrant worship preparation, teen and college student discussions, contemporary acoustic hymns, and communal tea time.",
    descriptionAm:
      "የወጣቶች የውይይት መድረክ፣ የዝማሬ ልምምድ፣ መንፈሳዊ ሕብረት እና የሻይ ሰዓት።",
    badge: "Youth Fellowship",
    badgeAm: "የወጣቶች ሕብረት",
    icon: "Music",
    translationNotes: "Bilingual Amharic and English interactions.",
    translationNotesAm: "በአማርኛና በእንግሊዝኛ የሚካሄድ ሕብረት።",
  },
];
