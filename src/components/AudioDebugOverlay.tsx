import { useState, useEffect } from 'react';
import { micOrchestrator } from '@/voice/micOrchestrator';

interface AudioDebugOverlayProps {
  isVisible: boolean;
}

export const AudioDebugOverlay = ({ isVisible }: AudioDebugOverlayProps) => {
  const [debugInfo, setDebugInfo] = useState({
    micState: 'unknown',
    rmsLevel: -100,
    isVoiceActive: false,
    permissionState: 'unknown',
    deviceCount: 0,
    errors: [] as string[]
  });

  useEffect(() => {
    if (!isVisible) return;

    const updateInterval = setInterval(() => {
      const info = micOrchestrator.getDebugInfo();
      setDebugInfo({
        micState: info.state,
        rmsLevel: info.rmsLevel,
        isVoiceActive: info.isVoiceActive,
        permissionState: info.permissionState,
        deviceCount: info.deviceCount,
        errors: info.recentErrors
      });
    }, 100);

    return () => clearInterval(updateInterval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 min-w-[280px]">
      <h3 className="text-green-400 font-bold mb-2">🎤 Audio Debug</h3>

      <div className="space-y-1">
        <div>State: <span className="text-cyan-400">{debugInfo.micState}</span></div>

        <div>RMS: <span className="text-yellow-400">{debugInfo.rmsLevel.toFixed(1)} dB</span></div>

        <div className="flex items-center gap-2">
          Voice:
          <div className={`w-3 h-3 rounded-full ${debugInfo.isVoiceActive ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span className="text-orange-400">{debugInfo.isVoiceActive ? 'ACTIVE' : 'silent'}</span>
        </div>

        <div>Permission: <span className="text-purple-400">{debugInfo.permissionState}</span></div>

        <div>Devices: <span className="text-blue-400">{debugInfo.deviceCount}</span></div>

        {/* RMS Level Meter */}
        <div className="mt-2">
          <div className="text-xs mb-1">Audio Level:</div>
          <div className="w-full h-2 bg-gray-800 rounded">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded transition-all duration-75"
              style={{
                width: `${Math.max(0, Math.min(100, (debugInfo.rmsLevel + 60) * 1.67))}%`
              }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {debugInfo.rmsLevel > -45 ? 'Speaking' : 'Silent'}
          </div>
        </div>

        {/* Recent Errors */}
        {debugInfo.errors.length > 0 && (
          <div className="mt-2 border-t border-gray-700 pt-2">
            <div className="text-red-400 text-xs mb-1">Recent Errors:</div>
            {debugInfo.errors.slice(-3).map((error, i) => (
              <div key={i} className="text-red-300 text-xs truncate">
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};