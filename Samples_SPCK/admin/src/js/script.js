const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Admin@123";
const SESSION_KEY = "myEmpireAdminSession";
const REMEMBER_KEY = "myEmpireRememberedAdmin";
const MANAGEMENT_PAGES = ["products.html", "orders.html", "users.html", "feedback.html"];

const form = document.getElementById("admin-login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("password-toggle");
const rememberInput = document.getElementById("remember-me");
const loginButton = document.getElementById("login-button");
const loginAlert = document.getElementById("login-alert");
const loginView = document.getElementById("login-view");
const activeView = document.getElementById("active-view");

function getSession() {
    return sessionStorage.getItem(SESSION_KEY) === "authenticated"
        || localStorage.getItem(REMEMBER_KEY) === "authenticated";
}

function showActiveSession() {
    loginView.hidden = true;
    activeView.hidden = false;
    const params = new URLSearchParams(window.location.search);
    const target = params.get("redirect");
    document.getElementById("enter-admin").href =
        MANAGEMENT_PAGES.includes(target) ? target : "products.html";
}

function clearErrors() {
    ["username", "password"].forEach(id => {
        const input = document.getElementById(id);
        input.closest(".input-wrap").classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        document.getElementById(`${id}-error`).textContent = "";
    });
    loginAlert.classList.remove("show");
    loginAlert.textContent = "";
}

function setFieldError(input, message) {
    input.closest(".input-wrap").classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    document.getElementById(`${input.id}-error`).textContent = message;
}

passwordToggle.addEventListener("click", () => {
    const showPassword = passwordInput.type === "password";
    passwordInput.type = showPassword ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", String(showPassword));
    passwordToggle.setAttribute("aria-label", showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    passwordToggle.innerHTML = showPassword
        ? '<i class="bi bi-eye-slash"></i>'
        : '<i class="bi bi-eye"></i>';
    passwordInput.focus();
});

form.addEventListener("submit", event => {
    event.preventDefault();
    clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;

    if (!username) {
        setFieldError(usernameInput, "Vui lòng nhập tên đăng nhập.");
        isValid = false;
    }

    if (!password) {
        setFieldError(passwordInput, "Vui lòng nhập mật khẩu.");
        isValid = false;
    }

    if (!isValid) {
        (username ? passwordInput : usernameInput).focus();
        return;
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        loginAlert.textContent = "Tên đăng nhập hoặc mật khẩu không chính xác.";
        loginAlert.classList.add("show");
        passwordInput.closest(".input-wrap").classList.add("has-error");
        passwordInput.setAttribute("aria-invalid", "true");
        passwordInput.select();
        return;
    }

    loginButton.classList.add("loading");
    loginButton.innerHTML = '<span>Đang xác thực...</span><i class="bi bi-arrow-repeat"></i>';

    window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "authenticated");

        if (rememberInput.checked) {
            localStorage.setItem(REMEMBER_KEY, "authenticated");
        } else {
            localStorage.removeItem(REMEMBER_KEY);
        }

        const params = new URLSearchParams(window.location.search);
        const target = params.get("redirect");
        window.location.replace(MANAGEMENT_PAGES.includes(target) ? target : "products.html");
    }, 650);
});

document.getElementById("logout-button").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    loginView.hidden = false;
    activeView.hidden = true;
    form.reset();
    clearErrors();
    usernameInput.focus();
});

[usernameInput, passwordInput].forEach(input => {
    input.addEventListener("input", () => {
        input.closest(".input-wrap").classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        document.getElementById(`${input.id}-error`).textContent = "";
        loginAlert.classList.remove("show");
    });
});

if (getSession()) {
    showActiveSession();
} else {
    rememberInput.checked = localStorage.getItem(REMEMBER_KEY) === "authenticated";
}