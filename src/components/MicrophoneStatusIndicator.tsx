/**
 * MicrophoneStatusIndicator - Shows microphone status banner
 *
 * Displays user-friendly messages about microphone issues
 * and allows users to request permission if denied.
 */

import { useMicrophoneStatus } from '@/hooks/useMicrophoneStatus';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Wifi, WifiOff, AlertTriangle, Loader2 } from 'lucide-react';

interface MicrophoneStatusIndicatorProps {
  className?: string;
  showWhenReady?: boolean;
}

export function MicrophoneStatusIndicator({
  className = '',
  showWhenReady = false
}: MicrophoneStatusIndicatorProps) {
  const { status, isReady, requestPermission } = useMicrophoneStatus();

  // Hide when ready (unless explicitly shown)
  if (status === 'ready' && !showWhenReady) return null;
  if (status === 'unknown') return null;

  const getStatusContent = () => {
    switch (status) {
      case 'checking':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Checking microphone...</span>
          </div>
        );

      case 'ready':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <Mic className="h-4 w-4" />
            <span>Microphone ready</span>
          </div>
        );

      case 'no_permission':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={requestPermission}
            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <MicOff className="h-4 w-4" />
            <span>Tap to allow microphone access</span>
          </Button>
        );

      case 'permission_prompt':
        return (
          <div className="flex items-center gap-2 text-amber-600">
            <Mic className="h-4 w-4" />
            <span>Please allow microphone access</span>
          </div>
        );

      case 'no_microphone':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <MicOff className="h-4 w-4" />
            <span>No microphone detected</span>
          </div>
        );

      case 'mic_in_use':
        return (
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-4 w-4" />
            <span>Microphone in use by another app</span>
          </div>
        );

      case 'network_offline':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <WifiOff className="h-4 w-4" />
            <span>No internet - speech recognition unavailable</span>
          </div>
        );

      case 'service_unavailable':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <span>Speech service unavailable - please restart app</span>
          </div>
        );

      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <span>Microphone error - please try again</span>
          </div>
        );

      default:
        return null;
    }
  };

  const content = getStatusContent();
  if (!content) return null;

  return (
    <div
      className={`mic-status-banner px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm ${className}`}
      role="status"
      aria-live="polite"
    >
      {content}
    </div>
  );
}

export default MicrophoneStatusIndicator;
