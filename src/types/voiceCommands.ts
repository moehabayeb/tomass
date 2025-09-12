// Voice Command System Types
// Comprehensive type definitions for voice control functionality

export type VoiceCommandType = 
  | 'repeat'     // Repeat current content
  | 'pause'      // Pause speech/lesson
  | 'resume'     // Resume speech/lesson
  | 'stop'       // Stop current activity
  | 'next'       // Move to next item
  | 'previous'   // Move to previous item
  | 'help'       // Show available commands
  | 'volume_up'  // Increase volume
  | 'volume_down'// Decrease volume
  | 'slower'     // Decrease speech rate
  | 'faster'     // Increase speech rate
  | 'skip'       // Skip current item
  | 'cancel';    // Cancel current operation

export interface VoiceCommand {
  type: VoiceCommandType;
  confidence: number;      // 0-1 confidence score
  rawText: string;         // Original spoken text
  timestamp: number;       // When command was detected
  context: string;         // Where command was executed (lesson, menu, etc)
  variations: string[];    // Alternative phrases that match this command
}

export interface VoiceCommandPattern {
  type: VoiceCommandType;
  patterns: string[];      // Regex patterns or exact phrases
  minConfidence: number;   // Minimum confidence to trigger
  description: string;     // Human readable description
  examples: string[];      // Example phrases
}

export type VoiceRecognitionState = 
  | 'idle'          // Not listening
  | 'listening'     // Actively listening for commands
  | 'processing'    // Processing detected speech
  | 'executing'     // Executing command
  | 'error'         // Recognition error occurred
  | 'unsupported';  // Browser doesn't support speech recognition

export interface VoiceCommandConfig {
  enabled: boolean;
  continuous: boolean;           // Keep listening after each command
  interimResults: boolean;       // Process partial results
  language: string;              // Recognition language
  maxAlternatives: number;       // Number of alternatives to consider
  noiseThreshold: number;        // Minimum audio level to process
  commandTimeout: number;        // Max time to wait for command completion (ms)
  bargeInEnabled: boolean;       // Allow interrupting speech
  autoHideDelay: number;         // Delay before hiding controls (ms)
  debugMode: boolean;            // Enable debug logging
}

export interface BargeInEvent {
  interruptedAt: number;         // When interruption occurred
  originalContent: string;       // What was being spoken
  resumePosition?: number;       // Position to resume from (if applicable)
  command: VoiceCommand;         // The command that caused barge-in
}

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentContent: string;
  position: number;              // Current position in speech
  totalDuration: number;        // Total estimated duration
  volume: number;               // Current volume (0-1)
  rate: number;                 // Current speech rate (0.1-10)
  canPause: boolean;
  canResume: boolean;
  canStop: boolean;
}

export interface VoiceControlsState {
  visible: boolean;
  position: 'floating' | 'fixed' | 'hidden';
  autoHideTimeout?: number;
  showResumeChip: boolean;
  pausedSince?: number;
}

// Telemetry event types for debugging and analytics
export type TelemetryEventType = 
  | 'HF_COMMAND_DETECTED'     // Command was detected
  | 'HF_COMMAND_EXECUTED'     // Command was successfully executed
  | 'HF_COMMAND_FAILED'       // Command execution failed
  | 'HF_REPEAT'              // Repeat command
  | 'HF_PAUSE'               // Pause command
  | 'HF_RESUME'              // Resume command
  | 'HF_STOP'                // Stop command
  | 'HF_BARGE_IN'            // Speech was interrupted
  | 'HF_VOLUME_CHANGE'       // Volume was changed via voice
  | 'HF_RATE_CHANGE'         // Speech rate was changed via voice
  | 'HF_RECOGNITION_START'   // Speech recognition started
  | 'HF_RECOGNITION_END'     // Speech recognition ended
  | 'HF_RECOGNITION_ERROR'   // Speech recognition error
  | 'HF_CONTROLS_SHOW'       // Voice controls became visible
  | 'HF_CONTROLS_HIDE'       // Voice controls were hidden
  | 'HF_SESSION_START'       // Voice command session started
  | 'HF_SESSION_END'         // Voice command session ended
  | 'HF_COMMAND_LATENCY'     // Latency measurement
  | 'HF_ACCURACY_CHECK';     // Command accuracy validation

