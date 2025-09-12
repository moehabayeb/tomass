// React Hook for Voice Commands Integration
// Provides easy-to-use voice command functionality for React components

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  VoiceCommand,
  VoiceCommandType,
  VoiceRecognitionState,
  SpeechState,
  UseVoiceCommandsReturn,
  VoiceCommandConfig,
  DEFAULT_VOICE_COMMAND_CONFIG
} from '../types/voiceCommands';
import { getVoiceCommandService } from '../services/voiceCommandService';
import { enhancedNarration } from '../utils/enhancedNarration';

interface UseVoiceCommandsOptions {
  enabled?: boolean;
  autoStart?: boolean;
  config?: Partial<VoiceCommandConfig>;
  onCommandDetected?: (command: VoiceCommand) => void;
  onCommandExecuted?: (command: VoiceCommand, result: any) => void;
  onCommandFailed?: (command: VoiceCommand, error: Error) => void;
  onSpeechStateChange?: (state: SpeechState) => void;
  lessonPhase?: string;
  moduleId?: number;
  levelId?: string;
}

export function useVoiceCommands(options: UseVoiceCommandsOptions = {}): UseVoiceCommandsReturn {
  const {
    enabled = true,
    autoStart = false,
    config = {},
    onCommandDetected,
    onCommandExecuted,
    onCommandFailed,
    onSpeechStateChange,
    lessonPhase = 'unknown',
    moduleId,
    levelId
  } = options;

  // State
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognitionState, setRecognitionState] = useState<VoiceRecognitionState>('idle');
  const [speechState, setSpeechState] = useState<SpeechState>({
    isPlaying: false,
    isPaused: false,
    currentContent: '',
    position: 0,
    totalDuration: 0,
    volume: 1,
    rate: 1,
    canPause: false,
    canResume: false,
    canStop: false
  });
  const [controlsVisible, setControlsVisible] = useState(false);
  const [lastCommand, setLastCommand] = useState<VoiceCommand | undefined>();

  // Refs
  const serviceRef = useRef(getVoiceCommandService());
  const autoHideTimeoutRef = useRef<number | null>(null);
  const narrationRef = useRef(enhancedNarration);
  const isInitializedRef = useRef(false);

  // Initialize service
  useEffect(() => {
    const service = serviceRef.current;
    const mergedConfig = { ...DEFAULT_VOICE_COMMAND_CONFIG, ...config };

    const initializeService = async () => {
      if (enabled && !isInitializedRef.current) {
        const initialized = await service.initialize(mergedConfig);
        setIsSupported(initialized);
        
        if (initialized) {
          // Set up callbacks
          service.setCallbacks({
            onCommandDetected: (command) => {
              setLastCommand(command);
              onCommandDetected?.(command);
            },
            onCommandExecuted: (command, result) => {
              onCommandExecuted?.(command, result);
            },
            onCommandFailed: (command, error) => {
              onCommandFailed?.(command, error);
            },
            onStateChange: (state) => {
              setRecognitionState(state);
              setIsListening(state === 'listening');
            },
            onSpeechStateChange: (state) => {
              setSpeechState(state);
              onSpeechStateChange?.(state);
            }
          });

          // Set up narration callbacks
          narrationRef.current.setCallbacks({
            onStateChange: (state) => {
              setSpeechState(state);
              onSpeechStateChange?.(state);
            }
          });

          isInitializedRef.current = true;

          // Auto-start if requested
          if (autoStart) {
            await service.start();
          }
        }
      }
    };

    initializeService();

    // Cleanup on unmount
    return () => {
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
      service.stop();
    };
  }, [enabled, autoStart, config, onCommandDetected, onCommandExecuted, onCommandFailed, onSpeechStateChange]);

  // Auto-hide controls logic
  const scheduleAutoHide = useCallback(() => {
    if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
    }

    autoHideTimeoutRef.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, config.autoHideDelay || DEFAULT_VOICE_COMMAND_CONFIG.autoHideDelay);
  }, [config.autoHideDelay]);

  // Show controls and schedule auto-hide
  const showControls = useCallback(() => {
    setControlsVisible(true);
    scheduleAutoHide();
  }, [scheduleAutoHide]);

  // Hide controls immediately
  const hideControls = useCallback(() => {
    setControlsVisible(false);
    if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
      autoHideTimeoutRef.current = null;
    }
  }, []);

  // Actions
  const startListening = useCallback(async (): Promise<void> => {
    if (isSupported && recognitionState === 'idle') {
      await serviceRef.current.start();
      showControls();
    }
  }, [isSupported, recognitionState, showControls]);

  const stopListening = useCallback((): void => {
    serviceRef.current.stop();
  }, []);

  const executeCommand = useCallback(async (type: VoiceCommandType): Promise<void> => {
    const command: VoiceCommand = {
      type,
      confidence: 1.0,
      rawText: type,
      timestamp: Date.now(),
      context: `${lessonPhase}:${levelId}:${moduleId}`,
      variations: [type]
    };

    await serviceRef.current.executeCommand(command);
    showControls();
  }, [lessonPhase, levelId, moduleId, showControls]);

  // Speech controls
  const pauseSpeech = useCallback((): void => {
    narrationRef.current.pause();
    showControls();
  }, [showControls]);

  const resumeSpeech = useCallback((): void => {
    narrationRef.current.resume();
    showControls();
  }, [showControls]);

  const stopSpeech = useCallback((): void => {
    narrationRef.current.cancel();
    showControls();
  }, [showControls]);

  const repeatSpeech = useCallback((): void => {
    narrationRef.current.repeat();
    showControls();
  }, [showControls]);

  const setVolume = useCallback((volume: number): void => {
    narrationRef.current.setVolume(volume);
    showControls();
  }, [showControls]);

  const setRate = useCallback((rate: number): void => {
    narrationRef.current.setRate(rate);
    showControls();
  }, [showControls]);

  // Utilities
  const getAvailableCommands = useCallback((): string[] => {
    return serviceRef.current.getAvailableCommands().map(pattern => pattern.examples[0]);
  }, []);

  const isCommandAvailable = useCallback((type: VoiceCommandType): boolean => {
    const patterns = serviceRef.current.getAvailableCommands();
    return patterns.some(pattern => pattern.type === type);
  }, []);

  // Debug
  const getDebugInfo = useCallback(() => {
    return {
      service: serviceRef.current.getDebugInfo(),
      narration: narrationRef.current.getDebugInfo(),
      hookState: {
        isListening,
        isSupported,
        recognitionState,
        speechState,
        controlsVisible,
        lastCommand,
        isInitialized: isInitializedRef.current
      }
    };
  }, [isListening, isSupported, recognitionState, speechState, controlsVisible, lastCommand]);

  // Handle mouse movement to show controls
  useEffect(() => {
    const handleMouseMove = () => {
      if (isListening || speechState.isPlaying) {
        showControls();
      }
    };

    const handleKeyboard = (event: KeyboardEvent) => {
      // Handle keyboard shortcuts for voice commands
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case 'r':
            event.preventDefault();
            repeatSpeech();
            break;
          case 'p':
            event.preventDefault();
            if (speechState.isPaused) {
              resumeSpeech();
            } else if (speechState.isPlaying) {
              pauseSpeech();
            }
            break;
          case 's':
            event.preventDefault();
            stopSpeech();
            break;
          case 'v':
            event.preventDefault();
            if (isListening) {
              stopListening();
            } else {
              startListening();
            }
            break;
        }
      }
    };

    if (enabled) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('keydown', handleKeyboard);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('keydown', handleKeyboard);
      };
    }
  }, [enabled, isListening, speechState, showControls, repeatSpeech, pauseSpeech, resumeSpeech, stopSpeech, startListening, stopListening]);

  // Show controls when commands are detected
  useEffect(() => {
    if (lastCommand) {
      showControls();
    }
  }, [lastCommand, showControls]);

  return {
    // State
    isListening,
    isSupported,
    state: recognitionState,
    speechState,
    controlsVisible,
    lastCommand,

    // Actions
    startListening,
    stopListening,
    executeCommand,
    showControls,
    hideControls,

    // Speech controls
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    repeatSpeech,
    setVolume,
    setRate,

    // Utilities
    getAvailableCommands,
    isCommandAvailable,

    // Debug
    getDebugInfo
  };
}

