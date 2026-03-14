/**
 * useBilling Hook
 * React hook for native billing integration (iOS + Android)
 *
 * Retry strategy (Apple Guideline 2.1 compliance):
 *   1. Attempt product load immediately on mount (15s timeout).
 *   2. On failure → auto-retry once after 2s (15s timeout).
 *   3. On failure → silent background retries every 5s, up to 3 more attempts.
 *   4. If products load at ANY point → update UI immediately.
 *   5. Products never remain permanently unavailable during a session.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { useToast } from './use-toast';
import { useAuthReady } from './useAuthReady';
import { useSubscription } from './useSubscription';
import {
  BillingService,
  BillingErrorCode,
  getBillingErrorMessage,
  getTierProductId,
  type ProductDetails,
  type PurchaseResult,
  type BillingError,
} from '@/services/billingService';
import type { TierCode } from '@/types/subscription';
import { logger } from '@/lib/logger';

interface UseBillingReturn {
  // Availability
  isAvailable: boolean;
  isConnected: boolean;

  // State
  isPurchasing: boolean;
  isLoadingProducts: boolean;
  isRestoring: boolean;
  productLoadFailed: boolean;

  // Products
  products: ProductDetails[];
  getProductForTier: (tier: TierCode, billingCycle: 'monthly' | 'quarterly') => ProductDetails | null;

  // Actions
  connect: () => Promise<boolean>;
  purchaseSubscription: (productId: string) => Promise<PurchaseResult>;
  purchaseTier: (tier: TierCode, billingCycle: 'monthly' | 'quarterly') => Promise<PurchaseResult>;
  restorePurchases: () => Promise<void>;
  openSubscriptionManagement: () => Promise<void>;
  retryLoadProducts: () => void;

  // Error handling
  error: BillingError | null;
  clearError: () => void;
}

// StoreKit sandbox on review devices can be very slow — allow 15s
const PRODUCT_LOAD_TIMEOUT_MS = 15_000;
// Background retry interval
const BACKGROUND_RETRY_INTERVAL_MS = 5_000;
// Max background retry attempts
const MAX_BACKGROUND_RETRIES = 3;

export const useBilling = (): UseBillingReturn => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthReady();
  const { refreshSubscription } = useSubscription();

  const [isConnected, setIsConnected] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [error, setError] = useState<BillingError | null>(null);
  const [productLoadFailed, setProductLoadFailed] = useState(false);

  const hasInitialized = useRef(false);
  const backgroundRetryCount = useRef(0);
  const backgroundRetryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  // Check if billing is available (iOS + Android)
  const isAvailable = Capacitor.isNativePlatform();

  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (backgroundRetryTimer.current) {
        clearTimeout(backgroundRetryTimer.current);
      }
    };
  }, []);

  /**
   * Core product loading logic (shared by initial load and retries).
   * Returns true if products loaded successfully.
   */
  const loadProducts = useCallback(async (): Promise<boolean> => {
    console.log('[IAP] loadProducts — starting, timeout =', PRODUCT_LOAD_TIMEOUT_MS, 'ms');

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Product loading timed out')), PRODUCT_LOAD_TIMEOUT_MS)
    );

    const doLoad = async (): Promise<boolean> => {
      const connected = await BillingService.connect();
      console.log('[IAP] BillingService.connect() =', connected);

      if (!isMounted.current) return false;
      setIsConnected(connected);

      if (!connected) return false;

      const loaded = await BillingService.queryProducts();
      console.log('[IAP] queryProducts returned', loaded?.length ?? 0, 'products');

      if (!loaded || loaded.length === 0) {
        throw new Error('No products returned from store');
      }

      if (isMounted.current) {
        setProducts(loaded);
        setProductLoadFailed(false);
        setError(null);
      }
      return true;
    };

    try {
      const ok = await Promise.race([doLoad(), timeoutPromise]);
      return ok;
    } catch (err) {
      console.warn('[IAP] loadProducts failed:', err);
      return false;
    }
  }, []);

  /**
   * Schedule background retries that silently re-attempt product load.
   * Stops as soon as products load or max retries reached.
   */
  const scheduleBackgroundRetry = useCallback(() => {
    if (backgroundRetryTimer.current) clearTimeout(backgroundRetryTimer.current);
    if (backgroundRetryCount.current >= MAX_BACKGROUND_RETRIES) {
      console.log('[IAP] Max background retries reached (' + MAX_BACKGROUND_RETRIES + ')');
      return;
    }

    backgroundRetryTimer.current = setTimeout(async () => {
      if (!isMounted.current) return;

      backgroundRetryCount.current += 1;
      console.log('[IAP] Background retry', backgroundRetryCount.current, '/', MAX_BACKGROUND_RETRIES);

      const ok = await loadProducts();
      if (ok) {
        console.log('[IAP] Background retry succeeded — products loaded');
        if (isMounted.current) setIsLoadingProducts(false);
      } else if (isMounted.current) {
        // Schedule next retry
        scheduleBackgroundRetry();
      }
    }, BACKGROUND_RETRY_INTERVAL_MS);
  }, [loadProducts]);

  /**
   * Full connect + load flow with automatic retry strategy.
   */
  const connect = useCallback(async (): Promise<boolean> => {
    if (!isAvailable) return false;

    setError(null);
    setProductLoadFailed(false);
    setIsLoadingProducts(true);
    backgroundRetryCount.current = 0;

    console.log('[IAP] === Initial product load attempt ===');

    // Attempt 1: immediate
    let ok = await loadProducts();

    if (!ok && isMounted.current) {
      // Attempt 2: quick retry after 2s
      console.log('[IAP] === Auto-retry after 2s ===');
      await new Promise(r => setTimeout(r, 2000));

      if (!isMounted.current) return false;
      ok = await loadProducts();
    }

    if (isMounted.current) {
      setIsLoadingProducts(false);

      if (ok) {
        console.log('[IAP] Products loaded successfully');
        return true;
      }

      // Mark as failed, start background retries
      console.log('[IAP] Both initial attempts failed — starting background retries');
      setProductLoadFailed(true);
      scheduleBackgroundRetry();
    }

    return ok;
  }, [isAvailable, loadProducts, scheduleBackgroundRetry]);

  /**
   * Manual retry (user presses Retry button)
   */
  const retryLoadProducts = useCallback(() => {
    console.log('[IAP] === Manual retry triggered ===');
    setProductLoadFailed(false);
    backgroundRetryCount.current = 0;
    if (backgroundRetryTimer.current) clearTimeout(backgroundRetryTimer.current);
    hasInitialized.current = false;
    connect();
  }, [connect]);

  /**
   * Purchase a subscription by product ID
   */
  const purchaseSubscription = useCallback(async (productId: string): Promise<PurchaseResult> => {
    if (!isAvailable) {
      const err: BillingError = {
        code: BillingErrorCode.NOT_NATIVE,
        message: 'In-app purchases are only available in the mobile app',
      };
      setError(err);
      return { success: false, error: err };
    }

    if (!user?.id) {
      const err: BillingError = {
        code: BillingErrorCode.UNKNOWN_ERROR,
        message: 'Please sign in to purchase',
      };
      setError(err);
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to purchase a subscription',
        variant: 'destructive',
      });
      return { success: false, error: err };
    }

    setIsPurchasing(true);
    setError(null);

    try {
      const result = await BillingService.purchaseSubscription(productId, user.id);

      if (result.success) {
        toast({
          title: 'Purchase Successful!',
          description: 'Your subscription is now active',
        });
        // Refresh subscription state
        await refreshSubscription();
      } else if (result.error) {
        // Don't show toast for user cancellation
        if (result.error.code !== BillingErrorCode.USER_CANCELLED) {
          setError(result.error);
          toast({
            title: 'Purchase Failed',
            description: getBillingErrorMessage(result.error),
            variant: 'destructive',
          });
        }
      }

      return result;
    } catch (err) {
      const error: BillingError = {
        code: BillingErrorCode.UNKNOWN_ERROR,
        message: err instanceof Error ? err.message : 'Purchase failed',
        originalError: err,
      };
      setError(error);
      toast({
        title: 'Purchase Failed',
        description: getBillingErrorMessage(error),
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsPurchasing(false);
    }
  }, [isAvailable, user?.id, toast, refreshSubscription]);

  /**
   * Purchase by tier and billing cycle
   */
  const purchaseTier = useCallback(async (
    tier: TierCode,
    billingCycle: 'monthly' | 'quarterly'
  ): Promise<PurchaseResult> => {
    const productId = getTierProductId(tier, billingCycle);

    if (!productId) {
      const err: BillingError = {
        code: BillingErrorCode.ITEM_UNAVAILABLE,
        message: 'Invalid subscription tier',
      };
      setError(err);
      return { success: false, error: err };
    }

    return purchaseSubscription(productId);
  }, [purchaseSubscription]);

  /**
   * Get product details for a specific tier and billing cycle
   */
  const getProductForTier = useCallback((
    tier: TierCode,
    billingCycle: 'monthly' | 'quarterly'
  ): ProductDetails | null => {
    const productId = getTierProductId(tier, billingCycle);
    if (!productId) return null;
    return products.find(p => p.productId === productId) || null;
  }, [products]);

  /**
   * Restore previous purchases
   */
  const restorePurchases = useCallback(async (): Promise<void> => {
    if (!isAvailable) {
      toast({
        title: 'Not Available',
        description: 'Restore purchases is only available in the mobile app',
        variant: 'destructive',
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to restore purchases',
        variant: 'destructive',
      });
      return;
    }

    setIsRestoring(true);
    setError(null);

    try {
      const results = await BillingService.restorePurchases(user.id);

      const successCount = results.filter(r => r.success).length;

      if (successCount > 0) {
        toast({
          title: 'Purchases Restored',
          description: `${successCount} subscription(s) restored successfully`,
        });
        await refreshSubscription();
      } else if (results.length > 0 && results[0].error) {
        // All failed
        setError(results[0].error);
        toast({
          title: 'Restore Failed',
          description: getBillingErrorMessage(results[0].error),
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'No Purchases Found',
          description: 'No previous subscriptions to restore',
        });
      }
    } catch (err) {
      const error: BillingError = {
        code: BillingErrorCode.UNKNOWN_ERROR,
        message: err instanceof Error ? err.message : 'Restore failed',
        originalError: err,
      };
      setError(error);
      toast({
        title: 'Restore Failed',
        description: getBillingErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsRestoring(false);
    }
  }, [isAvailable, user?.id, toast, refreshSubscription]);

  /**
   * Open subscription management in App Store / Google Play
   */
  const openSubscriptionManagement = useCallback(async (): Promise<void> => {
    await BillingService.openSubscriptionManagement();
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-connect on native platforms (product loading doesn't need auth)
  useEffect(() => {
    if (isAvailable && !hasInitialized.current) {
      hasInitialized.current = true;
      connect();
    }
  }, [isAvailable, connect]);

  // Sync connection status
  useEffect(() => {
    if (isAvailable) {
      setIsConnected(BillingService.getConnectionStatus());
    }
  }, [isAvailable]);

  return {
    isAvailable,
    isConnected,
    isPurchasing,
    isLoadingProducts,
    isRestoring,
    productLoadFailed,
    products,
    getProductForTier,
    connect,
    purchaseSubscription,
    purchaseTier,
    restorePurchases,
    openSubscriptionManagement,
    retryLoadProducts,
    error,
    clearError,
  };
};
