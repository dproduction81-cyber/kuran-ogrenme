
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  points: number;
  onHome: () => void;
  title: string;
  showHome?: boolean;
  onOpenSettings?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  points, 
  onHome, 
  title, 
  showHome = true,
  onOpenSettings
}) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      {/* Top Bar */}
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center sticky top-0 z-50 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-2">
          {showHome ? (
            <button onClick={onHome} className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <i className="fas fa-home"></i>
            </button>
          ) : <div className="w-10"></div>}
          
          <button 
            onClick={onOpenSettings}
            className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>

        <h1 className="text-xl font-bold font-['Quicksand'] truncate max-w-[150px]">{title}</h1>
        
        <div className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold shadow-inner">
          <i className="fas fa-star text-yellow-600"></i>
          <span>{points}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Background decoration elements */}
      <div className="fixed -bottom-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="fixed -top-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default Layout;
