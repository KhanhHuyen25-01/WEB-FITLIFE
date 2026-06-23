<template>
  <div class="solieu-container">
    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Số Liệu Phân Tích 📊</h2>
        <p class="text-secondary mb-0">Thống kê doanh thu, tăng trưởng hội viên và hiệu suất hoạt động tổng thể của phòng tập FitLife.</p>
      </div>
      <div class="d-flex gap-2 mt-3 mt-md-0">
        <select class="form-select border-light-custom rounded-pill px-3 py-2 fw-semibold text-secondary shadow-sm" v-model="timePeriod" style="width: 160px;">
          <option value="month">Tháng này</option>
          <option value="quarter">Quý này</option>
          <option value="year">Năm nay</option>
        </select>
        <button class="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm btn-export">
          <i class="fa-solid fa-file-export"></i>
          <span class="fw-semibold">Xuất Dữ Liệu</span>
        </button>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Revenue -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG DOANH THU</span>
              <h3 class="fw-bold text-dark my-1">$94,700</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +12.4%
              </span>
            </div>
            <div class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-wallet fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- New Signups -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">HỘI VIÊN MỚI</span>
              <h3 class="fw-bold text-dark my-1">+143</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +5.2%
              </span>
            </div>
            <div class="bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-user-plus fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Class Bookings -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">LƯỢT ĐẶT LỚP</span>
              <h3 class="fw-bold text-dark my-1">1,824</h3>
              <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Tỷ lệ đi học 88.5%
              </span>
            </div>
            <div class="bg-warning-subtle text-warning rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-calendar-check fs-5 text-warning"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Retention Rate -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỶ LỆ GIỮ CHÂN</span>
              <h3 class="fw-bold text-dark my-1">91.3%</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Xu hướng tăng
              </span>
            </div>
            <div class="bg-info-subtle text-info rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-users-line fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Layout Section -->
    <div class="row g-4 mb-4">
      <!-- Revenue Trend Line Chart -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="fw-bold text-dark mb-1">Xu Hướng Doanh Thu Tháng</h5>
              <p class="text-secondary mb-0" style="font-size: 0.85rem;">So sánh doanh thu thực tế giữa gói tập nhóm và gói tập PT riêng.</p>
            </div>
            <!-- Legend indicators -->
            <div class="d-flex gap-3 text-secondary" style="font-size: 0.8rem; font-weight: 500;">
              <span class="d-flex align-items-center gap-1.5"><span class="legend-dot bg-primary"></span>Gói nhóm</span>
              <span class="d-flex align-items-center gap-1.5"><span class="legend-dot bg-success"></span>Lớp PT</span>
            </div>
          </div>

          <!-- Revenue Trend Chart (SVG Vector Path) -->
          <div class="chart-container mt-4 position-relative" style="height: 200px;">
            <svg class="w-100 h-100" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0"/>
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              
              <!-- Grid lines -->
              <line x1="0" y1="20" x2="700" y2="20" stroke="#f8fafc" />
              <line x1="0" y1="80" x2="700" y2="80" stroke="#f8fafc" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#f8fafc" />
              <line x1="0" y1="180" x2="700" y2="180" stroke="#e2e8f0" stroke-width="1.5" />

              <!-- Blue Line Area & Line -->
              <path d="M 0 140 C 100 130, 200 150, 300 110 C 400 70, 500 90, 600 50 C 660 30, 700 25, 700 25 L 700 180 L 0 180 Z" fill="url(#blueGradient)" />
              <path d="M 0 140 C 100 130, 200 150, 300 110 C 400 70, 500 90, 600 50 C 660 30, 700 25, 700 25" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" />

              <!-- Green Line Area & Line -->
              <path d="M 0 160 C 100 155, 200 130, 300 140 C 400 120, 500 100, 600 80 C 660 65, 700 60, 700 60 L 700 180 L 0 180 Z" fill="url(#greenGradient)" />
              <path d="M 0 160 C 100 155, 200 130, 300 140 C 400 120, 500 100, 600 80 C 660 65, 700 60, 700 60" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
            </svg>
            <div class="chart-y-labels position-absolute d-flex flex-column justify-content-between h-100 py-1" style="font-size: 0.65rem; color: #94a3b8; left: 0; top: 0;">
              <span>$100k</span>
              <span>$60k</span>
              <span>$20k</span>
              <span>$0</span>
            </div>
          </div>
          <div class="d-flex justify-content-between text-muted px-2 mt-2" style="font-size: 0.7rem; font-weight: 500;">
            <span>Th1</span><span>Th2</span><span>Th3</span><span>Th4</span><span>Th5</span><span>Th6</span><span>Th7</span><span>Th8</span><span>Th9</span><span>Th10</span><span>Th11</span><span>Th12</span>
          </div>
        </div>
      </div>

      <!-- Membership Package Share (Bar / Donut Chart) -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <h5 class="fw-bold text-dark mb-1">Tỷ Lệ Gói Tập Đăng Ký</h5>
          <p class="text-secondary mb-4" style="font-size: 0.85rem;">Cơ cấu phân bổ lựa chọn gói tập của hội viên.</p>

          <!-- SVG Bar representation -->
          <div class="d-flex flex-column gap-4 pt-2">
            <!-- Platinum -->
            <div>
              <div class="d-flex justify-content-between align-items-center mb-1.5" style="font-size: 0.85rem;">
                <span class="text-secondary fw-semibold">Gói Platinum (12 Tháng)</span>
                <span class="text-dark fw-bold">48.2%</span>
              </div>
              <div class="progress rounded-pill" style="height: 8px; background-color: #f1f5f9;">
                <div class="progress-bar rounded-pill bg-primary" role="progressbar" style="width: 48.2%;"></div>
              </div>
            </div>

            <!-- Premium -->
            <div>
              <div class="d-flex justify-content-between align-items-center mb-1.5" style="font-size: 0.85rem;">
                <span class="text-secondary fw-semibold">Gói Premium (6 Tháng)</span>
                <span class="text-dark fw-bold">32.5%</span>
              </div>
              <div class="progress rounded-pill" style="height: 8px; background-color: #f1f5f9;">
                <div class="progress-bar rounded-pill bg-success" role="progressbar" style="width: 32.5%;"></div>
              </div>
            </div>

            <!-- Standard -->
            <div>
              <div class="d-flex justify-content-between align-items-center mb-1.5" style="font-size: 0.85rem;">
                <span class="text-secondary fw-semibold">Gói Standard (1 Tháng)</span>
                <span class="text-dark fw-bold">19.3%</span>
              </div>
              <div class="progress rounded-pill" style="height: 8px; background-color: #f1f5f9;">
                <div class="progress-bar rounded-pill bg-warning" role="progressbar" style="width: 19.3%;"></div>
              </div>
            </div>
          </div>

          <div class="bg-light rounded-4 p-3 mt-5" style="font-size: 0.8rem;">
            <i class="fa-solid fa-lightbulb me-2 text-warning"></i>
            <span class="text-secondary">Hội viên có xu hướng ưu tiên đăng ký gói **Platinum (12 Tháng)** nhờ chính sách ưu đãi chiết khấu cao trong quý.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- PT Performance Leaderboard -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 class="fw-bold text-dark mb-0">Hiệu Suất Huấn Luyện Viên</h5>
          <small class="text-secondary">Xếp hạng PT có số lượng lớp hoàn thành và phản hồi tốt nhất từ học viên</small>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table align-middle custom-table">
          <thead>
            <tr>
              <th scope="col">Huấn Luyện Viên</th>
              <th scope="col">Chuyên Môn</th>
              <th scope="col">Lớp Hoàn Thành</th>
              <th scope="col">Số Học Viên Active</th>
              <th scope="col">Phản Hồi Sao</th>
              <th scope="col" class="text-end">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pt in ptPerformance" :key="pt.name" class="hover-row">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="pt.avatarColor">
                    {{ pt.initials }}
                  </div>
                  <div>
                    <h6 class="mb-0 text-dark fw-bold text-pt-name">{{ pt.name }}</h6>
                    <small class="text-secondary">{{ pt.phone }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="fw-medium text-dark" style="font-size: 0.85rem;">{{ pt.specialty }}</span>
              </td>
              <td>
                <span class="fw-bold text-primary" style="font-size: 0.85rem;">{{ pt.classesCompleted }} lớp</span>
              </td>
              <td>
                <span class="text-secondary fw-semibold" style="font-size: 0.85rem;">{{ pt.activeStudents }} học viên</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-1">
                  <i class="fa-solid fa-star text-warning" style="font-size: 0.8rem;"></i>
                  <span class="fw-bold text-dark" style="font-size: 0.85rem;">{{ pt.rating }}</span>
                </div>
              </td>
              <td class="text-end">
                <span class="badge rounded-pill px-2.5 py-1.5 fw-bold" :class="pt.statusClass" style="font-size: 0.7rem;">
                  {{ pt.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoLieuPhanTich",
  data() {
    return {
      timePeriod: "month",
      ptPerformance: [
        {
          name: "Marcus Webb",
          phone: "0901 888 222",
          specialty: "HIIT / Võ thuật",
          classesCompleted: 142,
          activeStudents: 15,
          rating: "4.9",
          status: "Xuất Sắc",
          statusClass: "bg-success-subtle text-success border border-success",
          initials: "MW",
          avatarColor: "bg-primary"
        },
        {
          name: "Priya Sharma",
          phone: "0912 777 333",
          specialty: "Yoga / Thiền",
          classesCompleted: 98,
          activeStudents: 12,
          rating: "5.0",
          status: "Xuất Sắc",
          statusClass: "bg-success-subtle text-success border border-success",
          initials: "PS",
          avatarColor: "bg-info"
        },
        {
          name: "Dustin Myers",
          phone: "0934 999 555",
          specialty: "Cardio / Thể lực",
          classesCompleted: 154,
          activeStudents: 20,
          rating: "4.8",
          status: "Đạt Chỉ Tiêu",
          statusClass: "bg-primary-subtle text-primary border border-primary",
          initials: "DM",
          avatarColor: "bg-warning text-dark"
        },
        {
          name: "Sarah Jenkins",
          phone: "0978 111 444",
          specialty: "Pilates",
          classesCompleted: 80,
          activeStudents: 10,
          rating: "4.9",
          status: "Đạt Chỉ Tiêu",
          statusClass: "bg-primary-subtle text-primary border border-primary",
          initials: "SJ",
          avatarColor: "bg-danger"
        }
      ]
    };
  }
}
</script>

<style scoped>
.btn-export {
  background-color: #1e40af; 
  border-color: #1e40af;
}
.btn-export:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}
.card-subtitle-label {
  font-size: 0.7rem; 
  letter-spacing: 0.05em;
}
.icon-card-box {
  width: 48px; 
  height: 48px;
}
.border-light-custom {
  border-color: #e2e8f0 !important;
}
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.custom-table th {
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 12px;
}
.custom-table td {
  padding: 16px 8px;
  border-bottom: 1px solid #f8fafc;
}
.hover-row {
  transition: background-color 0.2s ease;
}
.hover-row:hover {
  background-color: #f8fafc;
}
.avatar-circle {
  width: 40px; 
  height: 40px; 
  font-size: 0.85rem;
}
.text-pt-name {
  font-size: 0.9rem;
}
</style>
