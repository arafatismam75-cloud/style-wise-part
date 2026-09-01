// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAsnyGvHlWbPhyVrI9I83Jj5HrWFMqpjtU",
    authDomain: "style-wise-part-entry.firebaseapp.com",
    projectId: "style-wise-part-entry",
    storageBucket: "style-wise-part-entry.firebasestorage.app",
    messagingSenderId: "728926671654",
    appId: "1:728926671654:web:039c27229fd375b5bfe7e7",
    measurementId: "G-LN31D39WK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export them
export { auth, googleProvider };
