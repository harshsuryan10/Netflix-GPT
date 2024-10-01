// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNKnLeq2vPQaQZUOKEdqcupz6TWQdER-g",
  authDomain: "netflixgpt-27255.firebaseapp.com",
  projectId: "netflixgpt-27255",
  storageBucket: "netflixgpt-27255.appspot.com",
  messagingSenderId: "94350371984",
  appId: "1:94350371984:web:34db2f0f33ae873628bc15",
  measurementId: "G-RCHM3L5M7G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();