
import React, { useState } from 'react';
import { ARABIC_LETTERS } from '../constants';
import { ArabicLetter } from '../types';
import { speakText, decodeAudioData } from '../services/gemini';

interface AlphabetGameProps {
  onEarnPoints: (amount: number) => void;
  volume: number;
}

const AlphabetGame: React.FC<AlphabetGameProps> = ({ onEarnPoints, volume }) => {
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const handleLetterClick = async (letter: ArabicLetter) => {
    setSelectedLetter(letter);
    onEarnPoints(1);
    
    try {
      setLoadingAudio(true);
      const audioData = await speakText(`Bu harf ${letter.name.tr}`);
      if (audioData) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const buffer = await decodeAudioData(audioData, audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        const gainNode = audioCtx.createGain();
        
        gainNode.gain.value = volume;
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-emerald-700 font-medium italic">Öğrenmek için bir harfe dokun!</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {ARABIC_LETTERS.map((letter) => (
          <button
            key={letter.char}
            onClick={() => handleLetterClick(letter)}
            className={`${letter.color} aspect-square rounded-2xl flex items-center justify-center text-3xl text-white shadow-md border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all bounce-on-hover`}
          >
            <span className="arabic-text font-bold">{letter.char}</span>
          </button>
        ))}
      </div>

      {selectedLetter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-[60] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xs text-center relative shadow-2xl overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${selectedLetter.color}`}></div>
            <button 
              onClick={() => setSelectedLetter(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className={`text-7xl arabic-text font-bold mb-4 ${selectedLetter.color.replace('bg-', 'text-')}`}>
              {selectedLetter.char}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800">{selectedLetter.name.tr}</h2>
            <p className="text-gray-500 mb-4">Okunuşu: <span className="font-semibold">{selectedLetter.transliteration}</span></p>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Örnek kelime:</p>
              <p className="text-lg font-bold text-emerald-600">{selectedLetter.example.word}</p>
            </div>

            <button
              disabled={loadingAudio}
              onClick={() => handleLetterClick(selectedLetter)}
              className="mt-6 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loadingAudio ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-volume-up"></i>}
              Sesi Duy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetGame;
