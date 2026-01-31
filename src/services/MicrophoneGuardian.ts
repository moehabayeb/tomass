/**
 * MicrophoneGuardian - Production-grade microphone reliability service
 *
 * Ensures Duolingo-level speech recognition reliability by:
 * 1. Pre-flight checks before EVERY recording
 * 2. Request queue to prevent race conditions
 * 3. Runtime permission monitoring
 * 4. Automatic recovery on transient failures
 * 5. Clear user feedback on all states
 */

import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

// Status types
export type MicStatus =
  | 'unknown'
  | 'checking'
  | 'ready'
  | 'no_permission'
  | 'permission_prompt'
  | 'no_microphone'
  | 'mic_in_use'
  | 'network_offline'
  | 'service_unavailable'
  | 'error';

export type MicIssue =
  | 'permission_revoked'
  | 'mic_disconnected'
  | 'network_lost'
  | 'service_error'
  | 'audio_stopped';

export interface PreflightResult {
  ready: boolean;
  status: MicStatus;
  userMessage: string;
  canRetry: boolean;
}

export interface MicrophoneGuardianConfig {
  healthCheckTimeoutMs?: number;
  minRestartDelayMs?: number;
  enableHealthCheck?: boolean;
  enableNetworkCheck?: boolean;
}

type StatusChangeCallback = (status: MicStatus) => void;
type IssueCallback = (issue: MicIssue, message: string) => void;

class MicrophoneGuardianService {
  private status: MicStatus = 'unknown';
  private isRecording: boolean = false;
  private statusListeners: Set<StatusChangeCallback> = new Set();
  private issueCallbacks: Set<IssueCallback> = new Set();
  private permissionListener: (() => void) | null = null;
  private monitoringInterval: ReturnType<typeof setInterval> | null = null;
  private lastHealthCheckTime: number = 0;
  private requestQueue: Promise<void> = Promise.resolve();
  private lastStopTime: number = 0;

  // Configuration
  private config: Required<MicrophoneGuardianConfig> = {
    healthCheckTimeoutMs: 150,
    minRestartDelayMs: 200,
    enableHealthCheck: true,
    enableNetworkCheck: true,
  };

