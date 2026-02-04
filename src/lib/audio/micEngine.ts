import { supabase } from '@/integrations/supabase/client';
import { enqueueMetric } from '@/lib/metrics';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as CapacitorSpeechRecognition } from '@capacitor-community/speech-recognition';
import { microphoneGuardian } from '@/services/MicrophoneGuardian';

// ============= iOS PLATFORM DETECTION =============
// iOS Safari does NOT support Web Speech API - must use Capacitor or fallback
const isIOSSafari = (): boolean => {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isWebkit = /WebKit/.test(ua);
  const isChrome = /CriOS/.test(ua); // Chrome on iOS
  return isIOS && isWebkit && !isChrome;
};

const isIOSDevice = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// ============= CONSTANTS =============
// 🔧 GOD-TIER v17: Increased timeouts for language learners who need time to think
export const INITIAL_SILENCE_MS = 30000; // 30 seconds for initial silence - more time to think before speaking
export const SILENCE_TIMEOUT_MS = 15000; // v36.3: 15 seconds for language learners who pause between words
export const INIT_DELAY_MS = 600;
export const MAX_RETRIES = 4;
export const RETRY_DELAYS = [300, 500, 800, 1200];
export const MAX_SECONDS = 90; // 90 seconds hard maximum
export const BUTTON_DEBOUNCE_MS = 300;

// ============= TYPES =============
export type MicState = 'idle' | 'prompting' | 'initializing' | 'recording' | 'processing';
export type MicResult = { transcript: string; durationSec: number };
export type EngineMode = 'speech-recognition' | 'media-recorder';

// ============= FEATURE FLAGS =============
const getFeatureFlag = (key: string, defaultValue: boolean = false): boolean => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(key)) return urlParams.get(key) === '1';

    // Check localStorage for persistent flags
    try {
      const stored = localStorage.getItem(`speaking_${key}`);
      if (stored !== null) return stored === '1';
    } catch {
      // Silent fail: Safari Private Mode / iOS incognito - use default
    }
  }
  return defaultValue;
};

const USE_FALLBACK = getFeatureFlag('use_fallback');
const DEBUG_MODE = getFeatureFlag('debug');
const ROLLBACK_MODE = getFeatureFlag('rollback');

// ============= INTERNAL STATE =============
let state: MicState = 'idle';
let runId = 0;
let retryCount = 0;
let startTime = 0;
let lastButtonTap = 0;

// 🔧 v27: Module-level callback for force-finishing active recording
// This allows stopRecording() to immediately resolve the promise when user presses stop
let activeFinishCallback: ((transcript: string, reason: string) => void) | null = null;

// References
let recognitionRef: any = null;
let mediaRecorderRef: MediaRecorder | null = null;
let streamRef: MediaStream | null = null;
let audioContextRef: AudioContext | null = null;
let sourceNodeRef: MediaStreamAudioSourceNode | null = null;

// 🔧 GOD-TIER v11: Persistent stream that survives across recordings
// This keeps the green mic indicator ON throughout the conversation
let persistentStreamRef: MediaStream | null = null;
let persistentAudioContextRef: AudioContext | null = null;
let persistentStreamActive = false;

// 🔧 GOD-TIER v12: Prevent concurrent Capacitor listener operations
// This flag ensures Turn 2 waits for Turn 1's cleanup to complete
let capacitorCleanupInProgress = false;

// 🔧 GOD-TIER v13: Request queue prevents race conditions (like unifiedSpeechRecognition.ts)
// This is the EXACT pattern used by Duolingo/Google for bulletproof speech recognition
let capacitorLastStopTime: number = 0;
const CAPACITOR_MIN_RESTART_DELAY_MS = 200; // Android needs 200ms to release native resources!
const CAPACITOR_RESTART_DELAY_MS = 300; // Delay for Android to release resources during auto-restart

// 🔧 v66 BULLETPROOF iOS FIX: Mutex lock to prevent concurrent speech recognition starts
// This prevents "Ongoing speech recognition" error when starting new session while one is running
let speechRecognitionMutex = false;
let cleanupPromise: Promise<void> | null = null;

// Timers
let countdownTimerRef: number | undefined;
let retryTimerRef: number | undefined;
let maxTimerRef: number | undefined;
let ttsTimeoutRef: number | undefined;
let processingWatchdogRef: number | undefined;

// State subscribers
const stateSubscribers: ((state: MicState) => void)[] = [];

// ============= UTILITIES =============
function newRunId(): number {
  return ++runId;
}

function isStale(id: number): boolean {
  return id !== runId;
}

function assertInvariant(condition: boolean, message: string) {
  if (!condition) {
    emitMetrics('invariant_violation', { message });
  }
}

function emitMetrics(phase: string, data: any = {}) {
  try {
    enqueueMetric({ runId, phase, ...data });
  } catch {
    // Silent fail: Metrics are non-critical telemetry
  }
  
  if (DEBUG_MODE) {
    window.dispatchEvent(new CustomEvent('speaking:metrics', { 
      detail: { phase, runId, state, ...data, t: Date.now() }
    }));
  }
}

function debounceButton(): boolean {
  const now = Date.now();
  if (now - lastButtonTap < BUTTON_DEBOUNCE_MS) {
    return true;
  }
  lastButtonTap = now;
  return false;
}

// ============= STATE MANAGEMENT =============
function setState(newState: MicState) {
  const oldState = state;
  
  // State transition validation
  const validTransitions: Record<MicState, MicState[]> = {
    idle: ['prompting', 'initializing'],
    prompting: ['idle', 'initializing'],
    initializing: ['recording', 'idle'],
    recording: ['processing', 'idle'],
    processing: ['idle']
  };
  
  if (!validTransitions[oldState]?.includes(newState)) {
    assertInvariant(false, `Invalid state transition: ${oldState} -> ${newState}`);
  }
  
  state = newState;
  stateSubscribers.forEach(cb => cb(state));
  emitMetrics('state_change', { state_from: oldState, state_to: newState });
  
  // Start processing watchdog when entering processing state
  if (newState === 'processing') {
    startProcessingWatchdog();
  } else if (processingWatchdogRef) {
    clearTimeout(processingWatchdogRef);
    processingWatchdogRef = undefined;
  }
}

