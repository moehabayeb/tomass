import React, { memo } from 'react';
import { Button } from '@/components/ui/button';

interface HangmanKeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

export const HangmanKeyboard = memo<HangmanKeyboardProps>(({
  guessedLetters,
  correctLetters,
  onLetterClick,
  disabled
}) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const getLetterState = (letter: string) => {
    const lowerLetter = letter.toLowerCase();
    if (!guessedLetters.has(lowerLetter)) {
      return 'default';
    }
    if (correctLetters.has(lowerLetter)) {
      return 'correct';
    }
    return 'wrong';
  };

  const getLetterStyle = (state: string) => {
    switch (state) {
      case 'correct':
        return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-400 shadow-lg shadow-green-500/50 hover:from-green-600 hover:to-emerald-700';
      case 'wrong':
        return 'bg-gradient-to-br from-red-500/30 to-gray-600/30 text-gray-400 border-gray-600 cursor-not-allowed opacity-50';
      default:
        return 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 text-white border-white/30 hover:border-white/50 hover:scale-105 shadow-md hover:shadow-xl transition-all duration-200';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex justify-center gap-1 sm:gap-1.5 ${
            rowIndex === 1 ? 'sm:pl-4' : rowIndex === 2 ? 'sm:pl-8' : ''
          }`}
        >
          {row.map((letter) => {
            const state = getLetterState(letter);
            const isDisabled = disabled || state !== 'default';

            return (
              <Button
                key={letter}
                onClick={() => !isDisabled && onLetterClick(letter)}
                disabled={isDisabled}
                aria-label={
                  state === 'correct'
                    ? `Letter ${letter}, correct guess`
                    : state === 'wrong'
                    ? `Letter ${letter}, incorrect guess`
                    : `Guess letter ${letter}`
                }
                aria-pressed={state !== 'default'}
                className={`
                  hangman-key
                  w-7 h-7 sm:w-11 sm:h-11
                  p-0
                  text-sm sm:text-lg
                  font-bold
                  rounded-lg
                  border-2
                  ${getLetterStyle(state)}
                  ${isDisabled ? '' : 'active:scale-90 transition-transform duration-75'}
                `}
                style={{
                  minWidth: '1.75rem',
                  minHeight: '1.75rem',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      ))}

      <div className="text-center mt-3">
        <p className="text-white/60 text-xs">
          💡 Tap letters to guess
        </p>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom equality check for Sets to prevent unnecessary rerenders
  const setsEqual = (a: Set<string>, b: Set<string>) => {
    if (a.size !== b.size) return false;
    for (const item of a) if (!b.has(item)) return false;
    return true;
  };

  return (
    prevProps.disabled === nextProps.disabled &&
    prevProps.onLetterClick === nextProps.onLetterClick &&
    setsEqual(prevProps.guessedLetters, nextProps.guessedLetters) &&
    setsEqual(prevProps.correctLetters, nextProps.correctLetters)
  );
});
