<template>
  <div class="book-pt-container" style="padding-top: 55px;">
    <!-- Booking Header -->
    <div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden mb-4">
      <div class="p-4 bg-light-gradient d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;" @click="$router.push('/client')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h4 class="fw-bold text-dark mb-0">Đặt Lịch Huấn Luyện Viên (PT)</h4>
            <p class="text-secondary mb-0" style="font-size: 0.85rem;">Tìm kiếm huấn luyện viên cá nhân phù hợp và đặt lịch tập riêng</p>
          </div>
        </div>
        
        <!-- Quick search inputs -->
        <div class="d-flex gap-2">
          <input type="text" v-model="searchQuery" class="form-control border rounded-pill px-3 text-secondary" placeholder="Tìm tên PT..." style="height: 40px; font-size: 0.85rem; width: 200px;">
          <select v-model="selectedSpecialty" class="form-select border rounded-pill px-3 text-secondary" style="height: 40px; font-size: 0.85rem; width: 160px;">
            <option value="All">Tất cả chuyên môn</option>
            <option value="HIIT">HIIT / Võ thuật</option>
            <option value="Yoga">Yoga / Breathwork</option>
            <option value="Cardio">Cardio / Thể lực</option>
            <option value="Pilates">Pilates</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Booking Section -->
    <div class="row g-4">
      <!-- Left side: Trainer Grid -->
      <div class="col-lg-8">
        <div class="row g-3">
          <div v-for="pt in filteredPTs" :key="pt.id" class="col-md-6 col-12">
            <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 trainer-card position-relative" :class="{ 'selected-trainer-card': selectedPT && selectedPT.id === pt.id }">
              <div class="d-flex align-items-start justify-content-between mb-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="pt.avatarColor" style="width: 55px; height: 55px; font-size: 1.25rem;">
                    {{ pt.initials }}
                  </div>
                  <div>
                    <h5 class="fw-bold text-dark mb-1">{{ pt.name }}</h5>
                    <span class="badge bg-light text-secondary border rounded-pill px-2.5 py-1" style="font-size: 0.7rem;">{{ pt.specialty }}</span>
                  </div>
                </div>
                <!-- Rating -->
                <div class="text-warning fw-bold d-flex align-items-center gap-1" style="font-size: 0.95rem;">
                  <i class="fa-solid fa-star"></i>
                  <span>{{ pt.rating }}</span>
                </div>
              </div>

              <div class="mb-4 text-secondary" style="font-size: 0.85rem;">
                <div class="d-flex justify-content-between mb-1">
                  <span>Kinh nghiệm:</span>
                  <span class="fw-semibold text-dark">{{ pt.experience }} năm</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                  <span>Chi phí buổi tập:</span>
                  <span class="fw-semibold text-primary">{{ formatPrice(pt.price) }} / Buổi</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Số lớp đã dạy:</span>
                  <span class="fw-semibold text-dark">{{ pt.classesTaught }} lớp</span>
                </div>
              </div>

              <!-- Button Select -->
              <button class="btn w-100 rounded-pill py-2 fw-bold" :class="selectedPT && selectedPT.id === pt.id ? 'btn-info text-white' : 'btn-outline-info'" @click="selectTrainer(pt)">
                {{ selectedPT && selectedPT.id === pt.id ? 'Đã Chọn PT' : 'Chọn PT Này' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Booking form details -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 sticky-top" style="top: 85px;">
          <h5 class="fw-bold text-dark mb-3 border-bottom pb-2">Thông Tin Đặt Lịch</h5>
          
          <div v-if="!selectedPT" class="text-center py-5 text-muted">
            <i class="fa-solid fa-user-ninja mb-3 opacity-30" style="font-size: 3rem;"></i>
            <p class="mb-0">Vui lòng chọn một Huấn luyện viên ở danh sách bên cạnh để bắt đầu đặt lịch tập.</p>
          </div>

          <div v-else>
            <!-- Selected PT Card Short Info -->
            <div class="d-flex align-items-center gap-3 p-3 rounded-4 mb-4 bg-light-gradient">
              <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="selectedPT.avatarColor" style="width: 45px; height: 45px; font-size: 1rem;">
                {{ selectedPT.initials }}
              </div>
              <div>
                <h6 class="fw-bold text-dark mb-0.5">{{ selectedPT.name }}</h6>
                <small class="text-secondary">{{ selectedPT.specialty }}</small>
              </div>
            </div>

            <!-- Booking Date Selector -->
            <div class="mb-3">
              <label class="form-label fw-bold text-dark" style="font-size: 0.85rem;">Chọn Ngày Tập</label>
              <input type="date" v-model="bookingDate" class="form-control border rounded-3 text-secondary" style="height: 42px;">
            </div>

            <!-- Booking Time Slot -->
            <div class="mb-4">
              <label class="form-label fw-bold text-dark" style="font-size: 0.85rem;">Chọn Khung Giờ</label>
              <div class="row row-cols-3 g-2">
                <div v-for="slot in timeSlots" :key="slot" class="col">
                  <button class="btn btn-sm w-100 rounded-3 py-2 border-light-custom" :class="bookingTime === slot ? 'bg-info text-white border-info' : 'bg-light text-secondary border'" @click="bookingTime = slot">
                    {{ slot }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Summary price -->
            <div class="border-top pt-3 mb-4 text-secondary" style="font-size: 0.85rem;">
              <div class="d-flex justify-content-between mb-2">
                <span>Giá dịch vụ PT:</span>
                <span class="text-dark fw-bold">{{ formatPrice(selectedPT.price) }}</span>
              </div>
              <div class="d-flex justify-content-between border-top pt-2">
                <span class="text-dark fw-bold fs-6">Tổng Thanh Toán:</span>
                <span class="text-primary fw-extrabold fs-5">{{ formatPrice(selectedPT.price) }}</span>
              </div>
            </div>

            <!-- Booking Action Button -->
            <button class="btn btn-info text-white w-100 rounded-pill py-2.5 fw-bold shadow-sm" style="background-color: #06b6d4; border-color: #06b6d4;" @click="submitBooking">
              Xác Nhận Đặt Lịch PT
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking success toast popup -->
    <div v-if="showSuccessToast" class="booking-toast-box position-fixed bottom-4 end-4 p-4 bg-success text-white rounded-4 shadow-lg d-flex align-items-center gap-3" style="z-index: 1050; animation: fadeInUp 0.4s ease;">
      <i class="fa-solid fa-circle-check fs-3"></i>
      <div>
        <h6 class="fw-bold mb-0.5">Đặt lịch thành công!</h6>
        <small class="opacity-90">Lịch tập đã được gửi cho PT xác nhận và đồng bộ vào lịch của bạn.</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookPT",
  data() {
    return {
      searchQuery: "",
      selectedSpecialty: "All",
      selectedPT: null,
      bookingDate: "",
      bookingTime: "",
      showSuccessToast: false,
      timeSlots: [
        "08:00 AM", "09:30 AM", "11:00 AM",
        "02:00 PM", "03:30 PM", "05:00 PM",
        "06:30 PM", "08:00 PM"
      ],
      personalTrainers: [
        {
          id: 1,
          name: "Marcus Webb",
          specialty: "HIIT",
          specialtyLabel: "HIIT / Võ thuật",
          experience: 5,
          price: 250000,
          classesTaught: 124,
          rating: 4.9,
          initials: "MW",
          avatarColor: "bg-navy-dark"
        },
        {
          id: 2,
          name: "Priya Sharma",
          specialty: "Yoga",
          specialtyLabel: "Yoga / Breathwork",
          experience: 4,
          price: 200000,
          classesTaught: 98,
          rating: 4.8,
          initials: "PS",
          avatarColor: "bg-purple-dark"
        },
        {
          id: 3,
          name: "Dustin Myers",
          specialty: "Cardio",
          specialtyLabel: "Cardio / Thể lực",
          experience: 6,
          price: 300000,
          classesTaught: 145,
          rating: 4.9,
          initials: "DM",
          avatarColor: "bg-blue-dark"
        },
        {
          id: 4,
          name: "Sarah Jenkins",
          specialty: "Pilates",
          specialtyLabel: "Pilates",
          experience: 3,
          price: 220000,
          classesTaught: 76,
          rating: 4.7,
          initials: "SJ",
          avatarColor: "bg-rose-dark"
        }
      ]
    };
  },
  computed: {
    filteredPTs() {
      return this.personalTrainers.filter(pt => {
        const matchesQuery = pt.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesSpecialty = this.selectedSpecialty === "All" || pt.specialty === this.selectedSpecialty;
        return matchesQuery && matchesSpecialty;
      });
    }
  },
  methods: {
    selectTrainer(pt) {
      this.selectedPT = pt;
      this.bookingTime = "";
    },
    formatPrice(val) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    },
    submitBooking() {
      if (!this.bookingDate || !this.bookingTime) {
        alert("Vui lòng chọn đầy đủ ngày tập và khung giờ để hoàn tất đăng ký.");
        return;
      }
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
        this.$router.push('/client/schedule');
      }, 3000);
    }
  }
}
</script>

<style scoped>
.bg-light-gradient {
  background-color: #f8fafc;
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
.trainer-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f1f5f9;
}
.trainer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
}
.selected-trainer-card {
  border: 2px solid #06b6d4 !important;
  box-shadow: 0 10px 20px rgba(6, 182, 212, 0.15) !important;
}
.border-light-custom {
  border: 1px solid #e2e8f0;
}
.border-info {
  border-color: #06b6d4 !important;
}
.text-primary {
  color: #06b6d4 !important;
}
.btn-outline-info {
  border-color: #06b6d4;
  color: #06b6d4;
}
.btn-outline-info:hover {
  background-color: #06b6d4;
  color: white;
}
.btn-info {
  background-color: #06b6d4;
  border-color: #06b6d4;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.bottom-4 {
  bottom: 24px;
}
.end-4 {
  right: 24px;
}
</style>
