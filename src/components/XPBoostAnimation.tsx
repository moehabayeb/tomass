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
    <div className="fixed inset-0 pointer-events-none z-50">
      {boosts.map((boost, index) => (
        <div
          key={boost.id}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: `xpBoost 2s ease-out forwards`,
            animationDelay: `${index * 100}ms`
          }}
        >
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            +{boost.points} XP
            {boost.message && (
              <div className="text-sm opacity-90">{boost.message}</div>
            )}
          </div>
        </div>
      ))}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes xpBoost {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.5) translateY(20px);
            }
            20% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.2) translateY(0px);
            }
            80% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1) translateY(-40px);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8) translateY(-80px);
            }
          }
        `
      }} />
    </div>
  );
};