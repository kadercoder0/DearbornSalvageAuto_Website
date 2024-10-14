// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Auth
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh1nxM9MImx8WHU6IWysVS2XGaAaNsofk",
  authDomain: "dearbornsalvageauto.firebaseapp.com",
  projectId: "dearbornsalvageauto",
  storageBucket: "dearbornsalvageauto.appspot.com",
  messagingSenderId: "680280512011",
  appId: "1:680280512011:web:24fe311bc98f9f5a6f190e",
  measurementId: "G-R05MZ8330V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
export const storage = getStorage(app);
