
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LevelMap from './components/LevelMap';
import LessonView from './components/LessonView';
import LanguageSelector from './components/LanguageSelector';
import NameEntry from './components/NameEntry';
import SettingsModal from './components/SettingsModal';
import { GameState, Language, UserProgress, Lesson } from './types';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('language-select');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [progress, setProgress] = useState<UserProgress>({
    points: 0,
    currentLevelId: 1,
    completedLessonIds: [],
    language: 'nl',
    volume: 0.8,
    userName: ''
  });
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('quran_journey_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress(parsed);
      setGameState('map');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  useEffect(() => {
    if (gameState !== 'language-select' && gameState !== 'name-entry') {
      localStorage.setItem('quran_journey_v3', JSON.stringify(progress));
    }
  }, [progress, gameState]);

  const t = TRANSLATIONS[progress.language];

  const handleLanguageSelect = (lang: Language) => {
    setProgress(prev => ({ ...prev, language: lang }));
    setGameState('name-entry');
  };

  const handleNameEntry = (name: string) => {
    setProgress(prev => ({ ...prev, userName: name }));
    setGameState('map');
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setProgress(prev => ({ ...prev, volume: vol }));
  };

  const handleNameChange = (name: string) => {
    setProgress(prev => ({ ...prev, userName: name }));
  };

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setGameState('lesson');
  };

  const completeLesson = (pointsEarned: number) => {
    if (!activeLesson) return;
    setProgress(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      completedLessonIds: [...new Set([...prev.completedLessonIds, activeLesson.id])]
    }));
    setGameState('map');
    setActiveLesson(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'language-select':
        return <LanguageSelector onSelect={handleLanguageSelect} />;
      case 'name-entry':
        return <NameEntry onNext={handleNameEntry} t={t} />;
      case 'map':
        return (
          <div className="space-y-4">
            {deferredPrompt && (
              <button 
                onClick={handleInstall}
                className="w-full bg-yellow-400 text-yellow-900 py-3 rounded-2xl font-bold shadow-md flex items-center justify-center gap-2 animate-bounce-slow mb-4"
              >
                <i className="fas fa-download"></i>
                App Installeren / Uygulamayı Yükle
              </button>
            )}
            <LevelMap 
              progress={progress} 
              onStartLesson={startLesson} 
              t={t}
            />
          </div>
        );
      case 'lesson':
        return activeLesson ? (
          <LessonView 
            lesson={activeLesson} 
            progress={progress} 
            onComplete={completeLesson}
            onBack={() => setGameState('map')}
            t={t}
          />
        ) : null;
      default:
        return <LevelMap progress={progress} onStartLesson={startLesson} t={t} />;
    }
  };

  return (
    <>
      <Layout 
        points={progress.points} 
        onHome={() => setGameState('map')}
        title={t.appTitle}
        showHome={gameState !== 'language-select' && gameState !== 'name-entry'}
        onOpenSettings={() => setIsSettingsOpen(true)}
      >
        {renderContent()}
      </Layout>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={progress.language}
        onLanguageChange={(lang) => setProgress(prev => ({ ...prev, language: lang }))}
        volume={progress.volume}
        onVolumeChange={handleVolumeChange}
        userName={progress.userName}
        onNameChange={handleNameChange}
        t={t}
      />
    </>
  );
};

export default App;
