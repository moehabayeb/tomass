import React, { memo } from 'react';

interface SpeechWaveformProps {
  isListening: boolean;
}

export const SpeechWaveform = memo<SpeechWaveformProps>(({ isListening }) => {
  if (!isListening) return null;

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 sm:w-2 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
          style={{
            animation: `wave 1s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
            height: '20px'
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 20px;
          }
          50% {
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
});
