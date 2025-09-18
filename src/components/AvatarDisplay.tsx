import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, GraduationCap, ShirtIcon, PartyPopper, Sparkles } from 'lucide-react';
import { XPProgressBar } from './XPProgressBar';

interface AvatarAccessory {
  id: string;
  name: string;
  icon: React.ReactNode;
  unlockLevel: number;
  description: string;
}

const AVATAR_ACCESSORIES: AvatarAccessory[] = [
  {
    id: 'graduation-cap',
    name: 'Graduation Cap',
    icon: <GraduationCap className="w-4 h-4" />,
    unlockLevel: 3,
    description: 'Scholar achievement!'
  },
  {
    id: 'jacket',
    name: 'Smart Jacket',
    icon: <ShirtIcon className="w-4 h-4" />,
    unlockLevel: 5,
    description: 'Looking professional!'
  },
  {
    id: 'celebration',
    name: 'Party Mode',
    icon: <PartyPopper className="w-4 h-4" />,
    unlockLevel: 10,
    description: 'Celebration time!'
  },
  {
    id: 'glowing',
    name: 'Golden Glow',
    icon: <Sparkles className="w-4 h-4" />,
    unlockLevel: 15,
    description: 'Legendary status!'
  }
];

interface AvatarDisplayProps {
  level: number;
  xp: number;
  maxXP?: number;
  userName?: string;
  avatarUrl?: string;
  showXPBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarDisplay = ({ 
  level, 
  xp, 
  maxXP = 500, 
  userName = "Tomas", 
  avatarUrl,
  showXPBar = true,
  size = 'md'
}: AvatarDisplayProps) => {
  const unlockedAccessories = AVATAR_ACCESSORIES.filter(acc => level >= acc.unlockLevel);
  const nextAccessory = AVATAR_ACCESSORIES.find(acc => level < acc.unlockLevel);
  // XP progress calculation removed as unused

  const getAvatarSize = () => {
    switch (size) {
      case 'sm': return 'h-12 w-12';
      case 'lg': return 'h-24 w-24';
      default: return 'h-16 w-16';
    }
  };

  const getAvatarStyle = () => {
    let style: React.CSSProperties = {};
    
    // Apply visual effects based on unlocked accessories
    if (unlockedAccessories.some(acc => acc.id === 'glowing')) {
      style.boxShadow = '0 0 20px hsl(var(--primary) / 0.6)';
      style.border = '2px solid hsl(var(--primary))';
    } else if (unlockedAccessories.some(acc => acc.id === 'celebration')) {
      style.border = '2px solid hsl(var(--accent))';
    }
    
    return style;
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Avatar with Accessories */}
      <div className="relative">
        <Avatar 
          className={`${getAvatarSize()} transition-all duration-300`}
          style={getAvatarStyle()}
        >
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Accessory Indicators */}
        {unlockedAccessories.length > 0 && (
          <div className="absolute -top-1 -right-1 flex flex-wrap gap-0.5">
            {unlockedAccessories.slice(0, 2).map((accessory) => (
              <div
                key={accessory.id}
                className="bg-primary text-primary-foreground rounded-full p-1 text-xs"
                title={accessory.name}
              >
                {accessory.icon}
              </div>
            ))}
            {unlockedAccessories.length > 2 && (
              <div className="bg-accent text-accent-foreground rounded-full p-1 text-xs">
                <Star className="w-3 h-3" />
              </div>
            )}
          </div>
        )}

        {/* Level Badge */}
        <Badge 
          className="absolute -bottom-1 -right-1 min-w-6 h-6 text-xs font-bold bg-gradient-to-r from-primary to-accent border-0"
        >
          {level}
        </Badge>
      </div>

      {/* User Info */}
      <div className="text-center">
        <p className="font-semibold text-sm">{userName}</p>
        <p className="text-xs text-muted-foreground">Level {level}</p>
      </div>

      {/* XP Progress Bar */}
      {showXPBar && (
        <div className="w-full max-w-48 space-y-2">
          <XPProgressBar 
            currentXP={Math.max(0, xp)} 
            totalXP={maxXP} 
            showLabels={true}
            size="md"
          />
          <p className="text-xs text-center text-muted-foreground">
            {Math.max(0, maxXP - xp)} XP to level {level + 1}
          </p>
        </div>
      )}

      {/* Next Unlock Preview */}
      {nextAccessory && (
        <div className="bg-muted/50 rounded-lg p-2 text-center max-w-48 relative group">
          <div className="flex items-center justify-center gap-2 mb-1">
            {nextAccessory.icon}
            <span className="text-xs font-medium">{nextAccessory.name}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Unlock at Level {nextAccessory.unlockLevel}
          </p>
          
          {/* Tooltip for Party Mode */}
          {nextAccessory.id === 'celebration' && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-40 p-2 text-xs bg-background border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
              Compete with friends in real-time at Level 10!
            </div>
          )}
        </div>
      )}
    </div>
  );
};