import { useEffect, useRef } from 'react';

/**
 * Hook for managing cleanup of resources to prevent memory leaks
 * Automatically clears timeouts, intervals, and event listeners on unmount
 */
export const useCleanup = () => {
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const eventListenersRef = useRef<Array<{
    target: EventTarget;
    type: string;
    listener: EventListener;
    options?: boolean | AddEventListenerOptions;
  }>>([]);

  // Wrapper for setTimeout that tracks timeouts for cleanup
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      timeoutsRef.current.delete(timeoutId);
      callback();
    }, delay);
    timeoutsRef.current.add(timeoutId);
    return timeoutId;
  };

  // Wrapper for setInterval that tracks intervals for cleanup
  const safeSetInterval = (callback: () => void, delay: number) => {
    const intervalId = setInterval(callback, delay);
    intervalsRef.current.add(intervalId);
    return intervalId;
  };

  // Wrapper for addEventListener that tracks listeners for cleanup
  const safeAddEventListener = (
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => {
    target.addEventListener(type, listener, options);
    eventListenersRef.current.push({ target, type, listener, options });
  };

  // Manual cleanup functions
  const clearSafeTimeout = (timeoutId: NodeJS.Timeout) => {
    clearTimeout(timeoutId);
    timeoutsRef.current.delete(timeoutId);
  };

  const clearSafeInterval = (intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId);
    intervalsRef.current.delete(intervalId);
  };

  const removeSafeEventListener = (
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => {
    target.removeEventListener(type, listener, options);
    eventListenersRef.current = eventListenersRef.current.filter(
      (item) => !(item.target === target && item.type === type && item.listener === listener)
    );
  };

  // Cleanup all resources on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current.clear();

      // Clear all intervals
      intervalsRef.current.forEach(clearInterval);
      intervalsRef.current.clear();

      // Remove all event listeners
      eventListenersRef.current.forEach(({ target, type, listener, options }) => {
        target.removeEventListener(type, listener, options);
      });
      eventListenersRef.current = [];
    };
  }, []);

  return {
    safeSetTimeout,
    safeSetInterval,
    safeAddEventListener,
    clearSafeTimeout,
    clearSafeInterval,
    removeSafeEventListener,
  };
};

/**
 * Hook for managing component mount state
 * Useful for preventing state updates on unmounted components
 */
export const useMountedRef = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
};