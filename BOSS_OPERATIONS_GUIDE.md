# Tomas Hoca - Operations Guide
## For Business Owner / Administrator

---

# TABLE OF CONTENTS

1. [Quick Start - Daily Tasks](#1-quick-start---daily-tasks)
2. [Managing Live Meetings/Classes](#2-managing-live-meetingsclasses)
3. [Understanding Subscriptions & Payments](#3-understanding-subscriptions--payments)
4. [User Management](#4-user-management)
5. [The Database (Supabase)](#5-the-database-supabase)
6. [App Store Management](#6-app-store-management)
7. [Common Issues & Solutions](#7-common-issues--solutions)
8. [Important Accounts & Passwords](#8-important-accounts--passwords)
9. [Monthly Tasks Checklist](#9-monthly-tasks-checklist)

---

# 1. QUICK START - DAILY TASKS

## What You Need to Check Daily:
1. New user sign-ups (in Supabase dashboard)
2. Upcoming meetings that need Zoom links
3. Payment notifications (Stripe/Iyzico dashboard)
4. Any user support requests

## Your Admin Access:
- Log into the app with your admin account
- You'll see a red "Admin" button in the top-right menu
- This gives you access to create/edit/delete meetings

---

# 2. MANAGING LIVE MEETINGS/CLASSES

## How to Create a New Meeting:

### Step 1: Create a Zoom Meeting First
1. Go to https://zoom.us and log in
2. Click "Schedule a Meeting"
3. Fill in:
   - Topic: Same as your class title
   - Date & Time: When the class will happen
   - Duration: How long (e.g., 60 minutes)
   - Meeting ID: Generate Automatically
   - Passcode: Enable (for security)
   - Waiting Room: Optional
4. Click "Save"
5. **COPY THE MEETING LINK** - You'll need this!

### Step 2: Add Meeting to the App
1. Open Tomas Hoca app
2. Log in with your admin account
3. Go to Menu (top-right) → Admin
4. Click "Create New Meeting"
5. Fill in the form:

| Field | What to Enter | Example |
|-------|---------------|---------|
| Title | Class name | "Beginner Conversation Practice" |
| Description | What students will learn | "Practice everyday English conversations" |
| Teacher Name | Instructor's name | "Tomas" |
| Level | Student level (A1-C2 or General) | "A1" or "General" |
| Date & Time | When class starts | Pick from calendar |
| Duration | Class length in minutes | "60" |
| Capacity | Max students allowed | "20" |
| Zoom Link | Paste the link from Step 1 | "https://zoom.us/j/..." |

6. Click "Create Meeting"

### Step 3: Verify the Meeting
- Go to the Meetings tab in the app
- Your new meeting should appear in the list
- Students can now see it and enroll

## How to Edit a Meeting:
1. Go to Admin panel
2. Find the meeting in the list
3. Click "Edit"
4. Make your changes
5. Click "Save"

## How to Cancel/Delete a Meeting:
1. Go to Admin panel
2. Find the meeting
3. Click "Delete" or toggle "Active" to OFF
4. **IMPORTANT:** Also cancel the Zoom meeting!

## Meeting Best Practices:
- Create meetings at least 24 hours in advance
- Always test your Zoom link before the class
- Set capacity based on your Zoom plan limits
- Students can join 15 minutes before start time

---

# 3. UNDERSTANDING SUBSCRIPTIONS & PAYMENTS

## The 3 Subscription Tiers:

### FREE (No Payment)
- Limited access to lessons
- 3 AI conversations per day
- No live classes
- Shows ads

### AI ONLY (Monthly Payment)
- Unlimited AI practice
- All lesson modules
- No live classes
- No ads

### AI + LIVE (Premium - Monthly Payment)
- Everything in AI Only
- Unlimited live class access
- Priority booking
- Certificates

## Where Payments Come From:

### 1. Stripe (Credit Cards - International)
- Dashboard: https://dashboard.stripe.com
- You'll receive email notifications for:
  - New subscriptions
  - Failed payments
  - Cancellations
- Money goes to your connected bank account

### 2. Iyzico (Turkish Payment Cards)
- Dashboard: https://merchant.iyzico.com
- Popular for Turkish customers
- Similar notifications as Stripe

### 3. Google Play (Android In-App Purchases)
- Dashboard: https://play.google.com/console
- Google takes 15-30% commission
- Payouts are monthly

### 4. Apple App Store (iOS In-App Purchases)
- Dashboard: https://appstoreconnect.apple.com
- Apple takes 15-30% commission
- Payouts are monthly

## Checking Revenue:
1. **Daily:** Check Stripe/Iyzico dashboards
2. **Monthly:** Check Google Play & Apple reports
3. **All data is also stored in Supabase** (user_subscriptions table)

## Handling Payment Issues:

### "Student says they paid but don't have access"
1. Check payment dashboard (Stripe/Iyzico/Google/Apple)
2. Find their email/transaction
3. If payment confirmed, check Supabase:
   - Go to user_subscriptions table
   - Find by user email
   - Update status to "active" if needed

### "Student wants a refund"
- Stripe: Issue refund from dashboard
- Iyzico: Issue refund from dashboard
- Google Play: They must request through Google
- Apple: They must request through Apple

---

# 4. USER MANAGEMENT

## Viewing Users:
1. Go to https://supabase.com/dashboard
2. Log in with admin credentials
3. Select your project (sgzhbiknaiqsuknwgvjr)
4. Click "Table Editor" on left menu
5. Click "profiles" table

## User Information Available:
- Full name
- Email
- Current level (A1, A2, B1, etc.)
- XP points
- Subscription status
- Registration date

## Common User Tasks:

### Reset a User's Password:
1. In Supabase dashboard
2. Go to Authentication → Users
3. Find the user by email
4. Click the three dots (...)
5. Click "Send password reset email"

### Make Someone an Admin:
1. In Supabase dashboard
2. Go to Table Editor → user_roles
3. Click "Insert row"
4. Add:
   - user_id: (copy from profiles table)
   - role: "admin"
5. Save

### Check a User's Subscription:
1. Go to Table Editor → user_subscriptions
2. Find by user_id or search
3. Check "tier_code" and "status" columns

---

# 5. THE DATABASE (SUPABASE)

## What is Supabase?
Think of it as a giant spreadsheet that stores ALL the app's data:
- User accounts
- Subscriptions
- Meeting information
- Progress data
- Everything!

## How to Access:
1. Go to: https://supabase.com/dashboard
2. Log in with admin credentials
3. Select project: sgzhbiknaiqsuknwgvjr

## Important Tables (Like Spreadsheet Tabs):

| Table Name | What It Stores |
|------------|----------------|
| profiles | User information (name, email, level) |
| user_subscriptions | Who paid, what tier, status |
| meetings | All live class information |
| meeting_enrollments | Who signed up for which class |
| conversation_messages | AI chat history |

## Safety Rules:
- **NEVER delete data directly** unless you're 100% sure
- Always **export/backup** before making changes
- If unsure, ask a developer first

## How to Backup Data:
1. In Supabase dashboard
2. Go to Project Settings → Database
3. Click "Backups"
4. Supabase does daily automatic backups
5. You can also export tables as CSV:
   - Go to Table Editor
   - Select a table
   - Click "Export" button

---

# 6. APP STORE MANAGEMENT

## Google Play Console

### Access:
- URL: https://play.google.com/console
- Log in with: (your Google account with access)

### Key Sections:

**Dashboard:** Overview of downloads, ratings, crashes

**Statistics:**
- Daily installs/uninstalls
- Revenue (if using Google Play billing)
- User countries

**Reviews & Ratings:**
- Check regularly (daily is best)
- Reply to negative reviews professionally
- Thank positive reviewers

**App Content:**
- Keep privacy policy up to date
- Update app description if needed

### Updating the App:
When a developer gives you a new APK/AAB file:
1. Go to Release → Production
2. Click "Create new release"
3. Upload the file
4. Write "What's new" notes
5. Click "Review release"
6. Click "Start rollout"

## Apple App Store Connect

### Access:
- URL: https://appstoreconnect.apple.com
- Log in with: Apple ID with admin access

### Key Sections:
- Similar to Google but different layout
- Check reviews, downloads, revenue

### Updating the App:
iOS updates require a developer with a Mac.
The developer will submit, you just need to approve.

---

# 7. COMMON ISSUES & SOLUTIONS

## "Microphone not working for students"

**Solution:**
1. Ask them to check browser permissions
2. They should see a microphone icon in the address bar
3. Click it and select "Allow"
4. Refresh the page
5. If on Android app: Go to Settings → Apps → Tomas Hoca → Permissions → Enable Microphone

## "Student can't join Zoom meeting"

**Solution:**
1. Check if meeting time hasn't passed
2. Verify the Zoom link is correct in admin panel
3. Students can only join 15 minutes before start
4. Make sure meeting is set to "Active"

## "Lessons not loading"

**Solution:**
1. Ask student to refresh the page
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try a different browser
4. Check if Supabase is online (status.supabase.com)

## "Payment went through but no access"

**Solution:**
1. Check payment dashboard (Stripe/Iyzico)
2. Find the transaction
3. Go to Supabase → user_subscriptions
4. Find the user
5. Update "status" to "active"
6. Update "tier_code" to correct tier

## "App is slow or crashing"

**Solution:**
1. Ask user to update to latest version
2. Clear app cache (Settings → Apps → Tomas Hoca → Clear Cache)
3. Check Supabase status page
4. If widespread, contact developer

## "Student forgot password"

**Solution:**
1. They can click "Forgot Password" on login screen
2. Or you can send reset from Supabase (see User Management section)

---

# 8. IMPORTANT ACCOUNTS & PASSWORDS

## Keep This Information Safe!

### Supabase (Database)
- URL: https://supabase.com/dashboard
- Project ID: sgzhbiknaiqsuknwgvjr
- Username: _______________
- Password: _______________

### Google Play Console
- URL: https://play.google.com/console
- Account: _______________
- Password: _______________

### Apple App Store Connect
- URL: https://appstoreconnect.apple.com
- Apple ID: _______________
- Password: _______________

### Stripe (Payments)
- URL: https://dashboard.stripe.com
- Email: _______________
- Password: _______________

### Iyzico (Turkish Payments)
- URL: https://merchant.iyzico.com
- Email: _______________
- Password: _______________

### Zoom Account
- URL: https://zoom.us
- Email: _______________
- Password: _______________

### Domain/Hosting (if applicable)
- Provider: _______________
- URL: _______________
- Username: _______________
- Password: _______________

### Developer Contact
- Name: Mohammad Hussam Habayeb
- Email: _______________
- Phone: _______________

---

# 9. MONTHLY TASKS CHECKLIST

## Beginning of Month:
- [ ] Review last month's revenue (all payment sources)
- [ ] Check subscription renewals and churn
- [ ] Review user growth numbers
- [ ] Plan meeting schedule for the month
- [ ] Create all Zoom meetings for the month

## Weekly:
- [ ] Check and respond to app store reviews
- [ ] Review any support requests
- [ ] Verify upcoming meetings have correct Zoom links
- [ ] Check for failed payments in Stripe/Iyzico

## Daily (5 minutes):
- [ ] Quick check of new sign-ups
- [ ] Verify today's meetings are ready
- [ ] Respond to urgent support issues

## Quarterly:
- [ ] Review pricing strategy
- [ ] Check if app store descriptions need updates
- [ ] Review subscription tier features
- [ ] Backup all data (export from Supabase)
- [ ] Review and update privacy policy if needed

---

# QUICK REFERENCE CARD

## Creating a Meeting (Quick Steps):
1. Create Zoom meeting → Copy link
2. App → Admin → Create Meeting
3. Fill form → Paste Zoom link → Save

## Checking Payments:
- Stripe: dashboard.stripe.com
- Iyzico: merchant.iyzico.com
- Google: play.google.com/console
- Apple: appstoreconnect.apple.com

## User Issues:
- Password reset: Supabase → Auth → Users → Reset
- Subscription fix: Supabase → user_subscriptions → Edit

## Emergency Contacts:
- Developer: [Add contact info]
- Supabase Support: support@supabase.io
- Stripe Support: support@stripe.com

---

# NOTES

Use this space for your own notes:

_______________________________________________

_______________________________________________

_______________________________________________

_______________________________________________

_______________________________________________

---

*Document created: January 2026*
*App Version: v60*
*For questions about this guide, contact your developer.*
