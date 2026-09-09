// Firebase SDK (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider, 
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js";

// ✅ আপনার আসল Firebase Config (আপনার দেওয়া তথ্য থেকে)
const firebaseConfig = {
  apiKey: "AIzaSyXvYjUwBpVivzFJ3S3jJhq8WNoqjt",
  authDomain: "style-wise-part-entry.firebaseapp.com",
  projectId: "style-wise-part-entry",
  storageBucket: "storage.googleapis.com",
  messagingSenderId: "729726671654",
  appId: "1:729726671654:web:83fc2729fcf3785bf7e7",
  measurementId: "5-LkE103PWM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// সব ফাংশন এক্সপোর্ট
export { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider, 
    signInWithPopup, 
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
};
