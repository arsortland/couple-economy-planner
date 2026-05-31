// Created: 2026-01-14 10:00
// v2 - Initial file: Firebase app initialization and Firestore export
// Purpose: Initializes Firebase app with project config and exports the Firestore db instance
//          used by useHousehold hook for real-time data sync between devices.
//
// SETUP: Replace the placeholder values below with your own Firebase project config.
// Get your config at: https://console.firebase.google.com/
//   -> Your project -> Project settings -> Your apps -> SDK setup and configuration

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKBFPkFLuRaADPm0OWAwuLWA33dzpHdn8",
  authDomain: "couple-economy-planner.firebaseapp.com",
  projectId: "couple-economy-planner",
  storageBucket: "couple-economy-planner.firebasestorage.app",
  messagingSenderId: "905723591835",
  appId: "1:905723591835:web:2b9931502edca128ddda3e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
