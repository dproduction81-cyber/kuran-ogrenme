
import { ArabicLetter, Level, QuranVerse } from './types';

export const TRANSLATIONS = {
  tr: {
    welcome: "Hoş Geldin",
    appTitle: "Kur'an Yolculuğu",
    points: "Puan",
    start: "Başla",
    chooseLang: "Dilini Seç / Taal Kiezen",
    enterName: "Adın nedir?",
    namePlaceholder: "Buraya yaz...",
    level: "Seviye",
    locked: "Kilitli",
    earnPoints: "Devam etmek için {0} puana daha ihtiyacın var!",
    lessonComplete: "Harika! Dersi bitirdin!",
    next: "Sıradaki",
    back: "Geri",
    askAi: "Yapay Zeka Öğretmenine Sor",
    aiThinking: "Düşünüyorum...",
    beginner: "Başlangıç",
    intermediate: "Orta Seviye",
    advanced: "İleri Seviye",
    settings: "Ayarlar",
    language: "Dil",
    volume: "Ses Seviyesi",
    userName: "Adın",
    close: "Kapat",
    cheer: "Harikasın {0}! Çok güzel gidiyorsun!",
  },
  nl: {
    welcome: "Welkom",
    appTitle: "Koran Reis",
    points: "Punten",
    start: "Start",
    chooseLang: "Taal Kiezen / Dilini Seç",
    enterName: "Wat is je naam?",
    namePlaceholder: "Schrijf hier...",
    level: "Level",
    locked: "Vergrendeld",
    earnPoints: "Je hebt nog {0} punten nodig om verder te gaan!",
    lessonComplete: "Goed gedaan! Je hebt de les voltooid!",
    next: "Volgende",
    back: "Terug",
    askAi: "Vraag de AI Leraar",
    aiThinking: "Ik denk na...",
    beginner: "Beginner",
    intermediate: "Gemiddeld",
    advanced: "Gevorderd",
    settings: "Instellingen",
    language: "Taal",
    volume: "Volume",
    userName: "Je naam",
    close: "Sluiten",
    cheer: "Je bent geweldig {0}! Je gaat heel goed!",
  }
};

