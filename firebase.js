// ======================================================
// Firebase Configuration
// Style Wise Part
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

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
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// ======================================================
// Firebase Config
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyAsnyGvH1WbPhyv-19183jj5HRWfMqpitU",
    authDomain: "style-wise-part-entry.firebaseapp.com",
    projectId: "style-wise-part-entry",
    storageBucket: "style-wise-part-entry.firebasestorage.app",
    messagingSenderId: "728926671654",
    appId: "1:728926671654:web:039c27229fd375b5bfe7a7"
};


// ======================================================
// Initialize Firebase
// ======================================================

const app = initializeApp(firebaseConfig);


// ======================================================
// Firebase Authentication
// ======================================================

export const auth = getAuth(app);


// ======================================================
// Export Authentication Functions
// ======================================================

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
