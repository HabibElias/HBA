export interface StatementOfFaith {
  id: string;
  title: string;
  titleAm: string;
  summary: string;
  summaryAm: string;
  scriptures: string[];
  scripturesAm: string[];
}

export const statementOfFaith: StatementOfFaith[] = [
  {
    id: "scripture",
    title: "The Holy Scriptures",
    titleAm: "ቅዱሳት መጻሕፍት",
    summary:
      "We believe that the Holy Scriptures—the 66 books of the Old and New Testaments—are verbally inspired by God, inerrant in the original autographs, and the supreme, complete authority for all Christian faith, doctrine, and holy living.",
    summaryAm:
      "ብሉይና ሐዲስ ኪዳን (66ቱ መጻሕፍት) በእግዚአብሔር መንፈስ የተጻፉ፣ ስህተት የሌለባቸው እና ለእምነታችንና ለኑሮአችን ብቸኛና የመጨረሻ ስልጣን ያላቸው የእግዚአብሔር ቃል እንደሆኑ እናምናለን።",
    scriptures: ["2 Timothy 3:16-17", "2 Peter 1:20-21", "Psalm 119:105"],
    scripturesAm: ["2 ጢሞቴዎስ 3:16-17", "2 ጴጥሮስ 1:20-21", "መዝሙር 119:105"],
  },
  {
    id: "the-trinity",
    title: "The Triune God",
    titleAm: "ሥላሴ (አንድ አምላክ በሦስት አካላት)",
    summary:
      "There is one eternally living God, sovereign Creator of heaven and earth, co-existing in three distinct, equal persons: God the Father, God the Son, and God the Holy Spirit, each possessing all divine attributes in infinite perfection.",
    summaryAm:
      "ሁሉን የፈጠረ አንድ እውነተኛ አምላክ ለዘላለም አለ፤ እርሱም በአብ፣ በወልድ እና በመንፈስ ቅዱስ በሦስት አካላት እኩል የሆነ መለኮታዊ ክብር ያለው አንድ አምላክ ነው።",
    scriptures: ["Genesis 1:1", "Matthew 28:19", "2 Corinthians 13:14"],
    scripturesAm: ["ዘፍጥረት 1:1", "ማቴዎስ 28:19", "2 ቆሮንቶስ 13:14"],
  },
  {
    id: "jesus-christ",
    title: "Jesus Christ",
    titleAm: "ጌታችን ኢየሱስ ክርስቶስ",
    summary:
      "Jesus Christ is fully God and fully man, miraculously conceived by the Holy Spirit and born of the Virgin Mary. He lived a sinless life, died on the cross as our substitutionary atonement, rose bodily from the grave, and ascended into heaven where He intercedes as our High Priest.",
    summaryAm:
      "ኢየሱስ ክርስቶስ ፍጹም አምላክና ፍጹም ሰው ነው። ከመንፈስ ቅዱስ ተፀንሶ ከድንግል ማርያም ተወለደ፤ ያለ ኃጢአት ኖረ፤ ስለ እኛ በመስቀል ላይ ሞተ፤ በሥጋ ተነሣ፤ ወደ ሰማይ አረገ፤ በአብ ቀኝም ስለ እኛ ይማልዳል።",
    scriptures: ["John 1:1, 14", "Philippians 2:5-11", "1 Corinthians 15:3-4"],
    scripturesAm: ["ዮሐንስ 1:1, 14", "ፊልጵስዩስ 2:5-11", "1 ቆሮንቶስ 15:3-4"],
  },
  {
    id: "salvation",
    title: "Salvation by Grace",
    titleAm: "ደኅንነት በጸጋ በእምነት",
    summary:
      "Humanity was created in God's image, but rebelled through sin, resulting in spiritual alienation and death. Salvation is an unearned gift of sovereign grace received solely through personal faith in the finished work and blood of Christ.",
    summaryAm:
      "ሰው በእግዚአብሔር አምሳል ተፈጥሮ በኃጢአት ወደቀ። ደኅንነት በሰው መልካም ሥራ ሳይሆን በኢየሱስ ክርስቶስ ቤዛነት በማመን ብቻ በጸጋ የሚገኝ የእግዚአብሔር ነጻ ስጦታ ነው።",
    scriptures: ["Ephesians 2:8-9", "Romans 3:23-26", "Titus 3:5"],
    scripturesAm: ["ኤፌሶን 2:8-9", "ሮሜ 3:23-26", "ቲቶ 3:5"],
  },
  {
    id: "the-church",
    title: "The Church",
    titleAm: "ቤተክርስቲያንና የታላቁ ተልዕኮ ጥሪ",
    summary:
      "The universal Church is the spiritual body and bride of Christ, expressed visibly in local fellowships. Guided by biblical elders, believers assemble to worship, break bread, exercise spiritual gifts, and proclaim the gospel to all nations.",
    summaryAm:
      "ሁለንተናዊቷ ቤተክርስቲያን የክርስቶስ አካል ስትሆን በአካባቢያዊ ጉባኤዎች ትገለጣለች። ሕዝቦችን ሁሉ ደቀ መዛሙርት በማድረግ፣ በማጥመቅ እና በማስተማር ታላቁን ተልዕኮ እንድንፈጽም ተጠርተናል።",
    scriptures: ["Matthew 28:19-20", "Acts 2:42-47", "1 Corinthians 12:12-27"],
    scripturesAm: ["ማቴዎስ 28:19-20", "የሐዋርያት ሥራ 2:42-47", "1 ቆሮንቶስ 12:12-27"],
  },
  {
    id: "christian-living",
    title: "Christian Living",
    titleAm: "ክርስቲያናዊ ኑሮና ቅድስና",
    summary:
      "Every believer is called to walk in holiness, love, and moral integrity through the sanctifying empowerment of the indwelling Holy Spirit, loving their neighbors and bearing fruit in every good work.",
    summaryAm:
      "አማኞች በመንፈስ ቅዱስ ኃይል በመታገዝ በቅድስና፣ በፍቅር፣ በእውነተኛነት እና በመልካም አገልግሎት እግዚአብሔርን የሚያስከብር ኑሮ እንዲኖሩ ተጠርተዋል።",
    scriptures: ["Galatians 5:22-25", "1 Peter 1:15-16", "Romans 12:1-2"],
    scripturesAm: ["ገላትያ 5:22-25", "1 ጴጥሮስ 1:15-16", "ሮሜ 12:1-2"],
  },
  {
    id: "hope-of-return",
    title: "Hope of Return",
    titleAm: "የክርስቶስ ዳግም ምጽዓት ተስፋ",
    summary:
      "We rejoice in the blessed hope of the personal, visible, and triumphant return of the Lord Jesus Christ, the resurrection of believers to eternal life, and the renewal of all creation under His righteous reign.",
    summaryAm:
      "የጌታችን የኢየሱስ ክርስቶስን ግልጽና ክቡር ዳግም ምጽዓት፣ የሙታንን ትንሣኤ እና የዘላለም መንግሥቱን መመስረት በታላቅ ተስፋ እንጠባበቃለን።",
    scriptures: ["1 Thessalonians 4:16-17", "Revelation 21:1-4", "Titus 2:13"],
    scripturesAm: ["1 ተሰሎንቄ 4:16-17", "ራእይ 21:1-4", "ቲቶ 2:13"],
  },
];
