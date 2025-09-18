export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unknown';

export interface DeviceInfo {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

/**
 * MicPermissions - Handle microphone permissions and device management
 */
export class MicPermissions {
  private preferredDeviceId: string | null = null;
  private cachedDevices: DeviceInfo[] = [];
  private isInitialized = false;

  constructor() {
    this.loadPreferredDevice();
  }

  /**
   * Initialize permission handler
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Check if we're on a secure origin
      if (!this.isSecureOrigin()) {
        throw new Error('Microphone access requires HTTPS (except localhost)');
      }

      // Enumerate devices (may request permission)
      await this.enumerateDevices();

      this.isInitialized = true;
      console.log('[MicPermissions] Initialized');
    } catch (error) {
      console.error('[MicPermissions] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Request microphone permission
   */
  async requestPermission(): Promise<boolean> {
    try {
      // Try to get permission by requesting a stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      // Stop the stream immediately - we just wanted permission
      stream.getTracks().forEach(track => track.stop());

      console.log('[MicPermissions] Permission granted');
      return true;
    } catch (error) {
      console.warn('[MicPermissions] Permission denied:', error);
      return false;
    }
  }

  /**
   * Check current permission state
   */
  async checkPermission(): Promise<boolean> {
    try {
      // Try using Permissions API if available
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        return permission.state === 'granted';
      }

      // Fallback: try to enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter(device => device.kind === 'audioinput');

      // If we can see device labels, we likely have permission
      return audioDevices.some(device => device.label !== '');
    } catch (error) {
      console.warn('[MicPermissions] Permission check failed:', error);
      return false;
    }
  }

  /**
   * Get permission state
   */
  async getPermissionState(): Promise<PermissionState> {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        return permission.state as PermissionState;
      }

      // Fallback check
      const hasPermission = await this.checkPermission();
      return hasPermission ? 'granted' : 'prompt';
    } catch (error) {
      console.warn('[MicPermissions] Could not determine permission state:', error);
      return 'unknown';
    }
  }

  /**
   * Enumerate available devices
   */
  async enumerateDevices(): Promise<DeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cachedDevices = devices
        .filter(device => device.kind === 'audioinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
          kind: device.kind
        }));

      console.log('[MicPermissions] Found devices:', this.cachedDevices.length);
      return this.cachedDevices;
    } catch (error) {
      console.warn('[MicPermissions] Device enumeration failed:', error);
      return [];
    }
  }

  /**
   * Get cached devices
   */
  getCachedDevices(): DeviceInfo[] {
    return [...this.cachedDevices];
  }

  /**
   * Test a specific device
   */
  async testDevice(deviceId?: string): Promise<boolean> {
    try {
      const constraints: MediaStreamConstraints = {
        audio: deviceId ? { deviceId } : true,
        video: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Check if stream has audio tracks
      const audioTracks = stream.getAudioTracks();
      const hasAudio = audioTracks.length > 0 && audioTracks[0].readyState === 'live';

      // Stop the stream
      stream.getTracks().forEach(track => track.stop());

      console.log('[MicPermissions] Device test:', deviceId || 'default', hasAudio ? 'OK' : 'Failed');
      return hasAudio;
    } catch (error) {
      console.warn('[MicPermissions] Device test failed:', deviceId || 'default', error);
      return false;
    }
  }

  /**
   * Get preferred device ID
   */
  async getPreferredDevice(): Promise<string | null> {
    // If no preferred device, try to find the best one
    if (!this.preferredDeviceId) {
      await this.selectBestDevice();
    }

    return this.preferredDeviceId;
  }

  /**
   * Set preferred device ID
   */
  setPreferredDevice(deviceId: string): void {
    this.preferredDeviceId = deviceId;
    this.savePreferredDevice();
    console.log('[MicPermissions] Preferred device set:', deviceId);
  }

  /**
   * Select the best available device
   */
  private async selectBestDevice(): Promise<void> {
    const devices = await this.enumerateDevices();

    if (devices.length === 0) {
      console.warn('[MicPermissions] No audio devices found');
      return;
    }

    // Prefer devices with meaningful labels (usually means they're working)
    let bestDevice = devices.find(device =>
      device.label && !device.label.startsWith('Microphone '));

    // Fallback to first device
    if (!bestDevice) {
      bestDevice = devices[0];
    }

    if (bestDevice) {
      // Test the device before setting it
      const works = await this.testDevice(bestDevice.deviceId);
      if (works) {
        this.setPreferredDevice(bestDevice.deviceId);
      }
    }
  }

  /**
   * Load preferred device from localStorage
   */
  private loadPreferredDevice(): void {
    try {
      const saved = localStorage.getItem('mic-preferred-device');
      if (saved) {
        this.preferredDeviceId = saved;
        console.log('[MicPermissions] Loaded preferred device:', saved);
      }
    } catch (error) {
      console.warn('[MicPermissions] Could not load preferred device:', error);
    }
  }

  /**
   * Save preferred device to localStorage
   */
  private savePreferredDevice(): void {
    try {
      if (this.preferredDeviceId) {
        localStorage.setItem('mic-preferred-device', this.preferredDeviceId);
      }
    } catch (error) {
      console.warn('[MicPermissions] Could not save preferred device:', error);
    }
  }

  /**
   * Check if we're on a secure origin
   */
  private isSecureOrigin(): boolean {
    // Allow localhost for development
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      return true;
    }

    // Require HTTPS for production
    return location.protocol === 'https:';
  }

  /**
   * Get detailed error message for common permission issues
   */
  getErrorMessage(error: any): string {
    if (!error) return 'Unknown microphone error';

    const errorMessage = error.message || error.name || String(error);

    if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
      return 'Microphone permission denied. Please allow microphone access and try again.';
    }

    if (errorMessage.includes('NotFoundError') || errorMessage.includes('DevicesNotFoundError')) {
      return 'No microphone found. Please connect a microphone and try again.';
    }

    if (errorMessage.includes('NotReadableError') || errorMessage.includes('TrackStartError')) {
      return 'Microphone is busy or unavailable. Please close other applications using the microphone.';
    }

    if (errorMessage.includes('secure origin') || errorMessage.includes('HTTPS')) {
      return 'Microphone access requires a secure connection (HTTPS).';
    }

    if (errorMessage.includes('AbortError')) {
      return 'Microphone access was cancelled. Please try again.';
    }

    return `Microphone error: ${errorMessage}`;
  }

  /**
   * Show permission instructions for different browsers
   */
  getPermissionInstructions(): string {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Chrome')) {
      return 'Click the microphone icon in the address bar and select "Allow".';
    }

    if (userAgent.includes('Firefox')) {
      return 'Click "Allow" when prompted, or click the microphone icon in the address bar.';
    }

    if (userAgent.includes('Safari')) {
      return 'Go to Safari > Settings for This Website > Microphone > Allow.';
    }

    if (userAgent.includes('Edge')) {
      return 'Click "Allow" when prompted, or click the microphone icon in the address bar.';
    }

    return 'Please allow microphone access when prompted by your browser.';
  }
}