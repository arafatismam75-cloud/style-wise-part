import { auth, createUserWithEmailAndPassword, updateProfile } from './firebase.js';

const signupForm = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');
const signupBtn = document.getElementById('signupBtn');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.style.fill = type === 'text' ? '#4d8aea' : '#8e8f96';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('username').value;
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        messageDiv.textContent = "";
        
        if (password.length < 6) {
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "পাসওয়ার্ড অবশ্যই কমপক্ষে ৬ অক্ষরের হতে হবে।";
            return;
        }

        signupBtn.disabled = true;
        signupBtn.textContent = "অ্যাকাউন্ট তৈরি হচ্ছে...";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            messageDiv.style.color = "#4caf50";
            messageDiv.textContent = "অ্যাকাউন্ট তৈরি সফল হয়েছে! রিডাইরেক্ট করা হচ্ছে...";
            setTimeout(() => { window.location.href = "dashboard.html"; }, 2000);
        } catch (error) {
            signupBtn.disabled = false;
            signupBtn.textContent = "Create Account";
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "রেজিস্ট্রেশন ব্যর্থ হয়েছে বা ইমেইলটি আগে ব্যবহার করা হয়েছে।";
        }
    });
}
