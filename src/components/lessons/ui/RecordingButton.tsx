import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RunStatus } from '../../../hooks/lessons/useSpeechRecognition';

interface RecordingButtonProps {
  speakStatus: RunStatus;
  onStartRecording: () => void;
  speakingIndex: number;
  disabled?: boolean;
}

export function RecordingButton({ 
  speakStatus, 
  onStartRecording, 
  speakingIndex,
  disabled = false 
}: RecordingButtonProps) {
  return (
    <div className="mb-4">
      <Button
        id="micButton"
        key={`mic-${speakingIndex}`}
        onClick={onStartRecording}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={speakStatus === 'recording' ? 'Stop recording' : 'Start recording'}
        style={{
          pointerEvents: 'auto',
          zIndex: 5,
          touchAction: 'manipulation'
        }}
        size="lg"
        className={`mic-button rounded-full w-20 h-20 ${
          speakStatus === 'recording'
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-white/20 hover:bg-white/30'
        }`}
      >
        {speakStatus === 'recording' ? (
          <MicOff className="h-8 w-8" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>
      
      <div style={{ pointerEvents: 'none' }}>
        <p className="text-white/70 text-sm mt-4">
          {speakStatus === 'recording' ? 'Listening...' : 'Tap to speak the sentence'}
        </p>
      </div>
    </div>
  );
}