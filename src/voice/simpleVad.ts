export interface VADEvent {
  type: 'voice-start' | 'voice-end' | 'voice-active' | 'silence';
  rms: number;
  timestamp: number;
}

export interface VADConfig {
  threshold: number; // dB threshold (e.g., -45)
  silenceTimeout: number; // ms of silence before voice-end
  preRollMs: number; // ms of pre-roll buffer
  smoothingFactor: number; // for moving average
}

/**
 * SimpleVAD - Voice Activity Detection with pre-roll buffer
 *
 * Features:
 * - RMS-based voice detection
 * - Moving average smoothing
 * - Pre-roll buffer to capture beginning of speech
 * - Cross-browser compatibility (AudioWorklet + ScriptProcessor fallback)
 */
export class SimpleVAD {
  private config: VADConfig;
  private isRunning = false;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private audioContext: AudioContext | null = null;

  // VAD state
  private isVoiceActive = false;
  private lastVoiceTime = 0;
  private smoothedRms = -100; // Start very low
  private preRollBuffer: Float32Array[] = [];
  private maxPreRollSamples = 0;

  // AudioWorklet support
  private workletNode: AudioWorkletNode | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;

  // Timers
  private silenceTimer: number | null = null;

  // Callbacks
  public onVoiceStart: (() => void) | null = null;
  public onVoiceEnd: (() => void) | null = null;
  public onRmsUpdate: ((rms: number) => void) | null = null;

  constructor(config: Partial<VADConfig> = {}) {
    this.config = {
      threshold: -45,
      silenceTimeout: 800,
      preRollMs: 500,
      smoothingFactor: 0.9,
      ...config
    };
  }

  /**
   * Start VAD processing
   */
  async start(sourceNode: MediaStreamAudioSourceNode, audioContext: AudioContext): Promise<void> {
    if (this.isRunning) {
      console.warn('[SimpleVAD] Already running');
      return;
    }

    this.sourceNode = sourceNode;
    this.audioContext = audioContext;
    this.isRunning = true;

    // Calculate pre-roll buffer size
    this.maxPreRollSamples = Math.ceil(
      (this.config.preRollMs / 1000) * audioContext.sampleRate / 1024
    );

    try {
      // Try AudioWorklet first (modern browsers)
      if ('audioWorklet' in audioContext) {
        try {
          await this.setupAudioWorklet();
          console.log('[SimpleVAD] AudioWorklet started successfully');
        } catch (workletError) {
          console.warn('[SimpleVAD] AudioWorklet failed, falling back to ScriptProcessor:', workletError);
          this.setupScriptProcessor();
        }
      } else {
        // Direct fallback to ScriptProcessor (Safari)
        console.log('[SimpleVAD] AudioWorklet not supported, using ScriptProcessor');
        this.setupScriptProcessor();
      }

      console.log('[SimpleVAD] Started successfully');
    } catch (error) {
      console.error('[SimpleVAD] Both AudioWorklet and ScriptProcessor failed:', error);
      throw error;
    }
  }

  /**
   * Stop VAD processing
   */
  stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;

