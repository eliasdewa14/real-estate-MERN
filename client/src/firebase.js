// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bmm-estate.firebaseapp.com",
  projectId: "bmm-estate",
  storageBucket: "bmm-estate.appspot.com",
  messagingSenderId: "207630333832",
  appId: "1:207630333832:web:ffd08ce80dacb88ec2ac3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);