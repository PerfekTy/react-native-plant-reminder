import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnbI_wIKkXL6Gf01Xp3Utq6ca3qr8e3NA",
  authDomain: "rn-plant-reminder.firebaseapp.com",
  projectId: "rn-plant-reminder",
  storageBucket: "rn-plant-reminder.appspot.com",
  messagingSenderId: "809302150510",
  appId: "1:809302150510:web:0c4e3b76ee60cff6b1c57f",
  measurementId: "G-MW2TP2EMCS",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
