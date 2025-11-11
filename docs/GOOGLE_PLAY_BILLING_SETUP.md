# Google Play Billing Setup Guide

Complete guide to setting up Google Play Billing for Tomas English Android app.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Play Console Configuration](#google-play-console-configuration)
3. [Create Subscription Products](#create-subscription-products)
4. [Set Up Service Account](#set-up-service-account)
5. [Configure Supabase](#configure-supabase)
6. [Mobile App Integration](#mobile-app-integration)
7. [Testing](#testing)
8. [Production Checklist](#production-checklist)

---

## 1. Prerequisites

- **Google Play Developer Account** ($25 one-time fee)
- **App registered in Google Play Console**
- **Payment profile set up** (for receiving money)
- **Tax information completed**

---

## 2. Google Play Console Configuration

### Step 1: Create App
1. Go to https://play.google.com/console
2. Click **Create app**
3. Fill in:
   - **App name**: Tomas English
   - **Default language**: English (or Turkish)
   - **App or game**: App
   - **Free or paid**: Free (with in-app purchases)
4. Accept declarations
5. Click **Create app**

### Step 2: Set Up App Content
1. Complete all required fields:
   - **Privacy Policy**: Link to your privacy policy page
   - **App category**: Education
   - **Content ratings**: Complete questionnaire
   - **Target audience**: Select age groups
   - **Store listing**: Add screenshots, description, etc.

---

## 3. Create Subscription Products

### Step 1: Access In-App Products
1. In Google Play Console, open your app
2. Navigate to **Monetization** → **Products** → **Subscriptions**
3. Click **Create subscription**

### Step 2: Create AI-Only Monthly
1. Fill in:
   - **Product ID**: `ai_only_monthly` ⚠️ **IMPORTANT**: Must match exactly
   - **Name**: AI-Only Plan (Monthly)
   - **Description**: Unlimited AI practice with speaking-focused English learning
2. Click **Create**

3. Set up subscription:
   - **Billing period**: 1 Month
   - **Default price**: ₺250 TRY
   - **Free trial**: 7 days (optional)
   - **Grace period**: 3 days (recommended)
   - **Account hold**: Enable (recommended)

4. Add more pricing (optional):
   - Click **Add pricing**
   - Select countries and set local prices

5. Click **Save**

### Step 3: Create AI-Only Quarterly
Repeat the same process:
- **Product ID**: `ai_only_quarterly`
- **Billing period**: 3 Months
- **Price**: ₺600 TRY

### Step 4: Create AI + Live Lessons Plans
1. **AI + Live Lessons Monthly**
   - **Product ID**: `ai_plus_live_monthly`
   - **Billing period**: 1 Month
   - **Price**: ₺4,750 TRY

2. **AI + Live Lessons Quarterly**
   - **Product ID**: `ai_plus_live_quarterly`
   - **Billing period**: 3 Months
   - **Price**: ₺11,400 TRY

### Step 5: Activate Subscriptions
1. Select all subscription products
2. Click **Activate** for each one
3. Products are now live (no approval needed!)

---

## 4. Set Up Service Account

Google Play Billing uses service accounts for API access.

### Step 1: Create Service Account
1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Select or create a project (e.g., "Tomas English")
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Fill in:
   - **Name**: `tomas-english-billing`
   - **Description**: Service account for Google Play Billing API
6. Click **Create and Continue**
7. **Grant permissions**: Skip for now
8. Click **Done**

### Step 2: Create Key
1. Find your newly created service account
2. Click **Actions** (3 dots) → **Manage keys**
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create**
6. A JSON file will download - **keep it safe!**

### Step 3: Link Service Account to Play Console
1. Open the downloaded JSON file
2. Copy the **service account email** (looks like: `tomas-english-billing@project-id.iam.gserviceaccount.com`)
3. Go back to **Google Play Console**
4. Navigate to **Setup** → **API access**
5. Click **Link** under Google Cloud Project
6. Select your project → **Link**
7. Under **Service accounts**, find your service account
8. Click **Grant access**
9. Select permissions:
   - **Financial data**: View (read-only)
   - **Orders and subscriptions**: View (read-only)
10. Click **Invite user** → **Send invitation**

---

## 5. Configure Supabase

### Extract Service Account Credentials
1. Open the downloaded JSON key file
2. You'll need these values:
   ```json
   {
     "client_email": "your-service-account@project.iam.gserviceaccount.com",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   }
   ```

### Add Environment Variables to Supabase
1. Go to https://supabase.com
2. Open your Tomas English project
3. Navigate to **Settings** → **Edge Functions** → **Secrets**
4. Add these secrets:

   **Secret 1:**
   - **Name**: `GOOGLE_PACKAGE_NAME`
   - **Value**: `com.tomashoca.english` (your app's package name)

   **Secret 2:**
   - **Name**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - **Value**: The `client_email` from JSON file

   **Secret 3:**
   - **Name**: `GOOGLE_PRIVATE_KEY`
   - **Value**: Base64-encode the `private_key` first:
     ```bash
     # On Mac/Linux:
     echo "-----BEGIN PRIVATE KEY-----..." | base64

     # On Windows PowerShell:
     [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("-----BEGIN PRIVATE KEY-----..."))
     ```
     Then paste the base64 result

5. Click **Save** for each

### Deploy Edge Function
```bash
# Deploy the verify-google-receipt function
supabase functions deploy verify-google-receipt
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

#### Initialize Billing
```typescript
import { initConnection, getSubscriptions, requestSubscription, finishTransaction } from 'react-native-iap';

// Product IDs (must match Google Play Console)
const PRODUCT_IDS = [
  'ai_only_monthly',
  'ai_only_quarterly',
  'ai_plus_live_monthly',
  'ai_plus_live_quarterly',
];

async function initBilling() {
  await initConnection();
  const subscriptions = await getSubscriptions({ skus: PRODUCT_IDS });
  console.log('Available subscriptions:', subscriptions);
}
```

#### Purchase Flow
```typescript
async function purchaseSubscription(productId: string) {
  try {
    // 1. Request purchase from Google
    const purchase = await requestSubscription({
      sku: productId,
    });

    // 2. Verify purchase with your backend
    const purchaseToken = purchase.purchaseToken;
    const userId = getCurrentUserId();

    const result = await SubscriptionService.verifyGoogleReceipt(
      purchaseToken,
      productId,
      userId
    );

    if (result.success) {
      // 3. Acknowledge purchase (important!)
      await finishTransaction({ purchase, isConsumable: false });

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
      const latestPurchase = purchases[0];
      const userId = getCurrentUserId();

      await SubscriptionService.verifyGoogleReceipt(
        latestPurchase.purchaseToken,
        latestPurchase.productId,
        userId
      );

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

### License Testing

1. **Add License Testers**:
   - Go to Google Play Console → **Setup** → **License testing**
   - Add Gmail addresses of testers
   - Select **License response**: `RESPOND_NORMALLY`

2. **Create Internal Testing Track**:
   - Navigate to **Release** → **Testing** → **Internal testing**
   - Click **Create new release**
   - Upload your APK/AAB
   - Add release notes
   - Click **Review release** → **Start rollout**

3. **Add Testers**:
   - Go to **Testers** tab
   - Create an email list or add individual emails
   - Testers receive an invitation link

4. **Install and Test**:
   - Testers click the invitation link
   - Install the app from the link
   - Purchases will be **FREE** for license testers!
   - Test all subscription flows

### Test Scenarios
- ✅ New subscription purchase
- ✅ Restore purchases
- ✅ Subscription renewal (wait 5 minutes for test purchases)
- ✅ Cancellation
- ✅ Upgrade/downgrade between tiers

---

## 8. Production Checklist

Before releasing to production:

- [ ] All subscription products created and activated
- [ ] Payment profile set up in Play Console
- [ ] Tax information completed
- [ ] Privacy Policy and Terms of Service uploaded
- [ ] Service account created and linked
- [ ] Service account credentials added to Supabase
- [ ] Edge function deployed and tested
- [ ] Tested all purchase flows with license testers
- [ ] Tested restore purchases
- [ ] Tested on multiple Android versions (Android 7+)
- [ ] Subscription management works (Google Play Store → Subscriptions)
- [ ] Refund policy documented
- [ ] Customer support email configured

---

## Important Notes

### Product ID Naming Convention
```
{tier}_{cycle}

Examples:
- ai_only_monthly
- ai_only_quarterly
- ai_plus_live_monthly
- ai_plus_live_quarterly
```

### Google's Revenue Split
- **Year 1**: Google takes 30%, you get 70%
- **Year 2+**: Google takes 15%, you get 85% (for subscribers who stay for 1+ year)

### Subscription Auto-Renewal
- Subscriptions automatically renew unless cancelled by user
- Google charges the user's payment method
- You must verify the new purchase token

### Grace Period (Important!)
- Enable **3-day grace period** for failed payments
- Gives users time to update payment method
- Subscription remains active during grace period

### Refunds
- Users can request refunds through Google Play
- Google decides whether to grant refunds
- You receive notifications via Real-time Developer Notifications (RTDN)

---

## Troubleshooting

### "Item not available for purchase"
- Product not activated in Play Console
- Product ID mismatch between code and Play Console
- App not published to internal testing track

### "Purchase signature verification failed"
- Service account not linked correctly
- Wrong package name in Supabase
- Private key not encoded correctly

### "You already own this item"
- Previous purchase not acknowledged/finished
- Call `finishTransaction()` to acknowledge

---

## Additional Resources

- [Google Play Billing Documentation](https://developer.android.com/google/play/billing)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Subscription Best Practices](https://developer.android.com/google/play/billing/subscriptions)
- [Testing Guide](https://developer.android.com/google/play/billing/test)

---

## Support

If you encounter issues:
1. Check Supabase Edge Function logs
2. Check Android Logcat logs
3. Verify product IDs match exactly
4. Ensure service account has correct permissions
5. Contact Google Play Support if needed
