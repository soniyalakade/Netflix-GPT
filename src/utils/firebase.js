import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh_BiBBLgmP39QPoCNomXsHwd50HJ-3Bw",
  authDomain: "netflix-gpt-a4e35.firebaseapp.com",
  projectId: "netflix-gpt-a4e35",
  storageBucket: "netflix-gpt-a4e35.appspot.com",
  messagingSenderId: "26738907692",
  appId: "1:26738907692:web:4ecdef0c09a6e4c1608f89"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);