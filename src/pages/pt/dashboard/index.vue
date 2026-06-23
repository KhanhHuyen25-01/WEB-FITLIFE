<template>
  <div class="pt-dashboard-container">
    <!-- PT Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Chào mừng quay trở lại, Marcus! 🏋️‍♂️</h2>
        <p class="text-secondary mb-0">Dưới đây là lịch dạy và cập nhật của học viên hôm nay.</p>
      </div>
      <div class="d-flex gap-2 mt-3 mt-md-0">
        <button class="btn btn-outline-success rounded-pill px-4 py-2 d-flex align-items-center gap-2">
          <i class="fa-solid fa-plus"></i>
          <span class="fw-semibold">Thêm Học Viên</span>
        </button>
        <button class="btn btn-success rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm">
          <i class="fa-solid fa-clock"></i>
          <span class="fw-semibold">Ghi Nhận Buổi Tập</span>
        </button>
      </div>
    </div>

    <!-- PT Summary Statistics Widgets -->
    <div class="row g-4 mb-4">
      <!-- Widget 1: Assigned Clients -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">HỌC VIÊN HOẠT ĐỘNG</span>
            <div class="bg-success-subtle text-success rounded-3 p-2">
              <i class="fa-solid fa-user-group"></i>
            </div>
          </div>
          <h2 class="fw-bold text-dark mb-1">14 Học Viên</h2>
          <span class="text-success fw-medium" style="font-size: 0.8rem;">
            <i class="fa-solid fa-circle-check me-1"></i> +3 mới trong tháng
          </span>
        </div>
      </div>

      <!-- Widget 2: Hours Taught -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">SỐ GIỜ ĐÃ DẠY</span>
            <div class="bg-success-subtle text-success rounded-3 p-2">
              <i class="fa-regular fa-clock"></i>
            </div>
          </div>
          <h2 class="fw-bold text-dark mb-1">28 Giờ</h2>
          <span class="text-secondary" style="font-size: 0.8rem;">Mục tiêu tuần: 35 giờ (Đạt 80%)</span>
        </div>
      </div>

      <!-- Widget 3: Client Satisfaction -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 0.05em;">ĐÁNH GIÁ TRUNG BÌNH</span>
            <div class="bg-success-subtle text-success rounded-3 p-2">
              <i class="fa-regular fa-star"></i>
            </div>
          </div>
          <h2 class="fw-bold text-dark mb-1">4.9 / 5.0</h2>
          <span class="text-success fw-medium" style="font-size: 0.8rem;">
            <i class="fa-solid fa-circle-up me-1"></i> Thuộc Top 5% tại FitLife
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Widgets (PT Schedule & Active Client List) -->
    <div class="row g-4">
      <!-- Trainer's Schedule -->
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="fw-bold text-dark mb-0">Lịch Dạy Cá Nhân</h5>
            <span class="badge bg-success-subtle text-success rounded-pill px-3 py-1.5 fw-semibold" style="font-size: 0.75rem;">Các Lớp Hôm Nay</span>
          </div>

          <!-- Class rows -->
          <div class="d-flex flex-column gap-3">
            <div v-for="item in ptSchedule" :key="item.id" class="p-3 rounded-4 d-flex justify-content-between align-items-center hover-schedule-row teaching-box">
              <div class="d-flex align-items-center gap-3">
                <div class="text-center" style="width: 60px;">
                  <span class="fw-bold text-success fs-5 leading-none">{{ item.time }}</span>
                  <div class="text-uppercase text-secondary fw-bold" style="font-size: 0.6rem;">{{ item.period }}</div>
                </div>
                <div>
                  <h6 class="mb-0.5 text-dark fw-bold" style="font-size: 0.95rem;">{{ item.title }}</h6>
                  <small class="text-secondary"><i class="fa-solid fa-location-dot me-1"></i>{{ item.room }} | <i class="fa-solid fa-users me-1"></i>{{ item.slots }} đã đặt</small>
                </div>
              </div>
              <span class="badge rounded-pill bg-success-subtle text-success px-3 py-1.5 border border-success fw-bold" style="font-size: 0.7rem;">
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Client List -->
      <div class="col-lg-5">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
          <h5 class="fw-bold text-dark mb-3">Theo Dõi Tiến Độ Học Viên</h5>
          <div class="d-flex flex-column gap-3">
            <div v-for="client in clients" :key="client.name" class="p-3 border rounded-4 d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold avatar-initials">
                  {{ client.initials }}
                </div>
                <div>
                  <h6 class="mb-0.5 text-dark fw-bold text-client-name">{{ client.name }}</h6>
                  <small class="text-secondary">Mục tiêu: {{ client.target }}</small>
                </div>
              </div>
              <div class="text-end">
                <div class="fw-bold text-dark" style="font-size: 0.85rem;">{{ client.progress }}%</div>
                <div class="progress rounded-pill mt-1" style="height: 4px; width: 60px; background-color: #f1f5f9;">
                  <div class="progress-bar rounded-pill bg-success" role="progressbar" :style="'width: ' + client.progress + '%'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PTDashboard",
  data() {
    return {
      ptSchedule: [
        { id: 1, time: "08:00", period: "AM", title: "HIIT Đốt Mỡ Buổi Sáng", room: "Phòng Tập A", slots: "18/20", status: "Đã Hoàn Thành" },
        { id: 2, time: "02:00", period: "PM", title: "Tập Lực Cá Nhân 1-Kèm-1", room: "Khu Tạ Nặng", slots: "1/1", status: "Sắp Diễn Ra" },
        { id: 3, time: "04:30", period: "PM", title: "Tập Sức Bền Thể Lực", room: "Phòng Tập A", slots: "14/15", status: "Sắp Diễn Ra" }
      ],
      clients: [
        { name: "Nguyễn Văn A", target: "Giảm Cân", progress: 75, initials: "VA" },
        { name: "Trần Thị B", target: "Tăng Cơ", progress: 60, initials: "TB" },
        { name: "Lê Văn C", target: "Sức Bền Tim Mạch", progress: 90, initials: "VC" }
      ]
    };
  }
}
</script>

<style scoped>
.teaching-box {
  background-color: #f8fafc; 
  border-left: 4px solid #198754;
}
.avatar-initials {
  width: 38px; 
  height: 38px; 
  font-size: 0.85rem;
}
.text-client-name {
  font-size: 0.9rem;
}
.hover-schedule-row {
  transition: all 0.2s ease;
}
.hover-schedule-row:hover {
  background-color: #f1f5f9 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.leading-none {
  line-height: 1;
}
</style>
