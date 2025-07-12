import { useState } from 'react';
import { Mic, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeakingApp from './SpeakingApp';
import GrammarModules from './GrammarModules';

type AppMode = 'speaking' | 'grammar';

export default function AppNavigation() {
  const [currentMode, setCurrentMode] = useState<AppMode>('speaking');

  if (currentMode === 'grammar') {
    return <GrammarModules onBack={() => setCurrentMode('speaking')} />;
  }

  return (
    <div className="relative">
      {/* Navigation Tab */}
      <div 
        className="fixed top-4 right-4 z-20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20"
        style={{ boxShadow: 'var(--shadow-medium)' }}
      >
        <div className="flex space-x-2 p-2">
          <Button
            onClick={() => setCurrentMode('speaking')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 ${
              currentMode === 'speaking' 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Mic className="h-4 w-4 mr-2" />
            Speaking
          </Button>
          <Button
            onClick={() => setCurrentMode('grammar')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 ${
              currentMode !== 'speaking' 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Grammar
          </Button>
        </div>
      </div>

      {/* Current Mode Content */}
      <SpeakingApp />
    </div>
  );
}