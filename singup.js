import { 
    auth, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from './firebase.js';

const signupForm = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');
const signupBtn = document.getElementById('signupBtn');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

// ১. পাসওয়ার্ড দেখানো/লুকানো
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.style.fill = type === 'text' ? '#4d8aea' : '#8e8f96';
    });
}

// ২. সাইনআপ
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        
        if (!nameInput || !emailInput || !passwordInput || !messageDiv || !signupBtn) return;
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        messageDiv.textContent = "";
        
        if (name.length < 2) {
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "নাম লিখুন (কমপক্ষে ২ অক্ষর)।";
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "সঠিক ইমেইল লিখুন।";
            return;
        }
        
        if (password.length < 6) {
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "পাসওয়ার্ড ৬+ অক্ষরের হতে হবে।";
            return;
        }

        signupBtn.disabled = true;
        signupBtn.textContent = "অ্যাকাউন্ট তৈরি হচ্ছে...";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });

            messageDiv.style.color = "#4caf50";
            messageDiv.textContent = "🎉 অ্যাকাউন্ট তৈরি সফল!";
            
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);

        } catch (error) {
            console.error("Signup Error:", error);
            messageDiv.style.color = "#ff6b6b";
            signupBtn.disabled = false;
            signupBtn.textContent = "Create Account";

            if (error.code === 'auth/email-already-in-use') {
                messageDiv.textContent = "এই ইমেইল ইতিমধ্যে ব্যবহার হচ্ছে।";
            } else if (error.code === 'auth/invalid-email') {
                messageDiv.textContent = "সঠিক ইমেইল দিন।";
            } else {
                messageDiv.textContent = "অ্যাকাউন্ট তৈরি যায়নি। আবার চেষ্টা করুন।";
            }
        }
    });
}
