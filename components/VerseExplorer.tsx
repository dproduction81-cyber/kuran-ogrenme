
import React, { useState } from 'react';
import { QURAN_VERSES } from '../constants';
import { QuranVerse } from '../types';
import { getVerseExplanation } from '../services/gemini';

interface VerseExplorerProps {
  onEarnPoints: (amount: number) => void;
}

const VerseExplorer: React.FC<VerseExplorerProps> = ({ onEarnPoints }) => {
  const [activeVerse, setActiveVerse] = useState<QuranVerse | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleVerseClick = (verse: QuranVerse) => {
    setActiveVerse(verse);
    setExplanation(null);
    onEarnPoints(5);
  };

  const askTeacher = async (verseText: string) => {
    setIsExplaining(true);
    const result = await getVerseExplanation(verseText);
    setExplanation(result);
    setIsExplaining(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {QURAN_VERSES.map((verse) => (
          <button
            key={verse.id}
            onClick={() => handleVerseClick(verse)}
            className="bg-white border-2 border-emerald-100 p-4 rounded-2xl shadow-sm hover:border-emerald-300 transition-all text-right group"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-wider">{verse.surah}</span>
              <i className="fas fa-play-circle text-emerald-400 group-hover:text-emerald-600 transition-colors"></i>
            </div>
            <p className="arabic-text text-2xl font-bold text-gray-800" dir="rtl">{verse.arabic}</p>
          </button>
        ))}
      </div>

      {activeVerse && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex flex-col p-4 backdrop-blur-sm">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-white font-bold text-lg">{activeVerse.surah}</h2>
            <button onClick={() => setActiveVerse(null)} className="text-white bg-white/20 w-10 h-10 rounded-full">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="bg-white rounded-3xl flex-grow overflow-y-auto p-6 shadow-2xl relative">
            <div className="text-center space-y-4">
              <div className="arabic-text text-4xl text-emerald-600 font-bold py-6 leading-loose" dir="rtl">
                {activeVerse.arabic}
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <p className="text-gray-500 italic font-medium">{activeVerse.phonetic}</p>
                <p className="text-lg font-semibold text-gray-800">"{activeVerse.translation}"</p>
              </div>

              <div className="mt-8">
                <button
                  disabled={isExplaining}
                  onClick={() => askTeacher(activeVerse.arabic)}
                  className="w-full bg-yellow-400 text-yellow-900 py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 hover:bg-yellow-500 transition-colors"
                >
                  <i className={`fas ${isExplaining ? 'fa-spinner fa-spin' : 'fa-robot'}`}></i>
                  {isExplaining ? 'Yapay Zeka Öğretmen Düşünüyor...' : 'Yapay Zeka Öğretmenine Sor'}
                </button>
              </div>

              {explanation && (
                <div className="mt-6 bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-left animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold">
                    <i className="fas fa-comment-dots"></i>
                    Yapay Zeka Öğretmeni diyor ki:
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerseExplorer;
