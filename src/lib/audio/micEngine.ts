import { supabase } from '@/integrations/supabase/client';

export type MicState = 'idle' | 'prompting' | 'initializing' | 'recording' | 'processing';
export type MicResult = { transcript: string; durationSec: number };

// Constants for reliable recording
const INIT_DELAY_MS = 600;
const MAX_SECONDS = 15;
const MAX_RETRIES = 1; // One auto-retry for empty transcripts

// Internal state
let state: MicState = 'idle';
let runIdRef: number = 0;
let finished = false;
let retryCount = 0;
let mediaRecorderRef: MediaRecorder | null = null;
let streamRef: MediaStream | null = null;
let audioCtxRef: { current: AudioContext | null } = { current: null };
let abortRef: AbortController | null = null;
let startTimeRef: number = 0;
let audioChunks: Blob[] = [];

// Timers
let maxTimerRef: number | undefined;
let retryTimerRef: number | undefined;

// State subscribers
const stateSubscribers: ((state: MicState) => void)[] = [];

function newRunId(): number {
  return ++runIdRef;
}

function isStale(id: number): boolean {
  return id !== runIdRef || finished;
}

function setState(newState: MicState) {
  console.log('[Speaking] mic:state-change', state, '->', newState);
  state = newState;
  stateSubscribers.forEach(cb => cb(state));
}

function clearAllTimers() {
  if (maxTimerRef) clearTimeout(maxTimerRef);
  maxTimerRef = undefined;
  if (retryTimerRef) clearTimeout(retryTimerRef);
  retryTimerRef = undefined;
}

function stopStream(stream: MediaStream) {
  try {
    stream.getTracks().forEach(track => {
      console.log('[Speaking] stopping track:', track.kind);
      track.stop();
    });
  } catch (e) {
    console.log('[Speaking] error stopping stream:', e);
  }
}

async function ensureAudioContext(): Promise<void> {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext({ sampleRate: 44100 });
  }
  
  if (audioCtxRef.current.state === 'suspended') {
    await audioCtxRef.current.resume();
    console.log('[Speaking] audio-context:resumed');
  }
}

async function transcribeAudio(audioBlob: Blob): Promise<string> {
  console.log('[Speaking] transcribe:start, blob size:', audioBlob.size);
  
  try {
    // Create FormData with the audio blob
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const { data, error } = await supabase.functions.invoke('transcribe', {
      body: formData,
    });

    if (error) {
      console.error('[Speaking] transcribe:error', error);
      throw new Error('There was a problem analyzing your speech. Please try again.');
    }

    const transcript = data?.transcript || '';
    console.log('[Speaking] transcribe:success', transcript);
    return transcript.trim();

  } catch (error: any) {
    console.error('[Speaking] transcribe:failed', error);
    throw new Error('There was a problem analyzing your speech. Please try again.');
  }
}

async function startRecordingWithMediaRecorder({ signal, maxSeconds }: {
  signal: AbortSignal;
  maxSeconds: number;
}): Promise<string> {
  console.log('[Speaking] recorder:start');
  
  return new Promise((resolve, reject) => {
    let isFinished = false;
    audioChunks = [];

    function cleanup() {
      if (mediaRecorderRef) {
        try { mediaRecorderRef.stop(); } catch {}
        mediaRecorderRef = null;
      }
    }

    function finishRecording(transcript: string, reason: string) {
      if (isFinished) return;
      isFinished = true;
      cleanup();
      console.log('[Speaking] recorder:finish', { transcript, reason });
      resolve(transcript);
    }

    // Signal abort
    signal.addEventListener('abort', () => {
      console.log('[Speaking] recorder:abort');
      if (!isFinished) {
        cleanup();
        reject(new Error('Recording aborted'));
      }
    }, { once: true });

    try {
      // Start MediaRecorder
      const options = { mimeType: 'audio/webm' };
      mediaRecorderRef = new MediaRecorder(streamRef!, options);
      
      mediaRecorderRef.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
          console.log('[Speaking] recorder:data-chunk', event.data.size);
        }
      };

      mediaRecorderRef.onstop = async () => {
        console.log('[Speaking] recorder:stopped, chunks:', audioChunks.length);
        
        if (!isFinished && audioChunks.length > 0) {
          try {
            // Create blob from chunks
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            console.log('[Speaking] recorder:blob-created', audioBlob.size);
            
            // Transcribe the audio
            const transcript = await transcribeAudio(audioBlob);
            finishRecording(transcript, 'transcribed');
          } catch (error: any) {
            if (!isFinished) {
              cleanup();
              reject(error);
            }
          }
        } else if (!isFinished) {
          finishRecording('', 'no-data');
        }
      };

      mediaRecorderRef.onerror = (event: any) => {
        console.log('[Speaking] recorder:error', event.error);
        if (!isFinished) {
          cleanup();
          reject(new Error('Recording failed. Please try again.'));
        }
      };

      console.log('[Speaking] recorder:starting');
      mediaRecorderRef.start(100); // Collect data every 100ms

    } catch (err) {
      console.log('[Speaking] recorder:start-error', err);
      cleanup();
      reject(err);
    }
  });
}

