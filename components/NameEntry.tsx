
import React, { useState } from 'react';

interface NameEntryProps {
  onNext: (name: string) => void;
  t: any;
}

const NameEntry: React.FC<NameEntryProps> = ({ onNext, t }) => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 text-4xl shadow-inner animate-bounce-slow">
          <i className="fas fa-child"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.enterName}</h2>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className="w-full px-6 py-4 bg-white border-2 border-emerald-100 rounded-[2rem] text-center text-xl font-bold focus:outline-none focus:border-emerald-400 transition-all shadow-md"
          autoFocus
        />
        <button
          onClick={() => onNext(name || 'Arkadaşım')}
          className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-bold text-xl shadow-xl hover:bg-emerald-700 active:scale-95 transition-all"
        >
          {t.start}
        </button>
      </div>
    </div>
  );
};

export default NameEntry;
