export interface GuidingPillar {
  id: string;
  number: string;
  title: string;
  titleAm: string;
  subtitle: string;
  subtitleAm: string;
  description: string;
  descriptionAm: string;
  scripture: string;
  scriptureAm: string;
  iconName: string;
}

export const guidingPillars: GuidingPillar[] = [
  {
    id: "gospel-centered",
    number: "01",
    title: "Gospel-Centered & Word-Anchored",
    titleAm: "መጽሐፍ ቅዱስንና ወንጌልን ማዕከል ያደረገ",
    subtitle: "Biblical Expository Authority",
    subtitleAm: "የቃሉ የበላይነት",
    description:
      "We uphold faithful, expository biblical preaching and teaching as the supreme authority and source of spiritual nourishment for daily living, sound doctrine, and renewal.",
    descriptionAm:
      "ትክክለኛውን የእግዚአብሔር ቃል በታማኝነት ማስተማር እና መስበክ ለዕለት ተዕለት ሕይወት፣ ለእምነት እና ለመንፈሳዊ እድገት ብቸኛ መመሪያችን ነው።",
    scripture: "2 Timothy 3:16-17",
    scriptureAm: "2 ጢሞቴዎስ 3:16-17",
    iconName: "BookOpen",
  },
  {
    id: "warm-welcome",
    number: "02",
    title: "Warm Welcome & Family Fellowship",
    titleAm: "ሞቅ ያለ አቀባበልና የወንድማማችነት ሕብረት",
    subtitle: "A Spiritual Home Where You Belong",
    subtitleAm: "የመተሳሰብና የፍቅር ማዕከል",
    description:
      "Creating an authentic, hospitable community where every seeker, visitor, elder, and believer is embraced in Christ's love, finds belonging, and shares one another's burdens.",
    descriptionAm:
      "ማንኛውም አዲስ መጤ፣ ቤተሰብ እና አማኝ ተቀባይነት የሚያገኝበት፣ እርስ በርስ የሚተሳሰብበት እና ሸክምን የሚደጋገፍበት ሞቅ ያለ መንፈሳዊ ቤት።",
    scripture: "Romans 15:7",
    scriptureAm: "ሮሜ 15:7",
    iconName: "Heart",
  },
  {
    id: "discipleship-family",
    number: "03",
    title: "Discipleship & Family Formation",
    titleAm: "ደቀመዝሙርነትና ቀጣዩን ትውልድ ማነጽ",
    subtitle: "Equipping Generations in Truth",
    subtitleAm: "ትውልድን በቃል ማነጽ",
    description:
      "Nurturing children, youth, and parents with intentional mentorship, weekly Awana clubs, vibrant student ministries, and multigenerational spiritual grounding.",
    descriptionAm:
      "ልጆችንና ወጣቶችን በአዋና ፕሮግራም፣ በወጣቶች ሕብረት እና በቤተሰብ መንፈሳዊ ልምምድ አማካኝነት በጠንካራ ክርስቲያናዊ መሠረት ማነጽ።",
    scripture: "Deuteronomy 6:6-7",
    scriptureAm: "ዘዳግም 6:6-7",
    iconName: "GraduationCap",
  },
  {
    id: "prayerful-dependence",
    number: "04",
    title: "Prayerful Dependence & Worship",
    titleAm: "በጸሎት በእግዚአብሔር መደገፍና እውነተኛ አምልኮ",
    subtitle: "Praising in Spirit and Truth",
    subtitleAm: "በመንፈስና በእውነት ማምለክ",
    description:
      "Heartfelt adoration combining choral majesty, acoustic praise, and ceaseless intercession, walking in humble reliance on the Holy Spirit's guidance and power.",
    descriptionAm:
      "በመንፈስና በእውነት የሚቀርብ እውነተኛ ምስጋና፣ የአምልኮ ዝማሬ እና በእግዚአብሔር ፊት ዘወትር በጸሎትና በልመና መተማመን።",
    scripture: "Philippians 4:6-7",
    scriptureAm: "ፊልጵስዩስ 4:6-7",
    iconName: "Flame",
  },
  {
    id: "serving-city",
    number: "05",
    title: "Serving Our City & Gospel Mission",
    titleAm: "ከተማችንን ማገልገልና የወንጌል ተልዕኮ",
    subtitle: "Radiant Light in Addis Ababa",
    subtitleAm: "በሰሚትና በከተማችን ብርሃን መሆን",
    description:
      "Demonstrating Christ's self-giving love through tangible neighbor relief, benevolence for vulnerable families, practical compassion, and bold evangelism across Summit.",
    descriptionAm:
      "የክርስቶስን ፍቅር በተግባር በማሳየት በሰሚትና በከተማችን ለሚገኙ ወገኖች ማኅበራዊ ድጋፍ ማድረስ፣ መጽናናት ማካፈል እና የሕይወትን ቃል ማብሰር።",
    scripture: "Matthew 5:14-16",
    scriptureAm: "ማቴዎስ 5:14-16",
    iconName: "Globe",
  },
];
