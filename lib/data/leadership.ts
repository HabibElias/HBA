export interface Leader {
  id: string;
  name: string;
  nameAm: string;
  role: string;
  roleAm: string;
  category: "senior" | "associate" | "children" | "youth";
  bio: string;
  bioAm: string;
  image: string;
  alt: string;
}

export const leadershipTeam: Leader[] = [
  {
    id: "dawit-yohannes",
    name: "Pastor Dawit Yohannes",
    nameAm: "ፓስተር ዳዊት ዮሐንስ",
    role: "Senior Pastor",
    roleAm: "ዋና መጋቢ",
    category: "senior",
    bio: "Serving the Summit congregation with faithful expository preaching, theological mentoring, and a deep heart for family discipleship and church growth.",
    bioAm: "የሰሚትን ጉባኤ በታማኝነት በእግዚአብሔር ቃል በማነጽ፣ በምክርና በአመራር ከ10 ዓመታት በላይ በማገልገል ላይ ይገኛሉ።",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqh8_Aq9Jv5W3ld3G9Ut8S7F7kyi8lnhMoUPE4LOz9Zljh6eSoHPDGL8QkBDrFg77U6O27aFEvxQRvvm5GX7RlRIrT24VkGDJRtbV0oeshOLpfJ4dpg9im21vu6C8BgU2ZGkbutMbP5xd-L1UOFhQGDrR5WFCg2bwN660QEQag9GbiSgVnctALpWE7LmPPqVx3qG50zFQbi2p8Isjh_X0bZm8vRaWJwVwvPMcIKJ-z99KwYAKRBSzWvQ",
    alt: "Pastor Dawit Yohannes - Senior Pastor",
  },
  {
    id: "berhanu-alemayehu",
    name: "Elder Berhanu Alemayehu",
    nameAm: "ሽማግሌ ብርሃኑ አለማየሁ",
    role: "Associate Pastor & Pastoral Care",
    roleAm: "ተባባሪ መጋቢና የሽምግልና አስተባባሪ",
    category: "associate",
    bio: "Stewarding congregational governance, hospital visits, compassionate benevolence, and local neighborhood outreach across the Summit sub-city.",
    bioAm: "የቤተክርስቲያን አስተዳደር፣ የምክርና የመጎብኘት አገልግሎት እንዲሁም የማኅበራዊ ድጋፍ ሥራዎችን በቅንነት ይመራሉ።",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEiN3kbLe2R2A5_XeE8jv8nAdl9HjIyaT6R9rARov-IRkks_Y_-sfUgRMlrBWDIbZzAASVuze-Oxfj0i_y-12ujGpPiQdoyAOMJKP2eDeLOVC480SvBNPCeYWIfrTxi4GmxsRn5FC28-utLpXXiNNArT3OWefvwYRasWOWbTqAQDwN8s620QNMtDtJzq4iDlIwf214zeaMyj3Uvb4T74pikSbRBBamjsMlkEivsWfSjc1t6ZxpoACYYQ",
    alt: "Elder Berhanu Alemayehu - Associate Pastor",
  },
  {
    id: "selamawit-bekele",
    name: "Sister Selamawit Bekele",
    nameAm: "እህት ሰላማዊት በቀለ",
    role: "Children Ministry Director",
    roleAm: "የሕፃናትና የሰንበት ትምህርት ቤት ዳይሬክተር",
    category: "children",
    bio: "Guiding the Awana scripture clubs, training teachers, and designing creative early childhood programs that instill biblical wonder in young hearts.",
    bioAm: "የአዋና ፕሮግራምንና የሕፃናትን የሰንበት ትምህርት ቤት በደስታና በፍቅር በማስተባበር ቀጣዩን ትውልድ በቃል ታንጻለች።",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6gabrvc88mCRWztVUf9KBuQAFi_6du577ZGjxifpOX9ezdFKWictdT87tENdgb4fpWmqS8GUI3eGZhqKcQyHYJJpiOdhbfMoKB6yvl_0ycUKIguyD9J5112BibSKmAjZ7IZERyhPqyrrwwRcbFYdciWHON6wsh00QDRaz0qAXNG47zxz9_GRvz54V9Rx1YrZjnkUJA7_XCPBQlt4U-Au_IfFqF2jQktseLSaOUYaquJFqRR56lZjBqw",
    alt: "Sister Selamawit Bekele - Children Ministry Director",
  },
  {
    id: "natnael-tadesse",
    name: "Pastor Natnael Tadesse",
    nameAm: "ፓስተር ናትናኤል ታደሰ",
    role: "Youth Director",
    roleAm: "የወጣቶች ዳይሬክተር",
    category: "youth",
    bio: "Energizing high school and university students through vibrant worship nights, campus outreach, practical apologetics, and annual spiritual retreats.",
    bioAm: "ወጣቶችንና የዩኒቨርሲቲ ተማሪዎችን በሳምንታዊ ሕብረት፣ በመንፈሳዊ ካምፖችና በአምልኮ አገልግሎት ያነቃቃል።",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8dGcggqv-FylOV14mGGF9m4U-QViq8vAzPkhFoVlW1E6Fr6HSJLvzSbPU2fWBsyeDaX-ogsJNpzsA_ubVkHXArJKa2CHHtwBBFMsu5iTf40q8YjrpG8vUnyR2Vjbq3xQeA0ZXSncigr6J6BlB6D_XQcw5gfG-wkh_QtQBEBoH7bpP0QK2a8zyoZ82eyEN-h1owl0c_FRPaEzBM3NHZCYaLACoR69ibDkYfQMgT9nQSt9iKleQBdaJNg",
    alt: "Pastor Natnael Tadesse - Youth Director",
  },
];
