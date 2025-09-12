// Auto-Hide Voice Controls Component
// Floating voice command controls with auto-hide functionality

import { useState, useEffect, useRef } from 'react';
import { 
  VoiceControlsProps, 
  VoiceCommandType,
  SpeechState 
} from '../../types/voiceCommands';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';

interface VoiceControlButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
}

function VoiceControlButton({ 
  icon, 
  label, 
  onClick, 
  disabled = false, 
  active = false,
  className = '' 
}: VoiceControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        voice-control-btn
        ${active ? 'active' : ''}
        ${disabled ? 'disabled' : ''}
        ${className}
      `}
      title={label}
      aria-label={label}
    >
      <span className="voice-control-icon">{icon}</span>
      <span className="voice-control-label">{label}</span>
    </button>
  );
}

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

function VolumeSlider({ value, onChange, className = '' }: VolumeSliderProps) {
  return (
    <div className={`voice-volume-slider ${className}`}>
      <span className="volume-icon">🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="volume-range"
        aria-label="Volume control"
      />
      <span className="volume-value">{Math.round(value * 100)}%</span>
    </div>
  );
}

interface SpeedSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

function SpeedSlider({ value, onChange, className = '' }: SpeedSliderProps) {
  return (
    <div className={`voice-speed-slider ${className}`}>
      <span className="speed-icon">⚡</span>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="speed-range"
        aria-label="Speech rate control"
      />
      <span className="speed-value">{value.toFixed(1)}x</span>
    </div>
  );
}

export function VoiceControls({
  visible = true,
  position = 'bottom-right',
  autoHide = true,
  autoHideDelay = 5000,
  showHelp = true,
  compact = false,
  className = '',
  onVisibilityChange
}: VoiceControlsProps) {
  const {
    isListening,
    isSupported,
    state,
    speechState,
    controlsVisible,
    startListening,
    stopListening,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    repeatSpeech,
    setVolume,
    setRate,
    showControls,
    hideControls,
    executeCommand,
    getAvailableCommands
  } = useVoiceCommands({
    enabled: visible && isSupported,
    autoStart: false,
    config: {
      autoHideDelay: autoHideDelay
    }
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Handle visibility changes
  useEffect(() => {
    onVisibilityChange?.(controlsVisible);
  }, [controlsVisible, onVisibilityChange]);

  // Keyboard shortcuts info
  const keyboardShortcuts = [
    { key: 'Alt + V', action: 'Toggle voice listening' },
    { key: 'Alt + R', action: 'Repeat current content' },
    { key: 'Alt + P', action: 'Pause/Resume speech' },
    { key: 'Alt + S', action: 'Stop speech' }
  ];

  if (!visible || !isSupported) {
    return null;
  }

  const handleMicToggle = async () => {
    if (isListening) {
      stopListening();
    } else {
      await startListening();
    }
  };

  const handleSpeechControl = (action: 'pause' | 'resume' | 'stop' | 'repeat') => {
    switch (action) {
      case 'pause':
        pauseSpeech();
        break;
      case 'resume':
        resumeSpeech();
        break;
      case 'stop':
        stopSpeech();
        break;
      case 'repeat':
        repeatSpeech();
        break;
    }
  };

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
    showControls(); // Reset auto-hide timer
  };

  const handleRateChange = (rate: number) => {
    setRate(rate);
    showControls(); // Reset auto-hide timer
  };

  const getPositionClasses = () => {
    const positions = {
      'top-left': 'voice-controls-top-left',
      'top-right': 'voice-controls-top-right',
      'bottom-left': 'voice-controls-bottom-left',
      'bottom-right': 'voice-controls-bottom-right',
      'center': 'voice-controls-center'
    };
    return positions[position] || positions['bottom-right'];
  };

  const getStateIcon = () => {
    if (state === 'listening') return '🎤';
    if (state === 'processing') return '🔄';
    if (state === 'executing') return '⚡';
    if (state === 'error') return '❌';
    return '🎙️';
  };

  const getStateLabel = () => {
    const labels = {
      idle: 'Start Listening',
      listening: 'Listening...',
      processing: 'Processing...',
      executing: 'Executing...',
      error: 'Error',
      unsupported: 'Not Supported'
    };
    return labels[state] || 'Voice Commands';
  };

  return (
    <div 
      ref={controlsRef}
      className={`
        voice-controls
        ${getPositionClasses()}
        ${controlsVisible ? 'visible' : 'hidden'}
        ${compact ? 'compact' : 'full'}
        ${showAdvanced ? 'advanced' : 'basic'}
        ${className}
      `}
      onMouseEnter={showControls}
      onMouseLeave={() => autoHide && hideControls()}
    >
      {/* Main Control Panel */}
      <div className="voice-controls-main">
        {/* Microphone Toggle */}
        <VoiceControlButton
          icon={getStateIcon()}
          label={getStateLabel()}
          onClick={handleMicToggle}
          active={isListening}
          disabled={state === 'processing' || state === 'executing'}
          className="mic-toggle"
        />

        {/* Speech Controls */}
        {speechState.isPlaying && (
          <div className="speech-controls">
            {speechState.canPause && !speechState.isPaused && (
              <VoiceControlButton
                icon="⏸️"
                label="Pause"
                onClick={() => handleSpeechControl('pause')}
              />
            )}
            
            {speechState.canResume && speechState.isPaused && (
              <VoiceControlButton
                icon="▶️"
                label="Resume"
                onClick={() => handleSpeechControl('resume')}
              />
            )}

            <VoiceControlButton
              icon="⏹️"
              label="Stop"
              onClick={() => handleSpeechControl('stop')}
              disabled={!speechState.canStop}
            />

            <VoiceControlButton
              icon="🔄"
              label="Repeat"
              onClick={() => handleSpeechControl('repeat')}
            />
          </div>
        )}

        {/* Quick Actions */}
        {!compact && (
          <div className="quick-actions">
            <VoiceControlButton
              icon="🔄"
              label="Repeat"
              onClick={() => executeCommand('repeat')}
              className="quick-repeat"
            />
            
            <VoiceControlButton
              icon="⏭️"
              label="Next"
              onClick={() => executeCommand('next')}
              className="quick-next"
            />
          </div>
        )}

        {/* Advanced Toggle */}
        <VoiceControlButton
          icon={showAdvanced ? '▼' : '▲'}
          label={showAdvanced ? 'Less' : 'More'}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="advanced-toggle"
        />

        {/* Help Button */}
        {showHelp && (
          <VoiceControlButton
            icon="❓"
            label="Help"
            onClick={() => setShowHelpPanel(!showHelpPanel)}
            active={showHelpPanel}
            className="help-toggle"
          />
        )}
      </div>

      {/* Advanced Controls */}
      {showAdvanced && (
        <div className="voice-controls-advanced">
          <VolumeSlider
            value={speechState.volume}
            onChange={handleVolumeChange}
            className="volume-control"
          />
          
          <SpeedSlider
            value={speechState.rate}
            onChange={handleRateChange}
            className="speed-control"
          />

          <div className="advanced-actions">
            <VoiceControlButton
              icon="🔊"
              label="Louder"
              onClick={() => executeCommand('volume_up')}
              className="volume-up"
            />
            
            <VoiceControlButton
              icon="🔉"
              label="Quieter"
              onClick={() => executeCommand('volume_down')}
              className="volume-down"
            />
            
            <VoiceControlButton
              icon="🐌"
              label="Slower"
              onClick={() => executeCommand('slower')}
              className="speed-down"
            />
            
            <VoiceControlButton
              icon="🏃"
              label="Faster"
              onClick={() => executeCommand('faster')}
              className="speed-up"
            />
          </div>
        </div>
      )}

      {/* Help Panel */}
      {showHelpPanel && (
        <div className="voice-help-panel">
          <h4>Voice Commands</h4>
          <div className="command-list">
            {getAvailableCommands().map((command, index) => (
              <div key={index} className="command-item">
                <code>"{command}"</code>
              </div>
            ))}
          </div>
          
          <h4>Keyboard Shortcuts</h4>
          <div className="shortcut-list">
            {keyboardShortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut-item">
                <kbd>{shortcut.key}</kbd>
                <span>{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="voice-status">
        <div className={`status-dot ${state}`}></div>
        {speechState.isPlaying && (
          <div className="speech-progress">
            <div 
              className="progress-bar"
              style={{
                width: `${(speechState.position / speechState.totalDuration) * 100}%`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// CSS Styles (to be added to global stylesheet or CSS module)
const voiceControlsStyles = `
.voice-controls {
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  padding: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  max-width: 300px;
}

.voice-controls.hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
}

