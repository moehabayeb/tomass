# Apple In-App Purchases (IAP) Setup Guide

Complete guide to setting up Apple In-App Purchases for Tomas English iOS app.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [App Store Connect Configuration](#app-store-connect-configuration)
3. [Create Subscription Products](#create-subscription-products)
4. [Get Shared Secret](#get-shared-secret)
5. [Configure Supabase](#configure-supabase)
6. [Mobile App Integration](#mobile-app-integration)
7. [Testing](#testing)
8. [Production Checklist](#production-checklist)

---

## 1. Prerequisites

- **Apple Developer Account** ($99/year)
- **App registered in App Store Connect**
- **Tax and banking information completed** (required for paid apps)
- **Agreements signed** (Paid Applications agreement)

---

## 2. App Store Connect Configuration

### Step 1: Create App ID
1. Go to https://developer.apple.com/account
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** button
4. Select **App IDs** → **Continue**
5. Enter:
   - **Description**: Tomas English
   - **Bundle ID**: `com.tomashoca.english` (must match your app)
   - **Capabilities**: Enable **In-App Purchase**
6. Click **Register**

### Step 2: Create App in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platforms**: iOS
   - **Name**: Tomas English
   - **Primary Language**: English (or Turkish)
   - **Bundle ID**: Select your registered Bundle ID
   - **SKU**: `tomas-english-001` (unique identifier)
   - **User Access**: Full Access
4. Click **Create**

---

## 3. Create Subscription Products

### Step 1: Create Subscription Group
1. In App Store Connect, open your app
2. Navigate to **Features** → **Subscriptions**
3. Click **+** next to **Subscription Groups**
4. Enter:
   - **Reference Name**: `Tomas English Subscriptions`
   - **App Name on App Store**: `Tomas English`
5. Click **Create**

### Step 2: Create AI-Only Plan
1. Click **+** inside your subscription group
2. Fill in:
   - **Reference Name**: `AI-Only Monthly`
   - **Product ID**: `com.tomashoca.ai_only_monthly` ⚠️ **IMPORTANT**: Must match exactly
   - **Subscription Duration**: 1 Month
3. Click **Create**

4. Configure pricing:
   - **Subscription Prices**: Add pricing
   - **Country/Region**: Turkey
   - **Price**: ₺250 (or select equivalent in other currencies)
   - Add more countries as needed
5. Add localized information:
   - **Display Name**: AI-Only Plan
   - **Description**: Unlimited AI practice with speaking-focused English learning
6. Click **Save**

### Step 3: Create AI-Only Quarterly
1. Click **+** inside your subscription group again
2. Fill in:
   - **Reference Name**: `AI-Only Quarterly`
   - **Product ID**: `com.tomashoca.ai_only_quarterly`
   - **Subscription Duration**: 3 Months
3. Set price: ₺600
4. Add localized info
5. Click **Save**

### Step 4: Create AI + Live Lessons Plans
Repeat the same process for:

1. **AI + Live Lessons Monthly**
   - **Product ID**: `com.tomashoca.ai_plus_live_monthly`
   - **Duration**: 1 Month
   - **Price**: ₺4,750

2. **AI + Live Lessons Quarterly**
   - **Product ID**: `com.tomashoca.ai_plus_live_quarterly`
   - **Duration**: 3 Months
   - **Price**: ₺11,400

### Step 5: Submit for Review
1. Select all subscription products
2. Click **Submit for Review**
3. Provide reviewer notes if necessary
4. Wait for Apple approval (usually 24-48 hours)

---

## 4. Get Shared Secret

The shared secret is required to verify receipts with Apple servers.

1. In App Store Connect, open your app
2. Navigate to **Features** → **In-App Purchases**
3. Click **App-Specific Shared Secret**
4. Click **Generate** (or **View** if already generated)
5. Copy the shared secret (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
6. **Keep it secure!** You'll need it for Supabase configuration

---

## 5. Configure Supabase

### Add Environment Variable
1. Go to https://supabase.com
2. Open your Tomas English project
3. Navigate to **Settings** → **Edge Functions** → **Secrets**
4. Add a new secret:
   - **Name**: `APPLE_SHARED_SECRET`
   - **Value**: Paste your shared secret from step 4
5. Click **Save**

### Deploy Edge Function
```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Deploy the verify-apple-receipt function
supabase functions deploy verify-apple-receipt
```

---

## 6. Mobile App Integration

### For React Native / Capacitor

#### Install Dependencies
```bash
# For React Native
npm install react-native-iap

# For Capacitor
npm install @capawesome/capacitor-purchases
```

#### Initialize IAP
```typescript
import { initConnection, getSubscriptions, requestSubscription, finishTransaction } from 'react-native-iap';

// Product IDs (must match App Store Connect)
const PRODUCT_IDS = [
  'com.tomashoca.ai_only_monthly',
  'com.tomashoca.ai_only_quarterly',
  'com.tomashoca.ai_plus_live_monthly',
  'com.tomashoca.ai_plus_live_quarterly',
];

async function initIAP() {
  await initConnection();
  const subscriptions = await getSubscriptions({ skus: PRODUCT_IDS });
  console.log('Available subscriptions:', subscriptions);
}
```

#### Purchase Flow
```typescript
async function purchaseSubscription(productId: string) {
  try {
    // 1. Request purchase from Apple
    const purchase = await requestSubscription({
      sku: productId,
      andDangerouslyFinishTransactionAutomaticallyIOS: false, // Important!
    });

    // 2. Verify receipt with your backend
    const receipt = purchase.transactionReceipt;
    const userId = getCurrentUserId(); // Get from your auth system

    const result = await SubscriptionService.verifyAppleReceipt(receipt, userId);

    if (result.success) {
      // 3. Finish transaction (important to prevent refund)
      await finishTransaction({ purchase });

      // 4. Show success message
      Alert.alert('Success', 'Subscription activated!');
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to complete purchase');
    console.error(error);
  }
}
```

#### Restore Purchases
```typescript
async function restorePurchases() {
  try {
    const purchases = await getAvailablePurchases();

    if (purchases.length > 0) {
      const latestReceipt = purchases[0].transactionReceipt;
      const userId = getCurrentUserId();

      await SubscriptionService.verifyAppleReceipt(latestReceipt, userId);
      Alert.alert('Success', 'Subscriptions restored!');
    } else {
      Alert.alert('No Purchases', 'No previous purchases found');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to restore purchases');
  }
}
```

---

## 7. Testing

### Sandbox Testing

1. **Create Sandbox Testers**:
   - Go to App Store Connect → **Users and Access** → **Sandbox Testers**
   - Click **+** to add tester
   - Use a NEW email (can be fake, e.g., `test1@example.com`)
   - **Important**: Do NOT use your real Apple ID!

2. **Sign Out of App Store** (on iOS device):
   - Settings → [Your Name] → Media & Purchases → Sign Out
   - Do NOT sign out of iCloud, only App Store!

3. **Run Your App**:
   - Install app via Xcode or TestFlight
   - Attempt to purchase a subscription
   - Enter your sandbox tester credentials when prompted

4. **Test Scenarios**:
   - ✅ New purchase
   - ✅ Restore purchases
   - ✅ Subscription renewal
   - ✅ Cancellation

### TestFlight Testing

1. Build and upload your app to TestFlight
2. Add internal testers
3. Testers can purchase subscriptions using sandbox accounts
4. Monitor in App Store Connect → **Sales and Trends**

---

## 8. Production Checklist

Before releasing to production:

- [ ] All subscription products approved by Apple
- [ ] Tax and banking information completed
- [ ] Privacy Policy and Terms of Service added to app
- [ ] Links to Privacy/Terms added in App Store Connect
- [ ] Tested all purchase flows in sandbox
- [ ] Tested restore purchases
- [ ] Tested on multiple iOS versions (iOS 14+)
- [ ] Shared secret added to Supabase
- [ ] Edge function deployed and tested
- [ ] Subscription management link works (Settings → Subscriptions)
- [ ] Refund policy documented
- [ ] Customer support email configured

---

## Important Notes

### Product ID Naming Convention
```
com.tomashoca.{tier}_{cycle}

Examples:
- com.tomashoca.ai_only_monthly
- com.tomashoca.ai_only_quarterly
- com.tomashoca.ai_plus_live_monthly
- com.tomashoca.ai_plus_live_quarterly
```

### Apple's Revenue Split
- **Year 1**: Apple takes 30%, you get 70%
- **Year 2+**: Apple takes 15%, you get 85% (for subscribers who stay for 1+ year)

### Subscription Auto-Renewal
- Subscriptions automatically renew unless cancelled by user
- Apple charges the user's payment method
- You receive a new receipt that must be verified

### Refunds
- Users can request refunds through Apple
- Apple decides whether to grant refunds
- You are NOT notified automatically (use App Store Server Notifications)

---

## Troubleshooting

### "Cannot connect to iTunes Store"
- Ensure you're using a sandbox tester account
- Sign out of your real Apple ID in App Store settings
- Check internet connection

### "This product is not available"
- Product not approved by Apple yet
- Product ID mismatch between code and App Store Connect
- Wait 1-2 hours after creating products for them to sync

### "Receipt verification failed"
- Shared secret mismatch
- Sending production receipt to sandbox (or vice versa)
- Check Supabase function logs for details

---

## Additional Resources

- [Apple IAP Documentation](https://developer.apple.com/in-app-purchase/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [StoreKit Documentation](https://developer.apple.com/documentation/storekit)
- [Subscription Best Practices](https://developer.apple.com/app-store/subscriptions/)

---

## Support

If you encounter issues:
1. Check Supabase Edge Function logs
2. Check Xcode console logs
3. Verify product IDs match exactly
4. Ensure shared secret is correct
5. Contact Apple Developer Support if needed
