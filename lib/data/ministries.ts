export interface Ministry {
  id: string;
  name: string;
  nameAm: string;
  meetingTime: string;
  meetingTimeAm: string;
  targetAudience: string;
  targetAudienceAm: string;
  description: string;
  descriptionAm: string;
  contactEmail: string;
  contactPhone: string;
  leaderName: string;
  leaderNameAm: string;
  iconName: string;
}

export const coreMinistries: Ministry[] = [
  {
    id: "worship-choir",
    name: "Worship & Choir Ministry",
    nameAm: "የአምልኮና የመዘምራን አገልግሎት",
    meetingTime: "Saturdays 3:30 PM & Sundays 8:00 AM",
    meetingTimeAm: "ቅዳሜ ከሰዓት 9:30 እና እሑድ ጠዋት 2:00",
    targetAudience: "Vocalists, instrumentalists, and worship intercessors",
    targetAudienceAm: "ዘማሪዎች፣ የሙዚቃ መሣሪያ ተጫዋቾች እና አምላኪዎች",
    description:
      "Exalting Christ through reverent choral anthems, contemporary Ethiopian praise, and scriptural adoration in both Amharic and English.",
    descriptionAm:
      "በአማርኛና በእንግሊዝኛ ቋንቋዎች በሚዘጋጁ መንፈሳዊ ዝማሬዎችና የአምልኮ ዜማዎች እግዚአብሔርን በቅድስና ማክበር።",
    contactEmail: "worship@hiwotbirhansummit.org",
    contactPhone: "+251 911 234 567",
    leaderName: "Brother Yared & Worship Council",
    leaderNameAm: "ወንድም ያሬድና የአምልኮ አስተባባሪዎች",
    iconName: "Music",
  },
  {
    id: "youth-ministry",
    name: "Youth & Young Adults",
    nameAm: "የወጣቶችና የዩኒቨርሲቲ ተማሪዎች",
    meetingTime: "Saturdays 4:00 PM – 6:00 PM EAT",
    meetingTimeAm: "ቅዳሜ ከሰዓት 10:00 – 12:00",
    targetAudience: "High school, university students, and young professionals",
    targetAudienceAm: "የሁለተኛ ደረጃና የዩኒቨርሲቲ ተማሪዎች እንዲሁም ወጣት ባለሙያዎች",
    description:
      "Equipping young adults to stand firm in biblical convictions, navigate contemporary culture, and lead missional lives across Addis Ababa.",
    descriptionAm:
      "ወጣቶች በዘመናችን ያሉ ተግዳሮቶችን በመጽሐፍ ቅዱሳዊ እውነት እንዲያሸንፉና በሙያቸውም ሆነ በኑሮአቸው ክርስቶስን እንዲመስሉ ማብቃት።",
    contactEmail: "youth@hiwotbirhansummit.org",
    contactPhone: "+251 922 345 678",
    leaderName: "Pastor Natnael Tadesse",
    leaderNameAm: "ፓስተር ናትናኤል ታደሰ",
    iconName: "Users",
  },
  {
    id: "children-awana",
    name: "Children Ministry & Awana",
    nameAm: "የሕፃናትና የአዋና አገልግሎት",
    meetingTime: "Sundays 9:30 AM & Saturdays 9:00 AM",
    meetingTimeAm: "እሑድ ጠዋት 3:30 እና ቅዳሜ ጠዋት 3:00",
    targetAudience: "Ages 3 to 14 (Nursery, Sparks, and T&T Clubs)",
    targetAudienceAm: "ከ3 እስከ 14 ዓመት ዕድሜ ያላቸው ሕፃናትና ታዳጊዎች",
    description:
      "Nurturing precious children with foundational Bible lessons, scripture memory awards, character-building games, and family support.",
    descriptionAm:
      "ሕፃናት ከልጅነታቸው የእግዚአብሔርን ቃል እንዲያውቁና እንዲያስታውሱ በጨዋታና በሽልማት የታገዘ የተሟላ መንፈሳዊ ሥልጠና።",
    contactEmail: "awana@hiwotbirhansummit.org",
    contactPhone: "+251 933 456 789",
    leaderName: "Sister Selamawit Bekele",
    leaderNameAm: "እህት ሰላማዊት በቀለ",
    iconName: "Sparkles",
  },
  {
    id: "prayer-care",
    name: "Prayer & Pastoral Care",
    nameAm: "የጸሎትና የምክር አገልግሎት",
    meetingTime: "Thursdays 6:00 PM & By Appointment",
    meetingTimeAm: "ሐሙስ ማታ 12:00 እና በቀጠሮ",
    targetAudience: "All seeking intercession, healing, counseling, and hospital visitation",
    targetAudienceAm: "ጸሎት፣ ማጽናናት፣ መንፈሳዊ ምክር እና የሆስፒታል መጠየቅ ለሚሹ ሁሉ",
    description:
      "Standing in the gap through fervent prayer, personal counseling, home visits, hospital ministry, and compassionate family grief support.",
    descriptionAm:
      "በጸሎት መተማመን፣ የሕመምተኞችንና አረጋውያንን መጎብኘት፣ በችግር ጊዜ ደግሞ በምክርና በፍቅር ከጎን መቆም።",
    contactEmail: "care@hiwotbirhansummit.org",
    contactPhone: "+251 911 890 123",
    leaderName: "Elder Berhanu Alemayehu",
    leaderNameAm: "ሽማግሌ ብርሃኑ አለማየሁ",
    iconName: "HeartHandshake",
  },
];
