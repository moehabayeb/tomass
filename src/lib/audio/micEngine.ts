export type MicState = 'idle' | 'prompting' | 'initializing' | 'recording' | 'processing';
export type MicResult = { transcript: string; durationSec: number };

// Constants - same as Level Test
const INITIAL_SILENCE_MS = 4500;
const SILENCE_TIMEOUT_MS = 2000;
const INIT_DELAY_MS = 600;
const MAX_SECONDS = 15;
const MAX_RETRIES = 2;
const RETRY_DELAYS = [400, 800];

// Internal state
let state: MicState = 'idle';
let runIdRef: number = 0;
let finished = false;
let retryCount = 0;
let recognizerRef: any = null;
let streamRef: MediaStream | null = null;
let audioCtxRef: { current: AudioContext | null } = { current: null };
let abortRef: AbortController | null = null;
let startTimeRef: number = 0;

// Timers
let timerRef: number | undefined;
let retryTimerRef: number | undefined;
let ttsTimerRef: number | undefined;
let maxTimerRef: number | undefined;

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
  if (timerRef) clearInterval(timerRef);
  timerRef = undefined;
  if (retryTimerRef) clearTimeout(retryTimerRef);
  retryTimerRef = undefined;
  if (ttsTimerRef) clearTimeout(ttsTimerRef);
  ttsTimerRef = undefined;
  if (maxTimerRef) clearTimeout(maxTimerRef);
  maxTimerRef = undefined;
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
    audioCtxRef.current = new AudioContext({ sampleRate: 24000 });
  }
  
  if (audioCtxRef.current.state === 'suspended') {
    await audioCtxRef.current.resume();
    console.log('[Speaking] audio-context:resumed');
  }
}

function attachStreamToContext(stream: MediaStream) {
  try {
    if (audioCtxRef.current) {
      const source = audioCtxRef.current.createMediaStreamSource(stream);
      // Create muted gain node to prevent sidetone - NO direct destination connect
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.value = 0; // Muted to prevent hearing self
      source.connect(gainNode);
      // Do NOT connect gainNode to destination - this prevents sidetone
      console.log('[Speaking] stream:attached-to-context (muted, no sidetone)');
    }
  } catch (e) {
    console.log('[Speaking] error attaching stream:', e);
  }
}

