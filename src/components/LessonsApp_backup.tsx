// Backup of LessonsApp before fixing syntax error
import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface LessonsAppProps {
  onBack: () => void;
}

export default function LessonsApp({ onBack }: LessonsAppProps) {
  const [testState, setTestState] = useState(true);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        <Button onClick={onBack}>Back</Button>
        <p>Test component</p>
      </div>
    </div>
  );
}