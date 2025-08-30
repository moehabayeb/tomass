import { supabase } from '@/integrations/supabase/client';
import { enqueueMetric } from '@/lib/metrics';

// ============= CONSTANTS =============
export const INITIAL_SILENCE_MS = 20000; // 20 seconds for initial silence detection - allows thinking time
export const SILENCE_TIMEOUT_MS = 5000; // 5 seconds of silence to stop recording - allows thinking pauses
export const INIT_DELAY_MS = 600;
export const MAX_RETRIES = 2;
export const RETRY_DELAYS = [400, 800];
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
    const stored = localStorage.getItem(`speaking_${key}`);
    if (stored !== null) return stored === '1';
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

// References
let recognitionRef: any = null;
let mediaRecorderRef: MediaRecorder | null = null;
let streamRef: MediaStream | null = null;
let audioContextRef: AudioContext | null = null;
let sourceNodeRef: MediaStreamAudioSourceNode | null = null;

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
    console.error(`[Speaking][invariant] ${message}`);
    emitMetrics('invariant_violation', { message });
  }
}

function emitMetrics(phase: string, data: any = {}) {
  try { 
    enqueueMetric({ runId, phase, ...data }); 
  } catch {}
  
  if (DEBUG_MODE) {
    window.dispatchEvent(new CustomEvent('speaking:metrics', { 
      detail: { phase, runId, state, ...data, t: Date.now() }
    }));
  }
}

function debounceButton(): boolean {
  const now = Date.now();
  if (now - lastButtonTap < BUTTON_DEBOUNCE_MS) {
    console.log('[Speaking] button:debounced');
    return true;
  }
  lastButtonTap = now;
  return false;
}

// ============= STATE MANAGEMENT =============
function setState(newState: MicState) {
  const oldState = state;
  console.log('[Speaking] state-change:', oldState, '->', newState);
  
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
      console.error('[Speaking] Processing watchdog triggered - stuck in processing state');
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

// ============= AUDIO CONTEXT MANAGEMENT =============
async function ensureAudioContext(): Promise<void> {
  if (!audioContextRef) {
    audioContextRef = new AudioContext({ sampleRate: 44100 });
  }
  
  if (audioContextRef.state === 'suspended') {
    await audioContextRef.resume();
    console.log('[Speaking] audio-context:resumed');
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
    
    console.log('[Speaking] stream:attached-to-context');
  } catch (error) {
    console.warn('[Speaking] stream:attach-failed', error);
  }
}

// ============= CLEANUP =============
function cleanupResources() {
  console.log('[Speaking] cleanup:start');
  
  clearAllTimers();
  
  // Cancel TTS
  try { window?.speechSynthesis?.cancel(); } catch {}
  
  // Stop recognition
  if (recognitionRef) {
    try { recognitionRef.stop(); } catch {}
    recognitionRef = null;
  }
  
  // Stop media recorder
  if (mediaRecorderRef) {
    try { mediaRecorderRef.stop(); } catch {}
    mediaRecorderRef = null;
  }
  
  // Stop stream
  if (streamRef) {
    streamRef.getTracks().forEach(track => {
      track.stop();
      console.log('[Speaking] track:stopped', track.kind);
    });
    streamRef = null;
  }
  
  // Cleanup audio context
  if (sourceNodeRef) {
    try { sourceNodeRef.disconnect(); } catch {}
    sourceNodeRef = null;
  }
  
  if (audioContextRef) {
    try { audioContextRef.suspend(); } catch {}
    // Don't close immediately - may be reused
  }
  
  console.log('[Speaking] cleanup:complete');
}

// ============= SPEECH RECOGNITION ENGINE =============
async function startSpeechRecognition(id: number, maxSec: number): Promise<string> {
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
        console.log('[Speaking] asr:initial-silence-timeout');
        finish('');
      }
    }, INITIAL_SILENCE_MS);
    
    function finish(transcript: string) {
      if (isFinished || isStale(id)) return;
      isFinished = true;
      
      clearTimeout(silenceTimer);
      try { recognitionRef?.stop(); } catch {}
      
      console.log('[Speaking] asr:finish', { transcript, hasSpeech });
      resolve(transcript.trim());
    }
    
    recognitionRef.onstart = () => {
      if (isStale(id)) return;
      hasStarted = true;
      console.log('[Speaking] asr:onstart');
      setState('recording');
    };
    
    recognitionRef.onspeechstart = () => {
      if (isStale(id)) return;
      hasSpeech = true;
      clearTimeout(silenceTimer);
      console.log('[Speaking] asr:onspeechstart');
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
          detail: { transcript: interimText, runId: id }
        }));
      }
      
      console.log('[Speaking] asr:onresult', { final: finalTranscript, interim: interimText });
    };
    
    recognitionRef.onend = () => {
      if (isStale(id)) return;
      console.log('[Speaking] asr:onend', { hasStarted, finalTranscript });
      
      if (hasStarted) {
        finish(finalTranscript);
      }
    };
    
    recognitionRef.onerror = (event: any) => {
      if (isStale(id)) return;
      console.error('[Speaking] asr:onerror', event.error);
      
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
      console.log('[Speaking] asr:start');
    } catch (error) {
      clearTimeout(silenceTimer);
      reject(error);
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
          console.log('[Speaking] recorder:blob-created', audioBlob.size);
          
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          
          const { data, error } = await supabase.functions.invoke('transcribe', {
            body: formData,
          });
          
          if (error) throw new Error('Transcription failed');
          
          const transcript = data?.transcript || '';
          console.log('[Speaking] recorder:transcribed', transcript);
          finish(transcript);
          
        } catch (error: any) {
          reject(new Error('There was a problem analyzing your speech. Please try again.'));
        }
      };
      
      mediaRecorderRef.onerror = (event: any) => {
        console.error('[Speaking] recorder:error', event);
        reject(new Error('Recording failed. Please try again.'));
      };
      
      mediaRecorderRef.start(100);
      setState('recording');
      console.log('[Speaking] recorder:started');
      
    } catch (error) {
      reject(error);
    }
  });
}

