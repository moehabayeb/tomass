/**
 * Network status hook for online/offline detection and sync management
 */

import { useState, useEffect, useCallback } from 'react';

export interface NetworkStatus {
  isOnline: boolean;
  isConnecting: boolean;
  lastOnlineAt: number | null;
  connectionType: string | null;
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(() => ({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isConnecting: false,
    lastOnlineAt: typeof navigator !== 'undefined' && navigator.onLine ? Date.now() : null,
    connectionType: getConnectionType()
  }));

  // Test network connectivity with a small request
  const testConnectivity = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return true;

    try {
      setNetworkStatus(prev => ({ ...prev, isConnecting: true }));

      // Test with a small, fast request to a reliable endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    } finally {
      setNetworkStatus(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  // Handle online/offline events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = async () => {
      console.log('🌐 Network: Online event detected');

      // Verify actual connectivity (sometimes online event is unreliable)
      const isActuallyOnline = await testConnectivity();

      setNetworkStatus(prev => ({
        ...prev,
        isOnline: isActuallyOnline,
        lastOnlineAt: isActuallyOnline ? Date.now() : prev.lastOnlineAt,
        connectionType: getConnectionType()
      }));

      if (isActuallyOnline) {
        console.log('✅ Network: Connectivity confirmed');
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('network-online'));
      }
    };

    const handleOffline = () => {
      console.log('📡 Network: Offline event detected');
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: false,
        connectionType: null
      }));

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('network-offline'));
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Also listen for connection type changes
    const handleConnectionChange = () => {
      setNetworkStatus(prev => ({
        ...prev,
        connectionType: getConnectionType()
      }));
    };

    // Modern connection API (if available)
    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', handleConnectionChange);
    }

    // Initial connectivity check
    if (navigator.onLine) {
      handleOnline();
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if ('connection' in navigator) {
        (navigator as any).connection?.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [testConnectivity]);

  // Periodic connectivity check when online (every 30 seconds)
  useEffect(() => {
    if (!networkStatus.isOnline) return;

    const interval = setInterval(async () => {
      const isOnline = await testConnectivity();
      if (!isOnline) {
        setNetworkStatus(prev => ({
          ...prev,
          isOnline: false,
          connectionType: null
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [networkStatus.isOnline, testConnectivity]);

  // Manual connectivity check
  const checkConnectivity = useCallback(async (): Promise<boolean> => {
    const isOnline = await testConnectivity();

    setNetworkStatus(prev => ({
      ...prev,
      isOnline,
      lastOnlineAt: isOnline ? Date.now() : prev.lastOnlineAt,
      connectionType: isOnline ? getConnectionType() : null
    }));

    return isOnline;
  }, [testConnectivity]);

  // Get offline duration
  const getOfflineDuration = useCallback((): number => {
    if (networkStatus.isOnline || !networkStatus.lastOnlineAt) return 0;
    return Date.now() - networkStatus.lastOnlineAt;
  }, [networkStatus.isOnline, networkStatus.lastOnlineAt]);

  return {
    ...networkStatus,
    checkConnectivity,
    getOfflineDuration,
    isSlowConnection: isSlowConnection()
  };
}

/**
 * Get connection type if available
 */
function getConnectionType(): string | null {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return null;
  }

  const connection = (navigator as any).connection;
  return connection?.effectiveType || connection?.type || null;
}

/**
 * Detect slow connection
 */
function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;

  return effectiveType === 'slow-2g' || effectiveType === '2g';
}

/**
 * Hook specifically for sync operations
 */
export function useSyncStatus() {
  const networkStatus = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<number | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Auto-trigger sync when coming online
  useEffect(() => {
    const handleNetworkOnline = () => {
      if (!isSyncing) {
        console.log('🔄 Network back online - triggering sync');
        window.dispatchEvent(new CustomEvent('trigger-sync'));
      }
    };

    window.addEventListener('network-online', handleNetworkOnline);
    return () => window.removeEventListener('network-online', handleNetworkOnline);
  }, [isSyncing]);

  const startSync = useCallback(() => {
    setIsSyncing(true);
    setSyncError(null);
  }, []);

  const completeSync = useCallback((success: boolean, error?: string) => {
    setIsSyncing(false);
    setLastSyncAt(Date.now());
    setSyncError(error || null);

    if (success) {
      console.log('✅ Sync completed successfully');
    } else {
      console.error('❌ Sync failed:', error);
    }
  }, []);

  const getSyncStatus = useCallback(() => {
    if (!networkStatus.isOnline) return 'offline';
    if (isSyncing) return 'syncing';
    if (syncError) return 'error';
    if (lastSyncAt) return 'synced';
    return 'pending';
  }, [networkStatus.isOnline, isSyncing, syncError, lastSyncAt]);

  return {
    ...networkStatus,
    isSyncing,
    lastSyncAt,
    syncError,
    syncStatus: getSyncStatus(),
    startSync,
    completeSync
  };
}