// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdDQpfnfBM4sE2hWImbzwRhsn9S73fgBI",
  authDomain: "netflixgpt-c5152.firebaseapp.com",
  projectId: "netflixgpt-c5152",
  storageBucket: "netflixgpt-c5152.firebasestorage.app",
  messagingSenderId: "903992562023",
  appId: "1:903992562023:web:9d43586b949b9086749fc2",
  measurementId: "G-06854F0XBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