// Processing watchdog - prevents stuck "Processing..." state
function startProcessingWatchdog() {
  if (processingWatchdogRef) {
    clearTimeout(processingWatchdogRef);
  }
  
  processingWatchdogRef = window.setTimeout(() => {
    if (state === 'processing') {
      emitMetrics('invariant_violation', { 
        error_kind: 'processing_timeout',
        duration_ms: 8000 
      });
      
      // Show user-visible toast and reset to idle
      showWatchdogToast();
      cleanup();
      setState('idle');
    }
  }, 8000); // 8 seconds timeout
}

// Show watchdog recovery toast using sonner
function showWatchdogToast() {
  if (typeof window !== 'undefined') {
    // Import and use sonner toast dynamically
    import('sonner').then(({ toast }) => {
      toast.error('Processing took too long. Ready to try again.', {
        duration: 4000,
        position: 'top-right'
      });
    }).catch(() => {
      // Fallback to simple DOM toast if sonner fails
      const toastEl = document.createElement('div');
      toastEl.textContent = 'Processing took too long. Ready to try again.';
      toastEl.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: #ff4444; color: white; padding: 12px 16px;
        border-radius: 8px; font-family: system-ui; font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(toastEl);
      setTimeout(() => toastEl.remove(), 4000);
    });
  }
}

export function getState(): MicState {
  return state;
}

export function onState(cb: (state: MicState) => void): () => void {
  stateSubscribers.push(cb);
  return () => {
    const index = stateSubscribers.indexOf(cb);
    if (index >= 0) stateSubscribers.splice(index, 1);
  };
}

// ============= TIMER MANAGEMENT =============
function clearAllTimers() {
  const timers = [countdownTimerRef, retryTimerRef, maxTimerRef, ttsTimeoutRef, processingWatchdogRef];
  const activeCount = timers.filter(t => t !== undefined).length;
  
  if (activeCount > 1) {
    assertInvariant(false, `Multiple active timers: ${activeCount}`);
  }
  
  if (countdownTimerRef) { clearInterval(countdownTimerRef); countdownTimerRef = undefined; }
  if (retryTimerRef) { clearTimeout(retryTimerRef); retryTimerRef = undefined; }
  if (maxTimerRef) { clearTimeout(maxTimerRef); maxTimerRef = undefined; }
  if (ttsTimeoutRef) { clearTimeout(ttsTimeoutRef); ttsTimeoutRef = undefined; }
  if (processingWatchdogRef) { clearTimeout(processingWatchdogRef); processingWatchdogRef = undefined; }
}

// ============= v67 BULLETPROOF iOS: ENSURE CLEAN SLATE WITH TIMEOUTS =============
// This function guarantees a clean state before starting any new speech recognition session
// It prevents the "Ongoing speech recognition" error on iOS by:
// 1. Stopping any existing recognition session
// 2. Removing ALL listeners (prevents listener accumulation)
// 3. Waiting for iOS audio session to settle
// v67: All operations have timeouts to prevent hanging

async function ensureCleanSlate(): Promise<void> {
  const CLEANUP_TIMEOUT = 500; // Never wait more than 500ms

  // v67.2: Track if background cleanup already removed listeners
  let listenersAlreadyRemoved = false;

  // Wait for pending cleanup with timeout
  if (cleanupPromise) {
    try {
      await Promise.race([
        cleanupPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Cleanup timeout')), CLEANUP_TIMEOUT)
        )
      ]);
      // v67.2: If cleanupPromise resolved, listeners were already removed in finish()
      listenersAlreadyRemoved = true;
      console.log('[MicEngine] v67.2: Background cleanup completed, listeners already removed');
    } catch (e) {
      console.warn('[MicEngine] v67: Cleanup timeout, forcing continue');
      cleanupPromise = null; // Clear stale promise
    }
  }

  // Stop with timeout
  try {
    await Promise.race([
      CapacitorSpeechRecognition.stop(),
      new Promise(r => setTimeout(r, 300))
    ]);
    console.log('[MicEngine] v67: Stopped any existing recognition');
  } catch (e) {
    // Expected: might not be running
  }

  // v67.2: CRITICAL FIX - Only remove listeners if background cleanup didn't already do it
  // Calling removeAllListeners() twice corrupts iOS/Android listener registry,
  // causing Turn 2+ to have dead listeners that don't receive events!
  if (!listenersAlreadyRemoved) {
    try {
      await Promise.race([
        CapacitorSpeechRecognition.removeAllListeners(),
        new Promise(r => setTimeout(r, 300))
      ]);
      console.log('[MicEngine] v67.2: Removed all listeners (first time)');
    } catch (e) {
      // Ignore errors
    }
  }

  // iOS needs extra time for audio session to settle between mode switches
  // This prevents "AudioSession::beginInterruption but session is already interrupted!" error
  if (Capacitor.getPlatform() === 'ios') {
    console.log('[MicEngine] v67.2: iOS audio session settling (150ms)...');
    await new Promise(r => setTimeout(r, 150));
  } else {
    // Android also benefits from a small delay
    await new Promise(r => setTimeout(r, 50));
  }

  console.log('[MicEngine] v67.2: Clean slate ready');
}

// ============= AUDIO CONTEXT MANAGEMENT =============
async function ensureAudioContext(): Promise<void> {
  if (!audioContextRef) {
    // iOS requires specific sample rate
    const isIOS = isIOSDevice();
    audioContextRef = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: isIOS ? 44100 : 48000,
      latencyHint: 'interactive',
    });
  }

  // iOS suspends AudioContext by default - must resume on user gesture
  if (audioContextRef.state === 'suspended') {
    try {
      await audioContextRef.resume();
      // iOS needs extra time after resume
      if (isIOSDevice()) {
        await new Promise(r => setTimeout(r, 100));
      }
    } catch (e) {
      console.warn('[MicEngine] AudioContext resume failed:', e);
    }
  }
}

