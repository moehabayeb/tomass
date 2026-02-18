# Google Play Billing Setup Guide
## Start Making Money from Tomas Hoca

---

## Overview

This guide will help you set up in-app subscriptions on Google Play so users can pay directly through the app.

**What you'll set up:**
- 4 subscription products in Google Play Console
- Google Cloud service account for receipt verification
- Environment variables in Supabase

**Time needed:** About 1-2 hours

---

## Step 1: Create Subscription Products in Google Play Console

### 1.1 Go to Google Play Console
1. Open: https://play.google.com/console
2. Select your app: **Tomas Hoca**
3. In the left menu, go to: **Monetize** → **Products** → **Subscriptions**

### 1.2 Create Your First Subscription: AI Only Monthly

Click **"Create subscription"** and fill in:

| Field | Value |
|-------|-------|
| Product ID | `ai_only_monthly` |
| Name | AI Only Plan (Monthly) |
| Description | Unlimited AI English practice with grammar feedback and pronunciation analysis |

Then click **"Add a base plan"**:

| Field | Value |
|-------|-------|
| Base plan ID | `ai-only-monthly-base` |
| Billing period | 1 Month |
| Price (Turkey) | ₺250.00 |
| Renewal type | Auto-renewing |
| Grace period | 7 days |
| Account hold | 30 days |

**Free trial settings (recommended):**
| Field | Value |
|-------|-------|
| Free trial | 7 days |
| Trial availability | Once per app |

Click **Save** and **Activate**.

### 1.3 Create AI Only Quarterly

Click **"Create subscription"** again:

| Field | Value |
|-------|-------|
| Product ID | `ai_only_quarterly` |
| Name | AI Only Plan (3 Months - Save 20%) |
| Description | Unlimited AI English practice - Best value! Save ₺150 |

Base plan:
| Field | Value |
|-------|-------|
| Base plan ID | `ai-only-quarterly-base` |
| Billing period | 3 Months |
| Price (Turkey) | ₺600.00 |

### 1.4 Create AI + Live Monthly

| Field | Value |
|-------|-------|
| Product ID | `ai_plus_live_monthly` |
| Name | AI + Live Lessons (Monthly) |
| Description | Unlimited AI practice + 16 live classes per month with native teachers |

Base plan:
| Field | Value |
|-------|-------|
| Billing period | 1 Month |
| Price (Turkey) | ₺4,750.00 |
| Free trial | 7 days |

### 1.5 Create AI + Live Quarterly

| Field | Value |
|-------|-------|
| Product ID | `ai_plus_live_quarterly` |
| Name | AI + Live Lessons (3 Months - Save 20%) |
| Description | Best value! Unlimited AI + 16 live classes per month |

Base plan:
| Field | Value |
|-------|-------|
| Billing period | 3 Months |
| Price (Turkey) | ₺11,400.00 |

---

## Step 2: Set Up Google Cloud Service Account

This is needed so your app can verify purchases are real.

### 2.1 Go to Google Cloud Console
1. Open: https://console.cloud.google.com
2. Select or create a project (use the same one linked to your Play Console)

### 2.2 Enable the Android Publisher API
1. Go to: **APIs & Services** → **Library**
2. Search for: `Google Play Android Developer API`
3. Click on it and click **Enable**

### 2.3 Create a Service Account
1. Go to: **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - Name: `tomashoca-play-billing`
   - Description: `Service account for verifying Play Store purchases`
4. Click **Create and Continue**
5. Skip the role selection (click **Continue**)
6. Click **Done**

### 2.4 Create a Key for the Service Account
1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create**
6. **SAVE THIS FILE SECURELY** - you'll need it in Step 3

### 2.5 Link Service Account to Play Console
1. Go back to **Google Play Console**
2. Go to: **Settings** → **Developer account** → **API access**
3. Find your service account in the list
4. Click **Grant access**
5. Set permissions:
   - **View app information and download bulk reports** ✓
   - **View financial data, orders, and cancellation survey responses** ✓
   - **Manage orders and subscriptions** ✓
6. Click **Invite user**
7. Accept the invitation

---

