<template>
  <div class="profile-page">
    <div class="profile-hero mb-4">
      <div class="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-end gap-4">
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-end gap-4">
          <div class="profile-avatar">
            <span>AM</span>
            <button class="avatar-action" title="Đổi ảnh đại diện" @click="showToast('Đã mở trình cập nhật ảnh đại diện.')">
              <i class="fa-solid fa-camera"></i>
            </button>
          </div>

          <div class="pb-xl-2">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span class="page-kicker">Hồ sơ quản trị</span>
              <span class="badge bg-success-subtle text-success border border-success rounded-pill px-3 py-2">
                <i class="fa-solid fa-circle-check me-1"></i>Đang hoạt động
              </span>
            </div>
            <h2 class="fw-bold text-white mb-1">Alex Morgan</h2>
            <p class="text-white-50 mb-0">Quản trị viên hệ thống FitLife Gym & Wellness</p>
          </div>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-light rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2" @click="exportProfile">
            <i class="fa-solid fa-file-export"></i>
            Xuất hồ sơ
          </button>
          <button class="btn btn-primary rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm btn-save" @click="saveProfile">
            <i class="fa-solid fa-floppy-disk"></i>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-6 col-xl-3" v-for="stat in profileStats" :key="stat.label">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100 stat-card">
          <div class="d-flex justify-content-between align-items-start gap-3">
            <div>
              <span class="metric-label">{{ stat.label }}</span>
              <h3 class="fw-bold text-dark my-2">{{ stat.value }}</h3>
              <span class="badge rounded-pill px-2 py-1" :class="stat.badgeClass">
                <i class="fa-solid me-1" :class="stat.badgeIcon"></i>{{ stat.note }}
              </span>
            </div>
            <div class="stat-icon" :class="stat.iconClass">
              <i class="fa-solid" :class="stat.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-xl-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
            <div>
              <span class="section-label">Thông tin cá nhân</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Chi tiết tài khoản</h5>
            </div>
            <button class="btn btn-light border rounded-circle btn-small" title="Chỉnh sửa hồ sơ" @click="showToast('Bạn có thể chỉnh sửa trực tiếp các trường bên dưới.')">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>

          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label profile-label">Họ và tên</label>
              <input v-model="profile.fullName" class="form-control profile-input shadow-none" type="text" />
            </div>
            <div class="col-md-6">
              <label class="form-label profile-label">Chức vụ</label>
              <input v-model="profile.role" class="form-control profile-input shadow-none" type="text" />
            </div>
            <div class="col-md-6">
              <label class="form-label profile-label">Email</label>
              <input v-model="profile.email" class="form-control profile-input shadow-none" type="email" />
            </div>
            <div class="col-md-6">
              <label class="form-label profile-label">Số điện thoại</label>
              <input v-model="profile.phone" class="form-control profile-input shadow-none" type="text" />
            </div>
            <div class="col-md-6">
              <label class="form-label profile-label">Mã nhân sự</label>
              <input v-model="profile.staffCode" class="form-control profile-input shadow-none" type="text" />
            </div>
            <div class="col-md-6">
              <label class="form-label profile-label">Chi nhánh phụ trách</label>
              <select v-model="profile.branch" class="form-select profile-input shadow-none">
                <option>FitLife Quận 1</option>
                <option>FitLife Thảo Điền</option>
                <option>FitLife Phú Nhuận</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label profile-label">Ghi chú hồ sơ</label>
              <textarea v-model="profile.bio" class="form-control profile-input shadow-none" rows="3"></textarea>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="mb-4">
            <span class="section-label">Quyền hạn</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Phạm vi quản trị</h5>
          </div>

          <div class="permission-grid">
            <div class="permission-item" v-for="permission in permissions" :key="permission.key">
              <div class="d-flex align-items-center gap-3">
                <div class="permission-icon" :class="permission.iconClass">
                  <i class="fa-solid" :class="permission.icon"></i>
                </div>
                <div>
                  <h6 class="fw-bold text-dark mb-1">{{ permission.title }}</h6>
                  <p class="text-secondary small mb-0">{{ permission.description }}</p>
                </div>
              </div>
              <label class="switch-control">
                <input v-model="permission.enabled" type="checkbox" />
                <span></span>
              </label>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4">
          <div class="d-flex justify-content-between align-items-start gap-3 mb-4">
            <div>
              <span class="section-label">Lịch làm việc</span>
              <h5 class="fw-bold text-dark mb-0 mt-1">Tuần hiện tại</h5>
            </div>
            <button class="btn btn-outline-primary rounded-pill px-3 py-2 fw-semibold" @click="showToast('Đã đồng bộ lịch làm việc.')">
              <i class="fa-solid fa-calendar-check me-2"></i>Đồng bộ lịch
            </button>
          </div>

          <div class="schedule-list">
            <div class="schedule-row" v-for="shift in workSchedule" :key="shift.day">
              <div>
                <div class="fw-bold text-dark">{{ shift.day }}</div>
                <small class="text-secondary">{{ shift.note }}</small>
              </div>
              <div class="text-end">
                <div class="fw-bold text-primary">{{ shift.time }}</div>
                <span class="badge rounded-pill px-2 py-1" :class="shift.badgeClass">{{ shift.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="mb-4">
            <span class="section-label">Bảo mật</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Đăng nhập & xác thực</h5>
          </div>

          <div class="security-panel mb-3">
            <div class="security-score">
              <span>92</span>
            </div>
            <div>
              <h6 class="fw-bold text-dark mb-1">Điểm bảo mật cao</h6>
              <p class="text-secondary small mb-0">Tài khoản đã bật OTP và khóa phiên tự động.</p>
            </div>
          </div>

          <div class="d-flex flex-column gap-3">
            <div class="security-row" v-for="item in securityItems" :key="item.key">
              <div>
                <div class="fw-bold text-dark">{{ item.title }}</div>
                <small class="text-secondary">{{ item.description }}</small>
              </div>
              <span class="badge rounded-pill px-2 py-1" :class="item.badgeClass">{{ item.status }}</span>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="mb-4">
            <span class="section-label">Liên hệ nhanh</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Kênh nội bộ</h5>
          </div>

          <div class="contact-list">
            <button class="contact-item" v-for="contact in contacts" :key="contact.label" @click="showToast(`Đã mở ${contact.label}.`)">
              <span class="contact-icon" :class="contact.iconClass">
                <i class="fa-solid" :class="contact.icon"></i>
              </span>
              <span>
                <strong>{{ contact.label }}</strong>
                <small>{{ contact.value }}</small>
              </span>
            </button>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4 p-4">
          <div class="mb-3">
            <span class="section-label">Hoạt động gần đây</span>
            <h5 class="fw-bold text-dark mb-0 mt-1">Nhật ký tài khoản</h5>
          </div>

          <div class="activity-timeline">
            <div class="timeline-item" v-for="activity in activities" :key="activity.id">
              <div class="timeline-dot" :class="activity.dotClass"></div>
              <div>
                <div class="fw-bold text-dark">{{ activity.title }}</div>
                <small class="text-secondary">{{ activity.time }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-custom" v-if="toastMessage">
      <i class="fa-solid fa-circle-check me-2"></i>{{ toastMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminProfile",
  data() {
    return {
      toastMessage: "",
      profile: {
        fullName: "Alex Morgan",
        role: "Quản trị viên hệ thống",
        email: "alex.morgan@fitlife.vn",
        phone: "0909 888 777",
        staffCode: "FL-ADM01",
        branch: "FitLife Quận 1",
        bio: "Phụ trách vận hành hệ thống, kiểm duyệt dữ liệu hội viên, cấu hình thanh toán và báo cáo quản trị."
      },
      permissions: [
        { key: "members", title: "Quản lý hội viên", description: "Thêm, sửa, khóa hồ sơ và gói tập.", icon: "fa-users", iconClass: "bg-primary-subtle text-primary", enabled: true },
        { key: "billing", title: "Hóa đơn & thanh toán", description: "Duyệt giao dịch, nhắc phí và hoàn tiền.", icon: "fa-credit-card", iconClass: "bg-success-subtle text-success", enabled: true },
        { key: "settings", title: "Cài đặt hệ thống", description: "Thay đổi cấu hình vận hành FitLife.", icon: "fa-gear", iconClass: "bg-warning-subtle text-warning", enabled: true },
        { key: "audit", title: "Nhật ký bảo mật", description: "Xem lịch sử thao tác nhạy cảm.", icon: "fa-shield-halved", iconClass: "bg-danger-subtle text-danger", enabled: false }
      ],
      workSchedule: [
        { day: "Thứ 2 - Thứ 6", note: "Ca quản trị chính", time: "08:00 - 17:30", status: "Online", badgeClass: "bg-success-subtle text-success border border-success" },
        { day: "Thứ 7", note: "Kiểm tra báo cáo tuần", time: "09:00 - 12:00", status: "Bán thời gian", badgeClass: "bg-primary-subtle text-primary border border-primary" },
        { day: "Chủ nhật", note: "Chỉ nhận cảnh báo khẩn", time: "Nghỉ", status: "Trực cảnh báo", badgeClass: "bg-warning-subtle text-warning border border-warning" }
      ],
      securityItems: [
        { key: "otp", title: "Xác thực 2 lớp", description: "Cập nhật 12 ngày trước", status: "Đã bật", badgeClass: "bg-success-subtle text-success border border-success" },
        { key: "password", title: "Mật khẩu", description: "Đổi lần cuối 34 ngày trước", status: "An toàn", badgeClass: "bg-primary-subtle text-primary border border-primary" },
        { key: "device", title: "Thiết bị tin cậy", description: "2 thiết bị đang đăng nhập", status: "Theo dõi", badgeClass: "bg-warning-subtle text-warning border border-warning" }
      ],
      contacts: [
        { label: "Email nội bộ", value: "alex.morgan@fitlife.vn", icon: "fa-envelope", iconClass: "bg-primary-subtle text-primary" },
        { label: "Hotline vận hành", value: "0909 888 777", icon: "fa-phone", iconClass: "bg-success-subtle text-success" },
        { label: "Kênh hỗ trợ IT", value: "FitLife Support", icon: "fa-headset", iconClass: "bg-warning-subtle text-warning" }
      ],
      activities: [
        { id: 1, title: "Đăng nhập từ Chrome Windows", time: "Hôm nay, 09:15", dotClass: "bg-success" },
        { id: 2, title: "Cập nhật quyền hóa đơn", time: "Hôm qua, 16:40", dotClass: "bg-primary" },
        { id: 3, title: "Xuất báo cáo hội viên", time: "23/06/2026, 18:05", dotClass: "bg-info" },
        { id: 4, title: "Đổi mật khẩu quản trị", time: "21/05/2026, 08:30", dotClass: "bg-warning" }
      ]
    };
  },
  computed: {
    profileStats() {
      return [
        { label: "Phiên đăng nhập", value: "2", note: "Thiết bị tin cậy", badgeIcon: "fa-laptop", badgeClass: "bg-primary-subtle text-primary border border-primary", icon: "fa-desktop", iconClass: "bg-primary-subtle text-primary" },
        { label: "Thao tác hôm nay", value: "36", note: "Không có lỗi", badgeIcon: "fa-circle-check", badgeClass: "bg-success-subtle text-success border border-success", icon: "fa-list-check", iconClass: "bg-success-subtle text-success" },
        { label: "Quyền đang bật", value: `${this.permissions.filter((item) => item.enabled).length}/4`, note: "Cấp admin", badgeIcon: "fa-user-shield", badgeClass: "bg-warning-subtle text-warning border border-warning", icon: "fa-key", iconClass: "bg-warning-subtle text-warning" },
        { label: "Bảo mật", value: "92%", note: "Mức cao", badgeIcon: "fa-shield-halved", badgeClass: "bg-info-subtle text-info border border-info", icon: "fa-lock", iconClass: "bg-info-subtle text-info" }
      ];
    }
  },
  methods: {
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = "";
      }, 2600);
    },
    saveProfile() {
      this.showToast("Đã lưu thông tin hồ sơ quản trị.");
    },
    exportProfile() {
      this.showToast("Đã chuẩn bị file hồ sơ Alex Morgan.");
    }
  }
};
</script>

<style scoped>
.profile-page {
  animation: fadeIn 0.25s ease-out;
}

.profile-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 55%, #0f766e 100%);
  border-radius: 22px;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.16);
  overflow: hidden;
  padding: 32px;
  position: relative;
}

