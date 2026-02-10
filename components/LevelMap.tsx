
import React from 'react';
import { LEVELS } from '../constants';
import { UserProgress, Lesson } from '../types';

interface Props {
  progress: UserProgress;
  onStartLesson: (lesson: Lesson) => void;
  t: any;
}

const LevelMap: React.FC<Props> = ({ progress, onStartLesson, t }) => {
  return (
    <div className="relative pb-10">
      {/* Map Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
         <div className="absolute top-80 right-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-12 relative z-10">
        {LEVELS.map((level, lIndex) => {
          const isLocked = progress.points < level.unlockedAt;
          
          return (
            <div key={level.id} className={`space-y-4 ${isLocked ? 'opacity-60 grayscale' : ''}`}>
              <div className="flex items-center gap-3 px-2">
                <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {level.id}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{level.chapter[progress.language]}</h3>
              </div>

              <div className="flex flex-col items-center space-y-6 relative">
                 {/* Path connecting lessons */}
                 <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-emerald-100 -translate-x-1/2 rounded-full z-0"></div>

                {level.lessons.map((lesson, index) => {
                  const isCompleted = progress.completedLessonIds.includes(lesson.id);
                  const isEven = index % 2 === 0;

                  return (
                    <button
                      key={lesson.id}
                      disabled={isLocked}
                      onClick={() => onStartLesson(lesson)}
                      className={`
                        relative z-10 group flex flex-col items-center transition-all
                        ${isEven ? 'translate-x-12' : '-translate-x-12'}
                      `}
                    >
                      <div className={`
                        w-16 h-16 rounded-3xl flex items-center justify-center text-white text-2xl shadow-xl
                        transition-transform group-hover:scale-110 group-active:scale-95
                        ${isCompleted ? 'bg-yellow-400' : isLocked ? 'bg-gray-300' : 'bg-emerald-500'}
                        border-b-4 border-black/10
                      `}>
                        {isCompleted ? <i className="fas fa-check"></i> : <i className={`fas ${lesson.type === 'letter' ? 'fa-font' : lesson.type === 'verse' ? 'fa-book' : 'fa-play'}`}></i>}
                      </div>
                      <div className="mt-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-xs font-bold text-gray-700 border border-emerald-50">
                        {lesson.title[progress.language]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isLocked && (
                <div className="text-center p-4 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200">
                  <i className="fas fa-lock text-gray-400 mb-2"></i>
                  <p className="text-xs text-gray-500">
                    {t.earnPoints.replace('{0}', (level.unlockedAt - progress.points).toString())}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress Footer (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md p-4 border-t border-emerald-100 flex items-center justify-between z-40">
        <div className="flex-grow mr-4 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000" 
            style={{ width: `${Math.min(100, (progress.points / 300) * 100)}%` }}
          ></div>
        </div>
        <div className="text-emerald-700 font-bold whitespace-nowrap">
           {Math.floor((progress.points / 300) * 100)}% {t.beginner}
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