  constructor(config?: MicrophoneGuardianConfig) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    console.log('[MicGuardian] Initialized');
  }

  /**
   * Configure the guardian
   */
  configure(config: Partial<MicrophoneGuardianConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current status
   */
  getStatus(): MicStatus {
    return this.status;
  }

  /**
   * Check if currently recording
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Subscribe to status changes
   */
  onStatusChange(callback: StatusChangeCallback): () => void {
    this.statusListeners.add(callback);
    return () => this.statusListeners.delete(callback);
  }

  /**
   * Subscribe to issues during recording
   */
  onIssue(callback: IssueCallback): () => void {
    this.issueCallbacks.add(callback);
    return () => this.issueCallbacks.delete(callback);
  }

  /**
   * Emit status change to all listeners
   */
  private emitStatusChange(newStatus: MicStatus): void {
    if (this.status !== newStatus) {
      console.log(`[MicGuardian] Status: ${this.status} → ${newStatus}`);
      this.status = newStatus;
      this.statusListeners.forEach(cb => {
        try {
          cb(newStatus);
        } catch (e) {
          console.error('[MicGuardian] Status listener error:', e);
        }
      });
    }
  }

  /**
   * Emit issue to all listeners
   */
  private emitIssue(issue: MicIssue, message: string): void {
    console.warn(`[MicGuardian] Issue: ${issue} - ${message}`);
    this.issueCallbacks.forEach(cb => {
      try {
        cb(issue, message);
      } catch (e) {
        console.error('[MicGuardian] Issue listener error:', e);
      }
    });
  }

  /**
   * Ensure microphone is ready - call when entering a speaking-enabled page
   */
  async ensureReady(): Promise<MicStatus> {
    console.log('[MicGuardian] ensureReady() called');
    this.emitStatusChange('checking');

    try {
      // Step 1: Check permission
      const permissionStatus = await this.checkPermission();
      if (permissionStatus === 'denied') {
        this.emitStatusChange('no_permission');
        return 'no_permission';
      }
      if (permissionStatus === 'prompt') {
        this.emitStatusChange('permission_prompt');
        // Try to request permission
        const granted = await this.requestPermission();
        if (!granted) {
          this.emitStatusChange('no_permission');
          return 'no_permission';
        }
      }

      // Step 2: Check network (for Google Speech Services)
      if (this.config.enableNetworkCheck) {
        const isOnline = await this.checkNetwork();
        if (!isOnline) {
          this.emitStatusChange('network_offline');
          return 'network_offline';
        }
      }

      // Step 3: Check speech recognition service availability
      const serviceAvailable = await this.checkServiceAvailability();
      if (!serviceAvailable) {
        this.emitStatusChange('service_unavailable');
        return 'service_unavailable';
      }

      // Step 4: Quick health check (optional)
      if (this.config.enableHealthCheck) {
        const healthy = await this.micHealthCheck();
        if (!healthy) {
          this.emitStatusChange('no_microphone');
          return 'no_microphone';
        }
      }

      // All checks passed!
      this.emitStatusChange('ready');
      this.setupPermissionMonitoring();
      return 'ready';

    } catch (error) {
      console.error('[MicGuardian] ensureReady error:', error);
      this.emitStatusChange('error');
      return 'error';
    }
  }

  /**
   * Pre-flight check before EACH recording attempt
   */
  async preflightCheck(): Promise<PreflightResult> {
    console.log('[MicGuardian] preflightCheck() called');

    // Quick permission check
    const permissionStatus = await this.checkPermission();
    if (permissionStatus === 'denied') {
      return {
        ready: false,
        status: 'no_permission',
        userMessage: '🎤 Microphone permission denied. Please allow access in Settings.',
        canRetry: true,
      };
    }

    // Quick network check
    if (this.config.enableNetworkCheck && !navigator.onLine) {
      return {
        ready: false,
        status: 'network_offline',
        userMessage: '📶 No internet connection. Speech recognition requires network.',
        canRetry: true,
      };
    }

    // If we haven't done a health check recently, do a quick one
    const timeSinceHealthCheck = Date.now() - this.lastHealthCheckTime;
    if (this.config.enableHealthCheck && timeSinceHealthCheck > 30000) {
      const healthy = await this.micHealthCheck();
      if (!healthy) {
        return {
          ready: false,
          status: 'no_microphone',
          userMessage: '🎤 Microphone not available. Please check your device.',
          canRetry: true,
        };
      }
    }

    return {
      ready: true,
      status: 'ready',
      userMessage: '',
      canRetry: false,
    };
  }

  /**
   * Check microphone permission status
   */
  async checkPermission(): Promise<PermissionState> {
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await SpeechRecognition.checkPermissions();
        const status = result.speechRecognition;
        if (status === 'granted') return 'granted';
        if (status === 'denied') return 'denied';
        return 'prompt';
      }

      // Web: Use Permissions API if available
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          return result.state;
        } catch {
          // Permissions API not supported for microphone, assume prompt needed
          return 'prompt';
        }
      }

      return 'prompt';
    } catch (error) {
      console.error('[MicGuardian] Permission check error:', error);
      return 'prompt';
    }
  }

  /**
   * Request microphone permission
   */
  async requestPermission(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await SpeechRecognition.requestPermissions();
        return result.speechRecognition === 'granted';
      }

      // Web: Request via getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('[MicGuardian] Permission request error:', error);
      return false;
    }
  }

  /**
   * Check network connectivity
   */
  async checkNetwork(): Promise<boolean> {
    if (!navigator.onLine) return false;

    try {
      // Quick connectivity test
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return true;
    } catch {
      return navigator.onLine; // Fall back to browser's online status
    }
  }

  /**
   * Check if speech recognition service is available
   */
  async checkServiceAvailability(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await SpeechRecognition.available();
        return result.available;
      }

      // Web: Check for Speech Recognition API
      return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    } catch {
      return false;
    }
  }

  /**
   * Quick microphone health check - verifies mic can capture audio
   */
  async micHealthCheck(): Promise<boolean> {
    console.log('[MicGuardian] Running health check...');

    return new Promise(async (resolve) => {
      let stream: MediaStream | null = null;
      let audioContext: AudioContext | null = null;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (stream) stream.getTracks().forEach(t => t.stop());
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close().catch(() => {});
        }
      };

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false }
        });

        audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Wait a moment then check if we're getting any data
        timeoutId = setTimeout(() => {
          try {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            // Even silence is OK - we just want to verify the stream works
            // The fact that we got here without error means mic is working
            cleanup();
            this.lastHealthCheckTime = Date.now();
            console.log('[MicGuardian] Health check passed');
            resolve(true);
          } catch {
            cleanup();
            resolve(false);
          }
        }, this.config.healthCheckTimeoutMs);

      } catch (error) {
        console.error('[MicGuardian] Health check failed:', error);
        cleanup();
        resolve(false);
      }
    });
  }

  /**
   * Comprehensive health check that tests actual audio capture with timeout
   * Use before each recording session for maximum reliability
   */
  async healthCheck(timeoutMs: number = 3000): Promise<{
    healthy: boolean;
    status: MicStatus;
    message: string;
    canRecover: boolean;
  }> {
    console.log('[MicGuardian] Running comprehensive health check...');

    // Check permission first
    const permissionStatus = await this.checkPermission();
    if (permissionStatus === 'denied') {
      return {
        healthy: false,
        status: 'no_permission',
        message: 'Microphone permission denied. Please allow access in Settings.',
        canRecover: true,
      };
    }

    // Check network (for Google Speech Services)
    if (this.config.enableNetworkCheck && !navigator.onLine) {
      return {
        healthy: false,
        status: 'network_offline',
        message: 'No internet connection. Speech recognition requires network.',
        canRecover: true,
      };
    }

    // Check service availability
    const serviceAvailable = await this.checkServiceAvailability();
    if (!serviceAvailable) {
      return {
        healthy: false,
        status: 'service_unavailable',
        message: 'Speech recognition service unavailable.',
        canRecover: false,
      };
    }

    // Test actual audio capture with timeout
    return new Promise(async (resolve) => {
      let stream: MediaStream | null = null;
      let audioContext: AudioContext | null = null;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      let resolved = false;

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (stream) stream.getTracks().forEach(t => t.stop());
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close().catch(() => {});
        }
      };

      const resolveOnce = (result: {
        healthy: boolean;
        status: MicStatus;
        message: string;
        canRecover: boolean;
      }) => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(result);
        }
      };

      // Set overall timeout
      timeoutId = setTimeout(() => {
        console.warn('[MicGuardian] Health check timed out');
        resolveOnce({
          healthy: false,
          status: 'mic_in_use',
          message: 'Microphone may be in use by another app.',
          canRecover: true,
        });
      }, timeoutMs);

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });

        // Verify stream is active
        if (!stream.active || stream.getAudioTracks().length === 0) {
          resolveOnce({
            healthy: false,
            status: 'no_microphone',
            message: 'No active microphone found.',
            canRecover: true,
          });
          return;
        }

        // Test audio context
        audioContext = new AudioContext();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Verify we can read audio data
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        this.lastHealthCheckTime = Date.now();
        console.log('[MicGuardian] Comprehensive health check passed');

        resolveOnce({
          healthy: true,
          status: 'ready',
          message: 'Microphone ready',
          canRecover: false,
        });

      } catch (error: any) {
        console.error('[MicGuardian] Comprehensive health check failed:', error);

        if (error.name === 'NotAllowedError') {
          resolveOnce({
            healthy: false,
            status: 'no_permission',
            message: 'Microphone permission denied.',
            canRecover: true,
          });
        } else if (error.name === 'NotFoundError') {
          resolveOnce({
            healthy: false,
            status: 'no_microphone',
            message: 'No microphone detected.',
            canRecover: false,
          });
        } else {
          resolveOnce({
            healthy: false,
            status: 'error',
            message: 'Microphone error: ' + (error.message || 'Unknown error'),
            canRecover: true,
          });
        }
      }
    });
  }

  /**
   * Attempt to recover from a stuck microphone state
   */
  async recoverFromStuck(): Promise<boolean> {
    console.log('[MicGuardian] Attempting recovery from stuck state...');

    try {
      // Stop any active recording
      if (Capacitor.isNativePlatform()) {
        try {
          await SpeechRecognition.stop();
          await SpeechRecognition.removeAllListeners();
        } catch {
          // Ignore errors during cleanup
        }
      }

      // Wait for resources to release
      await this.sleep(300);

      // Verify recovery worked
      const healthResult = await this.healthCheck(2000);

      if (healthResult.healthy) {
        console.log('[MicGuardian] Recovery successful');
        this.emitStatusChange('ready');
        return true;
      }

      console.warn('[MicGuardian] Recovery failed:', healthResult.message);
      this.emitStatusChange(healthResult.status);
      return false;

    } catch (error) {
      console.error('[MicGuardian] Recovery error:', error);
      return false;
    }
  }

  /**
   * Setup permission monitoring for runtime changes
   */
  private setupPermissionMonitoring(): void {
    if (this.permissionListener) return; // Already set up

    if (!Capacitor.isNativePlatform() && 'permissions' in navigator) {
      navigator.permissions.query({ name: 'microphone' as PermissionName })
        .then(permissionStatus => {
          this.permissionListener = () => {
            if (permissionStatus.state === 'denied') {
              this.handlePermissionRevoked();
            }
          };
          permissionStatus.addEventListener('change', this.permissionListener);
        })
        .catch(() => {
          // Permissions API not supported, skip monitoring
        });
    }
  }

  /**
   * Handle permission being revoked mid-session
   */
  private handlePermissionRevoked(): void {
    console.warn('[MicGuardian] Permission revoked!');
    this.emitStatusChange('no_permission');
    this.emitIssue('permission_revoked', 'Microphone permission was revoked');

    if (this.isRecording) {
      this.emergencyStop();
    }
  }

  /**
   * Start monitoring during recording
   */
  startMonitoring(onIssue?: IssueCallback): void {
    this.isRecording = true;

    if (onIssue) {
      this.issueCallbacks.add(onIssue);
    }

    // Monitor network status
    const handleOffline = () => {
      this.emitIssue('network_lost', 'Network connection lost');
    };
    window.addEventListener('offline', handleOffline);

    // Store for cleanup
    this.monitoringInterval = setInterval(() => {
      // Periodic checks during recording (every 5 seconds)
      if (!navigator.onLine) {
        this.emitIssue('network_lost', 'Network connection lost');
      }
    }, 5000) as unknown as ReturnType<typeof setInterval>;

    console.log('[MicGuardian] Monitoring started');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isRecording = false;

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    console.log('[MicGuardian] Monitoring stopped');
  }

  /**
   * Emergency stop - called when critical issue detected during recording
   */
  emergencyStop(): void {
    console.warn('[MicGuardian] Emergency stop triggered');
    this.isRecording = false;
    this.stopMonitoring();
  }

  /**
   * Queue a request to prevent race conditions
   * Use this to wrap start/stop calls
   */
  async queueRequest<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue = this.requestQueue.then(async () => {
        // Ensure minimum delay since last stop
        const elapsed = Date.now() - this.lastStopTime;
        if (elapsed < this.config.minRestartDelayMs) {
          await this.sleep(this.config.minRestartDelayMs - elapsed);
        }

        try {
          const result = await operation();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /**
   * Mark that a stop operation completed (for timing)
   */
  markStopped(): void {
    this.lastStopTime = Date.now();
  }

  /**
   * Helper sleep function
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get user-friendly message for current status
   */
  getStatusMessage(): string {
    switch (this.status) {
      case 'unknown':
        return '';
      case 'checking':
        return '🎤 Checking microphone...';
      case 'ready':
        return '🎤 Microphone ready';
      case 'no_permission':
        return '🎤 Microphone access denied. Tap to allow.';
      case 'permission_prompt':
        return '🎤 Please allow microphone access';
      case 'no_microphone':
        return '🎤 No microphone detected';
      case 'mic_in_use':
        return '🎤 Microphone in use by another app';
      case 'network_offline':
        return '📶 No internet connection';
      case 'service_unavailable':
        return '⚠️ Speech service unavailable';
      case 'error':
        return '⚠️ Microphone error. Please try again.';
      default:
        return '';
    }
  }

  /**
   * Cleanup when done with guardian
   */
  cleanup(): void {
    this.stopMonitoring();
    this.statusListeners.clear();
    this.issueCallbacks.clear();

    if (this.permissionListener) {
      // Can't easily remove the listener, but it's fine - it's a no-op after cleanup
      this.permissionListener = null;
    }

    console.log('[MicGuardian] Cleaned up');
  }
}

// Export singleton instance
export const microphoneGuardian = new MicrophoneGuardianService();

// Export class for testing or custom instances
export { MicrophoneGuardianService };
