// Khởi tạo Firebase bằng cách nhập cấu hình chung của dự án.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Tạo kết nối Firebase và tham chiếu đến collection products trên Firestore.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsRef = collection(db, "products");

// Lưu danh sách sản phẩm nhận được để phục vụ tìm kiếm, lọc và sắp xếp.
let products = [];

// Các phần tử DOM thường dùng được lấy một lần để tránh truy vấn lặp.
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const sortFilter = document.getElementById("sort-filter");
const productModalElement = document.getElementById("productModal");
const deleteModalElement = document.getElementById("deleteModal");
const productModal = new bootstrap.Modal(productModalElement);
const deleteModal = new bootstrap.Modal(deleteModalElement);
const productForm = document.getElementById("product-form");

// Chuyển ký tự đặc biệt thành mã an toàn khi nội dung được chèn vào HTML.
function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// Định dạng số tiền theo tiền tệ Việt Nam.
function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

// Định dạng ngày hiển thị nhưng không làm thay đổi dữ liệu gốc.
function formatDate(value) {
    if (!value) return "Chưa cập nhật";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? String(value)
        : new Intl.DateTimeFormat("vi-VN").format(date);
}

// Hiển thị thông báo ngắn bằng Bootstrap Toast sau mỗi thao tác.
function showToast(message, type = "success") {
    const toastElement = document.getElementById("app-toast");
    const toastMessage = document.getElementById("toast-message");
    const toastIcon = document.getElementById("toast-icon");

    toastMessage.textContent = message;
    toastIcon.className = type === "error"
        ? "bi bi-x-circle-fill text-danger"
        : "bi bi-check-circle-fill";

    bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 2600 }).show();
}

