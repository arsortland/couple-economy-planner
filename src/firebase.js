// Created: 2026-01-14 10:00
// v2.1 - Updated: Firebase config values moved to .env.local environment variables
// Purpose: Initializes Firebase app with project config and exports the Firestore db instance
//          used by useHousehold hook for real-time data sync between devices.
//
// SETUP: Copy .env.local.example to .env.local and fill in your Firebase project config.
// Get your config at: https://console.firebase.google.com/
//   -> Your project -> Project settings -> Your apps -> SDK setup and configuration

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
