/**
 * Native Billing Service
 * Handles In-App Purchase integration for both iOS (StoreKit) and Android (Google Play)
 * Uses @capgo/native-purchases plugin (cross-platform)
 */

import { Capacitor } from '@capacitor/core';
import { SubscriptionService } from './subscriptionService';
import type { TierCode } from '@/types/subscription';
import { logger } from '@/lib/logger';

// Product IDs (must match App Store Connect AND Google Play Console)
export const STORE_PRODUCTS = {
  ai_only_monthly: 'ai_only_monthly',
  ai_only_quarterly: 'ai_only_quarterly',
  ai_plus_live_monthly: 'ai_plus_live_monthly',
  ai_plus_live_quarterly: 'ai_plus_live_quarterly',
} as const;

/** @deprecated Use STORE_PRODUCTS instead */
export const GOOGLE_PLAY_PRODUCTS = STORE_PRODUCTS;

export type StoreProductId = keyof typeof STORE_PRODUCTS;
/** @deprecated Use StoreProductId instead */
export type GooglePlayProductId = StoreProductId;

// Map products to subscription tiers
export const PRODUCT_TO_TIER: Record<string, TierCode> = {
  ai_only_monthly: 'ai_only',
  ai_only_quarterly: 'ai_only',
  ai_plus_live_monthly: 'ai_plus_live',
  ai_plus_live_quarterly: 'ai_plus_live',
};

// Map tier + billing cycle to product ID
export const getTierProductId = (tier: TierCode, billingCycle: 'monthly' | 'quarterly'): string | null => {
  if (tier === 'free') return null;
  return `${tier}_${billingCycle}`;
};

// Error codes for user-friendly messages
export enum BillingErrorCode {
  USER_CANCELLED = 'USER_CANCELLED',
  ITEM_ALREADY_OWNED = 'ITEM_ALREADY_OWNED',
  ITEM_UNAVAILABLE = 'ITEM_UNAVAILABLE',
  NETWORK_ERROR = 'NETWORK_ERROR',
  BILLING_UNAVAILABLE = 'BILLING_UNAVAILABLE',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  PURCHASE_PENDING = 'PURCHASE_PENDING',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_NATIVE = 'NOT_NATIVE',
  /** @deprecated Use NOT_NATIVE */
  NOT_ANDROID = 'NOT_NATIVE',
  NOT_CONNECTED = 'NOT_CONNECTED',
}

export interface BillingError {
  code: BillingErrorCode;
  message: string;
  originalError?: unknown;
}

export interface ProductDetails {
  productId: string;
  name: string;
  description: string;
  price: string;
  priceAmountMicros: number;
  priceCurrencyCode: string;
  subscriptionPeriod: string;
  tierCode: TierCode;
  billingCycle: 'monthly' | 'quarterly';
}

export interface PurchaseResult {
  success: boolean;
  productId?: string;
  purchaseToken?: string;
  tierCode?: TierCode;
  error?: BillingError;
}

/**
 * Billing Service Class
 * Singleton that manages native billing connection and operations (iOS + Android)
 */
