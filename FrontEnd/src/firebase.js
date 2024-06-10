// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "crmproj-fa553.firebaseapp.com",
  projectId: "crmproj-fa553",
  storageBucket: "crmproj-fa553.appspot.com",
  messagingSenderId: "280077244525",
  appId: "1:280077244525:web:625c0863bd8e284e2b8764"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);