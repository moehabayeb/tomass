import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface LoginButtonProps {
  className?: string;
}

export const LoginButton = ({ className = '' }: LoginButtonProps) => {
  return (
    <Button
      asChild
      variant="default"
      className={`bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 ${className}`}
    >
      <a href="/auth" className="flex items-center gap-2">
        <LogIn size={16} />
        <span>Sign In to Track XP</span>
      </a>
    </Button>
  );
};