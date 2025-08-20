import { useState } from 'react';
import { Menu, Mic, BookOpen, Bookmark, Award, Gamepad2, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import DailyTips, { hasTodaysTipBeenViewed } from './DailyTips';

type AppMode = 'speaking' | 'lessons' | 'bookmarks' | 'badges' | 'placement-test' | 'games' | 'meetings';

interface NavigationDropdownProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const navigationItems = [
  { 
    mode: 'speaking' as AppMode, 
    label: 'Speaking', 
    icon: Mic 
  },
  { 
    mode: 'lessons' as AppMode, 
    label: 'Lessons', 
    icon: BookOpen 
  },
  { 
    mode: 'bookmarks' as AppMode, 
    label: 'Saved', 
    icon: Bookmark 
  },
  { 
    mode: 'badges' as AppMode, 
    label: 'Badges', 
    icon: Award 
  },
  { 
    mode: 'games' as AppMode, 
    label: 'Games', 
    icon: Gamepad2 
  },
  { 
    mode: 'meetings' as AppMode, 
    label: 'Meetings', 
    icon: Users 
  },
  { 
    mode: 'placement-test' as AppMode, 
    label: 'Speaking Test', 
    icon: Mic 
  },
];

export function NavigationDropdown({ currentMode, onModeChange }: NavigationDropdownProps) {
  const [open, setOpen] = useState(false);
  const [showDailyTips, setShowDailyTips] = useState(false);

  const handleItemClick = (mode: AppMode) => {
    onModeChange(mode);
    setOpen(false);
  };

  const currentItem = navigationItems.find(item => item.mode === currentMode);

  const hasNewTip = !hasTodaysTipBeenViewed();

  return (
    <>
      <div className="fixed top-4 right-4 z-20">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 px-4 py-2 h-auto relative"
              style={{ boxShadow: 'var(--shadow-medium)' }}
            >
              <Menu className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{currentItem?.label}</span>
              <span className="sm:hidden">Menu</span>
              {hasNewTip && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg"
            style={{ boxShadow: 'var(--shadow-medium)' }}
          >
            {/* Daily Tips at the top */}
            <DropdownMenuItem
              onClick={() => {
                setShowDailyTips(true);
                setOpen(false);
              }}
              className="flex items-center px-3 py-2 cursor-pointer rounded-lg mx-1 my-0.5 transition-all duration-200 hover:bg-orange-50 text-gray-700 relative"
            >
              <Lightbulb className="h-4 w-4 mr-3 flex-shrink-0 text-orange-500" />
              <span className="text-sm">Daily Tip</span>
              {hasNewTip && (
                <div className="w-2 h-2 bg-orange-500 rounded-full ml-auto animate-pulse"></div>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1" />
            
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentMode === item.mode;
              
              return (
                <DropdownMenuItem
                  key={item.mode}
                  onClick={() => handleItemClick(item.mode)}
                  className={`flex items-center px-3 py-2 cursor-pointer rounded-lg mx-1 my-0.5 transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-black/5 text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Daily Tips Modal */}
      {showDailyTips && (
        <DailyTips onClose={() => setShowDailyTips(false)} />
      )}
    </>
  );
}