// ============= MAIN ENGINE =============
async function internalStart(id: number, maxSec: number): Promise<MicResult> {
  const engineMode: EngineMode = USE_FALLBACK || !('webkitSpeechRecognition' in window) 
    ? 'media-recorder' 
    : 'speech-recognition';
    
  console.log('[Speaking] engine:mode', engineMode);
  emitMetrics('engine_start', { mode: engineMode, maxSec });
  
  try {
    // Cancel any ongoing TTS
    try { window?.speechSynthesis?.cancel(); } catch {}
    
    setState('initializing');
    startTime = Date.now();
    
    // Resume audio context on user gesture
    await ensureAudioContext();
    
    // iOS Safari compatibility delay
    await new Promise(resolve => setTimeout(resolve, INIT_DELAY_MS));
    
    if (isStale(id)) throw new Error('Operation cancelled');
    
    // Request microphone
    console.log('[Speaking] mic:requesting-permission');
    streamRef = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 44100,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });
    
    console.log('[Speaking] mic:permission-granted');
    attachStreamToContext(streamRef);
    
    if (isStale(id)) throw new Error('Operation cancelled');
    
    // Set max timer
    maxTimerRef = window.setTimeout(() => {
      if (!isStale(id)) {
        console.log('[Speaking] max-timer:expired');
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
    
    console.log('[Speaking] recording:completed', { transcript, durationSec });
    emitMetrics('recording_complete', { transcript: transcript.substring(0, 50), durationSec });
    
    return { transcript: transcript.trim(), durationSec };
    
  } catch (error: any) {
    console.error('[Speaking] recording:error', error);
    emitMetrics('recording_error', { error: error.message });
    
    if (error.message?.includes('denied') || error.name === 'NotAllowedError') {
      throw new Error('Microphone access denied. Allow mic in Settings.');
    }
    throw error;
  }
}

// ============= PUBLIC API =============
export async function startRecording(opts: { maxSec?: number } = {}): Promise<MicResult> {
  if (debounceButton()) return Promise.reject(new Error('Button debounced'));
  
  if (state !== 'idle' && state !== 'prompting') {
    assertInvariant(false, `startRecording called while state=${state}`);
    throw new Error('Recording already in progress');
  }
  
  const id = newRunId();
  const maxSec = opts.maxSec || MAX_SECONDS;
  
  console.log('[Speaking] recording:start', { id, maxSec });
  
  try {
    const result = await internalStart(id, maxSec);
    
    // Auto-retry logic for empty transcripts
    if (!result.transcript && retryCount < MAX_RETRIES) {
      retryCount++;
      console.log('[Speaking] auto-retry', retryCount, 'of', MAX_RETRIES);
      
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
  } finally {
    cleanupResources();
  }
}

export function stopRecording(): void {
  console.log('[Speaking] stop-recording:user-initiated');
  
  if (recognitionRef) {
    try { recognitionRef.stop(); } catch {}
  }
  
  if (mediaRecorderRef && mediaRecorderRef.state === 'recording') {
    try { mediaRecorderRef.stop(); } catch {}
  }
  
  emitMetrics('recording_stopped');
}

export function cleanup(): void {
  console.log('[Speaking] cleanup:public-api');
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
      console.log('[Speaking] visibility:hidden, cleaning up');
      emitMetrics('visibility_cleanup', { state });
      cleanup();
    } else if (!document.hidden && state !== 'idle') {
      console.log('[Speaking] visibility:visible, engine not idle, forcing cleanup');
      emitMetrics('visibility_recovery', { state });
      cleanup();
    }
  });
  
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
  
  console.log('[Speaking] micEngine:initialized v1.0');
}