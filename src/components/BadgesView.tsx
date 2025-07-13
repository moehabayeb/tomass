import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';

interface BadgesViewProps {
  onBack: () => void;
}

export default function BadgesView({ onBack }: BadgesViewProps) {
  const { badges, badgeProgress } = useBadgeSystem();

  const getProgressText = (badgeId: string) => {
    switch (badgeId) {
      case 'first_lesson':
        return badgeProgress.totalExercises >= 1 ? 'Completed!' : '0/1 lessons';
      case 'a1_master':
        return `${badgeProgress.grammarLessonsCompleted}/10 lessons`;
      case 'three_day_streak':
        return `${Math.min(badgeProgress.currentStreak, 3)}/3 days`;
      case 'level_5_achieved':
        return `Level ${badgeProgress.currentLevel}/5`;
      case 'grammar_guru':
        return `${badgeProgress.completedModules}/5 modules`;
      case 'speaking_champ':
        return `${badgeProgress.speakingSubmissions}/10 submissions`;
      default:
        return '';
    }
  };

  const getProgressPercentage = (badgeId: string) => {
    switch (badgeId) {
      case 'first_lesson':
        return badgeProgress.totalExercises >= 1 ? 100 : 0;
      case 'a1_master':
        return Math.min((badgeProgress.grammarLessonsCompleted / 10) * 100, 100);
      case 'three_day_streak':
        return Math.min((badgeProgress.currentStreak / 3) * 100, 100);
      case 'level_5_achieved':
        return Math.min((badgeProgress.currentLevel / 5) * 100, 100);
      case 'grammar_guru':
        return Math.min((badgeProgress.completedModules / 5) * 100, 100);
      case 'speaking_champ':
        return Math.min((badgeProgress.speakingSubmissions / 10) * 100, 100);
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white relative">
      {/* Background Stars */}
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">🏅 Your Badges</h1>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{badges.filter(b => b.unlocked).length}</div>
            <div className="text-sm text-white/70">Badges Earned</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{badgeProgress.currentLevel}</div>
            <div className="text-sm text-white/70">Current Level</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{badgeProgress.currentStreak}</div>
            <div className="text-sm text-white/70">Current Streak</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{badgeProgress.totalExercises}</div>
            <div className="text-sm text-white/70">Total Exercises</div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                badge.unlocked 
                  ? 'border-primary/50 shadow-lg shadow-primary/20 scale-100' 
                  : 'border-white/20 opacity-60 grayscale'
              }`}
            >
              {/* Badge Icon */}
              <div className="text-center mb-4">
                <div className={`text-6xl mb-2 ${badge.unlocked ? 'animate-pulse' : ''}`}>
                  {badge.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{badge.name}</h3>
                <p className="text-white/70 text-sm">{badge.description}</p>
              </div>

              {/* Progress Bar */}
              {!badge.unlocked && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-white/70 mb-2">
                    <span>Progress</span>
                    <span>{getProgressText(badge.id)}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(badge.id)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="flex justify-center">
                {badge.unlocked ? (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    ✅ Unlocked
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-white/30 text-white/70">
                    🔒 {badge.condition}
                  </Badge>
                )}
              </div>

              {/* Unlock Date */}
              {badge.unlocked && badge.unlockedAt && (
                <div className="text-center mt-2 text-xs text-white/50">
                  Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}