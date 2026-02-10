/**
 * useBilling Hook
 * React hook for native billing integration (iOS + Android)
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

interface UseBillingReturn {
  // Availability
  isAvailable: boolean;
  isConnected: boolean;

  // State
  isPurchasing: boolean;
  isLoadingProducts: boolean;
  isRestoring: boolean;

  // Products
  products: ProductDetails[];
  getProductForTier: (tier: TierCode, billingCycle: 'monthly' | 'quarterly') => ProductDetails | null;

  // Actions
  connect: () => Promise<boolean>;
  purchaseSubscription: (productId: string) => Promise<PurchaseResult>;
  purchaseTier: (tier: TierCode, billingCycle: 'monthly' | 'quarterly') => Promise<PurchaseResult>;
  restorePurchases: () => Promise<void>;
  openSubscriptionManagement: () => Promise<void>;

  // Error handling
  error: BillingError | null;
  clearError: () => void;
}

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

  const hasInitialized = useRef(false);

  // Check if billing is available (iOS + Android)
  const isAvailable = Capacitor.isNativePlatform();

  /**
   * Connect to Google Play Billing
   */
  const connect = useCallback(async (): Promise<boolean> => {
    if (!isAvailable) {
      return false;
    }

    try {
      setError(null);
      const connected = await BillingService.connect();
      setIsConnected(connected);

      if (connected) {
        // Load products after connecting
        setIsLoadingProducts(true);
        try {
          const loadedProducts = await BillingService.queryProducts();
          setProducts(loadedProducts);
        } catch (err) {
          console.error('[useBilling] Failed to load products:', err);
        } finally {
          setIsLoadingProducts(false);
        }
      }

      return connected;
    } catch (err) {
      console.error('[useBilling] Connection error:', err);
      setIsConnected(false);
      return false;
    }
  }, [isAvailable]);

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
   * Open subscription management in Google Play
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

  // Auto-connect on Android when authenticated
  useEffect(() => {
    if (isAvailable && isAuthenticated && !hasInitialized.current) {
      hasInitialized.current = true;
      connect();
    }
  }, [isAvailable, isAuthenticated, connect]);

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
    products,
    getProductForTier,
    connect,
    purchaseSubscription,
    purchaseTier,
    restorePurchases,
    openSubscriptionManagement,
    error,
    clearError,
  };
};
