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
    <div className={`w-full space-y-1 ${className}`}>
      {showLabels && (
        <div className={`flex justify-between ${getTextSize()} text-muted-foreground`}>
          <span>{safeCurrentXP} XP</span>
          <span>{totalXP} XP</span>
        </div>
      )}
      <Progress 
        value={percentage} 
        className={`${getHeight()} transition-all duration-500`}
      />
    </div>
  );
};