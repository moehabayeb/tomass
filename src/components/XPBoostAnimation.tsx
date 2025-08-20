import { useXPBoostStore } from '@/hooks/useXPBoostStore';

export const XPBoostAnimation = () => {
  const { boosts } = useXPBoostStore();

  if (boosts.length === 0) return null;

  return (
    <div className="absolute top-2 right-2 pointer-events-none z-40">
      {boosts.map((boost, index) => (
        <div
          key={boost.id}
          className="absolute top-0 right-0 text-white font-bold text-sm xp-boost-slide-up"
          style={{
            transform: `translateY(${index * 32}px)`,
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div 
            className="bg-[hsl(var(--xp-green-bg))] backdrop-blur-sm rounded-full px-3 py-1 border border-[hsl(var(--xp-green))]/30 shadow-lg"
            style={{
              boxShadow: `0 0 20px var(--xp-green-glow), 0 4px 12px rgba(0, 0, 0, 0.15)`
            }}
          >
            +{boost.points} XP
          </div>
          {boost.message && (
            <div className="text-xs text-white/80 mt-1 text-center truncate max-w-[100px]">
              {boost.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};