// Cập nhật danh mục có trong dữ liệu để người dùng có thể lọc chính xác.
function updateCategoryOptions() {
    const categories = [...new Set(products
        .map(item => item.category)
        .filter(Boolean))]
        .sort((a, b) => String(a).localeCompare(String(b), "vi"));

    const currentValue = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="">Tất cả danh mục</option>' +
        categories.map(category =>
            `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
        ).join("");
    categoryFilter.value = categories.includes(currentValue) ? currentValue : "";
}

// Chuyển dữ liệu Firestore thành mảng sản phẩm kèm ID tài liệu.
onSnapshot(productsRef, snapshot => {
    products = snapshot.docs.map(documentSnapshot => ({
        docId: documentSnapshot.id,
        ...documentSnapshot.data()
    }));

    updateCategoryOptions();
    renderProducts();
}, error => {
    productList.innerHTML = `
        <div class="empty-state">
            <i class="bi bi-wifi-off"></i>
            <strong>Không thể tải dữ liệu</strong>
            <span>${escapeHTML(error.message)}</span>
        </div>`;
    document.getElementById("result-count").textContent = "Lỗi kết nối";
    showToast("Không thể kết nối Firestore", "error");
});

// Lọc và sắp xếp danh sách dựa trên ô tìm kiếm và các điều kiện đã chọn.
function getVisibleProducts() {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    const visible = products.filter(product => {
        const matchesName = !keyword || String(product.name || "").toLowerCase().includes(keyword);
        const matchesCategory = !category || product.category === category;

        let matchesPrice = true;
        if (priceRange) {
            const [minimum, maximum] = priceRange.split("-").map(Number);
            matchesPrice = Number(product.price) >= minimum && Number(product.price) <= maximum;
        }

        return matchesName && matchesCategory && matchesPrice;
    });

    switch (sortFilter.value) {
        case "priceAsc":
            return visible.sort((a, b) => Number(a.price) - Number(b.price));
        case "priceDesc":
            return visible.sort((a, b) => Number(b.price) - Number(a.price));
        case "stockAsc":
            return visible.sort((a, b) => Number(a.stock) - Number(b.stock));
        default:
            return visible.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
    }
}

// Vẽ toàn bộ sản phẩm theo hàng ngang dọc.
function renderProducts() {
    const visible = getVisibleProducts();
    const lowStockCount = products.filter(product => Number(product.stock) <= 10).length;

    document.getElementById("total-product-count").textContent =
        new Intl.NumberFormat("vi-VN").format(products.length);
    document.getElementById("low-stock-count").textContent =
        new Intl.NumberFormat("vi-VN").format(lowStockCount);
    document.getElementById("result-count").textContent =
        `Hiển thị ${visible.length} / ${products.length} sản phẩm`;

    if (!visible.length) {
        productList.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <strong>Không tìm thấy sản phẩm</strong>
                <span>Hãy thử đổi từ khóa hoặc bộ lọc.</span>
            </div>`;
        return;
    }

    productList.innerHTML = visible.map(product => {
        const stock = Number(product.stock) || 0;
        const price = Number(product.price) || 0;
        const discount = Number(product.discount) || 0;
        const discountedPrice = discount
            ? price * (100 - discount) / 100
            : price;
        const fallbackImage = "https://placehold.co/160x160/f1f5f9/64748b?text=My+Empire";

        return `
            <article class="product-row">
                <div class="product-image-wrap">
                    <img src="${escapeHTML(product.image || fallbackImage)}"
                         alt="${escapeHTML(product.name)}"
                         onerror="this.onerror=null;this.src='${fallbackImage}'">
                </div>
                <div class="product-info">
                    <span class="product-code">Mã SP-${escapeHTML(product.id ?? "-")}</span>
                    <h3 title="${escapeHTML(product.name)}">${escapeHTML(product.name || "Không tên")}</h3>
                    <div class="product-meta">
                        <span class="tag">${escapeHTML(product.brand || "Chưa có thương hiệu")}</span>
                        ${stock <= 10 ? '<span class="tag tag-low">Sắp hết hàng</span>' : ""}
                    </div>
                </div>
                <div class="category-cell">
                    <span class="row-label">Danh mục</span>
                    <span class="row-value">${escapeHTML(product.category || "Chưa phân loại")}</span>
                </div>
                <div class="price-cell">
                    <span class="row-label">Giá bán</span>
                    <span class="row-price">${formatCurrency(discountedPrice)}</span>
                    ${discount ? `<span class="old-price">${formatCurrency(price)}</span>` : ""}
                </div>
                <div>
                    <span class="row-label">Tồn kho</span>
                    <span class="stock-pill ${stock <= 10 ? "low" : ""}">
                        <i class="bi bi-circle-fill"></i>${stock} sản phẩm
                    </span>
                </div>
                <div class="row-actions">
                    <button type="button" class="action-button action-view" data-action="view" data-doc-id="${escapeHTML(product.docId)}" title="Xem chi tiết">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button type="button" class="action-button action-edit" data-action="edit" data-doc-id="${escapeHTML(product.docId)}" title="Sửa">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="action-button action-delete" data-action="delete" data-doc-id="${escapeHTML(product.docId)}" title="Xóa">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </article>`;
    }).join("");
}

// Các trường nhập liệu được gom lại để đọc và ghi dữ liệu đồng nhất.
const formFields = {
    name: "product-name",
    description: "product-description",
    id: "product-id",
    brand: "product-brand",
    category: "product-category",
    ageRange: "product-age",
    material: "product-material",
    color: "product-color",
    price: "product-price",
    discount: "product-discount",
    stock: "product-stock",
    sold: "product-sold",
    rating: "product-rating",
    image: "product-image",
    createdAt: "product-created",
    updatedAt: "product-updated"
};

// Đưa dữ liệu sản phẩm vào popup hoặc xóa trắng tất cả trường khi thêm mới.
function fillProductForm(product = null) {
    Object.entries(formFields).forEach(([field, elementId]) => {
        const input = document.getElementById(elementId);
        input.value = product ? (product[field] ?? "") : "";
    });

    document.getElementById("product-doc-id").value = product?.docId || "";

    if (!product) {
        const highestId = products.reduce((maximum, item) =>
            Math.max(maximum, Number(item.id) || 0), 0);
        document.getElementById("product-id").value = highestId + 1;
        document.getElementById("product-created").value =
            new Date().toISOString().slice(0, 10);
        document.getElementById("product-updated").value =
            new Date().toISOString().slice(0, 10);
    }
}

