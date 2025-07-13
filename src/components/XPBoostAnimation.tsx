import { useEffect, useState } from 'react';

interface XPBoost {
  id: string;
  points: number;
  message: string;
  timestamp: number;
}

interface XPBoostAnimationProps {
  boosts: XPBoost[];
}

export const XPBoostAnimation = ({ boosts }: XPBoostAnimationProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {boosts.map((boost, index) => (
        <div
          key={boost.id}
          className="absolute top-20 right-8 text-green-400 font-bold text-lg xp-boost-active xp-boost-bounce"
          style={{
            animationDelay: `${index * 100}ms`,
            textShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
            transform: `translateY(-${index * 30}px)`
          }}
        >
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-green-500/30">
            +{boost.points} XP!
          </div>
          {boost.message && (
            <div className="text-xs text-white/80 mt-1 text-center">
              {boost.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};