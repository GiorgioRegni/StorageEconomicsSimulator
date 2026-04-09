/*
Firebase placeholder.

This app runs entirely on local state today. If a backend is added later,
this file is the right place to initialize the Firebase app and shared services.

Typical next steps:
1. Add Firebase SDK packages.
2. Pull config from environment variables.
3. Export initialized services such as Firestore, Analytics, or Functions.
4. Keep UI components dependent on higher-level hooks, not raw SDK calls.

Example shape:

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
*/

export {};