// Bật chế độ xem, sửa hoặc thêm bằng cách khóa hoặc mở các trường.
function setFormMode(mode) {
    const detailMode = mode === "view";
    const saveButton = document.getElementById("save-product");
    productForm.querySelectorAll("input, textarea").forEach(input => {
        input.readOnly = detailMode;
    });
    saveButton.hidden = detailMode;

    document.getElementById("productModalTitle").textContent =
        mode === "view" ? "Chi tiết sản phẩm"
        : mode === "edit" ? "Cập nhật sản phẩm"
        : "Thêm sản phẩm";
    document.getElementById("product-modal-kicker").textContent =
        mode === "view" ? "THÔNG TIN CHI TIẾT"
        : mode === "edit" ? "CHỈNH SỬA"
        : "SẢN PHẨM MỚI";
}

// Tạo mới một sản phẩm hoặc ghi đè dữ liệu sản phẩm đang sửa.
async function saveProduct(event) {
    event.preventDefault();

    if (!productForm.checkValidity()) {
        productForm.reportValidity();
        return;
    }

    const payload = {};
    Object.entries(formFields).forEach(([field, elementId]) => {
        const input = document.getElementById(elementId);
        const numericFields = ["id", "price", "discount", "stock", "sold", "rating"];
        payload[field] = numericFields.includes(field)
            ? Number(input.value) || 0
            : input.value.trim();
    });

    payload.updatedAt = document.getElementById("product-updated").value ||
        new Date().toISOString().slice(0, 10);

    const saveButton = document.getElementById("save-product");
    saveButton.disabled = true;

    try {
        const docId = document.getElementById("product-doc-id").value;
        if (docId) {
            await setDoc(doc(db, "products", docId), payload, { merge: true });
            showToast("Đã cập nhật thông tin sản phẩm");
        } else {
            await addDoc(productsRef, payload);
            showToast("Đã thêm sản phẩm mới");
        }
        productModal.hide();
    } catch (error) {
        showToast("Không thể lưu sản phẩm: " + error.message, "error");
    } finally {
        saveButton.disabled = false;
    }
}

// Mở các popup tương ứng với nút Chi tiết, Sửa hoặc Xóa.
productList.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const product = products.find(item => item.docId === button.dataset.docId);
    if (!product) return;

    if (button.dataset.action === "delete") {
        document.getElementById("delete-doc-id").value = product.docId;
        document.getElementById("delete-modal-text").textContent =
            `Bạn có chắc muốn xóa "${product.name}"? Hành động này không thể hoàn tác.`;
        deleteModal.show();
        return;
    }

    fillProductForm(product);
    setFormMode(button.dataset.action);
    productModal.show();
});

// Xóa tài liệu khỏi Firestore sau khi người dùng xác nhận ở popup cảnh báo.
document.getElementById("confirm-delete").addEventListener("click", async () => {
    const docId = document.getElementById("delete-doc-id").value;
    const button = document.getElementById("confirm-delete");
    button.disabled = true;

    try {
        await deleteDoc(doc(db, "products", docId));
        deleteModal.hide();
        showToast("Đã xóa sản phẩm");
    } catch (error) {
        showToast("Không thể xóa sản phẩm: " + error.message, "error");
    } finally {
        button.disabled = false;
    }
});

// Mở popup trắng để nhập thông tin sản phẩm mới.
document.getElementById("open-add-product").addEventListener("click", () => {
    fillProductForm();
    setFormMode("add");
    productModal.show();
});

// Gắn các bộ lọc để danh sách được tính lại tức thì khi người dùng thay đổi.
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
priceFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);
productForm.addEventListener("submit", saveProduct);

// Nút làm mới yêu cầu tải lại bằng cách gọi lại listener thời gian thực.
document.getElementById("refresh-products").addEventListener("click", () => {
    renderProducts();
    showToast("Đã cập nhật danh sách");
});