export interface TelemetryEvent {
  type: TelemetryEventType;
  timestamp: number;
  sessionId: string;
  userId?: string;
  lessonId?: string;
  moduleId?: number;
  data: Record<string, any>;   // Event-specific data
  performance?: {
    latency?: number;          // Time from detection to execution (ms)
    accuracy?: number;         // Recognition accuracy (0-1)
    retries?: number;          // Number of retries needed
  };
  context: {
    page: string;              // Current page/component
    phase: string;             // Lesson phase (intro, listening, speaking, etc)
    userAgent: string;         // Browser information
    audioSupported: boolean;   // Whether audio is supported
    micPermission: string;     // Microphone permission status
  };
}

export interface VoiceCommandCallbacks {
  onCommandDetected?: (command: VoiceCommand) => void;
  onCommandExecuted?: (command: VoiceCommand, result: any) => void;
  onCommandFailed?: (command: VoiceCommand, error: Error) => void;
  onBargeIn?: (event: BargeInEvent) => void;
  onStateChange?: (state: VoiceRecognitionState) => void;
  onSpeechStateChange?: (state: SpeechState) => void;
  onControlsVisibilityChange?: (visible: boolean) => void;
  onTelemetryEvent?: (event: TelemetryEvent) => void;
}

// Service interfaces
export interface IVoiceCommandService {
  initialize(config: VoiceCommandConfig): Promise<boolean>;
  start(): Promise<void>;
  stop(): void;
  isSupported(): boolean;
  getState(): VoiceRecognitionState;
  getSpeechState(): SpeechState;
  executeCommand(command: VoiceCommand): Promise<void>;
  setCallbacks(callbacks: VoiceCommandCallbacks): void;
  updateConfig(updates: Partial<VoiceCommandConfig>): void;
  getAvailableCommands(): VoiceCommandPattern[];
  destroy(): void;
}

export interface ITelemetryService {
  trackEvent(event: TelemetryEvent): void;
  startSession(sessionId: string): void;
  endSession(sessionId: string): void;
  getSession(sessionId: string): TelemetryEvent[];
  exportSession(sessionId: string): string;
  clearSessions(): void;
  configure(options: TelemetryConfig): void;
}

export interface TelemetryConfig {
  enabled: boolean;
  endpoint?: string;           // Optional remote endpoint
  localStorage: boolean;       // Store in localStorage
  maxEvents: number;          // Maximum events to store
  debugMode: boolean;
  sendInterval?: number;      // Interval for sending to endpoint (ms)
}

// Hook return types
export interface UseVoiceCommandsReturn {
  // State
  isListening: boolean;
  isSupported: boolean;
  state: VoiceRecognitionState;
  speechState: SpeechState;
  controlsVisible: boolean;
  lastCommand?: VoiceCommand;
  
  // Actions
  startListening: () => Promise<void>;
  stopListening: () => void;
  executeCommand: (type: VoiceCommandType) => Promise<void>;
  showControls: () => void;
  hideControls: () => void;
  
  // Speech controls
  pauseSpeech: () => void;
  resumeSpeech: () => void;
  stopSpeech: () => void;
  repeatSpeech: () => void;
  setVolume: (volume: number) => void;
  setRate: (rate: number) => void;
  
  // Utilities
  getAvailableCommands: () => string[];
  isCommandAvailable: (type: VoiceCommandType) => boolean;
  
  // Debug
  getDebugInfo: () => any;
}

// Component prop types
export interface VoiceControlsProps {
  visible?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  autoHide?: boolean;
  autoHideDelay?: number;
  showHelp?: boolean;
  compact?: boolean;
  className?: string;
  onVisibilityChange?: (visible: boolean) => void;
}

export interface ResumeChipProps {
  visible: boolean;
  pausedSince: number;
  onResume: () => void;
  onCancel: () => void;
  position?: 'top' | 'bottom' | 'center';
  animated?: boolean;
  showTimer?: boolean;
  className?: string;
}