export const ARABIC_LETTERS_DATA: Record<string, ArabicLetter> = {
  'أ': { char: 'أ', name: { tr: 'Elif', nl: 'Alif' }, transliteration: 'A/E', example: { word: 'Eseb', translation: { tr: 'Aslan', nl: 'Leeuw' } }, color: 'bg-red-400' },
  'ب': { char: 'ب', name: { tr: 'Be', nl: 'Ba' }, transliteration: 'B', example: { word: 'Batta', translation: { tr: 'Ördek', nl: 'Eend' } }, color: 'bg-blue-400' },
  'ت': { char: 'ت', name: { tr: 'Te', nl: 'Ta' }, transliteration: 'T', example: { word: 'Temr', translation: { tr: 'Hurma', nl: 'Dadel' } }, color: 'bg-green-400' },
  'ث': { char: 'ث', name: { tr: 'Se', nl: 'Tha' }, transliteration: 'S (Peltek)', example: { word: 'Semer', translation: { tr: 'Meyve', nl: 'Fruit' } }, color: 'bg-yellow-400' },
  'ج': { char: 'ج', name: { tr: 'Cim', nl: 'Jim' }, transliteration: 'C', example: { word: 'Cemel', translation: { tr: 'Deve', nl: 'Kameel' } }, color: 'bg-orange-400' },
  'ح': { char: 'ح', name: { tr: 'Ha', nl: 'Ha' }, transliteration: 'H', example: { word: 'Hacc', translation: { tr: 'Hac', nl: 'Hadj' } }, color: 'bg-pink-400' },
  'خ': { char: 'خ', name: { tr: 'Hı', nl: 'Kha' }, transliteration: 'H (Kalın)', example: { word: 'Hubz', translation: { tr: 'Ekmek', nl: 'Brood' } }, color: 'bg-purple-400' },
  'د': { char: 'د', name: { tr: 'Dal', nl: 'Dal' }, transliteration: 'D', example: { word: 'Deccace', translation: { tr: 'Tavuk', nl: 'Kip' } }, color: 'bg-emerald-400' },
  'ذ': { char: 'ذ', name: { tr: 'Zel', nl: 'Dhal' }, transliteration: 'Z (Peltek)', example: { word: 'Zeheb', translation: { tr: 'Altın', nl: 'Goud' } }, color: 'bg-teal-400' },
  'ر': { char: 'ر', name: { tr: 'Ra', nl: 'Ra' }, transliteration: 'R', example: { word: 'Rummân', translation: { tr: 'Nar', nl: 'Granaatappel' } }, color: 'bg-red-500' },
  'ز': { char: 'ز', name: { tr: 'Ze', nl: 'Zay' }, transliteration: 'Z', example: { word: 'Zehra', translation: { tr: 'Çiçek', nl: 'Bloem' } }, color: 'bg-blue-500' },
  'س': { char: 'س', name: { tr: 'Sin', nl: 'Sin' }, transliteration: 'S', example: { word: 'Semek', translation: { tr: 'Balık', nl: 'Vis' } }, color: 'bg-green-500' },
  'ش': { char: 'ش', name: { tr: 'Şın', nl: 'Shin' }, transliteration: 'Ş', example: { word: 'Şems', translation: { tr: 'Güneş', nl: 'Zon' } }, color: 'bg-yellow-500' },
  'ص': { char: 'ص', name: { tr: 'Sad', nl: 'Sad' }, transliteration: 'S (Kalın)', example: { word: 'Sakr', translation: { tr: 'Şahin', nl: 'Valk' } }, color: 'bg-orange-500' },
  'ض': { char: 'ض', name: { tr: 'Dad', nl: 'Dad' }, transliteration: 'D (Kalın)', example: { word: 'Difda', translation: { tr: 'Kurbağa', nl: 'Kikker' } }, color: 'bg-pink-500' },
  'ط': { char: 'ط', name: { tr: 'Tı', nl: 'Ta' }, transliteration: 'T (Kalın)', example: { word: 'Tayr', translation: { tr: 'Kuş', nl: 'Vogel' } }, color: 'bg-purple-500' },
  'ظ': { char: 'ظ', name: { tr: 'Zı', nl: 'Za' }, transliteration: 'Z (Kalın/Peltek)', example: { word: 'Zarf', translation: { tr: 'Zarf', nl: 'Envelop' } }, color: 'bg-teal-500' },
  'ع': { char: 'ع', name: { tr: 'Ayn', nl: 'Ayn' }, transliteration: 'A', example: { word: 'Inab', translation: { tr: 'Üzüm', nl: 'Druiven' } }, color: 'bg-red-600' },
  'غ': { char: 'غ', name: { tr: 'Ğayn', nl: 'Ghayn' }, transliteration: 'Ğ', example: { word: 'Gurâb', translation: { tr: 'Karga', nl: 'Raaf' } }, color: 'bg-blue-600' },
  'ف': { char: 'ف', name: { tr: 'Fe', nl: 'Fa' }, transliteration: 'F', example: { word: 'Fîl', translation: { tr: 'Fil', nl: 'Olifant' } }, color: 'bg-green-600' },
  'ق': { char: 'ق', name: { tr: 'Kaf', nl: 'Qaf' }, transliteration: 'K (Kalın)', example: { word: 'Kalem', translation: { tr: 'Kalem', nl: 'Pen' } }, color: 'bg-yellow-600' },
  'ك': { char: 'ك', name: { tr: 'Kef', nl: 'Kaf' }, transliteration: 'K', example: { word: 'Kitâb', translation: { tr: 'Kitap', nl: 'Boek' } }, color: 'bg-orange-600' },
  'ل': { char: 'ل', name: { tr: 'Lam', nl: 'Lam' }, transliteration: 'L', example: { word: 'Leymûn', translation: { tr: 'Limon', nl: 'Citroen' } }, color: 'bg-pink-600' },
  'م': { char: 'م', name: { tr: 'Mim', nl: 'Mim' }, transliteration: 'M', example: { word: 'Mevz', translation: { tr: 'Muz', nl: 'Banaan' } }, color: 'bg-purple-600' },
  'ن': { char: 'ن', name: { tr: 'Nun', nl: 'Nun' }, transliteration: 'N', example: { word: 'Neml', translation: { tr: 'Karınca', nl: 'Mier' } }, color: 'bg-emerald-600' },
  'و': { char: 'و', name: { tr: 'Vav', nl: 'Waw' }, transliteration: 'V', example: { word: 'Verd', translation: { tr: 'Gül', nl: 'Roos' } }, color: 'bg-red-300' },
  'ه': { char: 'ه', name: { tr: 'He', nl: 'Ha' }, transliteration: 'H', example: { word: 'Hilâl', translation: { tr: 'Hilal', nl: 'Halve maan' } }, color: 'bg-blue-300' },
  'ي': { char: 'ي', name: { tr: 'Ye', nl: 'Ya' }, transliteration: 'Y', example: { word: 'Yed', translation: { tr: 'El', nl: 'Hand' } }, color: 'bg-green-300' },
};

