import { 
    auth, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    sendPasswordResetEmail 
} from './firebase.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const googleLoginBtn = document.getElementById('googleLogin');
const forgotPasswordBtn = document.getElementById('forgotPassword');
const signupLink = document.getElementById('signup');

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

// ২. ইমেইল + পাসওয়ার্ড লগইন
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        if (!emailInput || !passwordInput || !messageDiv || !loginBtn) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        messageDiv.textContent = "";
        
        if (!email.includes('@') || !email.includes('.')) {
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "অনুগ্রহ করে একটি সঠিক ইমেইল লিখুন।";
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = "অপেক্ষা করুন...";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            messageDiv.style.color = "#4caf50";
            messageDiv.textContent = "লগইন সফল! রিডাইরেক্ট করা হচ্ছে...";
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1200);
        } catch (error) {
            console.error("লগইন এরর:", error);
            loginBtn.disabled = false;
            loginBtn.textContent = "Log in";
            messageDiv.style.color = "#ff6b6b";

            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                messageDiv.textContent = "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
            } else if (error.code === 'auth/too-many-requests') {
                messageDiv.textContent = "অনেকবার চেষ্টা করেছেন, একটু পরে আবার চেষ্টা করুন।";
            } else {
                messageDiv.textContent = "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।";
            }
        }
    });
}

// ৩. গুগল লগইন
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (messageDiv) messageDiv.textContent = "";
        const provider = new GoogleAuthProvider();
        
        try {
            await signInWithPopup(auth, provider);
            if (messageDiv) {
                messageDiv.style.color = "#4caf50";
                messageDiv.textContent = "গুগল লগইন সফল!";
            }
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("গুগল লগইন এরর:", error);
            if (messageDiv && error.code !== 'auth/popup-closed-by-user') {
                messageDiv.style.color = "#ff6b6b";
                messageDiv.textContent = "গুগল লগইন ব্যর্থ হয়েছে।";
            }
        }
    });
}

// ৪. পাসওয়ার্ড রিসেট
if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const emailInput = document.getElementById('email');
        if (!emailInput || !messageDiv) return;

        const email = emailInput.value.trim();
        
        if (!email || !email.includes('@')) {
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "পাসওয়ার্ড রিসেট করতে ইমেইল লিখুন।";
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            messageDiv.style.color = "#4caf50";
            messageDiv.textContent = "রিসেট লিংক ইমেইলে পাঠানো হয়েছে।";
        } catch (error) {
            console.error("রিসেট এরর:", error);
            messageDiv.style.color = "#ff6b6b";
            messageDiv.textContent = "রিসেট ইমেইল পাঠানো যায়নি।";
        }
    });
}

// ৫. সাইনআপ পেজে যাওয়া
if (signupLink) {
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "signup.html";
    });
}                break;
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
