import { auth, signOut, onAuthStateChanged } from './firebase.js';

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('userName').textContent = user.displayName || "ব্যবহারকারী";
        document.getElementById('userEmail').textContent = user.email;
        const savedPhoto = localStorage.getItem(`pic_${user.uid}`);
        if (savedPhoto) document.getElementById('profilePic').src = savedPhoto;
        else if (user.photoURL) document.getElementById('profilePic').src = user.photoURL;
    } else { window.location.href = "index.html"; }
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("ছবি ২MB এর ছোট হতে হবে।"); return; }
    
    const reader = new FileReader();
    reader.onloadend = () => {
        const user = auth.currentUser;
        if (user) {
            localStorage.setItem(`pic_${user.uid}`, reader.result);
            document.getElementById('profilePic').src = reader.result;
            document.getElementById('message').style.color = "#4caf50";
            document.getElementById('message').textContent = "ছবি আপলোড সফল!";
        }
    };
    reader.readAsDataURL(file);
});

document.getElementById('logoutBtn').addEventListener('click', () => { signOut(auth); });
