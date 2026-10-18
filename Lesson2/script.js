// Bài 1: Darkmode - Lightmode
    // Dùng DOM để lấy button
const toggleButton = document.getElementById('themeBtn');

    // Xử lý sự kiện click
toggleButton.onclick = () => {
    // Thêm hoặc xóa class darkmode cho body
    document.body.classList.toggle('darkmode');
    // Lưu trạng thái hiện tại vào localStorage
    if (document.body.classList.contains('darkmode')) {
        localStorage.setItem('theme', 'darkmode');
    } else {
        localStorage.removeItem('theme');
    }
}

    // load trạng thái theme từ localStorage khi reload trang
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'darkmode') {
    document.body.classList.add('darkmode');
} else {
    document.body.classList.remove('darkmode');
}

// Bài 2: Notes List
    // Lấy ghi chú trong local Storage hoặc tạo danh sách rỗng
let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Hàm hiển thị danh sách ghi chú
function displayNotes() {
    // Lấy conatiner để hiển thị ghi chú
    const container = document.getElementById('noteList');
    // Xóa toàn bộ nội dung cũ trong conatiner
    container.innerHTML = '';
    // Duyệt danh sách ghi chú và tạo phần tử hiển thị
    notes.forEach((note, index) => {
        container.innerHTML += `<li>${note}</li>`;
    });
}
displayNotes();

    // Sự kiện ấn nút (Thêm ghi chú)
const addButton = document.getElementById('addNote');    
addButton.onclick = () => {
    // Lấy giá trị từ input
    let content = document.getElementById('noteInput').value.trim();
    if (content) {
        // Thêm ghi chú vào mảng
        notes.push(content);
        // Lưu danh sách ghi chú vào localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
        // Hiển thị lại danh sách ghi chú
        displayNotes();
        // Xóa nội dung input sau khi thêm
        document.getElementById("noteInput").value = "";
    }
}