<template>
  <div class="dashboard-container">
    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Chào buổi sáng, {{ name }} 👋</h2>
        <p class="text-secondary mb-0">Dưới đây là tình hình hoạt động của FitLife hôm nay.</p>
      </div>
      <button
        class="btn btn-primary rounded-pill px-4 py-2 mt-3 mt-md-0 d-flex align-items-center gap-2 shadow-sm button-report">
        <i class="fa-regular fa-calendar"></i>
        <span class="fw-semibold">Xuất Báo Cáo</span>
      </button>
    </div>

    <!-- Top Cards Section (Revenue and Active Members) -->
    <div class="row g-4 mb-4">
      <!-- Total Revenue Card -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white position-relative overflow-hidden">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG DOANH THU</span>
              <h1 class="display-5 fw-bold text-dark my-1"> {{ formatMoney(totalRevenue) }}</h1>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2.5 py-1"
                style="font-size: 0.75rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +12.4% <span class="text-muted fw-normal">so với tháng
                  trước</span>
              </span>
            </div>
            <!-- Credit Card Icon container -->
            <div
              class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-regular fa-credit-card fs-5"></i>
            </div>
          </div>

          <!-- Revenue Line Chart (High Fidelity SVG Path) -->
          <div class="chart-container mt-4 position-relative" style="height: 180px;">
            <svg class="w-100 h-100" viewBox="0 0 700 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Grid Lines -->
              <line x1="0" y1="20" x2="700" y2="20" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="0" y1="65" x2="700" y2="65" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="0" y1="110" x2="700" y2="110" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="0" y1="150" x2="700" y2="150" stroke="#f1f5f9" />

              <!-- Gradient Area -->
              <path d="M 0 115 
                       C 60 115, 60 110, 120 112 
                       C 180 114, 180 95, 240 98 
                       C 300 101, 300 115, 360 102 
                       C 420 89, 420 105, 480 103 
                       C 540 101, 540 85, 600 78 
                       C 660 71, 660 62, 700 58 
                       L 700 150 L 0 150 Z" fill="url(#chartGradient)" />

              <!-- Line path -->
              <path d="M 0 115 
                       C 60 115, 60 110, 120 112 
                       C 180 114, 180 95, 240 98 
                       C 300 101, 300 115, 360 102 
                       C 420 89, 420 105, 480 103 
                       C 540 101, 540 85, 600 78 
                       C 660 71, 660 62, 700 58" fill="none" stroke="#2563eb" stroke-width="3"
                stroke-linecap="round" />
            </svg>
            <!-- Chart overlay labels -->
            <div class="chart-y-labels position-absolute d-flex flex-column justify-content-between h-100 py-1"
              style="font-size: 0.65rem; color: #94a3b8; left: 0; top: 0;">
              <span>80.0k</span>
              <span>55.0k</span>
              <span>30.0k</span>
              <span>$0</span>
            </div>
          </div>
          <!-- Chart X-Labels -->
          <div class="d-flex justify-content-between text-muted px-2 mt-2" style="font-size: 0.7rem; font-weight: 500;">
            <span>Th1</span><span>Th2</span><span>Th3</span><span>Th4</span><span>Th5</span><span>Th6</span><span>Th7</span><span>Th8</span><span>Th9</span><span>Th10</span><span>Th11</span><span>Th12</span>
          </div>
        </div>
      </div>

      <!-- Active Members Card -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">HỘI VIÊN HOẠT ĐỘNG</span>
              <h1 class="display-5 fw-bold text-dark my-1"> {{ totalMembers }}</h1>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2.5 py-1"
                style="font-size: 0.75rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +8.1% <span class="text-muted fw-normal">tháng này</span>
              </span>
            </div>
            <!-- Member Icon Container -->
            <div
              class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-users fs-5"></i>
            </div>
          </div>

          <!-- Progress statistics lists -->
          <div class="mt-4 pt-2">
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-1.5" style="font-size: 0.85rem;">
                <span class="text-secondary fw-medium">Tỷ lệ giữ chân</span>
                <span class="text-dark fw-bold">91.3%</span>
              </div>
              <div class="progress rounded-pill" style="height: 6px; background-color: #f1f5f9;">
                <div class="progress-bar rounded-pill bg-primary" role="progressbar" style="width: 91.3%;"
                  aria-valuenow="91.3" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>

            <div>
              <div class="d-flex justify-content-between align-items-center mb-1.5" style="font-size: 0.85rem;">
                <span class="text-secondary fw-medium">Mới trong tuần</span>
                <span class="text-dark fw-bold">+43</span>
              </div>
              <div class="progress rounded-pill" style="height: 6px; background-color: #f1f5f9;">
                <div class="progress-bar rounded-pill bg-primary" role="progressbar" style="width: 48%;"
                  aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Cards Section (Active Trainers and Today's Schedule) -->
    <div class="row g-4">
      <!-- Active Trainers List Card -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">PT HOẠT ĐỘNG</span>
              <h1 class="display-6 fw-bold text-dark my-1"> {{ totalTrainers }}</h1>
              <span class="badge bg-warning-subtle text-warning border border-warning rounded-pill px-2.5 py-1"
                style="font-size: 0.75rem;">
                <i class="fa-solid fa-minus me-1"></i> -2 <span class="text-muted fw-normal">so với tháng trước</span>
              </span>
            </div>
            <!-- Trainer Icon Container -->
            <div
              class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-user-ninja fs-5"></i>
            </div>
          </div>

          <!-- Trainers List -->
          <div class="d-flex flex-column gap-3 mt-4">
            <div v-for="trainer in trainers" :key="trainer.id"
              class="d-flex justify-content-between align-items-center p-2 rounded-3 hover-trainer-row">
              <div class="d-flex align-items-center gap-3">
                <img :src="trainer.avatar" alt="Avatar" class="rounded-circle shadow-sm"
                  style="width:40px; height:40px; object-fit:cover;" />
                <div>
                  <h6 class="mb-0 text-dark fw-bold text-trainer-name">{{ trainer.name }}</h6>
                  <small class="text-secondary">{{ trainer.specialization }}</small>
                </div>
              </div>
              <!-- <span class="badge bg-light text-dark border rounded-pill px-2.5 py-1 fw-bold text-muted" style="font-size: 0.75rem;">{{ trainer.classes }} lớp</span> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Schedule Card -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">Lịch Trình Hôm Nay</span>
              <h4 class="fw-bold text-dark mb-0 mt-1">Xem Nhanh — Thứ Bảy, 21 Tháng 6</h4>
            </div>
            <button
              class="btn btn-light rounded-pill border px-3 py-1.5 text-secondary fw-semibold d-flex align-items-center gap-1.5"
              style="font-size: 0.8rem;">
              <i class="fa-solid fa-calendar-days"></i>
              <span>Lịch Trình Đầy Đủ</span>
            </button>
          </div>

          <!-- Class Schedules List -->
          <div class="d-flex flex-column gap-3">
            <div v-for="schedule in classSchedules" :key="schedule.id"
              class="p-3 rounded-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center hover-schedule-row schedule-box">
              <!-- Time & Details -->
              <div class="d-flex align-items-center gap-4">
                <div class="text-center d-flex flex-column align-items-center" style="width: 70px;">
                  <span class="fw-bold text-primary fs-5 leading-none">{{ schedule.time }}</span>
                  <span class="text-uppercase text-secondary fw-bold" style="font-size: 0.65rem;">{{ schedule.period
                  }}</span>
                </div>
                <div>
                  <h6 class="mb-1 text-dark fw-bold" style="font-size: 0.95rem;">{{ schedule.className }}</h6>
                  <div class="d-flex flex-wrap gap-x-3 gap-y-1 align-items-center text-secondary"
                    style="font-size: 0.8rem;">
                    <span class="me-2"><i class="fa-solid fa-user-ninja me-1.5 opacity-70"></i>PT: {{ schedule.trainer
                    }}</span>
                    <span><i class="fa-solid fa-location-dot me-1.5 opacity-70"></i>{{ schedule.room }}</span>
                  </div>
                </div>
              </div>

              <!-- Tags and Booking Status -->
              <div class="d-flex align-items-center gap-3 mt-3 mt-md-0 ms-md-0 ms-4">
                <span class="badge rounded-pill px-3 py-1.5 fw-bold" :class="schedule.typeClass"
                  style="font-size: 0.7rem;">
                  {{ schedule.type }}
                </span>
                <span class="text-secondary fw-semibold" style="font-size: 0.8rem;">
                  <i class="fa-solid fa-user-check me-1.5 text-muted opacity-70"></i>{{ schedule.booked }}/{{
                    schedule.capacity }} chỗ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import baseRequestAdmin from "../../../core/baseRequestAdmin";
import axios from "axios";
export default {
  name: "AdminDashboard",
  data() {
    return {
      name: "",
      totalRevenue: 0,
      totalMembers: 0,
      totalTrainers: 0,
      trainers: [],
      classSchedules: [],
    };
  },
  methods: {
    async getDashboard() {
      try {
        const token = localStorage.getItem("token_admin");

        const res = await axios.get(
          "http://192.168.1.228:8000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = res.data.data;

        this.totalRevenue = Number(data.total_revenue);
        this.totalMembers = data.total_members;
        this.totalTrainers = data.total_trainers;

        this.trainers = data.trainers;

        this.classSchedules = data.today_schedules.map((item) => ({
          id: item.id,
          time: item.start_time.slice(0, 5),
          period:
            Number(item.start_time.split(":")[0]) >= 12 ? "PM" : "AM",
          className: item.title,
          trainer: item.trainer_name,
          room: item.room,
          booked: item.current_members,
          capacity: item.max_members,
        }));
      } catch (error) {
        console.error(error.response?.data || error);
      }
    },

    formatMoney(value) {
      return Number(value).toLocaleString("vi-VN") + "đ";
    },
  },

  mounted() {
    this.name = localStorage.getItem("ho_ten_admin") || "Admin";
    this.getDashboard();
  },



}
</script>

<style scoped>
.button-report {
  background-color: #1e40af;
  border-color: #1e40af;
}

.card-subtitle-label {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.icon-card-box {
  width: 48px;
  height: 48px;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  font-size: 0.85rem;
}

.text-trainer-name {
  font-size: 0.9rem;
}

.schedule-box {
  background-color: #f8fafc;
  border-left: 4px solid #3b82f6;
}

.bg-navy-dark {
  background-color: #1e293b;
}

.bg-purple-dark {
  background-color: #581c87;
}

.bg-blue-dark {
  background-color: #1e3a8a;
}

.bg-rose-dark {
  background-color: #881337;
}

.hover-trainer-row {
  transition: all 0.2s ease;
}

.hover-trainer-row:hover {
  background-color: #f8fafc !important;
  transform: translateX(4px);
}

.hover-schedule-row {
  transition: all 0.2s ease;
}

.hover-schedule-row:hover {
  background-color: #f1f5f9 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.leading-none {
  line-height: 1;
}
</style>
