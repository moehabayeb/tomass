/**
 * useMicrophoneStatus - React hook for microphone guardian
 *
 * Provides reactive microphone status for components
 */

import { useState, useEffect, useCallback } from 'react';
import { microphoneGuardian, MicStatus, MicIssue, PreflightResult } from '../services/MicrophoneGuardian';

interface UseMicrophoneStatusReturn {
  status: MicStatus;
  statusMessage: string;
  isReady: boolean;
  isRecording: boolean;
  ensureReady: () => Promise<MicStatus>;
  preflightCheck: () => Promise<PreflightResult>;
  startMonitoring: (onIssue?: (issue: MicIssue, message: string) => void) => void;
  stopMonitoring: () => void;
  requestPermission: () => Promise<boolean>;
}

/**
 * Hook to access microphone guardian status and actions
 *
 * Usage:
 * ```tsx
 * function SpeakingComponent() {
 *   const { status, isReady, ensureReady, preflightCheck } = useMicrophoneStatus();
 *
 *   useEffect(() => {
 *     ensureReady();
 *   }, [ensureReady]);
 *
 *   const handleRecord = async () => {
 *     const result = await preflightCheck();
 *     if (!result.ready) {
 *       showError(result.userMessage);
 *       return;
 *     }
 *     // Start recording...
 *   };
 * }
 * ```
 */
export function useMicrophoneStatus(): UseMicrophoneStatusReturn {
  const [status, setStatus] = useState<MicStatus>(microphoneGuardian.getStatus());
  const [isRecording, setIsRecording] = useState<boolean>(microphoneGuardian.getIsRecording());

  // Subscribe to status changes
  useEffect(() => {
    const unsubscribe = microphoneGuardian.onStatusChange((newStatus) => {
      setStatus(newStatus);
    });

    // Get initial status
    setStatus(microphoneGuardian.getStatus());

    return unsubscribe;
  }, []);

  // Ensure ready - call when entering speaking page
  const ensureReady = useCallback(async (): Promise<MicStatus> => {
    return microphoneGuardian.ensureReady();
  }, []);

  // Pre-flight check - call before each recording
  const preflightCheck = useCallback(async (): Promise<PreflightResult> => {
    return microphoneGuardian.preflightCheck();
  }, []);

  // Start monitoring during recording
  const startMonitoring = useCallback((onIssue?: (issue: MicIssue, message: string) => void) => {
    microphoneGuardian.startMonitoring(onIssue);
    setIsRecording(true);
  }, []);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    microphoneGuardian.stopMonitoring();
    setIsRecording(false);
  }, []);

  // Request permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    const granted = await microphoneGuardian.requestPermission();
    if (granted) {
      // Re-check ready status
      await microphoneGuardian.ensureReady();
    }
    return granted;
  }, []);

  return {
    status,
    statusMessage: microphoneGuardian.getStatusMessage(),
    isReady: status === 'ready',
    isRecording,
    ensureReady,
    preflightCheck,
    startMonitoring,
    stopMonitoring,
    requestPermission,
  };
}

/**
 * Hook to auto-ensure microphone is ready on mount
 * Use this on pages that need speech recognition
 */
export function useAutoMicrophoneReady(): UseMicrophoneStatusReturn {
  const micStatus = useMicrophoneStatus();

  useEffect(() => {
    micStatus.ensureReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return micStatus;
}

export default useMicrophoneStatus;