async function internalStartRecording(opts: { maxSec?: number } = {}): Promise<MicResult> {
  const maxSec = opts.maxSec || MAX_SECONDS;
  const id = newRunId();
  runIdRef = id;
  finished = false;
  clearAllTimers();

  try {
    console.log('[Speaking] recording:start');
    
    // Cancel any TTS that might interfere
    try { window?.speechSynthesis?.cancel(); } catch {}

    setState('initializing');

    // Resume audio context on user gesture (iOS compatibility)
    await ensureAudioContext();
    console.log('[Speaking] audio-context:ready');

    // iOS Safari compatibility delay
    await new Promise(resolve => setTimeout(resolve, INIT_DELAY_MS));

    // Request microphone with optimal settings
    console.log('[Speaking] mic:requesting-permission');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 44100,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });
    
    if (!stream || !stream.getTracks().length) {
      throw new Error('NoAudioStream');
    }
    console.log('[Speaking] mic:permission-granted');

    // Keep reference but DO NOT route to destination (no echo)
    streamRef = stream;

    // Start recording state
    setState('recording');
    abortRef = new AbortController();
    
    startTimeRef = Date.now();
    
    // Hard stop at MAX_SECONDS
    maxTimerRef = window.setTimeout(() => {
      if (!isStale(id)) {
        console.log('[Speaking] timer:expired, stopping recording');
        abortRef?.abort();
      }
    }, maxSec * 1000);
    
    console.log('[Speaking] recording:started');

    // Start recording and transcription
    let transcript = '';
    try {
      transcript = await startRecordingWithMediaRecorder({
        signal: abortRef.signal,
        maxSeconds: maxSec
      });
    } catch (err: any) {
      if (err?.message?.includes('aborted')) {
        // User stopped recording or timer expired - get whatever was recorded
        transcript = '';
      } else {
        // Other errors - rethrow
        throw err;
      }
    }

    // Always finalize with whatever transcript we captured
    const durationSec = (Date.now() - startTimeRef) / 1000;
    finished = true;
    clearAllTimers();
    stopStream(stream);
    setState('processing');
    
    console.log('[Speaking] recording:completed', { transcript, durationSec });
    
    return { transcript, durationSec };

  } catch (err: any) {
    console.log('[Speaking] recording:error', err?.name || err?.message);
    
    finished = true;
    clearAllTimers();
    if (streamRef) {
      stopStream(streamRef);
      streamRef = null;
    }
    
    if (err?.name === 'NotAllowedError' || err?.message?.includes('denied')) {
      throw new Error('Please allow microphone access in your browser settings.');
    } else {
      throw err;
    }
  } finally {
    abortRef = null;
  }
}

export async function startRecording(opts: { maxSec?: number } = {}): Promise<MicResult> {
  const id = runIdRef + 1; // Next run ID
  
  try {
    const result = await internalStartRecording(opts);
    
    // Check if transcript is empty and we should retry
    if (!result.transcript.trim() && retryCount < MAX_RETRIES) {
      retryCount++;
      console.log('[Speaking] auto-retry for empty transcript, attempt:', retryCount);
      
      setState('idle');
      
      return new Promise((resolve, reject) => {
        retryTimerRef = window.setTimeout(async () => {
          if (!isStale(id)) {
            try {
              const retryResult = await internalStartRecording(opts);
              setState('idle');
              resolve(retryResult);
            } catch (retryErr) {
              setState('idle');
              reject(retryErr);
            }
          }
        }, 800);
      });
    }
    
    setState('idle');
    retryCount = 0; // Reset on success
    
    // If still empty after retry, show specific message
    if (!result.transcript.trim()) {
      throw new Error('We couldn\'t hear you clearly. Try speaking louder or check your mic.');
    }
    
    return result;
  } catch (err: any) {
    console.log('[Speaking] recording failed:', err.message);
    setState('idle');
    retryCount = 0;
    throw err;
  }
}

export function stopRecording(): void {
  console.log('[Speaking] mic:stop-recording');
  try { 
    abortRef?.abort(); 
  } catch {}
}

export function getState(): MicState {
  return state;
}

export function onState(cb: (s: MicState) => void): () => void {
  stateSubscribers.push(cb);
  return () => {
    const index = stateSubscribers.indexOf(cb);
    if (index >= 0) {
      stateSubscribers.splice(index, 1);
    }
  };
}

// Cleanup function for component unmount
export function cleanup() {
  console.log('[Speaking] mic:cleanup');
  finished = true;
  clearAllTimers();
  
  try { abortRef?.abort(); } catch {}
  abortRef = null;
  
  if (streamRef) {
    stopStream(streamRef);
    streamRef = null;
  }
  
  if (audioCtxRef.current) {
    try {
      audioCtxRef.current.close();
    } catch {}
    audioCtxRef.current = null;
  }
  
  if (mediaRecorderRef) {
    try { mediaRecorderRef.stop(); } catch {}
    mediaRecorderRef = null;
  }
  
  runIdRef = 0;
  retryCount = 0;
  audioChunks = [];
  setState('idle');
}
