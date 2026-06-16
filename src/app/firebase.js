import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase web config is public by design — safe to live in client code.
// Data is protected by Firestore security rules + Authentication.
const firebaseConfig = {
  apiKey: 'AIzaSyBZoq80VkHoqt1-sl6ngiOfFyaFoSV2m2E',
  authDomain: 'portfolio-98a03.firebaseapp.com',
  projectId: 'portfolio-98a03',
  storageBucket: 'portfolio-98a03.firebasestorage.app',
  messagingSenderId: '467415098328',
  appId: '1:467415098328:web:6c771a39eedaf31663c8ad',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