// Specialized hook for lesson-specific voice commands
export function useLessonVoiceCommands(
  moduleId: number,
  levelId: string,
  phase: string,
  options: Omit<UseVoiceCommandsOptions, 'moduleId' | 'levelId' | 'lessonPhase'> = {}
) {
  const [lessonCallbacks, setLessonCallbacks] = useState<{
    onNext?: () => void;
    onPrevious?: () => void;
    onSkip?: () => void;
    onRepeat?: () => void;
  }>({});

  const voiceCommands = useVoiceCommands({
    ...options,
    moduleId,
    levelId,
    lessonPhase: phase,
    onCommandExecuted: (command, result) => {
      // Handle lesson-specific commands
      switch (command.type) {
        case 'next':
          lessonCallbacks.onNext?.();
          break;
        case 'previous':
          lessonCallbacks.onPrevious?.();
          break;
        case 'skip':
          lessonCallbacks.onSkip?.();
          break;
        case 'repeat':
          lessonCallbacks.onRepeat?.();
          break;
      }
      
      options.onCommandExecuted?.(command, result);
    }
  });

  const setLessonHandlers = useCallback((handlers: {
    onNext?: () => void;
    onPrevious?: () => void;
    onSkip?: () => void;
    onRepeat?: () => void;
  }) => {
    setLessonCallbacks(handlers);
  }, []);

  return {
    ...voiceCommands,
    setLessonHandlers
  };
}

// Hook for controlling voice commands from lesson phases
export function useVoiceCommandsControl() {
  const serviceRef = useRef(getVoiceCommandService());
  const narrationRef = useRef(enhancedNarration);

  const announcePhaseChange = useCallback((phase: string, content?: string) => {
    const announcements = {
      'intro': 'Lesson introduction. Say "continue" when ready.',
      'listening': 'Listening practice. Say "repeat" to hear again.',
      'speaking': 'Speaking practice. Say "repeat" for the question.',
      'complete': 'Lesson completed! Say "next" for the next lesson.'
    };

    const announcement = announcements[phase as keyof typeof announcements] || 
                        `${phase} phase. ${content || ''}`;
    
    narrationRef.current.speak(announcement, { queue: true });
  }, []);

  const enableForPhase = useCallback(async (phase: string) => {
    const service = serviceRef.current;
    
    // Configure service for specific phase
    service.updateConfig({
      enabled: true,
      continuous: true,
      debugMode: false
    });

    await service.start();
  }, []);

  const disableForPhase = useCallback(() => {
    serviceRef.current.stop();
  }, []);

  return {
    announcePhaseChange,
    enableForPhase,
    disableForPhase,
    service: serviceRef.current,
    narration: narrationRef.current
  };
}