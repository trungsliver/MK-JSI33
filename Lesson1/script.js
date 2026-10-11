// Bài 1: Hiển thị dữ liệu từ file js
// Khai báo danh sách dữ liệu
const students = [
    { id: 1, name: 'Anh Minh' },
    { id: 2, name: 'Đức Khiêm' },
    { id: 3, name: 'Minh cụt' },
    { id: 4, name: 'Bảo Hoàng' },
    { id: 5, name: 'Khôi Nguyên' },
    { id: 6, name: 'Minh Trí' },
    { id: 7, name: 'Duy An' }
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

// Bài 2: Hiển thị dữ liệu từ file JSON
// Lấy dữ liệu từ file data.json và fetch
fetch('./data.json')
    // Chuyển đổi dữ liệu lấy về sang JSON
    .then(response => response.json())
    // Xử lý dữ liệu JSON
    .then(data => {
        // Dùng DOM lấy container
        const container = document.getElementById('productList');
        // Duyệt dữ liệu trong file json
        data.forEach(product => {
            // Tạo thẻ div có class "product-card" cho mỗi sản phẩm
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            // Gán nội dung cho thẻ div
            productCard.innerHTML = `
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Description: ${product.description}</p>
            `
            // Thêm thẻ div vào container
            container.appendChild(productCard);
        })
    })

// Bài 3: Hiển thị dữ liệu từ API
// Lấy dữ liệu từ API bằng fetch API
fetch('https://jsonplaceholder.typicode.com/posts')
    // Chuyển đổi dữ liệu lấy về (response) thành định dạng JSON
    .then(response => response.json())
    // Xử lý dữ liệu JSON đã chuyển đổi
    .then(data => {
        // Dùng DOM lấy container
        const container = document.getElementById('postList');
        // Duyệt dữ liệu lấy về từ API
        for (let i = 0; i < 20; i++) {
            const post = data[i];
            // Tạo thẻ div có class = "post-card" cho mỗi bài viết
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            // Gán thông tin bài viết
            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `
            // Thêm thẻ div vào container
            container.appendChild(postCard);
        }
    })


// Bài 4: Hiển thị dữ liệu từ API (users)
// Lấy dữ liệu từ API bằng fetch API
fetch('https://jsonplaceholder.typicode.com/users')
    // Chuyển đổi dữ liệu lấy về (response) thành định dạng JSON
    .then(response => response.json())
    // Xử lý dữ liệu JSON đã chuyển đổi
    .then(data => {
        // Dùng DOM lấy container
        const container = document.getElementById('userList');
        // Duyệt dữ liệu lấy về từ API
        for (let i = 0; i < 20; i++) {
            const user = data[i];
            // Tạo thẻ div có class = "user-card" cho mỗi người dùng
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            // Gán thông tin người dùng
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
                <p>Company: ${user.company.name}</p>
            `
            // Thêm thẻ div vào container
            container.appendChild(userCard);
        }
    }) 