// Error types
export class VoiceCommandError extends Error {
  constructor(
    message: string,
    public code: VoiceCommandErrorCode,
    public context?: any
  ) {
    super(message);
    this.name = 'VoiceCommandError';
  }
}

export enum VoiceCommandErrorCode {
  NOT_SUPPORTED = 'NOT_SUPPORTED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  RECOGNITION_ERROR = 'RECOGNITION_ERROR',
  COMMAND_NOT_FOUND = 'COMMAND_NOT_FOUND',
  EXECUTION_FAILED = 'EXECUTION_FAILED',
  INVALID_CONTEXT = 'INVALID_CONTEXT',
  TIMEOUT = 'TIMEOUT'
}

// Default configurations
export const DEFAULT_VOICE_COMMAND_CONFIG: VoiceCommandConfig = {
  enabled: true,
  continuous: true,
  interimResults: false,
  language: 'en-US',
  maxAlternatives: 3,
  noiseThreshold: 0.1,
  commandTimeout: 5000,
  bargeInEnabled: true,
  autoHideDelay: 5000,
  debugMode: false
};

export const DEFAULT_TELEMETRY_CONFIG: TelemetryConfig = {
  enabled: true,
  localStorage: true,
  maxEvents: 1000,
  debugMode: false,
  sendInterval: 30000
};

// Voice command patterns for recognition
export const VOICE_COMMAND_PATTERNS: VoiceCommandPattern[] = [
  {
    type: 'repeat',
    patterns: ['repeat', 'say it again', 'again', 'one more time', 'can you repeat'],
    minConfidence: 0.7,
    description: 'Repeat the current content',
    examples: ['Repeat', 'Say it again', 'One more time']
  },
  {
    type: 'pause',
    patterns: ['pause', 'wait', 'hold on', 'stop for a moment', 'hold up'],
    minConfidence: 0.8,
    description: 'Pause the current speech or lesson',
    examples: ['Pause', 'Wait', 'Hold on']
  },
  {
    type: 'resume',
    patterns: ['resume', 'continue', 'go on', 'keep going', 'carry on'],
    minConfidence: 0.8,
    description: 'Resume paused content',
    examples: ['Resume', 'Continue', 'Go on']
  },
  {
    type: 'stop',
    patterns: ['stop', 'cancel', 'quit', 'exit', 'end'],
    minConfidence: 0.8,
    description: 'Stop the current activity',
    examples: ['Stop', 'Cancel', 'Exit']
  },
  {
    type: 'next',
    patterns: ['next', 'move on', 'skip', 'forward', 'continue to next'],
    minConfidence: 0.7,
    description: 'Move to the next item',
    examples: ['Next', 'Move on', 'Skip']
  },
  {
    type: 'previous',
    patterns: ['previous', 'go back', 'back', 'last one', 'before'],
    minConfidence: 0.7,
    description: 'Go to the previous item',
    examples: ['Previous', 'Go back', 'Back']
  },
  {
    type: 'help',
    patterns: ['help', 'what can i say', 'commands', 'what commands', 'available commands'],
    minConfidence: 0.8,
    description: 'Show available voice commands',
    examples: ['Help', 'What can I say?', 'Commands']
  },
  {
    type: 'volume_up',
    patterns: ['louder', 'volume up', 'increase volume', 'turn up'],
    minConfidence: 0.8,
    description: 'Increase the volume',
    examples: ['Louder', 'Volume up', 'Turn up']
  },
  {
    type: 'volume_down',
    patterns: ['quieter', 'volume down', 'decrease volume', 'turn down', 'softer'],
    minConfidence: 0.8,
    description: 'Decrease the volume',
    examples: ['Quieter', 'Volume down', 'Softer']
  },
  {
    type: 'slower',
    patterns: ['slower', 'slow down', 'speak slower', 'not so fast'],
    minConfidence: 0.8,
    description: 'Decrease speech rate',
    examples: ['Slower', 'Slow down', 'Not so fast']
  },
  {
    type: 'faster',
    patterns: ['faster', 'speed up', 'speak faster', 'hurry up'],
    minConfidence: 0.8,
    description: 'Increase speech rate',
    examples: ['Faster', 'Speed up', 'Hurry up']
  }
];