// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
