# Parøkonomi

A shared expense planner for couples with different incomes. Splits shared costs proportionally based on each person's monthly net salary. Syncs in real-time between devices via Firebase Firestore — no login required.

## Features

- Proportional expense splitting based on income ratio
- Real-time sync between two devices (share a household ID with your partner)
- Pre-loaded with common Norwegian household expenses
- Add / remove custom expense items
- Summary view with pie chart breakdown
- Export to Excel or PNG image
- Norwegian UI

## Tech stack

- React + Vite
- Tailwind CSS v4
- Firebase Firestore (free Spark plan)
- Recharts (pie chart)
- xlsx + html2canvas (export)

## Local development

1. Clone the repo
2. Copy `.env.local.example` to `.env.local` and fill in your Firebase config:

```bash
cp .env.local.example .env.local
```

3. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Firebase setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** in test mode
3. Set the following security rules in Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /households/{householdId} {
      allow read, write: if true;
    }
  }
}
```

4. Go to Project settings → Your apps → Web app to get your config values and add them to `.env.local`

## Deployment (Vercel)

Push to GitHub, then import the repo in [vercel.com](https://vercel.com). Add the environment variables from `.env.local` in the Vercel project settings under **Environment Variables**.

## How to share with your partner

1. Open the app and create a new household
2. Click **Del** in the top bar to copy the household ID
3. Your partner opens the app, clicks **Bli med i eksisterende**, and pastes the ID
