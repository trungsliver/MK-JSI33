// ========== Ôn tập JavaScript (ES6) ==========

// Phạm vi biến (Scope)
    // Global Scope: Biến được khai báo bên ngoài function hoặc block, có thể truy cập từ bất kỳ đâu trong code.
let subject = "JavaScript";
var level = "Intensive";
    // Function Scope / Block Scope: Biến được khai báo bên trong function / block, chỉ có thể truy cập từ bên trong đó.
function showInfo() {
    let course_info = `Khóa học: ${subject} - ${level}`;
    console.log(course_info);
}

// Hằng số (constant)
const PI = 3.14;

// Arrow function (Hàm mũi tên)
    // Hàm thông thường
function sum(a, b) {
    return a + b;
}

    // Arrow function
const sumArrow = (a, b) => a + b;

    // Arrow function với nhiều dòng lệnh
const sumArrowMultiLine = (a, b) => {
    let result = a + b;
    return result;
}

// Template literals (Chuỗi mẫu)
    // Cách viết thông thường
let course = "JavaScript";
level = "Intensive";
let course_info = "Khóa học: " + course + " - " + level;
console.log(course_info);
    // Cách viết với Template literals
let course_info2 = `Khóa học: ${course} - ${level}`;
console.log(course_info2);

// Array / List nâng cao
    // map: biến đổi phần tử
let students1 = ["An", "Minh", "Khiêm", "Hoàng", "Nguyên", "Trí"];
let students2 = students1.map(name => `${name} - JSI33`);
console.log(students2);

    // filter: lọc phần tử theo điều kiện
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);

    // find: tìm phần tử đầu tiên thỏa điều kiện
const firstEvenNumber = numbers.find(num => num % 2 === 0);
console.log('Số chẵn đầu tiên:', firstEvenNumber);

// ================= BÀI TẬP =================
/*
Bài tập thực hành xử lý dữ liệu điểm của một lớp.
Dưới đây là dữ liệu điểm tổng kết của 10 bạn học sinh ngẫu nhiên trong lớp.

Yêu cầu đề bài: 
1. Lọc danh sách 3 học sinh đạt điểm TBHK cao nhất
2. Tìm học sinh đạt điểm TBHK thấp nhất 
3. Tính điểm trung bình HK của toàn bộ 10 bạn học sinh trong lớp. 
4. In ra tên các học sinh đạt danh hiệu học lực: Giỏi - Khá - Trung Bình
5. Lọc danh sách học sinh có số điểm TBHK >= 7 (chỉ cần hiển thị tên).
*/

