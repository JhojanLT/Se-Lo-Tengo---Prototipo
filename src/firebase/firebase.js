// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChMR9_yLAi48Ts0J-o0SGnDjfKDOGYs3M",
  authDomain: "sltdatabase-aa1ce.firebaseapp.com",
  projectId: "sltdatabase-aa1ce",
  storageBucket: "sltdatabase-aa1ce.firebasestorage.app",
  messagingSenderId: "969231347173",
  appId: "1:969231347173:web:254ea0ffb905bc5782130c",
  measurementId: "G-GKCD0F0378",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
