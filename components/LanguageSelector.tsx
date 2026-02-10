
import React from 'react';
import { Language } from '../types';

interface Props {
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 text-4xl shadow-inner">
          <i className="fas fa-language"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Taal Kiezen / Dil Seçin</h2>
        <p className="text-gray-500">Koran leren was nog nooit zo leuk!</p>
      </div>

      <div className="grid grid-cols-1 w-full gap-4 px-4">
        <button
          onClick={() => onSelect('nl')}
          className="group relative bg-white border-2 border-emerald-100 p-6 rounded-3xl shadow-lg hover:border-emerald-500 transition-all flex items-center gap-6 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
             <span className="text-6xl">🇳🇱</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl shadow-md">
            NL
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800 text-lg">Nederlands</h3>
            <p className="text-sm text-gray-500">Begin je reis in het Nederlands</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('tr')}
          className="group relative bg-white border-2 border-red-100 p-6 rounded-3xl shadow-lg hover:border-red-500 transition-all flex items-center gap-6 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
             <span className="text-6xl">🇹🇷</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl shadow-md">
            TR
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800 text-lg">Türkçe</h3>
            <p className="text-sm text-gray-500">Yolculuğuna Türkçe ile başla</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
