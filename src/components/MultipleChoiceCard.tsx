// src/components/MultipleChoiceCard.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";

interface MultipleChoiceCardProps {
  cloze: string;
  options: string[];
  correct: string;
  onCorrect: () => void;
  questionIndex?: number;
}

export default function MultipleChoiceCard({ 
  cloze, 
  options, 
  correct, 
  onCorrect,
  questionIndex = 0 
}: MultipleChoiceCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [displayOptions, setDisplayOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // CRITICAL FIX 1: Stable options with deterministic ordering
  useEffect(() => {
    const sortedOptions = [...options].sort((a, b) => {
      const order = ['am', 'is', 'are', 'was', 'were', 'have', 'has', 'do', 'does', 'did'];
      const aIdx = order.indexOf(a.toLowerCase());
      const bIdx = order.indexOf(b.toLowerCase());
      
      if (aIdx !== -1 && bIdx !== -1) {
        return aIdx - bIdx;
      }
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      
      return a.localeCompare(b);
    });
    
    setDisplayOptions(sortedOptions);
  }, [[...options].sort().join(',')]);

  // CRITICAL FIX 2: Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsLocked(false);
    
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.disabled = false;
      });
    }
  }, [questionIndex, cloze, correct]);

  // CRITICAL FIX 3: Robust click handler with proper flow control
  const handleOptionClick = useCallback((option: string) => {
    if (isLocked) return;
    
    console.log('Option clicked:', option, 'Correct:', correct);
    
    setSelectedOption(option);
    setShowFeedback(true);
    
    if (option === correct) {
      setIsCorrect(true);
      setIsLocked(true);
      
      setTimeout(() => {
        console.log('Correct answer! Moving to speaking phase...');
        onCorrect();
      }, 1000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
      }, 1500);
    }
  }, [correct, onCorrect, isLocked]);

  // CRITICAL FIX 4: Force button interactivity
  useEffect(() => {
    const fixButtons = () => {
      if (containerRef.current) {
        const buttons = containerRef.current.querySelectorAll('button');
        buttons.forEach((btn, index) => {
          const htmlBtn = btn as HTMLButtonElement;
          htmlBtn.style.cssText = `
            position: relative !important;
            z-index: ${100 + index} !important;
            pointer-events: ${isLocked ? 'none' : 'auto'} !important;
            cursor: ${isLocked ? 'default' : 'pointer'} !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
          `;
        });
      }
    };

    fixButtons();
    const timer = setTimeout(fixButtons, 100);
    
    return () => clearTimeout(timer);
  }, [isLocked, displayOptions]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
      style={{ position: 'relative', zIndex: 50 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white/80 mb-2">
          Step 1: Choose the correct word
        </h3>
        <p className="text-2xl font-semibold text-white">
          {cloze.charAt(0).toUpperCase() + cloze.slice(1)}
        </p>
      </div>

      {/* Options Grid */}
      <div className="space-y-3" style={{ minHeight: '200px' }}>
        {displayOptions.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C
          const isSelected = selectedOption === option;
          const isCorrectOption = option === correct;
          const showCorrectStyle = showFeedback && isSelected && isCorrect;
          const showWrongStyle = showFeedback && isSelected && !isCorrect;
          
          return (
            <button
              key={`${cloze}-${option}-${index}`}
              onClick={() => handleOptionClick(option)}
              disabled={isLocked}
              className={`
                w-full flex items-center gap-4 p-4 rounded-xl
                border-2 transition-all duration-300 transform
                ${showCorrectStyle 
                  ? 'bg-green-500/20 border-green-400 scale-[1.02]' 
                  : showWrongStyle 
                  ? 'bg-red-500/20 border-red-400 animate-shake' 
                  : isSelected
                  ? 'bg-white/10 border-white/30'
                  : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]'
                }
                ${isLocked ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
              `}
              style={{
                position: 'relative',
                zIndex: 100 + index,
                pointerEvents: isLocked ? 'none' : 'auto',
              }}
            >
              <span className={`
                flex items-center justify-center w-10 h-10 rounded-full
                font-bold text-lg
                ${showCorrectStyle 
                  ? 'bg-green-400 text-green-900' 
                  : showWrongStyle 
                  ? 'bg-red-400 text-red-900' 
                  : 'bg-white/20 text-white'
                }
              `}>
                {letter}
              </span>
              <span className="text-lg font-medium text-white flex-1 text-left">
                {option}
              </span>
              {showCorrectStyle && (
                <span className="text-green-400">✓</span>
              )}
              {showWrongStyle && (
                <span className="text-red-400">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      <div className="mt-6 h-8">
        {showFeedback && (
          <p className={`
            text-center font-medium animate-fade-in
            ${isCorrect ? 'text-green-400' : 'text-red-400'}
          `}>
            {isCorrect 
              ? '✨ Excellent! Now speak the complete sentence.' 
              : '❌ Not quite. Try again!'}
          </p>
        )}
      </div>
    </div>
  );
}