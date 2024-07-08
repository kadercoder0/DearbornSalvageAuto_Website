// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);