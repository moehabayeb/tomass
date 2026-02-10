/**
 * Resume Progress Dialog
 *
 * Shows when user opens a module with saved progress
 * Offers choice to resume from checkpoint or start fresh
 */

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, RotateCcw, Clock, Target } from 'lucide-react';

interface ResumeProgressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  // Progress information
  level: string;
  moduleId: number;
  questionIndex: number;
  totalQuestions: number;
  phase: string;
  progressPercentage: number;

  // Actions
  onResume: () => void;
  onStartFresh: () => void;
}

export function ResumeProgressDialog({
  open,
  onOpenChange,
  level,
  moduleId,
  questionIndex,
  totalQuestions,
  phase,
  progressPercentage,
  onResume,
  onStartFresh
}: ResumeProgressDialogProps) {

  const getPhaseDisplayName = (phaseKey: string): string => {
    switch (phaseKey) {
      case 'MCQ': return 'Multiple Choice';
      case 'SPEAK_READY': return 'Ready to Speak';
      case 'AWAITING_FEEDBACK': return 'Speech Recording';
      case 'COMPLETED': return 'Completed';
      default: return 'In Progress';
    }
  };

  const getPhaseIcon = (phaseKey: string) => {
    switch (phaseKey) {
      case 'MCQ': return '🎯';
      case 'SPEAK_READY': return '🎤';
      case 'AWAITING_FEEDBACK': return '🔄';
      case 'COMPLETED': return '✅';
      default: return '📚';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur-xl border-white/20 text-white"
        aria-describedby="resume-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-white">
            Continue Your Progress?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6" id="resume-dialog-description">
          {/* Module Info */}
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {level} - Module {moduleId}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-blue-300" />
                  <span className="text-sm text-white/80">Last session saved</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl mb-2">{getPhaseIcon(phase)}</div>
              <Badge variant="outline" className="text-white border-white/30 mb-3">
                Question {questionIndex + 1} of {totalQuestions}
              </Badge>
              <p className="text-sm text-white/80">
                {getPhaseDisplayName(phase)} Phase
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Progress</span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2 bg-white/20"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={onResume}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              size="lg"
              autoFocus
              aria-label={`Resume from question ${questionIndex + 1} of ${totalQuestions}`}
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              Resume from Question {questionIndex + 1}
            </Button>

            <Button
              onClick={onStartFresh}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10"
              size="lg"
              aria-label="Start module from the beginning"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Start from Beginning
            </Button>
          </div>

          {/* Helper Text */}
          <div className="text-center">
            <p className="text-xs text-white/70">
              Your progress is automatically saved as you learn
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Module List Badge Component
 * Shows resume indicator on module cards
 */
interface ModuleProgressBadgeProps {
  level: string;
  moduleId: number;
  questionIndex?: number;
  totalQuestions?: number;
  isCompleted?: boolean;
}

export function ModuleProgressBadge({
  level,
  moduleId,
  questionIndex = 0,
  totalQuestions = 40,
  isCompleted = false
}: ModuleProgressBadgeProps) {
  if (isCompleted) {
    return (
      <Badge className="bg-green-600 text-white">
        ✅ Completed
      </Badge>
    );
  }

  if (questionIndex > 0) {
    const percentage = Math.round((questionIndex / totalQuestions) * 100);
    return (
      <Badge className="bg-blue-600 text-white">
        📍 Resume Q{questionIndex + 1} ({percentage}%)
      </Badge>
    );
  }

  return null;
}

/**
 * Sync Status Indicator
 * Shows offline/syncing status in header
 */
interface SyncStatusIndicatorProps {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncAt?: number | null;
  pendingCount?: number;
}

export function SyncStatusIndicator({
  isOnline,
  isSyncing,
  lastSyncAt,
  pendingCount = 0
}: SyncStatusIndicatorProps) {
  if (isSyncing) {
    return (
      <Badge variant="outline" className="text-blue-300 border-blue-300/50 animate-pulse">
        🔄 Syncing...
      </Badge>
    );
  }

  if (!isOnline) {
    return (
      <Badge variant="outline" className="text-orange-300 border-orange-300/50">
        📡 Offline {pendingCount > 0 && `(${pendingCount} pending)`}
      </Badge>
    );
  }

  if (lastSyncAt) {
    const now = Date.now();
    const timeDiff = now - lastSyncAt;
    const minutes = Math.floor(timeDiff / (1000 * 60));

    if (minutes < 1) {
      return (
        <Badge variant="outline" className="text-green-300 border-green-300/50">
          ✅ Synced
        </Badge>
      );
    } else if (minutes < 60) {
      return (
        <Badge variant="outline" className="text-green-300 border-green-300/50">
          ✅ Synced {minutes}m ago
        </Badge>
      );
    }
  }

  return null;
}