
import React from 'react';
import { Language } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  userName: string;
  onNameChange: (name: string) => void;
  t: any;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  language, 
  onLanguageChange, 
  volume, 
  onVolumeChange,
  userName,
  onNameChange,
  t 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <i className="fas fa-cog text-emerald-500"></i>
          {t.settings}
        </h2>

        <div className="space-y-6">
          {/* User Name */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              {t.userName}
            </label>
            <input 
              type="text"
              value={userName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all font-medium"
            />
          </div>

          {/* Language selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              {t.language}
            </label>
            <div className="flex bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => onLanguageChange('nl')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  language === 'nl' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'
                }`}
              >
                🇳🇱 NL
              </button>
              <button
                onClick={() => onLanguageChange('tr')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  language === 'tr' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'
                }`}
              >
                🇹🇷 TR
              </button>
            </div>
          </div>

          {/* Volume slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                {t.volume}
              </label>
              <i className={`fas ${volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'} text-emerald-500`}></i>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-600 transition-colors"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
