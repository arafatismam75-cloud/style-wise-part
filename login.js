// login.js
import { auth, googleProvider } from './firebase.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// DOM Elements
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');
const loginBtn = document.getElementById('loginBtn');
const forgotPassword = document.getElementById('forgotPassword');
const signupBtn = document.getElementById('signup');
const togglePassword = document.getElementById('togglePassword');
const googleLogin = document.getElementById('googleLogin');
const appleLogin = document.getElementById('appleLogin');

// Clear message function
function clearMessage() {
    setTimeout(() => {
        message.textContent = '';
    }, 5000);
}

// Show message function
function showMessage(text, isError = true) {
    message.style.color = isError ? '#ff6b6b' : '#4caf50';
    message.textContent = isError ? '❌ ' + text : '✅ ' + text;
    clearMessage();
}

// ============ LOGIN ============
loginBtn.addEventListener('click', async () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !passwordValue) {
        showMessage('দয়া করে ইমেইল ও পাসওয়ার্ড দিন');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'লগইন হচ্ছে...';

    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        showMessage('স্বাগতম! লগইন সফল!', false);
        console.log('Logged in user:', userCredential.user);
        // window.location.href = 'dashboard.html';
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই';
                break;
            case 'auth/wrong-password':
                errorMessage = 'পাসওয়ার্ড ভুল';
                break;
            case 'auth/invalid-email':
                errorMessage = 'ইমেইল ঠিক নয়';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'অনেক চেষ্টা করেছেন, একটু পরে আবার চেষ্টা করুন';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Log in';
    }
});

// ============ SIGN UP ============
signupBtn.addEventListener('click', async () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !passwordValue) {
        showMessage('দয়া করে ইমেইল ও পাসওয়ার্ড দিন');
        return;
    }

    if (passwordValue.length < 6) {
        showMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
        return;
    }

    signupBtn.disabled = true;
    signupBtn.textContent = 'অ্যাকাউন্ট তৈরি...';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        showMessage('অ্যাকাউন্ট তৈরি সফল! এখন লগইন করুন', false);
        console.log('New user:', userCredential.user);
        email.value = '';
        password.value = '';
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'এই ইমেইল আগেই ব্যবহার করা হয়েছে';
                break;
            case 'auth/invalid-email':
                errorMessage = 'ইমেইল ঠিক নয়';
                break;
            case 'auth/weak-password':
                errorMessage = 'পাসওয়ার্ড খুব সহজ, ৬ অক্ষর দিন';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Sign up';
    }
});

// ============ FORGOT PASSWORD ============
forgotPassword.addEventListener('click', async () => {
    const emailValue = email.value.trim();

    if (!emailValue) {
        showMessage('পাসওয়ার্ড রিসেট করতে আপনার ইমেইল দিন');
        return;
    }

    forgotPassword.disabled = true;
    forgotPassword.textContent = 'পাঠানো হচ্ছে...';

    try {
        await sendPasswordResetEmail(auth, emailValue);
        showMessage('পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে!', false);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই';
                break;
            case 'auth/invalid-email':
                errorMessage = 'ইমেইল ঠিক নয়';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        forgotPassword.disabled = false;
        forgotPassword.textContent = 'Forgot password?';
    }
});

// ============ GOOGLE LOGIN ============
googleLogin.addEventListener('click', async () => {
    googleLogin.disabled = true;
    googleLogin.textContent = 'গুগলে লগইন...';

    try {
        const result = await signInWithPopup(auth, googleProvider);
        showMessage(`স্বাগতম ${result.user.displayName || 'ইউজার'}!`, false);
        console.log('Google user:', result.user);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'পপআপ বন্ধ করে দিয়েছেন';
                break;
            case 'auth/cancelled-popup-request':
                errorMessage = 'পপআপ বাতিল করা হয়েছে';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        googleLogin.disabled = false;
        googleLogin.textContent = 'Log in with Google';
    }
});

// ============ APPLE LOGIN ============
appleLogin.addEventListener('click', () => {
    showMessage('Apple লগইন শুধুমাত্র iOS ডিভাইসে কাজ করে', false);
});

// ============ TOGGLE PASSWORD VISIBILITY ============
let isPasswordVisible = false;
togglePassword.addEventListener('click', function() {
    isPasswordVisible = !isPasswordVisible;
    password.type = isPasswordVisible ? 'text' : 'password';
});

// ============ CHECK AUTH STATE ============
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is logged in:', user.email);
    } else {
        console.log('No user is logged in');
    }
});

// ============ ENTER KEY SUPPORT ============
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

console.log('🔥 Firebase Authentication ready!');    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'এই ইমেইল আগেই ব্যবহার করা হয়েছে';
                break;
            case 'auth/invalid-email':
                errorMessage = 'ইমেইল ঠিক নয়';
                break;
            case 'auth/weak-password':
                errorMessage = 'পাসওয়ার্ড খুব সহজ, ৬ অক্ষর দিন';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Sign up';
    }
});

// ============ FORGOT PASSWORD ============
forgotPassword.addEventListener('click', async () => {
    const emailValue = email.value.trim();

    if (!emailValue) {
        showMessage('পাসওয়ার্ড রিসেট করতে আপনার ইমেইল দিন');
        return;
    }

    forgotPassword.disabled = true;
    forgotPassword.textContent = 'পাঠানো হচ্ছে...';

    try {
        await sendPasswordResetEmail(auth, emailValue);
        showMessage('পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে!', false);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই';
                break;
            case 'auth/invalid-email':
                errorMessage = 'ইমেইল ঠিক নয়';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        forgotPassword.disabled = false;
        forgotPassword.textContent = 'Forgot password?';
    }
});

// ============ GOOGLE LOGIN ============
googleLogin.addEventListener('click', async () => {
    googleLogin.disabled = true;
    googleLogin.textContent = 'গুগলে লগইন...';

    try {
        const result = await signInWithPopup(auth, googleProvider);
        showMessage(`স্বাগতম ${result.user.displayName || 'ইউজার'}!`, false);
        console.log('Google user:', result.user);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'পপআপ বন্ধ করে দিয়েছেন';
                break;
            case 'auth/cancelled-popup-request':
                errorMessage = 'পপআপ বাতিল করা হয়েছে';
                break;
            default:
                errorMessage = error.message;
        }
        showMessage(errorMessage);
    } finally {
        googleLogin.disabled = false;
        googleLogin.textContent = 'Log in with Google';
    }
});

// ============ APPLE LOGIN ============
appleLogin.addEventListener('click', () => {
    showMessage('Apple লগইন শুধুমাত্র iOS ডিভাইসে কাজ করে', false);
});

// ============ TOGGLE PASSWORD VISIBILITY ============
let isPasswordVisible = false;
togglePassword.addEventListener('click', function() {
    isPasswordVisible = !isPasswordVisible;
    password.type = isPasswordVisible ? 'text' : 'password';
    
    // আইকন পরিবর্তন (ঐচ্ছিক)
    if (isPasswordVisible) {
        this.innerHTML = `<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>`;
    } else {
        this.innerHTML = `<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>`;
    }
});

// ============ CHECK AUTH STATE (ঐচ্ছিক) ============
// ইউজার ইতিমধ্যে লগইন করা আছে কিনা চেক করুন
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is logged in:', user.email);
        // ইউজার লগইন থাকলে ড্যাশবোর্ডে পাঠান
        // window.location.href = 'dashboard.html';
    } else {
        console.log('No user is logged in');
    }
});

// ============ ENTER KEY SUPPORT ============
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

console.log('🔥 Firebase Authentication ready!');
