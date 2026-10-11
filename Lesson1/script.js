// Bài 1: Hiển thị dữ liệu từ file js
    // Khai báo danh sách dữ liệu
const students = [
    {id: 1, name: 'Anh Minh'},
    {id: 2, name: 'Đức Khiêm'},
    {id: 3, name: 'Minh cụt'},
    {id: 4, name: 'Bảo Hoàng'},
    {id: 5, name: 'Khôi Nguyên'},
    {id: 6, name: 'Minh Trí'},
    {id: 7, name: 'Duy An'}
]

    // Hàm hiển thị dữ liệu
function displayStudents() {
    // Dùng DOM để lấy container (thẻ ul chứa học sinh)
    const container = document.getElementById('student-list');
    // Duyệt students 
    students.forEach(student => {
        // Tạo thẻ li cho mỗi học sinh
        const li = document.createElement('li');
        // Gán nội dung cho thẻ li
        li.textContent = `ID: ${student.id}, Tên: ${student.name}`;
        // Thêm thẻ li vào container
        container.appendChild(li);
    })
}
    // Gọi hàm hiển thị
displayStudents();

// Bài 2: 