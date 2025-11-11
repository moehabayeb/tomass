/**
 * Google Play Store In-App Purchase Receipt Verification
 * Verifies Android subscription purchases with Google Play Developer API
 *
 * Environment variables required:
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL: Service account email from Google Cloud Console
 * - GOOGLE_PRIVATE_KEY: Service account private key (base64 encoded)
 * - GOOGLE_PACKAGE_NAME: Your app's package name (e.g., com.tomashoca.english)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { create } from 'https://deno.land/x/djwt@v2.9.1/mod.ts';

const GOOGLE_PLAY_API_BASE = 'https://androidpublisher.googleapis.com/androidpublisher/v3';

interface GoogleReceiptRequest {
  purchaseToken: string; // Purchase token from Android
  productId: string; // Product ID (e.g., "ai_only_monthly")
  userId: string; // Authenticated user ID
}

interface GoogleSubscriptionResponse {
  kind: string;
  startTimeMillis: string;
  expiryTimeMillis: string;
  autoRenewing: boolean;
  priceCurrencyCode: string;
  priceAmountMicros: string;
  countryCode: string;
  paymentState: number; // 0 = Pending, 1 = Received, 2 = Free trial, 3 = Pending deferred upgrade/downgrade
  cancelReason?: number; // 0 = User cancelled, 1 = System cancelled, 2 = Replaced, 3 = Developer cancelled
  orderId: string;
  linkedPurchaseToken?: string;
  purchaseType?: number; // 0 = Test, 1 = Promo, 2 = Rewarded
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
    const { purchaseToken, productId, userId }: GoogleReceiptRequest = await req.json();

    if (!purchaseToken || !productId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing purchaseToken, productId, or userId' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Google Play credentials from environment
    const packageName = Deno.env.get('GOOGLE_PACKAGE_NAME');
    const serviceAccountEmail = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const privateKeyBase64 = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!packageName || !serviceAccountEmail || !privateKeyBase64) {
      console.error('Google Play credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get access token
    const accessToken = await getGooglePlayAccessToken(serviceAccountEmail, privateKeyBase64);

    // Verify purchase with Google Play API
    const verificationResult = await verifyPurchaseWithGoogle(
      packageName,
      productId,
      purchaseToken,
      accessToken
    );

    if (!verificationResult.success) {
      return new Response(
        JSON.stringify({
          error: verificationResult.error,
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

    // Parse subscription info from Google response
    const subscriptionInfo = parseGoogleSubscriptionInfo(productId, verificationResult.data!);

    // Update user_subscriptions table
    const { data: subscription, error: dbError } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        tier_code: subscriptionInfo.tierCode,
        status: subscriptionInfo.status,
        payment_provider: 'google_play',
        payment_subscription_id: verificationResult.data!.orderId,
        latest_receipt_data: purchaseToken,
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
        provider: 'google_play',
        order_id: verificationResult.data!.orderId,
        auto_renewing: verificationResult.data!.autoRenewing,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        subscription: subscription,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error verifying Google receipt:', error);
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
 * Generate OAuth 2.0 access token for Google Play API
 */
async function getGooglePlayAccessToken(serviceAccountEmail: string, privateKeyBase64: string): Promise<string> {
  try {
    // Decode base64 private key
    const privateKeyPem = atob(privateKeyBase64);

    // Import the private key
    const privateKeyDer = pemToDer(privateKeyPem);
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      privateKeyDer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    // Create JWT
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccountEmail,
      scope: 'https://www.googleapis.com/auth/androidpublisher',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const jwt = await create({ alg: 'RS256', typ: 'JWT' }, payload, privateKey);

    // Exchange JWT for access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    const tokenResponse = await response.json();
    return tokenResponse.access_token;
  } catch (error) {
    console.error('Error getting Google Play access token:', error);
    throw new Error('Failed to authenticate with Google Play');
  }
}

/**
 * Convert PEM to DER format
 */
function pemToDer(pem: string): ArrayBuffer {
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = pem.substring(
    pem.indexOf(pemHeader) + pemHeader.length,
    pem.indexOf(pemFooter)
  );
  const binaryDerString = atob(pemContents.trim());
  const binaryDer = new Uint8Array(binaryDerString.length);
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }
  return binaryDer.buffer;
}

/**
 * Verify purchase with Google Play Developer API
 */
async function verifyPurchaseWithGoogle(
  packageName: string,
  productId: string,
  purchaseToken: string,
  accessToken: string
): Promise<{
  success: boolean;
  data?: GoogleSubscriptionResponse;
  error?: string;
}> {
  try {
    const url = `${GOOGLE_PLAY_API_BASE}/applications/${packageName}/purchases/subscriptions/${productId}/tokens/${purchaseToken}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error?.message || 'Failed to verify purchase with Google Play',
      };
    }

    const data: GoogleSubscriptionResponse = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: `Google Play API error: ${error.message}`,
    };
  }
}

/**
 * Parse subscription info from Google Play response
 */
function parseGoogleSubscriptionInfo(
  productId: string,
  googleResponse: GoogleSubscriptionResponse
): {
  tierCode: 'free' | 'ai_only' | 'ai_plus_live';
  status: 'trial' | 'active' | 'expired' | 'cancelled' | 'past_due';
  periodStart: string;
  periodEnd: string;
  isRenewal: boolean;
} {
  // Map product IDs to tier codes
  // Format: ai_only_monthly, ai_plus_live_quarterly, etc.
  let tierCode: 'free' | 'ai_only' | 'ai_plus_live' = 'free';
  if (productId.includes('ai_plus_live')) {
    tierCode = 'ai_plus_live';
  } else if (productId.includes('ai_only')) {
    tierCode = 'ai_only';
  }

  // Parse dates
  const startDate = new Date(parseInt(googleResponse.startTimeMillis));
  const expiryDate = new Date(parseInt(googleResponse.expiryTimeMillis));
  const now = new Date();

  // Determine subscription status
  let status: 'trial' | 'active' | 'expired' | 'cancelled' | 'past_due' = 'active';

  // Check payment state
  if (googleResponse.paymentState === 0) {
    status = 'past_due'; // Payment pending
  } else if (googleResponse.paymentState === 2) {
    status = 'trial'; // Free trial
  }

  // Check if expired
  if (expiryDate < now) {
    status = 'expired';
  }

  // Check if cancelled but still active until expiry
  if (googleResponse.cancelReason !== undefined && expiryDate > now) {
    status = 'cancelled'; // Will expire at end of period
  }

  // Check for renewal (if linkedPurchaseToken exists, it's a renewal)
  const isRenewal = googleResponse.linkedPurchaseToken !== undefined;

  return {
    tierCode,
    status,
    periodStart: startDate.toISOString(),
    periodEnd: expiryDate.toISOString(),
    isRenewal,
  };
}
