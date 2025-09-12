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
      className={`bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 
                 text-primary-foreground font-semibold
                 rounded-full px-6 py-3 min-h-[44px]
                 shadow-lg hover:shadow-xl hover:shadow-primary/25
                 transition-all duration-300 ease-out
                 hover:scale-105 hover:-translate-y-0.5
                 border border-primary/20 hover:border-primary/40
                 ${className}`}
    >
      <a href="/auth" className="flex items-center gap-2">
        <LogIn size={18} />
        <span>Sign In</span>
      </a>
    </Button>
  );
};