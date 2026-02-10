
import React, { useState, useEffect, useRef } from 'react';
import { Lesson, UserProgress } from '../types';
import { ARABIC_LETTERS_DATA } from '../constants';
import { speakText, decodeAudioData, getVerseExplanation } from '../services/gemini';

interface Props {
  lesson: Lesson;
  progress: UserProgress;
  onComplete: (points: number) => void;
  onBack: () => void;
  t: any;
}

const LessonView: React.FC<Props> = ({ lesson, progress, onComplete, onBack, t }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  
  // Ref to keep the AudioContext for faster subsequent plays
  const audioCtxRef = useRef<AudioContext | null>(null);

  const isLast = lesson.type === 'letter' 
    ? activeItemIndex === (lesson.content as string[]).length - 1
    : true;

  const handleSpeak = async (text: string) => {
    try {
      setLoadingAudio(true);
      const audioData = await speakText(text);
      if (audioData) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioCtxRef.current;
        const buffer = await decodeAudioData(audioData, ctx, 24000, 1);
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        
        gainNode.gain.value = progress.volume;
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
      }
    } catch (err) {
      console.error("Playback error:", err);
    } finally {
      setLoadingAudio(false);
    }
  };

  // Auto-play effect when the item changes or lesson starts
  useEffect(() => {
    let textToSpeak = "";
    if (lesson.type === 'letter') {
      const char = (lesson.content as string[])[activeItemIndex];
      textToSpeak = ARABIC_LETTERS_DATA[char].name[progress.language];
    } else {
      textToSpeak = lesson.type === 'word' ? (lesson.content as any).word : lesson.content;
    }

    if (textToSpeak) {
      // Small delay to allow transition animations to settle
      const timer = setTimeout(() => {
        handleSpeak(textToSpeak);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeItemIndex, lesson.id]);

  const handleNext = () => {
    if (isLast) {
      onComplete(10);
    } else {
      setActiveItemIndex(prev => prev + 1);
      setExplanation(null);
    }
  };

  const askTeacher = async () => {
    setIsExplaining(true);
    const text = lesson.type === 'letter' ? (lesson.content as string[])[activeItemIndex] : (lesson.content as any).word || lesson.content;
    const result = await getVerseExplanation(text as string, progress.userName);
    setExplanation(result);
    setIsExplaining(false);
  };

  const renderLessonContent = () => {
    if (lesson.type === 'letter') {
      const char = (lesson.content as string[])[activeItemIndex];
      const data = ARABIC_LETTERS_DATA[char];
      return (
        <div className="flex flex-col items-center py-6 space-y-6">
           <div className={`w-40 h-40 ${data.color} rounded-[2.5rem] flex items-center justify-center text-7xl text-white shadow-2xl animate-in zoom-in duration-300 relative`}>
              <span className="arabic-text font-bold">{char}</span>
              <button 
                onClick={() => handleSpeak(`${data.name[progress.language]}`)}
                className={`absolute -bottom-2 -right-2 w-14 h-14 bg-white rounded-full shadow-lg text-emerald-600 text-xl flex items-center justify-center active:scale-90 transition-transform ${loadingAudio ? 'animate-pulse' : ''}`}
              >
                {loadingAudio ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-volume-up"></i>}
              </button>
           </div>
           <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">{data.name[progress.language]}</h2>
              <p className="text-gray-400 text-lg">{data.transliteration}</p>
           </div>
           <div className="bg-emerald-50 p-5 rounded-3xl w-full border border-emerald-100 shadow-sm">
              <p className="text-emerald-700 font-bold mb-2 text-sm uppercase tracking-wider">Örnek / Voorbeeld:</p>
              <div className="flex justify-between items-center">
                 <span className="text-2xl font-bold text-gray-700">{data.example.word}</span>
                 <span className="text-emerald-600 font-medium italic">{data.example.translation[progress.language]}</span>
              </div>
           </div>
           {activeItemIndex > 0 && (
             <p className="text-xs text-emerald-600 font-bold animate-pulse">
                {t.cheer.replace('{0}', progress.userName)}
             </p>
           )}
        </div>
      );
    }

    if (lesson.type === 'word' || lesson.type === 'verse') {
      const text = lesson.type === 'word' ? (lesson.content as any).word : lesson.content;
      return (
        <div className="flex flex-col items-center py-6 space-y-6">
           <div className="bg-white border-4 border-emerald-100 p-8 rounded-[2.5rem] shadow-xl w-full text-center relative overflow-hidden group">
              <p className="arabic-text text-5xl font-bold text-gray-800 leading-loose" dir="rtl">{text}</p>
              <button 
                onClick={() => handleSpeak(text)}
                className={`mt-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg mx-auto flex items-center justify-center text-lg hover:bg-emerald-600 transition-colors ${loadingAudio ? 'animate-pulse' : ''}`}
              >
                {loadingAudio ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-play"></i>}
              </button>
           </div>
           
           <div className="w-full space-y-4">
              <button
                disabled={isExplaining}
                onClick={askTeacher}
                className="w-full bg-yellow-400 text-yellow-900 py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 hover:bg-yellow-500 transition-colors"
              >
                <i className={`fas ${isExplaining ? 'fa-spinner fa-spin' : 'fa-robot'}`}></i>
                {isExplaining ? t.aiThinking : t.askAi}
              </button>

              {explanation && (
                <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm animate-in slide-in-from-bottom-4">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{explanation}</p>
                </div>
              )}
           </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-[80vh] relative">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 p-2">
          <i className="fas fa-chevron-left text-xl"></i>
        </button>
        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
           {lesson.title[progress.language]}
        </div>
        <div className="w-8"></div>
      </div>

      <div className="flex-grow">
        {renderLessonContent()}
      </div>

      <div className="sticky bottom-4 w-full pt-4">
        <button
          onClick={handleNext}
          className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold text-xl shadow-xl hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {isLast ? t.lessonComplete : t.next}
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default LessonView;
