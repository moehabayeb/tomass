# App Store Connect — Complete Listing

## Basic Info
- **App Name:** Tomas Hoca
- **Subtitle:** AI English Tutor & Live Classes
- **Bundle ID:** `com.tomashoca.app`
- **Primary Category:** Education
- **Secondary Category:** Lifestyle
- **Price:** Free (with In-App Purchases)
- **Age Rating:** 4+

---

## Description

```
Master English with AI-powered conversations and live classes with real teachers.

Tomas Hoca is a complete English learning platform designed for Turkish speakers at every level — from beginner (A1) to proficiency (C2). Practice speaking with an AI tutor, complete 300+ structured lessons, play voice-controlled games, and join live online classes.

SPEAK ENGLISH WITH AI
• Have real-time voice conversations with your AI tutor
• Get instant feedback on pronunciation, grammar, and vocabulary
• Practice hands-free with voice commands
• Save helpful phrases to review later

300+ STRUCTURED LESSONS
• Grammar lessons with clear explanations and Turkish translations
• Speaking practice with guided Q&A exercises
• Take a voice-based placement test to find your level
• Progressive difficulty from A1 to C2

LIVE ONLINE CLASSES
• Join up to 16 live classes per month with real teachers
• Small group sessions organized by level
• Class reminders and Zoom integration

FUN LEARNING GAMES
• Voice-controlled Hangman — say letters out loud
• Smart Flashcards with AI pronunciation scoring
• Earn XP, unlock badges, and build daily streaks

TRACK YOUR PROGRESS
• XP leveling system with milestones
• 9 achievement badges to collect
• Daily streak rewards
• Detailed proficiency scores

SUBSCRIPTION OPTIONS
• Free: 10 AI conversations per day
• AI Only: Unlimited AI practice
• AI + Live: Unlimited AI + 16 live classes per month
• 7-day free trial available

Download now and start speaking English with confidence.
```

---

## Keywords (100 character limit)

```
english,learn,speaking,AI,tutor,lessons,Turkish,grammar,pronunciation,CEFR,practice,conversation
```

---

## What's New (Version 1.0)

```
Welcome to Tomas Hoca! Your AI-powered English learning journey starts here.

• AI conversation practice with real-time voice recognition
• 300+ lessons across all CEFR levels (A1–C2)
• Voice-based placement test
• Live online classes with teachers
• Hangman and Flashcard games
• XP, badges, and daily streaks
```

---

## URLs
- **Privacy Policy:** https://tomashoca.com/privacy-policy
- **Support URL:** https://tomashoca.com
- **Marketing URL:** https://tomashoca.com

---

## Age Rating Questionnaire Answers

| Question | Answer |
|----------|--------|
| Cartoon or Fantasy Violence | None |
| Realistic Violence | None |
| Prolonged Graphic or Sadistic Realistic Violence | None |
| Profanity or Crude Humor | None |
| Mature/Suggestive Themes | None |
| Horror/Fear Themes | None |
| Medical/Treatment Information | None |
| Alcohol, Tobacco, or Drug Use or References | None |
| Simulated Gambling | None |
| Sexual Content or Nudity | None |
| Unrestricted Web Access | No |
| Gambling with Real Currency | No |

**Result: Rated 4+**

---

## Screenshot Specs

| Device | Size (pixels) | Required |
|--------|---------------|----------|
| iPhone 6.7" (15 Pro Max) | 1290 x 2796 | **Yes** |
| iPhone 6.5" (11 Pro Max) | 1242 x 2688 | **Yes** |
| iPad 12.9" (6th gen) | 2048 x 2732 | Only if supporting iPad |

**You need 3-10 screenshots per size.** Recommended 5 screenshots showing:
1. AI conversation screen (speaking with tutor)
2. Lessons view (module list with levels)
3. Placement test or proficiency results
4. Games (flashcards or hangman)
5. Live meetings / class schedule

**Tip:** Run the app on your iPhone, take real screenshots, then add text captions on top using Figma, Canva, or AppMockUp (app-mockup.com).

---

## In-App Purchases to Register

Create these in App Store Connect under **Subscriptions**.
Group them under one **Subscription Group** called "Tomas Hoca Premium".

| Product | Type | Price |
|---------|------|-------|
| AI Only Monthly | Auto-Renewable Subscription | TL 250/mo |
| AI Only Quarterly | Auto-Renewable Subscription | TL 600/3mo |
| AI + Live Monthly | Auto-Renewable Subscription | TL 4,750/mo |
| AI + Live Quarterly | Auto-Renewable Subscription | TL 11,400/3mo |

---

## Build Checklist (on Mac)

1. `cd ios/App && pod install`
2. `cd ../.. && npm run build && npx cap sync ios`
3. Open `ios/App/App.xcworkspace` in Xcode
4. Select target: **Any iOS Device (arm64)**
5. **Product > Archive**
6. **Distribute App > App Store Connect > Upload**
7. Wait for processing (~10 min), then select build in App Store Connect
8. Submit for review
