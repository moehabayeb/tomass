import { useEffect } from 'react';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

export const LevelUpModal = ({ level, onClose }: LevelUpModalProps) => {
  useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount - onClose callback is stable

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      style={{
        animation: 'fadeIn 0.3s ease-out'
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Level up! You reached level ${level}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Modal Content */}
      <div
        className="relative z-10 pointer-events-auto"
        style={{
          animation: 'zoomBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        <div className="relative flex flex-col items-center gap-6 px-8 py-10 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 shadow-2xl">
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  backgroundColor: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#7FFF00'][Math.floor(Math.random() * 5)],
                  animation: `confettiFall ${2 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s`,
                  opacity: 0,
                }}
              />
            ))}
          </div>

          {/* Trophy Icon */}
          <div
            className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center shadow-2xl"
            style={{
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            <span className="text-6xl">🏆</span>
          </div>

          {/* Level Up Text */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              LEVEL UP!
            </h2>
            <p className="text-6xl font-black text-yellow-300" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {level}
            </p>
            <p className="text-lg text-white/90 font-medium">
              Keep up the amazing work!
            </p>
          </div>

          {/* Sparkle Effects */}
          <div className="absolute -top-4 -right-4">
            <span className="text-4xl animate-spin-slow">✨</span>
          </div>
          <div className="absolute -bottom-4 -left-4">
            <span className="text-4xl animate-spin-slow" style={{ animationDelay: '0.5s' }}>⭐</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomBounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
