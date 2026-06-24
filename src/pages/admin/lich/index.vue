<template>
  <div class="lich-container">
    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Lịch Hoạt Động Hằng Ngày 📅</h2>
        <p class="text-secondary mb-0">Quản lý lịch dạy lớp nhóm, ca tập riêng PT và phòng tập trong khung giờ từ 07:00 sáng đến 21:00 tối.</p>
      </div>
      <button class="btn btn-primary rounded-pill px-4 py-2 mt-3 mt-md-0 d-flex align-items-center gap-2 shadow-sm btn-add-schedule" @click="showAddModal = true">
        <i class="fa-solid fa-calendar-plus"></i>
        <span class="fw-semibold">Thêm Lịch Mới</span>
      </button>
    </div>

    <!-- Quick Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Scheduled Classes -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG LỚP HỌC</span>
              <h3 class="fw-bold text-dark my-1">12</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Trong ngày hôm nay
              </span>
            </div>
            <div class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-calendar-days fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Average Attendance -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỶ LỆ LẤP ĐẦY</span>
              <h3 class="fw-bold text-dark my-1">84%</h3>
              <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Trung bình lớp
              </span>
            </div>
            <div class="bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-users-viewfinder fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Room A Utilization -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">SỬ DỤNG PHÒNG A</span>
              <h3 class="fw-bold text-dark my-1">8 giờ</h3>
              <span class="badge bg-warning-subtle text-warning border border-warning rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Hiệu suất cao
              </span>
            </div>
            <div class="bg-warning-subtle text-warning rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-building-circle-check fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Room B Utilization -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">SỬ DỤNG PHÒNG B</span>
              <h3 class="fw-bold text-dark my-1">6 giờ</h3>
              <span class="badge bg-info-subtle text-info border border-info rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Trạng thái tốt
              </span>
            </div>
            <div class="bg-info-subtle text-info rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-building-circle-arrow-right fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Time Slots Agenda Grid -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <!-- Filter Bar -->
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
        <div>
          <h5 class="fw-bold text-dark mb-0">Lịch Trình Trong Ngày</h5>
          <small class="text-secondary">Hiển thị lịch hoạt động theo thứ tự thời gian từ 07:00 đến 21:00</small>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <select class="form-select border-light-custom" v-model="roomFilter" style="width: 160px;">
            <option value="all">Tất cả phòng</option>
            <option value="Phòng Tập A">Phòng Tập A</option>
            <option value="Phòng Tập B">Phòng Tập B</option>
            <option value="Studio Yoga">Studio Yoga</option>
          </select>
          <select class="form-select border-light-custom" v-model="typeFilter" style="width: 160px;">
            <option value="all">Tất cả loại lớp</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Tăng Cơ">Tăng Cơ</option>
            <option value="Zumba">Zumba</option>
          </select>
        </div>
      </div>

      <!-- Timeline List (Hours 7h - 21h) -->
      <div class="d-flex flex-column gap-3">
        <div v-for="slot in hourlySchedule" :key="slot.time" class="time-row d-flex flex-column flex-md-row gap-4 p-3 rounded-4 align-items-start align-items-md-center" :class="slot.classInfo ? 'has-class border-start-custom' : 'no-class'">
          
          <!-- Hour indicator -->
          <div class="time-label fw-bold text-primary fs-5" style="width: 80px; min-width: 80px;">
            {{ slot.time }}
          </div>

          <!-- Card Content for Time Slot -->
          <div class="flex-grow-1 w-100">
            <!-- If slot has a class -->
            <div v-if="slot.classInfo" class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
              <div>
                <h6 class="mb-1 text-dark fw-bold" style="font-size: 1rem;">{{ slot.classInfo.name }}</h6>
                <div class="d-flex flex-wrap gap-x-3 gap-y-1 align-items-center text-secondary" style="font-size: 0.8rem;">
                  <span class="me-2"><i class="fa-solid fa-user-ninja me-1.5 opacity-70"></i>PT: {{ slot.classInfo.trainer }}</span>
                  <span class="me-2"><i class="fa-solid fa-location-dot me-1.5 opacity-70"></i>{{ slot.classInfo.room }}</span>
                </div>
              </div>
              <div class="d-flex align-items-center gap-3 mt-2 mt-md-0">
                <span class="badge rounded-pill px-3 py-1.5 fw-bold" :class="slot.classInfo.badgeClass" style="font-size: 0.7rem;">
                  {{ slot.classInfo.type }}
                </span>
                <span class="text-secondary fw-semibold" style="font-size: 0.8rem;">
                  <i class="fa-solid fa-user-check me-1.5 text-muted opacity-70"></i>{{ slot.classInfo.booked }}/{{ slot.classInfo.capacity }} chỗ
                </span>
                
                <!-- Action dropdown -->
                <div class="dropdown">
                  <button class="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 32px; height: 32px; padding: 0;">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="cancelClass(slot.time)"><i class="fa-solid fa-ban me-2 text-danger"></i>Hủy lịch này</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- If slot is empty -->
            <div v-else class="text-muted d-flex justify-content-between align-items-center py-1">
              <span style="font-size: 0.85rem; font-style: italic;"><i class="fa-regular fa-calendar-plus me-2"></i>Khung giờ trống — Không có lịch hoạt động</span>
              <button class="btn btn-sm btn-light border-light-custom rounded-pill px-3" style="font-size: 0.75rem;" @click="openAddModalWithTime(slot.time)">
                Lên lịch ngay
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Quick Add Schedule Modal -->
    <div v-if="showAddModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="card border-0 shadow rounded-4 p-4 modal-box bg-white" style="width: 500px; max-width: 90%;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fw-bold text-dark mb-0">Thêm Lịch Hoạt Động Mới</h5>
          <button class="btn-close" @click="showAddModal = false"></button>
        </div>
        <form @submit.prevent="submitAddSchedule">
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Tên Lớp Học / Hoạt Động</label>
            <input type="text" class="form-control" required v-model="newSchedule.name" placeholder="Ví dụ: Zumba Dance Năng Lượng" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Huấn Luyện Viên</label>
            <select class="form-select" v-model="newSchedule.trainer">
              <option value="Marcus Webb">Marcus Webb</option>
              <option value="Priya Sharma">Priya Sharma</option>
              <option value="Dustin Myers">Dustin Myers</option>
              <option value="Sarah Jenkins">Sarah Jenkins</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Khung Giờ Bắt Đầu</label>
            <select class="form-select" v-model="newSchedule.time">
              <option v-for="t in hoursList" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-6">
              <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Phòng Tập</label>
              <select class="form-select" v-model="newSchedule.room">
                <option value="Phòng Tập A">Phòng Tập A</option>
                <option value="Phòng Tập B">Phòng Tập B</option>
                <option value="Studio Yoga">Studio Yoga</option>
              </select>
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Thể Loại</label>
              <select class="form-select" v-model="newSchedule.type">
                <option value="HIIT">HIIT</option>
                <option value="Yoga">Yoga</option>
                <option value="Tăng Cơ">Tăng Cơ</option>
                <option value="Zumba">Zumba</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-light rounded-pill px-3" @click="showAddModal = false">Hủy</button>
            <button type="submit" class="btn btn-primary rounded-pill px-4">Lưu Lịch</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LichHoatDong",
  data() {
    return {
      roomFilter: "all",
      typeFilter: "all",
      showAddModal: false,
      newSchedule: {
        name: "",
        trainer: "Marcus Webb",
        time: "07:00",
        room: "Phòng Tập A",
        type: "HIIT"
      },
      hoursList: [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", 
        "19:00", "20:00", "21:00"
      ],
      schedules: [
        {
          time: "08:00",
          name: "HIIT Đốt Mỡ Buổi Sáng",
          trainer: "Marcus Webb",
          room: "Phòng Tập A",
          type: "HIIT",
          badgeClass: "bg-primary-subtle text-primary border border-primary",
          booked: 18,
          capacity: 20
        },
        {
          time: "09:30",
          name: "Yoga Dòng Chảy & Luyện Thở",
          trainer: "Priya Sharma",
          room: "Phòng Tập B",
          type: "Yoga",
          badgeClass: "bg-success-subtle text-success border border-success",
          booked: 12,
          capacity: 15
        },
        {
          time: "11:00",
          name: "Tập Lực & Thể Lực Chuyên Sâu",
          trainer: "Dustin Myers",
          room: "Phòng Tập A",
          type: "Tăng Cơ",
          badgeClass: "bg-warning-subtle text-warning border border-warning",
          booked: 15,
          capacity: 15
        },
        {
          time: "15:00",
          name: "Zumba Sôi Động Cuối Ngày",
          trainer: "Sarah Jenkins",
          room: "Phòng Tập B",
          type: "Zumba",
          badgeClass: "bg-info-subtle text-info border border-info",
          booked: 8,
          capacity: 25
        },
        {
          time: "18:30",
          name: "Yoga Trị Liệu Trầm Tư",
          trainer: "Priya Sharma",
          room: "Studio Yoga",
          type: "Yoga",
          badgeClass: "bg-success-subtle text-success border border-success",
          booked: 10,
          capacity: 12
        }
      ]
    };
  },
  computed: {
    hourlySchedule() {
      // Map hours list (7h - 21h) with existing schedules
      return this.hoursList.map(hour => {
        // Find if any class matches the hour block (e.g. 08:00 starts at hour 08)
        const classFound = this.schedules.find(s => {
          const sHour = s.time.split(":")[0];
          const hHour = hour.split(":")[0];
          
          // Filter out if room or type does not match filter
          const matchRoom = this.roomFilter === "all" || s.room === this.roomFilter;
          const matchType = this.typeFilter === "all" || s.type === this.typeFilter;
          
          return sHour === hHour && matchRoom && matchType;
        });

        return {
          time: hour,
          classInfo: classFound || null
        };
      });
    }
  },
  methods: {
    openAddModalWithTime(time) {
      this.newSchedule.time = time;
      this.showAddModal = true;
    },
    submitAddSchedule() {
      const typeBadgeMap = {
        HIIT: "bg-primary-subtle text-primary border border-primary",
        Yoga: "bg-success-subtle text-success border border-success",
        "Tăng Cơ": "bg-warning-subtle text-warning border border-warning",
        Zumba: "bg-info-subtle text-info border border-info"
      };

      const newObj = {
        time: this.newSchedule.time,
        name: this.newSchedule.name,
        trainer: this.newSchedule.trainer,
        room: this.newSchedule.room,
        type: this.newSchedule.type,
        badgeClass: typeBadgeMap[this.newSchedule.type] || "bg-light text-dark",
        booked: 0,
        capacity: 20
      };

      // Remove previous class if it overlaps
      this.schedules = this.schedules.filter(s => s.time.split(":")[0] !== this.newSchedule.time.split(":")[0]);
      
      this.schedules.push(newObj);
      this.newSchedule = { name: "", trainer: "Marcus Webb", time: "07:00", room: "Phòng Tập A", type: "HIIT" };
      this.showAddModal = false;
    },
    cancelClass(time) {
      if (confirm(`Bạn có chắc chắn muốn hủy lịch hoạt động lúc ${time}?`)) {
        this.schedules = this.schedules.filter(s => s.time !== time);
      }
    }
  }
}
</script>

<style scoped>
.btn-add-schedule {
  background-color: #1e40af; 
  border-color: #1e40af;
}
.btn-add-schedule:hover {
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
.time-row {
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  background-color: #ffffff;
}
.time-row.has-class {
  border-left-width: 4px;
}
.time-row.has-class.border-start-custom {
  border-left-color: #3b82f6 !important;
}
.time-row.no-class {
  background-color: #f8fafc;
  border-style: dashed;
}
.time-row:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
}
.modal-box {
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