function attachStreamToContext(stream: MediaStream) {
  if (!audioContextRef || !stream) return;
  
  try {
    // Create source node but don't connect to destination (no echo)
    sourceNodeRef = audioContextRef.createMediaStreamSource(stream);
    
    // On iOS, connecting to a muted gain node helps with processing
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const gainNode = audioContextRef.createGain();
      gainNode.gain.value = 0; // Muted
      sourceNodeRef.connect(gainNode);
    }

  } catch (error) {
    // Apple Store Compliance: Silent fail - Graceful degradation
  }
}

// ============= CLEANUP =============
function cleanupResources() {
  
  clearAllTimers();
  
  // Cancel TTS - silent fail: synthesis may not be active
  try { window?.speechSynthesis?.cancel(); } catch { /* Expected: synthesis may not be active */ }
  
  // Stop recognition - silent fail: may already be stopped
  if (recognitionRef) {
    try { recognitionRef.stop(); } catch { /* Expected: recognition may already be stopped */ }
    recognitionRef = null;
  }
  
  // Stop media recorder - silent fail: may already be stopped
  if (mediaRecorderRef) {
    try { mediaRecorderRef.stop(); } catch { /* Expected: recorder may already be stopped */ }
    mediaRecorderRef = null;
  }
  
  // 🔧 GOD-TIER v11: Skip stream/AudioContext cleanup if persistent stream is active
  // This keeps the green mic indicator ON between conversation turns
  if (!persistentStreamActive) {
    // Stop stream (only when not in persistent mode)
    if (streamRef) {
      streamRef.getTracks().forEach(track => {
        track.stop();
      });
      streamRef = null;
    }

    // Cleanup audio context - silent fail: may already be disconnected
    if (sourceNodeRef) {
      try { sourceNodeRef.disconnect(); } catch { /* Expected: node may already be disconnected */ }
      sourceNodeRef = null;
    }

    // 🔧 FIX BUG #27: Properly close AudioContext to prevent memory leak
    // Close instead of just suspending - create new context if needed later
    if (audioContextRef) {
      try {
        if (audioContextRef.state !== 'closed') {
          audioContextRef.close();
        }
      } catch (e) {
        // Ignore errors during cleanup
      }
      audioContextRef = null;
    }
  } else {
    console.log('[MicEngine] 🎤 Skipping stream cleanup - persistent stream active');
  }

}

// ============= GOD-TIER v11: PERSISTENT STREAM MANAGEMENT =============
// Industry-standard pattern used by Google Assistant, Siri, Duolingo
// Keeps mic stream alive across conversation turns - green indicator stays ON

/**
 * Acquire a persistent microphone stream that stays alive across recordings.
 * Call this ONCE when conversation starts. Stream is reused for all turns.
 */
export async function acquirePersistentStream(): Promise<MediaStream> {
  // If we already have an active persistent stream, reuse it
  if (persistentStreamRef && persistentStreamRef.active) {
    console.log('[MicEngine] 🎤 Reusing existing persistent stream');
    persistentStreamActive = true;
    return persistentStreamRef;
  }

  console.log('[MicEngine] 🎤 Acquiring NEW persistent stream...');

  try {
    // Acquire new stream - this turns ON the green mic indicator
    persistentStreamRef = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });

    // Create persistent AudioContext (reusable across recordings)
    if (!persistentAudioContextRef || persistentAudioContextRef.state === 'closed') {
      persistentAudioContextRef = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Resume if suspended
    if (persistentAudioContextRef.state === 'suspended') {
      await persistentAudioContextRef.resume();
    }

    persistentStreamActive = true;
    console.log('[MicEngine] 🎤 Persistent stream acquired - GREEN INDICATOR ON');
    emitMetrics('persistent_stream_acquired');

    return persistentStreamRef;
  } catch (error) {
    console.error('[MicEngine] Failed to acquire persistent stream:', error);
    persistentStreamActive = false;
    throw error;
  }
}

/**
 * Release the persistent stream - call this ONLY when conversation ends.
 * This turns OFF the green mic indicator.
 */
export function releasePersistentStream(): void {
  console.log('[MicEngine] 🎤 Releasing persistent stream...');

  // Stop all tracks on the persistent stream
  if (persistentStreamRef) {
    persistentStreamRef.getTracks().forEach(track => {
      track.stop();
    });
    persistentStreamRef = null;
  }

  // Close persistent AudioContext
  if (persistentAudioContextRef) {
    try {
      if (persistentAudioContextRef.state !== 'closed') {
        persistentAudioContextRef.close();
      }
    } catch (e) {
      // Ignore errors during cleanup
    }
    persistentAudioContextRef = null;
  }

  persistentStreamActive = false;
  console.log('[MicEngine] 🎤 Persistent stream released - GREEN INDICATOR OFF');
  emitMetrics('persistent_stream_released');
}

/**
 * Check if persistent stream is active
 */
export function isPersistentStreamActive(): boolean {
  return persistentStreamActive && persistentStreamRef !== null && persistentStreamRef.active;
}

/**
 * Get the persistent stream (for use by speech recognition)
 */
export function getPersistentStream(): MediaStream | null {
  return persistentStreamRef;
}

/**
 * Get the persistent AudioContext (for use by audio processing)
 */
export function getPersistentAudioContext(): AudioContext | null {
  return persistentAudioContextRef;
}