.profile-hero::after {
  background: rgba(255, 255, 255, 0.09);
  content: "";
  height: 180px;
  position: absolute;
  right: -70px;
  top: -80px;
  transform: rotate(18deg);
  width: 240px;
}

.profile-avatar {
  align-items: center;
  background: #fff;
  border: 6px solid rgba(255, 255, 255, 0.26);
  border-radius: 28px;
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.22);
  color: #1e40af;
  display: flex;
  flex: 0 0 118px;
  font-size: 2.2rem;
  font-weight: 900;
  height: 118px;
  justify-content: center;
  position: relative;
  width: 118px;
  z-index: 1;
}

.avatar-action {
  align-items: center;
  background: #2563eb;
  border: 0;
  border-radius: 999px;
  bottom: -8px;
  color: #fff;
  display: flex;
  height: 36px;
  justify-content: center;
  position: absolute;
  right: -8px;
  width: 36px;
}

.page-kicker,
.section-label,
.metric-label,
.profile-label {
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.profile-hero .page-kicker {
  color: rgba(255, 255, 255, 0.76);
}

.btn-save {
  background-color: #1e40af;
  border-color: #1e40af;
}

.btn-save:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08) !important;
  transform: translateY(-3px);
}

.stat-icon,
.permission-icon,
.contact-icon {
  align-items: center;
  border-radius: 16px;
  display: flex;
  flex: 0 0 48px;
  height: 48px;
  justify-content: center;
  width: 48px;
}

