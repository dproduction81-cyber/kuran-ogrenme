
import React from 'react';
import { GameState } from '../types';

interface MenuProps {
  onSetState: (state: GameState) => void;
}

const Menu: React.FC<MenuProps> = ({ onSetState }) => {
  const menuItems = [
    { id: 'alphabet' as const, title: 'Elifba Dünyası', icon: 'fa-font', color: 'bg-emerald-500', desc: 'Bütün harfleri öğren!' },
    { id: 'verses' as const, title: 'Kısa Sureler', icon: 'fa-book-open', color: 'bg-blue-500', desc: 'Ayetleri dinle ve öğren' },
    { id: 'quiz' as const, title: 'Harf Yarışması', icon: 'fa-puzzle-piece', color: 'bg-yellow-500', desc: 'Bilgini test et' },
    { id: 'ai-chat' as const, title: 'AI ile Sohbet', icon: 'fa-robot', color: 'bg-purple-500', desc: 'Her şeyi sorabilirsin' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-6 bg-emerald-50 rounded-3xl border-2 border-emerald-100 shadow-inner relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-emerald-800 mb-1">Hoş Geldin</h2>
          <h1 className="text-4xl font-extrabold text-emerald-600 uppercase tracking-tight">Kur'an Eğlencesi</h1>
          <p className="text-emerald-500 text-sm mt-2">Öğrenmeye hazır mısın?</p>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
            <i className="fas fa-star text-7xl"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSetState(item.id)}
            className="flex items-center gap-4 bg-white p-5 rounded-3xl shadow-md border-2 border-transparent hover:border-emerald-200 active:scale-95 transition-all text-left group"
          >
            <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
              <i className={`fas ${item.icon}`}></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
            <div className="ml-auto text-gray-300">
              <i className="fas fa-chevron-right"></i>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-6 bg-yellow-50 rounded-3xl border border-yellow-100 flex items-center gap-4 animate-bounce-slow">
         <div className="text-3xl text-yellow-500">
            <i className="fas fa-lightbulb"></i>
         </div>
         <p className="text-yellow-800 text-sm font-medium">
            Kur'an'ın ilk emrinin "Oku" olduğunu biliyor muydun?
         </p>
      </div>
    </div>
  );
};

export default Menu;
