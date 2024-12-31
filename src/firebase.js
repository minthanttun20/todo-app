import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8klzszdBcw3fBvZzn4Cdwt8VYkugHT7Q",
  authDomain: "todoapp-3f702.firebaseapp.com",
  projectId: "todoapp-3f702",
  storageBucket: "todoapp-3f702.firebasestorage.app",
  messagingSenderId: "1078594808604",
  appId: "1:1078594808604:web:9806ae251ab152935aa8d9",
  measurementId: "G-QRG8B6WWET"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);