// ============= SPEECH RECOGNITION ENGINE (WEB ONLY) =============
async function startSpeechRecognition(id: number, maxSec: number): Promise<string> {
  // Note: Capacitor check is now in internalStart() - this function is web-only
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error('SpeechRecognition not supported');
    }
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognitionRef = new SpeechRecognition();
    
    recognitionRef.continuous = true;
    recognitionRef.interimResults = true; // Enable interim results for live captions
    recognitionRef.lang = 'en-US';
    recognitionRef.maxAlternatives = 1;
    
    let finalTranscript = '';
    let interimTranscript = '';
    let hasStarted = false;
    let hasSpeech = false;
    let isFinished = false;
    
    // Initial silence timer
    const silenceTimer = setTimeout(() => {
      if (!hasSpeech && !isFinished) {
        finish('');
      }
    }, INITIAL_SILENCE_MS);
    
    function finish(transcript: string) {
      if (isFinished || isStale(id)) return;
      isFinished = true;
      
      clearTimeout(silenceTimer);
      try { recognitionRef?.stop(); } catch { /* Expected: recognition may already be stopped */ }

      resolve(transcript.trim());
    }
    
    recognitionRef.onstart = () => {
      if (isStale(id)) return;
      hasStarted = true;
      setState('recording');
    };
    
    recognitionRef.onspeechstart = () => {
      if (isStale(id)) return;
      hasSpeech = true;
      clearTimeout(silenceTimer);
    };
    
    recognitionRef.onresult = (event: any) => {
      if (isStale(id)) return;
      
      let interimText = '';
      let finalText = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcript;
        } else {
          interimText += transcript;
        }
      }
      
      // Update transcripts
      if (finalText) {
        finalTranscript += finalText;
      }
      if (interimText) {
        interimTranscript = interimText;
        // Emit interim result event for live captions
        window.dispatchEvent(new CustomEvent('speech:interim', { 
          detail: { transcript: interimText }
        }));
      }
      
    };
    
    recognitionRef.onend = () => {
      if (isStale(id)) return;

      // 🔧 v26: Always finish when recognition ends - don't gate on hasStarted
      // This ensures stopRecording() properly resolves the promise
      // The finish() function already has isFinished guard to prevent double resolution
      finish(finalTranscript);
    };
    
    recognitionRef.onerror = (event: any) => {
      if (isStale(id)) return;
      
      clearTimeout(silenceTimer);
      
      if (event.error === 'no-speech') {
        finish('');
      } else if (event.error === 'network') {
        reject(new Error('Network error. Please check your connection.'));
      } else if (event.error === 'not-allowed') {
        reject(new Error('Microphone access denied. Allow mic in Settings.'));
      } else {
        reject(new Error('Speech recognition problem. Please try again.'));
      }
    };
    
    try {
      recognitionRef.start();
    } catch (error) {
      clearTimeout(silenceTimer);
      reject(error);
    }
  });
}

