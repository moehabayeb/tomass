interface StreakCounterProps {
  currentStreak: number;
  message: string;
  bestStreak: number;
}

export const StreakCounter = ({ currentStreak, message, bestStreak }: StreakCounterProps) => {
  return (
    <div 
      className="rounded-2xl p-5 mb-6 transition-all duration-300 hover:scale-105"
      style={{
        background: 'var(--gradient-streak)',
        boxShadow: 'var(--shadow-medium)'
      }}
    >
      <div className="text-center">
        <div className="text-xl font-bold mb-1" style={{ color: 'hsl(var(--text-dark))' }}>
          {message}
        </div>
        {bestStreak > currentStreak && (
          <div className="text-sm opacity-75 font-medium" style={{ color: 'hsl(var(--text-dark))' }}>
            Best: {bestStreak} days
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakCounter;