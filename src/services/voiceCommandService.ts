// Voice Command Service - Continuous voice recognition and command processing
// Handles barge-in, command detection, and execution coordination

import {
  VoiceCommand,
  VoiceCommandType,
  VoiceCommandConfig,
  VoiceRecognitionState,
  VoiceCommandCallbacks,
  IVoiceCommandService,
  VoiceCommandError,
  VoiceCommandErrorCode,
  VOICE_COMMAND_PATTERNS,
  DEFAULT_VOICE_COMMAND_CONFIG
} from '../types/voiceCommands';
import { enhancedNarration } from '../utils/enhancedNarration';
import { 
  trackCommandDetected, 
  trackCommandExecuted, 
  trackRecognitionError, 
  telemetry 
} from '../utils/telemetry';

export class VoiceCommandService implements IVoiceCommandService {
  private config: VoiceCommandConfig;
  private callbacks: VoiceCommandCallbacks = {};
  private recognition: any = null;
  private state: VoiceRecognitionState = 'idle';
  private sessionId: string;
  private isInitialized: boolean = false;
  private continuousMode: boolean = false;
  private lastCommandTime: number = 0;
  private commandBuffer: string[] = [];
  private processingTimeout: number | null = null;

  constructor(config: VoiceCommandConfig = DEFAULT_VOICE_COMMAND_CONFIG) {
    this.config = { ...DEFAULT_VOICE_COMMAND_CONFIG, ...config };
    this.sessionId = `voice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public async initialize(config?: VoiceCommandConfig): Promise<boolean> {
    if (config) {
      this.config = { ...this.config, ...config };
    }

    if (!this.isSupported()) {
      this.setState('unsupported');
      return false;
    }

    try {
      // Initialize speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition ||
                               (window as any).mozSpeechRecognition ||
                               (window as any).msSpeechRecognition;

      this.recognition = new SpeechRecognition();
      
      // Configure recognition
      this.recognition.continuous = this.config.continuous;
      this.recognition.interimResults = this.config.interimResults;
      this.recognition.lang = this.config.language;
      this.recognition.maxAlternatives = this.config.maxAlternatives;

      // Set up event handlers
      this.setupRecognitionEventHandlers();

      // Start telemetry session
      telemetry.startSession(this.sessionId);

      this.isInitialized = true;
      this.setState('idle');

      return true;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      this.setState('error');
      return false;
    }
  }

  private setupRecognitionEventHandlers(): void {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.setState('listening');
      this.callbacks.onStateChange?.(this.state);
    };

    this.recognition.onresult = (event: any) => {
      this.handleRecognitionResult(event);
    };

    this.recognition.onerror = (event: any) => {
      this.handleRecognitionError(event);
    };

    this.recognition.onend = () => {
      if (this.continuousMode && this.state === 'listening') {
        // Restart recognition for continuous mode
        setTimeout(() => {
          if (this.continuousMode) {
            this.startRecognition();
          }
        }, 100);
      } else {
        this.setState('idle');
      }
    };

    this.recognition.onnomatch = () => {
      // No match found - continue listening in continuous mode
      // Apple Store Compliance: Silent operation
    };

    this.recognition.onsoundstart = () => {
      // Apple Store Compliance: Silent operation
    };

    this.recognition.onspeechend = () => {
      // Apple Store Compliance: Silent operation
    };
  }

  private handleRecognitionResult(event: any): void {
    const results = event.results;
    const latestResult = results[results.length - 1];
    
    if (!latestResult) return;

    const transcript = latestResult[0].transcript.toLowerCase().trim();
    const confidence = latestResult[0].confidence || 0;

    // Apple Store Compliance: Silent operation

    // Add to command buffer for processing
    this.commandBuffer.push(transcript);
    
    // Process commands after a short delay to allow for complete phrases
    this.scheduleCommandProcessing();
  }

  private scheduleCommandProcessing(): void {
    if (this.processingTimeout) {
      clearTimeout(this.processingTimeout);
    }

    this.processingTimeout = window.setTimeout(() => {
      this.processCommandBuffer();
    }, 500); // Wait 500ms for complete phrase
  }

  private processCommandBuffer(): void {
    if (this.commandBuffer.length === 0) return;

    const fullTranscript = this.commandBuffer.join(' ');
    this.commandBuffer = [];
    
    this.setState('processing');

    // Try to detect command
    const command = this.detectCommand(fullTranscript);
    
    if (command) {
      this.executeDetectedCommand(command);
    } else {
      // Apple Store Compliance: Silent operation
    }

    this.setState(this.continuousMode ? 'listening' : 'idle');
  }

  private detectCommand(transcript: string): VoiceCommand | null {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    // Try each command pattern
    for (const pattern of VOICE_COMMAND_PATTERNS) {
      for (const commandPattern of pattern.patterns) {
        const regex = new RegExp(`\\b${commandPattern}\\b`, 'i');
        const match = normalizedTranscript.match(regex);
        
        if (match) {
          const confidence = this.calculateConfidence(normalizedTranscript, commandPattern);
          
          if (confidence >= pattern.minConfidence) {
            const command: VoiceCommand = {
              type: pattern.type,
              confidence,
              rawText: transcript,
              timestamp: Date.now(),
              context: 'lesson',
              variations: pattern.patterns
            };

            // Track telemetry
            trackCommandDetected(
              this.sessionId,
              pattern.type,
              confidence,
              transcript,
              { phase: 'detection' }
            );

            this.callbacks.onCommandDetected?.(command);
            return command;
          }
        }
      }
    }

    return null;
  }

  private calculateConfidence(transcript: string, pattern: string): number {
    // Simple confidence calculation based on exact match and context
    const words = transcript.split(' ');
    const patternWords = pattern.split(' ');
    
    let matchingWords = 0;
    for (const patternWord of patternWords) {
      if (words.includes(patternWord.toLowerCase())) {
        matchingWords++;
      }
    }
    
    const baseConfidence = matchingWords / Math.max(patternWords.length, 1);
    
    // Boost confidence for shorter, more direct commands
    const lengthBoost = Math.max(0, (10 - words.length) / 10);
    
    return Math.min(1, baseConfidence + lengthBoost * 0.2);
  }

  private async executeDetectedCommand(command: VoiceCommand): Promise<void> {
    const startTime = Date.now();
    this.setState('executing');
    
    try {
      await this.executeCommand(command);
      
      const executionTime = Date.now() - startTime;
      trackCommandExecuted(
        this.sessionId,
        command.type,
        true,
        executionTime,
        { phase: 'execution' }
      );

      this.callbacks.onCommandExecuted?.(command, { success: true, executionTime });
      this.lastCommandTime = Date.now();
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      trackCommandExecuted(
        this.sessionId,
        command.type,
        false,
        executionTime,
        { error: error.message, phase: 'execution' }
      );

      this.callbacks.onCommandFailed?.(command, error as Error);
    }
  }

  public async executeCommand(command: VoiceCommand): Promise<void> {
    const narration = enhancedNarration;
    const speechState = narration.getState();

    switch (command.type) {
      case 'repeat':
        if (speechState.isPlaying || speechState.isPaused) {
          narration.bargeIn('repeat');
        }
        narration.repeat();
        break;

      case 'pause':
        if (speechState.isPlaying && !speechState.isPaused) {
          narration.pause();
        }
        break;

      case 'resume':
        if (speechState.isPaused) {
          narration.resume();
        }
        break;

      case 'stop':
        narration.cancel();
        break;

      case 'volume_up':
        const currentVol = narration.getVolume();
        narration.setVolume(Math.min(1, currentVol + 0.2));
        break;

      case 'volume_down':
        const currentVolDown = narration.getVolume();
        narration.setVolume(Math.max(0, currentVolDown - 0.2));
        break;

      case 'slower':
        const currentRate = narration.getRate();
        narration.setRate(Math.max(0.1, currentRate - 0.2));
        break;

      case 'faster':
        const currentRateFast = narration.getRate();
        narration.setRate(Math.min(3, currentRateFast + 0.2));
        break;

      case 'help':
        this.announceAvailableCommands();
        break;

      case 'next':
      case 'previous':
      case 'skip':
        // These would be handled by the lesson component
        // We just notify the callback
        break;

      default:
        throw new VoiceCommandError(
          `Unknown command type: ${command.type}`,
          VoiceCommandErrorCode.COMMAND_NOT_FOUND,
          { command }
        );
    }
  }

  private announceAvailableCommands(): void {
    const commands = [
      'You can say: Repeat, Pause, Resume, Stop',
      'Volume commands: Louder, Quieter',
      'Speed commands: Faster, Slower',
      'Navigation: Next, Previous, Skip'
    ];
    
    enhancedNarration.speak(commands, { interrupt: true });
  }

  private handleRecognitionError(event: any): void {
    // Apple Store Compliance: Silent operation

    trackRecognitionError(
      this.sessionId,
      event.error,
      event.error,
      { phase: 'recognition' }
    );

    // Handle specific errors
    switch (event.error) {
      case 'not-allowed':
      case 'permission-denied':
        this.setState('error');
        break;
      case 'network':
        // Temporary network error, try to restart
        setTimeout(() => {
          if (this.continuousMode) {
            this.startRecognition();
          }
        }, 2000);
        break;
      default:
        // Other errors - continue if in continuous mode
        if (this.continuousMode) {
          setTimeout(() => this.startRecognition(), 1000);
        } else {
          this.setState('error');
        }
    }
  }

  public async start(): Promise<void> {
    if (!this.isInitialized) {
      throw new VoiceCommandError(
        'Service not initialized',
        VoiceCommandErrorCode.NOT_SUPPORTED
      );
    }

    this.continuousMode = true;
    await this.startRecognition();
  }

  private async startRecognition(): Promise<void> {
    if (!this.recognition || this.state === 'listening') return;

    try {
      this.recognition.start();
    } catch (error) {
      // Apple Store Compliance: Silent operation
      // Recognition might already be running, ignore this error
    }
  }

  public stop(): void {
    this.continuousMode = false;
    
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        // Apple Store Compliance: Silent operation
      }
    }

    if (this.processingTimeout) {
      clearTimeout(this.processingTimeout);
      this.processingTimeout = null;
    }

    this.setState('idle');
  }

  public isSupported(): boolean {
    return !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition
    );
  }

  public getState(): VoiceRecognitionState {
    return this.state;
  }

  public getSpeechState() {
    return enhancedNarration.getState();
  }

  private setState(newState: VoiceRecognitionState): void {
    if (this.state !== newState) {
      this.state = newState;
      this.callbacks.onStateChange?.(newState);
    }
  }

  public setCallbacks(callbacks: VoiceCommandCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  public updateConfig(updates: Partial<VoiceCommandConfig>): void {
    this.config = { ...this.config, ...updates };
    
    // Apply changes that can be updated without restart
    if (this.recognition) {
      if (updates.language) {
        this.recognition.lang = this.config.language;
      }
      if (updates.maxAlternatives) {
        this.recognition.maxAlternatives = this.config.maxAlternatives;
      }
    }
  }

  public getAvailableCommands() {
    return VOICE_COMMAND_PATTERNS;
  }

  public destroy(): void {
    this.stop();
    
    if (this.processingTimeout) {
      clearTimeout(this.processingTimeout);
    }

    telemetry.endSession(this.sessionId);
    
    this.recognition = null;
    this.callbacks = {};
    this.isInitialized = false;
  }

  // Debug methods
  public getDebugInfo() {
    return {
      isSupported: this.isSupported(),
      isInitialized: this.isInitialized,
      state: this.state,
      config: this.config,
      sessionId: this.sessionId,
      continuousMode: this.continuousMode,
      lastCommandTime: this.lastCommandTime,
      commandBuffer: [...this.commandBuffer],
      speechState: this.getSpeechState()
    };
  }
}

// Singleton instance
let voiceCommandInstance: VoiceCommandService | null = null;

export function getVoiceCommandService(config?: VoiceCommandConfig): VoiceCommandService {
  if (!voiceCommandInstance) {
    voiceCommandInstance = new VoiceCommandService(config);
  }
  return voiceCommandInstance;
}

// Export singleton
export const voiceCommandService = getVoiceCommandService();