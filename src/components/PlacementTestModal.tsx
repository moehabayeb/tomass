/**
 * Placement Test Modal
 * Prompts authenticated users to complete placement test before accessing lessons
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GraduationCap, Check, Clock, Zap } from 'lucide-react';

interface PlacementTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTest: () => void;
  onStartA1Direct?: () => void;  // v40: Turkish option to start with A1 directly
}

export const PlacementTestModal = ({ isOpen, onClose, onStartTest, onStartA1Direct }: PlacementTestModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur-xl border-white/20 text-white">
        <DialogHeader>
          {/* Large centered icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>

          <DialogTitle className="text-2xl text-center text-white">
            Ready to Begin Your English Journey?
          </DialogTitle>

          <DialogDescription className="text-center text-white/80 text-base">
            Take a quick placement test to unlock lessons tailored perfectly to your level.
          </DialogDescription>
        </DialogHeader>

        {/* Benefits section */}
        <div className="space-y-3 my-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-white/90">Find your perfect starting point</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-white/90">Unlock modules matched to your level</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-white/90">Track your progress effectively</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-white/90">Avoid content that's too easy or hard</span>
          </div>
        </div>

        {/* Info box with gradient */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-300" />
            <span className="font-semibold text-white">Quick & Easy</span>
          </div>
          <p className="text-sm text-white/80">
            Takes only 3-5 minutes • Get instant results • Start learning right away
          </p>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col mt-2">
          <Button
            onClick={onStartTest}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold border-0"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Placement Test
          </Button>

          {/* v40: Turkish option to start with A1 directly */}
          {/* v43: Fixed button overflow with h-auto py-3 and text wrap */}
          {onStartA1Direct && (
            <Button
              variant="outline"
              onClick={onStartA1Direct}
              className="w-full border-amber-500/50 text-amber-200 hover:bg-amber-500/20 hover:border-amber-400 h-auto py-3"
            >
              <span className="text-sm text-center whitespace-normal">
                Ingilizce bilmiyorum, A1 seviyesinden baslamak istiyorum
              </span>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            Skip for Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