// ============= CAPACITOR SPEECH RECOGNITION (ANDROID/iOS) =============
// 🎯 BULLETPROOF VERSION v66 - Handles iOS "Ongoing speech recognition" error
async function startCapacitorSpeechRecognition(id: number, maxSec: number): Promise<string> {
  console.log('[CapacitorSpeech] ========== STARTING v66 ==========');

  // 🔧 v66 BULLETPROOF: Mutex check - prevent concurrent start attempts
  if (speechRecognitionMutex) {
    console.log('[CapacitorSpeech] v66: Already starting, waiting for mutex...');
    // Wait for current operation to complete
    let attempts = 0;
    while (speechRecognitionMutex && attempts < 20) {
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }
    if (speechRecognitionMutex) {
      console.error('[CapacitorSpeech] v66: Mutex timeout - forcing release');
      speechRecognitionMutex = false;
    }
  }

  // Acquire mutex
  speechRecognitionMutex = true;
  console.log('[CapacitorSpeech] v66: Mutex acquired');

  // 🔧 GOD-TIER v14: Force reset state to ensure clean start
  // This prevents "state stuck" issues from blocking Turn 2+
  if (state !== 'idle' && state !== 'initializing') {
    console.warn(`[CapacitorSpeech] ⚠️ v14: State was "${state}", forcing to idle for Turn 2+`);
    state = 'idle';
  }

  // 🔧 v66 BULLETPROOF: ALWAYS ensure clean slate before starting
  // This is the KEY fix for iOS "Ongoing speech recognition" error
  try {
    await ensureCleanSlate();
  } catch (e) {
    console.warn('[CapacitorSpeech] v66: ensureCleanSlate error (continuing):', e);
  }

  return new Promise(async (resolve, reject) => {
    let transcript = '';
    let isFinished = false;
    let hasStarted = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let silenceTimeoutId: ReturnType<typeof setTimeout> | null = null;

    // 🎯 v41 ULTRA GOD-TIER: Auto-restart tracking with proper state management
    let restartCount = 0;
    const MAX_RESTARTS = 10; // Allow up to 10 pauses (language learners pause a lot!)
    let lastSpeechTime = Date.now(); // Track when user last spoke
    let isRestartInProgress = false; // v41: Prevent concurrent restart attempts

    const cleanup = async () => {
      console.log('[CapacitorSpeech] Cleanup...');
      if (timeoutId) clearTimeout(timeoutId);
      if (silenceTimeoutId) clearTimeout(silenceTimeoutId);

      // Stop recognition - but DON'T remove listeners yet (they might have pending events)
      try {
        await CapacitorSpeechRecognition.stop();
      } catch (e) { /* ignore */ }
      // NOTE: removeAllListeners is called in finish() BEFORE resolve (GOD-TIER v12)
    };

    const finish = async (result: string, reason: string) => {
      if (isFinished || isStale(id)) return;
      // 🔧 v27: Use closure transcript if external call passes empty result
      // This allows stopRecording() to finish with the current transcript
      const finalResult = result || transcript;
      console.log(`[CapacitorSpeech] FINISH: "${finalResult}" (${reason})`);
      isFinished = true;
      activeFinishCallback = null; // 🔧 v27: Clear callback so stopRecording() doesn't double-finish

      // 🔧 v33: RESOLVE FIRST! Then cleanup (cleanup can hang on Android)
      // This is the same pattern we use in stopRecording() - callback BEFORE stop
      // The promise must resolve immediately so the UI can continue
      capacitorLastStopTime = Date.now();
      resolve(finalResult.trim());  // <-- RESOLVE IMMEDIATELY!

      // Now do cleanup in background (non-blocking)
      // If this hangs, it doesn't matter - promise already resolved
      cleanupPromise = (async () => {
        try {
          capacitorCleanupInProgress = true;
          await cleanup();
          await CapacitorSpeechRecognition.removeAllListeners();
          console.log('[CapacitorSpeech] v67.2: Cleanup completed after resolve (listeners removed)');
        } catch (e) {
          console.log('[CapacitorSpeech] Cleanup error (safe - promise already resolved):', e);
        } finally {
          capacitorCleanupInProgress = false;
          // 🔧 v66: Release mutex AFTER cleanup completes
          speechRecognitionMutex = false;
          console.log('[CapacitorSpeech] v67.2: Mutex released');
        }
      })();
    };

    // 🔧 v27: Store the finish callback so stopRecording() can force-finish
    activeFinishCallback = finish;

    try {
      // Step 1: Check availability
      const { available } = await CapacitorSpeechRecognition.available();
      console.log('[CapacitorSpeech] Available:', available);
      if (!available) {
        // 🔧 v66: Release mutex on early return
        speechRecognitionMutex = false;
        reject(new Error('Speech recognition not available'));
        return;
      }

      // Step 2: Request permissions
      const permResult = await CapacitorSpeechRecognition.requestPermissions();
      console.log('[CapacitorSpeech] Permission:', permResult.speechRecognition);
      if (permResult.speechRecognition !== 'granted') {
        // 🔧 v66: Release mutex on early return
        speechRecognitionMutex = false;
        reject(new Error('Microphone access denied'));
        return;
      }

      // 🔧 GOD-TIER v13: Enforce minimum 200ms delay since last stop (Android requirement)
      // This is the EXACT pattern used by Duolingo/Google - DO NOT call removeAllListeners() here!
      // Calling it twice corrupts Android's SpeechRecognizer listener registry.
      const elapsed = Date.now() - capacitorLastStopTime;
      if (capacitorLastStopTime > 0 && elapsed < CAPACITOR_MIN_RESTART_DELAY_MS) {
        const waitTime = CAPACITOR_MIN_RESTART_DELAY_MS - elapsed;
        console.log(`[CapacitorSpeech] 🔧 v13: Waiting ${waitTime}ms for Android cleanup...`);
        await new Promise(r => setTimeout(r, waitTime));
      }
      console.log('[CapacitorSpeech] Android cleanup delay completed, ready to add listeners');

      // Step 4: Add partialResults listener - HANDLE BOTH ARRAY AND STRING
      await CapacitorSpeechRecognition.addListener('partialResults', (data: any) => {
        console.log('[CapacitorSpeech] partialResults:', JSON.stringify(data));
        // 🎯 GOD-TIER FIX: Only exit on stale, NOT on isFinished
        // Allow late results to update transcript even after stop initiated
        if (isStale(id)) return;

        // 🎯 CRITICAL FIX: Handle both array and string formats from Android
        let newTranscript = '';
        if (data.matches) {
          if (Array.isArray(data.matches) && data.matches.length > 0) {
            newTranscript = data.matches[0];
          } else if (typeof data.matches === 'string') {
            newTranscript = data.matches;
          }
        } else if (data.value) {
          // Some Android versions use 'value' instead of 'matches'
          newTranscript = Array.isArray(data.value) ? data.value[0] : data.value;
        }

        if (newTranscript) {
          transcript = newTranscript;
          lastSpeechTime = Date.now(); // 🎯 v39: Track when user last spoke
          console.log('[CapacitorSpeech] Transcript:', transcript);

          // Reset silence timeout on speech
          if (silenceTimeoutId) clearTimeout(silenceTimeoutId);
          silenceTimeoutId = setTimeout(() => {
            if (!isFinished && transcript) {
              finish(transcript, 'silence_after_speech');
            }
          }, SILENCE_TIMEOUT_MS);

          // Emit interim event for live captions
          window.dispatchEvent(new CustomEvent('speech:interim', {
            detail: { transcript }
          }));
        }
      });

      // Step 5: Add listeningState listener - HANDLE ALL STATES
      await CapacitorSpeechRecognition.addListener('listeningState', (data: any) => {
        console.log('[CapacitorSpeech] listeningState:', JSON.stringify(data));
        if (isStale(id) || isFinished) return;

        // 🎯 CRITICAL FIX: Handle 'started' status too
        if (data.status === 'started') {
          hasStarted = true;
          console.log('[CapacitorSpeech] ✓ Recording STARTED');
        } else if (data.status === 'stopped') {
          // 🎯 v41 ULTRA GOD-TIER: Complete rewrite of auto-restart with proper state management
          // Fixes: race conditions, duplicate restarts, stale timeouts, infinite loops
          console.log('[CapacitorSpeech] Recording STOPPED, transcript so far:', transcript);

          // Guard: Already finished or restart in progress
          if (isFinished || isRestartInProgress) {
            console.log('[CapacitorSpeech] v41: Skipping - isFinished:', isFinished, 'isRestartInProgress:', isRestartInProgress);
            return;
          }

          // Check if user has been silent for too long (genuinely done speaking)
          const timeSinceLastSpeech = Date.now() - lastSpeechTime;
          if (timeSinceLastSpeech > 10000) {
            console.log('[CapacitorSpeech] v41: Extended silence (10s+), finishing');
            finish(transcript, 'extended_silence');
            return;
          }

          // Check restart limit
          if (restartCount >= MAX_RESTARTS) {
            console.log('[CapacitorSpeech] v41: Max restarts reached, finishing');
            finish(transcript, 'max_restarts_reached');
            return;
          }

          // v41: Use async IIFE with proper state tracking (no setTimeout race conditions)
          (async () => {
            // Set restart flag IMMEDIATELY to prevent concurrent restarts
            isRestartInProgress = true;
            const savedTranscript = transcript;
            restartCount++;
            console.log(`[CapacitorSpeech] v41: Auto-restart #${restartCount}/${MAX_RESTARTS}...`);

            // v41 CRITICAL: Clear existing silence timeout before restart
            if (silenceTimeoutId) {
              clearTimeout(silenceTimeoutId);
              silenceTimeoutId = null;
            }

            try {
              // Stop current session
              await CapacitorSpeechRecognition.stop();

              // Check if user stopped during our await
              if (isFinished) {
                console.log('[CapacitorSpeech] v41: User stopped during restart, aborting');
                isRestartInProgress = false;
                return;
              }

              // Wait for Android to release resources
              await new Promise(r => setTimeout(r, CAPACITOR_RESTART_DELAY_MS));

              // Check again after delay
              if (isFinished) {
                console.log('[CapacitorSpeech] v41: User stopped during delay, aborting');
                isRestartInProgress = false;
                return;
              }

              // Restart recognition
              await CapacitorSpeechRecognition.start({
                language: 'en-US',
                maxResults: 5,
                prompt: 'Continue speaking',
                partialResults: true,
                popup: false
              });

              // v41 CRITICAL: Update lastSpeechTime for new session
              lastSpeechTime = Date.now();

              // Preserve saved transcript (with space for continuation)
              transcript = savedTranscript ? savedTranscript + ' ' : '';
              console.log('[CapacitorSpeech] v41: Restart #' + restartCount + ' successful');

            } catch (restartError) {
              console.log('[CapacitorSpeech] v41: Restart failed:', restartError);
              if (!isFinished) {
                finish(savedTranscript, 'restart_failed');
              }
            } finally {
              // Always clear restart flag
              isRestartInProgress = false;
            }
          })();
        }
      });

      // Step 6: ADD ERROR LISTENER - CRITICAL FOR DEBUGGING
      await CapacitorSpeechRecognition.addListener('error', (data: any) => {
        console.error('[CapacitorSpeech] ERROR EVENT:', JSON.stringify(data));
        if (!isFinished) {
          // Don't reject - just finish with empty string
          finish('', 'error_event');
        }
      });

      // Step 7: Small delay for listeners to register
      // 🎯 v42: Increased from 300ms to 500ms - Android hardware needs more init time
      await new Promise(r => setTimeout(r, 500));

      // Step 8: START RECOGNITION
      console.log('[CapacitorSpeech] Calling start()...');
      setState('recording');

      await CapacitorSpeechRecognition.start({
        language: 'en-US',
        maxResults: 5,
        prompt: 'Speak now',
        partialResults: true,
        popup: false
      });

      // 🔧 GOD-TIER v14: Explicit confirmation that mic started
      console.log('[CapacitorSpeech] ✅ v14: MIC CONFIRMED STARTED - Now listening!');

      // Step 9: Initial silence timeout (if no speech detected)
      silenceTimeoutId = setTimeout(() => {
        if (!isFinished && !transcript) {
          console.log('[CapacitorSpeech] Initial silence - no speech');
          finish('', 'initial_silence');
        }
      }, INITIAL_SILENCE_MS);

      // Step 10: Max duration timeout
      timeoutId = setTimeout(() => {
        if (!isFinished) {
          console.log('[CapacitorSpeech] Max timeout reached');
          finish(transcript, 'max_timeout');
        }
      }, maxSec * 1000);

    } catch (error: any) {
      console.error('[CapacitorSpeech] CRITICAL ERROR:', error);
      await cleanup();
      // 🔧 v66: Release mutex on error
      speechRecognitionMutex = false;
      console.log('[CapacitorSpeech] v66: Mutex released (error path)');
      reject(new Error(error.message || 'Speech recognition failed'));
    }
  });
}

