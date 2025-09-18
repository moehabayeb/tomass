import { useEffect, useState } from 'react';
import { Mic, MicOff, AlertCircle, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicrophoneIndicatorProps {
  isListening: boolean;
  isRecording: boolean;
  hasPermission: boolean;
  error?: string;
  audioLevel?: number;
  className?: string;
}

export const MicrophoneIndicator = ({
  isListening,
  isRecording,
  hasPermission,
  error,
  audioLevel = 0,
  className
}: MicrophoneIndicatorProps) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);

  // Update pulse intensity based on audio level
  useEffect(() => {
    if (isRecording && audioLevel > 0) {
      setPulseIntensity(Math.min(audioLevel * 100, 100));
    } else {
      setPulseIntensity(0);
    }
  }, [isRecording, audioLevel]);

  const getIndicatorState = () => {
    if (error) return 'error';
    if (!hasPermission) return 'no-permission';
    if (isRecording) return 'recording';
    if (isListening) return 'listening';
    return 'idle';
  };

  const state = getIndicatorState();

  const getStateColors = () => {
    switch (state) {
      case 'recording':
        return {
          bg: 'bg-red-500/20',
          ring: 'ring-red-400/50',
          icon: 'text-red-400',
          pulse: 'bg-red-400/30'
        };
      case 'listening':
        return {
          bg: 'bg-green-500/20',
          ring: 'ring-green-400/50',
          icon: 'text-green-400',
          pulse: 'bg-green-400/30'
        };
      case 'error':
        return {
          bg: 'bg-red-500/20',
          ring: 'ring-red-400/50',
          icon: 'text-red-400',
          pulse: 'bg-red-400/30'
        };
      case 'no-permission':
        return {
          bg: 'bg-orange-500/20',
          ring: 'ring-orange-400/50',
          icon: 'text-orange-400',
          pulse: 'bg-orange-400/30'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          ring: 'ring-gray-400/50',
          icon: 'text-gray-400',
          pulse: 'bg-gray-400/30'
        };
    }
  };

  const colors = getStateColors();

  const getIcon = () => {
    if (error) return <AlertCircle className="w-6 h-6" />;
    if (!hasPermission) return <MicOff className="w-6 h-6" />;
    return <Mic className="w-6 h-6" />;
  };

  const getStatusText = () => {
    if (error) return `Error: ${error}`;
    if (!hasPermission) return 'Microphone access needed';
    if (isRecording) return 'Recording...';
    if (isListening) return 'Listening for voice';
    return 'Ready';
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Microphone indicator with pulse */}
      <div className="relative">
        {/* Background circle */}
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
          colors.bg,
          colors.ring,
          state === 'listening' && "ring-2",
          state === 'recording' && "ring-4"
        )}>
          <div className={cn("transition-colors duration-300", colors.icon)}>
            {getIcon()}
          </div>
        </div>

        {/* Pulse animation for recording */}
        {state === 'recording' && (
          <>
            <div
              className={cn(
                "absolute inset-0 rounded-full animate-ping",
                colors.pulse
              )}
              style={{
                animationDuration: `${Math.max(0.5, 2 - (pulseIntensity / 50))}s`,
                opacity: Math.max(0.3, pulseIntensity / 100)
              }}
            />
            <div
              className={cn(
                "absolute inset-1 rounded-full animate-pulse",
                colors.pulse
              )}
              style={{
                opacity: Math.max(0.2, pulseIntensity / 150)
              }}
            />
          </>
        )}

        {/* Listening glow */}
        {state === 'listening' && (
          <div className={cn(
            "absolute inset-0 rounded-full animate-pulse",
            colors.pulse
          )} />
        )}
      </div>

      {/* Audio level bars */}
      {(isListening || isRecording) && (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => {
            const barThreshold = (i + 1) * 20;
            const isActive = pulseIntensity >= barThreshold;
            return (
              <div
                key={i}
                className={cn(
                  "w-1 rounded-full transition-all duration-100",
                  isActive ? colors.icon : 'bg-gray-600',
                  i === 0 && "h-2",
                  i === 1 && "h-3",
                  i === 2 && "h-4",
                  i === 3 && "h-3",
                  i === 4 && "h-2"
                )}
                style={{
                  opacity: isActive ? Math.max(0.7, pulseIntensity / 100) : 0.3
                }}
              />
            );
          })}
        </div>
      )}

      {/* Status text */}
      <div className="flex flex-col">
        <span className={cn(
          "text-sm font-medium transition-colors duration-300",
          state === 'error' ? 'text-red-400' :
          state === 'no-permission' ? 'text-orange-400' :
          state === 'recording' ? 'text-red-400' :
          state === 'listening' ? 'text-green-400' :
          'text-gray-400'
        )}>
          {getStatusText()}
        </span>

        {/* Audio level indicator */}
        {isRecording && pulseIntensity > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Volume2 className="w-3 h-3 text-gray-500" />
            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-100 rounded-full",
                  colors.icon.replace('text-', 'bg-')
                )}
                style={{ width: `${Math.min(pulseIntensity, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(pulseIntensity)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicrophoneIndicator;