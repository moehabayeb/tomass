import React from 'react';
import { Button } from '@/components/ui/button';

interface HangmanKeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

export const HangmanKeyboard: React.FC<HangmanKeyboardProps> = ({
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
    <div className="w-full max-w-3xl mx-auto space-y-2 px-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1 sm:gap-2"
          style={{
            paddingLeft: rowIndex === 1 ? '1.5rem' : rowIndex === 2 ? '3rem' : '0'
          }}
        >
          {row.map((letter) => {
            const state = getLetterState(letter);
            const isDisabled = disabled || state !== 'default';

            return (
              <Button
                key={letter}
                onClick={() => !isDisabled && onLetterClick(letter)}
                disabled={isDisabled}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                  p-0
                  text-sm sm:text-base md:text-lg
                  font-bold
                  rounded-lg
                  border-2
                  ${getLetterStyle(state)}
                  ${isDisabled ? '' : 'active:scale-95'}
                `}
                style={{
                  minWidth: '2rem',
                  touchAction: 'manipulation'
                }}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      ))}

      <div className="text-center mt-4">
        <p className="text-white/60 text-xs sm:text-sm">
          💡 Tap letters or speak them out loud
        </p>
      </div>
    </div>
  );
};
