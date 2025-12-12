// Firebase Configuration for MediScript Enterprise
// Production-grade setup with security best practices

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAZH8VLSoUV5f2D9ptwIi6m3bTV3SZSwGg",
  authDomain: "mediscript-ai-78d2f.firebaseapp.com",
  projectId: "mediscript-ai-78d2f",
  storageBucket: "mediscript-ai-78d2f.firebasestorage.app",
  messagingSenderId: "590655526128",
  appId: "1:590655526128:web:bd52e56obddd562fe1e35",
  measurementId: "G-TYTEEY9SFC"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const functions: Functions = getFunctions(app);
export const analytics: Analytics = getAnalytics(app);

// Enable persistence for offline support
import { enableIndexedDbPersistence } from 'firebase/firestore';

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

export default app;
