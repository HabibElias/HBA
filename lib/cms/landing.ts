import type { Field } from './collections';

// Defaults preserve existing bilingual content until staff publish edits.
export const defaultHeroPhotos = [
  {
    "src": "/gallery/landing/worship.jpg",
    "alt": "Worship at Hiwot Birhan Summit"
  },
  {
    "src": "/gallery/landing/congregation.jpg",
    "alt": "Our congregation worshipping together"
  },
  {
    "src": "/gallery/landing/gathering.jpg",
    "alt": "A gathering at the Summit sanctuary"
  }
];
export const landingDefaults: Record<string, unknown> = {
  "home_about_intro_1": "About Us",
  "home_about_intro_1Am": "ስለ እኛና ስለ ቤተሰባችን",
  "home_about_intro_2": "Life and light, shared with everyone",
  "home_about_intro_2Am": "የሕይወት ብርሃን ለሁሉም የደረሰ ሞቅ ያለ መንፈሳዊ ቤተሰብ",
  "home_about_intro_3": "Hiwot Birhan Church Addis Ababa Summit Branch is a Christian family deeply committed to biblical truth, genuine worship, and loving fellowship. Located in the residential neighborhood of Summit near Gate 2, we gather each week to celebrate God's grace and serve our city in the name of Christ.",
  "home_about_intro_3Am": "የሕይወት ብርሃን ቤተክርስቲያን የአዲስ አበባ ሰሚት ቅርንጫፍ ለክርስቶስ፣ ለመጽሐፍ ቅዱስ እውነትና ለእውነተኛ ክርስቲያናዊ ሕብረት የቆመች ወንጌላዊት ቤተክርስቲያን ናት። በሰሚት በር 2 አቅራቢያ በየሳምንቱ የእግዚአብሔርን ጸጋ ለማክበርና ፍቅሩን ለጎረቤቶቻችን ለማዳረስ እንሰበሰባለን።",
  "home_about_intro_4": "Whether you are exploring Christianity, new to eastern Addis Ababa, or searching for a gospel-centered home for your family, you will find open doors, reverent worship in Amharic and English, and genuine care.",
  "home_about_intro_4Am": "ስለ ክርስትና እምነት ለማወቅ የሚፈልጉ፣ ወደ ሰሚት አካባቢ አዲስ የመጡ፣ ወይም ለቤተሰብዎ ወንጌላዊ መንፈሳዊ ቤት የሚሹ ከሆኑ፤ ክፍት ልብ፣ በአማርኛና በእንግሊዝኛ የሚቀርብ እውነተኛ አምልኮና ሞቅ ያለ ሕብረት ይጠብቆታል።",
  "home_about_intro_5": "“A family of believers learning to love God, love our neighbors, and serve our city in the name of Christ.”",
  "home_about_intro_5Am": "«እግዚአብሔርን መውደድ፣ ባልንጀራን ማፍቀርና ከተማችንን በክርስቶስ ስም ማገልገል የተማረ ሞቅ ያለ መንፈሳዊ ቤተሰብ።»",
  "home_about_intro_6": "Hiwot Birhan Summit Mission",
  "home_about_intro_6Am": "የሰሚት ቅርንጫፍ መሪ ቃል",
  "home_about_intro_7": "/about",
  "home_about_intro_8": "Our story & values",
  "home_about_intro_8Am": "ታሪካችንንና እሴቶቻችንን ይወቁ",
  "home_about_intro_9": "/visit#transit",
  "home_about_intro_10": "Find us in Summit",
  "home_about_intro_10Am": "አድራሻና አቅጣጫ",
  "home_about_intro_11": "/gallery/landing/fellowship.jpg",
  "home_about_intro_12": "Hiwot Birhan Church Family in Summit Addis Ababa",
  "home_about_intro_13": "/gallery/landing/congregation.jpg",
  "home_about_intro_14": "Sunday Worship at Summit",
  "home_about_intro_15": "Summit • Addis Ababa",
  "home_about_intro_15Am": "ሰሚት • አዲስ አበባ",
  "home_community_connect_1": "Every Member has a story, What's yours?",
  "home_community_connect_1Am": "እያንዳንዱ አባል ታሪክ አለው",
  "home_community_connect_2": "Connect With Our Church Family",
  "home_community_connect_2Am": "ከመንፈሳዊ ቤተሰባችን ጋር ይገናኙ",
  "home_community_connect_3": "Join & Follow",
  "home_community_connect_3Am": "ይቀላቀሉ",
  "home_community_connect_4": "There is room for you in God’s house • You are always warmly welcome",
  "home_community_connect_4Am": "በክርስቶስ ፍቅር ሁላችሁም ተጋብዛችኋል • እዚህ ለእርስዎም ስፍራ አለ",
  "home_community_connect_5": "/visit",
  "home_community_connect_6": "Plan Your Visit",
  "home_community_connect_6Am": "ጉብኝትዎን ያቅዱ",
  "home_featured_event_1": "calendar",
  "home_featured_event_1Am": "የመርሐ ግብር ቀን መቁጠሪያ",
  "home_featured_event_2": "Upcoming Gatherings & Events",
  "home_featured_event_2Am": "መጪ ጉባኤያትና መርሐ ግብሮች",
  "home_featured_event_3": "/programs",
  "home_featured_event_4": "Full program calendar",
  "home_featured_event_4Am": "የሙሉ ዓመት ፕሮግራሞች",
  "home_featured_event_5": "/gallery/photo_16_2026-08-27_14-11-14.jpg",
  "home_featured_event_6": "Fellowship at Summit",
  "home_featured_event_6Am": "ኅብረት",
  "home_featured_event_7": "/programs#upcoming",
  "home_featured_event_8": "Register & Learn More",
  "home_featured_event_8Am": "ይመዝገቡና ይሳተፉ",
  "home_featured_event_9": "/programs#upcoming",
  "home_featured_event_10": "View details",
  "home_featured_event_10Am": "ዝርዝሩን ይመልከቱ",
  "home_gallery_preview_1": "Moments & Fellowship",
  "home_gallery_preview_1Am": "ትዝታዎቻችን",
  "home_gallery_preview_2": "Life in our church family",
  "home_gallery_preview_2Am": "የአምልኮ፣ የሕብረትና የደስታ ጊዜያት",
  "home_gallery_preview_3": "/gallery",
  "home_gallery_preview_4": "Explore the gallery",
  "home_gallery_preview_4Am": "ሁሉንም ፎቶዎች ይመልከቱ",
  "home_hero_section_3": "Come and worship",
  "home_hero_section_4": "WITH US.",
  "home_hero_section_5": "We gather to worship God, hear His Word, and grow together in faith. Whether you are exploring faith or looking for a church home, you are warmly welcome.",
  "home_hero_section_5Am": "እግዚአብሔርን ለማምለክ፣ ቃሉን ለመስማትና በእምነት አብሮ ለማደግ የተሰበሰበ ሞቅ ያለ ክርስቲያናዊ ቤተሰብ። እዚህ ለእርስዎም ስፍራ አለ።",
  "home_hero_section_6": "/#service-times",
  "home_hero_section_7": "/#sermons",
  "home_ministries_preview_1": "Help & Fellowship",
  "home_ministries_preview_1Am": "አገልግሎቶቻችን",
  "home_ministries_preview_2": "Ministries & Current Appeals",
  "home_ministries_preview_2Am": "እያንዳንዱ ልብ የሚያድግበት ስፍራ",
  "home_ministries_preview_3": "/visit#contact",
  "home_ministries_preview_4": "Find your place",
  "home_ministries_preview_4Am": "ሁሉንም አገልግሎቶች ይመልከቱ",
  "home_ministries_preview_5": "Learn more",
  "home_ministries_preview_5Am": "ተጨማሪ ዝርዝር",
  "home_ministries_preview_6": "Prayer & Pastoral Care",
  "home_ministries_preview_6Am": "የምክርና የጸሎት ድጋፍ",
  "home_ministries_preview_7": "Prayer & Pastoral Care",
  "home_ministries_preview_7Am": "የጸሎትና የምክር አገልግሎት",
  "home_ministries_preview_8": "Personal prayer, biblical pastoral counseling, and spiritual support whenever you walk through difficult seasons.",
  "home_ministries_preview_8Am": "በማንኛውም ጊዜ የግል ጸሎት፣ የመጽሐፍ ቅዱስ ምክርና የሕይወት ድጋፍ የሚሹ ከሆነ አገልጋዮቻችን ዝግጁ ናቸው።",
  "home_ministries_preview_9": "Thursdays 6:00 PM & By Appointment",
  "home_ministries_preview_9Am": "ሐሙስ ማታ 12:00 እና በጠየቁት ጊዜ",
  "home_ministries_preview_10": "Request prayer",
  "home_ministries_preview_10Am": "የጸሎት ጥያቄ ይላኩ",
  "home_ministries_preview_11": "/visit#contact",
  "home_ministries_preview_12": "Request prayer",
  "home_ministries_preview_12Am": "የጸሎት ጥያቄ ይላኩ",
  "home_sermon_preview_1": "Recent Messages",
  "home_sermon_preview_1Am": "የቃሉ ትምህርት",
  "home_sermon_preview_2": "Recent Sermons & Teaching",
  "home_sermon_preview_2Am": "የቅርብ ጊዜ ስብከቶችና የትምህርት ማህደር",
  "home_sermon_preview_3": "/sermons",
  "home_sermon_preview_4": "Explore sermon archive",
  "home_sermon_preview_4Am": "ሁሉንም ስብከቶች ይመልከቱ",
  "home_sermon_preview_5": "/sermons",
  "home_visit_cta_1": "Welcome Home",
  "home_visit_cta_1Am": "እንኳን ደህና መጡ",
  "home_visit_cta_2": "There is room for you here",
  "home_visit_cta_2Am": "እዚህ ለእርስዎም ስፍራ አለ",
  "home_visit_cta_3": "Whether you are visiting Addis Ababa, moving to the Summit area, or searching for a gospel-centered church family, our doors and hearts are open to you.",
  "home_visit_cta_3Am": "በአዲስ አበባ ሰሚት በር 2 አቅራቢያ የሚገኘውን መቅደሳችንን ይጎብኙ። ክፍት በሮች፣ ሞቅ ያለ አቀባበልና መንፈሳዊ ቤተሰብ ይጠብቆታል።",
  "home_visit_cta_4": "Sanctuary Address",
  "home_visit_cta_4Am": "የመቅደሱ አድራሻ",
  "home_visit_cta_5": "Summit Condominium, Near Gate 2, Bole Subcity, Addis Ababa",
  "home_visit_cta_6": "Sunday Main Worship",
  "home_visit_cta_6Am": "የእሑድ ዋና አምልኮ",
  "home_visit_cta_7": "Contact us for gathering times",
  "home_visit_cta_7Am": "ለሰዓቱ ያነጋግሩን",
  "home_visit_cta_8": "Transit & Parking",
  "home_visit_cta_8Am": "ትራንስፖርትና ማቆሚያ",
  "home_visit_cta_9": "Accessible via Summit-Megenagna taxi & LRT • Free on-site parking",
  "home_visit_cta_10": "/visit",
  "home_visit_cta_11": "Plan your first visit",
  "home_visit_cta_11Am": "የመጀመሪያ ጉብኝትዎን ያቅዱ",
  "home_visit_cta_12": "/visit#transit",
  "home_visit_cta_13": "Directions & Map",
  "home_visit_cta_13Am": "አድራሻና አቅጣጫ",
  "home_visit_cta_14": "/gallery/landing/sanctuary.jpg",
  "home_visit_cta_15": "Inside the Summit church sanctuary",
  "home_visit_cta_16": "Hiwot Birhan Summit",
  "home_visit_cta_17": "Summit Condominium Gate 2, Bole",
  "home_visit_cta_18": "https://maps.google.com/?q=9.0234,38.8682",
  "home_visit_cta_19": "Open Maps",
  "home_ministries_preview_card1_name": "Worship & Choir",
  "home_ministries_preview_card1_nameAm": "የአምልኮና የመዘምራን አገልግሎት",
  "home_ministries_preview_card1_schedule": "Saturdays 3:30 PM & Sundays 8:00 AM",
  "home_ministries_preview_card1_scheduleAm": "ቅዳሜ ከሰዓት 9:30 እና እሑድ ጠዋት 2:00",
  "home_ministries_preview_card1_image": "/gallery/photo_24_2026-08-27_14-11-14.jpg",
  "home_ministries_preview_card1_link": "/visit#contact",
  "home_ministries_preview_card2_name": "Youth & Young Adults",
  "home_ministries_preview_card2_nameAm": "የወጣቶችና የዩኒቨርሲቲ ተማሪዎች",
  "home_ministries_preview_card2_schedule": "Saturdays 4:00 PM – 6:00 PM EAT",
  "home_ministries_preview_card2_scheduleAm": "ቅዳሜ ከሰዓት 10:00 – 12:00",
  "home_ministries_preview_card2_image": "/gallery/photo_15_2026-08-27_14-11-14.jpg",
  "home_ministries_preview_card2_link": "/visit#contact",
  "home_ministries_preview_card3_name": "Children & Awana Club",
  "home_ministries_preview_card3_nameAm": "የሕፃናትና የአዋና አገልግሎት",
  "home_ministries_preview_card3_schedule": "Sundays 9:30 AM & Saturdays 9:00 AM",
  "home_ministries_preview_card3_scheduleAm": "እሑድ ጠዋት 3:30 እና ቅዳሜ ጠዋት 3:00",
  "home_ministries_preview_card3_image": "/gallery/photo_11_2026-08-27_14-11-14.jpg",
  "home_ministries_preview_card3_link": "/visit#contact",
  "home_gallery_preview_card1_title": "Together in worship",
  "home_gallery_preview_card1_titleAm": "በአምልኮ አብረን",
  "home_gallery_preview_card1_caption": "Our church family in Summit",
  "home_gallery_preview_card1_captionAm": "በሰሚት ያለው መንፈሳዊ ቤተሰባችን",
  "home_gallery_preview_card1_image": "/gallery/photo_18_2026-08-27_14-11-14.jpg",
  "home_gallery_preview_card2_title": "Learning from the Word",
  "home_gallery_preview_card2_titleAm": "ከቃሉ መማር",
  "home_gallery_preview_card2_caption": "Reading and reflecting together",
  "home_gallery_preview_card2_captionAm": "አብሮ ማንበብና መወያየት",
  "home_gallery_preview_card2_image": "/gallery/photo_10_2026-08-27_14-11-14.jpg",
  "home_gallery_preview_card3_title": "Songs of praise",
  "home_gallery_preview_card3_titleAm": "የምስጋና ዝማሬ",
  "home_gallery_preview_card3_caption": "Offering our voices in worship",
  "home_gallery_preview_card3_captionAm": "በዝማሬ እግዚአብሔርን ማምለክ",
  "home_gallery_preview_card3_image": "/gallery/photo_24_2026-08-27_14-11-14.jpg",
  "home_gallery_preview_card4_title": "A moment of prayer",
  "home_gallery_preview_card4_titleAm": "የጸሎት ጊዜ",
  "home_gallery_preview_card4_caption": "Drawing near to God",
  "home_gallery_preview_card4_captionAm": "ወደ እግዚአብሔር መቅረብ",
  "home_gallery_preview_card4_image": "/gallery/photo_4_2026-08-27_14-11-14.jpg",
  "home_gallery_preview_card5_title": "Faith in conversation",
  "home_gallery_preview_card5_titleAm": "የእምነት ውይይት",
  "home_gallery_preview_card5_caption": "Growing through fellowship",
  "home_gallery_preview_card5_captionAm": "በሕብረት ማደግ",
  "home_gallery_preview_card5_image": "/gallery/photo_15_2026-08-27_14-11-14.jpg",
  "home_community_connect_card1_name": "Telegram Channel",
  "home_community_connect_card1_nameAm": "ይፋዊ ቴሌግራም",
  "home_community_connect_card1_handle": "@HiwotBirhanSummit",
  "home_community_connect_card1_desc": "Weekly bulletins, prayer notes & audio sermons",
  "home_community_connect_card1_descAm": "ሳምንታዊ ማስታወቂያዎች፣ የጸሎት ነጥቦችና ስብከቶች",
  "home_community_connect_card1_link": "https://t.me/HiwotBirhanSummit",
  "home_community_connect_card2_name": "Media & Messages",
  "home_community_connect_card2_nameAm": "የሚዲያና ስብከቶች ቻናል",
  "home_community_connect_card2_handle": "Hiwot Birhan Media",
  "home_community_connect_card2_desc": "Stream Sunday messages and uplifting songs",
  "home_community_connect_card2_descAm": "የእሑድ ስብከቶችና የዝማሬ ቪዲዮዎች",
  "home_community_connect_card2_link": "/sermons",
  "home_community_connect_card3_name": "Community Care",
  "home_community_connect_card3_nameAm": "የማኅበረሰብ ሕብረት",
  "home_community_connect_card3_handle": "Summit Care Circle",
  "home_community_connect_card3_desc": "Connect with small groups and fellowship circles",
  "home_community_connect_card3_descAm": "ከአካባቢ የጸሎትና የሕብረት ቡድኖች ጋር ይገናኙ",
  "home_community_connect_card3_link": "/visit#contact",
  "homeHeroPhotos": [
    {
      "src": "/gallery/landing/worship.jpg",
      "alt": "Worship at Hiwot Birhan Summit"
    },
    {
      "src": "/gallery/landing/congregation.jpg",
      "alt": "Our congregation worshipping together"
    },
    {
      "src": "/gallery/landing/gathering.jpg",
      "alt": "A gathering at the Summit sanctuary"
    }
  ],
  "home_hero_section_3Am": "በአዲስ አበባ ሰሚት",
  "home_hero_section_4Am": "የሕይወትን ብርሃን ማወጅ",
  "homeHeroPrimaryLabel": "Plan your first visit",
  "homeHeroPrimaryLabelAm": "ጉብኝትዎን ያቅዱ",
  "homeHeroSecondaryLabel": "Watch latest message",
  "homeHeroSecondaryLabelAm": "ስብከቶችን ይመልከቱ"
};
export const landingFields: Field[] = [
  {
    "key": "homeHeroPhotos",
    "label": "Hero slideshow photographs",
    "type": "photos",
    "group": "hero-section"
  },
  {
    "key": "home_about_intro_1",
    "label": "About Us",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_1Am",
    "label": "About Us · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_2",
    "label": "Life and light, shared with everyone",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_2Am",
    "label": "Life and light, shared with everyone · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_3",
    "label": "Hiwot Birhan Church Addis Ababa Summit Branch is a Christian family de",
    "group": "about-intro",
    "type": "textarea"
  },
  {
    "key": "home_about_intro_3Am",
    "label": "Hiwot Birhan Church Addis Ababa Summit Branch is a Christian family de · Amharic",
    "group": "about-intro",
    "type": "textarea"
  },
  {
    "key": "home_about_intro_4",
    "label": "Whether you are exploring Christianity, new to eastern Addis Ababa, or",
    "group": "about-intro",
    "type": "textarea"
  },
  {
    "key": "home_about_intro_4Am",
    "label": "Whether you are exploring Christianity, new to eastern Addis Ababa, or · Amharic",
    "group": "about-intro",
    "type": "textarea"
  },
  {
    "key": "home_about_intro_5",
    "label": "“A family of believers learning to love God, love our neighbors, and s",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_5Am",
    "label": "“A family of believers learning to love God, love our neighbors, and s · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_6",
    "label": "Hiwot Birhan Summit Mission",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_6Am",
    "label": "Hiwot Birhan Summit Mission · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_7",
    "label": "Link destination",
    "group": "about-intro",
    "type": "url"
  },
  {
    "key": "home_about_intro_8",
    "label": "Our story & values",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_8Am",
    "label": "Our story & values · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_9",
    "label": "Link destination",
    "group": "about-intro",
    "type": "url"
  },
  {
    "key": "home_about_intro_10",
    "label": "Find us in Summit",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_10Am",
    "label": "Find us in Summit · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_11",
    "label": "Photograph",
    "group": "about-intro",
    "type": "image"
  },
  {
    "key": "home_about_intro_12",
    "label": "Photograph description",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_13",
    "label": "Photograph",
    "group": "about-intro",
    "type": "image"
  },
  {
    "key": "home_about_intro_14",
    "label": "Photograph description",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_15",
    "label": "Summit • Addis Ababa",
    "group": "about-intro"
  },
  {
    "key": "home_about_intro_15Am",
    "label": "Summit • Addis Ababa · Amharic",
    "group": "about-intro"
  },
  {
    "key": "home_community_connect_1",
    "label": "Every Member has a story, What's yours?",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_1Am",
    "label": "Every Member has a story, What's yours? · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_2",
    "label": "Connect With Our Church Family",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_2Am",
    "label": "Connect With Our Church Family · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_3",
    "label": "Join & Follow",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_3Am",
    "label": "Join & Follow · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_4",
    "label": "There is room for you in God’s house • You are always warmly welcome",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_4Am",
    "label": "There is room for you in God’s house • You are always warmly welcome · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_5",
    "label": "Link destination",
    "group": "community-connect",
    "type": "url"
  },
  {
    "key": "home_community_connect_6",
    "label": "Plan Your Visit",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_6Am",
    "label": "Plan Your Visit · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_featured_event_1",
    "label": "calendar",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_1Am",
    "label": "calendar · Amharic",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_2",
    "label": "Upcoming Gatherings & Events",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_2Am",
    "label": "Upcoming Gatherings & Events · Amharic",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_3",
    "label": "Link destination",
    "group": "featured-event",
    "type": "url"
  },
  {
    "key": "home_featured_event_4",
    "label": "Full program calendar",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_4Am",
    "label": "Full program calendar · Amharic",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_5",
    "label": "Photograph",
    "group": "featured-event",
    "type": "image"
  },
  {
    "key": "home_featured_event_6",
    "label": "Fellowship at Summit",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_6Am",
    "label": "Fellowship at Summit · Amharic",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_7",
    "label": "Link destination",
    "group": "featured-event",
    "type": "url"
  },
  {
    "key": "home_featured_event_8",
    "label": "Register & Learn More",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_8Am",
    "label": "Register & Learn More · Amharic",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_9",
    "label": "Link destination",
    "group": "featured-event",
    "type": "url"
  },
  {
    "key": "home_featured_event_10",
    "label": "View details",
    "group": "featured-event"
  },
  {
    "key": "home_featured_event_10Am",
    "label": "View details · Amharic",
    "group": "featured-event"
  },
  {
    "key": "home_gallery_preview_1",
    "label": "Moments & Fellowship",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_1Am",
    "label": "Moments & Fellowship · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_2",
    "label": "Life in our church family",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_2Am",
    "label": "Life in our church family · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_3",
    "label": "Link destination",
    "group": "gallery-preview",
    "type": "url"
  },
  {
    "key": "home_gallery_preview_4",
    "label": "Explore the gallery",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_4Am",
    "label": "Explore the gallery · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_hero_section_3",
    "label": "Hero introduction",
    "group": "hero-section"
  },
  {
    "key": "home_hero_section_4",
    "label": "Hero heading",
    "group": "hero-section"
  },
  {
    "key": "home_hero_section_5",
    "label": "We gather to worship God, hear His Word, and grow together in faith. W",
    "group": "hero-section",
    "type": "textarea"
  },
  {
    "key": "home_hero_section_5Am",
    "label": "We gather to worship God, hear His Word, and grow together in faith. W · Amharic",
    "group": "hero-section",
    "type": "textarea"
  },
  {
    "key": "home_hero_section_6",
    "label": "Link destination",
    "group": "hero-section",
    "type": "url"
  },
  {
    "key": "home_hero_section_7",
    "label": "Link destination",
    "group": "hero-section",
    "type": "url"
  },
  {
    "key": "home_ministries_preview_1",
    "label": "Help & Fellowship",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_1Am",
    "label": "Help & Fellowship · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_2",
    "label": "Ministries & Current Appeals",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_2Am",
    "label": "Ministries & Current Appeals · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_3",
    "label": "Link destination",
    "group": "ministries-preview",
    "type": "url"
  },
  {
    "key": "home_ministries_preview_4",
    "label": "Find your place",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_4Am",
    "label": "Find your place · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_5",
    "label": "Learn more",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_5Am",
    "label": "Learn more · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_6",
    "label": "Prayer & Pastoral Care",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_6Am",
    "label": "Prayer & Pastoral Care · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_7",
    "label": "Prayer & Pastoral Care",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_7Am",
    "label": "Prayer & Pastoral Care · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_8",
    "label": "Personal prayer, biblical pastoral counseling, and spiritual support w",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_8Am",
    "label": "Personal prayer, biblical pastoral counseling, and spiritual support w · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_9",
    "label": "Thursdays 6:00 PM & By Appointment",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_9Am",
    "label": "Thursdays 6:00 PM & By Appointment · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_10",
    "label": "Request prayer",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_10Am",
    "label": "Request prayer · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_11",
    "label": "Link destination",
    "group": "ministries-preview",
    "type": "url"
  },
  {
    "key": "home_ministries_preview_12",
    "label": "Request prayer",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_12Am",
    "label": "Request prayer · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_sermon_preview_1",
    "label": "Recent Messages",
    "group": "sermon-preview"
  },
  {
    "key": "home_sermon_preview_1Am",
    "label": "Recent Messages · Amharic",
    "group": "sermon-preview"
  },
  {
    "key": "home_sermon_preview_2",
    "label": "Recent Sermons & Teaching",
    "group": "sermon-preview"
  },
  {
    "key": "home_sermon_preview_2Am",
    "label": "Recent Sermons & Teaching · Amharic",
    "group": "sermon-preview"
  },
  {
    "key": "home_sermon_preview_3",
    "label": "Link destination",
    "group": "sermon-preview",
    "type": "url"
  },
  {
    "key": "home_sermon_preview_4",
    "label": "Explore sermon archive",
    "group": "sermon-preview"
  },
  {
    "key": "home_sermon_preview_4Am",
    "label": "Explore sermon archive · Amharic",
    "group": "sermon-preview"
  },
  {
    "key": "home_sermon_preview_5",
    "label": "Link destination",
    "group": "sermon-preview",
    "type": "url"
  },
  {
    "key": "home_visit_cta_1",
    "label": "Welcome Home",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_1Am",
    "label": "Welcome Home · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_2",
    "label": "There is room for you here",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_2Am",
    "label": "There is room for you here · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_3",
    "label": "Whether you are visiting Addis Ababa, moving to the Summit area, or se",
    "group": "visit-cta",
    "type": "textarea"
  },
  {
    "key": "home_visit_cta_3Am",
    "label": "Whether you are visiting Addis Ababa, moving to the Summit area, or se · Amharic",
    "group": "visit-cta",
    "type": "textarea"
  },
  {
    "key": "home_visit_cta_4",
    "label": "Sanctuary Address",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_4Am",
    "label": "Sanctuary Address · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_5",
    "label": "Summit Condominium, Near Gate 2, Bole Subcity, Addis Ababa",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_6",
    "label": "Sunday Main Worship",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_6Am",
    "label": "Sunday Main Worship · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_7",
    "label": "Contact us for gathering times",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_7Am",
    "label": "Contact us for gathering times · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_8",
    "label": "Transit & Parking",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_8Am",
    "label": "Transit & Parking · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_9",
    "label": "Accessible via Summit-Megenagna taxi & LRT • Free on-site parking",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_10",
    "label": "Link destination",
    "group": "visit-cta",
    "type": "url"
  },
  {
    "key": "home_visit_cta_11",
    "label": "Plan your first visit",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_11Am",
    "label": "Plan your first visit · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_12",
    "label": "Link destination",
    "group": "visit-cta",
    "type": "url"
  },
  {
    "key": "home_visit_cta_13",
    "label": "Directions & Map",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_13Am",
    "label": "Directions & Map · Amharic",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_14",
    "label": "Photograph",
    "group": "visit-cta",
    "type": "image"
  },
  {
    "key": "home_visit_cta_15",
    "label": "Photograph description",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_16",
    "label": "Hiwot Birhan Summit",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_17",
    "label": "Summit Condominium Gate 2, Bole",
    "group": "visit-cta"
  },
  {
    "key": "home_visit_cta_18",
    "label": "Link destination",
    "group": "visit-cta",
    "type": "url"
  },
  {
    "key": "home_visit_cta_19",
    "label": "Open Maps",
    "group": "visit-cta"
  },
  {
    "key": "home_ministries_preview_card1_name",
    "label": "Card 1 · name",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card1_nameAm",
    "label": "Card 1 · name · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card1_schedule",
    "label": "Card 1 · schedule",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card1_scheduleAm",
    "label": "Card 1 · schedule · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card1_image",
    "label": "Card 1 · image",
    "group": "ministries-preview",
    "type": "image"
  },
  {
    "key": "home_ministries_preview_card1_link",
    "label": "Card 1 · link",
    "group": "ministries-preview",
    "type": "url"
  },
  {
    "key": "home_ministries_preview_card2_name",
    "label": "Card 2 · name",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card2_nameAm",
    "label": "Card 2 · name · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card2_schedule",
    "label": "Card 2 · schedule",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card2_scheduleAm",
    "label": "Card 2 · schedule · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card2_image",
    "label": "Card 2 · image",
    "group": "ministries-preview",
    "type": "image"
  },
  {
    "key": "home_ministries_preview_card2_link",
    "label": "Card 2 · link",
    "group": "ministries-preview",
    "type": "url"
  },
  {
    "key": "home_ministries_preview_card3_name",
    "label": "Card 3 · name",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card3_nameAm",
    "label": "Card 3 · name · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card3_schedule",
    "label": "Card 3 · schedule",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card3_scheduleAm",
    "label": "Card 3 · schedule · Amharic",
    "group": "ministries-preview"
  },
  {
    "key": "home_ministries_preview_card3_image",
    "label": "Card 3 · image",
    "group": "ministries-preview",
    "type": "image"
  },
  {
    "key": "home_ministries_preview_card3_link",
    "label": "Card 3 · link",
    "group": "ministries-preview",
    "type": "url"
  },
  {
    "key": "home_gallery_preview_card1_title",
    "label": "Card 1 · title",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card1_titleAm",
    "label": "Card 1 · title · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card1_caption",
    "label": "Card 1 · caption",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card1_captionAm",
    "label": "Card 1 · caption · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card1_image",
    "label": "Card 1 · image",
    "group": "gallery-preview",
    "type": "image"
  },
  {
    "key": "home_gallery_preview_card2_title",
    "label": "Card 2 · title",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card2_titleAm",
    "label": "Card 2 · title · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card2_caption",
    "label": "Card 2 · caption",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card2_captionAm",
    "label": "Card 2 · caption · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card2_image",
    "label": "Card 2 · image",
    "group": "gallery-preview",
    "type": "image"
  },
  {
    "key": "home_gallery_preview_card3_title",
    "label": "Card 3 · title",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card3_titleAm",
    "label": "Card 3 · title · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card3_caption",
    "label": "Card 3 · caption",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card3_captionAm",
    "label": "Card 3 · caption · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card3_image",
    "label": "Card 3 · image",
    "group": "gallery-preview",
    "type": "image"
  },
  {
    "key": "home_gallery_preview_card4_title",
    "label": "Card 4 · title",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card4_titleAm",
    "label": "Card 4 · title · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card4_caption",
    "label": "Card 4 · caption",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card4_captionAm",
    "label": "Card 4 · caption · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card4_image",
    "label": "Card 4 · image",
    "group": "gallery-preview",
    "type": "image"
  },
  {
    "key": "home_gallery_preview_card5_title",
    "label": "Card 5 · title",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card5_titleAm",
    "label": "Card 5 · title · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card5_caption",
    "label": "Card 5 · caption",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card5_captionAm",
    "label": "Card 5 · caption · Amharic",
    "group": "gallery-preview"
  },
  {
    "key": "home_gallery_preview_card5_image",
    "label": "Card 5 · image",
    "group": "gallery-preview",
    "type": "image"
  },
  {
    "key": "home_community_connect_card1_name",
    "label": "Card 1 · name",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card1_nameAm",
    "label": "Card 1 · name · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card1_handle",
    "label": "Card 1 · handle",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card1_desc",
    "label": "Card 1 · desc",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card1_descAm",
    "label": "Card 1 · desc · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card1_link",
    "label": "Card 1 · link",
    "group": "community-connect",
    "type": "url"
  },
  {
    "key": "home_community_connect_card2_name",
    "label": "Card 2 · name",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card2_nameAm",
    "label": "Card 2 · name · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card2_handle",
    "label": "Card 2 · handle",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card2_desc",
    "label": "Card 2 · desc",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card2_descAm",
    "label": "Card 2 · desc · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card2_link",
    "label": "Card 2 · link",
    "group": "community-connect",
    "type": "url"
  },
  {
    "key": "home_community_connect_card3_name",
    "label": "Card 3 · name",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card3_nameAm",
    "label": "Card 3 · name · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card3_handle",
    "label": "Card 3 · handle",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card3_desc",
    "label": "Card 3 · desc",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card3_descAm",
    "label": "Card 3 · desc · Amharic",
    "group": "community-connect"
  },
  {
    "key": "home_community_connect_card3_link",
    "label": "Card 3 · link",
    "group": "community-connect",
    "type": "url"
  },
  {
    "key": "home_hero_section_3Am",
    "label": "Hero introduction · Amharic",
    "group": "hero-section"
  },
  {
    "key": "home_hero_section_4Am",
    "label": "Hero heading · Amharic",
    "group": "hero-section"
  },
  {
    "key": "homeHeroPrimaryLabel",
    "label": "Visit button label",
    "group": "hero-section"
  },
  {
    "key": "homeHeroPrimaryLabelAm",
    "label": "Visit button label · Amharic",
    "group": "hero-section"
  },
  {
    "key": "homeHeroSecondaryLabel",
    "label": "Messages button label",
    "group": "hero-section"
  },
  {
    "key": "homeHeroSecondaryLabelAm",
    "label": "Messages button label · Amharic",
    "group": "hero-section"
  }
];