// ============= MEDIA RECORDER FALLBACK =============
async function startMediaRecorder(id: number, maxSec: number): Promise<string> {
  if (!streamRef) throw new Error('No stream available');
  
  return new Promise((resolve, reject) => {
    const chunks: Blob[] = [];
    let isFinished = false;
    
    function finish(transcript: string) {
      if (isFinished || isStale(id)) return;
      isFinished = true;
      resolve(transcript);
    }
    
    try {
      mediaRecorderRef = new MediaRecorder(streamRef, { mimeType: 'audio/webm' });
      
      mediaRecorderRef.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      
      mediaRecorderRef.onstop = async () => {
        if (isFinished || isStale(id)) return;
        
        try {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          
          const { data, error } = await supabase.functions.invoke('transcribe', {
            body: formData,
          });
          
          if (error) throw new Error('Transcription failed');
          
          const transcript = data?.transcript || '';
          finish(transcript);
          
        } catch (error: any) {
          reject(new Error('There was a problem analyzing your speech. Please try again.'));
        }
      };
      
      mediaRecorderRef.onerror = (event: any) => {
        reject(new Error('Recording failed. Please try again.'));
      };
      
      mediaRecorderRef.start(100);
      setState('recording');
      
    } catch (error) {
      reject(error);
    }
  });
}

