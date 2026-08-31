import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from './firebase.js';

const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const googleLoginBtn = document.getElementById('googleLogin');
const forgotPasswordBtn = document.getElementById('forgotPassword');
const signupLink = document.getElementById('signup');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', (e) => {
        e.preventDefault();
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.style.fill = type === 'text' ? '#4d8aea' : '#8e8f96';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        if (!emailInput || !passwordInput || !messageDiv || !loginBtn) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        messageDiv.textContent = "";

        loginBtn.disabled = true;
        loginBtn.textContent = "অপেক্ষা করুন...";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            messageDiv.style.color = "#4caf50";
            messageDiv.textContent = "লগইন সফল হয়েছে! রিডাইরেক্ট করা হচ্ছে...";
            setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
        } catch (error) {
            loginBtn.disabled = false;
            loginBtn.textContent = "Log in";
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।";
        }
    });
}

if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            window.location.href = "dashboard.html";
        } catch (error) {
            if (messageDiv) {
                messageDiv.style.color = "#ff6b6b";
                messageDiv.textContent = "গুগল লগইন ব্যর্থ হয়েছে।";
            }
        }
    });
}

if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        if (!emailInput) return;
        const email = emailInput.value.trim();
        if (!email) { alert("প্রথমে ইমেইলটি লিখুন।"); return; }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("আপনার ইমেইলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে।");
        } catch (error) { alert("ইমেইলটি পাওয়া যায়নি।"); }
    });
}

if (signupLink) { signupLink.addEventListener('click', (e) => { e.preventDefault(); window.location.href = "signup.html"; }); }
