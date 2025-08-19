import { supabase } from '@/integrations/supabase/client';

export type MicState = 'idle' | 'recording' | 'processing';

let mediaRecorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;
let audioChunks: Blob[] = [];
let isRecording = false;

export async function startRecording(): Promise<string> {
  if (isRecording) {
    throw new Error('Already recording');
  }

  try {
    console.log('[Speaking] Starting recording...');
    isRecording = true;
    audioChunks = [];

    // Request microphone access
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 44100,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });

    // Create MediaRecorder
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    
    // Collect audio chunks
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    // Start recording
    mediaRecorder.start(100);
    console.log('[Speaking] Recording started');

    return new Promise((resolve, reject) => {
      if (!mediaRecorder) {
        reject(new Error('MediaRecorder not initialized'));
        return;
      }

      mediaRecorder.onstop = async () => {
        console.log('[Speaking] Recording stopped, transcribing...');
        try {
          // Create audio blob
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          
          // Send to transcribe function
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');

          const { data, error } = await supabase.functions.invoke('transcribe', {
            body: formData,
          });

          if (error) {
            throw new Error('There was a problem analyzing your speech. Please try again.');
          }

          const transcript = data?.transcript || '';
          console.log('[Speaking] Transcription result:', transcript);
          resolve(transcript.trim());

        } catch (error: any) {
          console.error('[Speaking] Transcription error:', error);
          reject(new Error('There was a problem analyzing your speech. Please try again.'));
        } finally {
          cleanup();
        }
      };

      mediaRecorder.onerror = (event: any) => {
        console.error('[Speaking] Recording error:', event.error);
        reject(new Error('Recording failed. Please try again.'));
        cleanup();
      };
    });

  } catch (error: any) {
    console.error('[Speaking] Failed to start recording:', error);
    cleanup();
    
    if (error.name === 'NotAllowedError') {
      throw new Error('Please allow microphone access in your browser settings.');
    } else {
      throw new Error('Could not access microphone. Please try again.');
    }
  }
}

export function stopRecording(): void {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    console.log('[Speaking] Stopping recording...');
    mediaRecorder.stop();
  }
}

function cleanup(): void {
  isRecording = false;
  
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  
  if (mediaRecorder) {
    mediaRecorder = null;
  }
  
  audioChunks = [];
}

export function getState(): MicState {
  if (isRecording) return 'recording';
  return 'idle';
}