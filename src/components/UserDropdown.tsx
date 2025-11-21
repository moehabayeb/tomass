import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserDropdownProps {
  user: {
    id: string;
    email?: string;
  };
  profile?: {
    full_name?: string;
    avatar_url?: string;
  };
  className?: string;
}

export function UserDropdown({ user, profile, className }: UserDropdownProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = () => {
    setIsLoggingOut(true);

    // PERFORMANCE FIX: Fire-and-forget pattern for instant sign-out
    // Don't await network call - let it happen in background
    supabase.auth.signOut().catch(error => {
      // Handle errors silently in background - show toast only
      toast({
        title: "Note",
        description: "Sign out may not have completed. Please refresh if needed.",
        variant: "destructive",
      });
    });

    // Clear local storage immediately (don't wait for network)
    localStorage.removeItem('userProfile');
    localStorage.removeItem('streakData');
    localStorage.removeItem('badgeProgress');

    // Show feedback and navigate immediately
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });

    navigate('/auth');
    setIsLoggingOut(false);
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const displayName = profile?.full_name || user.email || 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20 ${className}`}
          title={`Signed in as ${displayName}`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
            <AvatarFallback className="bg-primary/20 text-primary-foreground text-sm font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-56 bg-background/95 backdrop-blur-md border border-border/50" 
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
            <AvatarFallback className="bg-primary/20 text-primary-foreground text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="text-sm font-medium text-foreground truncate max-w-32">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-32">
              {user.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="cursor-pointer focus:bg-accent/50"
        >
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}