// ============= MAIN ENGINE =============
async function internalStart(id: number, maxSec: number): Promise<MicResult> {
  // 🎯 iOS/ANDROID FIX: On native platforms, try Capacitor first, fallback to MediaRecorder + Whisper
  if (Capacitor.isNativePlatform()) {
    const platform = Capacitor.getPlatform();
    console.log('[MicEngine] ===== NATIVE PLATFORM DETECTED =====', platform);

    // 🎯 iOS: Always request permission first before checking availability
    if (platform === 'ios') {
      try {
        const permResult = await CapacitorSpeechRecognition.requestPermissions();
        console.log('[MicEngine] iOS permission result:', permResult);

        if (permResult.speechRecognition !== 'granted') {
          console.warn('[MicEngine] iOS speech permission denied, using fallback');
          emitMetrics('engine_start', { mode: 'whisper-fallback-ios-denied', maxSec });
          // Fall through to web path below
        }
      } catch (permError) {
        console.error('[MicEngine] iOS permission request failed:', permError);
        // Fall through to web path below
      }
    }

    // 🎯 EMULATOR FIX: Check if speech recognition is actually available
    try {
      const { available } = await CapacitorSpeechRecognition.available();
      console.log('[MicEngine] Speech recognition available:', available);

      if (available) {
        // Native speech recognition IS available - use Capacitor (fast path)
        console.log('[MicEngine] Using Capacitor speech recognition');
        emitMetrics('engine_start', { mode: 'capacitor-native', maxSec, platform });

        try {
          // Cancel any ongoing TTS
          try { window?.speechSynthesis?.cancel(); } catch { /* ignore */ }

          setState('initializing');
          startTime = Date.now();
          console.log('[MicEngine] State set to initializing, calling startCapacitorSpeechRecognition...');

          // Use Capacitor speech recognition directly - NO getUserMedia needed
          const transcript = await startCapacitorSpeechRecognition(id, maxSec);

          console.log('[MicEngine] Capacitor speech recognition returned:', transcript || '(empty)');
          const durationSec = (Date.now() - startTime) / 1000;
          setState('processing');

          emitMetrics('recording_complete', { transcript: transcript.substring(0, 50), durationSec });

          return { transcript: transcript.trim(), durationSec };

        } catch (error: any) {
          console.error('[MicEngine] NATIVE ERROR:', error);
          emitMetrics('recording_error', { error: error.message });

          if (error.message?.includes('denied') || error.name === 'NotAllowedError') {
            throw new Error('Microphone access denied. Allow mic in Settings.');
          }
          throw error;
        }
      } else {
        // 🎯 EMULATOR/NO-GOOGLE-SERVICES: Fall through to MediaRecorder + Whisper
        console.log('[MicEngine] ⚠️ Native speech NOT available (emulator or no Google Services)');
        console.log('[MicEngine] Falling back to MediaRecorder + Whisper API');
        emitMetrics('engine_start', { mode: 'whisper-fallback', maxSec });
        // Fall through to web path below
      }
    } catch (availabilityError) {
      // Availability check failed - fall back to MediaRecorder + Whisper
      console.log('[MicEngine] ⚠️ Availability check failed:', availabilityError);
      console.log('[MicEngine] Falling back to MediaRecorder + Whisper API');
      emitMetrics('engine_start', { mode: 'whisper-fallback-error', maxSec });
      // Fall through to web path below
    }
  }

  // ============= WEB ONLY BELOW THIS LINE =============
  // iOS Safari NEVER supports Web Speech API - always use MediaRecorder + Whisper fallback
  const isIOSWeb = isIOSSafari();
  const engineMode: EngineMode = USE_FALLBACK || isIOSWeb || !('webkitSpeechRecognition' in window)
    ? 'media-recorder'
    : 'speech-recognition';

  // Log for debugging
  console.log('[MicEngine] Platform:', { isIOSWeb, engineMode });

  emitMetrics('engine_start', { mode: engineMode, maxSec });

  try {
    // Cancel any ongoing TTS - silent fail: synthesis may not be active
    try { window?.speechSynthesis?.cancel(); } catch { /* Expected: synthesis may not be active */ }

    setState('initializing');
    startTime = Date.now();

    // Resume audio context on user gesture
    await ensureAudioContext();

    // iOS Safari compatibility delay
    await new Promise(resolve => setTimeout(resolve, INIT_DELAY_MS));

    if (isStale(id)) throw new Error('Operation cancelled');

    // Request microphone with iOS-optimized settings
    const isIOS = isIOSDevice();
    streamRef = await navigator.mediaDevices.getUserMedia({
      audio: isIOS ? {
        // iOS-optimized settings - iOS ignores sampleRate/channelCount constraints
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      } : {
        sampleRate: 44100,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });

    attachStreamToContext(streamRef);

    if (isStale(id)) throw new Error('Operation cancelled');

    // Set max timer
    maxTimerRef = window.setTimeout(() => {
      if (!isStale(id)) {
        stopRecording();
      }
    }, maxSec * 1000);

    // Start appropriate engine
    let transcript: string;
    if (engineMode === 'speech-recognition') {
      transcript = await startSpeechRecognition(id, maxSec);
    } else {
      transcript = await startMediaRecorder(id, maxSec);
    }

    const durationSec = (Date.now() - startTime) / 1000;
    setState('processing');

    emitMetrics('recording_complete', { transcript: transcript.substring(0, 50), durationSec });

    return { transcript: transcript.trim(), durationSec };

  } catch (error: any) {
    emitMetrics('recording_error', { error: error.message });

    // 🔧 FIX BUG #25: CRITICAL - Stop mic stream immediately on error (privacy violation fix)
    if (streamRef) {
      streamRef.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          // Ignore errors during emergency cleanup
        }
      });
      streamRef = null;
    }

    if (error.message?.includes('denied') || error.name === 'NotAllowedError') {
      throw new Error('Microphone access denied. Allow mic in Settings.');
    }
    throw error;
  }
}

