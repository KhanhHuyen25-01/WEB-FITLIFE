# 🏋️‍♂️ FITLIFE - Admin Management System

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status" />
</p>

---

## 📖 Giới Thiệu Chung
**FITLIFE** là hệ thống trang quản trị (Admin Panel) cao cấp dành riêng cho việc vận hành và quản lý phòng gym/fitness. Ứng dụng cung cấp các công cụ đắc lực hỗ trợ theo dõi hiệu suất phòng tập, điều hành huấn luyện viên (PT), duyệt lịch tập luyện của hội viên, phân tích chỉ số kinh doanh và tự động hóa quy trình quản lý hằng ngày.

---

## ⚡ Các Tính Năng Cốt Lõi

### 🔐 1. Trang Đăng Nhập Độc Quyền (Admin Login)
* Thiết kế đồng bộ hoàn hảo với giao diện **Mobile App** của hệ thống.
* Hình nền phòng tập thể hình chất lượng cao kèm hiệu ứng mờ kính (glassmorphism) tinh tế.
* Accent màu xanh lá **Lime Green** nổi bật, trường nhập thông tin đi kèm icon trực quan, và các nút liên kết mạng xã hội (Google, Apple, Facebook).
* Cơ chế tự động chuyển hướng bảo mật và thông báo lỗi thông minh.

### 📊 2. Bảng Điều Khiển Tổng Quan (Dashboard)
* Biểu đồ trực quan hóa doanh thu theo tháng dạng SVG mượt mà.
* Thống kê nhanh lượng hội viên đang hoạt động, hiệu suất của PT.
* Danh sách lịch trình lớp nhóm trong ngày và hiệu suất đi học của hội viên.

### 👥 3. Quản Lý Hội Viên (Member Management)
* Quản lý thông tin chi tiết hội viên, mã số (`FL-xxxx`), SĐT và gói tập đăng ký.
* Bộ lọc đa năng theo trạng thái thẻ tập (Đang hoạt động, Sắp hết hạn, Đã hết hạn) và loại gói (Platinum, Premium, Standard).
* Modal tương tác thêm mới, chỉnh sửa thông tin hoặc gia hạn gói tập tức thì.

### 🏋️‍♂️ 4. Quản Lý Huấn Luyện Viên (Trainer Management)
* Theo dõi chuyên môn, số lượng học viên đang phụ trách, đánh giá sao (`Rating ⭐`) và tổng số lớp dạy mỗi tuần.
* Đăng ký và phân công lịch dạy nhanh cho các PT trực thuộc trung tâm.

### 📅 5. Quản Lý Lịch Tập & Ca Dạy (Schedule & Shift Management)
* **Timeline Khung Giờ Vàng (07:00 - 21:00):** Giám sát toàn bộ hoạt động phòng tập theo thời gian thực.
* **Chi Tiết Đặt Lớp (Booking):** Nhấp trực tiếp vào chỉ số chỗ trống để xem danh sách học viên đăng ký, đọc lý do xin nghỉ phép của hội viên.
* **Nút Gạt Phê Duyệt iOS Toggle Switch:** Sử dụng các công tắc gạt ON/OFF thông minh để duyệt phép nghỉ học hoặc phê duyệt yêu cầu đổi ca dạy giữa các PT và hội viên.
* **CRUD Ca Trực PT:** Khai báo ca trực, ca hỗ trợ hoặc lớp nhóm chuyên sâu cho từng PT.

### 📈 6. Số Liệu Phân Tích (Analytics & Reports)
* Biểu đồ kép biểu diễn tỷ trọng doanh thu giữa lớp nhóm và lớp PT riêng.
* Biểu đồ tỷ lệ phân bổ gói tập giúp tối ưu hóa chiến dịch Marketing.
* Bảng xếp hạng hiệu suất giảng dạy và chất lượng phục vụ của PT.

---

## 🛠️ Công Nghệ Sử Dụng
* **Core:** Vue 3 (Composition API / Options API)
* **Bundler & Dev Server:** Vite 8.0 (Tối ưu hóa tốc độ Hot Module Replacement)
* **Routing:** Vue Router 4.0
* **Styling:** CSS 3 Custom Tokens & Bootstrap 5
* **Icons:** FontAwesome v6 & LineIcons

---

## 📂 Cấu Trúc Thư Mục Dự Án
```text
WEB-FITLIFE/
├── public/                 # Tài nguyên tĩnh (favicon, logo...)
├── src/
│   ├── assets/             # Các tệp CSS, JS, fonts và icon hệ thống
│   ├── layout/
│   │   ├── components/     # Các thành phần giao diện chung (Sidebar, Header)
│   │   └── wrapper/        # Layout bọc chính (AdminLayout, BlankLayout)
│   ├── pages/              # Các view chính của hệ thống quản trị
│   │   └── admin/
│   │       ├── dashboard/  # Bảng điều khiển tổng
│   │       ├── hoivien/     # Quản lý hội viên
│   │       ├── huanluyenvien/ # Quản lý huấn luyện viên
│   │       ├── lich/       # Quản lý lịch tập & duyệt phép
│   │       ├── solieu/     # Báo cáo & phân tích số liệu
│   │       └── login/      # Đăng nhập hệ thống
│   ├── router/             # Cấu hình chuyển trang & phân quyền
│   ├── App.vue             # Component gốc quản lý layout động
│   └── main.js             # Khởi chạy dự án và nạp tài nguyên toàn cục
├── index.html              # Tệp HTML chính (Đã cấu hình favicon Dumbbell FITLIFE)
├── vite.config.js          # Cấu hình Vite & alias biên dịch
└── package.json            # Quản lý gói dependencies
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Tải các gói phụ trợ
Di chuyển vào thư mục dự án và chạy lệnh sau để tải các thư viện cần thiết:
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Local Server)
Khởi động dự án trên môi trường cục bộ:
```bash
npm run dev
```
*Mặc định dự án sẽ khởi chạy tại đường dẫn: `http://localhost:5173/`*

### 3. Biên dịch dự án cho production
Build tối ưu hóa dung lượng dự án chuẩn bị triển khai lên hosting:
```bash
npm run build
```

---

## 🔒 Tài Khoản Đăng Nhập Demo
Để trải nghiệm đầy đủ các tính năng của hệ thống quản trị, vui lòng sử dụng thông tin đăng nhập sau:
* **Tên đăng nhập:** `admin` (hoặc `admin@fitlife.com`)
* **Mật khẩu:** *Bất kỳ mật khẩu nào* (Hệ thống giả lập chấp nhận mọi chuỗi nhập vào).