## Step 3: Configure Supabase Environment Variables

### 3.1 Get Your Service Account Details

Open the JSON file you downloaded in Step 2.4. You need:
- `client_email` (looks like: `tomashoca-play-billing@yourproject.iam.gserviceaccount.com`)
- `private_key` (the long key starting with `-----BEGIN PRIVATE KEY-----`)

### 3.2 Add Environment Variables to Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: **Settings** → **Edge Functions**
4. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `GOOGLE_PACKAGE_NAME` | `com.tomashoca.english` (your app's package name) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` from your JSON file |
| `GOOGLE_PRIVATE_KEY` | The `private_key` from your JSON file (base64 encoded*) |

**To base64 encode the private key:**
1. Copy the entire private key (including BEGIN and END lines)
2. Go to: https://www.base64encode.org
3. Paste the key and click Encode
4. Copy the result and use that as the value

### 3.3 Deploy the Edge Function

Run this command in your terminal:
```bash
npx supabase functions deploy verify-google-receipt
```

Or if using Supabase CLI:
```bash
supabase functions deploy verify-google-receipt
```

---

## Step 4: Update the App to Accept Payments

The app currently shows "Coming Soon" on the pricing page. You need a developer to:

1. **Remove the waitlist modal** and enable actual checkout
2. **Add the Google Play Billing Library** to the Android app
3. **Test purchases** using test accounts

### Key Files to Modify:
- `src/pages/Pricing.tsx` - Remove "Coming Soon" banner, enable purchase buttons
- `android/app/build.gradle` - Add billing library dependency
- Create new file for billing integration

### For Testing:
1. In Play Console → **Settings** → **License testing**
2. Add your test Gmail accounts
3. These accounts can make purchases without being charged

---

## Step 5: Testing Checklist

Before going live:

- [ ] All 4 subscription products are active in Play Console
- [ ] Service account is linked and has correct permissions
- [ ] Environment variables are set in Supabase
- [ ] Edge function is deployed
- [ ] Test purchase works with license tester account
- [ ] Subscription shows as active in the app after purchase
- [ ] Cancellation works correctly

---

## Step 6: Go Live

Once testing is complete:

1. **Update the app version** in `android/app/build.gradle`
2. **Build a new AAB** file
3. **Upload to Play Console** → Release → Production
4. **Wait for review** (usually 1-3 days)

---

## Pricing Summary

| Product | Monthly | Quarterly |
|---------|---------|-----------|
| AI Only | ₺250 | ₺600 (₺200/mo) |
| AI + Live | ₺4,750 | ₺11,400 (₺3,800/mo) |

**Google's cut:** 15% for first $1M/year, then 30%
**Your revenue:** 85% of each purchase (for first $1M)

---

## Revenue Projections

| Subscribers | Plan | Monthly Revenue (Your Share) |
|-------------|------|------------------------------|
| 10 | AI Only | ₺2,125 (~$65) |
| 50 | AI Only | ₺10,625 (~$325) |
| 100 | AI Only | ₺21,250 (~$650) |
| 10 | AI + Live | ₺40,375 (~$1,235) |
| 50 | AI + Live | ₺201,875 (~$6,175) |

---

## Troubleshooting

### "Purchase token invalid"
- Check that the service account has correct permissions in Play Console
- Verify the package name matches exactly

### "API not enabled"
- Make sure you enabled the Google Play Android Developer API in Google Cloud

### "Service account not authorized"
- Go to Play Console → API access and verify the service account is linked
- Make sure you accepted the invitation

### Purchases not reflecting in app
- Check Supabase logs for the edge function
- Verify the user_subscriptions table is being updated

---

## Support Contacts

- **Google Play Help:** https://support.google.com/googleplay/android-developer
- **Supabase Support:** support@supabase.io
- **Developer:** [Your contact info]

---

## Quick Reference: Product IDs

```
ai_only_monthly
ai_only_quarterly
ai_plus_live_monthly
ai_plus_live_quarterly
```

These MUST match exactly in:
1. Google Play Console
2. Your Android app code
3. The verify-google-receipt function

---

*Document created: January 2026*
