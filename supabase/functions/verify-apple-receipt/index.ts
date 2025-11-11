/**
 * Apple In-App Purchase Receipt Verification
 * Verifies iOS subscription receipts with Apple's servers
 *
 * Environment variables required:
 * - APPLE_SHARED_SECRET: Your App-Specific Shared Secret from App Store Connect
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const APPLE_PRODUCTION_URL = 'https://buy.itunes.apple.com/verifyReceipt';
const APPLE_SANDBOX_URL = 'https://sandbox.itunes.apple.com/verifyReceipt';

interface AppleReceiptRequest {
  receipt: string; // Base64-encoded receipt data from iOS
  userId: string; // Authenticated user ID
}

interface AppleReceiptResponse {
  status: number;
  receipt: any;
  latest_receipt_info?: any[];
  pending_renewal_info?: any[];
  environment?: 'Production' | 'Sandbox';
}

serve(async (req) => {
  // CORS headers for web requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    // Parse request
    const { receipt, userId }: AppleReceiptRequest = await req.json();

    if (!receipt || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing receipt or userId' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Apple shared secret from environment
    const sharedSecret = Deno.env.get('APPLE_SHARED_SECRET');
    if (!sharedSecret) {
      console.error('APPLE_SHARED_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify receipt with Apple
    const verificationResult = await verifyReceiptWithApple(receipt, sharedSecret);

    if (!verificationResult.success) {
      return new Response(
        JSON.stringify({
          error: verificationResult.error,
          status: verificationResult.status
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse subscription info from receipt
    const subscriptionInfo = parseSubscriptionInfo(verificationResult.data!);

    // Update user_subscriptions table
    const { data: subscription, error: dbError } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        tier_code: subscriptionInfo.tierCode,
        status: subscriptionInfo.status,
        payment_provider: 'apple_pay',
        payment_subscription_id: subscriptionInfo.subscriptionId,
        latest_receipt_data: receipt,
        receipt_verified_at: new Date().toISOString(),
        current_period_start: subscriptionInfo.periodStart,
        current_period_end: subscriptionInfo.periodEnd,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to update subscription' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Log to subscription_history
    await supabase.from('subscription_history').insert({
      user_id: userId,
      to_tier: subscriptionInfo.tierCode,
      change_reason: subscriptionInfo.isRenewal ? 'renewal' : 'upgrade',
      metadata: {
        provider: 'apple_pay',
        subscription_id: subscriptionInfo.subscriptionId,
        environment: verificationResult.environment,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        subscription: subscription,
        environment: verificationResult.environment,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error verifying Apple receipt:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * Verify receipt with Apple's servers
 */
async function verifyReceiptWithApple(
  receipt: string,
  sharedSecret: string
): Promise<{
  success: boolean;
  data?: AppleReceiptResponse;
  error?: string;
  status?: number;
  environment?: 'Production' | 'Sandbox';
}> {
  const requestBody = {
    'receipt-data': receipt,
    'password': sharedSecret,
    'exclude-old-transactions': true,
  };

  // Try production first
  let response = await fetch(APPLE_PRODUCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  let result: AppleReceiptResponse = await response.json();

  // If status is 21007 (sandbox receipt sent to production), try sandbox
  if (result.status === 21007) {
    response = await fetch(APPLE_SANDBOX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    result = await response.json();
  }

  // Status 0 = success
  if (result.status === 0) {
    return {
      success: true,
      data: result,
      environment: result.environment || 'Production',
    };
  }

  // Map Apple status codes to error messages
  const errorMessages: Record<number, string> = {
    21000: 'The request to the App Store was not made using the HTTP POST request method',
    21001: 'This status code is no longer sent by the App Store',
    21002: 'The data in the receipt-data property was malformed or missing',
    21003: 'The receipt could not be authenticated',
    21004: 'The shared secret you provided does not match the shared secret on file',
    21005: 'The receipt server was temporarily unable to provide the receipt',
    21006: 'This receipt is valid but the subscription has expired',
    21007: 'This receipt is from the test environment, but sent to production',
    21008: 'This receipt is from the production environment, but sent to test',
    21009: 'Internal data access error',
    21010: 'The user account cannot be found or has been deleted',
  };

  return {
    success: false,
    error: errorMessages[result.status] || `Unknown error (status: ${result.status})`,
    status: result.status,
  };
}

/**
 * Parse subscription info from Apple receipt
 */
function parseSubscriptionInfo(appleResponse: AppleReceiptResponse): {
  tierCode: 'free' | 'ai_only' | 'ai_plus_live';
  status: 'trial' | 'active' | 'expired' | 'cancelled';
  subscriptionId: string;
  periodStart: string;
  periodEnd: string;
  isRenewal: boolean;
} {
  // Get the latest receipt info
  const latestInfo = appleResponse.latest_receipt_info?.[0];
  if (!latestInfo) {
    throw new Error('No subscription info found in receipt');
  }

  const productId = latestInfo.product_id;
  const expiresDate = new Date(parseInt(latestInfo.expires_date_ms));
  const purchaseDate = new Date(parseInt(latestInfo.purchase_date_ms));
  const originalPurchaseDate = new Date(parseInt(latestInfo.original_purchase_date_ms));
  const now = new Date();

  // Map product IDs to tier codes
  // Format: com.tomashoca.ai_only_monthly, com.tomashoca.ai_plus_live_quarterly, etc.
  let tierCode: 'free' | 'ai_only' | 'ai_plus_live' = 'free';
  if (productId.includes('ai_plus_live')) {
    tierCode = 'ai_plus_live';
  } else if (productId.includes('ai_only')) {
    tierCode = 'ai_only';
  }

  // Determine subscription status
  let status: 'trial' | 'active' | 'expired' | 'cancelled' = 'active';

  if (expiresDate < now) {
    status = 'expired';
  }

  // Check if it's a renewal (purchase date != original purchase date)
  const isRenewal = purchaseDate.getTime() !== originalPurchaseDate.getTime();

  // Check for trial (if intro offer was used)
  const isTrialPeriod = latestInfo.is_trial_period === 'true' || latestInfo.is_in_intro_offer_period === 'true';
  if (isTrialPeriod && status === 'active') {
    status = 'trial';
  }

  // Check for cancellation
  const pendingRenewal = appleResponse.pending_renewal_info?.[0];
  if (pendingRenewal && pendingRenewal.auto_renew_status === '0') {
    status = 'cancelled'; // Will expire at end of period
  }

  return {
    tierCode,
    status,
    subscriptionId: latestInfo.original_transaction_id,
    periodStart: purchaseDate.toISOString(),
    periodEnd: expiresDate.toISOString(),
    isRenewal,
  };
}