.profile-input {
  border-color: #e2e8f0;
  border-radius: 14px;
  color: #0f172a;
  font-weight: 600;
  min-height: 46px;
}

.profile-input:focus {
  border-color: #93c5fd;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08) !important;
}

.btn-small {
  align-items: center;
  display: inline-flex;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.permission-grid,
.schedule-list,
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.permission-item,
.schedule-row,
.security-row {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 14px;
}

.switch-control {
  cursor: pointer;
  flex: 0 0 auto;
  height: 28px;
  margin: 0;
  position: relative;
  width: 50px;
}

.switch-control input {
  height: 0;
  opacity: 0;
  width: 0;
}

.switch-control span {
  background: #cbd5e1;
  border-radius: 999px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: background-color 0.2s ease;
}

.switch-control span::before {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.22);
  content: "";
  height: 22px;
  left: 3px;
  position: absolute;
  top: 3px;
  transition: transform 0.2s ease;
  width: 22px;
}

.switch-control input:checked + span {
  background: #2563eb;
}

.switch-control input:checked + span::before {
  transform: translateX(22px);
}

.security-panel {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  display: flex;
  gap: 16px;
  padding: 16px;
}

.security-score {
  align-items: center;
  background: conic-gradient(#22c55e 0 92%, #e2e8f0 92% 100%);
  border-radius: 50%;
  display: flex;
  flex: 0 0 72px;
  height: 72px;
  justify-content: center;
  width: 72px;
}

.security-score span {
  align-items: center;
  background: #fff;
  border-radius: 50%;
  color: #0f172a;
  display: flex;
  font-weight: 900;
  height: 54px;
  justify-content: center;
  width: 54px;
}

.contact-item {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  display: flex;
  gap: 12px;
  padding: 14px;
  text-align: left;
  transition: background-color 0.2s ease, transform 0.2s ease;
  width: 100%;
}

.contact-item:hover {
  background: #eff6ff;
  transform: translateX(3px);
}

.contact-item small {
  color: #64748b;
  display: block;
  font-size: 0.78rem;
}

.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-item {
  display: flex;
  gap: 12px;
}

.timeline-dot {
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #e2e8f0;
  flex: 0 0 12px;
  height: 12px;
  margin-top: 5px;
  width: 12px;
}

.toast-custom {
  background: #0f172a;
  border-left: 4px solid #22c55e;
  border-radius: 12px;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.22);
  color: #fff;
  font-weight: 700;
  max-width: 360px;
  padding: 14px 18px;
  position: fixed;
  right: 24px;
  top: 86px;
  z-index: 3000;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .profile-hero {
    padding: 24px;
  }

  .permission-item,
  .schedule-row,
  .security-row {
    align-items: flex-start;
  }

  .permission-icon {
    display: none;
  }
}
</style>
