import { Progress } from '@/components/ui/progress';

interface XPProgressBarProps {
  currentXP: number;
  totalXP: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const XPProgressBar = ({ 
  currentXP, 
  totalXP, 
  showLabels = true, 
  size = 'md',
  className = ''
}: XPProgressBarProps) => {
  const safeCurrentXP = Math.max(0, currentXP);
  const percentage = (safeCurrentXP / totalXP) * 100;
  
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-sm';
      default: return 'text-xs';
    }
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {showLabels && (
        <div className={`flex justify-between ${getTextSize()} text-white/80 font-medium`}>
          <span className="drop-shadow-sm">{safeCurrentXP} XP</span>
          <span className="drop-shadow-sm">{totalXP} XP</span>
        </div>
      )}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={`${getHeight()} transition-all duration-700 ease-out bg-white/20 border border-white/10 shadow-inner backdrop-blur-sm rounded-full overflow-hidden`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-50 rounded-full"></div>
      </div>
    </div>
  );
};