async function startASR({ signal, maxSeconds, stream }: {
  signal: AbortSignal;
  maxSeconds: number;
  stream?: MediaStream;
}): Promise<string> {
  console.log('[Speaking] asr:start');
  
  return new Promise((resolve, reject) => {
    // Use only webkitSpeechRecognition for reliability
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      console.log('[Speaking] asr:error - webkitSpeechRecognition not supported');
      reject(new Error('Speech recognition not supported'));
      return;
    }

    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    recognizerRef = rec;

    let silenceTimer: number;
    let speechStartTimer: number;
    let finalTranscript = '';
    let isFinished = false;
    let audioDetected = false;
    let speechDetected = false;

    function cleanup() {
      clearTimeout(silenceTimer);
      clearTimeout(speechStartTimer);
      recognizerRef = null;
    }

    function finishRecognition(transcript: string, reason: string) {
      if (isFinished) return;
      isFinished = true;
      cleanup();
      console.log('[Speaking] asr:finish', { transcript, reason, audioDetected, speechDetected });
      resolve(transcript);
    }

    // Signal abort
    signal.addEventListener('abort', () => {
      console.log('[Speaking] asr:abort');
      try { rec.stop(); } catch {}
      if (!isFinished) {
        cleanup();
        reject(new Error('Aborted'));
      }
    }, { once: true });

    // Comprehensive event logging to detect audio flow issues
    rec.onstart = () => {
      console.log('[Speaking] asr:onstart - recognition started');
      
      // If no speech detected after INITIAL_SILENCE_MS, treat as no-speech
      speechStartTimer = window.setTimeout(() => {
        if (!speechDetected && !isFinished) {
          console.log('[Speaking] asr:no-speech-detected - ASR running but no speech heard');
          try { rec.stop(); } catch {}
          finishRecognition('', 'no-speech');
        }
      }, INITIAL_SILENCE_MS);
    };

    rec.onsoundstart = () => {
      console.log('[Speaking] asr:onsoundstart - audio detected');
      audioDetected = true;
    };

    rec.onspeechstart = () => {
      console.log('[Speaking] asr:onspeechstart - speech detected');
      speechDetected = true;
      clearTimeout(speechStartTimer); // Cancel no-speech timeout
    };

    rec.onaudioend = () => {
      console.log('[Speaking] asr:onaudioend - audio ended');
    };

    rec.onspeechend = () => {
      console.log('[Speaking] asr:onspeechend - speech ended');
    };

    rec.onresult = (event: any) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          console.log('[Speaking] asr:final-result-chunk:', transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = (finalTranscript + interimTranscript).trim();
      console.log('[Speaking] asr:transcript-update:', fullTranscript);
      
      // Reset silence timer on any speech
      if (fullTranscript) {
        clearTimeout(silenceTimer);
        silenceTimer = window.setTimeout(() => {
          if (!isFinished && finalTranscript.trim()) {
            console.log('[Speaking] asr:silence-finish:', finalTranscript);
            try { rec.stop(); } catch {}
            finishRecognition(finalTranscript.trim(), 'silence');
          }
         }, SILENCE_TIMEOUT_MS);
      }
    };

    rec.onerror = (event: any) => {
      console.log('[Speaking] asr:onerror:', event.error, 'audio:', audioDetected, 'speech:', speechDetected);
      if (!isFinished) {
        cleanup();
        reject(new Error(`Recognition error: ${event.error}`));
      }
    };

    rec.onend = () => {
      console.log('[Speaking] asr:onend, final:', finalTranscript, 'audio:', audioDetected, 'speech:', speechDetected);
      if (!isFinished) {
        // Always use whatever transcript we have, even if short
        const transcript = finalTranscript.trim();
        finishRecognition(transcript, 'ended');
      }
    };

    try {
      // Ensure audio context is active and cancel any TTS before starting
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Resume audio context if suspended (critical for iOS)
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume().catch(e => console.log('[Speaking] audio-context-resume-error:', e));
      }

      console.log('[Speaking] asr:starting-recognition');
      rec.start();
    } catch (err) {
      console.log('[Speaking] asr:start-error:', err);
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
    
    // Cancel any TTS that might block mic on iOS
    try { window?.speechSynthesis?.cancel(); } catch {}

    setState('initializing');

    // iOS requirement: resume/create audio context on user gesture
    await ensureAudioContext();
    console.log('[Speaking] audio-context:ready');

    // iOS Safari compatibility delay
    await new Promise(resolve => setTimeout(resolve, INIT_DELAY_MS));

    // Request mic permission
    console.log('[Speaking] mic:requesting-permission');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });
    
    if (!stream || !stream.getTracks().length) {
      throw new Error('NoAudioStream');
    }
    console.log('[Speaking] mic:permission-granted');

    // Keep stream "hot" on iOS
    attachStreamToContext(stream);
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

    // Start ASR
    let transcript = '';
    try {
      transcript = await startASR({
        signal: abortRef.signal,
        maxSeconds: maxSec,
        stream
      });
    } catch (err: any) {
      if (err?.message?.includes('Aborted')) {
        // User stopped recording or timer expired
        transcript = '';
      } else if (err?.message?.includes('no-speech') || err?.message?.includes('No speech detected')) {
        throw new Error('No speech detected. Please try again.');
      } else {
        // Other errors - allow retry
        throw new Error('Speech recognition problem. Please try again.');
      }
    }

    // Always finalize with whatever transcript we captured
    const durationSec = (Date.now() - startTimeRef) / 1000;
    finished = true;
    clearAllTimers();
    stopStream(stream);
    setState('processing');
    
    // Show what was recognized to the user
    if (transcript.trim()) {
      console.log('[Speaking] transcript captured:', transcript);
    } else {
      console.log('[Speaking] no speech captured');
    }
    
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
      throw new Error('Microphone access denied.');
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
    setState('idle');
    retryCount = 0; // Reset on success
    return result;
  } catch (err: any) {
    console.log('[Speaking] recording failed:', err.message);
    
    // Check if we should retry
    if (retryCount < MAX_RETRIES) {
      const shouldRetry = err.message.includes('No speech detected') || 
                         err.message.includes('Speech recognition problem');
      
      if (shouldRetry && !isStale(id)) {
        const delay = RETRY_DELAYS[retryCount] || 800;
        retryCount++;
        console.log('[Speaking] scheduling retry', retryCount, 'after', delay + 'ms');
        
        setState('idle');
        
        return new Promise((resolve, reject) => {
          retryTimerRef = window.setTimeout(async () => {
            if (!isStale(id)) {
              try {
                const result = await internalStartRecording(opts);
                setState('idle');
                resolve(result);
              } catch (retryErr) {
                setState('idle');
                reject(retryErr);
              }
            }
          }, delay);
        });
      }
    }
    
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
  
  if (recognizerRef) {
    try { recognizerRef.stop(); } catch {}
    recognizerRef = null;
  }
  
  runIdRef = 0;
  retryCount = 0;
  setState('idle');
}
