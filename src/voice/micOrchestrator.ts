import { SimpleVAD, VADEvent } from './simpleVad';
import { MicPermissions } from './micPermissions';

export type MicState = 'idle' | 'warming-up' | 'listening' | 'recording' | 'paused-by-tts' | 'error';

export interface MicOrchestratorConfig {
  sampleRate: number;
  channelCount: number;
  vadThreshold: number;
  silenceTimeout: number;
  maxRecordingTime: number;
  preRollMs: number;
}

export interface MicOrchestratorCallbacks {
  onStateChange?: (state: MicState) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  onTranscript?: (transcript: string) => void;
  onError?: (error: Error) => void;
  onRmsUpdate?: (rms: number) => void;
}

/**
 * MicOrchestrator - Singleton class for managing hands-free microphone operations
 *
 * Features:
 * - Continuous listening with VAD (Voice Activity Detection)
 * - Barge-in capability (interrupt TTS)
 * - Auto-recovery from errors and tab changes
 * - Cross-browser compatibility
 * - Single stream management (no duplicates)
 */
class MicOrchestratorClass {
  private state: MicState = 'idle';
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private vadProcessor: SimpleVAD | null = null;
  private permissionHandler: MicPermissions | null = null;

  // Speech Recognition
  private recognition: SpeechRecognition | null = null;
  private isRecognitionActive = false;

  // Timers and watchdogs
  private watchdogTimer: number | null = null;
  private silenceTimer: number | null = null;
  private retryTimer: number | null = null;

  // Configuration
  private config: MicOrchestratorConfig = {
    sampleRate: 16000,
    channelCount: 1,
    vadThreshold: -45, // dB
    silenceTimeout: 800, // ms
    maxRecordingTime: 30000, // 30s
    preRollMs: 500
  };

  // Callbacks
  private callbacks: MicOrchestratorCallbacks = {};

  // State
  private isInitialized = false;
  private isPaused = false;
  private retryCount = 0;
  private maxRetries = 3;
  private lastError: Error | null = null;

  // Visibility handling
  private visibilityHandler: (() => void) | null = null;

  constructor() {
    this.permissionHandler = new MicPermissions();
    this.setupVisibilityHandling();
  }

  /**
   * Initialize the orchestrator - lightweight setup without permissions
   */
  async init(config?: Partial<MicOrchestratorConfig>): Promise<void> {
    if (this.isInitialized) {
      console.warn('[MicOrchestrator] Already initialized');
      return;
    }

    // Merge config
    this.config = { ...this.config, ...config };

    try {
      // Just initialize permission handler without checking permission yet
      await this.permissionHandler!.init();

      // Initialize VAD processor (no permission needed yet)
      this.vadProcessor = new SimpleVAD({
        threshold: this.config.vadThreshold,
        silenceTimeout: this.config.silenceTimeout,
        preRollMs: this.config.preRollMs
      });

      this.vadProcessor.onVoiceStart = () => {
        this.handleVoiceStart();
      };

      this.vadProcessor.onVoiceEnd = () => {
        this.handleVoiceEnd();
      };

      this.vadProcessor.onRmsUpdate = (rms: number) => {
        this.callbacks.onRmsUpdate?.(rms);
      };

      this.isInitialized = true;
      this.setState('idle');

      if (process.env.NODE_ENV === 'development') {
        console.log('[MicOrchestrator] Initialized successfully (no permissions yet)');
      }
    } catch (error) {
      console.error('[MicOrchestrator] Init failed:', error);
      throw error;
    }
  }

  /**
   * Request permission and start hands-free mode
   */
  async startHandsFree(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('MicOrchestrator not initialized. Call init() first.');
    }

    if (this.state === 'listening' || this.state === 'recording') {
      console.log('[MicOrchestrator] Already in hands-free mode');
      return;
    }

