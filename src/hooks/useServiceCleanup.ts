/**
 * Service Cleanup Hook
 * Bug #8/9 Fix: Ensures all services properly clean up on unmount/logout
 *
 * Features:
 * - Cleans up event listeners
 * - Releases singleton instances
 * - Prevents memory leaks
 * - Called on app unmount and logout
 */

import { useEffect } from 'react';
import { useAuthReady } from './useAuthReady';
import { lessonProgressService } from '@/services/lessonProgressService';
import { ProgressTrackerService } from '@/services/progressTrackerService';
import { EnhancedProgressStore } from '@/utils/EnhancedProgressStore';

/**
 * Hook that automatically cleans up all services
 * Call this in your root App component
 */
export function useServiceCleanup() {
  const { isAuthenticated } = useAuthReady();

  useEffect(() => {
    // Cleanup function that runs on logout or unmount
    return () => {
      cleanupAllServices();
    };
  }, []);

  // Also cleanup when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      cleanupAllServices();
    }
  }, [isAuthenticated]);
}

/**
 * Manually cleanup all services
 * Call this function on logout or when needed
 */
export function cleanupAllServices(): void {
  try {
    // Cleanup lessonProgressService (event listeners)
    lessonProgressService.cleanup();

    // Cleanup ProgressTrackerService (auth subscription)
    const progressTracker = ProgressTrackerService.getInstance();
    progressTracker.cleanup();

    // Cleanup EnhancedProgressStore singleton (memory)
    EnhancedProgressStore.cleanup();

    // Log cleanup in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ All services cleaned up successfully');
    }
  } catch (error) {
    // Apple Store Compliance: Silent fail
    if (process.env.NODE_ENV === 'development') {
      console.warn('Service cleanup error:', error);
    }
  }
}

export default useServiceCleanup;