class BillingServiceClass {
  private static instance: BillingServiceClass;
  private isConnected = false;
  private NativePurchasesPlugin: any = null;
  private PURCHASE_TYPE: any = null;
  private cachedProducts: ProductDetails[] = [];

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): BillingServiceClass {
    if (!BillingServiceClass.instance) {
      BillingServiceClass.instance = new BillingServiceClass();
    }
    return BillingServiceClass.instance;
  }

  /**
   * Check if billing is available (iOS + Android native platforms)
   */
  isAvailable(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Connect to native billing (iOS StoreKit / Google Play)
   */
  async connect(): Promise<boolean> {
    if (!this.isAvailable()) {
      logger.log('[Billing] Not available - not on native platform');
      return false;
    }

    if (this.isConnected) {
      logger.log('[Billing] Already connected');
      return true;
    }

    try {
      // Dynamically import the billing plugin
      const { NativePurchases, PURCHASE_TYPE } = await import('@capgo/native-purchases');
      this.NativePurchasesPlugin = NativePurchases;
      this.PURCHASE_TYPE = PURCHASE_TYPE;

      // Check if billing is supported
      const { isBillingSupported } = await this.NativePurchasesPlugin.isBillingSupported();

      if (isBillingSupported) {
        this.isConnected = true;
        logger.log('[Billing] Connected successfully');
        return true;
      } else {
        logger.error('[Billing] Billing not supported on this device/platform');
        return false;
      }
    } catch (error) {
      logger.error('[Billing] Connection error:', error);
      return false;
    }
  }

  /**
   * Disconnect from Google Play Billing
   */
  async disconnect(): Promise<void> {
    this.isConnected = false;
    logger.log('[Billing] Disconnected');
  }

  /**
   * Query available subscription products
   */
  async queryProducts(): Promise<ProductDetails[]> {
    if (!this.isConnected || !this.NativePurchasesPlugin) {
      throw this.createError(BillingErrorCode.NOT_CONNECTED, 'Billing service not connected');
    }

    try {
      const productIds = Object.values(STORE_PRODUCTS);

      const { products } = await this.NativePurchasesPlugin.getProducts({
        productIdentifiers: productIds,
        productType: this.PURCHASE_TYPE.SUBS,
      });

      if (!products || products.length === 0) {
        logger.warn('[Billing] No products found');
        return [];
      }

      const mappedProducts: ProductDetails[] = products.map((product: any) => {
        const productId = product.identifier;
        const tierCode = PRODUCT_TO_TIER[productId] || 'free';
        const billingCycle = productId.includes('quarterly') ? 'quarterly' : 'monthly';

        return {
          productId,
          name: product.title || productId,
          description: product.description || '',
          price: product.priceString || '',
          priceAmountMicros: product.price ? Math.round(product.price * 1000000) : 0,
          priceCurrencyCode: product.currencyCode || 'TRY',
          subscriptionPeriod: billingCycle === 'monthly' ? 'P1M' : 'P3M',
          tierCode,
          billingCycle,
        };
      });

      this.cachedProducts = mappedProducts;
      logger.log('[Billing] Products loaded:', mappedProducts.length);
      return mappedProducts;
    } catch (error) {
      logger.error('[Billing] Query products error:', error);
      throw this.createError(BillingErrorCode.NETWORK_ERROR, 'Failed to load products', error);
    }
  }

  /**
   * Get cached products (avoid re-querying)
   */
  getCachedProducts(): ProductDetails[] {
    return this.cachedProducts;
  }

  /**
   * Purchase a subscription
   */
  async purchaseSubscription(productId: string, userId: string): Promise<PurchaseResult> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: this.createError(BillingErrorCode.NOT_NATIVE, 'In-app purchases are only available in the mobile app'),
      };
    }

    if (!this.isConnected || !this.NativePurchasesPlugin) {
      // Try to connect
      const connected = await this.connect();
      if (!connected) {
        return {
          success: false,
          error: this.createError(BillingErrorCode.BILLING_UNAVAILABLE, 'Could not connect to the store. Please try again.'),
        };
      }
    }

    try {
      // Get product details first
      let products = this.cachedProducts;
      if (products.length === 0) {
        products = await this.queryProducts();
      }

      const product = products.find(p => p.productId === productId);
      if (!product) {
        return {
          success: false,
          error: this.createError(BillingErrorCode.ITEM_UNAVAILABLE, 'Product not found'),
        };
      }

      logger.log('[Billing] Starting purchase for:', productId);

      // For subscriptions on Android, we need the planIdentifier
      // The planIdentifier should match the base plan ID in Google Play Console
      // We'll use the productId as the plan identifier (e.g., "ai_only_monthly")
      const purchaseResult = await this.NativePurchasesPlugin.purchaseProduct({
        productIdentifier: productId,
        planIdentifier: productId, // Base plan ID in Google Play Console
        productType: this.PURCHASE_TYPE.SUBS,
        quantity: 1,
      });

      logger.log('[Billing] Purchase result:', purchaseResult);

      if (purchaseResult && purchaseResult.transactionId) {
        // Purchase successful - verify with backend
        const verifyResult = await this.verifyAndActivatePurchase(
          purchaseResult.transactionId,
          productId,
          userId
        );
        return verifyResult;
      } else {
        return {
          success: false,
          error: this.createError(BillingErrorCode.UNKNOWN_ERROR, 'Purchase did not complete'),
        };
      }
    } catch (error: any) {
      logger.error('[Billing] Purchase error:', error);

      // Check for specific error types
      const errorMessage = error?.message?.toLowerCase() || '';
      const errorCode = error?.code;

      if (errorMessage.includes('cancel') || errorCode === 1) {
        return {
          success: false,
          error: this.createError(BillingErrorCode.USER_CANCELLED, 'Purchase cancelled'),
        };
      }

      if (errorMessage.includes('already owned') || errorCode === 7) {
        return {
          success: false,
          error: this.createError(BillingErrorCode.ITEM_ALREADY_OWNED, 'You already own this subscription'),
        };
      }

      return {
        success: false,
        error: this.createError(BillingErrorCode.UNKNOWN_ERROR, 'Purchase failed', error),
      };
    }
  }

  /**
   * Verify purchase with backend and activate subscription
   */
  private async verifyAndActivatePurchase(
    purchaseToken: string,
    productId: string,
    userId: string
  ): Promise<PurchaseResult> {
    try {
      logger.log('[Billing] Verifying purchase with backend...');

      const platform = Capacitor.getPlatform() as 'ios' | 'android';
      const result = await SubscriptionService.syncSubscriptionFromReceipt(
        userId,
        purchaseToken,
        platform,
        productId
      );

      if (result.success) {
        logger.log('[Billing] Purchase verified successfully');
        // v74: Clear subscription cache so UI immediately reflects the new tier
        SubscriptionService.clearCache();
        return {
          success: true,
          productId,
          purchaseToken,
          tierCode: PRODUCT_TO_TIER[productId],
        };
      } else {
        logger.error('[Billing] Verification failed:', result.error);
        return {
          success: false,
          productId,
          purchaseToken,
          error: this.createError(BillingErrorCode.VERIFICATION_FAILED, result.message || 'Verification failed'),
        };
      }
    } catch (error) {
      logger.error('[Billing] Verification error:', error);
      return {
        success: false,
        productId,
        purchaseToken,
        error: this.createError(BillingErrorCode.VERIFICATION_FAILED, 'Could not verify purchase', error),
      };
    }
  }

  /**
   * Restore previous purchases
   */
  async restorePurchases(userId: string): Promise<PurchaseResult[]> {
    if (!this.isConnected || !this.NativePurchasesPlugin) {
      const connected = await this.connect();
      if (!connected) {
        return [{
          success: false,
          error: this.createError(BillingErrorCode.BILLING_UNAVAILABLE, 'Could not connect to the store'),
        }];
      }
    }

    try {
      logger.log('[Billing] Restoring purchases...');

      await this.NativePurchasesPlugin.restorePurchases();

      // v74: Clear subscription cache and trigger a fresh status check so UI updates immediately
      SubscriptionService.clearCache();
      logger.log('[Billing] Restore complete - subscription cache cleared, UI will refresh');

      return [{
        success: true,
      }];
    } catch (error) {
      logger.error('[Billing] Restore error:', error);
      return [{
        success: false,
        error: this.createError(BillingErrorCode.NETWORK_ERROR, 'Failed to restore purchases', error),
      }];
    }
  }

  /**
   * Open subscription management (App Store / Google Play)
   */
  async openSubscriptionManagement(): Promise<void> {
    if (this.NativePurchasesPlugin) {
      try {
        await this.NativePurchasesPlugin.manageSubscriptions();
      } catch (error) {
        logger.error('[Billing] Failed to open subscription management:', error);
        this.openSubscriptionManagementFallback();
      }
    } else {
      this.openSubscriptionManagementFallback();
    }
  }

  private openSubscriptionManagementFallback(): void {
    const platform = Capacitor.getPlatform();
    const url = platform === 'ios'
      ? 'https://apps.apple.com/account/subscriptions'
      : 'https://play.google.com/store/account/subscriptions';
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Create a billing error object
   */
  private createError(code: BillingErrorCode, message: string, originalError?: unknown): BillingError {
    return { code, message, originalError };
  }
}

// Export singleton instance
export const BillingService = BillingServiceClass.getInstance();

// Export helper function to get user-friendly error message
export function getBillingErrorMessage(error: BillingError): string {
  switch (error.code) {
    case BillingErrorCode.USER_CANCELLED:
      return 'Purchase was cancelled';
    case BillingErrorCode.ITEM_ALREADY_OWNED:
      return 'You already have an active subscription';
    case BillingErrorCode.ITEM_UNAVAILABLE:
      return 'This subscription is currently unavailable';
    case BillingErrorCode.NETWORK_ERROR:
      return 'Network error. Please check your connection and try again.';
    case BillingErrorCode.BILLING_UNAVAILABLE:
      return 'The store is unavailable. Please try again later.';
    case BillingErrorCode.VERIFICATION_FAILED:
      return 'Could not verify your purchase. Please contact support.';
    case BillingErrorCode.PURCHASE_PENDING:
      return 'Your purchase is pending. You will be notified when it completes.';
    case BillingErrorCode.NOT_NATIVE:
      return 'In-app purchases are only available in the mobile app';
    case BillingErrorCode.NOT_CONNECTED:
      return 'Not connected to the store. Please try again.';
    default:
      return error.message || 'An unexpected error occurred';
  }
}
