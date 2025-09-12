import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

interface CelebrationOverlayProps {
  title: string;
  subtitle: string;
}

export function CelebrationOverlay({ title, subtitle }: CelebrationOverlayProps) {
  const [width, height] = useWindowSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
      <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-scale-in">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}