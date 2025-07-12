interface StreakCounterProps {
  currentStreak: number;
  message: string;
  bestStreak: number;
}

export const StreakCounter = ({ currentStreak, message, bestStreak }: StreakCounterProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-soft">
      <div className="text-center">
        <div className="text-2xl font-bold mb-1" style={{ color: 'hsl(var(--text-dark))' }}>
          {message}
        </div>
        {bestStreak > currentStreak && (
          <div className="text-sm opacity-75" style={{ color: 'hsl(var(--text-dark))' }}>
            Best: {bestStreak} days
          </div>
        )}
      </div>
    </div>
  );
};