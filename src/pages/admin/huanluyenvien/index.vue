<template>
  <div class="huanluyenvien-container">
    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Quản Lý Huấn Luyện Viên 🏋️‍♂️</h2>
        <p class="text-secondary mb-0">Theo dõi chuyên môn, lịch giảng dạy và danh sách học viên của từng huấn luyện viên (PT).</p>
      </div>
      <button class="btn btn-primary rounded-pill px-4 py-2 mt-3 mt-md-0 d-flex align-items-center gap-2 shadow-sm btn-add-pt" @click="showAddModal = true">
        <i class="fa-solid fa-user-plus"></i>
        <span class="fw-semibold">Thêm Huấn Luyện Viên</span>
      </button>
    </div>

    <!-- Quick Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Trainers -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG HUẤN LUYỆN VIÊN</span>
              <h3 class="fw-bold text-dark my-1">32</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +2 PT mới
              </span>
            </div>
            <div class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-user-ninja fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Classes Today -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">LỚP HỌC HÔM NAY</span>
              <h3 class="fw-bold text-dark my-1">18</h3>
              <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Đang vận hành
              </span>
            </div>
            <div class="bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-calendar-check fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Average Rating -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">ĐÁNH GIÁ TRUNG BÌNH</span>
              <h3 class="fw-bold text-dark my-1">4.9</h3>
              <span class="badge bg-warning-subtle text-warning border border-warning rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                <i class="fa-solid fa-star me-1 text-warning"></i> Rất tốt
              </span>
            </div>
            <div class="bg-warning-subtle text-warning rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-star fs-5 text-warning"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Busy Trainers -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">ĐANG LÊN LỚP</span>
              <h3 class="fw-bold text-dark my-1">12 / 32</h3>
              <span class="badge bg-info-subtle text-info border border-info rounded-pill px-2 py-0.5" style="font-size: 0.7rem;">
                Giờ cao điểm
              </span>
            </div>
            <div class="bg-info-subtle text-info rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-dumbbell fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main List Card -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <!-- Filter Bar -->
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
        <!-- Search bar -->
        <div class="input-group search-bar-input" style="max-width: 400px;">
          <span class="input-group-text bg-white border-end-0 border-light-custom text-secondary">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" class="form-control border-start-0 border-light-custom" placeholder="Tìm theo tên, SĐT hoặc chuyên môn..." v-model="searchQuery" />
        </div>

        <!-- Filter dropdown & Actions -->
        <div class="d-flex flex-wrap gap-2">
          <select class="form-select border-light-custom" v-model="specialtyFilter" style="width: 180px;">
            <option value="all">Tất cả chuyên môn</option>
            <option value="HIIT">HIIT / Võ thuật</option>
            <option value="Yoga">Yoga / Thiền</option>
            <option value="Cardio">Cardio / Thể lực</option>
            <option value="Pilates">Pilates</option>
          </select>
          <select class="form-select border-light-custom" v-model="statusFilter" style="width: 180px;">
            <option value="all">Tất cả trạng thái</option>
            <option value="Sẵn sàng">Sẵn sàng</option>
            <option value="Đang dạy">Đang dạy</option>
            <option value="Nghỉ phép">Nghỉ phép</option>
          </select>
        </div>
      </div>

      <!-- Trainers Table -->
      <div class="table-responsive">
        <table class="table align-middle custom-table">
          <thead>
            <tr>
              <th scope="col">Huấn Luyện Viên</th>
              <th scope="col">Chuyên Môn</th>
              <th scope="col">Đánh Giá</th>
              <th scope="col">Số Học Viên</th>
              <th scope="col">Số Lớp Tuần</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col" class="text-end">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trainer in filteredTrainers" :key="trainer.id" class="hover-row">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" :class="trainer.avatarColor">
                    {{ trainer.initials }}
                  </div>
                  <div>
                    <h6 class="mb-0 text-dark fw-bold text-trainer-name">{{ trainer.name }}</h6>
                    <small class="text-secondary">{{ trainer.phone }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="fw-medium text-dark" style="font-size: 0.85rem;">{{ trainer.specialty }}</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-1">
                  <i class="fa-solid fa-star text-warning" style="font-size: 0.8rem;"></i>
                  <span class="fw-bold text-dark" style="font-size: 0.85rem;">{{ trainer.rating }}</span>
                </div>
              </td>
              <td>
                <span class="text-secondary fw-semibold" style="font-size: 0.85rem;">{{ trainer.students }} học viên</span>
              </td>
              <td>
                <span class="badge bg-light text-dark border rounded-pill px-2.5 py-1" style="font-size: 0.75rem;">{{ trainer.classes }} lớp / tuần</span>
              </td>
              <td>
                <span class="badge rounded-pill px-2.5 py-1.5 fw-bold" :class="trainer.statusClass" style="font-size: 0.7rem;">
                  {{ trainer.status }}
                </span>
              </td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-light btn-sm rounded-circle shadow-xs" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 32px; height: 32px; padding: 0;">
                    <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="editTrainer(trainer)"><i class="fa-solid fa-pen-to-square me-2 text-secondary"></i>Chỉnh sửa thông tin</a></li>
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="assignClass(trainer)"><i class="fa-solid fa-calendar-plus me-2 text-secondary"></i>Phân lịch dạy</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item py-2 text-danger" href="#" @click.prevent="deleteTrainer(trainer.id)"><i class="fa-solid fa-trash-can me-2"></i>Xóa huấn luyện viên</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr v-if="filteredTrainers.length === 0">
              <td colspan="7" class="text-center py-5 text-secondary">Không tìm thấy huấn luyện viên nào.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Add Trainer Modal Overlay -->
    <div v-if="showAddModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="card border-0 shadow rounded-4 p-4 modal-box bg-white" style="width: 500px; max-width: 90%;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fw-bold text-dark mb-0">Thêm Huấn Luyện Viên Mới</h5>
          <button class="btn-close" @click="showAddModal = false"></button>
        </div>
        <form @submit.prevent="submitAddTrainer">
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Họ và Tên</label>
            <input type="text" class="form-control" required v-model="newTrainer.name" placeholder="Ví dụ: Dustin Myers" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Số Điện Thoại</label>
            <input type="tel" class="form-control" required v-model="newTrainer.phone" placeholder="Ví dụ: 0987654321" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Chuyên Môn</label>
            <select class="form-select" v-model="newTrainer.specialty">
              <option value="HIIT / Võ thuật">HIIT / Võ thuật</option>
              <option value="Yoga / Breathwork">Yoga / Breathwork</option>
              <option value="Cardio / Thể lực">Cardio / Thể lực</option>
              <option value="Pilates">Pilates</option>
            </select>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-light rounded-pill px-3" @click="showAddModal = false">Hủy</button>
            <button type="submit" class="btn btn-primary rounded-pill px-4">Lưu Lại</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuanLyHuanLuyenVien",
  data() {
    return {
      searchQuery: "",
      specialtyFilter: "all",
      statusFilter: "all",
      showAddModal: false,
      newTrainer: {
        name: "",
        phone: "",
        specialty: "Cardio / Thể lực"
      },
      trainers: [
        {
          id: 1,
          name: "Marcus Webb",
          phone: "0901 888 222",
          specialty: "HIIT / Võ thuật",
          rating: "4.9",
          students: 15,
          classes: 6,
          status: "Đang dạy",
          statusClass: "bg-info-subtle text-info border border-info",
          initials: "MW",
          avatarColor: "bg-primary"
        },
        {
          id: 2,
          name: "Priya Sharma",
          phone: "0912 777 333",
          specialty: "Yoga / Thiền",
          rating: "5.0",
          students: 12,
          classes: 4,
          status: "Sẵn sàng",
          statusClass: "bg-success-subtle text-success border border-success",
          initials: "PS",
          avatarColor: "bg-info"
        },
        {
          id: 3,
          name: "Dustin Myers",
          phone: "0934 999 555",
          specialty: "Cardio / Thể lực",
          rating: "4.8",
          students: 20,
          classes: 8,
          status: "Sẵn sàng",
          statusClass: "bg-success-subtle text-success border border-success",
          initials: "DM",
          avatarColor: "bg-warning text-dark"
        },
        {
          id: 4,
          name: "Sarah Jenkins",
          phone: "0978 111 444",
          specialty: "Pilates",
          rating: "4.9",
          students: 10,
          classes: 5,
          status: "Nghỉ phép",
          statusClass: "bg-danger-subtle text-danger border border-danger",
          initials: "SJ",
          avatarColor: "bg-danger"
        }
      ]
    };
  },
  computed: {
    filteredTrainers() {
      return this.trainers.filter(trainer => {
        // Search filter
        const matchSearch = trainer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            trainer.phone.includes(this.searchQuery) ||
                            trainer.specialty.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        // Specialty filter
        const matchSpecialty = this.specialtyFilter === "all" || trainer.specialty.includes(this.specialtyFilter);

        // Status filter
        const matchStatus = this.statusFilter === "all" || trainer.status === this.statusFilter;

        return matchSearch && matchSpecialty && matchStatus;
      });
    }
  },
  methods: {
    submitAddTrainer() {
      const initials = this.newTrainer.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2);
      
      const newObj = {
        id: this.trainers.length + 1,
        name: this.newTrainer.name,
        phone: this.newTrainer.phone,
        specialty: this.newTrainer.specialty,
        rating: "5.0",
        students: 0,
        classes: 0,
        status: "Sẵn sàng",
        statusClass: "bg-success-subtle text-success border border-success",
        initials: initials,
        avatarColor: "bg-primary"
      };

      this.trainers.unshift(newObj);
      this.newTrainer = { name: "", phone: "", specialty: "Cardio / Thể lực" };
      this.showAddModal = false;
    },
    deleteTrainer(id) {
      if (confirm("Bạn có chắc chắn muốn xóa huấn luyện viên này không?")) {
        this.trainers = this.trainers.filter(t => t.id !== id);
      }
    },
    editTrainer(trainer) {
      alert(`Chỉnh sửa huấn luyện viên: ${trainer.name}`);
    },
    assignClass(trainer) {
      alert(`Phân lịch dạy cho: ${trainer.name}`);
    }
  }
}
</script>

<style scoped>
.btn-add-pt {
  background-color: #1e40af; 
  border-color: #1e40af;
}
.btn-add-pt:hover {
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
.text-trainer-name {
  font-size: 0.9rem;
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