.voice-controls.visible {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0);
}

.voice-controls-top-left {
  top: 20px;
  left: 20px;
}

.voice-controls-top-right {
  top: 20px;
  right: 20px;
}

.voice-controls-bottom-left {
  bottom: 20px;
  left: 20px;
}

.voice-controls-bottom-right {
  bottom: 20px;
  right: 20px;
}

.voice-controls-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.voice-controls.compact {
  padding: 4px;
  max-width: 200px;
}

.voice-controls-main {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.voice-control-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  justify-content: center;
}

.voice-control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.voice-control-btn.active {
  background: rgba(74, 144, 226, 0.8);
  border-color: rgba(74, 144, 226, 1);
}

.voice-control-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.voice-control-icon {
  font-size: 14px;
}

.voice-control-label {
  display: none;
}

.voice-controls:not(.compact) .voice-control-label {
  display: block;
}

.speech-controls,
.quick-actions {
  display: flex;
  gap: 4px;
  margin-left: 4px;
}

.voice-controls-advanced {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.voice-volume-slider,
.voice-speed-slider {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  color: white;
  font-size: 12px;
}

.volume-range,
.speed-range {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.volume-range::-webkit-slider-thumb,
.speed-range::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4a90e2;
  cursor: pointer;
}

.advanced-actions {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.voice-help-panel {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  color: white;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.voice-help-panel h4 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #4a90e2;
}

.command-list,
.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.command-item code {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.shortcut-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.shortcut-item kbd {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 10px;
  min-width: 60px;
}

.voice-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: gray;
}

.status-dot.idle { background: #666; }
.status-dot.listening { background: #4a90e2; animation: pulse 1s infinite; }
.status-dot.processing { background: #f39c12; animation: spin 1s infinite; }
.status-dot.executing { background: #27ae60; }
.status-dot.error { background: #e74c3c; }

.speech-progress {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #4a90e2;
  transition: width 0.1s linear;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .voice-controls {
    max-width: 250px;
    font-size: 11px;
  }
  
  .voice-control-btn {
    padding: 4px 6px;
    min-width: 36px;
  }
}
`;

export default VoiceControls;