
export type Language = 'tr' | 'nl';

export interface ArabicLetter {
  char: string;
  name: { tr: string; nl: string };
  transliteration: string;
  example: { word: string; translation: { tr: string; nl: string } };
  color: string;
}

export interface QuranVerse {
  id: string;
  surah: string;
  arabic: string;
  phonetic: string;
  translation: string;
}

export interface Lesson {
  id: string;
  title: { tr: string; nl: string };
  description: { tr: string; nl: string };
  type: 'letter' | 'word' | 'verse' | 'game';
  content: any;
}

export interface Level {
  id: number;
  chapter: { tr: string; nl: string };
  lessons: Lesson[];
  unlockedAt: number; // points needed
}

export interface UserProgress {
  points: number;
  currentLevelId: number;
  completedLessonIds: string[];
  language: Language;
  volume: number;
  userName: string;
}

export type GameState = 'language-select' | 'name-entry' | 'map' | 'lesson' | 'menu' | 'quiz' | 'ai-chat';
