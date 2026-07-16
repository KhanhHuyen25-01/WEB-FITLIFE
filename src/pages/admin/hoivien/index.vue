<template>
  <div class="hoivien-container">
    <!-- Welcome Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h2 class="fw-bold text-dark mb-1">Quản Lý Hội Viên 👥</h2>
        <p class="text-secondary mb-0">Theo dõi thông tin, thời hạn gói tập và trạng thái hoạt động của hội viên.</p>
      </div>
      <button
        class="btn btn-primary rounded-pill px-4 py-2 mt-3 mt-md-0 d-flex align-items-center gap-2 shadow-sm btn-add-member"
        @click="showAddModal = true">
        <i class="fa-solid fa-user-plus"></i>
        <span class="fw-semibold">Thêm Hội Viên Mới</span>
      </button>
    </div>

    <!-- Quick Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Members -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">TỔNG HỘI VIÊN</span>
              <h3 class="fw-bold text-dark my-1">{{ totalMember }}</h3>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-2 py-0.5"
                style="font-size: 0.7rem;">
                <i class="fa-solid fa-arrow-up me-1"></i> +8.1%
              </span>
            </div>
            <div
              class="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-users fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Pass -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">ĐANG HOẠT ĐỘNG</span>
              <h3 class="fw-bold text-dark my-1">{{ activeMember }}</h3>
              <span class="badge bg-primary-subtle text-primary border border-primary rounded-pill px-2 py-0.5"
                style="font-size: 0.7rem;">
                Tỷ lệ 91.3%
              </span>
            </div>
            <div
              class="bg-success-subtle text-success rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-circle-check fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Expiring Soon -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">SẮP HẾT HẠN (7 ngày)</span>
              <h3 class="fw-bold text-dark my-1"> {{ expireSoon }}</h3>
              <span class="badge bg-warning-subtle text-warning border border-warning rounded-pill px-2 py-0.5"
                style="font-size: 0.7rem;">
                Cần thông báo
              </span>
            </div>
            <div
              class="bg-warning-subtle text-warning rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-bell fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Expired -->
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="text-uppercase text-secondary fw-bold card-subtitle-label">ĐÃ HẾT HẠN</span>
              <h3 class="fw-bold text-dark my-1">{{ expired }}</h3>
              <span class="badge bg-danger-subtle text-danger border border-danger rounded-pill px-2 py-0.5"
                style="font-size: 0.7rem;">
                Gia hạn lại
              </span>
            </div>
            <div
              class="bg-danger-subtle text-danger rounded-4 d-flex align-items-center justify-content-center icon-card-box">
              <i class="fa-solid fa-user-xmark fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main List Card -->
    <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
      <!-- Filter Bar -->
      <div
        class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
        <!-- Search bar -->
        <div class="input-group search-bar-input" style="max-width: 400px;">
          <span class="input-group-text bg-white border-end-0 border-light-custom text-secondary">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" class="form-control border-start-0 border-light-custom"
            placeholder="Tìm theo tên, SĐT hoặc mã hội viên..." v-model="searchQuery" />
        </div>

        <!-- Filter dropdown & Actions -->
        <div class="d-flex flex-wrap gap-2">
          <select class="form-select border-light-custom" v-model="statusFilter" style="width: 180px;">
            <option value="all">Tất cả trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="2">Sắp hết hạn</option>
            <option value="4">Đã hết hạn</option>
          </select>
          <select class="form-select border-light-custom" v-model="packageFilter" style="width: 180px;">
            <option value="all">Tất cả gói tập</option>
            <option value="Cơ Bản">Cơ Bản</option>
            <option value="Tiêu Chuẩn">Tiêu Chuẩn</option>
            <option value="Cao Cấp">Cao Cấp</option>
          </select>
        </div>
      </div>

      <!-- Members Table -->
      <div class="table-responsive">
        <table class="table align-middle custom-table">
          <thead>
            <tr>
              <th scope="col">Hội Viên</th>
              <th scope="col">Mã Số</th>
              <th scope="col">Gói Tập</th>
              <th scope="col">Ngày Đăng Ký</th>
              <th scope="col">Ngày Hết Hạn</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col" class="text-end">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filteredMembers" :key="member.id" class="hover-row">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <img v-if="member.avatar" :src="member.avatar" class="rounded-circle" width="40" height="40"
                    style="object-fit: cover;" />
                  <div v-else
                    class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    :class="member.avatarColor">
                    {{ member.initials }}
                  </div>
                  <div>
                    <h6 class="mb-0 text-dark fw-bold text-member-name">{{ member.name }}</h6>
                    <small class="text-secondary">{{ member.phone }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="fw-semibold text-secondary" style="font-size: 0.85rem;"> HV-{{ member.memberCode }}</span>
              </td>
              <td>
                <span class="fw-medium text-dark" style="font-size: 0.85rem;">{{ member.package }}</span>
              </td>
              <td>
                <span class="text-secondary" style="font-size: 0.85rem;">{{ member.joinDate }}</span>
              </td>
              <td>
                <span class="text-secondary" style="font-size: 0.85rem;">{{ member.expiryDate }}</span>
              </td>
              <td>
                <span class="badge rounded-pill px-2 py-1" :class="member.statusClass">
                  {{ member.statusText }}
                </span>
              </td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-light btn-sm rounded-circle shadow-xs" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" style="width: 32px; height: 32px; padding: 0;">
                    <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="editMember(member)"><i
                          class="fa-solid fa-pen-to-square me-2 text-secondary"></i>Chỉnh sửa</a></li>
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="renewMember(member)"><i
                          class="fa-solid fa-rotate-left me-2 text-secondary"></i>Gia hạn gói</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item py-2 text-danger" href="#" @click.prevent="deleteMember(member.id)"><i
                          class="fa-solid fa-trash-can me-2"></i>Xóa hội viên</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr v-if="filteredMembers.length === 0">
              <td colspan="7" class="text-center py-5 text-secondary">Không tìm thấy hội viên nào phù hợp.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Add Member Modal Overlay -->
    <div v-if="showAddModal" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="card border-0 shadow rounded-4 p-4 modal-box bg-white" style="width: 500px; max-width: 90%;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fw-bold text-dark mb-0">Thêm Hội Viên Mới</h5>
          <button class="btn-close" @click="showAddModal = false"></button>
        </div>
        <form @submit.prevent="submitAddMember">
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Họ và Tên</label>
            <input type="text" class="form-control" required v-model="newMember.name"
              placeholder="Ví dụ: Nguyễn Văn A" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Số Điện Thoại</label>
            <input type="tel" class="form-control" required v-model="newMember.phone" placeholder="Ví dụ: 0987654321" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-secondary" style="font-size: 0.85rem;">Gói Tập</label>
            <select class="form-select" v-model="newMember.package">
              <option value="Platinum 12 Tháng">Gói Platinum 12 Tháng</option>
              <option value="Premium 6 Tháng">Gói Premium 6 Tháng</option>
              <option value="Standard 1 Tháng">Gói Standard 1 Tháng</option>
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
import axios from "axios";
export default {
  name: "QuanLyHoiVien",
  data() {
    return {
      searchQuery: "",
      statusFilter: "all",
      packageFilter: "all",
      showAddModal: false,

      totalMember: 0,
      activeMember: 0,
      expireSoon: 0,
      expired: 0,

      members: [],

      newMember: {
        name: "",
        phone: "",
        package: "Platinum 12 Tháng"
      }
    }
  },
  methods: {
    async getMembers() {
      try {
        const token = localStorage.getItem("token_admin");

        const res = await axios.get(
          "http://192.168.1.228:8000/api/admin/member",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = res.data;

        // Summary
        this.totalMember = data.summary.total_member;
        this.activeMember = data.summary.active_member;
        this.expireSoon = data.summary.expire_soon;
        this.expired = data.summary.expired;

        // Danh sách hội viên
        this.members = data.members.data.map((item) => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          memberCode: `HV-${item.member_id}`,
          package: item.package_name,
          joinDate: item.start_date,
          expiryDate: item.end_date,

          status: item.status,



          statusText:
            item.status == 1
              ? "Đang hoạt động"
              : item.status == 2
                ? "Sắp hết hạn"
                : "Đã hết hạn",

          statusClass:
            item.status == 1
              ? "bg-success-subtle text-success border border-success"
              : item.status == 2
                ? "bg-warning-subtle text-warning border border-warning"
                : "bg-danger-subtle text-danger border border-danger",

          initials: item.name
            .split(" ")
            .map((x) => x[0])
            .slice(-2)
            .join("")
            .toUpperCase(),

          avatarColor: "bg-primary",
        }));

      } catch (e) {
        console.log(e);
      }
    },
    submitAddMember() {
      const codeNumber = 1000 + this.members.length + 1;
      const initials = this.newMember.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2);

      const newObj = {
        id: this.members.length + 1,
        name: this.newMember.name,
        phone: this.newMember.phone,
        memberCode: `FL-${codeNumber}`,
        package: this.newMember.package,
        joinDate: "24/06/2026",
        expiryDate: "24/06/2027",
        status: "active",
        statusText: "Đang hoạt động",
        statusClass: "bg-success-subtle text-success border border-success",
        initials: initials,
        avatarColor: "bg-primary"
      };

      this.members.unshift(newObj);
      this.newMember = { name: "", phone: "", package: "Platinum 12 Tháng" };
      this.showAddModal = false;
    },
    deleteMember(id) {
      if (confirm("Bạn có chắc chắn muốn xóa hội viên này không?")) {
        this.members = this.members.filter(m => m.id !== id);
      }
    },
    editMember(member) {
      alert(`Chỉnh sửa hội viên: ${member.name}`);
    },
    renewMember(member) {
      alert(`Gia hạn gói tập cho hội viên: ${member.name}`);
    }


    // các method khác...
  },
  computed: {
    filteredMembers() {
      return this.members.filter(member => {
        // Search filter
        const matchSearch = member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          member.phone.includes(this.searchQuery) ||
          member.memberCode.toLowerCase().includes(this.searchQuery.toLowerCase());

        // Status filter
        const matchStatus = this.statusFilter === "all" || member.status === Number(this.statusFilter);

        // Package filter
        const matchPackage = this.packageFilter === "all" || member.package.includes(this.packageFilter);

        return matchSearch && matchStatus && matchPackage;
      });
    }
  },


  mounted() {
    this.getMembers();
  }
}
</script>

<style scoped>
.btn-add-member {
  background-color: #1e40af;
  border-color: #1e40af;
}

.btn-add-member:hover {
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

.text-member-name {
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
