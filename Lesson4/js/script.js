// File firebase-config.js
import { firebaseConfig } from "./firebase-config.js";
// Thư viện Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// Thư viện Authentication
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut
}
    from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// Thư viện Firestore
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
    addDoc,
	deleteDoc,
	onSnapshot,
	orderBy,
	serverTimestamp
}
    from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Khởi tạo firebase
const app = initializeApp(firebaseConfig);
// test app
console.log(app.name); // "[DEFAULT]"

// Khởi tạo các dịch vụ (Authentication và Firestore)
const auth = getAuth(app);
const db = getFirestore(app);

// Dịch vụ Google Auth
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Dùng DOM lấy các section
const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const profileSection = document.getElementById("profile-section");

// Hiển thị section
function showSection(section) {
	// Ẩn toàn bộ 3 section
    loginSection.classList.add("hidden");
    registerSection.classList.add("hidden");
    profileSection.classList.add("hidden");
	// Bỏ ẩn section được truyền vào
    section.classList.remove("hidden");
}
showSection(registerSection);

// Validation - kiểm tra thông tin
	// Dung regular expression (regex)
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^(03|05|07|08|09)\d{8}$/.test(phone);
}

function isValidPassword(password) {
	// min 6 ký tự, gồm viết thường, viết hoa, số
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
}


function calculateAge(dob) {

    const birthDate = new Date(dob);

    const today = new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const m =
        today.getMonth() -
        birthDate.getMonth();

    if (
        m < 0 ||
        (m === 0 &&
            today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

// Sự kiện click vào nút chuyển trang
document.getElementById("show-register-btn").addEventListener("click", () => {
    // Chuyển sang form đăng ký
    showSection(registerSection);
});

document.getElementById("show-login-btn").addEventListener("click", () => {
    // Chuyển sang form đăng nhập
    showSection(loginSection);
});
