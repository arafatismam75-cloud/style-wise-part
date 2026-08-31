import { initializeApp } from "https://gstatic.com";
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
} from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyAsnyGvH1WbPhyv-19183jj5HRWfMqpitU",
  authDomain: "://firebaseapp.com",
  projectId: "style-wise-part-entry",
  storageBucket: "style-wise-part-entry.firebasestorage.app",
  messagingSenderId: "728926671654",
  appId: "1:728926671654:web:039c27229fd375b5bfe7a7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
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
