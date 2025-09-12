import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: string;
  type: 'success' | 'error' | 'info';
  className?: string;
}

export function FeedbackDisplay({ feedback, type, className = '' }: FeedbackDisplayProps) {
  if (!feedback) return null;

  const bgColor = type === 'success' ? 'bg-green-500/20' : 
                  type === 'error' ? 'bg-red-500/20' : 
                  'bg-blue-500/20';
  
  const textColor = type === 'success' ? 'text-green-400' : 
                    type === 'error' ? 'text-red-400' : 
                    'text-blue-400';

  const icon = type === 'success' ? <CheckCircle className="h-4 w-4" /> :
               type === 'error' ? <AlertCircle className="h-4 w-4" /> : 
               null;

  return (
    <div className={`p-3 rounded-lg ${bgColor} ${textColor} ${className}`}>
      <div className="flex items-center justify-center space-x-2">
        {icon}
        <span className="text-sm">{feedback}</span>
      </div>
    </div>
  );
}