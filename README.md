# 🏋️‍♂️ FITLIFE - Hệ thống Quản trị Vận hành & Phân tích Đô thị Sức khỏe

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
**🤝 [Đóng Góp](CONTRIBUTING.md)** • **📜 [Nhật ký thay đổi](CHANGELOG.md)**

</div>

<div align="center">

[![WEBSITE](https://img.shields.io/badge/🌐_WEBSITE-FITLIFE-blue?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=334155&color=2563eb)](http://localhost:5173) [![DOCS](https://img.shields.io/badge/📚_DOCS-GUIDE-lime?style=for-the-badge&logo=book&logoColor=black&labelColor=334155&color=9afe03)](README.md)

</div>

---

> _"Vận hành thông minh – Kiến tạo cộng đồng thể chất bền vững 🌍"_

---

## 📖 Tổng Quan

**FITLIFE** là một nền tảng quản trị vận hành cao cấp (Admin Dashboard) được phát triển nhằm mục đích số hóa, tối ưu hóa quy trình quản lý hoạt động tại các trung tâm Fitness và Đô thị thể chất thông minh. Hệ thống kết hợp phân tích số liệu thời gian thực, quản lý ca trực thông minh và phê duyệt tự động nhằm:

* 🤝 **Kết nối Hợp tác**: Đồng bộ hóa dữ liệu giữa Quản trị viên, Huấn luyện viên (PT) và Hội viên thông qua hệ thống lịch trình tối ưu.
* 🔍 **Minh bạch hóa lịch trình**: Quản lý lịch tập nhóm, ca dạy 1-1, ca trực và ghi nhận phản hồi vắng học chi tiết.
* 🤖 **Phê duyệt tự động bằng Nút gạt**: Đơn giản hóa quy trình xin nghỉ phép, đổi ca dạy bằng giao diện gạt thông minh ON/OFF chuẩn iOS.
* 📊 **Phân tích hiệu suất**: Theo dõi tăng trưởng doanh số, tỷ lệ giữ chân khách hàng và hiệu suất giảng dạy của từng huấn luyện viên.

---

## 👥 Dự án này dành cho ai?

1. **Quản trị viên (Admin)** → Điều phối nhân sự, phê duyệt nhanh các ca xin nghỉ, theo dõi báo cáo doanh thu tổng thể phòng tập.
2. **Huấn luyện viên (PT)** → Đăng ký ca trực, xem danh sách học viên đăng ký, phản hồi xin đổi lịch dạy khi có việc bận.
3. **Hội viên (Members)** → Đăng ký lịch tập, khai báo lý do xin nghỉ phép/hoãn ca khi trùng lịch cá nhân đột xuất.
4. **Nhà đầu tư & Quản lý** → Đánh giá hiệu suất PT, cơ cấu phân bổ gói tập để ra quyết định kinh doanh tối ưu.

---

## ✨ Modules chính của FITLIFE

### 1. 📅 Module Quản lý Lịch Tập & Phê Duyệt iOS Toggle Switch
* **Khung Giờ Vàng Hoạt Động (07:00 - 21:00):** Giám sát toàn bộ hoạt động phòng tập theo thời gian thực dưới dạng timeline.
* **Chi Tiết Đăng Ký (Booked Indicator):** Bấm trực tiếp vào các chỉ số chỗ trống (ví dụ: `18/20 chỗ`) để hiển thị danh sách chi tiết học viên.
* **Đọc Lý Do & Phê Duyệt Nghỉ Ca:** Đọc lý do xin nghỉ phép của hội viên và HLV. Phê duyệt nhanh chóng bằng nút gạt ON/OFF màu xanh lá Lime phong cách iOS.
* **Đăng Ký Ca Trực (CRUD PT Shifts):** Khai báo, thêm, sửa, xóa ca dạy hoặc ca trực hỗ trợ của từng PT tại các khu vực phòng tập.

### 👥 2. Module Quản Lý Hội Viên (Member Directory)
* Quản lý thông tin chi tiết hội viên, mã số định danh (`FL-xxxx`), SĐT và lịch sử tham gia.
* Bộ lọc đa năng theo trạng thái thẻ tập (Đang hoạt động, Sắp hết hạn, Đã hết hạn) và loại gói (Platinum, Premium, Standard).
* Form thêm mới hội viên trực quan với cơ chế tự động tạo mã và avatar viết tắt.

### 🏋️‍♂️ 3. Module Quản Lý Huấn Luyện Viên (Trainer Hub)
* Quản lý thông tin chuyên môn, số lượng học viên đang phụ trách, đánh giá sao trung bình (`Rating ⭐`) và tổng số ca dạy hàng tuần.
* Theo dõi hiệu suất giảng dạy và phân chia khu vực đứng lớp hợp lý.

### 📈 4. Module Báo Cáo & Số Liệu Phân Tích (Analytics)
* Biểu đồ vector SVG trực quan hóa doanh thu giữa Lớp nhóm và Lớp PT riêng.
* Biểu đồ tỷ trọng cơ cấu gói tập Platinum, Premium, Standard đã đăng ký.
* Bảng xếp hạng hiệu suất giảng dạy của các Huấn luyện viên đạt chỉ tiêu trong tháng.

---

## 🧱 Kiến trúc hệ thống & Công nghệ sử dụng

### Thành phần công nghệ

| Thành phần | Công nghệ sử dụng |
| :--- | :--- |
| **Web Frontend Core** | Vue.js 3 (SFC structure) |
| **Routing Layer** | Vue Router 4.0 (Nested layout structure) |
| **Build & Dev Tool** | Vite 8.0 (Hot Module Replacement) |
| **Styling Framework** | CSS 3 Custom Tokens & Bootstrap 5 |
| **Icons Library** | FontAwesome v6 & Boxicons |
| **Asset Loaders** | Simplebar JS, Perfect scrollbar JS |

---

## 📂 Cấu Trúc Mã Nguồn

```text
WEB-FITLIFE/
├── public/                 # Tài nguyên tĩnh
├── src/
│   ├── assets/             # CSS, JS, fonts và icon hệ thống
│   ├── layout/
│   │   ├── components/     # Sidebar Menu, Top Header
│   │   └── wrapper/        # Layout bọc chính (Admin, Blank)
│   ├── pages/              # Các view chính của hệ thống quản trị
│   │   └── admin/
│   │       ├── dashboard/  # Bảng điều khiển tổng
│   │       ├── hoivien/     # Quản lý hội viên
│   │       ├── huanluyenvien/ # Quản lý huấn luyện viên
│   │       ├── lich/       # Quản lý lịch tập, ca trực & duyệt phép
│   │       ├── solieu/     # Báo cáo & phân tích số liệu
│   │       └── login/      # Đăng nhập hệ thống (Lime Style)
│   ├── router/             # Cấu hình định tuyến
│   ├── App.vue             # Component gốc quản lý layout
│   └── main.js             # Khởi chạy dự án và nạp tài nguyên toàn cục
├── index.html              # Tệp HTML chính (Favicon Dumbbell FITLIFE)
├── vite.config.js          # Cấu hình Vite & alias biên dịch
└── package.json            # Quản lý gói dependencies
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Tải các gói phụ trợ
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Local Server)
```bash
npm run dev
```
*Mặc định hệ thống sẽ khởi chạy tại: `http://localhost:5173/`*

### 3. Biên dịch dự án cho production
```bash
npm run build
```

---

## 🔒 Tài Khoản Đăng Nhập Demo
Để trải nghiệm đầy đủ tính năng của hệ thống quản trị:
* **Tên đăng nhập:** `admin` (hoặc `admin@fitlife.com`)
* **Mật khẩu:** *Bất kỳ mật khẩu nào* (Hệ thống giả lập chấp nhận mọi chuỗi nhập vào).