    // Clear timers
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    // Disconnect audio nodes
    if (this.workletNode) {
      this.workletNode.disconnect();
      this.workletNode = null;
    }

    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }

    // Reset state
    this.isVoiceActive = false;
    this.smoothedRms = -100;
    this.preRollBuffer = [];

    console.log('[SimpleVAD] Stopped');
  }

  /**
   * Get current RMS level
   */
  getCurrentRms(): number {
    return this.smoothedRms;
  }

  /**
   * Check if voice is currently active
   */
  isVoice(): boolean {
    return this.isVoiceActive;
  }

  // Private methods

  private async setupAudioWorklet(): Promise<void> {
    if (!this.audioContext || !this.sourceNode) return;

    try {
      // Try multiple paths for AudioWorklet processor
      const workletPaths = [
        '/src/voice/vadWorkletProcessor.js', // Vite public folder serving (correct path)
        'src/voice/vadWorkletProcessor.js', // Alternative path
        './vadWorkletProcessor.js' // Fallback relative path
      ];

      let workletLoaded = false;
      for (const path of workletPaths) {
        try {
          await this.audioContext.audioWorklet.addModule(path);
          workletLoaded = true;
          console.log(`[SimpleVAD] AudioWorklet loaded from: ${path}`);
          break;
        } catch (pathError) {
          // Silently try next path (reduces console noise)
          if (process.env.NODE_ENV === 'development') {
            console.debug(`[SimpleVAD] Path ${path} failed, trying next...`);
          }
        }
      }

      if (!workletLoaded) {
        throw new Error('Failed to load AudioWorklet processor from any path');
      }

      // Create worklet node
      this.workletNode = new AudioWorkletNode(this.audioContext, 'vad-processor', {
        numberOfInputs: 1,
        numberOfOutputs: 0,
        channelCount: 1
      });

      // Listen for messages from worklet
      this.workletNode.port.onmessage = (event) => {
        const { rms, samples } = event.data;
        this.processAudioData(rms, samples);
      };

      // Connect source to worklet
      this.sourceNode.connect(this.workletNode);

      console.log('[SimpleVAD] AudioWorklet setup complete');
    } catch (error) {
      // Reduce error noise - fallback is expected
      if (process.env.NODE_ENV === 'development') {
        console.debug('[SimpleVAD] AudioWorklet failed, using ScriptProcessor fallback');
      }
      throw new Error('AudioWorklet not available');
    }
  }

  private setupScriptProcessor(): void {
    if (!this.audioContext || !this.sourceNode) return;

    try {
      // Create ScriptProcessor (deprecated but works in Safari)
      this.scriptProcessor = this.audioContext.createScriptProcessor(1024, 1, 1);

      this.scriptProcessor.onaudioprocess = (event) => {
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);

        // Calculate RMS
        const rms = this.calculateRms(inputData);

        // Store samples for pre-roll
        const samples = new Float32Array(inputData);

        this.processAudioData(rms, samples);
      };

      // Connect source to processor to destination (required for processing)
      this.sourceNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);

      console.log('[SimpleVAD] ScriptProcessor setup complete');
    } catch (error) {
      console.error('[SimpleVAD] ScriptProcessor setup failed:', error);
    }
  }

  private processAudioData(rms: number, samples: Float32Array): void {
    if (!this.isRunning) return;

    // Convert to dB
    const rmsDb = 20 * Math.log10(Math.max(rms, 1e-10));

    // Smooth RMS with moving average
    this.smoothedRms = this.config.smoothingFactor * this.smoothedRms +
                      (1 - this.config.smoothingFactor) * rmsDb;

    // Emit RMS update
    this.onRmsUpdate?.(this.smoothedRms);

    // Update pre-roll buffer
    this.updatePreRollBuffer(samples);

    // Voice activity detection
    const isCurrentlyVoice = this.smoothedRms > this.config.threshold;

    if (isCurrentlyVoice) {
      this.lastVoiceTime = Date.now();

      if (!this.isVoiceActive) {
        // Voice started
        this.isVoiceActive = true;
        this.clearSilenceTimer();
        this.onVoiceStart?.();
        console.log('[SimpleVAD] Voice started, RMS:', this.smoothedRms.toFixed(1), 'dB');
      }
    } else {
      // Silence detected
      if (this.isVoiceActive) {
        // Start silence timer if not already running
        if (!this.silenceTimer) {
          this.silenceTimer = window.setTimeout(() => {
            this.isVoiceActive = false;
            this.onVoiceEnd?.();
            this.silenceTimer = null;
            console.log('[SimpleVAD] Voice ended after silence timeout');
          }, this.config.silenceTimeout);
        }
      }
    }
  }

  private updatePreRollBuffer(samples: Float32Array): void {
    // Add samples to pre-roll buffer
    this.preRollBuffer.push(new Float32Array(samples));

    // Limit buffer size
    if (this.preRollBuffer.length > this.maxPreRollSamples) {
      this.preRollBuffer.shift();
    }
  }

  private clearSilenceTimer(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  private calculateRms(samples: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
      sum += samples[i] * samples[i];
    }
    return Math.sqrt(sum / samples.length);
  }

  /**
   * Get pre-roll buffer for including in recording
   */
  getPreRollBuffer(): Float32Array[] {
    return [...this.preRollBuffer];
  }

  /**
   * Reset VAD state
   */
  reset(): void {
    this.isVoiceActive = false;
    this.smoothedRms = -100;
    this.preRollBuffer = [];
    this.clearSilenceTimer();
  }
}