
const ADMIN_SESSION_KEY = "myEmpireAdminSession";
const ADMIN_REMEMBER_KEY = "myEmpireRememberedAdmin";
const isAuthenticated =
    sessionStorage.getItem(ADMIN_SESSION_KEY) === "authenticated"
    || localStorage.getItem(ADMIN_REMEMBER_KEY) === "authenticated";

if (!isAuthenticated) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.documentElement.style.display = "none";
    window.location.replace(`index.html?redirect=${encodeURIComponent(currentPage)}`);
}

/* ==============================
   CONFIGURATION
============================== */

// Logo website
const logo = "https://img.magnific.com/premium-vector/golden-phoenix-bird-within-shield-elegant-logo-design-featuring-symbolizing-power-empire_560919-6723.jpg?semt=ais_hybrid&w=740&q=80";

// Navigation data
const navItems = [
    {
        name: "Sản phẩm",
        icon: "bi-box-seam",
        link: "products.html"
    },
    {
        name: "Đơn hàng",
        icon: "bi-receipt",
        link: "orders.html"
    },
    {
        name: "Người dùng",
        icon: "bi-people",
        link: "users.html"
    },
    {
        name: "Phản hồi",
        icon: "bi-chat-left-text",
        link: "feedback.html"
    },
    {
        name: "Tài khoản",
        icon: "bi-person-circle",
        link: "index.html"
    }
];

/* ==============================
   HEADER
============================== */

function renderHeader() {
    const header = document.getElementById("admin-header");

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const menuHTML = navItems.map(item => {
        const active = currentPage === item.link ? "active" : "";

        return `
            <a href="${item.link}" class="nav-link ${active}">
                <i class="bi ${item.icon}"></i>
                <span>${item.name}</span>
            </a>
        `;
    }).join("");

    header.innerHTML = `
        <div class="admin-header">
            <div class="header-container">

                <!-- BRAND -->
                <a href="index.html" class="brand">
                    <img src="${logo}" alt="My Empire Logo" class="brand-logo">
                    <div class="brand-name">My <span>Empire</span></div>
                </a>

                <!-- MOBILE BUTTON -->
                <button class="nav-toggle" id="nav-toggle" aria-label="Mở menu" aria-expanded="false" aria-controls="header-nav">
                    <i class="bi bi-list"></i>
                </button>

                <!-- NAVIGATION -->
                <nav class="header-nav" id="header-nav">
                    ${menuHTML}
                </nav>

            </div>
        </div>
    `;

    // Mobile menu toggle
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("header-nav");

    toggle.addEventListener("click", function() {
        nav.classList.toggle("show");

        const isOpen = nav.classList.contains("show");

        toggle.setAttribute("aria-expanded", isOpen);
        toggle.innerHTML = isOpen
            ? '<i class="bi bi-x-lg"></i>'
            : '<i class="bi bi-list"></i>';
    });

    // Close menu after selecting an item
    nav.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function() {
            nav.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
            toggle.innerHTML = '<i class="bi bi-list"></i>';
        });
    });
}

/* ==============================
   FOOTER
============================== */

function renderFooter() {
    const footer = document.getElementById("admin-footer");

    footer.innerHTML = `
        <div class="admin-footer">
            <div class="footer-container">

                <div class="footer-grid">

                    <!-- BRAND -->
                    <div class="footer-column">
                        <a href="index.html" class="footer-brand">
                            <img src="${logo}" alt="My Empire Logo" class="brand-logo">
                            <div class="brand-name">My <span>Empire</span></div>
                        </a>

                        <p class="footer-description">
                            My Empire - Thế giới đồ chơi dành cho mọi lứa tuổi.
                            Chúng tôi luôn mang đến những sản phẩm chất lượng,
                            sáng tạo và trải nghiệm mua sắm tuyệt vời.
                        </p>

                        <div class="footer-social">
                            <a href="#" class="social-link" aria-label="Facebook">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a href="#" class="social-link" aria-label="Instagram">
                                <i class="bi bi-instagram"></i>
                            </a>
                            <a href="#" class="social-link" aria-label="Youtube">
                                <i class="bi bi-youtube"></i>
                            </a>
                            <a href="#" class="social-link" aria-label="Tiktok">
                                <i class="bi bi-tiktok"></i>
                            </a>
                        </div>
                    </div>

                    <!-- QUICK LINKS -->
                    <div class="footer-column">
                        <h5 class="footer-title">Quản lý hệ thống</h5>

                        <ul class="footer-links">
                            <li>
                                <a href="products.html">
                                    <i class="bi bi-chevron-right"></i>
                                    Sản phẩm
                                </a>
                            </li>
                            <li>
                                <a href="orders.html">
                                    <i class="bi bi-chevron-right"></i>
                                    Đơn hàng
                                </a>
                            </li>
                            <li>
                                <a href="users.html">
                                    <i class="bi bi-chevron-right"></i>
                                    Người dùng
                                </a>
                            </li>
                            <li>
                                <a href="feedback.html">
                                    <i class="bi bi-chevron-right"></i>
                                    Phản hồi
                                </a>
                            </li>
                            <li>
                                <a href="index.html">
                                    <i class="bi bi-chevron-right"></i>
                                    Tài khoản
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- SUPPORT -->
                    <div class="footer-column">
                        <h5 class="footer-title">Hỗ trợ</h5>

                        <ul class="footer-links">
                            <li>
                                <a href="#">
                                    <i class="bi bi-chevron-right"></i>
                                    Trung tâm trợ giúp
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="bi bi-chevron-right"></i>
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="bi bi-chevron-right"></i>
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="bi bi-chevron-right"></i>
                                    Liên hệ hỗ trợ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- CONTACT -->
                    <div class="footer-column">
                        <h5 class="footer-title">Thông tin liên hệ</h5>

                        <div class="footer-contact">
                            <p>
                                <i class="bi bi-geo-alt-fill"></i>
                                <span>Việt Nam</span>
                            </p>

                            <p>
                                <i class="bi bi-envelope-fill"></i>
                                <span>support@myempire.vn</span>
                            </p>

                            <p>
                                <i class="bi bi-telephone-fill"></i>
                                <span>1900 1234</span>
                            </p>

                            <p>
                                <i class="bi bi-clock-fill"></i>
                                <span>Thứ 2 - Chủ nhật: 8:00 - 22:00</span>
                            </p>
                        </div>
                    </div>

                </div>

                <!-- COPYRIGHT -->
                <div class="footer-bottom">
                    <p>
                        © ${new Date().getFullYear()} 
                        <span>My Empire</span>. All rights reserved.
                    </p>

                    <p>
                        Designed with <span>♥</span> by My Empire Team
                    </p>
                </div>

            </div>
        </div>
    `;
}

/* ==============================
   INITIALIZATION
============================== */

document.addEventListener("DOMContentLoaded", function() {
    if (!isAuthenticated) return;
    renderHeader();
    renderFooter();
});