const students = [
  {
    name: "An",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation: "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" },
    },
  },
  {
    name: "Binh",
    scores: {
      Toan: { score: 3.4, evaluation: "KĐ" },
      NguVan: { score: 5.9, evaluation: "Đ" },
      NgoaiNgu: { score: 5.4, evaluation: "Đ" },
      VatLy: { score: 7.4, evaluation: "Đ" },
      HoaHoc: { score: 9.3, evaluation: "Đ" },
      SinhHoc: { score: 8.6, evaluation: "Đ" },
      LichSu: { score: 5.2, evaluation: "Đ" },
      DiaLy: { score: 7.1, evaluation: "Đ" },
      GDCD: { score: 6.7, evaluation: "Đ" },
    },
  },
  {
    name: "Chi",
    scores: {
      Toan: { score: 5.5, evaluation: "Đ" },
      NguVan: { score: 3.7, evaluation: "KĐ" },
      NgoaiNgu: { score: 3.9, evaluation: "KĐ" },
      VatLy: { score: 8.1, evaluation: "Đ" },
      HoaHoc: { score: 7.4, evaluation: "Đ" },
      SinhHoc: { score: 7.6, evaluation: "Đ" },
      LichSu: { score: 3.9, evaluation: "KĐ" },
      DiaLy: { score: 8.4, evaluation: "Đ" },
      GDCD: { score: 5.2, evaluation: "Đ" },
    },
  },
  {
    name: "Dung",
    scores: {
      Toan: { score: 9.1, evaluation: "Đ" },
      NguVan: { score: 5.5, evaluation: "Đ" },
      NgoaiNgu: { score: 4.4, evaluation: "KĐ" },
      VatLy: { score: 4.6, evaluation: "KĐ" },
      HoaHoc: { score: 6.4, evaluation: "Đ" },
      SinhHoc: { score: 3.2, evaluation: "KĐ" },
      LichSu: { score: 6.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 8.7, evaluation: "Đ" },
    },
  },
  {
    name: "Em",
    scores: {
      Toan: { score: 7.1, evaluation: "Đ" },
      NguVan: { score: 9.2, evaluation: "Đ" },
      NgoaiNgu: { score: 8.7, evaluation: "Đ" },
      VatLy: { score: 4.4, evaluation: "KĐ" },
      HoaHoc: { score: 6.4, evaluation: "Đ" },
      SinhHoc: { score: 3.0, evaluation: "KĐ" },
      LichSu: { score: 5.0, evaluation: "Đ" },
      DiaLy: { score: 9.8, evaluation: "Đ" },
      GDCD: { score: 7.0, evaluation: "Đ" },
    },
  },
  {
    name: "Phuc",
    scores: {
      Toan: { score: 5.5, evaluation: "Đ" },
      NguVan: { score: 4.7, evaluation: "KĐ" },
      NgoaiNgu: { score: 4.2, evaluation: "KĐ" },
      VatLy: { score: 6.5, evaluation: "Đ" },
      HoaHoc: { score: 3.5, evaluation: "KĐ" },
      SinhHoc: { score: 8.1, evaluation: "Đ" },
      LichSu: { score: 6.4, evaluation: "Đ" },
      DiaLy: { score: 7.0, evaluation: "Đ" },
      GDCD: { score: 8.0, evaluation: "Đ" },
    },
  },
  {
    name: "Giau",
    scores: {
      Toan: { score: 5.8, evaluation: "Đ" },
      NguVan: { score: 6.3, evaluation: "Đ" },
      NgoaiNgu: { score: 3.1, evaluation: "KĐ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 7.4, evaluation: "Đ" },
      SinhHoc: { score: 7.7, evaluation: "Đ" },
      LichSu: { score: 5.5, evaluation: "Đ" },
      DiaLy: { score: 5.3, evaluation: "Đ" },
      GDCD: { score: 5.6, evaluation: "Đ" },
    },
  },
  {
    name: "Hieu",
    scores: {
      Toan: { score: 6.9, evaluation: "Đ" },
      NguVan: { score: 7.7, evaluation: "Đ" },
      NgoaiNgu: { score: 6.3, evaluation: "Đ" },
      VatLy: { score: 3.7, evaluation: "KĐ" },
      HoaHoc: { score: 6.8, evaluation: "Đ" },
      SinhHoc: { score: 6.3, evaluation: "Đ" },
      LichSu: { score: 3.5, evaluation: "KĐ" },
      DiaLy: { score: 7.9, evaluation: "Đ" },
      GDCD: { score: 9.6, evaluation: "Đ" },
    },
  },
  {
    name: "Hoang",
    scores: {
      Toan: { score: 5.5, evaluation: "Đ" },
      NguVan: { score: 7.3, evaluation: "Đ" },
      NgoaiNgu: { score: 7.0, evaluation: "Đ" },
      VatLy: { score: 5.8, evaluation: "Đ" },
      HoaHoc: { score: 7.5, evaluation: "Đ" },
      SinhHoc: { score: 5.2, evaluation: "Đ" },
      LichSu: { score: 7.6, evaluation: "Đ" },
      DiaLy: { score: 3.8, evaluation: "KĐ" },
      GDCD: { score: 9.9, evaluation: "Đ" },
    },
  },
  {
    name: "Khanh",
    scores: {
      Toan: { score: 7.0, evaluation: "Đ" },
      NguVan: { score: 3.7, evaluation: "KĐ" },
      NgoaiNgu: { score: 10.0, evaluation: "Đ" },
      VatLy: { score: 7.7, evaluation: "Đ" },
      HoaHoc: { score: 9.0, evaluation: "Đ" },
      SinhHoc: { score: 4.6, evaluation: "KĐ" },
      LichSu: { score: 6.4, evaluation: "Đ" },
      DiaLy: { score: 6.6, evaluation: "Đ" },
      GDCD: { score: 5.9, evaluation: "Đ" },
    },
  },
];

// 1. Lọc danh sách 3 học sinh đạt điểm TBHK cao nhất
    // Dùng map để tính điểm TBHK của từng học sinh
const top3_students = students.map(student => {
    let totalScore = 0;
    let subject = Object.keys(student.scores);

    // Tính tổng điểm của từng học sinh
    subject.forEach(sub => {
        totalScore += student.scores[sub].score;
    });

    return {
        name: student.name,
        averageScore: totalScore / subject.length
    };
})
    // Sắp xếp học sinh theo diểm trung bình giảm dần và lấy 3 học sinh đầu tiên
top3_students.sort((a, b) => b.averageScore - a.averageScore);
const top3 = top3_students.slice(0, 3);
console.log('Danh sách 3 học sinh đạt điểm TBHK cao nhất:', top3);

// 2. Tìm học sinh đạt điểm TBHK thấp nhất
    // Học sinh điểm thấp nhất là học sinh cuối cùng trong danh sách đã sắp xếp
const lowestStudent = top3_students[top3_students.length - 1];
console.log('Học sinh đạt điểm TBHK thấp nhất:', lowestStudent);

// 3. Tính điểm trung bình HK của toàn bộ 10 bạn học sinh trong lớp.
let total_avg = 0
    // Tính tổng điểm trung bình của tất cả học sinh
top3_students.forEach(student => {
    total_avg += student.averageScore;
})
avg = total_avg / top3_students.length;
console.log('Điểm trung bình HK của toàn bộ 10 bạn học sinh trong lớp:', avg);

// 4. In ra tên các học sinh đạt danh hiệu học lực: Giỏi - Khá - Trung Bình
const hoc_luc = top3_students.map(student => {
    if (student.averageScore >= 8) {
        evaluation = "Giỏi";
    } else if (student.averageScore >= 6.5) {
        evaluation = "Khá";
    } else {
        evaluation = "Trung Bình";
    }
    // Trả về đối tượng chứa tên học sinh, điểm TB và danh hiệu học lực
    return {
        name: student.name,
        averageScore: student.averageScore,
        evaluation: evaluation
    };
})
console.log('Danh sách học sinh đạt danh hiệu học lực:', hoc_luc);

// 5. Lọc danh sách học sinh có số điểm TBHK >= 7 (chỉ cần hiển thị tên).
    // Dùng filter()
const students_above_7 = top3_students.filter(student => student.averageScore >= 7);
console.log('Danh sách học sinh có số điểm TBHK >= 7:', students_above_7);