export const ARABIC_LETTERS = Object.values(ARABIC_LETTERS_DATA);

export const LEVELS: Level[] = [
  {
    id: 1,
    chapter: { tr: "Elifba Dünyası", nl: "Elifba Wereld" },
    unlockedAt: 0,
    lessons: [
      { id: 'l1', title: { tr: "Harf Grubu 1", nl: "Lettergroep 1" }, description: { tr: "Elif, Be, Te, Se", nl: "Alif, Ba, Ta, Tha" }, type: 'letter', content: ['أ', 'ب', 'ت', 'ث'] },
      { id: 'l2', title: { tr: "Harf Grubu 2", nl: "Lettergroep 2" }, description: { tr: "Cim, Ha, Hı, Dal", nl: "Jim, Ha, Kha, Dal" }, type: 'letter', content: ['ج', 'ح', 'خ', 'د'] },
      { id: 'l3', title: { tr: "Harf Grubu 3", nl: "Lettergroep 3" }, description: { tr: "Zel, Ra, Ze, Sin", nl: "Dhal, Ra, Zay, Sin" }, type: 'letter', content: ['ذ', 'ر', 'ز', 'س'] },
      { id: 'l4', title: { tr: "Harf Grubu 4", nl: "Lettergroep 4" }, description: { tr: "Şın, Sad, Dad, Tı", nl: "Shin, Sad, Dad, Ta" }, type: 'letter', content: ['ش', 'ص', 'ض', 'ط'] },
      { id: 'l5', title: { tr: "Harf Grubu 5", nl: "Lettergroep 5" }, description: { tr: "Zı, Ayn, Gayn, Fe", nl: "Za, Ayn, Ghayn, Fa" }, type: 'letter', content: ['ظ', 'ع', 'غ', 'ف'] },
      { id: 'l6', title: { tr: "Harf Grubu 6", nl: "Lettergroep 6" }, description: { tr: "Kaf, Kef, Lam, Mim", nl: "Qaf, Kaf, Lam, Mim" }, type: 'letter', content: ['ق', 'ك', 'ل', 'م'] },
      { id: 'l7', title: { tr: "Harf Grubu 7", nl: "Lettergroep 7" }, description: { tr: "Nun, Vav, He, Ye", nl: "Nun, Waw, Ha, Ya" }, type: 'letter', content: ['ن', 'و', 'ه', 'ي'] },
    ]
  },
  {
    id: 2,
    chapter: { tr: "Harekeler", nl: "Vocalen (Harakah)" },
    unlockedAt: 100,
    lessons: [
      { id: 'l8', title: { tr: "Üstün (Fetha)", nl: "Fetha (A/E)" }, description: { tr: "Harfleri seslendirelim", nl: "Laten we de letters uitspreken" }, type: 'word', content: { word: 'أَ بَ تَ', phonetic: 'E - Be - Te' } }
    ]
  },
  {
    id: 3,
    chapter: { tr: "Kısa Sureler", nl: "Korte Soera's" },
    unlockedAt: 200,
    lessons: [
      { id: 'l9', title: { tr: "İhlas Suresi", nl: "Soera Al-Ikhlas" }, description: { tr: "Tevhid dersi", nl: "De les van eenheid" }, type: 'verse', content: 'قُلْ هُوَ اللَّهُ أَحَدٌ' }
    ]
  }
];

export const QURAN_VERSES: QuranVerse[] = [
  { id: 'v1', surah: 'İhlas', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', phonetic: 'Qul huvallāhu ahad', translation: 'De ki: O, Allah\'tır, tektir.' },
  { id: 'v2', surah: 'Fatiha', arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', phonetic: 'Al-hamdu lillāhi rabbi l-ʿālamīn', translation: 'Hamd, âlemlerin Rabbi olan Allah\'a mahsustur.' },
  { id: 'v3', surah: 'Nas', arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّASِ', phonetic: 'Qul aʿūḏu bi-rabbi n-nās', translation: 'De ki: İnsanların Rabbine sığınırım.' }
];
