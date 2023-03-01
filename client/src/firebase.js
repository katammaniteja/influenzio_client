// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3xMOdIvHempcpSSMClaai2yyl9OqT8xs",
  authDomain: "wayfarer-75c72.firebaseapp.com",
  projectId: "wayfarer-75c72",
  storageBucket: "wayfarer-75c72.appspot.com",
  messagingSenderId: "914974267702",
  appId: "1:914974267702:web:bab7507a28947df513fb97",
  measurementId: "G-GFWMTZN25V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