    try {
      this.setState('warming-up');

      // First, request permission explicitly
      const hasPermission = await this.requestPermissionExplicitly();
      if (!hasPermission) {
        throw new Error('Microphone permission denied by user');
      }

      // Initialize AudioContext after permission granted
      await this.initAudioContext();

      // Get media stream
      await this.acquireStream();

      // Connect to audio context
      this.connectStreamToContext();

      // Start VAD processing
      this.startVADProcessing();

      // Initialize speech recognition
      this.initSpeechRecognition();

      // CRITICAL FIX: Actually start speech recognition after initialization
      this.startSpeechRecognition();

      this.setState('listening');
      this.retryCount = 0; // Reset retry count on success

      console.log('[MicOrchestrator] Hands-free mode started successfully');
    } catch (error) {
      this.handleError(error as Error);
      throw error; // Re-throw so UI can handle it
    }
  }

  /**
   * Explicitly request microphone permission with user interaction
   */
  private async requestPermissionExplicitly(): Promise<boolean> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[MicOrchestrator] Requesting microphone permission...');
      }

      // Use the permission handler to request access
      const granted = await this.permissionHandler!.requestPermission();

      if (granted) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[MicOrchestrator] Permission granted');
        }
        return true;
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[MicOrchestrator] Permission denied');
        }
        return false;
      }
    } catch (error) {
      console.error('[MicOrchestrator] Permission request failed:', error);
      return false;
    }
  }

  /**
   * Pause for TTS - temporarily stop listening
   */
  pauseForTTS(): void {
    if (this.state === 'listening' || this.state === 'recording') {
      this.isPaused = true;
      this.setState('paused-by-tts');
      this.stopSpeechRecognition();
      console.log('[MicOrchestrator] Paused for TTS');
    }
  }

  /**
   * Resume after TTS - return to listening
   */
  async resumeAfterTTS(): Promise<void> {
    if (this.state === 'paused-by-tts') {
      this.isPaused = false;
      this.setState('listening');
      this.startSpeechRecognition();
      console.log('[MicOrchestrator] Resumed after TTS');
    }
  }

  /**
   * Handle barge-in - user starts speaking during TTS
   */
  handleBargeIn(): void {
    if (this.state === 'paused-by-tts') {
      console.log('[MicOrchestrator] Barge-in detected');
      this.resumeAfterTTS();
      // Emit barge-in event to stop TTS
      this.callbacks.onVoiceStart?.();
    }
  }

  /**
   * Shutdown the orchestrator
   */
  shutdown(): void {
    this.cleanup();
    this.isInitialized = false;
    this.setState('idle');
    console.log('[MicOrchestrator] Shutdown complete');
  }

  /**
   * Get current state
   */
  getState(): MicState {
    return this.state;
  }

  /**
   * Check if currently listening
   */
  isListening(): boolean {
    return this.state === 'listening' || this.state === 'recording';
  }

  /**
   * Set callbacks
   */
  setCallbacks(callbacks: MicOrchestratorCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Private methods

  private setState(newState: MicState): void {
    const oldState = this.state;
    this.state = newState;
    console.log(`[MicOrchestrator] State: ${oldState} → ${newState}`);
    this.callbacks.onStateChange?.(newState);
  }

  private async initAudioContext(): Promise<void> {
    try {
      // Create AudioContext with optimal settings
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContext({
        sampleRate: this.config.sampleRate,
        latencyHint: 'interactive'
      });

      // Resume if suspended (autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      console.log('[MicOrchestrator] AudioContext initialized');
    } catch (error) {
      throw new Error(`Failed to initialize AudioContext: ${error}`);
    }
  }

  private async acquireStream(): Promise<void> {
    try {
      // Release existing stream
      this.releaseStream();

      // Get preferred device
      const deviceId = await this.permissionHandler!.getPreferredDevice();

      // Request stream with optimal constraints
      const constraints: MediaStreamConstraints = {
        audio: {
          channelCount: this.config.channelCount,
          sampleRate: this.config.sampleRate,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
          ...(deviceId && { deviceId })
        },
        video: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      // CRITICAL FIX: Verify stream is actually active
      if (!this.stream.active) {
        throw new Error('Microphone stream is not active');
      }

      // Store device ID for future use
      const audioTrack = this.stream.getAudioTracks()[0];
      if (!audioTrack) {
        throw new Error('No audio track found in stream');
      }

      if (!audioTrack.enabled) {
        throw new Error('Audio track is disabled');
      }

      if (audioTrack.readyState !== 'live') {
        throw new Error(`Audio track state is ${audioTrack.readyState}, expected 'live'`);
      }

      this.permissionHandler!.setPreferredDevice(audioTrack.getSettings().deviceId || '');

      console.log('[MicOrchestrator] Stream acquired and validated');
    } catch (error) {
      throw new Error(`Failed to acquire stream: ${error}`);
    }
  }

  private connectStreamToContext(): void {
    if (!this.stream || !this.audioContext) return;

    try {
      // Disconnect existing
      if (this.sourceNode) {
        this.sourceNode.disconnect();
      }

      // Create source node
      this.sourceNode = this.audioContext.createMediaStreamSource(this.stream);

      console.log('[MicOrchestrator] Stream connected to AudioContext');
    } catch (error) {
      console.warn('[MicOrchestrator] Failed to connect stream:', error);
    }
  }

  private startVADProcessing(): void {
    if (!this.sourceNode || !this.vadProcessor || !this.audioContext) return;

    try {
      // Start VAD processing
      this.vadProcessor.start(this.sourceNode, this.audioContext);
      console.log('[MicOrchestrator] VAD processing started');
    } catch (error) {
      console.warn('[MicOrchestrator] Failed to start VAD:', error);
    }
  }

  private initSpeechRecognition(): void {
    try {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        throw new Error('SpeechRecognition not supported');
      }

      this.recognition = new SpeechRecognition();

      // CRITICAL: Configure recognition for continuous listening without timeouts
      this.recognition.continuous = true;  // Keep listening
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = 'en-US';

      // CRITICAL: Extend timeout and handle silence properly
      let silenceTimer: number | null = null;

      this.recognition.onstart = () => {
        this.isRecognitionActive = true;
        console.log('[MicOrchestrator] Speech recognition started successfully');
        // Clear any existing silence timer
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
        }
      };

      this.recognition.onspeechstart = () => {
        console.log('[MicOrchestrator] Speech detected');
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
        }
      };

      this.recognition.onspeechend = () => {
        console.log('[MicOrchestrator] Speech ended, waiting for more...');
        // Give user more time before timeout - restart after 3 seconds of silence
        silenceTimer = window.setTimeout(() => {
          if (this.recognition && this.isRecognitionActive) {
            this.recognition.stop();
            setTimeout(() => {
              if (this.state === 'listening' && !this.isPaused) {
                this.startSpeechRecognition();
              }
            }, 100);
          }
        }, 3000); // 3 seconds of silence before restart
      };

      this.recognition.onend = () => {
        this.isRecognitionActive = false;
        console.log('[MicOrchestrator] Speech recognition ended');

        // Auto-restart if still listening
        if (this.state === 'listening' && !this.isPaused) {
          setTimeout(() => this.startSpeechRecognition(), 100);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('[MicOrchestrator] Speech recognition error:', event.error);

        // CRITICAL: Handle no-speech errors by restarting instead of failing
        if (event.error === 'no-speech') {
          console.log('[MicOrchestrator] No speech detected, restarting...');
          // Restart instead of failing
          setTimeout(() => {
            if (this.state === 'listening' && !this.isPaused) {
              this.startSpeechRecognition();
            }
          }, 100);
          return;
        }

        if (event.error === 'aborted' || event.error === 'audio-capture') {
          // Try to restart
          setTimeout(() => this.startSpeechRecognition(), 1000);
        }
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          this.callbacks.onTranscript?.(finalTranscript.trim());
        }
      };

      console.log('[MicOrchestrator] Speech recognition initialized');
    } catch (error) {
      console.warn('[MicOrchestrator] Failed to initialize speech recognition:', error);
    }
  }

  private startSpeechRecognition(): void {
    if (!this.recognition || this.isRecognitionActive || this.isPaused) return;

    try {
      this.recognition.start();
    } catch (error) {
      console.warn('[MicOrchestrator] Failed to start speech recognition:', error);
    }
  }

  private stopSpeechRecognition(): void {
    if (!this.recognition || !this.isRecognitionActive) return;

    try {
      this.recognition.stop();
    } catch (error) {
      console.warn('[MicOrchestrator] Failed to stop speech recognition:', error);
    }
  }

  private handleVoiceStart(): void {
    if (this.state === 'listening') {
      this.setState('recording');
      this.callbacks.onVoiceStart?.();
    } else if (this.state === 'paused-by-tts') {
      // Barge-in detected
      this.handleBargeIn();
    }
  }

  private handleVoiceEnd(): void {
    if (this.state === 'recording') {
      this.setState('listening');
      this.callbacks.onVoiceEnd?.();
    }
  }

  private handleError(error: Error): void {
    console.error('[MicOrchestrator] Error:', error);
    this.lastError = error;
    this.setState('error');
    this.callbacks.onError?.(error);

    // Auto-recovery attempt after 3 seconds for certain errors
    if (this.shouldAttemptRecovery(error)) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[MicOrchestrator] Attempting auto-recovery in 3s...');
      }

      this.retryTimer = window.setTimeout(() => {
        this.attemptRecovery();
      }, 3000);
    }

  }

  private shouldAttemptRecovery(error: Error): boolean {
    // Attempt recovery for recoverable errors
    const recoverableErrors = [
      'audioworklet',
      'context',
      'suspended',
      'network',
      'timeout'
    ];

    const errorMessage = error.message.toLowerCase();
    return recoverableErrors.some(keyword => errorMessage.includes(keyword));
  }

  private async attemptRecovery(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      console.log('[MicOrchestrator] Starting recovery attempt...');
    }

    try {
      // Clean up current state
      await this.cleanup();

      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Re-initialize
      await this.init();

      if (process.env.NODE_ENV === 'development') {
        console.log('[MicOrchestrator] Recovery successful');
      }
    } catch (recoveryError) {
      console.error('[MicOrchestrator] Recovery failed:', recoveryError);
      // Don't set error state again to avoid infinite loops
    }
  }

  private setupVisibilityHandling(): void {
    this.visibilityHandler = () => {
      if (document.hidden) {
        // Tab became hidden - pause
        if (this.isListening()) {
          this.pauseForTTS();
          console.log('[MicOrchestrator] Paused due to tab hidden');
        }
      } else {
        // Tab became visible - resume
        if (this.state === 'paused-by-tts' && this.isPaused) {
          this.resumeAfterTTS();
          console.log('[MicOrchestrator] Resumed due to tab visible');
        }
      }
    };

    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  private releaseStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      this.stream = null;
    }
  }

  getDebugInfo() {
    return {
      state: this.state,
      rmsLevel: this.vadProcessor?.getCurrentRms() || -100,
      isVoiceActive: this.vadProcessor?.isVoice() || false,
      permissionState: this.permissionHandler ? 'granted' : 'unknown',
      deviceCount: this.permissionHandler?.getCachedDevices().length || 0,
      recentErrors: this.lastError ? [this.lastError.message] : []
    };
  }

  private cleanup(): void {
    // Clear timers
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }

    // Stop speech recognition
    this.stopSpeechRecognition();
    this.recognition = null;

    // Stop VAD
    if (this.vadProcessor) {
      this.vadProcessor.stop();
      this.vadProcessor = null;
    }

    // Disconnect audio
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    // Release stream
    this.releaseStream();

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    // Remove visibility handler
    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }
  }
}

// Export singleton instance
export const micOrchestrator = new MicOrchestratorClass();