// ============= PUBLIC API =============
export async function startRecording(opts: { maxSec?: number; bypassDebounce?: boolean } = {}): Promise<MicResult> {
  // 🎯 ULTIMATE FIX: Allow bypassing debounce for internal retries
  if (!opts.bypassDebounce && debounceButton()) return Promise.reject(new Error('Button debounced'));

  // 🎯 v45 ULTRA GOD-TIER: Enforce minimum delay between Capacitor sessions
  // This MUST be checked here, not just in startCapacitorSpeechRecognition()
  // Without this, Turn 2+ fails because Android's SpeechRecognizer listener registry corrupts
  if (Capacitor.isNativePlatform()) {
    const elapsed = Date.now() - capacitorLastStopTime;
    if (capacitorLastStopTime > 0 && elapsed < CAPACITOR_MIN_RESTART_DELAY_MS) {
      const waitTime = CAPACITOR_MIN_RESTART_DELAY_MS - elapsed;
      console.log(`[startRecording] v45: Waiting ${waitTime}ms for Android cleanup...`);
      await new Promise(r => setTimeout(r, waitTime));
    }
  }

  // 🔧 GOD-TIER v15: Force reset stuck state instead of throwing
  // This is the ONLY place that can fix Turn 2+ failures
  // v14 failed because the reset was AFTER this check - it never ran!
  if (state !== 'idle' && state !== 'prompting') {
    console.warn(`[MicEngine] ⚠️ v15: State was "${state}", forcing to idle for Turn 2+`);
    state = 'idle';
    // DON'T throw - continue with recording
  }

  // 🔧 PRODUCTION FIX: Pre-flight check via MicrophoneGuardian for bulletproof reliability
  try {
    const preflight = await microphoneGuardian.preflightCheck();
    if (!preflight.ready) {
      emitMetrics('preflight_failed', { status: preflight.status });
      throw new Error(preflight.userMessage || 'Microphone not ready');
    }
  } catch (preflightError: any) {
    // If guardian check itself fails, log but continue (don't block recording)
    emitMetrics('preflight_error', { error: preflightError.message });
    // Re-throw if it's an actual "not ready" error
    if (preflightError.message?.includes('not ready') || preflightError.message?.includes('Microphone')) {
      throw preflightError;
    }
  }

  const id = newRunId();
  const maxSec = opts.maxSec || MAX_SECONDS;

  try {
    const result = await internalStart(id, maxSec);
    
    // Auto-retry logic for empty transcripts
    if (!result.transcript && retryCount < MAX_RETRIES) {
      retryCount++;
      
      setState('idle');
      
      return new Promise((resolve, reject) => {
        retryTimerRef = window.setTimeout(async () => {
          if (!isStale(id)) {
            try {
              const retryResult = await internalStart(newRunId(), maxSec);
              setState('idle');
              retryCount = 0;
              resolve(retryResult);
            } catch (retryError) {
              setState('idle');
              retryCount = 0;
              reject(retryError);
            }
          }
        }, RETRY_DELAYS[retryCount - 1]);
      });
    }
    
    setState('idle');
    retryCount = 0;
    
    // If still empty after retries
    if (!result.transcript) {
      throw new Error('No speech detected. Please try again.');
    }
    
    emitMetrics('recording_success', { transcript_length: result.transcript.length });
    return result;
    
  } catch (error: any) {
    setState('idle');
    retryCount = 0;
    throw error;
  }
  // 🔧 GOD-TIER v11: REMOVED finally { cleanupResources() }
  // Stream now stays alive across turns - green indicator stays ON
  // Only releasePersistentStream() should stop the mic (when conversation ends)
}

export async function stopRecording(): Promise<void> {

  // Stop web speech recognition
  if (recognitionRef) {
    try { recognitionRef.stop(); } catch { /* Expected: recognition may already be stopped */ }
  }

  // Stop media recorder
  if (mediaRecorderRef && mediaRecorderRef.state === 'recording') {
    try { mediaRecorderRef.stop(); } catch { /* Expected: recorder may already be stopped */ }
  }

  // 🎯 CRITICAL: Stop Capacitor speech recognition on native platforms!
  if (Capacitor.isNativePlatform()) {
    try {
      // 🔧 v28: Call callback FIRST - ensures promise resolves even if stop() hangs
      // Android's CapacitorSpeechRecognition.stop() can hang indefinitely
      // By calling the callback first, we guarantee the UI responds immediately
      if (activeFinishCallback) {
        console.log('[MicEngine] v30: Force-finishing via callback BEFORE stop');
        const cb = activeFinishCallback;
        activeFinishCallback = null; // Clear to prevent race conditions/double-calls
        await cb('', 'manual_stop'); // 🔧 v30: AWAIT the async callback so promise resolves!
      }

      // Now stop Capacitor (may hang, but promise already resolved above)
      await CapacitorSpeechRecognition.stop();
      console.log('[MicEngine] Capacitor speech recognition stopped');
    } catch (e) {
      // Expected: may already be stopped or not started
      console.log('[MicEngine] Capacitor stop error:', e);
    }
  }

  emitMetrics('recording_stopped');
}

export function cleanup(): void {
  runId = 0;
  retryCount = 0;
  cleanupResources();
  setState('idle');
  emitMetrics('cleanup_complete');
}

// ============= DIAGNOSTICS =============
export function getDiagnostics() {
  return {
    state,
    runId,
    retryCount,
    timers: {
      countdown: countdownTimerRef !== undefined,
      retry: retryTimerRef !== undefined,
      max: maxTimerRef !== undefined,
      tts: ttsTimeoutRef !== undefined,
      processing_watchdog: processingWatchdogRef !== undefined,
    },
    features: {
      USE_FALLBACK,
      DEBUG_MODE,
      ROLLBACK_MODE,
    },
    engine: USE_FALLBACK || !('webkitSpeechRecognition' in window) 
      ? 'media-recorder' 
      : 'speech-recognition',
  };
}

// ============= INITIALIZATION =============
if (typeof window !== 'undefined') {
  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);

  // Visibility watchdog - cleanup when returning from background
  window.addEventListener('visibilitychange', () => {
    if (document.hidden && state !== 'idle') {
      emitMetrics('visibility_cleanup', { state });
      cleanup();
    } else if (!document.hidden && state !== 'idle') {
      emitMetrics('visibility_recovery', { state });
      cleanup();
    }
  });

  // v67: Handle iOS audio interruptions (phone calls, Siri, etc.)
  if (Capacitor.getPlatform() === 'ios') {
    // Listen for audio session interruption events
    document.addEventListener('pause', () => {
      console.log('[MicEngine] v67: iOS audio interrupted (pause event)');
      // Force stop recording
      stopRecording().catch(() => {});
    });

    document.addEventListener('resume', () => {
      console.log('[MicEngine] v67: iOS audio resumed');
      // Reset audio state - ensureCleanSlate now has timeouts
      ensureCleanSlate().catch(() => {});
    });
  }
  
  // Debug overlay
  if (DEBUG_MODE) {
    const overlay = document.createElement('div');
    overlay.id = 'speaking-debug';
    overlay.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 9999;
      background: rgba(0,0,0,0.8); color: white; padding: 10px;
      font-family: monospace; font-size: 12px; border-radius: 4px;
    `;
    document.body.appendChild(overlay);
    
    setInterval(() => {
      const diag = getDiagnostics();
      overlay.textContent = JSON.stringify(diag, null, 2);
    }, 100);
  }
  
}