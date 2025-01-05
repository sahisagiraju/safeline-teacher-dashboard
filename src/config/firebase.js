// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgPaLx5dVKUCEDCfjJlWYRa1uc53ljBys",
  authDomain: "safeline-8e5ee.firebaseapp.com",
  databaseURL: "https://safeline-8e5ee-default-rtdb.firebaseio.com",
  projectId: "safeline-8e5ee",
  storageBucket: "safeline-8e5ee.firebasestorage.app",
  messagingSenderId: "876446768457",
  appId: "1:876446768457:web:c19b32511f2e416ac7ce98",
  measurementId: "G-E8PF06KCQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);